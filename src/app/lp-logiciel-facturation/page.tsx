"use client";

import { useState, useEffect } from "react";

const BLUE = "#1A72B4";
const BLUE_DARK = "#1565A0";
const ORANGE = "#ED6952";

const LINKS = {
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

const faqs = [
  {
    q: "C'est quoi la facture électronique, concrètement ?",
    a: "Ce n'est pas un PDF par e-mail. La facture électronique est un fichier structuré (Factur-X, UBL, CII) transmis via une plateforme agréée par l'État appelée PA (Plateforme Agréée). Votre client la reçoit dans son propre logiciel, et l'administration fiscale en reçoit une copie. Objectif : lutter contre la fraude à la TVA et automatiser les échanges entre professionnels.",
  },
  {
    q: "Quand est-ce obligatoire pour moi, auto-entrepreneur ?",
    a: "Deux échéances : à partir du 1ᵉʳ septembre 2026, vous devez pouvoir RECEVOIR vos factures électroniques émises par d'autres pros (toutes tailles d'entreprises). À partir du 1ᵉʳ septembre 2027, vous devrez aussi les ÉMETTRE. Aucune dérogation pour les micro-entreprises.",
  },
  {
    q: "Que se passe-t-il si je ne suis pas prêt ?",
    a: "Vous ne pourrez pas recevoir les factures de vos fournisseurs ni en émettre vers vos clients pros. Côté sanctions : amende de 250 € par mois tant que vous n'êtes pas en règle. Surtout, vos clients professionnels ne pourront simplement plus travailler avec vous.",
  },
  {
    q: "Qu'est-ce qu'une PA et pourquoi j'en ai besoin ?",
    a: "La PA (Plateforme Agréée) est le canal officiel qui transmet vos factures électroniques. Vous ne pouvez plus envoyer une facture en direct par e-mail à un client pro : elle doit passer par une PA agréée par l'État. FNAE Gestion est connecté aux PA : aucune démarche pour vous, aucun surcoût.",
  },
  {
    q: "FNAE Gestion est-il vraiment prêt pour la réforme ?",
    a: "Oui. Le logiciel génère déjà aujourd'hui le format Factur-X (PDF + données structurées), gère l'archivage 10 ans, la piste d'audit fiable et la connexion aux PA. Vous ne basculerez pas en septembre 2026 : vous y êtes déjà.",
  },
  {
    q: "Vais-je devoir migrer mes anciennes factures ?",
    a: "Non. Vos factures émises avant l'obligation restent valables au format actuel. La réforme s'applique uniquement aux nouvelles factures émises à des professionnels après votre échéance d'obligation.",
  },
  {
    q: "Combien coûte la mise en conformité ?",
    a: "Elle est incluse dans votre adhésion FNAE. L'adhésion Pro (6,50 €/mois ou 64 €/an) donne accès au logiciel de facturation électronique conforme + hotline juridique illimitée + CE Club +200 enseignes. L'adhésion Premium (12 €/mois ou 139 €/an) ajoute le recouvrement d'impayés, la médiation des litiges et 3 visios avocat / an.",
  },
  {
    q: "Qu'est-ce qui est inclus dans l'adhésion ?",
    a: "Bien plus que la facture électronique. Côté facturation : logiciel FNAE Gestion conforme Factur-X, PA intégrée, archivage 10 ans. Côté juridique : hotline avocats illimitée, génération de contrats et documents légaux, veille réglementaire. Côté avantages : CE Club +200 enseignes (cinéma, voyages, sport, streaming…). Premium ajoute : recouvrement CAARL, médiation, visios avocat.",
  },
];

const testimonials = [
  {
    name: "Doriane W.",
    role: "Coiffeuse · cliente depuis 2024",
    text: "Je ne savais même pas ce qu'était une PA. La démo m'a tout expliqué simplement, et j'ai compris que j'étais déjà en règle pour 2026. Énorme soulagement.",
  },
  {
    name: "Sophie M.",
    role: "Graphiste freelance",
    text: "Grâce à FNAE Gestion, je suis déjà en règle en prévision de septembre 2026. Aucune démarche à faire de mon côté, tout est prêt : je peux me concentrer sur mes clients l'esprit tranquille.",
  },
  {
    name: "Stéphane D.",
    role: "Freelance · clients pros",
    text: "Le vrai sujet, c'est de ne pas se réveiller en septembre 2027 avec 250 €/mois d'amende tant qu'on n'est pas en règle. Là c'est fait, je suis tranquille.",
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
      <span className="text-blue-200 text-sm">· 468 avis vérifiés</span>
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

function InvoiceMockup() {
  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-200 p-6 sm:p-7 w-full max-w-sm mx-auto text-left">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Facture électronique</p>
          <p className="text-lg font-extrabold text-gray-900">F-2026-0042</p>
        </div>
        <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">FACTUR-X ✓</span>
      </div>
      <div className="text-xs text-gray-500 mb-4 space-y-0.5">
        <p>Émise via PA · 12 mars 2026</p>
        <p>Reçue par le client · 12 mars 2026, 10:42</p>
      </div>
      <div className="border-t border-b border-gray-100 py-3 mb-3 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Prestation de conseil</span>
          <span className="font-semibold text-gray-900">1 200,00 €</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-600">Frais de déplacement</span>
          <span className="font-semibold text-gray-900">120,00 €</span>
        </div>
      </div>
      <div className="flex justify-between items-baseline mb-4">
        <span className="text-xs font-semibold text-gray-700">Total à payer</span>
        <span className="text-2xl font-extrabold" style={{ color: BLUE }}>1 320,00 €</span>
      </div>
      <div className="rounded-lg p-3 mb-3" style={{ backgroundColor: "#EBF5FB" }}>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: BLUE }}>Conformité automatique</p>
        <p className="text-[11px] text-gray-700 leading-snug">Format structuré · Mentions 293B · Archivage 10 ans · Piste d'audit fiable</p>
      </div>
      <p className="text-[10px] text-gray-400 leading-relaxed">
        TVA non applicable, art. 293 B du CGI · SIREN 123 456 789
      </p>
    </div>
  );
}

export default function LogicielPage() {
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center">
          <img src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png" alt="FNAE" className="h-14 w-auto" />
        </div>
      </header>

      {/* Hero */}
      <section style={{ backgroundColor: BLUE }} className="text-white pt-8 pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex justify-center lg:justify-start [&>div]:mb-5">
              <TrustpilotBadge />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-5">
              La facture électronique devient obligatoire. Nous vous mettons en conformité.
            </h1>
            <p className="text-base sm:text-lg text-blue-100 mb-8 max-w-xl">
              Dès le <strong className="text-white">1ᵉʳ septembre 2026</strong>, la réforme rend la conformité obligatoire pour toutes les micro-entreprises. Votre adhésion FNAE inclut le logiciel de facturation conforme, et bien plus.
            </p>
            <div className="flex justify-center lg:justify-start">
              <a
                href={LINKS.proAnnuel}
                onClick={trackCTA}
                style={{ backgroundColor: ORANGE }}
                className="inline-block text-white font-bold px-6 py-3 rounded text-base transition hover:opacity-90"
              >
                Adhérer à FNAE →
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <InvoiceMockup />
          </div>
        </div>
      </section>

      {/* Timeline / Stats bar */}
      <section className="bg-white border-b border-gray-100 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: ORANGE }}>1ᵉʳ sept. 2026</p>
              <p className="text-gray-500 text-xs mt-1">Réception obligatoire</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: ORANGE }}>1ᵉʳ sept. 2027</p>
              <p className="text-gray-500 text-xs mt-1">Émission obligatoire</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: BLUE }}>250 €</p>
              <p className="text-gray-500 text-xs mt-1">Amende par mois si non conforme</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-extrabold" style={{ color: BLUE }}>+80 000</p>
              <p className="text-gray-500 text-xs mt-1">Adhérents FNAE protégés</p>
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

      {/* C'est quoi la réforme */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">La réforme en 30 secondes</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Ce que change la facture électronique pour vous
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Toutes les factures émises à un autre professionnel doivent passer par une plateforme agréée (PA). Un PDF par e-mail ne suffira plus.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl p-7 border-2" style={{ borderColor: "#FECACA", backgroundColor: "#FEF2F2" }}>
              <span className="inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-4">AVANT</span>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">PDF + e-mail</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-red-500">✗</span> Facture PDF envoyée par mail</li>
                <li className="flex gap-2"><span className="text-red-500">✗</span> Saisie manuelle côté client</li>
                <li className="flex gap-2"><span className="text-red-500">✗</span> Aucune traçabilité fiscale</li>
                <li className="flex gap-2"><span className="text-red-500">✗</span> Bientôt illégal entre pros</li>
              </ul>
            </div>
            <div className="rounded-xl p-7 border-2" style={{ borderColor: "#BBF7D0", backgroundColor: "#F0FDF4" }}>
              <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">APRÈS · 2026/27</span>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Factur-X via PA</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-green-600">✓</span> Fichier structuré (Factur-X, UBL, CII)</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Transmise via plateforme agréée</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Reçue directement dans le logiciel du client</li>
                <li className="flex gap-2"><span className="text-green-600">✓</span> Conforme & archivée 10 ans</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3 piliers */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">Pourquoi adhérer à FNAE</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Conformité 2026/27 + accompagnement juridique + avantages, en une seule adhésion
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto">
              Co-créé avec +80 000 auto-entrepreneurs pour que personne ne soit pris au dépourvu en septembre 2026.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "📥",
                title: "Prêt pour la réception",
                desc: "Vous recevez vos factures fournisseurs au format Factur-X directement dans votre espace, dès le 1ᵉʳ sept. 2026.",
              },
              {
                icon: "📤",
                title: "Prêt pour l'émission",
                desc: "Vos factures clients passent par une PA et arrivent conformes. Aucune amende. 1ᵉʳ sept. 2027.",
              },
              {
                icon: "⚖️",
                title: "Bien plus qu'un logiciel",
                desc: "Votre adhésion inclut la hotline juridique illimitée, le CE Club +200 enseignes, et, en Premium, le recouvrement d'impayés.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-7 hover:shadow-md transition">
                <span className="text-3xl block mb-4">{item.icon}</span>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce que change concrètement */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">Concrètement</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Vous, vous ne changez rien. Le logiciel s'occupe du reste.
            </h2>
            <ul className="space-y-4">
              {[
                "Vous créez votre devis comme d'habitude, en 2 minutes",
                "Le logiciel génère un Factur-X conforme (PDF + données structurées)",
                "La facture part automatiquement via une PA (plateforme agréée par l'État)",
                "Votre client la reçoit dans son propre logiciel, sans ressaisie",
                "L'administration fiscale est informée. Archivage 10 ans, piste d'audit incluse.",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-1 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-800 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-500 italic">
              Objectif : zéro friction, zéro amende, zéro client perdu pour cause de non-conformité.
            </p>
          </div>
          <div className="flex justify-center">
            <InvoiceMockup />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#F2F5F8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ color: BLUE }} className="font-semibold uppercase text-sm tracking-widest mb-3">Calendrier officiel</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Les 3 dates qui changent tout</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                date: "Aujourd'hui",
                title: "Vous adhérez à FNAE",
                desc: "Vous activez votre adhésion. Votre logiciel de facturation est immédiatement disponible.",
                status: "MAINTENANT",
                color: BLUE,
              },
              {
                date: "1ᵉʳ sept. 2026",
                title: "Réception obligatoire",
                desc: "Toutes les micro-entreprises doivent pouvoir recevoir les factures électroniques de leurs fournisseurs. Vous êtes déjà connecté à une PA.",
                status: "RÉCEPTION",
                color: ORANGE,
              },
              {
                date: "1ᵉʳ sept. 2027",
                title: "Émission obligatoire",
                desc: "Vos factures doivent obligatoirement transiter par une PA. Vous n'avez rien à changer : c'est déjà le cas.",
                status: "ÉMISSION",
                color: ORANGE,
              },
            ].map((s) => (
              <div key={s.title} className="relative rounded-xl border border-gray-200 bg-white p-7 hover:shadow-md transition">
                <span
                  className="absolute -top-3 left-7 text-[10px] font-bold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.status}
                </span>
                <p className="text-sm font-bold mb-1" style={{ color: s.color }}>{s.date}</p>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href={LINKS.proAnnuel}
              onClick={trackCTA}
              style={{ backgroundColor: ORANGE }}
              className="inline-block text-white font-bold px-6 py-3 rounded text-base hover:opacity-90 transition"
            >
              Anticiper maintenant →
            </a>
          </div>
        </div>
      </section>

      {/* Risque amendes + sérénité */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-8 border-2 shadow-sm" style={{ borderColor: "#FECACA" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "#FEF2F2" }}>
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Le coût de l'inaction</h3>
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">→</span>
                <span><strong>250 €</strong> d'amende par mois tant que vous n'êtes pas en règle</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">→</span>
                <span>Vos clients professionnels refuseront de travailler avec vous s'ils ne peuvent pas vous payer en conformité</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 font-bold flex-shrink-0">→</span>
                <span>Manque de crédibilité vis-à-vis de vos clients pros</span>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl p-8 border-2 shadow-sm" style={{ borderColor: "#BBF7D0" }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: "#F0FDF4" }}>
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">La sérénité avec FNAE</h3>
            <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">→</span>
                <span>Format Factur-X généré automatiquement à chaque facture</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">→</span>
                <span>Connexion aux PA : aucune démarche pour vous</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">→</span>
                <span>Archivage 10 ans + piste d'audit fiable inclus</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 font-bold flex-shrink-0">→</span>
                <span>Bascule transparente : vous y êtes déjà, dès aujourd'hui</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#F2F5F8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
              Ils sont déjà en règle pour 2026/27
            </h2>
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
              <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-4.5.svg" alt="" className="h-4" />
              <span className="text-sm font-semibold text-gray-800">4,8/5</span>
              <span className="text-gray-300" aria-hidden>·</span>
              <span className="text-sm text-gray-500">468 avis</span>
              <span className="text-gray-300" aria-hidden>·</span>
              <span className="text-sm font-bold" style={{ color: "#00B67A" }}>Trustpilot</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7 border border-gray-100 flex flex-col gap-4">
                <img src="https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-5.svg" alt="5 étoiles" className="h-5 w-auto" />
                <blockquote className="text-gray-700 italic leading-relaxed flex-1">« {t.text} »</blockquote>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="https://fr.trustpilot.com/review/fnae.fr" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-gray-600 transition underline underline-offset-2">
              Voir tous les avis sur Trustpilot →
            </a>
          </div>
        </div>
      </section>

      {/* Comparatif */}
      <section className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#EBF5FB" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Êtes-vous prêt pour septembre 2026 ?</h2>
            <p className="text-gray-500 text-sm sm:text-base">Comparez votre situation actuelle aux adhésions FNAE.</p>
          </div>

          {(() => {
            const columns = [
              { key: "none", label: "Excel / Word / PDF", badge: "Non adhérent", badgeBg: "bg-red-100", badgeText: "text-red-600", headerBg: "#FEF2F2", border: "border-red-100", titleColor: "text-gray-800" },
              { key: "pro", label: "Adhésion Pro", badge: "Recommandé", badgeBg: "bg-green-100", badgeText: "text-green-700", headerBg: "#F0FDF4", border: "border-green-100", titleColor: "text-gray-800" },
              { key: "premium", label: "Adhésion Premium", badge: "Le plus complet", badgeBg: "bg-white/20", badgeText: "text-white", headerBg: BLUE, border: "border-blue-400", titleColor: "text-white" },
            ] as const;
            const rows = [
              { label: "Logiciel de facturation FNAE Gestion", values: ["❌", "✅", "✅"] },
              { label: "Connexion PA (plateforme agréée) incluse", values: ["❌", "✅", "✅"] },
              { label: "Réception & émission via PA (2026/27)", values: ["❌", "✅", "✅"] },
              { label: "Archivage 10 ans & piste d'audit", values: ["⚠️ Manuel", "✅", "✅"] },
              { label: "Hotline juridique illimitée", values: ["❌", "✅", "✅"] },
              { label: "CE Club +200 enseignes", values: ["❌", "✅", "✅"] },
              { label: "Recouvrement d'impayés (CAARL)", values: ["❌", "Non", "✅"] },
              { label: "3 visios avocat / an incluses", values: ["❌", "Non", "✅"] },
              { label: "Risque d'amende au-delà de 2026", values: ["🚨 Élevé", "Aucun", "Aucun"], bold: true },
              { label: "Tarif", values: ["Amende 250 €/mois", "6,50 €/mois ou 64 €/an", "12 €/mois ou 139 €/an"], bold: true },
            ];
            return (
              <>
                {/* Tableau md+ */}
                <div className="hidden md:block overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white">
                  <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] text-xs md:text-sm">
                    <div style={{ backgroundColor: "#F8FAFC" }} className="p-4 border-b border-gray-200" />
                    {columns.map((c) => (
                      <div
                        key={c.key}
                        style={{ backgroundColor: c.headerBg }}
                        className={`p-4 text-center border-b border-l ${c.border}`}
                      >
                        <span className={`inline-block ${c.badgeBg} ${c.badgeText} text-[10px] font-bold px-2 py-1 rounded-full mb-1`}>{c.badge}</span>
                        <p className={`font-bold text-sm ${c.titleColor}`}>{c.label}</p>
                      </div>
                    ))}
                  </div>
                  {rows.map((row, i) => (
                    <div key={row.label} className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] text-xs md:text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50/40"}`}>
                      <div className="p-4 flex items-center text-gray-800 font-medium border-b border-gray-100">{row.label}</div>
                      {row.values.map((v, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-center text-center border-b border-l border-gray-100 text-gray-700">
                          <span className={row.bold ? "font-bold" : ""}>{v}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Cartes mobile */}
                <div className="md:hidden space-y-5">
                  {columns.map((c, ci) => (
                    <div
                      key={c.key}
                      className={`rounded-2xl overflow-hidden shadow-lg ${ci === 2 ? "" : "bg-white border border-gray-100"}`}
                      style={ci === 2 ? { backgroundColor: BLUE } : undefined}
                    >
                      <div
                        style={{ backgroundColor: c.headerBg }}
                        className={`p-5 text-center ${ci === 2 ? "" : "border-b border-gray-100"}`}
                      >
                        <span className={`inline-block ${c.badgeBg} ${c.badgeText} text-[10px] font-bold px-2 py-1 rounded-full mb-2`}>{c.badge}</span>
                        <p className={`font-bold text-base ${c.titleColor}`}>{c.label}</p>
                      </div>
                      <ul className={`p-5 space-y-3 text-sm ${ci === 2 ? "text-white" : "text-gray-700"}`}>
                        {rows.map((row) => (
                          <li key={row.label} className={`flex justify-between gap-4 ${ci === 2 ? "border-b border-white/10" : "border-b border-gray-100"} pb-3 last:border-0 last:pb-0`}>
                            <span className={`font-medium ${ci === 2 ? "text-blue-100" : "text-gray-600"} text-xs leading-snug flex-1`}>{row.label}</span>
                            <span className={`text-right font-semibold whitespace-nowrap ${row.bold ? "font-bold" : ""}`}>{row.values[ci]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}

          <div className="mt-8 text-center">
            <a
              href={LINKS.proAnnuel}
              onClick={trackCTA}
              style={{ backgroundColor: ORANGE }}
              className="inline-block text-white font-bold px-8 py-3 rounded-lg transition hover:opacity-90"
            >
              Adhérer à FNAE Pro →
            </a>
          </div>
        </div>
      </section>

      {/* Tarifs adhésion */}
      <section id="tarifs" className="py-20 px-4 sm:px-6" style={{ backgroundColor: "#F2F5F8" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Tarifs adhésion</h2>
            <p className="text-gray-500 text-sm sm:text-base">Conformité 2026/27, juridique et CE Club inclus dans chaque formule.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-full px-5 py-2.5 shadow-sm">
              <span className={`text-sm font-medium ${!annual ? "text-gray-900" : "text-gray-400"}`}>Mensuel</span>
              <button
                onClick={() => setAnnual((v) => !v)}
                className="relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none"
                style={{ backgroundColor: annual ? BLUE : "#D1D5DB" }}
                aria-label="Basculer entre tarif mensuel et annuel"
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                  style={{ transform: annual ? "translateX(20px)" : "translateX(0)" }}
                />
              </button>
              <span className={`text-sm font-medium ${annual ? "text-gray-900" : "text-gray-400"}`}>
                Annuel
                <span className="ml-1.5 text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">−20%</span>
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Pro */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div className="px-7 pt-7 pb-6 border-b border-gray-100">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Adhésion Pro</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-gray-900">{annual ? "64" : "6,50"}</span>
                  <span className="text-gray-500 mb-2 text-base">€ {annual ? "/an" : "/mois"}</span>
                </div>
                {annual
                  ? <p className="text-xs text-gray-400">soit 5,33 € / mois</p>
                  : <p className="text-xs text-green-600 font-medium">Ou 64 €/an, économisez 14 €</p>
                }
              </div>
              <ul className="px-7 py-6 space-y-3.5 flex-1">
                {[
                  "Logiciel facturation FNAE Gestion (Factur-X + PA)",
                  "Conformité 2026/27 incluse",
                  "Hotline juridique illimitée",
                  "CE Club +200 enseignes",
                  "Génération de documents légaux",
                  "Chatbot juridique 24/7",
                  "Veille réglementaire ciblée",
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
                  href={annual ? LINKS.proAnnuel : LINKS.proMensuel}
                  onClick={trackCTA}
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
                <p className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-2">Adhésion Premium</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-5xl font-extrabold text-white">{annual ? "139" : "12"}</span>
                  <span className="text-blue-200 mb-2 text-base">€ {annual ? "/an" : "/mois"}</span>
                </div>
                {annual
                  ? <p className="text-xs text-blue-300">soit 11,58 € / mois</p>
                  : <p className="text-xs text-blue-200 font-medium">Ou 139 €/an, économisez 5 €</p>
                }
              </div>
              <ul className="px-7 py-6 space-y-3.5 flex-1">
                {[
                  "Tout l'adhésion Pro incluse",
                  "Recouvrement d'impayés (CAARL)",
                  "Médiation des litiges dès 1 €",
                  "3 visios avocat / an incluses",
                  "Génération de contrats blindés",
                  "Mise en demeure & relances juridiques",
                  "Support prioritaire",
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
                  href={annual ? LINKS.premiumAnnuel : LINKS.premiumMensuel}
                  onClick={trackCTA}
                  style={{ backgroundColor: ORANGE }}
                  className="block text-center py-3.5 rounded-xl font-bold text-white transition hover:opacity-90 text-sm"
                >
                  Choisir Premium
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3">La facture électronique en 7 questions</h2>
          <p className="text-center text-gray-500 text-sm mb-10">Tout ce qu'il faut comprendre avant septembre 2026.</p>
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Septembre 2026, c'est demain. Mettez-vous en règle aujourd'hui.
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Factur-X · PA (plateforme agréée) · Archivage 10 ans · Zéro amende
          </p>
          <div className="flex justify-center mb-6">
            <a
              href={LINKS.proAnnuel}
              onClick={trackCTA}
              style={{ backgroundColor: ORANGE }}
              className="inline-block text-white font-bold px-6 py-3 rounded text-base hover:opacity-90 transition"
            >
              Adhérer à FNAE Pro →
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-100">
            <span>✓ Sans engagement</span>
            <span>✓ Résiliable à tout moment</span>
            <span>✓ Conforme 2026/27</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: BLUE_DARK }} className="text-white/70 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <div className="bg-white rounded px-3 py-1.5"><img src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png" alt="FNAE" className="h-10 w-auto" /></div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 items-center">
            <a href="https://support.fnae.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition text-white font-medium">support.fnae.fr</a>
            <span className="text-white/30 hidden sm:inline">|</span>
            <a href="https://fnae.fr/mentions-legales/" className="hover:text-white transition">Mentions légales</a>
            <a href="https://fnae.fr/politique-de-confidentialite/" className="hover:text-white transition">Confidentialité</a>
            <a href="https://fnae.fr/contact/" className="hover:text-white transition">Contact</a>
          </div>
          <p>© 2009 – {new Date().getFullYear()} FNAE Gestion</p>
        </div>
      </footer>
    </div>
  );
}
