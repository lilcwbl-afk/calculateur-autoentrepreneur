import { useState, useMemo, useEffect, useRef } from "react";

/**
 * Calculateur charges auto-entrepreneur 2026
 * ─────────────────────────────────────────────────────────────────────────────
 * TAUX INDICATIFS — modifiez uniquement ce bloc pour mettre à jour les calculs.
 *
 * Sources vérifiées (mai 2026) :
 *   Cotisations : autoentrepreneur.urssaf.fr / urssaf.fr (màj 30 jan. 2026)
 *   Abattements : impots.gouv.fr — article 102 ter CGI
 *   Plafonds CA  : economie.gouv.fr / loi de finances 2026 (JO 20 fév. 2026)
 *   Barème IR    : impots.gouv.fr (revenus 2025 déclarés 2026)
 *
 * Ces taux restent estimatifs. Ils varient selon votre situation personnelle
 * (CIPAV, ACRE, DROM, situation familiale…). Vérifiez sur urssaf.fr et impots.gouv.fr.
 * ─────────────────────────────────────────────────────────────────────────────
 */
const TAUX = {
  vente: {
    cotisations: 0.123,       // 12,3 % du CA — source : URSSAF jan. 2026
    abattementFiscal: 0.71,   // 71 % — source : impots.gouv.fr (BIC vente)
    vl: 0.01,                 // versement libératoire 1 % — source : URSSAF
    plafondCA: 203100,        // seuil 2026 — source : loi de finances 2026
    label: "Vente de marchandises",
  },
  services: {
    cotisations: 0.212,       // 21,2 % du CA — source : URSSAF jan. 2026
    abattementFiscal: 0.50,   // 50 % — source : impots.gouv.fr (BIC services)
    vl: 0.017,                // versement libératoire 1,7 % — source : URSSAF
    plafondCA: 83600,         // seuil 2026 — source : loi de finances 2026
    label: "Prestation de services / BIC",
  },
  liberale: {
    cotisations: 0.256,       // 25,6 % du CA — source : URSSAF jan. 2026 (BNC régime général)
    abattementFiscal: 0.34,   // 34 % — source : impots.gouv.fr (BNC libéral, art. 102 ter CGI)
    vl: 0.022,                // versement libératoire 2,2 % — source : URSSAF
    plafondCA: 83600,         // seuil 2026 — source : loi de finances 2026
    label: "Profession libérale / BNC",
    note: "Taux BNC régime général (SSI). Professions CIPAV : 23,2 %. Consultez urssaf.fr.",
  },
};

// ACRE : exonération de 50 % des cotisations pendant les 4 premiers trimestres civils
// (création avant juillet 2026). À partir de juillet 2026 : exonération réduite à 25 %.
// Source : economie.gouv.fr / URSSAF
const TAUX_ACRE = 0.50; // réduction appliquée sur les cotisations

// Barème IR 2025 (revenus 2025 déclarés en 2026) — source : impots.gouv.fr
// Barème pour 1 part fiscale (situation célibataire, sans enfant).
// Ce calcul est une approximation — votre situation personnelle peut différer.
const BAREME_IR = [
  { min: 0,      max: 11497,  rate: 0    },
  { min: 11497,  max: 29315,  rate: 0.11 },
  { min: 29315,  max: 83823,  rate: 0.30 },
  { min: 83823,  max: 180294, rate: 0.41 },
  { min: 180294, max: Infinity, rate: 0.45 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Utilitaires
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (n, dec = 0) =>
  Number.isFinite(n)
    ? n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: dec })
    : "—";

const pct = (n) => `${Math.round(n * 100)} %`;

function calcIR(baseImposable) {
  let impot = 0;
  BAREME_IR.forEach(({ min, max, rate }) => {
    if (baseImposable > min) impot += (Math.min(baseImposable, max) - min) * rate;
  });
  return impot;
}

function simuler({ caAnnuel, activite, versementLib, fraisMois, acre }) {
  const t = TAUX[activite];
  const tauxCotis = acre ? t.cotisations * (1 - TAUX_ACRE) : t.cotisations;
  const cotisAnnuel = caAnnuel * tauxCotis;
  const baseImpot   = caAnnuel * (1 - t.abattementFiscal);
  const impotAnnuel = versementLib ? caAnnuel * t.vl : calcIR(baseImpot);
  const fraisAnnuel = (fraisMois || 0) * 12;
  const netAvantFrais = caAnnuel - cotisAnnuel - impotAnnuel;
  const netApres      = netAvantFrais - fraisAnnuel;
  const tauxCharge    = caAnnuel > 0 ? (cotisAnnuel + impotAnnuel + fraisAnnuel) / caAnnuel : 0;
  return { cotisAnnuel, impotAnnuel, fraisAnnuel, netAvantFrais, netApres, tauxCharge, tauxCotis };
}

function caNecessairePour(objectifNetMois, activite, versementLib, fraisMois, acre) {
  if (!objectifNetMois || objectifNetMois <= 0) return 0;
  let ca = objectifNetMois * 12 * 1.5;
  for (let i = 0; i < 120; i++) {
    const { netApres } = simuler({ caAnnuel: ca, activite, versementLib, fraisMois, acre });
    const diff = objectifNetMois * 12 - netApres;
    if (Math.abs(diff) < 0.5) break;
    ca += diff * 0.6;
    if (ca < 0) { ca = 0; break; }
  }
  return ca;
}

// ─────────────────────────────────────────────────────────────────────────────
// Composants UI atomiques
// ─────────────────────────────────────────────────────────────────────────────
function Card({ children, className = "", accent = false }) {
  return (
    <div className={`bg-white rounded-2xl border ${accent ? "border-indigo-200 shadow-indigo-100" : "border-slate-100"} shadow-md p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

function ResultCard({ label, value, sub, color = "text-indigo-700", bg = "bg-indigo-50", icon }) {
  return (
    <div className={`${bg} rounded-2xl p-4 md:p-5 flex items-start gap-3 border border-white/60`}>
      {icon && <span className="text-2xl shrink-0 mt-0.5">{icon}</span>}
      <div className="min-w-0">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide leading-tight">{label}</p>
        <p className={`text-xl md:text-2xl font-extrabold ${color} mt-0.5 leading-tight`}>{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function Jauge({ pct: p, color = "bg-indigo-500" }) {
  return (
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${Math.min(100, Math.max(0, p))}%` }} />
    </div>
  );
}

function AdSlot({ label = "Emplacement publicité" }) {
  return (
    <div className="w-full my-6 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center py-5 bg-slate-50/60 text-slate-400 text-xs font-medium tracking-wider select-none">
      📢 {label}
    </div>
  );
}

function SectionTitle({ tag = "h2", children, sub }) {
  const Tag = tag;
  return (
    <div className="mb-6 md:mb-8">
      <Tag className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{children}</Tag>
      {sub && <p className="text-sm text-slate-500 mt-1 max-w-2xl">{sub}</p>}
    </div>
  );
}

function CTA({ onClick, children, variant = "primary", small = false }) {
  const base = `inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all duration-200 ${small ? "px-4 py-2 text-sm" : "px-5 py-3 text-sm md:text-base"}`;
  if (variant === "primary") return <button onClick={onClick} className={`${base} bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 active:scale-95`}>{children}</button>;
  if (variant === "secondary") return <button onClick={onClick} className={`${base} bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 active:scale-95`}>{children}</button>;
  if (variant === "ghost") return <button onClick={onClick} className={`${base} text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95`}>{children}</button>;
  return null;
}

function InputField({ label, hint, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label>
      {hint && <p className="text-xs text-slate-400 mb-1">{hint}</p>}
      {children}
    </div>
  );
}

function NumInput({ value, onChange, placeholder, suffix = "€" }) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-slate-50 placeholder-slate-300 transition"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium pointer-events-none">{suffix}</span>
    </div>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map(({ val, icon, label, sub }) => (
        <label
          key={val}
          className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${value === val ? "border-indigo-400 bg-indigo-50 shadow-sm" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
        >
          <input type="radio" name="activite" value={val} checked={value === val} onChange={() => onChange(val)} className="mt-0.5 accent-indigo-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-800">{icon} {label}</p>
            {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
          </div>
        </label>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sections principales
// ─────────────────────────────────────────────────────────────────────────────

function Disclaimer() {
  return (
    <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm text-amber-800">
      <span className="shrink-0 text-lg">⚠️</span>
      <div className="space-y-1">
        <p><strong>Résultats estimatifs — ne remplacent pas un conseil professionnel.</strong></p>
        <p>Les taux utilisés (cotisations URSSAF, abattements fiscaux, barème IR) sont issus des sources officielles 2026 et doivent être vérifiés selon votre situation : CIPAV ou régime général, ACRE, DOM-TOM, situation familiale, revenus du foyer. Le calcul de l'impôt suppose une situation célibataire, 1 part fiscale, sans autre revenu.</p>
        <p className="text-xs text-amber-700">Sources : <a href="https://www.urssaf.fr" target="_blank" rel="noopener noreferrer" className="underline">urssaf.fr</a> · <a href="https://www.impots.gouv.fr" target="_blank" rel="noopener noreferrer" className="underline">impots.gouv.fr</a> · <a href="https://entreprendre.service-public.fr" target="_blank" rel="noopener noreferrer" className="underline">service-public.fr</a></p>
      </div>
    </div>
  );
}

function Calculateur({ onResult }) {
  const [caMode,     setCaMode]     = useState("mensuel");
  const [caVal,      setCaVal]      = useState("");
  const [activite,   setActivite]   = useState("services");
  const [vl,         setVl]         = useState(false);
  const [acre,       setAcre]       = useState(false);
  const [frais,      setFrais]      = useState("");
  const [objectif,   setObjectif]   = useState("");
  const [jours,      setJours]      = useState("18");
  const [copied,     setCopied]     = useState(false);
  const resultRef = useRef(null);

  const caAnnuel = useMemo(() => {
    const v = parseFloat(caVal) || 0;
    return caMode === "mensuel" ? v * 12 : v;
  }, [caVal, caMode]);

  const res = useMemo(() => {
    if (!caAnnuel) return null;
    const fraisMois = parseFloat(frais) || 0;
    const s = simuler({ caAnnuel, activite, versementLib: vl, fraisMois, acre });
    const joursN = Math.max(1, parseFloat(jours) || 18);
    const objNet = parseFloat(objectif) || 0;
    const caNecessaire = caNecessairePour(objNet, activite, vl, fraisMois, acre);
    const tjmActuel   = (caAnnuel / 12) / joursN;
    const tjmObjectif = caNecessaire > 0 ? (caNecessaire / 12) / joursN : 0;
    return { ...s, caAnnuel, fraisMois, joursN, caNecessaire, tjmActuel, tjmObjectif, objectifNet: objNet };
  }, [caAnnuel, activite, vl, acre, frais, objectif, jours]);

  const handleCopy = () => {
    if (!res) return;
    const t = TAUX[activite];
    const txt = `Estimation auto-entrepreneur 2026\n` +
      `CA annuel : ${fmt(res.caAnnuel)}\n` +
      `Cotisations : ${fmt(res.cotisAnnuel)} (${pct(res.tauxCotis)}${acre ? " — ACRE appliquée" : ""})\n` +
      `Impôt estimé : ${fmt(res.impotAnnuel)}${vl ? " (versement libératoire)" : " (barème IR, 1 part, estimation)"}\n` +
      `Frais pro : ${fmt(res.fraisAnnuel)}\n` +
      `Revenu net mensuel : ${fmt(res.netApres / 12)}\n` +
      `Taux de charge global : ${pct(res.tauxCharge)}\n` +
      (res.caNecessaire > 0 ? `CA nécessaire pour ${fmt(res.objectifNet)}/mois net : ${fmt(res.caNecessaire / 12)}/mois\n` : "") +
      `TJM estimé : ${fmt(res.caNecessaire > 0 ? res.tjmObjectif : res.tjmActuel)}/j\n` +
      `⚠️ Résultats indicatifs — vérifiez sur urssaf.fr et impots.gouv.fr`;
    navigator.clipboard.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };

  const handleReset = () => { setCaVal(""); setFrais(""); setObjectif(""); setJours("18"); setActivite("services"); setVl(false); setAcre(false); setCaMode("mensuel"); };

  useEffect(() => { if (res && resultRef.current) resultRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [!!res]);

  const plafond = TAUX[activite].plafondCA;
  const pctPlafond = caAnnuel > 0 ? Math.min(100, (caAnnuel / plafond) * 100) : 0;

  return (
    <div id="calculateur" className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-6">
        {/* ── Formulaire ── */}
        <Card className="lg:col-span-2 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 text-base">Votre situation</h2>
            <CTA onClick={handleReset} variant="ghost" small>↺ Réinitialiser</CTA>
          </div>

          <InputField label="Mode de saisie">
            <div className="flex rounded-xl overflow-hidden border border-slate-200">
              {["mensuel", "annuel"].map(m => (
                <button key={m} onClick={() => setCaMode(m)}
                  className={`flex-1 py-2.5 text-xs font-bold transition-all ${caMode === m ? "bg-indigo-600 text-white" : "bg-white text-slate-500 hover:bg-slate-50"}`}>
                  CA {m}
                </button>
              ))}
            </div>
          </InputField>

          <InputField label={`Chiffre d'affaires ${caMode}`} hint="Saisissez votre CA hors taxes">
            <NumInput value={caVal} onChange={setCaVal} placeholder={caMode === "mensuel" ? "ex : 4 000" : "ex : 48 000"} />
          </InputField>

          <InputField label="Type d'activité">
            <RadioGroup
              value={activite}
              onChange={setActivite}
              options={[
                { val: "vente",    icon: "🛒", label: "Vente de marchandises",      sub: `Cotisations ${pct(TAUX.vente.cotisations)} — Plafond ${fmt(TAUX.vente.plafondCA)}` },
                { val: "services", icon: "🔧", label: "Prestation de services",      sub: `Cotisations ${pct(TAUX.services.cotisations)} — Plafond ${fmt(TAUX.services.plafondCA)}` },
                { val: "liberale", icon: "⚖️", label: "Profession libérale / BNC",   sub: `Cotisations ${pct(TAUX.liberale.cotisations)} — Plafond ${fmt(TAUX.liberale.plafondCA)} — CIPAV : 23,2 %` },
              ]}
            />
          </InputField>

          <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${vl ? "border-indigo-400 bg-indigo-50" : "border-slate-200 hover:bg-slate-50"}`}>
            <input type="checkbox" checked={vl} onChange={e => setVl(e.target.checked)} className="mt-0.5 accent-indigo-600 w-4 h-4 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Versement libératoire de l'impôt</p>
              <p className="text-xs text-slate-400 mt-0.5">Taux fixe sur CA : {pct(TAUX[activite].vl)} — sous conditions de revenu fiscal N-2</p>
            </div>
          </label>

          <label className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${acre ? "border-emerald-400 bg-emerald-50" : "border-slate-200 hover:bg-slate-50"}`}>
            <input type="checkbox" checked={acre} onChange={e => setAcre(e.target.checked)} className="mt-0.5 accent-emerald-600 w-4 h-4 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-slate-800">🎁 Bénéficiaire de l'ACRE</p>
              <p className="text-xs text-slate-400 mt-0.5">Exonération de 50 % des cotisations pendant les 4 premiers trimestres (créations avant juil. 2026). À demander à l'URSSAF à la création.</p>
            </div>
          </label>

          <InputField label="Frais professionnels mensuels" hint="Logiciels, téléphone, déplacements…">
            <NumInput value={frais} onChange={setFrais} placeholder="ex : 300" />
          </InputField>

          <InputField label="Objectif de revenu net mensuel" hint="Pour calculer le CA et TJM nécessaires">
            <NumInput value={objectif} onChange={setObjectif} placeholder="ex : 2 500" />
          </InputField>

          <InputField label="Jours facturables par mois" hint="Généralement 15 à 18 jours réels">
            <NumInput value={jours} onChange={setJours} placeholder="18" suffix="j" />
          </InputField>

          <CTA onClick={() => resultRef.current?.scrollIntoView({ behavior: "smooth" })} variant="primary">
            📊 Calculer mon revenu net
          </CTA>
        </Card>

        {/* ── Résultats ── */}
        <div className="lg:col-span-3 space-y-5" ref={resultRef}>
          {!res ? (
            <Card className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-5xl mb-4">🧮</span>
              <p className="font-bold text-slate-700 text-lg">Renseignez votre CA</p>
              <p className="text-slate-400 text-sm mt-1 max-w-xs">Saisissez votre chiffre d'affaires dans le formulaire pour voir apparaître vos estimations en temps réel.</p>
            </Card>
          ) : (
            <>
              {/* Grille résultats */}
              <div className="grid sm:grid-cols-2 gap-3">
                <ResultCard icon="💰" label="Revenu net mensuel"   value={fmt(res.netApres / 12)}  sub={`Soit ${fmt(res.netApres)} / an`}     color="text-emerald-700" bg="bg-emerald-50" />
                <ResultCard icon="📈" label="CA annuel simulé"     value={fmt(res.caAnnuel)}        sub={`Soit ${fmt(res.caAnnuel / 12)} / mois`} color="text-indigo-700"  bg="bg-indigo-50" />
                <ResultCard icon="🏛️" label="Cotisations sociales" value={fmt(res.cotisAnnuel)}      sub={`${fmt(res.cotisAnnuel / 12)} / mois — taux ${pct(res.tauxCotis)}${acre ? " (ACRE appliquée)" : ""}`} color="text-amber-700" bg="bg-amber-50" />
                <ResultCard icon="📋" label="Impôt estimé"          value={fmt(res.impotAnnuel)}      sub={`${fmt(res.impotAnnuel / 12)} / mois${vl ? " (versement lib.)" : " — barème 1 part, estimation"}`}       color="text-rose-700"   bg="bg-rose-50"   />
                <ResultCard icon="💼" label="Frais pro annuels"    value={fmt(res.fraisAnnuel)}      sub={`${fmt(res.fraisMois)} / mois`}        color="text-slate-700"  bg="bg-slate-100" />
                <ResultCard icon="⚡" label="Taux de charge global" value={pct(res.tauxCharge)}      sub="Charges totales / CA"                  color="text-violet-700" bg="bg-violet-50" />
              </div>

              {/* Décomposition */}
              <Card>
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Décomposition du CA</h3>
                <div className="space-y-3">
                  {[
                    { label: "Cotisations sociales",  val: res.cotisAnnuel,                          pctV: TAUX[activite].cotisations * 100,                           color: "bg-amber-400"   },
                    { label: "Impôt estimé",           val: res.impotAnnuel,                           pctV: (res.impotAnnuel / res.caAnnuel) * 100,                     color: "bg-rose-400"    },
                    { label: "Frais professionnels",   val: res.fraisAnnuel,                           pctV: (res.fraisAnnuel / res.caAnnuel) * 100,                     color: "bg-slate-400"   },
                    { label: "Revenu net",             val: Math.max(0, res.netApres),                 pctV: Math.max(0, (res.netApres / res.caAnnuel) * 100),           color: "bg-emerald-500" },
                  ].map(({ label, val, pctV, color }) => (
                    <div key={label} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-600">
                        <span>{label}</span>
                        <span className="font-bold">{fmt(val)} <span className="text-slate-400 font-normal">({Math.round(pctV)} %)</span></span>
                      </div>
                      <Jauge pct={pctV} color={color} />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Plafond */}
              <Card>
                <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                  <span>Plafond auto-entrepreneur</span>
                  <span>{fmt(caAnnuel)} / {fmt(plafond)}</span>
                </div>
                <Jauge pct={pctPlafond} color={pctPlafond > 85 ? "bg-rose-500" : pctPlafond > 65 ? "bg-amber-400" : "bg-indigo-500"} />
                <p className="text-xs text-slate-400 mt-2">
                  {pctPlafond >= 100
                    ? "⛔ Vous dépassez le plafond. Vous devrez changer de régime (réel, SASU…)."
                    : pctPlafond > 85
                    ? "⚠️ Vous approchez du plafond. Anticipez un changement de régime."
                    : "✅ Vous êtes dans les limites du régime auto-entrepreneur."}
                </p>
              </Card>

              {/* Objectif & TJM */}
              {(res.caNecessaire > 0 || res.tjmActuel > 0) && (
                <div className="grid sm:grid-cols-2 gap-3">
                  {res.caNecessaire > 0 && (
                    <Card accent>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">CA mensuel nécessaire</p>
                      <p className="text-xs text-slate-400 mt-0.5">Pour {fmt(res.objectifNet)} net/mois</p>
                      <p className="text-2xl font-extrabold text-indigo-700 mt-1">{fmt(res.caNecessaire / 12)}</p>
                    </Card>
                  )}
                  <Card accent>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">TJM estimé</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {res.caNecessaire > 0 ? `Pour atteindre l'objectif (${res.joursN} j/mois)` : `Sur votre CA actuel (${res.joursN} j/mois)`}
                    </p>
                    <p className="text-2xl font-extrabold text-indigo-700 mt-1">
                      {fmt(res.caNecessaire > 0 ? res.tjmObjectif : res.tjmActuel)}<span className="text-sm font-medium text-slate-400">/j</span>
                    </p>
                  </Card>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <CTA onClick={handleCopy} variant="secondary">
                  {copied ? "✅ Copié !" : "📋 Copier mon résultat"}
                </CTA>
                <CTA onClick={handleReset} variant="ghost">
                  ↺ Recommencer
                </CTA>
              </div>
            </>
          )}
        </div>
      </div>
      <Disclaimer />
    </div>
  );
}

function Exemples() {
  const exs = [
    {
      icon: "🎯",
      titre: "Gagner 2 000 € net/mois en prestation de services",
      corps: "En prestation de services (taux de cotisations 21,2 %), sans versement libératoire et avec 300 € de frais mensuels, il faut facturer environ 3 200 à 3 400 € HT par mois — soit un TJM de 180 à 200 €/j pour 18 jours facturables.",
      cta: "Simuler avec 2 000 € d'objectif",
    },
    {
      icon: "🚀",
      titre: "Gagner 3 000 € net/mois en profession libérale",
      corps: "Pour 3 000 € nets mensuels en libéral (22,1 % de cotisations, abattement 50 % à l'IR), il faut atteindre un CA d'environ 5 000 à 5 500 €/mois. Avec 20 jours facturés, cela représente un TJM autour de 250 à 275 €/j.",
      cta: "Simuler avec 3 000 € d'objectif",
    },
    {
      icon: "💡",
      titre: "Pourquoi le CA n'est pas votre salaire ?",
      corps: "Un auto-entrepreneur qui facture 4 000 €/mois ne touche pas 4 000 €. Après cotisations sociales (~850 €), impôt estimé (~250 €) et 300 € de frais pro, il lui reste environ 2 600 € — soit 35 % de moins que son CA. C'est pourquoi votre TJM doit intégrer tous ces prélèvements.",
      cta: "Tester avec mon propre CA",
    },
  ];

  return (
    <section id="exemples" className="space-y-4">
      <SectionTitle
        sub="Des illustrations concrètes pour mieux comprendre votre situation de freelance."
      >
        Exemples de calcul
      </SectionTitle>
      <div className="grid md:grid-cols-3 gap-5">
        {exs.map(({ icon, titre, corps, cta }) => (
          <Card key={titre} className="flex flex-col gap-4">
            <div className="text-3xl">{icon}</div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">{titre}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{corps}</p>
            </div>
            <div className="mt-auto">
              <a href="#calculateur" className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                → {cta}
              </a>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SectionEducative() {
  const blocs = [
    {
      titre: "CA vs revenu net : la confusion la plus coûteuse",
      texte: "Votre chiffre d'affaires, c'est ce que vous facturez. Votre revenu net, c'est ce qui reste après avoir payé vos cotisations sociales, votre impôt sur le revenu et vos frais professionnels. L'écart peut dépasser 35 à 45 % selon votre activité. Ne jamais les confondre est la règle n°1 du freelance.",
    },
    {
      titre: "Les cotisations sociales en auto-entreprise",
      texte: "Elles sont calculées directement sur votre CA, sans abattement. Le taux est de 12,3 % pour la vente de marchandises, 21,2 % pour les prestations de services BIC, et 25,6 % pour les professions libérales BNC (régime général SSI) depuis janvier 2026. Les professions relevant de la CIPAV sont à 23,2 %. Ces cotisations financent votre assurance maladie, votre retraite et vos allocations familiales. Sources : URSSAF (janvier 2026).",
    },
    {
      titre: "Le versement libératoire de l'impôt",
      texte: "C'est une option qui vous permet de payer votre impôt sur le revenu directement sur votre CA, à un taux fixe (1 %, 1,7 % ou 2,2 % selon l'activité). C'est souvent avantageux si votre taux marginal d'imposition est élevé. Mais attention : elle n'est accessible que si votre revenu fiscal de référence N-2 ne dépasse pas un certain plafond. Option à demander à l'URSSAF avant le 30 septembre de l'année précédente.",
    },
    {
      titre: "Les frais professionnels : une réalité peu visible",
      texte: "En auto-entreprise, vous ne déduisez pas vos frais réels de votre CA (sauf au régime réel). L'abattement forfaitaire (50 % ou 71 %) est censé les couvrir. Mais si vos charges réelles dépassent cet abattement, le régime AE devient moins intéressant. Tenez-en compte dans votre TJM.",
    },
    {
      titre: "Le TJM : bien plus qu'un tarif journalier",
      texte: "Votre TJM (Taux Journalier Moyen) doit couvrir vos charges fiscales et sociales, vos frais pro, vos périodes sans mission, vos congés non payés, votre formation, et votre marge de sécurité. En pratique, un freelance facturable 18 j/mois devra appliquer un TJM nettement supérieur à son objectif journalier « net ».",
    },
    {
      titre: "Les limites du régime auto-entrepreneur",
      texte: "Le régime AE est simple et rapide à gérer, mais il a des plafonds de CA stricts (77 700 € pour les services, 188 700 € pour la vente), une protection sociale réduite par rapport à un salarié, et ne permet pas de déduire vos vraies charges. Au-delà d'un certain niveau de revenus, d'autres structures (SASU, EURL) peuvent être plus avantageuses.",
    },
  ];
  return (
    <section id="comprendre" className="space-y-5">
      <SectionTitle
        sub="L'essentiel pour comprendre comment fonctionne votre revenu en tant qu'indépendant."
      >
        Comment calculer son revenu net en auto-entreprise ?
      </SectionTitle>
      <div className="grid md:grid-cols-2 gap-5">
        {blocs.map(({ titre, texte }) => (
          <Card key={titre}>
            <h3 className="font-bold text-indigo-700 text-sm mb-2">{titre}</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{texte}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function SectionOutils() {
  const outils = [
    {
      icon: "🏦",
      titre: "Banque professionnelle",
      desc: "Ouvrez un compte bancaire dédié à votre activité. Obligatoire au-delà de 10 000 € de CA sur 2 ans, recommandé dès le départ pour séparer vos finances.",
      badge: "Banque",
    },
    {
      icon: "🧾",
      titre: "Logiciel de facturation",
      desc: "Créez des devis et factures conformes, suivez vos paiements, gérez vos relances. Certains logiciels intègrent aussi la déclaration URSSAF.",
      badge: "SaaS",
    },
    {
      icon: "📊",
      titre: "Expert-comptable en ligne",
      desc: "Un comptable digital accessible, moins coûteux qu'un cabinet traditionnel, qui sécurise votre comptabilité, vos déclarations et votre optimisation fiscale.",
      badge: "Service",
    },
    {
      icon: "🛡️",
      titre: "Assurance RC Pro",
      desc: "La Responsabilité Civile Professionnelle vous protège en cas de litige, dommage ou erreur professionnelle. Indispensable dès votre premier client.",
      badge: "Assurance",
    },
  ];
  return (
    <section id="outils">
      <SectionTitle
        sub="Ces outils vous aideront à gérer votre activité sereinement. Les liens d'affiliation seront ajoutés prochainement."
      >
        Outils utiles pour auto-entrepreneurs
      </SectionTitle>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {outils.map(({ icon, titre, desc, badge }) => (
          <Card key={titre} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl">{icon}</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{badge}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-sm">{titre}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">{desc}</p>
            </div>
            {/* Placeholder affiliation */}
            <button
              className="w-full py-2 rounded-xl border-2 border-dashed border-slate-200 text-xs font-semibold text-slate-400 hover:border-indigo-300 hover:text-indigo-600 transition-all"
              disabled
            >
              Comparer les offres →
            </button>
            <p className="text-center text-[10px] text-slate-300">Lien d'affiliation à venir</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "Quelles sont les charges d'un auto-entrepreneur en 2026 ?",
      a: "Les cotisations sociales varient selon l'activité : 12,3 % pour la vente de marchandises, 21,2 % pour les prestations de services BIC, et 25,6 % pour les professions libérales BNC (régime général SSI) — ou 23,2 % pour les professions relevant de la CIPAV. Ces taux s'appliquent directement sur votre chiffre d'affaires encaissé, sans abattement. Sources : URSSAF (janvier 2026).",
    },
    {
      q: "Comment calculer son revenu net auto-entrepreneur ?",
      a: "Revenu net = CA − cotisations sociales − impôt sur le revenu − frais professionnels. Le calcul dépend de votre type d'activité et de votre option fiscale (versement libératoire ou non). Notre simulateur effectue cette estimation automatiquement selon les taux 2024/2026 en vigueur.",
    },
    {
      q: "Quel chiffre d'affaires pour gagner 2 000 € net par mois ?",
      a: "En prestation de services avec 300 €/mois de frais, il faut généralement facturer entre 3 200 et 3 500 €/mois pour obtenir 2 000 € nets. La réponse varie selon votre activité, vos frais réels et votre option fiscale. Utilisez le champ « Objectif de revenu net » dans notre calculateur pour une estimation personnalisée.",
    },
    {
      q: "Quelle différence entre chiffre d'affaires et bénéfice ?",
      a: "Le chiffre d'affaires est ce que vous facturez. Le bénéfice (ou revenu net) est ce qui reste après avoir payé toutes vos charges : cotisations sociales, impôts et frais professionnels. En auto-entreprise, l'écart représente souvent 30 à 45 % de votre CA.",
    },
    {
      q: "Comment calculer son TJM freelance ?",
      a: "TJM = CA mensuel nécessaire ÷ nombre de jours facturables réels par mois. Le CA mensuel nécessaire est lui-même calculé à partir de votre objectif de revenu net, augmenté de toutes vos charges. En pratique, un freelance facture rarement plus de 15 à 18 jours/mois (prospection, admin, congés non rémunérés).",
    },
    {
      q: "Le versement libératoire est-il avantageux ?",
      a: "Le versement libératoire peut être avantageux si votre taux marginal d'imposition est élevé, car il remplace le barème progressif par un taux fixe très bas (1 % à 2,2 % du CA). Il est toutefois réservé aux auto-entrepreneurs dont le revenu fiscal de référence N-2 ne dépasse pas un certain plafond. Consultez un conseiller fiscal pour votre situation.",
    },
    {
      q: "Un auto-entrepreneur peut-il déduire ses frais ?",
      a: "Non, pas en régime micro. Un abattement forfaitaire représentatif des charges est appliqué automatiquement (71 % pour la vente, 50 % pour les services). Si vos charges réelles dépassent cet abattement, d'autres régimes fiscaux (réel simplifié, EURL…) peuvent être plus adaptés.",
    },
    {
      q: "Ce simulateur remplace-t-il un comptable ?",
      a: "Non. Ce simulateur est un outil d'estimation rapide à but informatif. Il ne tient pas compte de votre situation personnelle complète (charges de famille, revenus du foyer, investissements, optimisation fiscale…). Pour des décisions importantes, consultez un expert-comptable ou un conseiller fiscal agréé.",
    },
  ];

  const [open, setOpen] = useState(null);
  return (
    <section id="faq">
      <SectionTitle sub="Des réponses claires aux questions les plus fréquentes des freelances et auto-entrepreneurs.">
        Questions fréquentes
      </SectionTitle>
      <div className="space-y-2 max-w-3xl">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all gap-3"
            >
              <span>{item.q}</span>
              <span className={`shrink-0 text-indigo-500 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}>▾</span>
            </button>
            {open === i && (
              <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function Nav() {
  const links = [
    { href: "#calculateur", label: "Calculateur" },
    { href: "#exemples",    label: "Exemples" },
    { href: "#comprendre",  label: "Comprendre" },
    { href: "#outils",      label: "Outils" },
    { href: "#faq",         label: "FAQ" },
  ];
  return (
    <header className="bg-white/90 backdrop-blur border-b border-slate-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow">€</div>
          <span className="font-extrabold text-slate-900 text-sm hidden sm:block">Calculateur AE</span>
        </a>
        <nav className="flex gap-1 overflow-x-auto">
          {links.map(({ href, label }) => (
            <a key={href} href={href} className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all whitespace-nowrap">
              {label}
            </a>
          ))}
        </nav>
        <a href="#calculateur" className="shrink-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-all shadow hidden md:block">
          Estimer mon TJM →
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">€</div>
              <span className="font-extrabold text-white text-sm">Calculateur AE</span>
            </div>
            <p className="text-xs text-slate-500 max-w-xs">Simulateur indépendant à but informatif. Les résultats sont estimatifs et ne remplacent pas un conseil professionnel.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-600 text-center space-y-2">
          <p>© 2026 Calculateur AE — Simulateur indépendant à but informatif. Résultats estimatifs.</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// App principale
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  // Injection meta tags dynamique (pour aperçu — en prod, utilisez le <head> HTML)
  useEffect(() => {
    document.title = "Calculateur charges auto-entrepreneur 2026 : revenu net, cotisations et impôt";
    const setMeta = (name, content, prop = false) => {
      let el = document.querySelector(`meta[${prop ? "property" : "name"}="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute(prop ? "property" : "name", name); document.head.appendChild(el); }
      el.setAttribute("content", content);
    };
    setMeta("description", "Estimez gratuitement votre revenu net d'auto-entrepreneur après cotisations, impôt et frais professionnels. Simulateur simple pour freelance, vente, prestation de services et profession libérale.");
    setMeta("robots", "index, follow");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans text-slate-800 antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        body, * { font-family: 'DM Sans', sans-serif; }
        code, .mono { font-family: 'DM Mono', monospace; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Nav />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">

        {/* ── HERO ── */}
        <section className="text-center space-y-4 pt-4">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
            Taux indicatifs 2026 — sources URSSAF &amp; impots.gouv.fr
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Calculateur de charges<br />
            <span className="text-indigo-600">auto-entrepreneur</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Estimez gratuitement votre revenu net après cotisations, impôt et frais professionnels. 
            Résultats instantanés pour freelances, prestataires de services et professions libérales.
          </p>
          <div className="flex flex-wrap gap-3 justify-center pt-2">
            <a href="#calculateur" className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-200 text-sm">
              📊 Calculer mon revenu net
            </a>
            <a href="#calculateur" className="bg-white text-indigo-700 border border-indigo-200 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-all text-sm">
              💼 Estimer mon TJM
            </a>
          </div>
          <p className="text-xs text-slate-400 pt-2">
            ✅ Gratuit · ✅ Sans inscription · ✅ Données non transmises
          </p>
        </section>

        <AdSlot label="Emplacement publicité — Après introduction" />

        {/* ── CALCULATEUR ── */}
        <Calculateur />

        <AdSlot label="Emplacement publicité — Après résultats" />

        {/* ── EXEMPLES ── */}
        <Exemples />

        {/* ── ÉDUCATIF ── */}
        <SectionEducative />

        {/* ── OUTILS ── */}
        <SectionOutils />

        <AdSlot label="Emplacement publicité — Avant FAQ" />

        {/* ── FAQ ── */}
        <FAQ />

      </main>

      <Footer />
    </div>
  );
}
