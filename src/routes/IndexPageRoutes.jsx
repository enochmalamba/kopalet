import { Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Landing from "../pages/Landing.jsx";
import CreateHandle from "../pages/CreateHandle";
import MailBox from "../pages/MailBox";
import Communities from "../pages/Communities";
import Vacancies from "../pages/Vacancies";
import MarketPlace from "../pages/MarketPlace";
function IndexPageRoutes() {
  return (
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateHandle />} />
      <Route path="/mailbox" element={<MailBox />} />
      <Route path="/communities" element={<Communities />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/marketplace" element={<MarketPlace />} />
    </Route>
  );
}

export default IndexPageRoutes;
