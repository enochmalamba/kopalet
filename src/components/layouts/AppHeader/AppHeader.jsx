import { useSession } from "../../../context/sessionContext";
import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import "./AppHeader.css";
import { NavLink, Link } from "react-router-dom";
import IconButton from "../../ui/IconButton/IconButton";
import AvatarMenu from "../../AvatarMenu";
import { shortcutLinks } from "../LeftPanel/LeftPanel";
const navLinks = [
  {
    label: "Home",
    to: "/",
    outlinedIcon: "home-outline",
    filledIcon: "home",
  },
  {
    label: "Jobs",
    to: "/jobs",
    outlinedIcon: "briefcase-outline",
    filledIcon: "briefcase",
  },
  {
    label: "Marketplace",
    to: "/marketplace",
    outlinedIcon: "storefront-outline",
    filledIcon: "storefront",
  },
];

const actionButtons = [
  {
    icon: "search-outline",
    onClick: () => console.log("Search clicked"),
  },
  {
    icon: "mail-outline",
    onClick: () => console.log("Messages clicked"),
  },
];

const MobileDrawer = ({ drawerOpen, toggleDrawer }) => {
  return (
    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
      <Box
        sx={{
          width: 280,
          padding: "var(--space-lg)",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Link to="/">
              <Box className="logo">Kopalet</Box>
            </Link>
            {/* close button */}
            <Box
              component="button"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontSize: "8px",
                alignItems: "center",
                background: "none",
                border: "none",
                outline: "none",
                mb: "var(--space-lg)",
              }}
              onClick={toggleDrawer(false)}
            >
              <ion-icon name="close-outline" style={{ fontSize: "30px" }} />
              Close
            </Box>
          </Box>

          {shortcutLinks.map((s) => (
            <Link
              key={s.link}
              to={s.link}
              className="left-panel-shortcut-link"
              onClick={toggleDrawer(false)}
            >
              <ion-icon
                name={s.icon}
                style={{ fontSize: "25px", color: "var(--text)" }}
              />
              <Typography color="var(--text)">{s.label}</Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Drawer>
  );
};

function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const { isAuthenticated, user } = useSession();

  const menuOpen = Boolean(anchorMenu);

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const handleAvatarClick = (e) => {
    setAnchorMenu(e.currentTarget);
  };

  return (
    <header className="app_header">
      <MobileDrawer drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
            cursor: "pointer",
          }}
        >
          {/* Mobile menu button */}
          <Box
            component="button"
            sx={{
              height: "100%",
              display: {
                xs: "flex",
                sm: "flex",
                md: "none",
                lg: "none",
              },
              alignItems: "center",
              fontSize: "8px",
              flexDirection: "column",
              background: "none",
              border: "none",
              outline: "none",
            }}
            onClick={toggleDrawer(true)}
          >
            <ion-icon name="menu-outline" style={{ fontSize: "30px" }} />
            Menu
          </Box>

          <Link to="/">
            <Box className="logo">Kopalet</Box>
          </Link>
        </Box>

        {/* Desktop navigation */}
        <Box
          component="nav"
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "flex",
              lg: "flex",
            },
            gap: "var(--space-xxl)",
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav_link active" : "nav_link"
              }
            >
              {({ isActive }) => (
                <>
                  <ion-icon
                    name={isActive ? link.filledIcon : link.outlinedIcon}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </Box>

        {/* Right side */}
        {!isAuthenticated ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-sm)",
            }}
          >
            <Link to="/login">
              <Button size="small" variant="outlined">
                Log in
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button size="small" variant="contained">
                Create account
              </Button>
            </Link>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              gap: "var(--space-lg)",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
              }}
              className="nav_actions"
            >
              {actionButtons.map((button, index) => (
                <IconButton
                  key={index}
                  icon={button.icon}
                  onClick={button.onClick}
                />
              ))}
            </Box>
            <Box
              className="nav_actions"
              sx={{
                display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
              }}
            >
              <IconButton icon="mail-outline" />
            </Box>

            <div className="header-avatar">
              <Avatar
                src={isAuthenticated ? user.avatar_url : ""}
                alt={isAuthenticated ? user.username : ""}
                onClick={handleAvatarClick}
                sx={{
                  width: 35,
                  height: 35,
                  border: "1px solid var(--border)",
                }}
              />

              <AvatarMenu
                anchorMenu={anchorMenu}
                menuOpen={menuOpen}
                setAnchorMenu={setAnchorMenu}
              />
            </div>
          </Box>
        )}
      </Box>
    </header>
  );
}

export default AppHeader;
