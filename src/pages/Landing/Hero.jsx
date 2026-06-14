import { Box, Button, Typography } from "@mui/material";
import heroImage from "../../assets/hero.webp";
import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        alignItems: "center",
        gap: "var(--space-lg)",
        padding: "var(--space-md)",
        width: "100%",
        marginBottom: { xs: "var(--space-xl)", md: 0 },
      }}
    >
      {/* Text */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          flex: { xs: "1 1 auto", md: "0 0 calc(50% - var(--space-lg) / 2)" },
          minWidth: 0,
          order: { xs: 2, md: 1 },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ textTransform: "none" }}
          fontWeight={"var(--fw-bold)"}
        >
          Find Jobs, Scholarships <br />
          &amp; Deals in Malawi
        </Typography>

        <Typography
          component="h2"
          fontSize={"var(--fs-lg)"}
          fontWeight={"var(--fw-regular)"}
          color="var(--text)"
          maxWidth={"400px"}
        >
          One place to find work, apply for scholarships, and buy or sell in
          your community for free.
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          gap={"var(--space-md)"}
          maxWidth={"400px"}
        >
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button variant="contained" size="large" fullWidth>
              Create a free account
            </Button>
          </Link>

          <Link to="/home" style={{ textDecoration: "none" }}>
            <Button variant="outlined" size="large" fullWidth>
              Continue without an account
            </Button>
          </Link>
        </Box>
      </Box>

      {/* Image */}
      <Box
        component="img"
        src={heroImage}
        alt="hero image"
        sx={{
          flex: { xs: "1 1 auto", md: "0 0 calc(50% - var(--space-lg) / 2)" },
          width: "100%",
          maxWidth: { xs: "auto", md: "500px" },
          height: "auto",
          objectFit: "cover",
          borderRadius: "var(--radius-lg)",
          order: { xs: 1, md: 2 },
        }}
      />
    </Box>
  );
}

export default Hero;
