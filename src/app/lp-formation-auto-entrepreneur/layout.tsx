import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation Auto-entreprise — FNAE Academy",
  description:
    "Maîtrisez votre micro-entreprise en 21h. Formation animée par la fédération qui défend les auto-entrepreneurs depuis 2009. Finançable par votre fonds pro.",
  openGraph: {
    title: "Formation Auto-entreprise — FNAE Academy",
    description:
      "Maîtrisez votre micro-entreprise en 21h. Formation animée par la fédération qui défend les auto-entrepreneurs depuis 2009.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function FormationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
