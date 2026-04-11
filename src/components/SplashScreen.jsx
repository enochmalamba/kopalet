import Box from "@mui/material/Box";
import "./SplashScreen.css";
function SplashScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: 1000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "var(--bg)",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Box
        alt="Kopalet wordmark"
        component={"img"}
        src="/wordmark_light.png"
        width="200px"
      />
      <div className="splash__screen__loading__bar"></div>
    </Box>
  );
}

export default SplashScreen;
