import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Nav from "../components/Nav";
import "./MainLayout.css";
import Sidebar from "../components/Sidebar";

function MainLayout() {
  return (
    <>
      <Header />
      <main>
        <Nav />
        <section>
          <Outlet />
        </section>
        <Sidebar />
      </main>
    </>
  );
}

export default MainLayout;
