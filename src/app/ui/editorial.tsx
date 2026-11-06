/**
 * Primitives du système de design éditorial (classe `.lp-ed` dans globals.css).
 * Partagées par les landing pages qui l'adoptent : CE et Formation.
 *
 * Pas de directive "use client" : le module est neutre, il se compile côté
 * serveur pour la LP CE et côté client pour la LP Formation.
 */

// Jeu d'icônes linéaires maison : remplace les emojis, hérite de currentColor
export const ICONS: Record<string, string[]> = {
  building: ["M5 21V8l7-4 7 4v13", "M3 21h18", "M9.5 21v-5h5v5", "M9 11h1.5", "M13.5 11H15"],
  tag: ["M20.3 13.1l-7.2 7.2a1.9 1.9 0 01-2.7 0L3.7 13.6V4h9.6l7 7a1.9 1.9 0 010 2.1z", "M8 8.5h.01"],
  sun: ["M16 12a4 4 0 11-8 0 4 4 0 018 0z", "M12 3v2", "M12 19v2", "M3 12h2", "M19 12h2", "M5.6 5.6l1.4 1.4", "M17 17l1.4 1.4", "M18.4 5.6L17 7", "M7 17l-1.4 1.4"],
  heart: ["M12 20s-7-4.4-7-9.5A4 4 0 0112 8a4 4 0 017 2.5C19 15.6 12 20 12 20z"],
  bell: ["M18 16.5V11a6 6 0 10-12 0v5.5L4 19h16z", "M10 22h4"],
  pin: ["M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z", "M14 10a2 2 0 11-4 0 2 2 0 014 0z"],
  chat: ["M4 4h16v12H9.5L4 20z", "M8 9h8", "M8 12.5h5"],
  award: ["M17 9a5 5 0 11-10 0 5 5 0 0110 0z", "M9 13.6L8 22l4-2.2 4 2.2-1-8.4"],
  card: ["M3 6h18v12H3z", "M3 10h18", "M6.5 14.5h3"],
  scale: ["M12 4v16", "M5 7.5h14", "M8 20h8", "M7.5 7.5L4 14h7z", "M16.5 7.5L13 14h7z"],
  columns: ["M3 9l9-5 9 5", "M4 21h16", "M5.5 21V10", "M18.5 21V10", "M12 21V10"],
  users: ["M9.5 11a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4z", "M3 20c0-3 2.9-5 6.5-5s6.5 2 6.5 5", "M16.5 11.2a3 3 0 100-6", "M18 20c0-2 .6-3.6-1-4.6"],
  clipboard: ["M8 5H6v16h12V5h-2", "M9 3h6v3H9z", "M9 11h6", "M9 15h4"],
  shield: ["M12 3.5l7 2.8v4.9c0 4.2-2.9 7.6-7 9.3-4.1-1.7-7-5.1-7-9.3V6.3z", "M9.2 12l2 2 3.6-3.8"],
  check: ["M4.5 12.5l4.6 4.6L19.5 6.7"],
  cross: ["M6.5 6.5l11 11", "M17.5 6.5l-11 11"],
  arrow: ["M4 12h15", "M13.5 6.5L20 12l-6.5 5.5"],
  spark: ["M12 3l1.9 5.4L19 10l-5.1 1.6L12 17l-1.9-5.4L5 10l5.1-1.6z"],
  ticket: ["M3 9.5a2 2 0 002-2h14a2 2 0 002 2v5a2 2 0 00-2 2H5a2 2 0 00-2-2z", "M9 7.5v9"],
  book: ["M4 4.5h7.5a2 2 0 012 2V21a2 2 0 00-2-1.6H4z", "M20 4.5h-6.5a2 2 0 00-2 2V21a2 2 0 012-1.6H20z"],
  screen: ["M3 5h18v11H3z", "M8.5 20h7", "M12 16v4"],
  clock: ["M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M12 7.2V12l3.2 2"],
  compass: ["M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M14.8 9.2l-1.9 5.6-5.6 1.9 1.9-5.6z"],
  target: ["M21 12a9 9 0 11-18 0 9 9 0 0118 0z", "M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z", "M13.6 12a1.6 1.6 0 11-3.2 0 1.6 1.6 0 013.2 0z"],
  phone: ["M8.2 3.6l2 4-2 1.6a11 11 0 006.6 6.6l1.6-2 4 2-.9 3a1.6 1.6 0 01-1.7 1.1A17 17 0 014.3 6.2 1.6 1.6 0 015.4 4.5z"],
};

export function Icon({ name, className = "w-5 h-5" }: { name: keyof typeof ICONS | string; className?: string }) {
  const paths = ICONS[name] ?? ICONS.spark;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
    </svg>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "var(--muted)" }}>
      {children}
    </p>
  );
}

/**
 * Bouton d'action : rendu en lien quand `href` est fourni, en bouton sinon
 * (la LP Formation ouvre un popup Calendly, elle n'a pas d'URL cible).
 */
export function CTA({
  href, onClick, children, variant = "solid", className = "",
}: {
  href?: string; onClick?: () => void; children: React.ReactNode;
  variant?: "solid" | "ghost" | "light"; className?: string;
}) {
  const base = "group inline-flex items-center gap-2.5 rounded-[3px] font-semibold transition-colors duration-300";
  const styles =
    variant === "solid" ? { backgroundColor: "var(--accent)", color: "#fff" }
    : variant === "light" ? { backgroundColor: "#fff", color: "var(--ink)" }
    : { backgroundColor: "transparent", color: "var(--ink)", border: "1px solid var(--line-strong)" };
  const inner = (
    <>
      {children}
      <Icon name="arrow" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const cls = `${base} px-7 py-4 ${className}`;
  return href ? (
    <a href={href} onClick={onClick} style={styles} className={cls}>{inner}</a>
  ) : (
    <button type="button" onClick={onClick} style={styles} className={cls}>{inner}</button>
  );
}

export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="faq border-b rule">
      <summary className="flex items-start justify-between py-6 gap-6 cursor-pointer list-none">
        <span className="display text-lg sm:text-xl pr-4">{q}</span>
        <span className="marker relative mt-1.5 w-4 h-4 flex-shrink-0" style={{ color: "var(--accent)" }} aria-hidden="true">
          <span className="absolute top-1/2 left-0 w-4 h-px -translate-y-1/2" style={{ backgroundColor: "currentColor" }} />
          <span className="bar absolute left-1/2 top-0 h-4 w-px -translate-x-1/2" style={{ backgroundColor: "currentColor" }} />
        </span>
      </summary>
      <p className="pb-6 pr-10 leading-relaxed" style={{ color: "var(--muted)" }}>{a}</p>
    </details>
  );
}
