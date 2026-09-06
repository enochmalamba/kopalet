import { Outlet } from "react-router-dom";

import React from "react";
import AppHeader from "./AppHeader/AppHeader";
import Box from "@mui/material/Box";

function NarrowLayout() {
  return (
    <>
      <AppHeader />
      <Box
        component={"main"}
        sx={{
          padding: "0 var(--screen-padding)",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default NarrowLayout;
