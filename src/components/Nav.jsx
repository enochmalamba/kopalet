import { Link } from "react-router-dom";
import Icon from "./Icon";
import "./Nav.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link className="nav-link">
            <Icon>home</Icon>
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link">
            <Icon>bubble_chart</Icon>
            Communities
          </Link>
        </li>
        <li>
          <Link className="nav-link">
            <Icon>cases</Icon>
            Job Market
          </Link>
        </li>{" "}
        <li>
          <Link className="nav-link">
            <Icon>store</Icon>
            Marketplace
          </Link>
        </li>
      </ul>
      <div className="divider"></div>
      <ul>
        <li>
          <Link className="nav-link">
            <Icon>bookmark</Icon>
            Saved
          </Link>
        </li>
        <li>
          <Link className="nav-link">
            <Icon>folder_open</Icon>
            Resources
          </Link>
        </li>
      </ul>
      <div className="divider"></div>
      <ul>
        <li className="advertise-link">
          <Link className="nav-link">
            <Icon>campaign</Icon>
            Advertise
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
