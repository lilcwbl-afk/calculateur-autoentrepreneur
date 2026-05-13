import { Link } from "react-router-dom";
import { PageWrapper, Card, SectionH2, Prose, BackLink, CTABanner, FAQBlock, Disclaimer, useSEO } from "../components/Layout";

export default function Gagner2000Net() {
  useSEO({
    title: "Auto-entrepreneur : quel CA pour gagner 2 000 € net/mois ? (2026)",
    description: "Combien faut-il facturer en auto-entrepreneur pour gagner 2 000 € net par mois après charges et impôts ? Calcul détaillé selon le type d'activité. Simulateur gratuit.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Auto-entrepreneur — Revenu cible</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          Quel CA pour gagner 2 000 € net par mois en auto-entrepreneur ?
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          2 000 € net par mois, c'est l'objectif de beaucoup de freelances qui se lancent. Mais combien faut-il vraiment facturer pour y arriver ? La réponse dépend de votre activité, de vos frais et de votre option fiscale.
        </p>
      </div>

      <Disclaimer />

      {/* Réponse directe */}
      <Card className="border-l-4 border-l-indigo-500">
        <SectionH2>Réponse rapide</SectionH2>
        <Prose>
          <p>Pour gagner <strong>2 000 € net/mois</strong> en auto-entrepreneur (sans ACRE, 300 €/mois de frais) :</p>
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
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 2 550 €</td>
                  <td className="px-3 py-2 text-right">≈ 142 €/j</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">Prestation de services BIC</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 3 350 €</td>
                  <td className="px-3 py-2 text-right">≈ 186 €/j</td>
                </tr>
                <tr className="bg-white hover:bg-slate-50">
                  <td className="px-3 py-2 font-medium">Profession libérale BNC</td>
                  <td className="px-3 py-2 text-right font-bold text-emerald-700">≈ 3 700 €</td>
                  <td className="px-3 py-2 text-right">≈ 206 €/j</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Estimation sans versement libératoire, barème IR 1 part, 300 €/mois de frais. Utilisez le simulateur pour votre situation exacte.</p>
        </Prose>
      </Card>

      <CTABanner />

      {/* Sections explicatives */}
      <Card>
        <SectionH2>Pourquoi le CA est-il si différent du revenu net ?</SectionH2>
        <Prose>
          <p>Beaucoup de freelances font l'erreur de raisonner en chiffre d'affaires. En auto-entreprise, votre CA subit plusieurs prélèvements avant de devenir votre revenu réel :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Cotisations sociales</strong> : entre 12,3 % et 25,6 % du CA selon votre activité</li>
            <li><strong>Impôt sur le revenu</strong> : calculé après abattement forfaitaire (34 %, 50 % ou 71 %)</li>
            <li><strong>Frais professionnels</strong> : non déductibles en micro, mais bien réels</li>
          </ul>
          <p>Un auto-entrepreneur en prestation de services qui facture 3 350 €/mois ne "reçoit" pas 3 350 €. Après ~710 € de cotisations, ~340 € d'impôt et 300 € de frais, il lui reste environ 2 000 €.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Exemple chiffré : consultant en services informatiques</SectionH2>
        <Prose>
          <p>Prenons un consultant freelance en prestation de services BIC, sans versement libératoire, avec 300 €/mois de frais :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>CA mensuel : <strong>3 350 €</strong></li>
            <li>Cotisations sociales (21,2 %) : <strong>−711 €</strong></li>
            <li>Impôt estimé (barème, 1 part) : <strong>−339 €</strong></li>
            <li>Frais professionnels : <strong>−300 €</strong></li>
            <li><strong>Revenu net estimé : ≈ 2 000 €</strong></li>
          </ul>
          <p>Pour facturer 3 350 €/mois sur 18 jours facturables, le TJM est d'environ <strong>186 €/j</strong>.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>L'impact de l'ACRE sur votre objectif</SectionH2>
        <Prose>
          <p>Si vous êtes éligible à l'ACRE (Aide à la Création et Reprise d'Entreprise), vos cotisations sociales sont réduites de 50 % pendant les 4 premiers trimestres civils. Cela change significativement l'équation :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>En prestation de services avec ACRE (avant juillet 2026) : cotisations à ~10,6 % au lieu de 21,2 %</li>
            <li>CA nécessaire pour 2 000 € nets avec ACRE : <strong>≈ 2 850 €/mois</strong> au lieu de 3 350 €</li>
          </ul>
          <p>L'ACRE peut durer jusqu'à 4 trimestres. Profitez-en pour constituer un fonds de trésorerie.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Comment augmenter son revenu net sans augmenter son CA ?</SectionH2>
        <Prose>
          <p>Quelques leviers efficaces :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Réduire ses frais réels</strong> : négocier ses abonnements logiciels, mutualiser les outils</li>
            <li><strong>Opter pour le versement libératoire</strong> si votre taux marginal d'imposition est élevé</li>
            <li><strong>Facturer plus de jours</strong> ou augmenter son TJM progressivement</li>
            <li><strong>Passer à un autre régime</strong> (EURL, SASU) si le CA dépasse le plafond AE ou si vos charges réelles sont élevées</li>
          </ul>
        </Prose>
      </Card>

      {/* Liens internes */}
      <Card>
        <SectionH2>Aller plus loin</SectionH2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/auto-entrepreneur-combien-pour-gagner-3000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 3 000 € net/mois ?</Link>
          <Link to="/calcul-tjm-freelance-auto-entrepreneur"          className="text-indigo-600 hover:underline">→ Comment calculer son TJM freelance ?</Link>
          <Link to="/charges-auto-entrepreneur-prestation-service"    className="text-indigo-600 hover:underline">→ Charges en prestation de services : le guide complet</Link>
          <Link to="/charges-auto-entrepreneur-profession-liberale"   className="text-indigo-600 hover:underline">→ Charges pour les professions libérales BNC</Link>
        </div>
      </Card>

      <FAQBlock items={[
        {
          q: "Faut-il compter 2 000 € net avant ou après frais ?",
          a: "Il vaut toujours raisonner en revenu net après frais — c'est ce qui reste réellement dans votre poche. Le simulateur calcule les deux : revenu net avant et après frais professionnels.",
        },
        {
          q: "Combien de jours dois-je facturer pour atteindre 2 000 € nets ?",
          a: "Avec un TJM de 186 €/j en prestation de services, il faut facturer environ 18 jours par mois. En pratique, un freelance facture rarement plus de 15 à 18 jours réels (prospection, admin, congés non rémunérés).",
        },
        {
          q: "Le versement libératoire est-il intéressant pour cet objectif ?",
          a: "Ça dépend de votre situation fiscale globale. Si vous êtes célibataire sans autre revenu, le barème progressif peut être légèrement plus avantageux à ce niveau de CA. Le simulateur vous permet de comparer les deux options.",
        },
        {
          q: "Ces estimations sont-elles fiables ?",
          a: "Elles sont indicatives. Les taux utilisés sont basés sur les barèmes URSSAF et fiscaux 2026, mais le calcul de l'impôt suppose une situation célibataire, 1 part fiscale, sans autre revenu. Votre situation peut différer. Consultez un expert-comptable pour une simulation précise.",
        },
      ]} />
    </PageWrapper>
  );
}
