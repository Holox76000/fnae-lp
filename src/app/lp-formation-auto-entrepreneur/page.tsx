"use client";

import { useEffect } from "react";
import { CTA, Eyebrow, FAQItem, Icon } from "../ui/editorial";
import { fbqTrack, pushEvent, useViewContent } from "../ui/tracking";

const CALENDLY_URL = "https://calendly.com/fnaeacademy/preparez-votre-formation";
const QUALIOPI_CERT_URL =
  "https://www.formation-autoentrepreneur.fr/wp-content/uploads/2025/08/Reedition-certificat-nveau-NDA-08-2025-FNAE-ACADEMY.pdf";

// ─── Attribution Calendly ─────────────────────────────────────────────────
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

const UTM_STORE_KEY = "fnae_utm";

// Les UTM sont mémorisés au premier chargement : le popup Calendly peut être
// ouvert après une navigation qui aurait perdu la query string.
function getUtms(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const fromUrl: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }
  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(UTM_STORE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(UTM_STORE_KEY);
    return stored ? (JSON.parse(stored) as Record<string, string>) : {};
  } catch {
    return fromUrl;
  }
}

// Construit l'URL Calendly avec les UTM : Calendly les stocke sur la fiche de
// l'invité, ce qui rend le RDV rattachable à sa campagne dans le CRM.
function buildCalendlyUrl(): string {
  const url = new URL(CALENDLY_URL);
  for (const [key, value] of Object.entries(getUtms())) {
    url.searchParams.set(key, value);
  }
  return url.toString();
}

// ─── Données ──────────────────────────────────────────────────────────────
const FICHE = [
  { icon: "clock", value: "7h30", label: "de formation en collectif" },
  { icon: "book", value: "6 modules", label: "du régime au passage de cap" },
  { icon: "screen", value: "100 % à distance", label: "une journée ou deux demi-journées" },
  { icon: "shield", value: "Certifié Qualiopi", label: "au titre des actions de formation" },
];

const MODULES = [
  {
    title: "Le régime micro-entreprise : tout comprendre.",
    desc: "Seuils, obligations, droits, fiscalité, protection sociale. La vision d'ensemble.",
  },
  {
    title: "Démarches de création.",
    desc: "INPI, URSSAF, code APE, choix du régime fiscal, ACRE, ouverture du compte dédié. Pas à pas.",
  },
  {
    title: "Facturation et obligations comptables.",
    desc: "Mentions obligatoires, livre de recettes, conservation des justificatifs, TVA.",
  },
  {
    title: "Protection sociale et fiscalité personnelle.",
    desc: "Cotisations, retraite, indemnités journalières, impôt sur le revenu.",
  },
  {
    title: "Développement et passage de cap.",
    desc: "Anticiper les seuils, décider du basculement vers EI/EURL/SASU, sécuriser la croissance.",
  },
  {
    title: "Outils, méthodes et bon suivi administratif.",
    desc: "Routines, outils, plateforme FNAE Gestion, accès au groupe adhérents.",
  },
];

const STEPS = [
  {
    title: "Vous réservez votre échange",
    desc: "20 minutes avec un conseiller FNAE pour cadrer votre situation, vos objectifs et la session qui vous convient.",
  },
  {
    title: "Vous suivez les 6 modules",
    desc: "7h30 en visio, en collectif : une journée ou deux demi-journées. Ateliers, quiz et travail individuel entre les modules.",
  },
  {
    title: "Vous repartez outillé",
    desc: "Livret de formation personnalisé, feuille de route pour votre activité, et un rendez-vous de suivi d'1h (ou deux fois 30 min) inclus.",
  },
];

const PAIN_POINTS = [
  {
    icon: "bell",
    title: "Vous repoussez",
    desc: "Vous repoussez l'ouverture de vos courriers URSSAF. À chaque fois, vous craignez la mauvaise nouvelle.",
  },
  {
    icon: "scale",
    title: "Vous pataugez",
    desc: "Vous pataugez avec la TVA. Vous ne savez pas si vous êtes dans les clous, et personne ne vous l'a vraiment expliqué.",
  },
  {
    icon: "card",
    title: "Vous improvisez",
    desc: "Vous facturez vos clients sans être sûr de bien faire. Mention obligatoire, taux applicable, conformité : vous improvisez.",
  },
  {
    icon: "compass",
    title: "Vous êtes perdu(e)",
    desc: "Vous voulez créer votre micro mais vous avez douze onglets ouverts. INPI, URSSAF, code APE, plafonds, TVA : par où commencer ?",
  },
  {
    icon: "clock",
    title: "Vous procrastinez",
    desc: "Vous avez honte de ne pas tout maîtriser. Du coup, vous n'avez jamais osé demander de l'aide. Et la situation s'aggrave.",
  },
];

const BENEFITS = [
  "Comprendre vos obligations URSSAF, fiscales et sociales, et savoir y répondre sans paniquer.",
  "Anticiper le seuil de TVA et savoir exactement quoi faire si vous le dépassez.",
  "Émettre des factures conformes, suivre votre comptabilité, déclarer votre CA sans erreur.",
  "Décider en connaissance de cause si et quand passer en société. Sans subir le basculement.",
  "Repartir avec votre livret de formation personnalisé et une feuille de route concrète.",
];

// Section « Pourquoi choisir une formation avec la FNAE Academy ? »
const WHY_ACADEMY = [
  {
    title: "Des formations conçues pour les micro-entrepreneurs",
    desc: "La FNAE Academy propose des formations spécifiquement adaptées aux réalités de la micro-entreprise. Vous développez les compétences et les connaissances nécessaires pour créer, gérer et développer votre activité en toute confiance.",
  },
  {
    title: "Une expertise dédiée à la micro-entreprise",
    desc: "Fiscalité, TVA, gestion, facturation électronique ou développement commercial : nos formations abordent les sujets essentiels à votre activité, avec des contenus concrets et adaptés à votre quotidien d'entrepreneur.",
  },
  {
    title: "Des formateurs experts et engagés",
    desc: "Bénéficiez de l'accompagnement de formateurs spécialisés, qui maîtrisent les enjeux du régime de la micro-entreprise et vous aident à mieux comprendre vos obligations et à adopter les bonnes pratiques.",
  },
];

const LEGITIMACY = [
  {
    icon: "shield",
    title: "Une fédération qui défend",
    desc: "En 2025, nous avons fait reculer l'État sur la TVA à 25 000 €. La loi du 3 novembre 2025 a confirmé notre victoire. Vous vous formez avec celle qui se bat pour vous.",
  },
  {
    icon: "columns",
    title: "Légitimité institutionnelle",
    desc: "Seule organisation d'auto-entrepreneurs reconnue représentative au niveau national. Nous siégeons au CPSTI, à l'URSSAF, aux CAF.",
  },
  {
    icon: "award",
    title: "Pas un gourou, une fédération",
    desc: "Pas de promesse de richesse facile, pas de programme à 5 000 €. Une formation institutionnelle, dispensée par un organisme certifié Qualiopi.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maiwenn",
    date: "19/12/2024",
    text: "J'ai pu obtenir toutes les informations nécessaires pour créer mon entreprise. La formation m'a permis d'éclaircir et de découvrir les tenants et aboutissants de la mise en place de la création de mon entreprise.",
  },
  {
    name: "Estelle",
    date: "02/12/2024",
    text: "La formation a répondu à mes interrogations et m'a apporté des informations légales supplémentaires. Je vais pouvoir me mettre à jour sur l'exonération de TVA, utiliser le logiciel FNAE Gestion pour ma comptabilité afin d'être dans la légalité, surveiller mon revenu de référence et mes paiements d'impôts, et rédiger mes propres contrats de prestation.",
  },
  {
    name: "Anna",
    date: "10/07/2025",
    text: "J'ai désormais toutes les connaissances requises pour me lancer dans mon activité avec l'assurance de limiter les risques d'erreur de gestion. Tout ce que l'on y voit est très concret, et l'on termine la formation avec une feuille de route.",
  },
  {
    name: "Régine",
    date: "03/06/2025",
    text: "J'ai pu constater que l'auto-entrepreneur a des obligations essentielles dont je n'avais pas connaissance (tenue d'un livret de recettes, compte dédié à l'activité professionnelle, par exemple). Dorénavant, je ne manquerai plus d'informations.",
  },
  {
    name: "Yoann",
    date: "14/03/2025",
    text: "La formation aborde tous les aspects nécessaires au démarrage de son activité et à sa gestion au quotidien, le tout expliqué avec simplicité.",
  },
];

const INCLUDED = [
  "6 modules, 7h30 de formation en collectif et à distance",
  "Un livret de formation personnalisé à votre activité",
  "Un rendez-vous de suivi d'1h après la formation, inclus",
  "L'accès au groupe privé des adhérents et aux webinaires",
];

const FAQS = [
  {
    q: "Quelle différence avec une formation gratuite URSSAF ou CCI ?",
    a: "L'URSSAF, la CCI ou France Num proposent de l'information générale. La FNAE Academy propose un accompagnement structuré, avec ateliers, suivi individuel et livret personnalisé. Vous ne sortez pas avec des notes mais avec une feuille de route opérationnelle pour votre situation.",
  },
  {
    q: "Combien de temps me prendra la formation ?",
    a: "La formation dure 7h30 au total, en collectif. Vous pouvez la suivre en une journée ou en deux demi-journées. 100 % à distance.",
  },
  {
    q: "Quel est mon délai d'accès ?",
    a: "Nos sessions sont organisées régulièrement. Le délai entre votre inscription et le début de la formation est généralement de 2 à 4 semaines, selon le format choisi et les sessions disponibles.",
  },
  {
    q: "Que se passe-t-il après la formation ?",
    a: "Vous repartez avec votre livret de formation personnalisé, et un rendez-vous post-formation est inclus. Vous accédez également au groupe privé Facebook des adhérents FNAE et à nos webinaires thématiques.",
  },
  {
    q: "Et si je ne suis pas satisfait ?",
    a: "Nos taux de satisfaction sont publics : 9,8/10 et 100 % de recommandation. Si malgré tout vous estimez que la formation ne correspond pas, contactez-nous. Nous trouverons une solution adaptée à votre situation.",
  },
];

// ─── Page principale ──────────────────────────────────────────────────────
export default function FormationAutoEntrepreneurPage() {
  useViewContent("formation_ae");

  // PageView + Calendly assets + Calendly event listener
  useEffect(() => {
    pushEvent("PageView");

    // Init Pixel Meta si GTM ne l'a pas déjà chargé (même pattern que les autres LP)
    {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const w = window as any;
      if (!w.fbq) {
        const f: any = function (...args: any[]) {
          if (f.callMethod) { f.callMethod(...args); } else { f.queue.push(args); }
        };
        w.fbq = w._fbq = f;
        f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
        const s = document.createElement("script");
        s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
        document.head.appendChild(s);
        w.fbq("init", "3020497201339683");
        w.fbq("track", "PageView");
      }
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }

    // Charger les assets Calendly
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.head.appendChild(script);
    }

    // Tracking Calendly : event_scheduled (= RDV pris) → event Meta "Schedule"
    const handleMessage = (e: MessageEvent) => {
      // Seul le widget Calendly peut déclencher une conversion
      if (e.origin !== "https://calendly.com") return;
      if (typeof e.data !== "object" || !e.data) return;
      const evt = (e.data as { event?: string }).event;
      if (typeof evt !== "string" || evt.indexOf("calendly") !== 0) return;

      const calendlyEvent = evt.split(".")[1];

      // Pas de push générique "calendly" ici : un des containers GTM écoute déjà
      // les postMessage Calendly et pousse exactement le même event (vérifié en
      // navigateur sur toutes les LP) — le dupliquer ferait double-déclencher
      // tout tag branché dessus.
      if (calendlyEvent === "event_scheduled") {
        // Event standard Meta pour une prise de rendez-vous
        pushEvent("Schedule", { content_name: "formation_ae", source: "calendly" });
        fbqTrack("Schedule", { content_name: "formation_ae", source: "calendly" });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const openCalendly = () => {
    pushEvent("Lead", { content_name: "formation_ae", form_type: "calendly_popup" });
    const url = buildCalendlyUrl();
    const w = window as unknown as {
      Calendly?: { initPopupWidget: (opts: { url: string }) => void };
    };
    if (w.Calendly) {
      w.Calendly.initPopupWidget({ url });
    } else {
      // Fallback : ouvrir le calendrier dans un nouvel onglet si le script n'a pas chargé
      window.open(url, "_blank", "noopener");
    }
  };

  const trackPhoneClick = () => {
    pushEvent("Contact", { content_name: "formation_ae", contact_type: "phone" });
  };

  return (
    <div className="lp-ed min-h-screen">

      {/* ---------------------------------------------------------------- Header */}
      <header
        className="sticky top-0 z-50 border-b rule"
        style={{ backgroundColor: "rgba(251,248,244,0.88)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <img src="/logos/fnae-logo.png" alt="FNAE" width={826} height={254} fetchPriority="high" className="h-11 w-auto" />
          <button
            type="button"
            onClick={openCalendly}
            style={{ backgroundColor: "var(--ink)" }}
            className="text-white px-5 py-2.5 rounded-[3px] text-[13px] font-semibold hover:opacity-90 transition"
          >
            Préparer ma formation
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------------------- Hero */}
      <section
        className="grain relative overflow-hidden"
        style={{
          backgroundColor: "var(--ink)",
          backgroundImage:
            "radial-gradient(80rem 40rem at 78% -10%, rgba(26,114,180,0.55), transparent 60%), radial-gradient(45rem 30rem at 8% 110%, rgba(237,105,82,0.20), transparent 65%)",
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-0 lg:pt-24">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-16 items-start pb-16">
            {/* Colonne récit */}
            <div className="text-white">
              <div data-rise style={{ animationDelay: "0ms" }} className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-8">
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.14em] px-3 py-1.5 rounded-[3px]"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                >
                  9,8/10 · 100 % recommandent
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Organisme de formation certifié Qualiopi
                </span>
              </div>

              <h1 data-rise style={{ animationDelay: "70ms" }} className="display text-[2.6rem] sm:text-6xl lg:text-[4.1rem] mb-7">
                Maîtrisez votre{" "}
                <em className="italic" style={{ color: "var(--accent)" }}>micro-entreprise</em>
                {" "}en 7h30.
              </h1>

              <p data-rise className="text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ animationDelay: "140ms", color: "rgba(255,255,255,0.74)" }}>
                URSSAF, TVA, facturation, cotisations, passage en société : la formation collective 100 % à distance de la{" "}
                <strong className="font-semibold" style={{ color: "#fff" }}>FNAE Academy</strong>, l&apos;organisme de formation de la seule organisation d&apos;auto-entrepreneurs reconnue représentative au niveau national.
              </p>
            </div>

            {/* Colonne offre */}
            <div data-rise style={{ animationDelay: "280ms" }} className="bg-white rounded-[4px] p-8 sm:p-9">
              <Eyebrow>Formation · prochaines sessions</Eyebrow>
              <div className="flex items-baseline gap-2 mt-5 mb-1">
                <span className="display num text-[4.5rem] leading-none">250</span>
                <span className="display text-2xl" style={{ color: "var(--muted)" }}>€ TTC</span>
              </div>
              <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
                7h30 de formation en collectif,{" "}
                <strong style={{ color: "var(--ink)" }}>rendez-vous de suivi individuel inclus</strong>.
              </p>
              <CTA onClick={openCalendly} className="w-full justify-center">
                Préparer ma formation
              </CTA>
              <ul className="mt-7 pt-7 border-t rule space-y-3">
                {[
                  "20 minutes avec un conseiller, sans engagement",
                  "6 modules animés par des experts du régime micro",
                  "Livret de formation personnalisé à votre activité",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--ok)" }} className="mt-0.5 flex-shrink-0"><Icon name="check" className="w-4 h-4" /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bandeau fiche formation */}
        <div className="relative z-10 border-t" style={{ borderColor: "rgba(255,255,255,0.14)", backgroundColor: "rgba(255,255,255,0.04)" }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid grid-cols-2 lg:grid-cols-4">
            {FICHE.map((f, i) => (
              <div
                key={f.value}
                className={`py-6 lg:px-7 ${i % 2 === 1 ? "pl-6 border-l" : ""} ${i > 0 ? "lg:border-l" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""}`}
                style={{ borderColor: "rgba(255,255,255,0.14)" }}
              >
                <span style={{ color: "var(--accent)" }} className="inline-block mb-2.5">
                  <Icon name={f.icon} className="w-[18px] h-[18px]" />
                </span>
                <p className="display text-lg text-white leading-tight">{f.value}</p>
                <p className="text-[12.5px] leading-snug mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>{f.label}</p>
              </div>
            ))}
          </div>
          <div className="max-w-6xl mx-auto px-5 sm:px-8 pb-6">
            <a
              href={QUALIOPI_CERT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-slide text-xs font-semibold"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Voir le certificat Qualiopi
            </a>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Chiffres */}
      <section className="border-b rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-3">
            {[
              { v: "85 000+", l: "auto-entrepreneurs accompagnés depuis 2009" },
              { v: "9,8/10", l: "note moyenne de nos apprenants" },
              { v: "100 %", l: "recommandent la formation" },
            ].map((s, i) => (
              <div
                key={s.l}
                className={`py-9 px-2 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""} rule`}
              >
                <p className="display num text-4xl mb-1.5">{s.v}</p>
                <p className="text-[13px] leading-snug" style={{ color: "var(--muted)" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Soutiens */}
      <section className="py-12 px-5 sm:px-8 border-b rule">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[10px] uppercase tracking-[0.2em] mb-8" style={{ color: "var(--muted)" }}>
            La FNAE siège dans les instances nationales
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-7">
            {[
              { src: "/logos/dgfip.svg", alt: "Direction Générale des Finances Publiques" },
              { src: "/logos/urssaf.svg", alt: "Urssaf" },
              { src: "/logos/inpi.svg", alt: "INPI" },
              { src: "/logos/cpsti.png", alt: "CPSTI" },
              { src: "/logos/cipav.svg", alt: "La CIPAV" },
              { src: "/logos/caisse-depots.svg", alt: "Caisse des Dépôts" },
            ].map((logo) => (
              <img key={logo.alt} src={logo.src} alt={logo.alt} loading="lazy" decoding="async" className="h-9 object-contain transition-all duration-500 hover:opacity-100" style={{ filter: "grayscale(100%)", opacity: 0.45 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Le manque */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Le point de départ</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">
              Vous vous reconnaissez ?
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Les auto-entrepreneurs qui rejoignent notre formation arrivent presque toujours avec une de ces cinq situations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-x-14 gap-y-px">
            {PAIN_POINTS.map((item) => (
              <div key={item.title} className="py-7 border-b rule flex gap-5">
                <span className="flex-shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>
                  <Icon name={item.icon} className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="display text-xl mb-2">{item.title}</h3>
                  <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-12 text-lg leading-snug max-w-2xl">
            Vous n&apos;êtes pas seul.{" "}
            <strong>C&apos;est exactement pour cela que la FNAE forme les auto-entrepreneurs depuis 2009.</strong>
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Mode d'emploi */}
      <section className="py-24 px-5 sm:px-8 border-y rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Mode d&apos;emploi</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">Comment ça se passe</h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              Trois étapes, de votre premier échange au rendez-vous de suivi post-formation.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-px" style={{ backgroundColor: "var(--line)" }}>
            {STEPS.map((step, i) => (
              <div key={step.title} className="bg-white p-8">
                <p className="num text-[11px] font-semibold tracking-[0.18em] mb-5" style={{ color: "var(--accent)" }}>
                  ÉTAPE {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display text-xl mb-3">{step.title}</h3>
                <p className="text-[14.5px] leading-relaxed" style={{ color: "var(--muted)" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Programme */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-14">
            <Eyebrow>Le programme</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">
              Devenir un auto-entrepreneur serein
            </h2>
            <p className="text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
              6 modules, 7h30 au total, animés par des experts du régime micro. Du premier jour de votre activité jusqu&apos;au passage de cap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MODULES.map((mod, i) => (
              <article key={mod.title} className="lift bg-white border rule rounded-[3px] p-6 flex flex-col">
                <p className="num text-[11px] font-semibold tracking-[0.18em] pb-4 mb-4 border-b rule" style={{ color: "var(--muted)" }}>
                  MODULE {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="display text-xl mb-3">{mod.title}</h3>
                <p className="text-[13.5px] leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{mod.desc}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 bg-white border rule rounded-[3px] p-8 sm:p-10">
            <h3 className="display text-2xl mb-7">À la fin de la formation, vous saurez</h3>
            <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
              {BENEFITS.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3 text-[14.5px] leading-relaxed" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ color: "var(--ok)" }} className="mt-0.5 flex-shrink-0"><Icon name="check" className="w-4 h-4" /></span>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 text-center sm:text-left">
            <CTA onClick={openCalendly}>Préparer ma formation</CTA>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Pourquoi la FNAE Academy */}
      <section className="py-24 px-5 sm:px-8 border-y rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <Eyebrow>Notre approche</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5">
              Pourquoi choisir une formation<br className="hidden sm:block" /> avec la FNAE Academy ?
            </h2>
          </div>
          <div className="space-y-4">
            {WHY_ACADEMY.map((item) => (
              <article key={item.title} className="lift bg-white border rule rounded-[3px] p-7 sm:p-8">
                <h3 className="display text-xl sm:text-2xl mb-3">{item.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Légitimité */}
      <section className="grain relative overflow-hidden py-24 px-5 sm:px-8" style={{ backgroundColor: "var(--ink)" }}>
        <div className="relative z-10 max-w-5xl mx-auto text-white">
          <div className="max-w-2xl mb-14">
            <h2 className="display text-4xl sm:text-5xl">
              Vous vous formez avec la fédération qui défend les auto-entrepreneurs
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {LEGITIMACY.map((item) => (
              <div key={item.title} className="pt-6 border-t" style={{ borderColor: "rgba(255,255,255,0.22)" }}>
                <span style={{ color: "var(--accent)" }} className="inline-block mb-4"><Icon name={item.icon} className="w-6 h-6" /></span>
                <h3 className="display text-xl mb-2">{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Avis */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <Eyebrow>Ils ont suivi la formation</Eyebrow>
              <h2 className="display text-4xl sm:text-5xl mt-5">Ce qu&apos;en disent nos apprenants</h2>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="display text-2xl">9,8/10</span>
              <span className="text-sm" style={{ color: "var(--muted)" }}>· 100 % recommandent</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className="lift bg-white border rule rounded-[3px] p-7 flex flex-col">
                <span className="display text-5xl leading-none mb-4" style={{ color: "var(--accent)" }} aria-hidden="true">“</span>
                <blockquote className="text-[14.5px] leading-relaxed flex-1" style={{ color: "var(--ink-soft)" }}>{t.text}</blockquote>
                <figcaption className="mt-7 pt-5 border-t rule">
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{t.date}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Tarif */}
      <section id="tarif" className="py-24 px-5 sm:px-8 border-y rule" style={{ backgroundColor: "var(--paper-2)" }}>
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-16 items-start">
          <div>
            <Eyebrow>Tarif</Eyebrow>
            <h2 className="display text-4xl sm:text-5xl mt-5 mb-6">
              250 € TTC, suivi individuel compris
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              Un tarif unique, annoncé d&apos;avance, sans option ni module à rallonge. La FNAE Academy est un organisme de formation certifié Qualiopi : selon votre situation, la formation peut être prise en charge par votre fonds de formation professionnelle.
            </p>
            <a
              href={QUALIOPI_CERT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-slide text-sm font-semibold"
              style={{ color: "var(--blue)" }}
            >
              Voir le certificat Qualiopi
            </a>
          </div>

          <div className="bg-white border rule rounded-[3px] p-8 sm:p-9">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="display num text-6xl leading-none">250</span>
              <span className="display text-xl" style={{ color: "var(--muted)" }}>€ TTC</span>
            </div>
            <p className="text-[13px] mb-7" style={{ color: "var(--muted)" }}>
              Pour la formation complète, rendez-vous de suivi inclus
            </p>
            <ul className="space-y-3.5 mb-8">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ color: "var(--ok)" }} className="mt-0.5 flex-shrink-0"><Icon name="check" className="w-4 h-4" /></span>
                  {item}
                </li>
              ))}
            </ul>
            <CTA onClick={openCalendly} className="w-full justify-center">
              Préparer ma formation
            </CTA>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- FAQ */}
      <section className="py-24 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[0.6fr_1fr] gap-12 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 className="display text-4xl mt-5 mb-6">Tout ce qu&apos;il faut savoir avant de vous inscrire</h2>
            <a href="tel:+33628059351" onClick={trackPhoneClick} className="underline-slide text-sm font-semibold" style={{ color: "var(--blue)" }}>
              Une autre question ? 06 28 05 93 51
            </a>
          </div>
          <div className="border-t rule">
            {FAQS.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- CTA final */}
      <section className="grain relative overflow-hidden py-24 px-5 sm:px-8" style={{ backgroundColor: "var(--accent)" }}>
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="display text-4xl sm:text-5xl mb-5">
            Prêt à maîtriser la micro-entreprise ?
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "rgba(255,255,255,0.85)" }}>
            Découvrir notre formation et développer les compétences essentielles pour entreprendre en toute confiance.
          </p>
          <CTA onClick={openCalendly} variant="light" className="text-base">
            Préparer ma formation
          </CTA>
          <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-2 sm:gap-x-8 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
            <span>Organisme de formation certifié Qualiopi</span>
            <span>Animée par les formateurs experts de la FNAE</span>
            <span>9,8/10 · 100 % recommandent</span>
          </div>
          <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
            Une question ?{" "}
            <a
              href="tel:+33628059351"
              onClick={trackPhoneClick}
              className="underline underline-offset-2 hover:text-white transition"
            >
              06 28 05 93 51
            </a>{" "}
            · Une réponse sous 24h ouvrées.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- Footer */}
      <footer className="py-12 pb-28 sm:pb-12 px-5 sm:px-8" style={{ backgroundColor: "var(--ink)" }}>
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-7 text-sm">
            <img src="/logos/fnae-logo-blanc.png" alt="FNAE" loading="lazy" decoding="async" className="h-10 w-auto" />
            <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 items-center" style={{ color: "rgba(255,255,255,0.6)" }}>
              <a href="/mentions-legales" className="underline-slide">Mentions légales</a>
              <a href="/politique-de-confidentialite" className="underline-slide">Confidentialité</a>
              <a href="/cgv" className="underline-slide">CGV</a>
              <a href="/cgu" className="underline-slide">CGU</a>
              <a href="/reglement-interieur" className="underline-slide">Règlement intérieur</a>
              <a href="/contact" className="underline-slide">Contact</a>
            </div>
          </div>
          <p className="text-xs leading-relaxed max-w-4xl" style={{ color: "rgba(255,255,255,0.45)" }}>
            SAS FNAE Academy · Déclaration d&apos;activité enregistrée sous le numéro 11788786378 auprès du préfet de région d&apos;Île-de-France · SIRET 90087338100025 · Cet enregistrement ne vaut pas agrément de l&apos;État · FNAE Academy est certifiée Qualiopi. La certification qualité a été délivrée au titre de la catégorie d&apos;actions suivante : actions de formation (<a href={QUALIOPI_CERT_URL} target="_blank" rel="noopener noreferrer" className="underline-slide">voir le certificat Qualiopi</a>) · Formations adaptées aux handicaps.
          </p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2009 – 2026 FNAE Academy
          </p>
        </div>
      </footer>

      {/* ------------------------------------------- Barre sticky mobile (CTA) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t p-3"
        style={{ backgroundColor: "var(--ink)", borderColor: "rgba(255,255,255,0.14)" }}
      >
        <button
          type="button"
          onClick={openCalendly}
          style={{ backgroundColor: "var(--accent)" }}
          className="w-full text-white font-semibold py-3.5 rounded-[3px] text-sm hover:opacity-90 transition"
        >
          Préparer ma formation
        </button>
      </div>
    </div>
  );
}
