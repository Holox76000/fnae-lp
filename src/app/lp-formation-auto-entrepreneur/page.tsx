"use client";

import { useState, useEffect, useRef } from "react";

// ─── Palette FNAE Academy ─────────────────────────────────────────────────
const BLUE = "#0E6DAA";
const NAVY = "#0A3D5E";
const CORAL = "#ED6952";
const CREAM = "#F5F2EC";
const BG_LIGHT = "#F5F8FB";
const BG_MEDIUM = "#E8F2FA";

// ─── Tracking dataLayer ───────────────────────────────────────────────────
function pushEvent(name: string, params?: Record<string, unknown>) {
  const w = window as { dataLayer?: object[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: name, ...params });
}

// ─── Données ──────────────────────────────────────────────────────────────
const MODULES = [
  {
    num: "01",
    title: "Le régime micro-entreprise : tout comprendre.",
    desc: "Seuils, obligations, droits, fiscalité, protection sociale. La vision d'ensemble.",
  },
  {
    num: "02",
    title: "Démarches de création.",
    desc: "INPI, URSSAF, code APE, choix du régime fiscal, ACRE, ouverture du compte dédié. Pas à pas.",
  },
  {
    num: "03",
    title: "Facturation et obligations comptables.",
    desc: "Mentions obligatoires, livre de recettes, conservation des justificatifs, TVA.",
  },
  {
    num: "04",
    title: "Protection sociale et fiscalité personnelle.",
    desc: "Cotisations, retraite, indemnités journalières, impôt sur le revenu.",
  },
  {
    num: "05",
    title: "Développement et passage de cap.",
    desc: "Anticiper les seuils, décider du basculement vers EI/EURL/SASU, sécuriser la croissance.",
  },
  {
    num: "06",
    title: "Outils, méthodes et bonne hygiène administrative.",
    desc: "Routines, outils, plateforme FNAE Gestion, accès au groupe adhérents.",
  },
];

const PAIN_POINTS = [
  {
    title: "Vous repoussez",
    desc: "Vous repoussez l'ouverture de vos courriers URSSAF. À chaque fois, vous craignez la mauvaise nouvelle.",
  },
  {
    title: "Vous patauguez",
    desc: "Vous patauguez avec la TVA. Vous ne savez pas si vous êtes dans les clous, et personne ne vous l'a vraiment expliqué.",
  },
  {
    title: "Vous improvisez",
    desc: "Vous facturez vos clients sans être sûr de bien faire. Mention obligatoire, taux applicable, conformité : vous improvisez.",
  },
  {
    title: "Vous êtes perdu(e)",
    desc: "Vous voulez créer votre micro mais vous avez douze onglets ouverts. INPI, URSSAF, code APE, plafonds, TVA : par où commencer ?",
  },
  {
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

const DIFFERENTIATORS = [
  {
    label: "Une fédération qui défend",
    desc: "En 2025, nous avons fait reculer l'État sur la TVA à 25 000 €. Quand 200 000 micro-entrepreneurs ont été menacés par la réforme, la FNAE s'est mobilisée. La loi du 3 novembre 2025 a confirmé notre victoire. Vous vous formez avec celle qui se bat pour vous.",
    highlight: true,
  },
  {
    label: "Spécialisation 100% micro",
    desc: "Pas une formation « création d'entreprise » générique. Une formation 100% micro-entreprise, animée par des experts du seul régime qui vous concerne.",
    highlight: false,
  },
  {
    label: "Légitimité institutionnelle",
    desc: "Seule organisation d'auto-entrepreneurs reconnue représentative au niveau national. Nous siégeons au CPSTI, à l'URSSAF, aux CAF. Aucun organisme privé ne peut le revendiquer.",
    highlight: false,
  },
  {
    label: "Pas un gourou. Une fédération.",
    desc: "Pas de promesse de richesse facile. Pas de programme à 5 000 €. Une formation institutionnelle, sérieuse, certifiée Qualiopi, animée par des formateurs experts du régime.",
    highlight: false,
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

const FAQS = [
  {
    q: "Quelle différence avec une formation gratuite URSSAF ou CCI ?",
    a: "L'URSSAF, la CCI ou France Num proposent de l'information générale. La FNAE Academy propose un accompagnement structuré, avec ateliers, suivi individuel et livret personnalisé. Vous ne sortez pas avec des notes mais avec une feuille de route opérationnelle pour votre situation.",
  },
  {
    q: "Pourquoi pas une formation certifiante CPF ?",
    a: "Notre choix : être la formation la plus pointue sur le régime micro-entreprise, et non une formation générique de création d'entreprise. La certification RS7005 vise un diplôme. Notre formation vise une compétence opérationnelle. Si votre objectif est de gérer votre micro sans erreur (pas d'ajouter un diplôme à votre CV), nous sommes le bon choix.",
  },
  {
    q: "Combien de temps me prendra la formation ?",
    a: "La formation est modulable. Vous pouvez la suivre en 3 jours pleins, en 6 demi-journées, ou en format individuel adapté à votre rythme. À distance ou en présentiel.",
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
    a: "Nos taux de satisfaction sont publics : 9,8/10 et 100% de recommandation. Si malgré tout vous estimez que la formation ne correspond pas, contactez-nous. Nous trouverons une solution adaptée à votre situation.",
  },
];

// ─── Composant FAQ ────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base">{q}</span>
        <span
          className="text-xl flex-shrink-0 font-bold"
          style={{ color: CORAL }}
          aria-hidden="true"
        >
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-gray-600 leading-relaxed text-sm sm:text-base">{a}</p>
      )}
    </div>
  );
}

// ─── Formulaire court — Voir le programme ─────────────────────────────────
function ShortFormModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    statut: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_WEBHOOK_SHORT;
      if (url) {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "voir_programme", page: "lp-formation-ae" }),
        });
      }
    } catch {
      // silencieux — l'événement tracking est envoyé dans tous les cas
    }
    pushEvent("Lead", { content_name: "formation_ae", form_type: "voir_programme" });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Voir le programme"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8 flex items-center justify-center"
          aria-label="Fermer"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{ backgroundColor: BG_MEDIUM, color: BLUE }}
            >
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Merci !</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Vous recevrez le programme détaillé de la formation par e-mail. Un conseiller FNAE Academy vous contactera rapidement pour répondre à vos questions.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Voir le programme</h3>
            <p className="text-gray-500 text-sm mb-6">
              Recevez le programme complet et bénéficiez d'un appel conseil gratuit.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="sf-prenom" className="block text-xs font-semibold text-gray-700 mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sf-prenom"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.prenom}
                    onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="sf-nom" className="block text-xs font-semibold text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="sf-nom"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="sf-email" className="block text-xs font-semibold text-gray-700 mb-1">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="sf-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label htmlFor="sf-tel" className="block text-xs font-semibold text-gray-700 mb-1">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  id="sf-tel"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.telephone}
                  onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label htmlFor="sf-statut" className="block text-xs font-semibold text-gray-700 mb-1">
                  Votre situation <span className="text-red-500">*</span>
                </label>
                <select
                  id="sf-statut"
                  required
                  value={form.statut}
                  onChange={(e) => setForm((f) => ({ ...f, statut: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="porteur">Je souhaite créer ma micro-entreprise</option>
                  <option value="installé">Déjà micro-entrepreneur en activité</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: CORAL }}
                className="w-full text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition text-sm disabled:opacity-60 mt-2"
              >
                {loading ? "Envoi en cours..." : "Recevoir le programme →"}
              </button>
              <p className="text-xs text-center text-gray-400">
                Données utilisées uniquement pour traiter votre demande. Conformément au RGPD.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Formulaire long — Vérifier mon financement ───────────────────────────
function LongFormModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    statut: "",
    activite: "",
    statutActuel: "",
    codePostal: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = process.env.NEXT_PUBLIC_WEBHOOK_LONG;
      if (url) {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, source: "verifier_financement", page: "lp-formation-ae" }),
        });
      }
    } catch {
      // silencieux
    }
    pushEvent("SubmitApplication", { content_name: "formation_ae", form_type: "verifier_financement" });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Vérifier mon financement"
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-3xl leading-none w-8 h-8 flex items-center justify-center"
          aria-label="Fermer"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold"
              style={{ backgroundColor: BG_MEDIUM, color: BLUE }}
            >
              ✓
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Demande reçue !</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Un conseiller FNAE Academy vous contacte sous 24h ouvrées pour étudier votre situation de financement et vous guider dans le montage du dossier.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Vérifier mon financement</h3>
            <p className="text-gray-500 text-sm mb-6">
              Nos conseillers étudient votre éligibilité FIF-PL, AGEFICE, FAFCEA ou France Travail et vous accompagnent dans le montage du dossier.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lf-prenom" className="block text-xs font-semibold text-gray-700 mb-1">
                    Prénom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lf-prenom"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.prenom}
                    onChange={(e) => setForm((f) => ({ ...f, prenom: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label htmlFor="lf-nom" className="block text-xs font-semibold text-gray-700 mb-1">
                    Nom <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lf-nom"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={form.nom}
                    onChange={(e) => setForm((f) => ({ ...f, nom: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lf-email" className="block text-xs font-semibold text-gray-700 mb-1">
                  E-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="lf-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label htmlFor="lf-tel" className="block text-xs font-semibold text-gray-700 mb-1">
                  Téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  id="lf-tel"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.telephone}
                  onChange={(e) => setForm((f) => ({ ...f, telephone: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lf-activite" className="block text-xs font-semibold text-gray-700 mb-1">
                    Type d'activité <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="lf-activite"
                    required
                    value={form.activite}
                    onChange={(e) => setForm((f) => ({ ...f, activite: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="liberale">Profession libérale (BNC)</option>
                    <option value="commerce">Commerce / services (BIC)</option>
                    <option value="artisan">Artisanat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="lf-statut-actuel" className="block text-xs font-semibold text-gray-700 mb-1">
                    Statut actuel <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="lf-statut-actuel"
                    required
                    value={form.statutActuel}
                    onChange={(e) => setForm((f) => ({ ...f, statutActuel: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 bg-white"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="createur">En cours de création</option>
                    <option value="micro">Micro-entrepreneur en activité</option>
                    <option value="demandeur">Demandeur d'emploi</option>
                    <option value="salarie">Salarié(e)</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="lf-cp" className="block text-xs font-semibold text-gray-700 mb-1">
                  Code postal <span className="text-red-500">*</span>
                </label>
                <input
                  id="lf-cp"
                  type="text"
                  required
                  autoComplete="postal-code"
                  inputMode="numeric"
                  maxLength={5}
                  value={form.codePostal}
                  onChange={(e) => setForm((f) => ({ ...f, codePostal: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400"
                />
              </div>
              <div>
                <label htmlFor="lf-message" className="block text-xs font-semibold text-gray-700 mb-1">
                  Message (optionnel)
                </label>
                <textarea
                  id="lf-message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 resize-none"
                  placeholder="Précisez votre situation si vous le souhaitez..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: BLUE }}
                className="w-full text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition text-sm disabled:opacity-60 mt-2"
              >
                {loading ? "Envoi en cours..." : "Vérifier mon financement →"}
              </button>
              <p className="text-xs text-center text-gray-400">
                Données utilisées uniquement pour traiter votre demande. Conformément au RGPD.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────
export default function FormationAutoEntrepreneurPage() {
  const [modal, setModal] = useState<null | "short" | "long">(null);
  const contentViewedRef = useRef(false);

  // PageView + scroll tracking
  useEffect(() => {
    pushEvent("PageView");

    const handleScroll = () => {
      if (contentViewedRef.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (scrolled / total >= 0.5) {
        pushEvent("ViewContent", { content_name: "formation_ae" });
        contentViewedRef.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openShort = () => setModal("short");
  const openLong = () => setModal("long");
  const closeModal = () => setModal(null);

  const trackPhoneClick = () => {
    pushEvent("Contact", { content_name: "formation_ae", contact_type: "phone" });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── En-tête sticky ──────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 border-b border-white/10 shadow-sm"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img
            src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png"
            alt="Logo FNAE"
            className="h-10 w-auto"
          />
          <button
            onClick={openShort}
            style={{ backgroundColor: CORAL }}
            className="text-white px-4 py-2 rounded text-sm font-bold hover:opacity-90 transition hidden sm:block"
          >
            Voir le programme
          </button>
        </div>
      </header>

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        className="text-white py-16 sm:py-24 px-4 sm:px-6"
        style={{ backgroundColor: NAVY }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6 inline-block px-3 py-1 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#A8CCE8" }}
          >
            Formation certifiée Qualiopi · Finançable par votre fonds professionnel
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
            Maîtrisez votre micro-entreprise.{" "}
            <br className="hidden sm:block" />
            Sans plus jamais paniquer devant l'URSSAF.
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            La formation de la Fédération Nationale des Auto-Entrepreneurs, la seule organisation reconnue représentative au niveau national. Pour ne plus jamais subir l'administratif.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={openShort}
              style={{ backgroundColor: CORAL }}
              className="text-white font-bold px-8 py-4 rounded text-base hover:opacity-90 transition"
            >
              Voir le programme
            </button>
            <button
              onClick={openLong}
              className="text-white font-semibold px-8 py-4 rounded text-base border border-white/40 hover:border-white/70 transition"
            >
              Vérifier mon financement
            </button>
          </div>
          <p className="mt-5 text-blue-200 text-sm">
            À distance ou présentiel · Animée par les formateurs de la FNAE · Note 9,8/10
          </p>
        </div>
      </section>

      {/* ── 2. BAR D'AUTORITÉ ────────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-gray-200 text-center">
            <div className="sm:px-6">
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: BLUE }}>85 000</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-tight">auto-entrepreneurs<br />nous font confiance</p>
            </div>
            <div className="sm:px-6">
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: BLUE }}>Depuis 2009</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-tight">la seule fédération<br />représentative au niveau national</p>
            </div>
            <div className="sm:px-6">
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: BLUE }}>9,8/10</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-tight">note moyenne apprenants<br />100% recommandent</p>
            </div>
            <div className="sm:px-6">
              <p className="text-2xl sm:text-3xl font-extrabold" style={{ color: BLUE }}>Qualiopi</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 leading-tight">formation finançable par<br />votre fonds professionnel</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DOULEUR AGITÉE ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: CREAM }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Vous vous reconnaissez ?
            </h2>
            <p className="text-gray-500 text-base max-w-xl mx-auto">
              Les auto-entrepreneurs qui rejoignent notre formation arrivent souvent avec une de ces situations.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PAIN_POINTS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: CORAL }}
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-gray-600 font-medium">
            Vous n'êtes pas seul. C'est exactement pour cela que la FNAE forme les auto-entrepreneurs depuis 2009.
          </p>
        </div>
      </section>

      {/* ── 4. LA PROMESSE ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ce que vous saurez faire après la formation
            </h2>
          </div>
          <div className="space-y-4">
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 bg-gray-50"
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs font-bold"
                  style={{ backgroundColor: BLUE }}
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <p className="text-gray-800 text-sm sm:text-base leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button
              onClick={openShort}
              style={{ backgroundColor: CORAL }}
              className="text-white font-bold px-8 py-4 rounded text-base hover:opacity-90 transition"
            >
              Voir le programme
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. LE PROGRAMME ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: BG_LIGHT }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Devenir un auto-entrepreneur serein
            </h2>
            <p className="text-gray-500 text-base">
              6 modules de 3h30, animés par des experts du régime micro.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {MODULES.map((mod) => (
              <div
                key={mod.num}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span
                    className="text-2xl font-extrabold flex-shrink-0 leading-none"
                    style={{ color: BG_MEDIUM }}
                    aria-hidden="true"
                  >
                    {mod.num}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{mod.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={openShort}
              style={{ backgroundColor: BLUE }}
              className="text-white font-bold px-8 py-4 rounded text-base hover:opacity-90 transition"
            >
              Télécharger le programme complet
            </button>
          </div>
        </div>
      </section>

      {/* ── 6. DIFFÉRENCIATION ───────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Pourquoi se former avec la FNAE plutôt qu'avec un autre organisme ?
            </h2>
          </div>
          <div className="space-y-4">
            {DIFFERENTIATORS.map((item) => (
              <div
                key={item.label}
                className={`rounded-xl p-6 border ${item.highlight ? "border-0" : "border-gray-200"}`}
                style={item.highlight ? { backgroundColor: NAVY } : undefined}
              >
                <h3
                  className={`font-bold text-base sm:text-lg mb-2 ${item.highlight ? "text-white" : "text-gray-900"}`}
                >
                  {item.label}
                </h3>
                <p
                  className={`text-sm sm:text-base leading-relaxed ${item.highlight ? "text-blue-200" : "text-gray-600"}`}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PREUVE SOCIALE ────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: BG_LIGHT }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div
              className="inline-block px-5 py-2 rounded-full mb-4 text-white text-sm font-bold"
              style={{ backgroundColor: BLUE }}
            >
              9,8/10 · 100% recommandent
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Ce qu'en disent nos apprenants
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4"
              >
                <div className="flex gap-0.5" aria-label="5 étoiles">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4" viewBox="0 0 20 20" fill="#FBBF24" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-gray-700 text-sm leading-relaxed flex-1 italic">
                  « {t.text} »
                </blockquote>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. MODALITÉS ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Une formation pensée pour s'adapter à votre rythme
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                title: "Durée",
                desc: "6 modules de 3h30, en collectif ou en individuel sur mesure.",
              },
              {
                title: "Format",
                desc: "À distance ou en présentiel. En collectif (3 jours ou 6 demi-journées) ou en individuel sur mesure.",
              },
              {
                title: "Animation",
                desc: "Animée par les formateurs experts de la FNAE. Pédagogie active : ateliers, travail de groupe, quiz, travail individuel entre modules.",
              },
              {
                title: "Suivi inclus",
                desc: "Vous repartez avec votre livret de formation personnalisé. Un rendez-vous post-formation d'1h (ou deux RDV de 30 min) est inclus.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-gray-200"
                style={{ backgroundColor: BG_LIGHT }}
              >
                <h3
                  className="font-bold text-base mb-2"
                  style={{ color: NAVY }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Questions fréquentes
          </h2>
          <div>
            {FAQS.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA FINAL + RÉASSURANCE ──────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 text-white" style={{ backgroundColor: NAVY }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">
            Prêt à ne plus subir l'administratif ?
          </h2>
          <p className="text-blue-200 text-base sm:text-lg mb-8 max-w-xl mx-auto">
            Rejoignez les milliers d'auto-entrepreneurs qui ont arrêté de patauger, et qui se forment avec la fédération qui les défend.
          </p>
          <button
            onClick={openShort}
            style={{ backgroundColor: CORAL }}
            className="inline-block text-white font-bold px-10 py-4 rounded text-base hover:opacity-90 transition mb-6"
          >
            Voir le programme et m'inscrire
          </button>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-blue-200 text-xs sm:text-sm">
            <span>Formation certifiée Qualiopi</span>
            <span>·</span>
            <span>Animée par les formateurs experts de la FNAE</span>
            <span>·</span>
            <span>Finançable par votre fonds professionnel</span>
            <span>·</span>
            <span>9,8/10 de note apprenants</span>
            <span>·</span>
            <span>100% recommandent</span>
          </div>
          <p className="mt-8 text-blue-300 text-sm">
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

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer
        className="py-10 px-4 sm:px-6 text-white/60 text-xs"
        style={{ backgroundColor: "#061F30" }}
      >
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-white/80 text-sm">
            <a href="/mentions-legales" className="hover:text-white transition">Mentions légales</a>
            <a href="/politique-de-confidentialite" className="hover:text-white transition">Politique de confidentialité</a>
            <a href="/cgv" className="hover:text-white transition">CGV</a>
            <a href="/cgu" className="hover:text-white transition">CGU</a>
            <a href="/reglement-interieur" className="hover:text-white transition">Règlement intérieur</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>
          <p className="text-center leading-relaxed max-w-3xl mx-auto">
            SAS FNAE Academy · Déclaration d'activité enregistrée sous le numéro 11788786378 auprès du préfet de région d'Île-de-France · SIRET 90087338100025 · Cet enregistrement ne vaut pas agrément de l'État · Formation certifiée Qualiopi au titre des actions de formation · Formations adaptées aux handicaps.
          </p>
          <p className="text-center text-white/40">
            © 2009 – 2026 FNAE Academy
          </p>
        </div>
      </footer>

      {/* ── Barre sticky mobile (CTA bas de page) ────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-white/10 p-3"
        style={{ backgroundColor: NAVY }}
      >
        <button
          onClick={openShort}
          style={{ backgroundColor: CORAL }}
          className="w-full text-white font-bold py-3.5 rounded text-sm hover:opacity-90 transition"
        >
          Voir le programme
        </button>
      </div>

      {/* ── Modaux ───────────────────────────────────────────────────────── */}
      {modal === "short" && <ShortFormModal onClose={closeModal} />}
      {modal === "long" && <LongFormModal onClose={closeModal} />}
    </div>
  );
}
