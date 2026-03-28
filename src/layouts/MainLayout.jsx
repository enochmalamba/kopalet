import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "./MainLayout.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";
import PageFilters from "../components/PageFilters";
function MainLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <Header handleNavClick={handleNavClick} isNavOpen={isNavOpen} />
      <main>
        <Nav isNavOpen={isNavOpen} />
        <section>
          <Outlet />
        </section>
        <Sidebar />
      </main>{" "}
      <BottomNav />
    </>
  );
}

export default MainLayout;
