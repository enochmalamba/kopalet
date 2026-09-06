import { useState } from "react";
import { useSession } from "../context/sessionContext";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/themeContext";
import Menu from "@mui/material/Menu";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

const ICON_STYLE = { fontSize: "25px" };

const authedMenuItems = [
  {
    label: "My Posts/Listings",
    icon: "briefcase-outline",
    to: "/my-listings",
  },
  {
    label: "Saved items",
    icon: "bookmark-outline",
    to: "/saved",
  },
  "divider",
  {
    label: "Settings",
    icon: "settings-outline",
    to: "/settings",
  },
  "divider",
  {
    label: "Help & Support",
    icon: "help-circle-outline",
    to: "/help",
  },
  {
    label: "Report a problem",
    icon: "alert-circle-outline",
    to: "/report-a-problem",
  },
  "divider",
  "theme_switcher",
  "divider",
  {
    label: "Logout",
    icon: "log-out-outline",
    action: "logout",
  },
];

const unAuthedMenuItems = [
  {
    label: "Browse Jobs",
    icon: "briefcase-outline",
    to: "/jobs",
  },
  {
    label: "Browse Marketplace",
    icon: "storefront-outline",
    to: "/marketplace",
  },
  "divider",
  {
    label: "Help & Support",
    icon: "help-circle-outline",
    to: "/help",
  },
  {
    label: "Report a problem",
    icon: "alert-circle-outline",
    to: "/report-a-problem",
  },
  "divider",
  "theme_switcher",
];

function AvatarMenu({ anchorMenu, menuOpen, setAnchorMenu }) {
  const [logOutModalOpen, setLogOutModalOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, logout } = useSession();

  const navigate = useNavigate();

  const handleMenuClose = () => setAnchorMenu(null);
  const handleLogOutModalClose = () => setLogOutModalOpen(false);
  const handleLogOutModalOpen = () => {
    setLogOutModalOpen(true);
    handleMenuClose();
  };
  const handleLogout = () => {
    handleLogOutModalClose();
    // logout();
    navigate("/");
  };

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    // menu stays open intentionally — user may want to toggle back and forth
  };

  const handleNavigate = (path) => {
    handleMenuClose();
    navigate(path);
  };

  const menuItems = isAuthenticated ? authedMenuItems : unAuthedMenuItems;

  return (
    <>
      <Menu
        anchorEl={anchorMenu}
        open={menuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        className="profile-menu-dropdown"
        slotProps={{
          paper: {
            style: {
              maxHeight: "none",
              width: "250px",
              padding: "none",
              borderRadius: "var(--radius-md)",
            },
          },
        }}
      >
        {isAuthenticated ? (
          <>
            <ul>
              <li>
                <Link to="/profile" onClick={handleMenuClose}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "var(--space-sm)",
                      padding: "var(--space-sm) var(--space-sm)",
                    }}
                  >
                    <Avatar src={user.avatar_url} />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                      }}
                    >
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ fontWeight: "var(--fw-semibold)" }}
                      >
                        {user.username}
                      </Typography>
                      <Typography variant="caption" noWrap>
                        {user.email}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: "var(--fw-semibold)",
                          color: "var(--info)",
                          fontSize: "10px",
                          letterSpacing: "0.03em",
                        }}
                      >
                        View profile
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </li>
            </ul>
            <Divider />
          </>
        ) : (
          <>
            <Box
              sx={{
                padding: "var(--space-sm) var(--space-sm)",
              }}
            >
              <Typography
                variant="body2"
                sx={{ fontWeight: "var(--fw-semibold)", mb: "2px" }}
              >
                You're not logged in
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", mb: "var(--space-sm)" }}
              >
                Log in to post jobs, save listings, and apply to opportunities
                on Kopalet.
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleNavigate("/signup")}
                sx={{ mb: "8px" }}
              >
                Create Account
              </Button>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleNavigate("/login")}
              >
                Log In
              </Button>
            </Box>
            <Divider />
          </>
        )}

        <ul>
          {menuItems.map((item, index) => {
            if (item === "divider") {
              return <Divider key={`divider-${index}`} />;
            }

            if (item === "theme_switcher") {
              return (
                <li key="theme_switcher">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "var(--space-sm)",
                      padding: "var(--space-sm) var(--space-sm)",
                      minWidth: 0,
                    }}
                  >
                    <ion-icon
                      name={theme === "dark" ? "moon" : "moon-outline"}
                      style={ICON_STYLE}
                    />
                    <Typography sx={{ flex: 1 }}>
                      Dark Mode: {theme === "dark" ? "On" : "Off"}
                    </Typography>
                    <Switch
                      size="small"
                      checked={theme === "dark"}
                      onChange={handleThemeToggle}
                      inputProps={{ "aria-label": "Toggle dark mode" }}
                    />
                  </Box>
                </li>
              );
            }

            if (item.action === "logout") {
              return (
                <li key={`item-${index}`}>
                  <Box
                    onClick={handleLogOutModalOpen}
                    sx={{
                      display: "flex",
                      gap: "var(--space-sm)",
                      padding: "var(--space-sm) var(--space-sm)",
                      minWidth: 0,
                      cursor: "pointer",
                      color: "var(--color-danger, #CE1126)",
                    }}
                  >
                    <ion-icon name={item.icon} style={ICON_STYLE} />
                    <Typography sx={{ color: "inherit" }}>
                      {item.label}
                    </Typography>
                  </Box>
                </li>
              );
            }

            return (
              <li key={`item-${index}`}>
                <Link to={item.to} onClick={handleMenuClose}>
                  <Box
                    sx={{
                      display: "flex",
                      gap: "var(--space-sm)",
                      padding: "var(--space-sm) var(--space-sm)",
                      minWidth: 0,
                    }}
                  >
                    <ion-icon name={item.icon} style={ICON_STYLE} />
                    <Typography>{item.label}</Typography>
                  </Box>
                </Link>
              </li>
            );
          })}
        </ul>
      </Menu>

      {/* logout confirmation modal */}
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
