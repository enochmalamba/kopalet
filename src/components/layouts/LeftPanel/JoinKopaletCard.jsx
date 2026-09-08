import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function JoinKopaletCard() {
  return (
    <Box
      className="animated-border-gradient"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,

        padding: "var(--space-sm)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" component="h2">
        Join Kopalet
      </Typography>
      <Typography variant="body2" component="p">
        Find jobs, sell in the marketplace, and get notified about new
        opportunities near you.
      </Typography>
      <Button
        variant="contained"
        sx={{
          borderRadius: "var(--radius-full)",
        }}
        component={Link}
        to="/signup"
        fullWidth
      >
        Create account
      </Button>
      <Button
        variant="outlined"
        sx={{
          borderRadius: "var(--radius-full)",
        }}
        component={Link}
        to="/login"
        fullWidth
      >
        Log in
      </Button>
    </Box>
  );
}

export default JoinKopaletCard;
