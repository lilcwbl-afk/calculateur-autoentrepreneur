import { PageWrapper, Card, SectionH2, Prose, BackLink, useSEO } from "../components/Layout";

export default function MentionsLegales() {
  useSEO({
    title: "Mentions légales — Calculateur AE",
    description: "Mentions légales du site Calculateur AE : éditeur, hébergeur, propriété intellectuelle et limitation de responsabilité.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Mentions légales</h1>
        <p className="text-sm text-slate-500">Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN).</p>
      </div>

      <Card>
        <SectionH2>Éditeur du site</SectionH2>
        <Prose>
          <p>Le site <strong>calculateur-autoentrepreneur.fr</strong> est édité à titre personnel par :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Nom ou raison sociale : <span className="italic text-slate-400">[Nom ou raison sociale à compléter]</span></li>
            <li>Statut : Particulier / Auto-entrepreneur</li>
            <li>Adresse : <span className="italic text-slate-400">[Adresse à compléter si nécessaire]</span></li>
            <li>Email : <span className="italic text-slate-400">[Email de contact à compléter]</span></li>
          </ul>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Responsable de publication</SectionH2>
        <Prose>
          <p>Le responsable de la publication est le même que l'éditeur du site.</p>
          <p>Contact : <span className="italic text-slate-400">[Email de contact à compléter]</span></p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Hébergement</SectionH2>
        <Prose>
          <p>Ce site est hébergé par :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Vercel Inc.</strong></li>
            <li>440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</li>
            <li>Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">vercel.com</a></li>
          </ul>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Propriété intellectuelle</SectionH2>
        <Prose>
          <p>L'ensemble du contenu de ce site (textes, calculs, mise en page, code) est la propriété exclusive de l'éditeur, sauf mention contraire.</p>
          <p>Toute reproduction, même partielle, est interdite sans autorisation préalable et écrite de l'éditeur.</p>
          <p>Les marques et logos éventuellement mentionnés sur ce site sont la propriété de leurs détenteurs respectifs.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Limitation de responsabilité</SectionH2>
        <Prose>
          <p>Les informations et résultats fournis par ce simulateur sont <strong>purement indicatifs</strong>. Ils ne constituent pas un conseil comptable, fiscal ou juridique.</p>
          <p>L'éditeur s'efforce de maintenir les taux utilisés à jour, mais ne garantit pas leur exactitude à tout moment. Les taux URSSAF, barèmes fiscaux et plafonds légaux peuvent évoluer. Il appartient à l'utilisateur de vérifier les informations auprès des sources officielles (urssaf.fr, impots.gouv.fr, service-public.fr).</p>
          <p>L'éditeur ne saurait être tenu responsable des décisions prises par l'utilisateur sur la base des résultats de ce simulateur.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Contact</SectionH2>
        <Prose>
          <p>Pour toute question relative à ces mentions légales, vous pouvez nous contacter :</p>
          <ul className="list-disc list-inside">
            <li>Par email : <span className="italic text-slate-400">[Email de contact à compléter]</span></li>
            <li>Via la <a href="/contact" className="text-indigo-600 underline">page de contact</a></li>
          </ul>
        </Prose>
      </Card>

      <p className="text-xs text-slate-400 text-center">Dernière mise à jour : mai 2026</p>
    </PageWrapper>
  );
}
