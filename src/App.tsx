import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import CreateHandle from "./pages/CreateHandle.jsx";
import MailBox from "./pages/MailBox.jsx";
import Communities from "./pages/Communities.jsx";
import Vacancies from "./pages/Vacancies.jsx";
import MarketPlace from "./pages/MarketPlace.jsx";

import "./App.css";
import "./assets/style/auth.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<CreateHandle />} />
            <Route path="/mailbox" element={<MailBox />} />
            <Route path="/communities" element={<Communities />} />
            <Route path="/vacancies" element={<Vacancies />} />
            <Route path="/marketplace" element={<MarketPlace />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
