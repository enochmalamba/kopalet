import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader/AppHeader";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import BottomNav from "./../BottomNav";

function MainLayout() {
  return (
    <>
      <AppHeader />
      <Box
        component={"main"}
        sx={{
          width: "100%",
          padding: "0 var(--screen-padding)",
          display: "flex",
          gap: "var(--space-md)",
          position: "relative",
        }}
      >
        <LeftPanel />
        <Box
          component={"section"}
          sx={{
            flex: 1,
            minWidth: 0,

            margin: "var(--space-md) auto",
            padding: "var(--space-md) 0",
          }}
        >
          <Outlet />
        </Box>
        <RightPanel />
      </Box>
      <BottomNav />
    </>
  );
}

export default MainLayout;
