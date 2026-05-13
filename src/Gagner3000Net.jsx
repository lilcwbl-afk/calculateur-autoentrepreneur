import { Link } from "react-router-dom";
import { PageWrapper, Card, SectionH2, Prose, BackLink, CTABanner, FAQBlock, Disclaimer, useSEO } from "../components/Layout";

export default function Gagner3000Net() {
  useSEO({
    title: "Auto-entrepreneur : quel CA pour gagner 3 000 € net/mois ? (2026)",
    description: "Quel chiffre d'affaires faut-il facturer en auto-entrepreneur pour gagner 3 000 € nets par mois ? Calcul détaillé par activité, exemples chiffrés et simulateur gratuit.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Auto-entrepreneur — Revenu cible</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          Quel CA pour gagner 3 000 € net par mois en auto-entrepreneur ?
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          3 000 € nets par mois représentent un revenu confortable mais aussi un objectif très atteignable pour un freelance bien positionné. À ce niveau, la question du régime juridique et fiscal commence à se poser sérieusement.
        </p>
      </div>

      <Disclaimer />

      <Card className="border-l-4 border-l-indigo-500">
        <SectionH2>Réponse rapide</SectionH2>
        <Prose>
          <p>Pour gagner <strong>3 000 € net/mois</strong> en auto-entrepreneur (sans ACRE, 300 €/mois de frais) :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse mt-2">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="text-left px-3 py-2 rounded-tl-lg">Activité</th>
                  <th className="text-right px-3 py-2">CA mensuel</th>
                  <th className="text-right px-3 py-2 rounded-tr-lg">TJM (18 j)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">Vente de marchandises</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 3 750 €</td>
                  <td className="px-3 py-2 text-right">≈ 208 €/j</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">Prestation de services BIC</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 5 100 €</td>
                  <td className="px-3 py-2 text-right">≈ 283 €/j</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">Profession libérale BNC</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 5 700 €</td>
                  <td className="px-3 py-2 text-right">≈ 317 €/j</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Estimation sans versement libératoire, barème IR 1 part, 300 €/mois de frais. Utilisez le simulateur pour votre situation.</p>
        </Prose>
      </Card>

      <CTABanner />

      <Card>
        <SectionH2>Attention au plafond en prestation de services</SectionH2>
        <Prose>
          <p>Pour les activités de prestation de services BIC et les professions libérales BNC, le plafond du régime auto-entrepreneur est de <strong>83 600 €/an en 2026</strong>.</p>
          <p>Pour générer 3 000 € nets/mois, vous devez facturer environ 5 100 à 5 700 €/mois, soit <strong>61 200 à 68 400 €/an</strong> — ce qui vous laisse une marge avant le plafond, mais il vaut mieux l'anticiper.</p>
          <p>Si votre CA dépasse régulièrement 70 000 €/an, commencez à étudier les alternatives : EURL au régime réel simplifié ou SASU.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Exemple chiffré : développeur web freelance</SectionH2>
        <Prose>
          <p>Prenons un développeur web en prestation de services BIC, sans versement libératoire, 300 €/mois de frais :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CA mensuel : <strong>5 100 €</strong></li>
            <li>Cotisations sociales (21,2 %) : <strong>−1 081 €</strong></li>
            <li>Impôt estimé (barème IR, 1 part) : <strong>−719 €</strong></li>
            <li>Frais professionnels : <strong>−300 €</strong></li>
            <li><strong>Revenu net estimé : ≈ 3 000 €</strong></li>
          </ul>
          <p>TJM correspondant sur 18 jours facturables : <strong>≈ 283 €/j</strong>. Un TJM tout à fait atteignable pour un développeur senior ou un consultant spécialisé.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>3 000 € nets : est-ce possible en auto-entreprise ?</SectionH2>
        <Prose>
          <p>Oui, c'est possible — mais avec quelques nuances importantes :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Pour la vente :</strong> le plafond de 203 100 €/an laisse de la marge. Un CA de 3 750 €/mois est bien en dessous.</li>
            <li><strong>Pour les services :</strong> un CA de 5 100 €/mois (61 200 €/an) est faisable, mais laissez peu de marge avant le plafond. Anticipez.</li>
            <li><strong>Pour les libéraux BNC :</strong> à 5 700 €/mois (68 400 €/an), vous êtes à 82 % du plafond. La vigilance s'impose.</li>
          </ul>
          <p>Au-delà de 3 000 € nets, le passage à l'EURL ou à la SASU mérite souvent d'être étudié, pour des raisons fiscales et de protection sociale.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Versement libératoire : intéressant à ce niveau ?</SectionH2>
        <Prose>
          <p>Pour un CA de 5 100 €/mois (61 200 €/an) en services BIC, la base imposable après abattement de 50 % est d'environ 30 600 €. L'impôt au barème représente environ 8 600 €/an.</p>
          <p>Avec le versement libératoire à 1,7 % : 61 200 × 1,7 % = <strong>1 040 €/an</strong>. L'écart est énorme.</p>
          <p>À ce niveau de CA, si vous êtes éligible, le versement libératoire est généralement très avantageux. Vérifiez votre éligibilité sur la base de votre revenu fiscal N-2.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Aller plus loin</SectionH2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/auto-entrepreneur-combien-pour-gagner-2000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 2 000 € nets ?</Link>
          <Link to="/calcul-tjm-freelance-auto-entrepreneur"          className="text-indigo-600 hover:underline">→ Comment calculer son TJM freelance ?</Link>
          <Link to="/charges-auto-entrepreneur-prestation-service"    className="text-indigo-600 hover:underline">→ Guide des charges en prestation de services</Link>
        </div>
      </Card>

      <FAQBlock items={[
        {
          q: "3 000 € nets, c'est possible dès la première année ?",
          a: "Oui, surtout avec l'ACRE qui réduit vos cotisations de 50 % la première année. Avec ACRE en services, un CA d'environ 4 100 €/mois suffit pour atteindre 3 000 € nets. La difficulté est souvent de trouver les clients, pas de faire le calcul.",
        },
        {
          q: "Dois-je facturer tous les mois pour atteindre cet objectif ?",
          a: "Non — mais votre CA mensuel moyen doit atteindre la cible sur l'année. Certains mois vous facturerez plus (missions longues), d'autres moins (prospection, congés, jours sans mission). Raisonnez en moyenne annuelle.",
        },
        {
          q: "À 3 000 € nets, vaut-il mieux rester en AE ou passer en société ?",
          a: "C'est une question de situation personnelle. En AE, la simplicité est maximale. En SASU ou EURL, la protection sociale est meilleure et l'optimisation fiscale possible (dividendes, frais réels…), mais la gestion est plus lourde. Consultez un expert-comptable pour comparer.",
        },
        {
          q: "Ces chiffres incluent-ils les charges de retraite ?",
          a: "Oui. Les cotisations sociales en AE couvrent notamment la retraite de base et complémentaire, l'assurance maladie et les allocations familiales. La retraite AE est cependant plus faible qu'un salarié à revenu équivalent.",
        },
      ]} />
    </PageWrapper>
  );
}
