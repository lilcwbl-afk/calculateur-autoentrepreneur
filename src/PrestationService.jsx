import { Link } from "react-router-dom";
import { PageWrapper, Card, SectionH2, Prose, BackLink, CTABanner, FAQBlock, Disclaimer, useSEO } from "../components/Layout";

export default function PrestationService() {
  useSEO({
    title: "Charges auto-entrepreneur prestation de services (BIC) 2026 — Guide complet",
    description: "Taux de cotisations, abattement fiscal et calcul du revenu net pour un auto-entrepreneur en prestation de services BIC. Exemples chiffrés et simulateur gratuit.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Prestation de services — BIC</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          Charges auto-entrepreneur en prestation de services BIC (2026)
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Artisan, freelance, prestataire commercial ou artisanal : les activités de prestation de services BIC représentent la majorité des auto-entrepreneurs. Voici comment calculer vos charges et votre revenu net précisément.
        </p>
      </div>

      <Disclaimer />

      <Card className="border-l-4 border-l-indigo-500">
        <SectionH2>Taux en vigueur pour les prestations BIC (2026)</SectionH2>
        <Prose>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="text-left px-3 py-2 rounded-tl-lg">Paramètre</th>
                  <th className="text-right px-3 py-2 rounded-tr-lg">Valeur 2026</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Cotisations sociales", "21,2 %"],
                  ["Abattement fiscal BIC services", "50 %"],
                  ["Versement libératoire (optionnel)", "1,7 %"],
                  ["Plafond CA annuel", "83 600 €"],
                ].map(([label, val]) => (
                  <tr key={label} className="bg-white hover:bg-slate-50">
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right font-bold text-slate-800">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Sources : URSSAF (janvier 2026), impots.gouv.fr</p>
        </Prose>
      </Card>

      <CTABanner />

      <Card>
        <SectionH2>Qui est concerné par le régime BIC services ?</SectionH2>
        <Prose>
          <p>Le régime BIC (Bénéfices Industriels et Commerciaux) pour les prestations de services concerne :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Artisans (plombier, électricien, menuisier, coiffeur…)</li>
            <li>Prestataires commerciaux (agent commercial, intermédiaire…)</li>
            <li>Certains freelances dont l'activité est de nature commerciale</li>
            <li>Agents immobiliers, VDI (Vendeurs à Domicile Indépendants)</li>
          </ul>
          <p>À ne pas confondre avec les professions libérales BNC (consultants, avocats, architectes…) qui ont des taux différents.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Exemple chiffré : artisan plombier</SectionH2>
        <Prose>
          <p>Plombier indépendant, CA mensuel de 3 500 €, sans versement libératoire, 400 €/mois de frais (outillage, carburant, fournitures) :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CA annuel : <strong>42 000 €</strong></li>
            <li>Cotisations sociales (21,2 %) : <strong>−8 904 €/an</strong> soit −742 €/mois</li>
            <li>Base imposable (abattement 50 %) : 21 000 €</li>
            <li>Impôt IR estimé (barème, 1 part) : <strong>≈ −2 400 €/an</strong> soit −200 €/mois</li>
            <li>Frais professionnels : <strong>−4 800 €/an</strong></li>
            <li><strong>Revenu net estimé : ≈ 2 158 €/mois</strong></li>
          </ul>
          <p>Le taux de charge global est ici d'environ <strong>38 %</strong> du CA — nettement plus gérable que pour les libéraux BNC.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>L'abattement de 50 % : un avantage réel ?</SectionH2>
        <Prose>
          <p>L'abattement fiscal de 50 % signifie que seule la moitié de votre CA est soumise à l'impôt sur le revenu. C'est un avantage considérable si vos frais réels sont inférieurs à 50 % de votre CA.</p>
          <p>En revanche, si vos charges réelles sont supérieures à 50 % (matériaux coûteux, sous-traitance importante…), le régime réel BIC peut être plus avantageux. Un expert-comptable peut faire ce calcul comparatif.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Versement libératoire : intéressant pour les BIC services ?</SectionH2>
        <Prose>
          <p>Le taux de versement libératoire pour les services BIC est de <strong>1,7 % du CA</strong>. Comparé au barème progressif après abattement de 50 %, il peut être avantageux si votre tranche marginale d'imposition est à 11 % ou plus.</p>
          <p>Exemple : pour un CA de 42 000 €, le VL représente <strong>714 €/an</strong>, contre environ 2 400 € au barème. L'économie est notable.</p>
          <p>Condition : revenu fiscal de référence N-2 dans les limites prévues. Vérifiez votre éligibilité avant de cocher cette option.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>BIC services vs BNC libéral : quelle différence pratique ?</SectionH2>
        <Prose>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-700">
                  <th className="text-left px-3 py-2">Critère</th>
                  <th className="text-center px-3 py-2">BIC services</th>
                  <th className="text-center px-3 py-2">BNC libéral SSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Cotisations sociales", "21,2 %", "25,6 %"],
                  ["Abattement fiscal", "50 %", "34 %"],
                  ["Versement libératoire", "1,7 %", "2,2 %"],
                  ["Plafond CA", "83 600 €", "83 600 €"],
                  ["Caisse retraite", "SSI", "SSI ou CIPAV"],
                ].map(([label, bic, bnc]) => (
                  <tr key={label} className="bg-white hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium">{label}</td>
                    <td className="px-3 py-2 text-center text-emerald-700 font-bold">{bic}</td>
                    <td className="px-3 py-2 text-center text-rose-700 font-bold">{bnc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Le BIC services est généralement plus avantageux que le BNC libéral en termes de charges totales.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Aller plus loin</SectionH2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/charges-auto-entrepreneur-profession-liberale"   className="text-indigo-600 hover:underline">→ Charges pour les professions libérales BNC</Link>
          <Link to="/auto-entrepreneur-combien-pour-gagner-2000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 2 000 € nets ?</Link>
          <Link to="/calcul-tjm-freelance-auto-entrepreneur"          className="text-indigo-600 hover:underline">→ Calculer son TJM freelance</Link>
        </div>
      </Card>

      <FAQBlock items={[
        {
          q: "Un graphiste freelance est-il BIC ou BNC ?",
          a: "Un graphiste est généralement considéré comme profession libérale (BNC) s'il exerce une activité intellectuelle et créative non commerciale. Mais si son activité implique une dimension commerciale (vente de produits, revente de droits comme une agence…), il peut être BIC. En cas de doute, consultez l'URSSAF ou un expert-comptable.",
        },
        {
          q: "Les cotisations BIC services donnent-elles droit à la retraite ?",
          a: "Oui. Les cotisations sociales en AE ouvrent des droits à la retraite de base et complémentaire. Mais les droits validés sont proportionnels au CA déclaré, et peuvent être inférieurs à ceux d'un salarié à revenu équivalent. Anticipez en constituant une épargne retraite complémentaire.",
        },
        {
          q: "Puis-je facturer de la TVA en prestation de services ?",
          a: "Non, pas en régime auto-entrepreneur tant que vous ne dépassez pas les seuils de franchise en base de TVA (36 800 € pour les services en 2026). Au-delà, vous perdez la franchise et devez collecter et reverser la TVA, ce qui implique souvent de changer de régime.",
        },
        {
          q: "Comment déclarer mon CA à l'URSSAF en services BIC ?",
          a: "Vous déclarez votre CA encaissé chaque mois ou chaque trimestre (selon l'option choisie) via le portail autoentrepreneur.urssaf.fr. Le montant des cotisations est calculé automatiquement. En cas de CA nul, vous devez quand même faire une déclaration à zéro.",
        },
      ]} />
    </PageWrapper>
  );
}
