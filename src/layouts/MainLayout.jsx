import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "./MainLayout.css";
import Sidebar from "../components/Sidebar";
import BottomNav from "../components/BottomNav";

function MainLayout() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };
  // Close nav when route changes and scroll to top in section outlet
  const location = useLocation();
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsNavOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <Header handleNavClick={handleNavClick} isNavOpen={isNavOpen} />
      <main>
        <Nav isNavOpen={isNavOpen} />
        <section ref={scrollRef}>
          <Outlet />
        </section>
        <Sidebar />
      </main>{" "}
      <BottomNav />
    </>
  );
}

export default MainLayout;
