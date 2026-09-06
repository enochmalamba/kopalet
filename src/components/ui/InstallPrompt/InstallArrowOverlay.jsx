import { Box, Typography } from "@mui/material";

function InstallArrowOverlay({ onDismiss }) {
  return (
    <Box
      onClick={onDismiss}
      sx={{
        position: "fixed",
        inset: 0,
        bgcolor: "rgba(0,0,0,0.45)",
        zIndex: 1400,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        pt: { xs: 6, sm: 4 },
        pr: { xs: 4, sm: 6 },
      }}
    >
      <Box sx={{ textAlign: "right", color: "#fff", maxWidth: 220 }}>
        <svg
          width="80"
          height="100"
          viewBox="0 0 80 100"
          style={{ transform: "scaleX(-1)" }}
        >
          <path
            d="M10 90 C 10 40, 60 40, 65 10"
            stroke="#fff"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          <polygon points="65,0 58,18 72,16" fill="#fff" />
        </svg>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Tap "Install" in your browser's popup to finish
        </Typography>
      </Box>
    </Box>
  );
}
export default InstallArrowOverlay;
