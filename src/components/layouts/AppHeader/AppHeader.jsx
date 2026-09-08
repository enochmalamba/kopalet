import { useSession } from "../../../context/sessionContext";
import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import { useState } from "react";
import "./AppHeader.css";
import { NavLink, Link } from "react-router-dom";
import IconButton from "../../ui/IconButton/IconButton";
import AvatarMenu from "../../AvatarMenu";
import MobileDrawer from "./MobileDrawer";
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
      <MobileDrawer
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        isAuthenticated={isAuthenticated}
      />

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

          <Box className="logo" component={Link} to={"/"}>
            Kopalet
          </Box>
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
            <Button
              size="small"
              variant="outlined"
              sx={{ display: { xs: "none", sm: "flex" } }}
              component={Link}
              to="/login"
            >
              Log in
            </Button>

            <Button
              size="small"
              variant="contained"
              component={Link}
              to="/signup"
            >
              {" "}
              Create account{" "}
            </Button>
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
