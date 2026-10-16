import type { Metadata } from "next";

// Étape de tunnel : aucune raison d'être indexée.
export const metadata: Metadata = {
  title: "Choisissez votre formule — FNAE",
  robots: { index: false, follow: false },
};

export default function ChoixLayout({ children }: { children: React.ReactNode }) {
  return children;
}
