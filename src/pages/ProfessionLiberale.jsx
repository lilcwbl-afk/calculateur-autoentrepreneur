import { Link } from "react-router-dom";
import { PageWrapper, Card, SectionH2, Prose, BackLink, CTABanner, FAQBlock, Disclaimer, useSEO } from "../components/Layout";

export default function ProfessionLiberale() {
  useSEO({
    title: "Charges auto-entrepreneur profession libérale (BNC) 2026 — Calcul et taux",
    description: "Taux de cotisations sociales, abattement fiscal et revenu net pour une profession libérale en auto-entreprise (BNC). Guide complet et simulateur gratuit 2026.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Profession libérale — BNC</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          Charges auto-entrepreneur profession libérale (BNC) en 2026
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Médecin, avocat, architecte, consultant, psychologue, coach, graphiste… Les professions libérales en auto-entreprise relèvent du régime BNC et ont des taux spécifiques, souvent méconnus. Voici tout ce qu'il faut savoir.
        </p>
      </div>

      <Disclaimer />

      <Card className="border-l-4 border-l-indigo-500">
        <SectionH2>Taux en vigueur pour les libéraux BNC (2026)</SectionH2>
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
                  ["Cotisations sociales (SSI/régime général)", "25,6 %"],
                  ["Cotisations sociales (CIPAV)", "23,2 %"],
                  ["Abattement fiscal BNC", "34 %"],
                  ["Versement libératoire (optionnel)", "2,2 %"],
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
          <p className="text-xs text-slate-400">Sources : URSSAF (janvier 2026), impots.gouv.fr, service-public.fr</p>
        </Prose>
      </Card>

      <CTABanner />

      <Card>
        <SectionH2>SSI ou CIPAV : quelle différence ?</SectionH2>
        <Prose>
          <p>Les professions libérales en auto-entreprise cotisent soit auprès du <strong>SSI (Sécurité Sociale des Indépendants)</strong> — anciennement RSI — soit auprès de la <strong>CIPAV</strong> (Caisse Interprofessionnelle de Prévoyance et d'Assurance Vieillesse).</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>CIPAV :</strong> professions réglementées (architectes, géomètres, guides de montagne, ostéopathes, psychologues, ergothérapeutes…). Taux : 23,2 %.</li>
            <li><strong>SSI :</strong> toutes les autres professions libérales non réglementées (consultants, coachs, graphistes, formateurs, rédacteurs…). Taux : 25,6 %.</li>
          </ul>
          <p>En cas de doute sur votre rattachement, consultez <a href="https://www.cipav.fr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">cipav.fr</a> ou <a href="https://www.urssaf.fr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">urssaf.fr</a>.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Exemple chiffré : consultant indépendant (SSI)</SectionH2>
        <Prose>
          <p>Consultant non réglementé, CA mensuel de 4 000 €, sans versement libératoire, 200 €/mois de frais :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CA annuel : <strong>48 000 €</strong></li>
            <li>Cotisations SSI (25,6 %) : <strong>−12 288 €/an</strong> soit −1 024 €/mois</li>
            <li>Base imposable (abattement 34 %) : 48 000 × 66 % = 31 680 €</li>
            <li>Impôt IR estimé (barème, 1 part) : <strong>≈ −6 300 €/an</strong> soit −525 €/mois</li>
            <li>Frais professionnels : <strong>−2 400 €/an</strong></li>
            <li><strong>Revenu net estimé : ≈ 2 251 €/mois</strong></li>
          </ul>
          <p>Le taux de charge global représente ici environ <strong>44 %</strong> du CA. C'est significativement plus élevé qu'en prestation de services BIC.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>L'abattement fiscal BNC : 34 %, pas 50 %</SectionH2>
        <Prose>
          <p>C'est l'erreur la plus fréquente : de nombreux libéraux pensent bénéficier d'un abattement de 50 % comme les prestataires BIC. <strong>Ce n'est pas le cas.</strong></p>
          <p>L'abattement fiscal BNC est de <strong>34 %</strong> (article 102 ter du CGI). Cela signifie que 66 % de votre CA est soumis au barème de l'impôt sur le revenu.</p>
          <p>Si vos charges réelles représentent plus de 34 % de votre CA (loyer, matériel, abonnements…), le régime de la déclaration contrôlée (régime réel) peut être plus avantageux. Consultez un expert-comptable.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Le versement libératoire : très intéressant pour les libéraux</SectionH2>
        <Prose>
          <p>Avec un taux de 2,2 % du CA, le versement libératoire est souvent très avantageux pour les professions libérales, car l'abattement fiscal de seulement 34 % expose à une base imposable élevée.</p>
          <p>Exemple : pour un CA de 48 000 €, le VL représente <strong>1 056 €/an d'impôt</strong>, contre 6 300 € au barème. L'économie est très significative.</p>
          <p>Condition : votre revenu fiscal de référence N-2 ne doit pas dépasser un certain plafond (variable selon le quotient familial). Vérifiez votre éligibilité.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Aller plus loin</SectionH2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/charges-auto-entrepreneur-prestation-service"    className="text-indigo-600 hover:underline">→ Charges en prestation de services BIC</Link>
          <Link to="/auto-entrepreneur-combien-pour-gagner-2000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 2 000 € nets ?</Link>
          <Link to="/calcul-tjm-freelance-auto-entrepreneur"          className="text-indigo-600 hover:underline">→ Calculer son TJM freelance</Link>
        </div>
      </Card>

      <FAQBlock items={[
        {
          q: "Les médecins et avocats peuvent-ils être auto-entrepreneurs ?",
          a: "Certaines professions réglementées ont des contraintes spécifiques (ordre professionnel, assurance obligatoire…). La plupart peuvent adopter le statut AE, mais doivent vérifier les règles de leur ordre ou syndicat. Les médecins en exercice libéral relèvent généralement d'un autre régime.",
        },
        {
          q: "Puis-je déduire mes frais réels en libéral BNC ?",
          a: "Non, pas en régime micro-BNC. L'abattement forfaitaire de 34 % est censé couvrir vos charges. Si vos frais réels dépassent 34 % de votre CA, la déclaration contrôlée (régime réel BNC) peut être plus avantageuse. Consultez un expert-comptable.",
        },
        {
          q: "Qu'est-ce que change le rattachement CIPAV vs SSI ?",
          a: "Le taux de cotisations diffère (23,2 % vs 25,6 %) et la caisse de retraite est différente. La retraite complémentaire CIPAV fonctionne par points, avec ses propres règles. En pratique, la différence sur le revenu net est de quelques dizaines d'euros par mois pour un CA standard.",
        },
        {
          q: "Ce simulateur prend-il en compte les spécificités CIPAV ?",
          a: "Le simulateur propose deux taux distincts (25,6 % pour le régime général SSI, 23,2 % pour CIPAV via le champ libéral). Sélectionnez le taux correspondant à votre situation et ajustez si nécessaire. Les résultats restent estimatifs.",
        },
      ]} />
    </PageWrapper>
  );
}
