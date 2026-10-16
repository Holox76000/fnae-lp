"use client";

import { useState } from "react";

const LINKS = {
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
      {children}
    </p>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M4.5 12.5l4.6 4.6L19.5 6.7" />
    </svg>
  );
}

/** Seule portion interactive de la page : le reste est rendu côté serveur. */
export default function Pricing() {
  const [proAnnual, setProAnnual] = useState(true);
  const [premiumAnnual, setPremiumAnnual] = useState(true);

  const trackCTA = () => {
    const w = window as unknown as { fbq?: (...a: unknown[]) => void };
    if (typeof w.fbq === "function") w.fbq("track", "AddToCart");
  };

  return (
          <section id="tarifs" className="py-24 px-5 sm:px-8 border-b rule" style={{ backgroundColor: "var(--paper-2)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Eyebrow>Tarifs</Eyebrow>
          <h2 className="display text-4xl sm:text-5xl mt-5 mb-4">Rentabilisé dès la 1ère réduction</h2>
          <div className="inline-flex items-center gap-3 bg-white border rule rounded-full px-5 py-2.5 mt-6">
            <span className={`text-[13px] font-semibold ${!proAnnual ? "" : "opacity-40"}`}>Mensuel</span>
            <button
              onClick={() => { setProAnnual(v => !v); setPremiumAnnual(v => !v); }}
              className="relative w-11 h-6 rounded-full transition-colors duration-300"
              style={{ backgroundColor: proAnnual ? "var(--ink)" : "var(--line-strong)" }}
              aria-label="Basculer entre tarif mensuel et annuel"
            >
              <span className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300" style={{ transform: proAnnual ? "translateX(20px)" : "none" }} />
            </button>
            <span className={`text-[13px] font-semibold ${proAnnual ? "" : "opacity-40"}`}>
              Annuel
              <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-[2px]" style={{ backgroundColor: "var(--accent)", color: "#fff" }}>−20%</span>
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Pro */}
          <div className="bg-white border rule rounded-[3px] flex flex-col">
            <div className="p-8 border-b rule">
              <Eyebrow>Pro</Eyebrow>
              <div className="flex items-baseline gap-1.5 mt-4 mb-1">
                <span className="display num text-6xl">{proAnnual ? "64" : "6,50"}</span>
                <span className="display text-xl" style={{ color: "var(--muted)" }}>€ {proAnnual ? "/an" : "/mois"}</span>
              </div>
              <p className="text-[13px]" style={{ color: proAnnual ? "var(--muted)" : "var(--ok)" }}>
                {proAnnual ? "soit 5,33 € / mois" : "Ou 64 €/an, économisez 14 €"}
              </p>
            </div>
            <ul className="p-8 space-y-3.5 flex-1">
              {[
                "CE Club réductions +350 enseignes",
                "Annuaire Mon-Presta.fr",
                "Hotline juridique illimitée",
                "Chatbot juridique 24/7",
                "Génération de documents légaux",
                "Veille juridique ciblée",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14.5px]" style={{ color: "var(--ink-soft)" }}>
                  <span style={{ color: "var(--ok)" }} className="mt-0.5 flex-shrink-0"><Check /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="px-8 pb-8">
              <a
                href={proAnnual ? LINKS.proAnnuel : LINKS.proMensuel}
                onClick={trackCTA}
                className="block text-center py-4 rounded-[3px] font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ border: "1px solid var(--ink)", color: "var(--ink)" }}
              >
                Choisir Pro
              </a>
            </div>
          </div>

          {/* Premium */}
          <div className="relative rounded-[3px] flex flex-col text-white overflow-hidden" style={{ backgroundColor: "var(--ink)" }}>
            <span className="absolute top-0 right-0 text-[10px] font-bold uppercase tracking-[0.12em] px-4 py-2" style={{ backgroundColor: "var(--accent)" }}>
              Le plus complet
            </span>
            <div className="p-8 border-b" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.5)" }}>Premium</p>
              <div className="flex items-baseline gap-1.5 mt-4 mb-1">
                <span className="display num text-6xl">{premiumAnnual ? "139" : "12"}</span>
                <span className="display text-xl" style={{ color: "rgba(255,255,255,0.6)" }}>€ {premiumAnnual ? "/an" : "/mois"}</span>
              </div>
              <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                {premiumAnnual ? "soit 11,58 € / mois" : "Ou 139 €/an, économisez 5 €"}
              </p>
            </div>
            <ul className="p-8 space-y-3.5 flex-1">
              {[
                "CE Club réductions +350 enseignes",
                "Tout le plan Pro inclus",
                "Recouvrement d'impayés (CAARL)",
                "Médiation des litiges dès 1 €",
                "3 visios avocat / an incluses",
                "Génération de contrats blindés",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[14.5px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                  <span style={{ color: "var(--accent)" }} className="mt-0.5 flex-shrink-0"><Check /></span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="px-8 pb-8">
              <a
                href={premiumAnnual ? LINKS.premiumAnnuel : LINKS.premiumMensuel}
                onClick={trackCTA}
                style={{ backgroundColor: "var(--accent)" }}
                className="block text-center py-4 rounded-[3px] font-semibold text-sm text-white transition-opacity hover:opacity-90"
              >
                Choisir Premium
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
