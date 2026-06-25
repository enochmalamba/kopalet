import { NavLink } from "react-router-dom";
import Icon from "./Icon";
import "./Nav.css";

function Nav({ isNavOpen }) {
  return (
    <nav className={`nav ${isNavOpen ? "visible" : ""}`}>
      <ul>
        <li>
          <NavLink to="/home" className="nav-link">
            <Icon>home</Icon>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/communities" className="nav-link">
            <Icon>bubble_chart</Icon>
            Communities
          </NavLink>
        </li>
        <li>
          <NavLink to="/vacancies" className="nav-link">
            <Icon>cases</Icon>
            Job Vacancies
          </NavLink>
        </li>{" "}
        <li>
          <NavLink to="/marketplace" className="nav-link">
            <Icon>store</Icon>
            Marketplace
          </NavLink>
        </li>
      </ul>
      <div className="divider"></div>
      <ul>
        <li>
          <NavLink to="/saved-items" className="nav-link">
            <Icon>bookmark</Icon>
            Saved
          </NavLink>
        </li>
        <li>
          <NavLink to="/resources" className="nav-link">
            <Icon>folder_open</Icon>
            Resources
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
