import { Box, Button, Typography } from "@mui/material";
import heroImage from "../../assets/hero.png";
import React from "react";

function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "var(--space-lg)",
        padding: "var(--space-md)",
        width: "100%",
        marginBottom: { xs: "var(--space-xl)", md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          flex: "1 1 300px",
          minWidth: 0,
          order: { xs: 2, md: 1 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textTransform: "capitalize" }}
          fontWeight={"var(--fw-bold)"}
        >
          Make connections <br />
          find jobs &amp; trade locally.
        </Typography>
        <Typography
          component="h2"
          fontSize={"var(--fs-lg)"}
          fontWeight={"var(--fw-regular)"}
          color="var(--text)"
          maxWidth={"400px"}
        >
          Build your network, explore new opportunities, and buy or sell
          products and services in one place.
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={"var(--space-md)"}
          maxWidth={"400px"}
        >
          <Button variant="contained" size="large" href="/signup">
            Create a free account
          </Button>
          <Button variant="outlined" size="large" href="/home">
            Continue as guest
          </Button>
        </Box>
      </Box>

      {/* Image */}
      <Box
        component="img"
        src={heroImage}
        alt="hero image"
        sx={{
          flex: "1 1 300px",
          width: "100%",
          maxWidth: "100%",
          objectFit: "cover",
          borderRadius: "var(--radius-lg)",
          order: { xs: 1, md: 2 },
        }}
      />
    </Box>
  );
}

export default Hero;
