import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function LeftPanel() {
  const createPostOptions = [
    { label: "List a product", link: "/create#market-item" },
    { label: "Post a job", link: "/create#vacancy" },
    { label: "Share thoughts & tips       ", link: "/create#post" },
  ];
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
          gap: "var(--space-md)",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--surface-alt)",
          padding: "var(--space-sm)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <Typography variant="h6" component="h2">
          Add something new
        </Typography>
        {createPostOptions.map((option, index) => (
          <Link
            to={option.link}
            key={index}
            style={{ display: "block", width: "100%" }}
          >
            {" "}
            <Button
              variant="outlined"
              key={index}
              sx={{
                borderRadius: "var(--radius-full)",
                borderBottom: "3px solid var(--text)",
                borderRight: "3px solid var(--text)",
                transition: "all 0.3s ease",
                ":hover": {
                  background: "var(--text)",
                  color: "var(--bg)",
                  borderColor: "var(--bg)",
                  opacity: 1,
                },
              }}
              fullWidth
            >
              {option.label}
            </Button>{" "}
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default LeftPanel;
