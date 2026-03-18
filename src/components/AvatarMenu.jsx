import { useState } from "react";
import { useSession } from "../context/sessionContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import "./AvatarMenu.css";
import Icon from "./Icon";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AvatarMenu({ anchorMenu, menuOpen, setAnchorMenu }) {
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useSession();
  const navigate = useNavigate();
  const handleThemeClick = (mode) => {
    setTheme(mode);
    handleMenuClose();
  };

  const handleMenuClose = () => setAnchorMenu(null);
  const handleLogOutModalClose = () => setLogOutModalOpen(false);
  const handleLogOutModalOpen = () => {
    setLogOutModalOpen(true);
    handleMenuClose();
  };
  const handleLogout = () => {
    handleLogOutModalClose();
    logout();
  };
  return (
    <>
      <Menu
        anchorEl={anchorMenu}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        className="profile-menu-dropdown visible"
        slotProps={{
          paper: {
            style: {
              maxHeight: "none",
              width: "250px",
              padding: "none",
            },
          },
        }}
      >
        {isAuthenticated ? (
          <ul>
            <li onClick={handleMenuClose}>
              <Link className="nav-link">
                <Icon>person</Icon> {user.username}
              </Link>
            </li>
            <li onClick={handleMenuClose}>
              <Link className="nav-link">
                <Icon>docs</Icon> My Office
              </Link>
            </li>
            <li onClick={handleMenuClose}>
              <Link className="nav-link">
                <Icon>person_add</Icon> Invite others
              </Link>
            </li>
          </ul>
        ) : (
          <div className="avatar-menu-btns">
            <Button
              variant="contained"
              size="medium"
              onClick={() => navigate("/signup")}
            >
              Create account
            </Button>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
          </div>
        )}

        <div className="divider"></div>
        <ul>
          <li>
            {/* <div className="nav-link">
              <Icon>contrast</Icon>
              UI Mode
            </div> */}
            <div className="ui-select">
              <label htmlFor="device-ui-mode">
                <Icon>devices</Icon> System mode
                <input
                  type="radio"
                  name="ui-mode"
                  value={"device-ui-mode"}
                  id="device-ui-mode"
                  checked={theme === "system"}
                  onChange={() => handleThemeClick("system")}
                />
              </label>
              <label htmlFor="light-ui-mode">
                <Icon>wb_sunny</Icon> Light mode
                <input
                  type="radio"
                  name="ui-mode"
                  value={"light-ui-mode"}
                  id="light-ui-mode"
                  checked={theme === "light"}
                  onChange={() => handleThemeClick("light")}
                />
              </label>
              <label htmlFor="dark-ui-mode">
                <Icon>dark_mode</Icon> Dark mode
                <input
                  type="radio"
                  name="ui-mode"
                  value={"dark-ui-mode"}
                  id="dark-ui-mode"
                  checked={theme === "dark"}
                  onChange={() => handleThemeClick("dark")}
                />
              </label>
            </div>
          </li>
        </ul>

        {isAuthenticated && (
          <>
            <div className="divider"></div>
            <ul>
              <li onClick={handleMenuClose}>
                <Link className="nav-link">
                  <Icon>settings</Icon> Settings
                </Link>
              </li>
              <li onClick={handleLogOutModalOpen}>
                <p className="nav-link">
                  <Icon>logout</Icon> Logout
                </p>
              </li>
            </ul>
          </>
        )}
      </Menu>{" "}
      {/* logout confirmation modal  */}
      <Dialog
        open={logOutModalOpen}
        onClose={handleLogOutModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Logout of your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can always log back in at any time
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogOutModalClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleLogout} variant="contained" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AvatarMenu;
