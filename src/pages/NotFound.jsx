import { Link } from "react-router-dom";
import { PageWrapper, useSEO } from "../components/Layout";

export default function NotFound() {
  useSEO({
    title: "Page introuvable — Calculateur AE",
    description: "La page que vous cherchez n'existe pas. Retournez au calculateur auto-entrepreneur.",
  });

  return (
    <PageWrapper>
      <div className="text-center py-16 space-y-4">
        <span className="text-7xl">🔍</span>
        <h1 className="text-3xl font-extrabold text-slate-900">Page introuvable</h1>
        <p className="text-slate-500 max-w-sm mx-auto">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <Link to="/" className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow mt-4">
          ← Retour au calculateur
        </Link>
      </div>
    </PageWrapper>
  );
}
