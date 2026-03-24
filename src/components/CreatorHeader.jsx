import { useSession } from "../context/sessionContext";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

// function CreatorHeader({ AnonSwitch = true, setIsAnonymous = null }) {
function CreatorHeader() {
  const { user, isAuthenticated } = useSession();
  return (
    <Box sx={{ display: "flex", alignItems: "top", gap: "var(--space-sm)" }}>
      <Avatar
        src={isAuthenticated ? user.avatar : "/src/assets/user.jpeg"}
        alt={isAuthenticated ? user.username : "Profile"}
        sx={{ width: 24, height: 24 }}
      />
      <h4 style={{ fontSize: "var(--fs-sm)" }}>
        {isAuthenticated ? user.username : "Guest"}
      </h4>
    </Box>
  );
}

export default CreatorHeader;
