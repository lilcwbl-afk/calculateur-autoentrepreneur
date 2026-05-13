import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// ─── SEO hook ────────────────────────────────────────────────────────────────
export function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
export function Nav() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const links = [
    { href: "/", label: "Calculateur" },
    { href: "/#exemples", label: "Exemples" },
    { href: "/#comprendre", label: "Comprendre" },
    { href: "/#outils", label: "Outils" },
    { href: "/#faq", label: "FAQ" },
  ];

  return (
    <header className="bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow">
            €
          </div>
          <span className="font-extrabold text-slate-900 text-sm hidden sm:block">
            Calculateur AE
          </span>
        </Link>

        <nav className="flex gap-1 overflow-x-auto">
          {links.map(({ href, label }) => (
            href.startsWith("/#") ? (
              <a key={href} href={isHome ? href : `/${href.slice(1)}`}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all whitespace-nowrap">
                {label}
              </a>
            ) : (
              <Link key={href} to={href}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap
                  ${pathname === href
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"}`}>
                {label}
              </Link>
            )
          ))}
        </nav>

        <Link to="/" className="shrink-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-all shadow hidden md:block">
          Simuler mon revenu →
        </Link>
      </div>
    </header>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">€</div>
              <span className="font-extrabold text-white text-sm">Calculateur AE</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs">
              Simulateur indépendant à but informatif. Les résultats sont estimatifs et ne remplacent pas un conseil professionnel.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <Link to="/contact"            className="hover:text-white transition-colors">Contact</Link>
            <Link to="/mentions-legales"   className="hover:text-white transition-colors">Mentions légales</Link>
            <Link to="/confidentialite"    className="hover:text-white transition-colors">Confidentialité</Link>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-600 text-center space-y-2">
          <p>© {new Date().getFullYear()} Calculateur AE — Simulateur indépendant à but informatif. Résultats estimatifs.</p>
          <p>
            Les taux sont fournis à titre indicatif et doivent être vérifiés avec les sources officielles :{" "}
            <a href="https://www.urssaf.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">urssaf.fr</a>
            {" · "}
            <a href="https://www.impots.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">impots.gouv.fr</a>
            {" · "}
            <a href="https://entreprendre.service-public.fr" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-400">service-public.fr</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── PageWrapper ─────────────────────────────────────────────────────────────
export function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans text-slate-800 antialiased">
      <Nav />
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}

// ─── Shared UI atoms ─────────────────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
}

export function SectionH2({ children }) {
  return <h2 className="text-lg font-bold text-indigo-700 mb-2">{children}</h2>;
}

export function Prose({ children }) {
  return <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>;
}

export function BackLink() {
  return (
    <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
      ← Retour au calculateur
    </Link>
  );
}

export function CTABanner() {
  return (
    <div className="bg-indigo-600 rounded-2xl p-6 text-center text-white space-y-3">
      <p className="font-extrabold text-lg">Estimez votre revenu net en 30 secondes</p>
      <p className="text-indigo-200 text-sm">Calculateur gratuit, sans inscription, résultats instantanés.</p>
      <Link to="/#calculateur"
        className="inline-block bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all shadow">
        📊 Accéder au calculateur →
      </Link>
    </div>
  );
}

export function FAQBlock({ items }) {
  return (
    <div className="space-y-3">
      {items.map(({ q, a }, i) => (
        <Card key={i}>
          <p className="font-bold text-slate-900 text-sm mb-1">{q}</p>
          <p className="text-sm text-slate-600 leading-relaxed">{a}</p>
        </Card>
      ))}
    </div>
  );
}

export function Disclaimer() {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
      <span className="shrink-0">⚠️</span>
      <p>Les résultats présentés sont <strong>indicatifs</strong> et ne tiennent pas compte de votre situation personnelle complète (CIPAV, ACRE, DOM-TOM, situation familiale, autres revenus…). Consultez un expert-comptable ou l'URSSAF pour une simulation précise.</p>
    </div>
  );
}
