/**
 * Webhook Calendly → Meta Conversions API.
 *
 * Reçoit `invitee.created` / `invitee.canceled`, vérifie la signature Calendly,
 * puis envoie l'event `Schedule` côté serveur avec les données de matching
 * (e-mail, téléphone, prénom/nom hashés) que le navigateur n'a pas.
 *
 * Déduplication : `event_id` = le leadId généré sur la LP et transporté par
 * Calendly dans `payload.tracking.salesforce_uuid` (format `leadId~fbp~fbc`).
 * Le Pixel envoie le même event_id → Meta ne compte la conversion qu'une fois.
 *
 * Variables d'environnement (Netlify → Site configuration → Environment) :
 *   META_CAPI_TOKEN                 (requis) token système avec accès au Pixel
 *   META_PIXEL_ID                   (optionnel, défaut : Pixel FNAE)
 *   CALENDLY_WEBHOOK_SIGNING_KEY    (requis) renvoyé à la création du webhook
 *   META_TEST_EVENT_CODE            (optionnel) pour l'onglet "Test des events"
 */
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const config = { path: "/api/calendly-webhook" };

const DEFAULT_PIXEL_ID = "3020497201339683";
const GRAPH_VERSION = "v21.0";
const EVENT_SOURCE_URL = "https://lp.fnae.fr/lp-formation-auto-entrepreneur/";
const SIGNATURE_TOLERANCE_S = 300;

type CalendlyPayload = {
  email?: string;
  name?: string;
  first_name?: string | null;
  last_name?: string | null;
  text_reminder_number?: string | null;
  cancel_url?: string;
  tracking?: Record<string, string | null>;
  questions_and_answers?: { question?: string; answer?: string }[];
  scheduled_event?: { start_time?: string; uri?: string };
};

const sha256 = (value: string) =>
  createHash("sha256").update(value).digest("hex");

const normalize = (value: string) => value.trim().toLowerCase();

/** E.164 sans "+" — les numéros FR saisis en 0X sont préfixés 33. */
function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("00")) digits = digits.slice(2);
  else if (digits.startsWith("0")) digits = "33" + digits.slice(1);
  return digits;
}

/** `Calendly-Webhook-Signature: t=<timestamp>,v1=<hmac hex de "t.body">` */
function verifySignature(rawBody: string, header: string, key: string): boolean {
  const parts = Object.fromEntries(
    header.split(",").map((chunk) => {
      const i = chunk.indexOf("=");
      return [chunk.slice(0, i).trim(), chunk.slice(i + 1).trim()];
    }),
  );
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > SIGNATURE_TOLERANCE_S) return false;

  const expected = createHmac("sha256", key)
    .update(timestamp + "." + rawBody)
    .digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature, "utf8");
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Cherche un numéro de téléphone dans les questions personnalisées du formulaire. */
function phoneFromAnswers(payload: CalendlyPayload): string {
  for (const qa of payload.questions_and_answers ?? []) {
    const question = (qa.question ?? "").toLowerCase();
    if (/t[ée]l[ée]phone|phone|portable|mobile/.test(question) && qa.answer) {
      return qa.answer;
    }
  }
  return "";
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  const accessToken = process.env.META_CAPI_TOKEN;
  if (!signingKey || !accessToken) {
    console.error("calendly-webhook: env manquante (signing key / token CAPI)");
    return new Response("Not configured", { status: 500 });
  }

  const rawBody = await req.text();
  const signature = req.headers.get("calendly-webhook-signature") ?? "";
  if (!verifySignature(rawBody, signature, signingKey)) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body: { event?: string; payload?: CalendlyPayload };
  try {
    body = JSON.parse(rawBody);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  // Seule la prise de RDV est une conversion ; les annulations sont acquittées
  // sans rien envoyer (Meta n'a pas d'event standard d'annulation).
  if (body.event !== "invitee.created") {
    return new Response(null, { status: 204 });
  }

  const payload = body.payload ?? {};
  const tracking = payload.tracking ?? {};
  const [leadId = "", fbp = "", fbc = ""] = (tracking.salesforce_uuid ?? "").split("~");

  const nameParts = (payload.name ?? "").trim().split(/\s+/);
  const firstName = payload.first_name || nameParts[0] || "";
  const lastName = payload.last_name || nameParts.slice(1).join(" ") || "";
  const phone = normalizePhone(payload.text_reminder_number || phoneFromAnswers(payload));

  const userData: Record<string, string[] | string> = {};
  if (payload.email) userData.em = [sha256(normalize(payload.email))];
  if (phone) userData.ph = [sha256(phone)];
  if (firstName) userData.fn = [sha256(normalize(firstName))];
  if (lastName) userData.ln = [sha256(normalize(lastName))];
  if (fbp) userData.fbp = fbp;
  if (fbc) userData.fbc = fbc;

  if (Object.keys(userData).length === 0) {
    console.warn("calendly-webhook: aucune donnée de matching, event ignoré");
    return new Response(null, { status: 204 });
  }

  const event: Record<string, unknown> = {
    event_name: "Schedule",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: EVENT_SOURCE_URL,
    user_data: userData,
    custom_data: {
      content_name: "formation_ae",
      source: "calendly",
      utm_source: tracking.utm_source ?? "",
      utm_medium: tracking.utm_medium ?? "",
      utm_campaign: tracking.utm_campaign ?? "",
      utm_content: tracking.utm_content ?? "",
      utm_term: tracking.utm_term ?? "",
    },
  };
  // Sans leadId (RDV pris hors LP : lien direct, e-mail…), pas de déduplication
  // possible — l'event est envoyé seul, ce qui est le comportement voulu.
  if (leadId) event.event_id = leadId;

  const pixelId = process.env.META_PIXEL_ID || DEFAULT_PIXEL_ID;
  const requestBody: Record<string, unknown> = { data: [event] };
  if (process.env.META_TEST_EVENT_CODE) {
    requestBody.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(requestBody),
    },
  );

  if (!res.ok) {
    // 500 → Calendly réessaie le webhook
    console.error("calendly-webhook: CAPI erreur", res.status, await res.text());
    return new Response("CAPI error", { status: 500 });
  }

  console.log("calendly-webhook: Schedule envoyé", {
    leadId,
    utm_campaign: tracking.utm_campaign ?? "",
    matching: Object.keys(userData).join(","),
  });
  return new Response(null, { status: 204 });
}
