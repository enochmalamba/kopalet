import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateHandle from "./pages/CreateHandle";
import MailBox from "./pages/MailBox";
import "./App.css";
import "./assets/style/auth.css";
import "./assets/style/formelements.css";

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
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
