import { PageWrapper, Card, SectionH2, Prose, BackLink, useSEO } from "../components/Layout";

export default function Confidentialite() {
  useSEO({
    title: "Politique de confidentialité — Calculateur AE",
    description: "Politique de confidentialité du site Calculateur AE : données collectées, cookies, Google AdSense, droits des utilisateurs.",
  });

  return (
    <PageWrapper>
      <BackLink />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-slate-500">Dernière mise à jour : mai 2026</p>
      </div>

      <Card>
        <SectionH2>Principe général</SectionH2>
        <Prose>
          <p>Le site <strong>calculateur-autoentrepreneur.fr</strong> est un outil de simulation fonctionnant entièrement côté client (dans votre navigateur). Nous attachons une importance particulière à la protection de votre vie privée.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Données saisies dans le calculateur</SectionH2>
        <Prose>
          <p><strong>Les données que vous saisissez dans le calculateur (chiffre d'affaires, type d'activité, frais, objectifs…) ne sont jamais transmises à un serveur.</strong></p>
          <p>Ces données restent exclusivement dans votre navigateur le temps de votre session et sont supprimées dès que vous fermez ou rechargez la page. Elles ne sont ni stockées, ni enregistrées, ni transmises à des tiers.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Cookies</SectionH2>
        <Prose>
          <p>Ce site peut utiliser des cookies dans les cas suivants :</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Cookies techniques</strong> : nécessaires au bon fonctionnement du site (session, préférences). Aucun consentement requis.</li>
            <li><strong>Cookies de mesure d'audience</strong> : si un outil d'analyse est activé (voir section ci-dessous).</li>
            <li><strong>Cookies publicitaires</strong> : si Google AdSense est activé (voir section ci-dessous).</li>
          </ul>
          <p>Vous pouvez à tout moment gérer ou supprimer les cookies via les paramètres de votre navigateur.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Mesure d'audience</SectionH2>
        <Prose>
          <p>Ce site peut utiliser <strong>Google Analytics</strong> ou un outil équivalent afin de mesurer le trafic et comprendre comment les visiteurs utilisent le site (pages vues, durée de session, provenance géographique approximative).</p>
          <p>Ces données sont collectées de manière agrégée et anonyme. Elles ne permettent pas d'identifier personnellement un utilisateur.</p>
          <p>Vous pouvez vous opposer à la collecte via le module complémentaire de désactivation de Google Analytics : <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">tools.google.com/dlpage/gaoptout</a>.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Google Search Console</SectionH2>
        <Prose>
          <p>Ce site utilise <strong>Google Search Console</strong> afin de suivre les performances du site dans les résultats de recherche Google (clics, impressions, position moyenne).</p>
          <p>Google Search Console ne collecte aucune donnée personnelle sur les visiteurs du site. Elle analyse uniquement les données de performance agrégées du site.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Publicité — Google AdSense (prévu)</SectionH2>
        <Prose>
          <p>Ce site est susceptible d'intégrer à l'avenir <strong>Google AdSense</strong> afin d'afficher des publicités. Google AdSense utilise des cookies pour personnaliser les annonces affichées en fonction de vos centres d'intérêt.</p>
          <p>En cas d'activation, un bandeau de consentement conforme au RGPD vous sera présenté. Vous pourrez accepter ou refuser les cookies publicitaires.</p>
          <p>Pour en savoir plus sur les pratiques de confidentialité de Google : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">policies.google.com/privacy</a>.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Liens externes</SectionH2>
        <Prose>
          <p>Ce site contient des liens vers des sites tiers (urssaf.fr, impots.gouv.fr, service-public.fr…). Ces sites ont leurs propres politiques de confidentialité, sur lesquelles nous n'avons aucun contrôle.</p>
          <p>Nous vous encourageons à consulter les politiques de confidentialité des sites que vous visitez.</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Durée de conservation</SectionH2>
        <Prose>
          <p>Aucune donnée personnelle n'est stockée par ce site. Les données de navigation agrégées collectées via les outils d'audience sont conservées selon les conditions propres à chaque outil (en général 14 à 26 mois pour Google Analytics).</p>
        </Prose>
      </Card>

      <Card>
        <SectionH2>Vos droits (RGPD)</SectionH2>
        <Prose>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679), vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Droit d'accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit à l'effacement (« droit à l'oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit d'opposition</li>
            <li>Droit à la portabilité des données</li>
          </ul>
          <p>Pour exercer vos droits ou pour toute question relative à la protection de vos données, contactez-nous :</p>
          <p>Email : <span className="italic text-slate-400">[Email de contact à compléter]</span></p>
          <p>Vous avez également le droit d'introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-indigo-600 underline">CNIL</a>.</p>
        </Prose>
      </Card>
    </PageWrapper>
  );
}
