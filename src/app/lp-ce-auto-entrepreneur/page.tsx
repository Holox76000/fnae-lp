"use client";

import { useState, useEffect } from "react";

const BLUE = "#1A72B4";
const BLUE_DARK = "#1565A0";
const ORANGE = "#ED6952";

const LINKS = {
  essentielAnnuel: "https://fnae.fr/adhesion/essentiel-annuel/",
  essentielMensuel: "https://fnae.fr/adhesion/essentiel-mensuel/",
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

const faqs = [
  {
    q: "Comment j'accède aux réductions ?",
    a: "Dès votre adhésion validée, vous recevez un accès à votre espace adhérent qui contient le catalogue complet des +200 partenaires. Vous générez vos codes promo ou e-billets directement depuis la plateforme, en quelques clics.",
  },
  {
    q: "Les réductions sont-elles cumulables avec d'autres promos ?",
    a: "Cela dépend de chaque partenaire. Pour la majorité d'entre eux, les réductions FNAE sont indépendantes des promotions publiques et cumulables.",
  },
  {
    q: "Quels partenaires exactement ?",
    a: "+200 enseignes : cinéma (Pathé, UGC), voyages (Booking, SNCF, Air France), culture (Fnac), sport (Decathlon, Adidas), streaming (Netflix, Spotify), alimentation (Carrefour), et bien d'autres.",
  },
  {
    q: "Puis-je passer à une formule supérieure plus tard ?",
    a: "Oui, à tout moment depuis votre espace membre. La différence de tarif est calculée au prorata.",
  },
  {
    q: "Puis-je résilier ?",
    a: "Oui, à tout moment. L'adhésion Essentiel est sans engagement, résiliable depuis votre espace membre.",
  },
];

const partners = [
  { name: "Wonderbox", discount: "jusqu'à −50%", logo: "/logos/wonderbox.svg" },
  { name: "Pathé", discount: "~−30%", logo: "/logos/pathe.svg" },
  { name: "Pierre & Vacances", discount: "−30%", logo: "/logos/pierrevacances.svg" },
  { name: "Belambra", discount: "−30%", logo: "/logos/belambra.svg" },
  { name: "Disneyland Paris", discount: "jusqu'à −39 €", logo: "/logos/disneylandparis.png" },
  { name: "Parc Astérix", discount: "offre exclusive", logo: "/logos/parcasterix.png" },
  { name: "Carrefour", discount: "jusqu'à −5%", logo: "/logos/carrefour.svg" },
  { name: "Kiloutou", discount: "jusqu'à −40%", logo: "/logos/kiloutou.svg" },
  { name: "Decathlon", discount: "réductions exclusives", logo: "/logos/decathlon.svg" },
  { name: "Netflix", discount: "offres partenaires", logo: "/logos/netflix.svg" },
  { name: "Spotify", discount: "offres partenaires", logo: "/logos/spotify.svg" },
  { name: "SNCF", discount: "tarifs préférentiels", logo: "/logos/sncf.svg" },
  { name: "Air France", discount: "tarifs préférentiels", logo: "/logos/airfrance.svg" },
  { name: "+190 autres", discount: "partenaires", logo: null },
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

export default function CEPage() {
  const [proAnnual, setProAnnual] = useState(false);
  const [premiumAnnual, setPremiumAnnual] = useState(false);

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
            href={LINKS.essentielAnnuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="text-white px-5 py-2 rounded text-sm font-bold hover:opacity-90 transition"
          >
            Activer mes avantages →
          </a>
        </div>
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: BLUE }} className="text-white py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <TrustpilotBadge />
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Le comité d'entreprise des auto-entrepreneurs.
          </h1>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Récupérez les avantages que votre indépendance vous a retirés. Réductions partenaires sur les loisirs, les voyages, les achats quotidiens.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "✓ Réductions exclusives chez +200 enseignes partenaires",
              "✓ Loisirs, voyages, courses, abonnements",
              "✓ Inclus dès l'adhésion Essentiel",
            ].map((item) => (
              <span key={item} style={{ backgroundColor: BLUE_DARK }} className="text-blue-100 text-sm px-4 py-2 rounded-full">
                {item}
              </span>
            ))}
          </div>
          <a
            href={LINKS.essentielAnnuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg transition hover:opacity-90"
          >
            Activer mes avantages →
          </a>
          <p className="mt-4 text-blue-200 text-sm">À partir de 15 € / an · soit 1,25 € / mois</p>
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

      {/* Comparison */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Les salariés ont leur CE. Vous, indépendant, vous n'avez rien.
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-100">
            <div className="grid grid-cols-[1fr_1fr_1fr]">
              <div style={{ backgroundColor: "#F8FAFC" }} className="p-5 border-b border-gray-200" />
              <div style={{ backgroundColor: "#F0FDF4" }} className="p-5 text-center border-b border-l border-green-100">
                <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2">Salarié</span>
                <p className="text-xs text-green-600">Avantages inclus</p>
              </div>
              <div style={{ backgroundColor: "#FEF2F2" }} className="p-5 text-center border-b border-l border-red-100">
                <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-2">Auto-entrepreneur</span>
                <p className="text-xs text-red-400">sans FNAE</p>
              </div>
            </div>
            {[
              { label: "CE / CSE", icon: "🏢" },
              { label: "Réductions enseignes", icon: "🛍️" },
              { label: "Chèques vacances", icon: "🏖️" },
              { label: "Mutuelle d'entreprise", icon: "🏥" },
            ].map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-[1fr_1fr_1fr] ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
              >
                <div className="p-5 flex items-center gap-3 border-b border-gray-100">
                  <span className="text-xl">{row.icon}</span>
                  <span className="text-gray-800 font-medium text-sm">{row.label}</span>
                </div>
                <div style={{ backgroundColor: i % 2 === 0 ? "#F0FDF4" : "#ECFDF5" }} className="p-5 flex items-center justify-center border-b border-l border-green-50">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div style={{ backgroundColor: i % 2 === 0 ? "#FEF2F2" : "#FFF5F5" }} className="p-5 flex items-center justify-center border-b border-l border-red-50">
                  <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            ))}
            <div style={{ backgroundColor: BLUE }} className="grid grid-cols-[1fr_1fr_1fr]">
              <div className="p-5 flex items-center">
                <span className="text-white font-bold text-sm">Avec la FNAE</span>
              </div>
              <div className="p-5" />
              <div className="p-5 flex items-center justify-center border-l border-blue-400">
                <svg className="w-6 h-6 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white text-sm font-semibold ml-2">Tout inclus</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-lg mb-4">
              Avec la FNAE, vous récupérez tout ça.{" "}
              <strong style={{ color: BLUE }}>Dès 15 € / an.</strong>
            </p>
            <a
              href={LINKS.essentielAnnuel}
              onClick={trackCTA}
              style={{ backgroundColor: ORANGE }}
              className="inline-block text-white font-bold px-8 py-3 rounded-lg transition hover:opacity-90"
            >
              Activer mes avantages →
            </a>
          </div>
        </div>
      </section>

      {/* Partners grid */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">+200 partenaires</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Vos avantages</h2>
            <p className="text-gray-500 text-lg">Un catalogue de réductions sur toutes vos dépenses du quotidien et des loisirs.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((partner) => (
              <div key={partner.name} className="bg-white rounded-xl p-5 text-center border border-gray-200 hover:shadow-md transition flex flex-col items-center justify-center gap-2">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-10 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">+190</span>
                )}
                <p className="font-semibold text-gray-900 text-sm">{partner.name}</p>
                <p className="text-green-600 text-xs font-medium">{partner.discount}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings showcase */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-2">Économies concrètes</p>
            <h2 className="text-3xl font-bold text-gray-900">Ce que vos avantages représentent vraiment</h2>
            <p className="text-gray-500 mt-3">Exemples d'économies réalisées par nos adhérents</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Week-end en famille", saving: "380 €", detail: "économisés sur les vacances d'été via Pierre & Vacances et Booking", icon: "🏖️" },
              { label: "Loisirs sur l'année", saving: "120 €", detail: "récupérés sur le cinéma, le streaming et les achats culturels", icon: "🎬" },
              { label: "Équipement professionnel", saving: "200 €", detail: "économisés sur le matériel Decathlon et les équipements métier", icon: "🛍️" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-200 p-7 text-center hover:shadow-md transition">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <p className="text-4xl font-extrabold mb-1" style={{ color: BLUE }}>{item.saving}</p>
                <p className="font-semibold text-gray-900 text-sm mb-2">{item.label}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-6">Exemples représentatifs basés sur les retours adhérents. Les économies varient selon les partenaires et l'utilisation.</p>
        </div>
      </section>

      {/* More than a CE */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Plus qu'un CE</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Votre adhésion FNAE inclut aussi des outils concrets pour développer et protéger votre activité.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {[
              { icon: "🔔", title: "Veille juridique ciblée", desc: "Alertes en temps réel sur les évolutions réglementaires qui concernent votre activité. Seuils TVA, plafonds CA, cotisations…" },
              { icon: "📍", title: "Annuaire Mon-Presta.fr", desc: "Référencez votre activité gratuitement sur l'annuaire dédié aux auto-entrepreneurs pour gagner en visibilité." },
              { icon: "🤖", title: "Chatbot juridique 24/7", desc: "Posez vos questions juridiques à tout moment. Le chatbot répond instantanément sur les sujets courants du statut." },
              { icon: "🏅", title: "Badge adhérent FNAE", desc: "Affichez votre appartenance au plus grand syndicat des auto-entrepreneurs pour rassurer vos clients." },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
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
                « Avec les réductions FNAE, j'ai économisé 380 € sur mes vacances l'été dernier. L'adhésion s'est rentabilisée 25 fois — et c'est sans compter le cinéma et les abonnements. »
              </blockquote>
              <div>
                <p className="font-semibold text-gray-900 text-sm">Julie B.</p>
                <p className="text-gray-400 text-xs">Coach sportive, Marseille · Adhérente Essentiel</p>
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Tarifs</h2>
            <p className="text-gray-500 text-lg">Rentabilisé dès la 1ère réduction utilisée.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <span className={`text-sm font-medium ${!proAnnual ? "text-gray-900" : "text-gray-400"}`}>Mensuel</span>
              <button
                onClick={() => { setProAnnual(v => !v); setPremiumAnnual(v => !v); }}
                className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
                style={{ backgroundColor: proAnnual ? BLUE : "#D1D5DB" }}
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                  style={{ transform: proAnnual ? "translateX(20px)" : "translateX(0)" }}
                />
              </button>
              <span className={`text-sm font-medium ${proAnnual ? "text-gray-900" : "text-gray-400"}`}>
                Annuel
                <span className="ml-1.5 text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">−20%</span>
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Pro */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="px-7 pt-7 pb-6 border-b border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Pro</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-gray-900">{proAnnual ? "64" : "6,50"}</span>
                  <span className="text-gray-500 mb-2 text-base">€ {proAnnual ? "/an" : "/mois"}</span>
                </div>
                {proAnnual
                  ? <p className="text-xs text-gray-400">soit 5,33 € / mois</p>
                  : <p className="text-xs text-green-600 font-medium">Ou 64 €/an — économisez 14 €</p>
                }
              </div>
              <ul className="px-7 py-6 space-y-3.5 flex-1">
                {[
                  "CE Club réductions +200 enseignes",
                  "Annuaire Mon-Presta.fr",
                  "Hotline juridique illimitée",
                  "Chatbot juridique 24/7",
                  "Génération de documents légaux",
                  "Veille juridique ciblée",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-7">
                <a
                  href={proAnnual ? LINKS.proAnnuel : LINKS.proMensuel}
                  style={{ backgroundColor: BLUE }}
                  className="block text-center py-3.5 rounded-xl font-bold text-white transition hover:opacity-90 text-sm"
                >
                  Choisir Pro
                </a>
              </div>
            </div>

            {/* Premium */}
            <div style={{ backgroundColor: BLUE }} className="relative rounded-2xl overflow-hidden flex flex-col shadow-xl">
              <div className="absolute top-0 right-0">
                <span style={{ backgroundColor: ORANGE }} className="block text-white text-xs font-bold px-4 py-2 rounded-bl-2xl">
                  LE PLUS COMPLET
                </span>
              </div>
              <div className="px-7 pt-7 pb-6 border-b border-blue-400/40">
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">Premium</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">{premiumAnnual ? "139" : "12"}</span>
                  <span className="text-blue-200 mb-2 text-base">€ {premiumAnnual ? "/an" : "/mois"}</span>
                </div>
                {premiumAnnual
                  ? <p className="text-xs text-blue-300">soit 11,58 € / mois</p>
                  : <p className="text-xs text-blue-200 font-medium">Ou 139 €/an — économisez 5 €</p>
                }
              </div>
              <ul className="px-7 py-6 space-y-3.5 flex-1">
                {[
                  "CE Club réductions +200 enseignes",
                  "Tout le plan Pro inclus",
                  "Recouvrement d'impayés (CAARL)",
                  "Médiation des litiges dès 1 €",
                  "3 visios avocat / an incluses",
                  "Génération de contrats blindés",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-blue-100">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="px-7 pb-7">
                <a
                  href={premiumAnnual ? LINKS.premiumAnnuel : LINKS.premiumMensuel}
                  style={{ backgroundColor: ORANGE }}
                  className="block text-center py-3.5 rounded-xl font-bold text-white transition hover:opacity-90 text-sm"
                >
                  Choisir Premium
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Vous voulez juste les réductions CE ?{" "}
              <a href={LINKS.essentielAnnuel} onClick={trackCTA} style={{ color: BLUE }} className="font-semibold hover:underline">
                Découvrez l'offre Essentiel à 15 €/an →
              </a>
            </p>
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
          <h2 className="text-3xl font-bold mb-4">Rattrapez les avantages que votre statut ne vous donne pas.</h2>
          <p className="text-blue-100 text-lg mb-8">15 € par an pour reprendre ce qui vous est dû.</p>
          <a
            href={LINKS.essentielAnnuel}
            onClick={trackCTA}
            style={{ backgroundColor: ORANGE }}
            className="inline-block text-white font-bold px-8 py-4 rounded text-lg hover:opacity-90 transition"
          >
            Activer mes avantages →
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
