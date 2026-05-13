import { Link } from "react-router-dom";
import { PageWrapper, Card, SectionH2, Prose, BackLink, CTABanner, FAQBlock, Disclaimer, useSEO } from "../components/Layout";

export default function CalculTJM() {
  useSEO({
    title: "Calcul TJM freelance auto-entrepreneur 2026 — Méthode et exemples",
    description: "Comment calculer son TJM (Taux Journalier Moyen) en tant que freelance auto-entrepreneur ? Méthode complète, exemples par activité et simulateur gratuit.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">TJM Freelance</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 leading-tight">
          Comment calculer son TJM freelance en auto-entrepreneur ?
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Le TJM (Taux Journalier Moyen) est le tarif journalier que vous facturez à vos clients. Bien le calculer est essentiel : un TJM trop bas vous condamne à travailler à perte. Voici la méthode complète.
        </p>
      </div>

      <Disclaimer />

      <Card className="border-l-4 border-l-indigo-500">
        <SectionH2>La formule de base</SectionH2>
        <Prose>
          <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 font-mono text-sm text-indigo-800">
            TJM = CA mensuel nécessaire ÷ Nombre de jours facturables
          </div>
          <p>Et le CA mensuel nécessaire se calcule à partir de votre objectif de revenu net :</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-sm text-slate-700">
            CA mensuel = (Revenu net cible + Frais pro) ÷ (1 − Taux charges total)
          </div>
          <p className="text-xs text-slate-400">Le taux de charges total inclut cotisations sociales + impôt. Il varie de ~25 % à ~45 % selon votre activité et votre situation fiscale.</p>
        </Prose>
      </Card>

      <CTABanner />

      <Card>
        <SectionH2>Combien de jours facturables par mois ?</SectionH2>
        <Prose>
          <p>C'est l'erreur la plus fréquente : diviser par 22 jours (nombre de jours ouvrés) au lieu de jours réellement facturables. En pratique, un freelance facture bien moins :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse mt-1">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="text-left px-3 py-2">Poste</th>
                  <th className="text-right px-3 py-2">Jours/mois</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Jours ouvrés moyens", "22 j"],
                  ["−  Congés payés (5 sem./an)", "−4 j"],
                  ["−  Prospection & admin", "−2 à 3 j"],
                  ["−  Formation, veille", "−0,5 à 1 j"],
                  ["−  Inter-missions (aléas)", "−0,5 à 1 j"],
                  ["= Jours facturables réels", "≈ 15 à 18 j"],
                ].map(([label, val]) => (
                  <tr key={label} className={`bg-white ${label.startsWith("=") ? "font-bold text-indigo-700" : ""}`}>
                    <td className="px-3 py-2">{label}</td>
                    <td className="px-3 py-2 text-right">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>La plupart des freelances expérimentés retiennent <strong>15 jours pour être prudents</strong>, 18 jours en régime de croisière.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Exemples de TJM par profil (2026)</SectionH2>
        <Prose>
          <p>Objectif : 2 500 € nets/mois, 300 €/mois de frais, 18 jours facturables. Sans versement libératoire, barème IR 1 part :</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse mt-1">
              <thead>
                <tr className="bg-indigo-50 text-indigo-700">
                  <th className="text-left px-3 py-2 rounded-tl-lg">Profil</th>
                  <th className="text-right px-3 py-2">CA/mois</th>
                  <th className="text-right px-3 py-2 rounded-tr-lg">TJM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  ["Artisan (BIC services)", "≈ 4 250 €", "≈ 236 €/j"],
                  ["Consultant (BNC SSI)", "≈ 4 900 €", "≈ 272 €/j"],
                  ["Psychologue (CIPAV)",   "≈ 4 600 €", "≈ 256 €/j"],
                  ["Marchand (BIC vente)",  "≈ 3 150 €", "≈ 175 €/j"],
                ].map(([label, ca, tjm]) => (
                  <tr key={label} className="bg-white hover:bg-slate-50">
                    <td className="px-3 py-2 font-medium">{label}</td>
                    <td className="px-3 py-2 text-right">{ca}</td>
                    <td className="px-3 py-2 text-right font-bold text-indigo-700">{tjm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400">Estimations indicatives. Utilisez le simulateur pour votre situation précise.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Les 4 erreurs qui font sous-estimer son TJM</SectionH2>
        <Prose>
          <ul className="space-y-2">
            {[
              ["Diviser par 22 jours", "Le mois ouvré standard, pas le mois facturable. Toujours utiliser 15 à 18 jours réels."],
              ["Oublier l'impôt", "Beaucoup calculent leur TJM en soustrayant seulement les cotisations. L'impôt doit être intégré."],
              ["Ne pas compter les frais réels", "Abonnements, transport, matériel, mutuelle… ils réduisent votre revenu net réel."],
              ["Ne pas prévoir de marge de sécurité", "Ajoutez 10 à 15 % de « coussin » pour les imprévus, les mois creux ou les investissements futurs."],
            ].map(([titre, texte]) => (
              <li key={titre} className="flex gap-2">
                <span className="text-rose-500 font-bold shrink-0">✗</span>
                <div>
                  <strong className="text-slate-800">{titre}</strong>
                  <span className="text-slate-500"> — {texte}</span>
                </div>
              </li>
            ))}
          </ul>
        </Prose>
      </Card>

      <Card>
        <SectionH2>TJM de marché vs TJM de survie</SectionH2>
        <Prose>
          <p>Il y a deux TJM à connaître :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>TJM de survie :</strong> le minimum pour couvrir vos charges et atteindre votre revenu cible. C'est ce que calcule ce simulateur.</li>
            <li><strong>TJM de marché :</strong> ce que vos clients acceptent de payer, selon votre secteur, votre expérience et votre positionnement. Il peut être supérieur ou inférieur.</li>
          </ul>
          <p>Si votre TJM de marché est inférieur à votre TJM de survie, vous avez un problème de positionnement ou de coûts. Si votre TJM de marché est supérieur, vous avez une opportunité de négocier ou d'augmenter vos tarifs.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Aller plus loin</SectionH2>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/auto-entrepreneur-combien-pour-gagner-2000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 2 000 € nets ?</Link>
          <Link to="/auto-entrepreneur-combien-pour-gagner-3000-net"  className="text-indigo-600 hover:underline">→ Quel CA pour gagner 3 000 € nets ?</Link>
          <Link to="/charges-auto-entrepreneur-prestation-service"    className="text-indigo-600 hover:underline">→ Charges en prestation de services BIC</Link>
          <Link to="/charges-auto-entrepreneur-profession-liberale"   className="text-indigo-600 hover:underline">→ Charges professions libérales BNC</Link>
        </div>
      </Card>

      <FAQBlock items={[
        {
          q: "Mon TJM doit-il inclure la TVA ?",
          a: "En auto-entrepreneur (sous le seuil de franchise TVA), vous ne facturez pas de TVA. Votre TJM est donc hors TVA = TTC. Si vous dépassez le seuil de franchise, vous devrez ajouter la TVA sur vos factures, sans que cela change votre revenu net.",
        },
        {
          q: "Comment négocier son TJM sans le brader ?",
          a: "Commencez toujours par annoncer votre TJM cible complet, pas un TJM minimum. Si un client hésite, vous pouvez ajuster le périmètre de la mission plutôt que le tarif. Valorisez votre expertise, vos références et la valeur délivrée plutôt que le temps passé.",
        },
        {
          q: "Faut-il afficher son TJM sur son site ou ses profils ?",
          a: "C'est une question de stratégie commerciale. Afficher son TJM filtre naturellement les clients à petit budget et positionne votre offre. Ne pas l'afficher laisse plus de flexibilité mais peut attirer des demandes mal ciblées. Il n'y a pas de règle universelle.",
        },
        {
          q: "Mon TJM doit-il augmenter chaque année ?",
          a: "Il est conseillé d'augmenter son TJM régulièrement pour au moins compenser l'inflation et suivre la progression de votre expérience. Une augmentation de 5 à 10 % par an est généralement bien acceptée par les clients de longue date si elle est anticipée et communiquée à l'avance.",
        },
      ]} />
    </PageWrapper>
  );
}
