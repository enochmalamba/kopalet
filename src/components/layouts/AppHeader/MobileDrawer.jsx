import { useSession } from "../../../context/sessionContext";
import { useTheme } from "../../../context/themeContext";
import { Drawer, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { authedMenuItems, unAuthedMenuItems } from "../sideMenuItems";
import IconMenuList from "../IconMenuList";
const MobileDrawer = ({ drawerOpen, toggleDrawer, isAuthenticated }) => {

    const {isAuthenticated} = useSession()
    const menuItems  = isAuthenticated ? authedMenuItems : unAuthedMenuItems
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
          >
            <Link to="/">
              <Box className="logo">Kopalet</Box>
            </Link>
            {/* close button */}
            <Box
              component="button"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                fontSize: "8px",
                alignItems: "center",
                background: "none",
                border: "none",
                outline: "none",
                mb: "var(--space-lg)",
              }}
              onClick={toggleDrawer(false)}
            >
              <ion-icon name="close-outline" style={{ fontSize: "30px" }} />
              Close
            </Box>
          </Box>
         <IconMenuList items={menuItems} 
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;
