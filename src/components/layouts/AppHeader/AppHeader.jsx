import { Avatar, Box, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import "./AppHeader.css";
import { NavLink, Link } from "react-router-dom";
import IconButton from "../../ui/IconButton/IconButton";
import AvatarMenu from "../../AvatarMenu";

const navLinks = [
  {
    label: "Home",
    to: "/home",
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

const shortcutLinks = [
  {
    label: "Saved",
    link: "/saved",
    icon: "bookmark-outline",
  },
  {
    label: "Resources",
    link: "/resources",
    icon: "document-text-outline",
  },
  {
    label: "My Applications",
    link: "/applications",
    icon: "paper-plane-outline",
  },
];

const actionButtons = [
  {
    icon: "search-outline",
    onClick: () => console.log("Search clicked"),
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
          {shortcutLinks.map((s) => (
            <Link
              key={s.link}
              to={s.link}
              className="left-panel-shortcut-link"
              onClick={toggleDrawer(false)}
            >
              <ion-icon name={s.icon} style={{ fontSize: "20px" }} />
              <Typography>{s.label}</Typography>
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
            }}
            onClick={toggleDrawer(true)}
          >
            <ion-icon name="menu-outline" style={{ fontSize: "30px" }} />
          </Box>

          <Link to="/">
            <Box className="logo">kopalet</Box>
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
        <Box
          sx={{
            display: "flex",
            gap: "var(--space-lg)",
            alignItems: "center",
          }}
        >
          <Box className="nav_actions">
            {actionButtons.map((button, index) => (
              <IconButton
                key={index}
                icon={button.icon}
                onClick={button.onClick}
              />
            ))}
          </Box>

          <div className="header-avatar">
            <Avatar
              src="/user-icon.jpg"
              onClick={handleAvatarClick}
              sx={{
                width: 30,
                height: 30,
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
      </Box>
    </header>
  );
}

export default AppHeader;
