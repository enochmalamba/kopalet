import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreateHandle from "./pages/CreateHandle.jsx";
import MailBox from "./pages/MailBox.jsx";
import Communities from "./pages/Communities.jsx";
import Vacancies from "./pages/Vacancies.jsx";
import Jobs from "./pages/Jobs.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";
import ProductView from "./pages/ProductView.jsx";
import VacancyView from "./pages/VacancyView.jsx";
import GeneralPostView from "./pages/GeneralPostView.jsx";
import Resources from "./pages/Resources.jsx";
import Saved from "./pages/Saved.jsx";

import "./App.css";
import "./assets/style/auth.css";
import { AppLayout } from "./components/layouts";

function App() {
  return (
    <>
      <Routes>
        {/* Pages that use AppLayout */}

        <Route path="/" element={<AppLayout />}>
          {" "}
          <Route path="create" element={<CreateHandle />} />
          <Route path="/" element={<Home />} />{" "}
          <Route path="communities" element={<Communities />} />
          <Route path="/home" element={<Home />} />{" "}
          <Route path="mailbox" element={<MailBox />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="vacancies" element={<Vacancies />} />
          <Route path="marketplace" element={<MarketPlace />} />{" "}
          <Route path="saved-items" element={<Saved />} />
          <Route path="marketplace/:id" element={<ProductView />} />{" "}
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="job/:id" element={<VacancyView />} />{" "}
          <Route path="resources" element={<Resources />} />
          <Route path="post/:id" element={<GeneralPostView />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
