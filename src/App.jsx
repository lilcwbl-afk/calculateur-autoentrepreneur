import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home             from "./pages/Home";
import MentionsLegales  from "./pages/MentionsLegales";
import Confidentialite  from "./pages/Confidentialite";
import Contact          from "./pages/Contact";
import Gagner2000Net    from "./pages/Gagner2000Net";
import Gagner3000Net    from "./pages/Gagner3000Net";
import ProfessionLiberale from "./pages/ProfessionLiberale";
import PrestationService  from "./pages/PrestationService";
import CalculTJM        from "./pages/CalculTJM";
import NotFound         from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Légales */}
        <Route path="/mentions-legales"  element={<MentionsLegales />} />
        <Route path="/confidentialite"   element={<Confidentialite />} />
        <Route path="/contact"           element={<Contact />} />

        {/* Pages satellites SEO */}
        <Route path="/auto-entrepreneur-combien-pour-gagner-2000-net"   element={<Gagner2000Net />} />
        <Route path="/auto-entrepreneur-combien-pour-gagner-3000-net"   element={<Gagner3000Net />} />
        <Route path="/charges-auto-entrepreneur-profession-liberale"    element={<ProfessionLiberale />} />
        <Route path="/charges-auto-entrepreneur-prestation-service"     element={<PrestationService />} />
        <Route path="/calcul-tjm-freelance-auto-entrepreneur"           element={<CalculTJM />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
