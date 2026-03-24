import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavMore from "./NavMore";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// Outlined Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import CasesOutlinedIcon from "@mui/icons-material/CasesOutlined";
import StoreMallDirectoryOutlinedIcon from "@mui/icons-material/StoreMallDirectoryOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

// Filled Icons
import HomeIcon from "@mui/icons-material/Home";

import CasesIcon from "@mui/icons-material/Work";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={page}
        onChange={(event, newPage) => {
          handleNavigation(event, newPage);
        }}
      >
        <BottomNavigationAction
          label="Home"
          value="home"
          icon={currentPath === "home" ? <HomeIcon /> : <HomeOutlinedIcon />}
        />
        {/* <BottomNavigationAction
          label="Communities"
          value="communities"
          icon={
            currentPath === "communities" ? (
              <BubbleChartIcon />
            ) : (
              <BubbleChartOutlinedIcon />
            )
          }
        /> */}
        <BottomNavigationAction
          label="Vacancies"
          value="vacancies"
          icon={
            currentPath === "vacancies" ? <CasesIcon /> : <CasesOutlinedIcon />
          }
        />
        <BottomNavigationAction
          label="Marketplace"
          value="marketplace"
          icon={
            currentPath === "marketplace" ? (
              <StoreMallDirectoryIcon />
            ) : (
              <StoreMallDirectoryOutlinedIcon />
            )
          }
        />
        <BottomNavigationAction
          label={isMoreOpen ? "Close" : "More"}
          value="more"
          icon={isMoreOpen ? <CloseOutlinedIcon /> : <MoreHorizOutlinedIcon />}
        />
      </BottomNavigation>
      <NavMore
        anchorMenu={anchorMenu}
        menuOpen={menuOpen}
        setAnchorMenu={handleMenuClose}
      />
    </Paper>
  );
}

export default BottomNav;
