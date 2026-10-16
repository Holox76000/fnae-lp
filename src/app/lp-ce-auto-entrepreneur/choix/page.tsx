"use client";

import { useState, useEffect } from "react";

const LINKS = {
  proMensuel: "https://fnae.fr/adhesion/pro-mensuel/",
  proAnnuel: "https://fnae.fr/adhesion/pro-annuel/",
  premiumMensuel: "https://fnae.fr/adhesion/premium-mensuel/",
  premiumAnnuel: "https://fnae.fr/adhesion/premium-annuel/",
};

const PLANS = [
  {
    key: "pro",
    name: "Pro",
    tag: null,
    annual: { price: "64", unit: "€ / an", note: "soit 5,33 € / mois", href: LINKS.proAnnuel },
    monthly: { price: "6,50", unit: "€ / mois", note: "78 € sur l'année", href: LINKS.proMensuel },
    features: [
      "CE Club réductions +350 enseignes",
      "Annuaire Mon-Presta.fr",
      "Hotline juridique illimitée",
      "Chatbot juridique 24/7",
      "Génération de documents légaux",
      "Veille juridique ciblée",
    ],
  },
  {
    key: "premium",
    name: "Premium",
    tag: "Le plus complet",
    annual: { price: "139", unit: "€ / an", note: "soit 11,58 € / mois", href: LINKS.premiumAnnuel },
    monthly: { price: "12", unit: "€ / mois", note: "144 € sur l'année", href: LINKS.premiumMensuel },
    features: [
      "CE Club réductions +350 enseignes",
      "Tout le plan Pro inclus",
      "Recouvrement d'impayés (CAARL)",
      "Médiation des litiges dès 1 €",
      "3 visios avocat / an incluses",
      "Génération de contrats blindés",
    ],
  },
];

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M4.5 12.5l4.6 4.6L19.5 6.7" />
    </svg>
  );
}

export default function ChoixPage() {
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

  // L'événement part au moment où l'on quitte la page vers le paiement.
  const trackCTA = () => {
    const w = window as any;
    if (typeof w.fbq === "function") w.fbq("track", "AddToCart");
  };

  return (
    <div className="lp-ce min-h-screen flex flex-col">
      <header className="py-7 px-5 sm:px-8 flex justify-center border-b rule">
        <img src="/logos/fnae-logo.png" alt="FNAE" className="h-11 w-auto" />
      </header>

      <main className="flex-1 px-5 sm:px-8 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="display text-4xl sm:text-5xl mb-4">Choisissez votre formule</h1>
            <p className="text-lg" style={{ color: "var(--muted)" }}>
              Sans engagement, résiliable à tout moment.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-3 bg-white border rule rounded-full px-5 py-2.5">
              <span className={`text-[13px] font-semibold ${!annual ? "" : "opacity-40"}`}>Mensuel</span>
              <button
                onClick={() => setAnnual((v) => !v)}
                className="relative w-11 h-6 rounded-full transition-colors duration-300"
                style={{ backgroundColor: annual ? "var(--ink)" : "var(--line-strong)" }}
                aria-label="Basculer entre tarif mensuel et annuel"
              >
                <span
                  className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300"
                  style={{ transform: annual ? "translateX(20px)" : "none" }}
                />
              </button>
              <span className={`text-[13px] font-semibold ${annual ? "" : "opacity-40"}`}>
                Annuel
                <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-[2px]" style={{ backgroundColor: "var(--accent)", color: "#fff" }}>
                  −20%
                </span>
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {PLANS.map((plan) => {
              const offer = annual ? plan.annual : plan.monthly;
              const dark = plan.key === "premium";
              return (
                <div
                  key={plan.key}
                  className={`relative rounded-[3px] flex flex-col overflow-hidden ${dark ? "text-white" : "bg-white border rule"}`}
                  style={dark ? { backgroundColor: "var(--ink)" } : undefined}
                >
                  {plan.tag && (
                    <span className="absolute top-0 right-0 text-[10px] font-bold uppercase tracking-[0.12em] px-4 py-2" style={{ backgroundColor: "var(--accent)" }}>
                      {plan.tag}
                    </span>
                  )}
                  <div className={`p-8 border-b ${dark ? "" : "rule"}`} style={dark ? { borderColor: "rgba(255,255,255,0.18)" } : undefined}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: dark ? "rgba(255,255,255,0.5)" : "var(--muted)" }}>
                      {plan.name}
                    </p>
                    <div className="flex items-baseline gap-1.5 mt-4 mb-1">
                      <span className="display num text-6xl">{offer.price}</span>
                      <span className="display text-xl" style={{ color: dark ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
                        {offer.unit}
                      </span>
                    </div>
                    <p className="text-[13px]" style={{ color: dark ? "rgba(255,255,255,0.6)" : "var(--muted)" }}>
                      {offer.note}
                    </p>
                  </div>
                  <ul className="p-8 space-y-3.5 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[14.5px]" style={{ color: dark ? "rgba(255,255,255,0.85)" : "var(--ink-soft)" }}>
                        <span className="mt-0.5 flex-shrink-0" style={{ color: dark ? "var(--accent)" : "var(--ok)" }}>
                          <Check />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="px-8 pb-8">
                    <a
                      href={offer.href}
                      onClick={trackCTA}
                      className="block text-center py-4 rounded-[3px] font-semibold text-sm transition-opacity hover:opacity-90"
                      style={dark
                        ? { backgroundColor: "var(--accent)", color: "#fff" }
                        : { border: "1px solid var(--ink)", color: "var(--ink)" }}
                    >
                      Choisir {plan.name}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs mt-10" style={{ color: "var(--muted)" }}>
            Paiement sécurisé. Votre accès au catalogue est ouvert dès la validation de l&apos;adhésion.
          </p>
        </div>
      </main>
    </div>
  );
}
