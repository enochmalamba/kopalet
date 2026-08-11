import { Avatar, Box, Button } from "@mui/material";
import React from "react";
import "./AppHeader.css";
import { NavLink } from "react-router-dom";
import IconButton from "../../ui/IconButton/IconButton";

const navLinks = [
  {
    label: "Home",
    to: "/v2/home",
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

function AppHeader() {
  const actionButtons = [
    { icon: "search-outline", onClick: () => console.log("Search clicked") },
    {
      icon: "notifications-outline",
      onClick: () => console.log("Notifications clicked"),
    },
    { icon: "mail-outline", onClick: () => console.log("Mail clicked") },
  ];
  return (
    <header className="app_header">
      <Box
        sx={{
          display: "flex",
          height: "100%",
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-md)",
            cursor: "pointer",
          }}
        >
          <Box
            component={"img"}
            src="/logo.png"
            sx={{ height: "40px" }}
            alt="Kopalet logo | Find jobs online in Malawi"
          />
          <Box
            sx={{
              display: {
                xs: "none", // mobile
                sm: "none", // tablet
                md: "flex", // desktop
                lg: "flex", // wide
              },
            }}
            className="logo"
          >
            Kopalet
          </Box>
        </Box>
        <Box
          component={"nav"}
          sx={{
            display: {
              xs: "none", // mobile
              sm: "none", // tablet
              md: "flex", // desktop
              lg: "flex", // wide
            },
            gap: "var(--space-xxl)",
            alignItems: "center",
          }}
        >
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
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
            );
          })}
        </Box>
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
          <Avatar />
        </Box>
      </Box>
    </header>
  );
}

export default AppHeader;
