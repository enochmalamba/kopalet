// import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import "./ProfileDropMenu.css";
import Icon from "./Icon";

function ProfileDropMenu({ isDropDownOpen }) {
  // const menuRef = useRef(null);
  const { theme, setTheme, resolvedTheme } = useTheme();

  const handleThemeClick = (mode) => setTheme(mode);
  return (
    <div className={`profile-menu-dropdown ${isDropDownOpen ? "visible" : ""}`}>
      <ul>
        <li>
          <Link className="nav-link">
            <Icon>person</Icon> Profile
          </Link>
        </li>
        <li>
          <Link className="nav-link">
            <Icon>docs</Icon> Workspace
          </Link>
        </li>
        <li>
          <Link className="nav-link">
            <Icon>person_add</Icon> Invite others
          </Link>
        </li>
      </ul>
      <div className="divider"></div>
      <ul>
        <li>
          {/* <div className="nav-link">
            <Icon>contrast</Icon> 
            UI Mode
          </div> */}
          <div className="ui-select">
            <label
              htmlFor="device-ui-mode"
              onClick={() => handleThemeClick("system")}
            >
              <Icon>devices</Icon> System mode
              <input
                type="radio"
                name="ui-mode"
                value={"device-ui-mode"}
                id="device-ui-mode"
                checked={theme === "system"}
              />
            </label>
            <label
              htmlFor="light-ui-mode"
              onClick={() => handleThemeClick("light")}
            >
              <Icon>wb_sunny</Icon> Light mode
              <input
                type="radio"
                name="ui-mode"
                value={"light-ui-mode"}
                id="light-ui-mode"
                checked={theme === "light"}
              />
            </label>
            <label
              htmlFor="dark-ui-mode"
              onClick={() => handleThemeClick("dark")}
            >
              <Icon>dark_mode</Icon> Dark mode
              <input
                type="radio"
                name="ui-mode"
                value={"dark-ui-mode"}
                id="dark-ui-mode"
                checked={theme === "dark"}
              />
            </label>
          </div>
        </li>
      </ul>
      <div className="divider"></div>
      <ul>
        <li>
          <Link className="nav-link">
            <Icon>settings</Icon> Settings
          </Link>
        </li>
        <li>
          <p className="nav-link">
            <Icon>logout</Icon> Logout
          </p>
        </li>
      </ul>
    </div>
  );
}

export default ProfileDropMenu;
