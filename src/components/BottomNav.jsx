import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import IonIcon from "@reacticons/ionicons";

function BottomNav() {
  const [page, setPage] = useState("home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.slice(1);
  const iconStyles = (pathToCheck) => {
    return {
      background: currentPath === pathToCheck ? "var(--primary-bg) " : "none",
      padding: "2px 8px",
      borderRadius: "var(--radius-md)",
    };
  };
  const handleMenuOpen = (event) => {};
  const handleNavigation = (event, newPage) => {
    setIsMoreOpen(false);
    if (newPage === "more") {
      handleMenuOpen(event);
      setIsMoreOpen(!isMoreOpen);
      return;
    }
    setPage(newPage);

    navigate(`/${newPage}`);
  };

  return (
    <Paper
      sx={{
        display: {
          xs: "block", // mobile
          sm: "block", // tablet
          md: "none", // desktop
          lg: "none", // wide
        },

        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={page}
        onChange={(event, newPage) => {
          handleNavigation(event, newPage);
        }}
        sx={{
          borderTop: "1px solid var(--border)",
        }}
        className="bottom_nav" //styled in index.css
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={
            <IonIcon
              style={iconStyles("home")}
              size="large"
              name="home-outline"
            ></IonIcon>
          }
        />

        <BottomNavigationAction
          label="Jobs"
          value="jobs"
          icon={
            <IonIcon
              style={iconStyles("jobs")}
              size="large"
              name="briefcase-outline"
            ></IonIcon>
          }
        />
        <BottomNavigationAction
          label="Create"
          value="create"
          icon={
            <IonIcon
              style={iconStyles("create")}
              size="large"
              name="add-circle-outline"
            ></IonIcon>
          }
        />
        <BottomNavigationAction
          label="Marketplace"
          value="marketplace"
          icon={
            <IonIcon
              style={iconStyles("marketplace")}
              size="large"
              name="storefront-outline"
            ></IonIcon>
          }
        />
        <BottomNavigationAction
          label="Search"
          value="search"
          icon={
            <IonIcon
              style={iconStyles("search")}
              size="large"
              name="search-outline"
            ></IonIcon>
          }
        />
      </BottomNavigation>
    </Paper>
  );
}

export default BottomNav;
