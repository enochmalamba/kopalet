import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout.jsx";
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
import Settings from "./pages/settings/Settings.jsx";
import Profile from "./pages/profile/Profile.jsx";
import AccountSettings from "./pages/settings/AccountSettings.jsx";
import SecuritySettings from "./pages/settings/SecuritySettings.jsx";
import NotificationSettings from "./pages/settings/NotificationSettings.jsx";
import PrivacySettings from "./pages/settings/PrivacySettings.jsx";

import "./App.css";
import "./assets/style/auth.css";
import DetailLayout from "./components/layouts/DetailLayout.jsx";
import NarrowLayout from "./components/layouts/NarrowLayout.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* Pages that use MainLayout */}

        <Route path="/" element={<MainLayout />}>
          <Route path="create" element={<CreateHandle />} />
          <Route path="/" element={<Home />} />
          <Route path="communities" element={<Communities />} />
          <Route path="/home" element={<Home />} />
          <Route path="mailbox" element={<MailBox />} />
          <Route path="jobs" element={<Jobs />} />
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="saved-items" element={<Saved />} />
          <Route path="marketplace" element={<MarketPlace />} />
          <Route path="resources" element={<Resources />} />
        </Route>

        {/* detail pages for listings and other things where the side panels are still visible */}
        <Route path="/" element={<DetailLayout />}>
          <Route path="post/:id" element={<GeneralPostView />} />
          <Route path="job/:id" element={<VacancyView />} />
          <Route path="marketplace/:id" element={<ProductView />} />
          {/* profile : saved, profile edit, listings*/}
          <Route path="/profile" element={<Profile />}></Route>
        </Route>

        {/* narrow layout for pages that need the full width even on desktop */}
        <Route path="/" element={<NarrowLayout />}>
          {/* settings */}
          <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to="account" replace />} />
            <Route path="account" element={<AccountSettings />} />
            <Route path="security" element={<SecuritySettings />} />
            <Route path="notifications" element={<NotificationSettings />} />
            <Route path="privacy" element={<PrivacySettings />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
