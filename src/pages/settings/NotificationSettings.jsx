import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function NotificationSettings() {
  return (
    <Box>
      <Box
        sx={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--border-color, #ececec)",
        }}
      >
        <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
          Notification
        </Typography>
        <Typography
          sx={{ fontSize: "12.5px", color: "var(--text-secondary, #5c5c5c)" }}
        >
          Basic Notification details used to identify you on Kopalet.
        </Typography>
      </Box>
      <Box sx={{ padding: "20px 24px" }}>
        {/* field rows go here — email, phone, same pattern as the artifact */}
      </Box>
    </Box>
  );
}

export default NotificationSettings;
