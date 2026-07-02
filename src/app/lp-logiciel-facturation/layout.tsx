import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facture électronique auto-entrepreneur 2026/27 · Mettez-vous en règle | FNAE Gestion",
  description:
    "Dès le 1ᵉʳ septembre 2026, la facture électronique devient obligatoire pour toutes les micro-entreprises. FNAE Gestion vous met en règle aujourd'hui : Factur-X, PA (plateforme agréée), archivage 10 ans. Sans engagement.",
  openGraph: {
    title: "Facture électronique auto-entrepreneur 2026/27 · FNAE Gestion",
    description:
      "Obligation au 1ᵉʳ sept. 2026 (réception) et 2027 (émission). Évitez l'amende de 250 €/mois tant que vous n'êtes pas en règle. Format Factur-X, PA (plateforme agréée), archivage 10 ans.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function LogicielLayout({ children }: { children: React.ReactNode }) {
  return children;
}
