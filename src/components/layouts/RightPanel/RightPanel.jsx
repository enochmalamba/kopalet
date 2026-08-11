import { Box, Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function RightPanel() {
  const ad = {
    phoneNumber: "265883698966",
    message:
      "Hello, how much do you charge for professional CVs' and/or cover letters?",
    imgSrc: "https://media.kopalet.com/static/ads/cv-and-cover-letter-ad.webp",
    altText: "Professional CV and Cover Letter Services",

    // Dynamic link generation using encodeURIComponent
    get goToLink() {
      return `https://wa.me/${this.phoneNumber}?text=${encodeURIComponent(this.message)}`;
    },
  };
  return (
    <Box
      sx={{
        width: "300px",
        padding: "var(--space-md)",

        display: {
          xs: "none", // mobile
          sm: "none", // tablet
          md: "flex", // desktop
          lg: "flex", // wide
        },

        flexDirection: "column",
        gap: "var(--space-xl)",
        position: "sticky",
        top: "var(--header-height)",
        height: "calc(100vh - var(--header-height))",
        overflowY: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",

          overflowX: "hidden",
          height: "100%",
        }}
      >
        <Box
          component="a"
          href={ad.goToLink}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ display: "block", height: "100%" }}
        >
          <Box
            component="img"
            src={ad.imgSrc}
            alt={ad.altText}
            sx={{
              width: "100%",
              height: "90%",
              objectFit: "cover",
              objectPosition: "left",
              borderRadius: "var(--radius-lg)",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default RightPanel;
