import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import defaultIllustration from "../assets/images/development1.svg";

export default function UnderDevelopment({
  page,
  message,
  illustration = defaultIllustration,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-md)",
        color: "var(--muted)",
        textAlign: "center",
        px: "var(--space-lg)",
      }}
    >
      <Box
        component="img"
        src={illustration}
        alt="Under development"
        sx={{ width: "100%", maxWidth: 300, height: "auto" }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "var(--text)", fontWeight: "var(--fw-bold)" }}
        >
          {page ? `${page} is coming soon` : "This page is under development"}
        </Typography>
        <Typography variant="body2">
          {message || "We're working on it. Check back later."}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "var(--space-sm)" }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go back
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/home", { replace: true })}
        >
          Go to home
        </Button>
      </Box>
    </Box>
  );
}
