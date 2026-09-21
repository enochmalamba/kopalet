import { useSession } from "../../../context/sessionContext";
import { useTheme } from "../../../context/themeContext";
import { Drawer, Box, Typography, Button } from "@mui/material";
import IonIcon from "@reacticons/ionicons";
import { Link } from "react-router-dom";
import { authedMenuItems, unAuthedMenuItems } from "../sideMenuItems";
import IconMenuList from "../IconMenuList";

const MobileDrawer = ({ drawerOpen, toggleDrawer }) => {
  const { isAuthenticated } = useSession();
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const menuItems = isAuthenticated ? authedMenuItems : unAuthedMenuItems;
  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      component={"nav"}
    >
      <Box
        sx={{
          width: 280,
          padding: "var(--space-lg)",
          height: "100%",
          boxSizing: "border-box",
        }}
        role="presentation"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Box className="logo">Kopalet</Box>

            {/* close button */}
            <Box
              component="button"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "none",
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
              onClick={toggleDrawer(false)}
            >
              <IonIcon name="close-outline" size="large" />
              <span style={{ fontSize: "8px" }}>Close</span>
            </Box>
          </Box>
          <IconMenuList
            items={menuItems}
            theme={theme}
            onThemeToggle={handleThemeToggle}
          />

          {!isAuthenticated && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-md)",
                marginTop: "auto",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/signup"
              >
                Create account
              </Button>
              <Button fullWidth variant="outlined" component={Link} to="/login">
                Log in
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
