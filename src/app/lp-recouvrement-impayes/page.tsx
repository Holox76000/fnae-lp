"use client";

import { useState, useEffect } from "react";

const BLUE = "#1A72B4";
const BLUE_DARK = "#1565A0";
const ORANGE = "#ED6952";

const CTA_URL = "https://fnae.fr/adhesion/premium-mensuel/";
const CTA_URL_ANNUAL = "https://fnae.fr/adhesion/premium-annuel/";

const faqs = [
  {
    q: "Combien de temps prend un recouvrement ?",
    a: "En moyenne, 6 à 8 semaines pour une médiation amiable. La FNAE prend votre dossier en charge dès la signalisation et lance les démarches sous 72 h. Si la médiation aboutit, le règlement intervient généralement dans le mois qui suit.",
  },
  {
    q: "Que se passe-t-il si mon client refuse la médiation ?",
    a: "Si le client refuse la médiation amiable, nos juristes vous orientent vers les démarches judiciaires appropriées : injonction de payer, référé… Nous vous assistons à chaque étape.",
  },
  {
    q: "Est-ce que la FNAE remplace un avocat ?",
    a: "Non. La FNAE vous accompagne via ses juristes et partenaires (CAARL) pour les démarches amiables et la génération de documents. Pour les actions en justice, nous vous orientons vers les bons professionnels.",
  },
  {
    q: "Quel est le montant minimum d'impayé pour être pris en charge ?",
    a: "Il n'y a pas de minimum. La médiation FNAE intervient dès 1 € d'impayé avec l'adhésion Premium.",
  },
];

function TrustpilotBadge() {
  return (
    <div
      style={{ backgroundColor: BLUE_DARK }}
      className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-8"
    >
      <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg" alt="4,8/5" className="h-5" />
      <span className="text-white text-sm font-semibold">4,8/5</span>
      <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg" alt="Trustpilot" className="h-4 opacity-90" />
      <span className="text-blue-200 text-sm">· 471 avis vérifiés</span>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900">{q}</span>
        <span style={{ color: BLUE }} className="text-xl flex-shrink-0 font-bold">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && <p className="pb-5 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
}

export default function RecouvrementPage() {
  const [annual, setAnnual] = useState(true);

  useEffect(() => {
    const w = window as any;
    if (w.fbq) return;
    const f: any = function (...args: any[]) { f.callMethod ? f.callMethod.apply(f, args) : f.queue.push(args); };
    w.fbq = w._fbq = f;
    f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
    const s = document.createElement("script");
    s.async = true; s.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(s);
    w.fbq("init", "3020497201339683");
    w.fbq("track", "PageView");
  }, []);

  const trackCTA = () => {
    const w = window as any;
    if (typeof w.fbq === "function") w.fbq("track", "AddToCart");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <img src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png" alt="FNAE" className="h-14 w-auto" />
          <a
            href={CTA_URL}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="text-white px-5 py-2 rounded text-sm font-bold hover:opacity-90 transition"
          >
            Je récupère mon argent →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: BLUE }} className="text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TrustpilotBadge />
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Récupérez les impayés de votre micro-entreprise.
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Médiation et recouvrement amiable pour les auto-entrepreneurs. Sans avocat à payer, sans procédure compliquée.
          </p>
          <a
            href={CTA_URL}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg transition hover:opacity-90"
          >
            Je récupère mon argent →
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <span>✓ Prise en charge sous 72h</span>
            <span>✓ Dès 1 € d'impayé</span>
            <span>✓ Partenariat CAARL</span>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-extrabold" style={{ color: BLUE }}>80 000+</p>
              <p className="text-gray-500 text-sm mt-1">adhérents</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: BLUE }}>4,8/5</p>
              <p className="text-gray-500 text-sm mt-1">sur Trustpilot · 471 avis</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: BLUE }}>2009</p>
              <p className="text-gray-500 text-sm mt-1">au service des indépendants</p>
            </div>
            <div>
              <p className="text-3xl font-extrabold" style={{ color: BLUE }}>2020</p>
              <p className="text-gray-500 text-sm mt-1">Syndicat représentatif reconnu par l'État</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ils nous soutiennent */}
      <section className="py-10 px-4 sm:px-6" style={{ backgroundColor: "#F2F5F8" }}>
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-gray-400 text-sm font-medium mb-8 uppercase tracking-wider">Ils nous soutiennent</p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16">
            {[
              { src: "/logos/dgfip.svg", alt: "Direction Générale des Finances Publiques" },
              { src: "/logos/urssaf.svg", alt: "Urssaf" },
              { src: "/logos/inpi.svg", alt: "INPI" },
              { src: "/logos/cpsti.png", alt: "CPSTI" },
              { src: "/logos/cipav.svg", alt: "La CIPAV" },
              { src: "/logos/caisse-depots.svg", alt: "Caisse des Dépôts" },
            ].map((logo) => (
              <img key={logo.alt} src={logo.src} alt={logo.alt} className="h-10 object-contain" style={{ filter: "grayscale(100%) opacity(0.55)" }} />
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              1 facture impayée sur 4 ne sera jamais recouvrée si vous ne faites rien.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Sans action, vos clients savent qu'ils peuvent ne pas payer. Chaque impayé laissé sans suite en encourage d'autres.
            </p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center mb-12">
            <p className="text-5xl font-bold text-red-600 mb-2">1 800 €</p>
            <p className="text-gray-700 text-lg">
              En moyenne, un auto-entrepreneur perd <strong>1 800 € par an</strong> à cause des impayés non recouvrés.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "📵", title: "Relances ignorées", desc: "Vous envoyez des mails, vous appelez — pas de réponse. Votre client fait le mort." },
              { icon: "⚖️", title: "Sans avocat, vous vous sentez bloqué", desc: "Vous ne savez pas si vous pouvez agir sans payer des frais juridiques qui dépassent la dette." },
              { icon: "⏱️", title: "Du temps perdu à courir après l'argent", desc: "Chaque heure à relancer est une heure non facturée. Le coût réel d'un impayé va bien au-delà du montant." },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-gray-50 rounded-xl">
                <span className="text-4xl block mb-3">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">Processus en 3 étapes</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Comment la FNAE vous aide à récupérer vos impayés
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Vous adhérez", desc: "Adhésion Premium en ligne en quelques minutes. Accès immédiat à tous les services de recouvrement." },
              { n: "02", title: "Vous nous signalez l'impayé", desc: "Via la hotline ou votre espace membre. Un juriste prend votre dossier en charge sous 72h." },
              { n: "03", title: "Nous lançons le recouvrement", desc: "Médiation, mises en demeure, recouvrement amiable via notre partenaire CAARL." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div style={{ backgroundColor: BLUE }} className="w-14 h-14 rounded-full text-white flex items-center justify-center text-xl font-bold mx-auto mb-5">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full offering */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">L'offre complète</h2>
            <p className="text-gray-500 text-lg">Ce que vous obtenez en plus du recouvrement</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: "🛡️", title: "Recouvrement d'impayés (CAARL)", desc: "Intermédiaire agréé, médiation professionnelle, recouvrement amiable." },
              { icon: "⚖️", title: "Médiation des litiges dès 1 €", desc: "Aucun montant minimum. Chaque impayé mérite d'être traité." },
              { icon: "👨‍⚖️", title: "3 visios avocat / an incluses", desc: "Consultations vidéo avec un avocat spécialisé en droit des affaires." },
              { icon: "📄", title: "Contrats blindés en 1 clic", desc: "CGV, devis, contrats de prestation — générés en quelques secondes." },
              { icon: "📞", title: "Hotline juridique illimitée", desc: "Réponse sous 24h, sans limite de questions, par des juristes spécialisés." },
              { icon: "📋", title: "Suivi de dossier dédié", desc: "Un juriste suit votre dossier de bout en bout avec mise en demeure et relances." },
            ].map((feat) => (
              <div key={feat.title} className="p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                <span className="text-3xl block mb-3">{feat.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAARL partnership */}
      <section className="py-16 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-2">Partenaire officiel</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Recouvrement via le CAARL</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
              La FNAE travaille en partenariat avec le CAARL, intermédiaire agréé spécialisé dans le recouvrement amiable pour les indépendants.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-7 text-center border border-gray-200">
              <p className="text-4xl font-extrabold mb-1" style={{ color: BLUE }}>72h</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Prise en charge</p>
              <p className="text-gray-500 text-xs">Votre dossier est traité sous 72h après signalement</p>
            </div>
            <div className="bg-white rounded-xl p-7 text-center border border-gray-200">
              <p className="text-4xl font-extrabold mb-1" style={{ color: BLUE }}>1 €</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Montant minimum</p>
              <p className="text-gray-500 text-xs">Médiation dès 1 € d'impayé, sans plafond</p>
            </div>
            <div className="bg-white rounded-xl p-7 text-center border border-gray-200">
              <p className="text-4xl font-extrabold mb-1" style={{ color: BLUE }}>6–8 sem.</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">Médiation amiable</p>
              <p className="text-gray-500 text-xs">Délai moyen avant règlement après médiation réussie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg" alt="4,8/5" className="h-5" />
              <span className="font-semibold text-gray-700 text-sm">4,8/5 · 471 avis vérifiés sur</span>
              <span style={{ color: "#00B67A" }} className="font-bold text-sm">Trustpilot</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Ce que disent nos adhérents</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4">
              <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 étoiles" className="h-5 w-auto" />
              <blockquote className="text-gray-700 italic leading-relaxed flex-1">
                « J'avais 2 400 € d'impayés sur un client qui ne répondait plus. Grâce à la FNAE, j'ai récupéré 100 % en 6 semaines. Sans elle, j'aurais lâché l'affaire. »
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Sarah M.</p>
                <p className="text-gray-400 text-xs">Graphiste freelance, Lyon</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4">
              <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 étoiles" className="h-5 w-auto" />
              <blockquote className="text-gray-700 italic leading-relaxed flex-1">
                « J'ai observé avec satisfaction les actions menées par votre organisation qui se positionne comme un véritable rempart pour les entrepreneurs. »
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Jean-Michel RUBALO</p>
                <p className="text-gray-400 text-xs">Adhérent depuis 10 ans</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm flex flex-col gap-4">
              <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 étoiles" className="h-5 w-auto" />
              <blockquote className="text-gray-700 italic leading-relaxed flex-1">
                « Une question complexe reçoit une réponse simple ; tout besoin d'assistance est résolu dans la foulée. »
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Marc Etienne BOUVIER</p>
                <p className="text-gray-400 text-xs">Consultant en entreprise</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href="https://fr.trustpilot.com/review/fnae.fr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-600 transition underline underline-offset-2">
              Voir tous les avis sur Trustpilot →
            </a>
          </div>
        </div>
      </section>

      {/* Institutional legitimacy */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Reconnaissance officielle</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Un syndicat reconnu par l'État, représentant les indépendants dans les instances nationales
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EBF5FB" }}>
                <span className="text-xl">🏛️</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Syndicat représentatif</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Reconnu par l'État depuis 2020 · Fondé en 2009</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EBF5FB" }}>
                <span className="text-xl">🤝</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Membre de la CPME</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Confédération des PME · Représentation patronale nationale</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#EBF5FB" }}>
                <span className="text-xl">📋</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm">Instances nationales</h3>
              <p className="text-gray-500 text-xs leading-relaxed">Représentée au CPSTI, CAF, CIPAV et Caisse des Dépôts</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {["CPSTI", "CIPAV", "CAF", "DGFIP", "INPI", "CPME"].map((body) => (
              <span
                key={body}
                className="text-xs font-semibold px-4 py-2 rounded-full border"
                style={{ borderColor: BLUE, color: BLUE }}
              >
                {body}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Tarifs</h2>
            <p className="text-gray-500 text-lg">Sécurisez votre activité dès aujourd'hui.</p>
          </div>

          <div style={{ backgroundColor: BLUE }} className="text-white rounded-xl p-8 relative overflow-hidden">
            <div style={{ backgroundColor: BLUE_DARK }} className="absolute top-0 right-0 w-40 h-40 rounded-full -translate-y-1/2 translate-x-1/2 opacity-40" />
            <div style={{ backgroundColor: BLUE_DARK }} className="absolute bottom-0 left-0 w-28 h-28 rounded-full translate-y-1/2 -translate-x-1/2 opacity-40" />
            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <span style={{ backgroundColor: ORANGE }} className="text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    RECOMMANDÉ
                  </span>
                  <h3 className="text-2xl font-bold">Premium</h3>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold">{annual ? "139 €" : "12 €"}</p>
                  <p className="text-blue-200 text-sm">{annual ? "/an" : "/mois"}</p>
                </div>
              </div>
              <button
                onClick={() => setAnnual(!annual)}
                className="text-blue-200 text-xs underline underline-offset-2 mb-6 block"
              >
                {annual ? "Ou 12 €/mois" : "Ou 139 €/an (−20%)"}
              </button>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {[
                  "Intermédiaire de recouvrement (CAARL)",
                  "Médiation des litiges dès 1 €",
                  "3 visios avocat / an incluses",
                  "Mise en demeure & relances",
                  "Génération de contrats blindés",
                  "Hotline juridique illimitée",
                  "Suivi de dossier dédié",
                  "Veille juridique ciblée",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-blue-100">{f}</span>
                  </div>
                ))}
              </div>
              <a
                href={annual ? CTA_URL_ANNUAL : CTA_URL}
                style={{ backgroundColor: ORANGE }}
                className="block text-center text-white font-bold py-4 rounded text-lg transition hover:opacity-90"
              >
                Je récupère mon argent →
              </a>
              <p className="text-blue-200 text-xs text-center mt-3">Paiement sécurisé · Résiliable à tout moment</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Vos questions sur le recouvrement</h2>
          <p className="text-gray-500 text-center mb-12">Questions fréquentes</p>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ backgroundColor: BLUE }} className="py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ne laissez pas vos clients vous voler votre travail.</h2>
          <p className="text-blue-100 text-lg mb-8">Chaque jour sans agir, c'est un jour de plus que votre client gagne. Reprenez le contrôle.</p>
          <a
            href={CTA_URL}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg hover:opacity-90 transition"
          >
            Je récupère mon argent →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: BLUE_DARK }} className="text-white/70 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="bg-white rounded px-3 py-1.5"><img src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png" alt="FNAE" className="h-10 w-auto" /></div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
            <a href="tel:+33285528607" className="hover:text-white transition text-white font-medium">02 85 52 86 07</a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="https://fnae.fr/mentions-legales/" className="hover:text-white transition">Mentions légales</a>
            <a href="https://fnae.fr/politique-de-confidentialite/" className="hover:text-white transition">Confidentialité</a>
            <a href="https://fnae.fr/contact/" className="hover:text-white transition">Contact</a>
          </div>
          <p>© 2009 – {new Date().getFullYear()} FNAE</p>
        </div>
      </footer>
    </div>
  );
}
