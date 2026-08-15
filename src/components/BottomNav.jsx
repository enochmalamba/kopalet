import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavMore from "./NavMore";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// Outlined Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import MenuIcon from "@mui/icons-material/Menu";

// Filled Icons
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import CasesIcon from "@mui/icons-material/Work";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

function BottomNav() {
  const [page, setPage] = useState("home");
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [anchorMenu, setAnchorMenu] = useState(null);
  const menuOpen = Boolean(anchorMenu);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname.slice(1);
  const handleMenuOpen = (event) => {
    setAnchorMenu(event.currentTarget);
  };
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

  const handleMenuClose = () => {
    setAnchorMenu(null);
    setIsMoreOpen(false);
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
          // height: "60px",
        }}
        className="bottom_nav" //styled in index.css
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={
            <ion-icon
              name={currentPath === "home" ? "home" : "home-outline"}
            ></ion-icon>
          }
        />

        <BottomNavigationAction
          label="Vacancies"
          value="vacancies"
          icon={
            <ion-icon
              name={
                currentPath === "vacancies" ? "briefcase" : "briefcase-outline"
              }
            ></ion-icon>
          }
        />

        <BottomNavigationAction
          label="Create"
          value="create"
          icon={
            currentPath === "create" ? <AddBoxIcon /> : <AddBoxOutlinedIcon />
          }
        />

        <BottomNavigationAction
          label="Marketplace"
          value="marketplace"
          icon={
            <ion-icon
              name={
                currentPath === "marketplace"
                  ? "storefront"
                  : "storefront-outline"
              }
            ></ion-icon>
          }
        />

        <BottomNavigationAction
          label="Search"
          value="search"
          icon={
            <ion-icon
              name={currentPath === "search" ? "search" : "search-outline"}
            ></ion-icon>
          }
        />

        {/* <BottomNavigationAction
          label={isMoreOpen ? "Close" : "More"}
          value="more"
          icon={
            <ion-icon
              name={isMoreOpen ? "close-outline" : "menu-outline"}
            ></ion-icon>
          }
        /> */}
      </BottomNavigation>
      {/* this has ben replaced by the search link, if needed uncomment and remove the search with the menu (cant have both together) */}
      {/* <NavMore
        anchorMenu={anchorMenu}
        menuOpen={menuOpen}
        setAnchorMenu={handleMenuClose}
      /> */}
    </Paper>
  );
}

export default BottomNav;
