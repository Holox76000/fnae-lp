import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center max-w-lg px-6">
        <img
          src="https://fnae.fr/wp-content/uploads/2024/10/Logo-FNAE.png"
          alt="FNAE"
          className="h-12 mx-auto mb-8"
        />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Landing Pages FNAE</h1>
        <p className="text-gray-500 mb-8">Choisissez une landing page</p>
        <div className="flex flex-col gap-3">
          <Link
            href="/lp-conformite-micro-entreprise"
            className="block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Conformité Micro-Entreprise →
          </Link>
          <Link
            href="/lp-recouvrement-impayes"
            className="block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Recouvrement Impayés →
          </Link>
          <Link
            href="/lp-ce-auto-entrepreneur"
            className="block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          >
            CE Auto-Entrepreneur →
          </Link>
          <Link
            href="/lp-formation-auto-entrepreneur"
            className="block bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition font-medium"
          >
            Formation Auto-Entrepreneur →
          </Link>
        </div>
      </div>
    </main>
  );
}
