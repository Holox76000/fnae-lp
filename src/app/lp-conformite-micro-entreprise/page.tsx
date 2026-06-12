"use client";

import { useState, useEffect } from "react";

const BLUE = "#1A72B4";
const BLUE_DARK = "#1565A0";
const ORANGE = "#ED6952";

const LINKS = {
  essentielMensuel: "https://fnae.fr/adhesion/essentiel-mensuel/",
  essentielAnnuel: "https://fnae.fr/adhesion/essentiel-annuel/",
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

const faqs = [
  {
    q: "Comment je suis prévenu des changements ?",
    a: "Par e-mail, SMS et notification dans votre espace adhérent. Une alerte prioritaire est envoyée dans les 24 h suivant la publication officielle.",
  },
  {
    q: "La veille couvre-t-elle aussi la TVA et les seuils ?",
    a: "Oui, intégralement. Nos alertes couvrent les seuils de franchise en base de TVA, les plafonds de chiffre d'affaires, les cotisations sociales et toutes les obligations déclaratives liées au statut.",
  },
  {
    q: "Est-ce que vous remplacez mon expert-comptable ?",
    a: "Non. La FNAE complète votre expert-comptable en vous alertant en temps réel sur les changements réglementaires. Votre comptable s'occupe de la gestion, nous veillons sur les règles.",
  },
  {
    q: "Combien de questions puis-je poser à la hotline ?",
    a: "Autant que vous voulez. La hotline juridique est illimitée avec l'adhésion Pro et Premium. Aucune limite mensuelle, aucun quota.",
  },
  {
    q: "Puis-je résilier ?",
    a: "Oui, à tout moment depuis votre espace membre. Sans justification, sans frais.",
  },
];

const pricingPlans = [
  {
    name: "Essentiel",
    price: "2",
    annual: "15",
    popular: false,
    features: [
      "Espace adhérent",
      "Alertes réglementaires",
      "Actualités syndicales",
      "Badge adhérent FNAE",
      "Annuaire Mon-Presta.fr",
    ],
    cta: "Choisir Essentiel",
    hrefMensuel: LINKS.essentielMensuel,
    hrefAnnuel: LINKS.essentielAnnuel,
  },
  {
    name: "Pro",
    price: "6,50",
    annual: "64",
    popular: true,
    features: [
      "Tout l'Essentiel inclus",
      "Hotline juridique illimitée",
      "Génération de documents légaux",
      "Modèles de contrats",
      "Veille ciblée par activité",
      "Chatbot juridique 24/7",
    ],
    cta: "Choisir Pro",
    hrefMensuel: LINKS.proMensuel,
    hrefAnnuel: LINKS.proAnnuel,
  },
  {
    name: "Premium",
    price: "12",
    annual: "139",
    popular: false,
    features: [
      "Tout le Pro inclus",
      "Recouvrement d'impayés (CAARL)",
      "Médiation des litiges dès 1 €",
      "3 visios avocat / an incluses",
      "Mise en demeure & relances",
      "Suivi de dossier dédié",
    ],
    cta: "Choisir Premium",
    hrefMensuel: LINKS.premiumMensuel,
    hrefAnnuel: LINKS.premiumAnnuel,
  },
];

function TrustpilotBadge() {
  return (
    <div
      style={{ backgroundColor: BLUE_DARK }}
      className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 mb-8"
    >
      <img
        src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg"
        alt="4,8/5"
        className="h-5"
      />
      <span className="text-white text-sm font-semibold">4,8/5</span>
      <img
        src="https://cdn.trustpilot.net/brand-assets/4.1.0/logo-white.svg"
        alt="Trustpilot"
        className="h-4 opacity-90"
      />
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

function PricingCard({ plan }: { plan: typeof pricingPlans[number] }) {
  const [annual, setAnnual] = useState(false);
  return (
    <div
      style={plan.popular ? { backgroundColor: BLUE } : undefined}
      className={`relative rounded-xl p-7 flex flex-col ${
        plan.popular ? "text-white shadow-2xl scale-105" : "bg-white border border-gray-200"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            style={{ backgroundColor: ORANGE }}
            className="text-white text-xs font-bold px-4 py-1 rounded-full"
          >
            LE PLUS POPULAIRE
          </span>
        </div>
      )}
      <h3 className={`text-lg font-bold mb-4 ${plan.popular ? "text-white" : "text-gray-900"}`}>
        {plan.name}
      </h3>
      <div className="mb-1">
        <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
          {annual ? plan.annual : plan.price} €
        </span>
        <span className={`text-sm ml-1 ${plan.popular ? "text-blue-200" : "text-gray-500"}`}>
          {annual ? "/an" : "/mois"}
        </span>
      </div>
      <button
        onClick={() => setAnnual(!annual)}
        className={`text-xs mb-6 text-left underline underline-offset-2 ${
          plan.popular ? "text-blue-200" : "text-gray-400"
        }`}
      >
        {annual ? `Ou ${plan.price} €/mois` : `Ou ${plan.annual} €/an (−20%)`}
      </button>
      <ul className="space-y-3 flex-1 mb-8">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
            <span className={plan.popular ? "text-blue-100" : "text-gray-700"}>{f}</span>
          </li>
        ))}
      </ul>
      <a
        href={annual ? plan.hrefAnnuel : plan.hrefMensuel}
        style={{ backgroundColor: plan.popular ? ORANGE : BLUE }}
        className="block text-center py-3 rounded font-semibold transition text-white hover:opacity-90"
      >
        {plan.cta}
      </a>
    </div>
  );
}

export default function ConformitePage() {
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
            href={LINKS.proMensuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="text-white px-5 py-2 rounded text-sm font-bold hover:opacity-90 transition"
          >
            Je me mets en règle →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: BLUE }} className="text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TrustpilotBadge />
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Ne découvrez plus les nouvelles règles après avoir fait une erreur.
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            La veille juridique dédiée aux micro-entrepreneurs. Soyez alerté avant que les règles vous rattrapent.
          </p>
          <a
            href={LINKS.proMensuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg transition hover:opacity-90"
          >
            Je me mets en règle →
          </a>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <span>✓ Sans engagement</span>
            <span>✓ Résiliable à tout moment</span>
            <span>✓ Syndicat représentatif depuis 2020</span>
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
              Les règles changent. Vous ne pouvez pas tout suivre.
              <br className="hidden sm:block" /> Mais une seule erreur peut coûter cher.
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              TVA, plafonds, cotisations, déclarations… La réglementation évolue en permanence et les sanctions ne préviennent pas.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-8 text-center mb-8">
            <p className="text-5xl font-bold text-amber-600 mb-2">1 sur 3</p>
            <p className="text-gray-700 text-lg">
              des micro-entrepreneurs a fait face à un contrôle dans les 5 ans, souvent pour une obligation qu'ils ignoraient.
            </p>
          </div>

          {/* Official union callout */}
          <div
            className="rounded-xl p-6 mb-12 flex flex-col sm:flex-row items-center gap-5"
            style={{ backgroundColor: "#EBF5FB", border: `2px solid ${BLUE}` }}
          >
            <div className="flex-shrink-0 text-4xl">🏛️</div>
            <div className="flex-1">
              <p className="font-bold text-gray-900 mb-1">
                La FNAE est le seul syndicat représentatif reconnu par l'État pour les micro-entrepreneurs.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Membre de la CPME, présente au CPSTI et dans les instances nationales, la FNAE négocie directement les règles qui vous impactent — et vous avertit avant qu'elles entrent en vigueur.
              </p>
            </div>
            <div className="flex-shrink-0">
              <span
                className="inline-block text-xs font-bold px-4 py-2 rounded-full text-white"
                style={{ backgroundColor: BLUE }}
              >
                Reconnu depuis 2020
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "⚠️", title: "Seuils de TVA méconnus", desc: "Le franchissement non déclaré peut entraîner un rappel rétroactif et des pénalités." },
              { icon: "⚠️", title: "Plafonds de CA dépassés", desc: "Perdre votre statut sans l'avoir vu venir, c'est possible si vous n'êtes pas alerté à temps." },
              { icon: "⚠️", title: "Cotisations mal calculées", desc: "Des taux qui changent, des bases de calcul qui évoluent… sans suivi, vous payez mal ou trop peu." },
              { icon: "⚠️", title: "Obligations déclaratives oubliées", desc: "Une déclaration manquée peut entraîner une majoration ou une suspension de votre activité." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-6 bg-gray-50 rounded-xl">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">Simple & rapide</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Une veille pensée pour la micro-entreprise,
              <br className="hidden sm:block" /> pas pour les grandes entreprises.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Vous adhérez", desc: "En ligne, en quelques minutes. Accès immédiat à votre espace adhérent." },
              { n: "02", title: "Vous activez votre accès", desc: "Hotline, alertes, espace membre — tout est configuré selon votre activité (BIC, BNC, artisan…)." },
              { n: "03", title: "Vous êtes alerté en temps réel", desc: "Notifications personnalisées avec check-lists concrètes à chaque changement qui vous concerne." },
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

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Ce que vous obtenez</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: "🎯", title: "Veille ciblée par activité", desc: "Les alertes sont filtrées selon votre type d'activité (BIC/BNC, artisan, profession libérale…). Vous ne recevez que ce qui vous concerne." },
              { icon: "📝", title: "Explications claires, sans jargon", desc: "Chaque alerte est traduite en actions concrètes. Vous savez exactement quoi faire et avant quelle date." },
              { icon: "🔔", title: "Rappels automatisés", desc: "Calendrier des échéances, alertes avant les dates clés, check-lists de conformité intégrées." },
              { icon: "📞", title: "Accès illimité aux juristes", desc: "Une question sur une règle ? Nos juristes spécialisés vous répondent sous 24h, sans limite de questions." },
            ].map((feat) => (
              <div key={feat.title} className="flex gap-5 p-6 rounded-xl border border-gray-200 hover:shadow-md transition">
                <span className="text-3xl flex-shrink-0">{feat.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
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
                « Sans la veille FNAE, je serais passée à côté d'un changement de plafond… Ce service m'a évité une erreur qui aurait pu me coûter plusieurs milliers d'euros. »
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Claire D.</p>
                <p className="text-gray-400 text-xs">Consultante RH, Bordeaux</p>
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Tarifs</h2>
            <p className="text-gray-500 text-lg">Tranquillité juridique à partir de 2 € / mois.</p>
          </div>
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
              🎉 −20% avec l'abonnement annuel
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Questions fréquentes</h2>
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
          <h2 className="text-3xl font-bold mb-4">Ne prenez plus le risque de l'ignorance réglementaire.</h2>
          <p className="text-blue-100 text-lg mb-8">Rejoignez 80 000 micro-entrepreneurs qui se mettent à jour sans effort.</p>
          <a
            href={LINKS.proMensuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg hover:opacity-90 transition"
          >
            Je me mets en règle →
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
