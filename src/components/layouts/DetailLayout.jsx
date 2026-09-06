import Box from "@mui/material/Box";
import AppHeader from "./AppHeader/AppHeader";
import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import { Outlet } from "react-router-dom";

function DetailLayout() {
  return (
    <>
      <AppHeader />
      <Box
        component="main"
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
          component="section"
          sx={{
            flex: 1,
            minWidth: 0,
            margin: "var(--space-sm) auto",
            padding: " 0",
          }}
        >
          <Outlet />
        </Box>
        <RightPanel />
      </Box>
    </>
  );
}

export default DetailLayout;
