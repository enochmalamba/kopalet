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
      <div className="divider"></div>
      <ul>
        <li className="advertise-link">
          <NavLink to="/advertise" className="nav-link">
            <Icon>campaign</Icon>
            Advertise
          </NavLink>
        </li>
      </ul>
      <div className="divider"></div>
      <div className="nav-footer">
        <div>
          {" "}
          <a href="/" target="_blank" className="nav-footer-link">
            How Kopalet works <Icon>open_in_new</Icon>
          </a>
          <a href="/" className="nav-footer-link" target="blank">
            Privacy <Icon>open_in_new</Icon>
          </a>
          <a href="/" className="nav-footer-link" target="blank">
            Terms <Icon>open_in_new</Icon>
          </a>
          <a href="/" className="nav-footer-link" target="blank">
            About <Icon>open_in_new</Icon>
          </a>
          {/* <a href="/" className="nav-footer-link" target="blank">
            Help <Icon>open_in_new</Icon>
          </a> */}
          <a href="/" target="_blank" className="nav-footer-link">
            Contact us <Icon>open_in_new</Icon>
          </a>
          <a href="/" target="_blank" className="nav-footer-link">
            Press <Icon>open_in_new</Icon>
          </a>
        </div>
        <p>&copy; 2025 Kopalet</p>
      </div>
    </nav>
  );
}

export default Nav;
