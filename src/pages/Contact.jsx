import { PageWrapper, Card, SectionH2, Prose, BackLink, useSEO } from "../components/Layout";

export default function Contact() {
  useSEO({
    title: "Contact — Calculateur AE",
    description: "Contactez l'équipe du Calculateur AE pour signaler une erreur, suggérer une amélioration ou poser une question.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Contact</h1>
        <p className="text-sm text-slate-500">
          Ce site est un projet indépendant à but informatif. Nous lisons tous les messages et faisons de notre mieux pour répondre.
        </p>
      </div>

      <Card>
        <SectionH2>Nous écrire</SectionH2>
        <Prose>
          <p>Pour toute question ou remarque, vous pouvez nous contacter directement par email :</p>
          <p className="font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 inline-block">
            📧 <span className="italic text-slate-500">[Email de contact à compléter]</span>
          </p>
          <p className="text-xs text-slate-400">Nous ne répondons pas aux sollicitations commerciales non sollicitées.</p>
        </Prose>
      </Card>

      <Card className="border-l-4 border-l-rose-400">
        <SectionH2>Signaler une erreur dans les calculs</SectionH2>
        <Prose>
          <p>Vous avez repéré un taux incorrect, un résultat incohérent ou une formule qui semble erronée ?</p>
          <p>Merci de nous le signaler en précisant :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Le type d'activité concerné (vente, services, libéral…)</li>
            <li>La valeur que vous obtenez</li>
            <li>La valeur attendue selon vous, avec la source officielle si possible (urssaf.fr, impots.gouv.fr…)</li>
          </ul>
          <p>Nous vérifions et mettons à jour les taux dans les meilleurs délais.</p>
          <p className="font-semibold text-slate-800">
            📧 <span className="italic text-slate-500">[Email de contact à compléter]</span> — Objet : Erreur calcul
          </p>
        </Prose>
      </Card>

      <Card className="border-l-4 border-l-indigo-400">
        <SectionH2>Proposer une amélioration</SectionH2>
        <Prose>
          <p>Une fonctionnalité vous manque ? Vous souhaitez voir un nouveau champ, un cas particulier, ou une page explicative sur un sujet spécifique ?</p>
          <p>Vos retours nous aident à rendre le simulateur plus utile pour tous les freelances et auto-entrepreneurs.</p>
          <p className="font-semibold text-slate-800">
            📧 <span className="italic text-slate-500">[Email de contact à compléter]</span> — Objet : Suggestion
          </p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Ce que nous ne faisons pas</SectionH2>
        <Prose>
          <p>Ce site est un outil informatif. Nous ne sommes pas experts-comptables, conseillers fiscaux ou juridiques. Nous ne pouvons donc pas :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Vous donner un conseil fiscal ou comptable personnalisé</li>
            <li>Valider votre situation administrative</li>
            <li>Vous aider à remplir vos déclarations URSSAF ou fiscales</li>
          </ul>
          <p>Pour ces besoins, consultez votre expert-comptable ou l'URSSAF directement.</p>
        </Prose>
      </Card>
    </PageWrapper>
  );
}
