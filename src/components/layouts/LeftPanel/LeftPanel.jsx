import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useSession } from "../../../context/sessionContext";
import { useTheme } from "../../../context/themeContext";

import "./LeftPanel.css";
import AddMoreCard from "./AddMoreCard";
import JoinKopaletCard from "./JoinKopaletCard";
import IconMenuList from "../IconMenuList";
import { authedMenuItems, unAuthedMenuItems } from "../sideMenuItems";

function LeftPanel() {
  const { isAuthenticated } = useSession();

  const { theme, setTheme } = useTheme();
  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const menuItems = isAuthenticated ? authedMenuItems : unAuthedMenuItems;

  return (
    <Box
      component={"aside"}
      sx={{
        width: "300px",
        padding: "var(--space-md)",

        display: {
          xs: "none", // mobile
          sm: "none", // tablet
          md: "flex", // desktop
          lg: "flex", // wide
        },

        flexDirection: "column",
        gap: "var(--space-xl)",
        position: "sticky",
        top: "var(--header-height)",
        height: "calc(100vh - var(--header-height))",
        overflowY: "auto",
        //thin scroll
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "var(--surface-alt)",
          borderRadius: "4px",
        },
      }}
    >
      {isAuthenticated ? <AddMoreCard /> : <JoinKopaletCard />}

      <Divider />

      <IconMenuList
        items={menuItems}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
    </Box>
  );
}

export default LeftPanel;
