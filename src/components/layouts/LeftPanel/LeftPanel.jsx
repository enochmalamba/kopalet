import { Save } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./LeftPanel.css";
const createPostOptions = [
  { label: "Sell an item", link: "/create#market-item" },
  { label: "Post a job", link: "/create#vacancy" },
  { label: "Share thoughts & tips       ", link: "/create#post" },
];

export const shortcutLinks = [
  { label: "Saved items", link: "/saved", icon: "bookmarks-outline" },
  { label: "Resources", link: "/resources", icon: "folder-open-outline" },
  { label: "Communities", link: "/communities", icon: "people-outline" },
];
function LeftPanel() {
  return (
    <Box
      component={"aside"}
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
        className="add-something-new-wrapper"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-md)",
          alignItems: "center",
          justifyContent: "center",

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
      <Divider />
      <Box
        component={"nav"}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
        }}
      >
        <Typography fontWeight={"bold"}>Shortcuts</Typography>
        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
          }}
        >
          {shortcutLinks.map((s) => (
            <Link to={s.link} className="left-panel-shortcut-link" key={s.link}>
              <ion-icon name={s.icon} style={{ fontSize: "25px" }} />
              <Typography
                sx={{
                  fontWeight: "inherit",
                }}
              >
                {s.label}
              </Typography>
            </Link>
          ))}
          <Divider sx={{ mt: "var(--space-md)" }} />
        </ul>
        <ul key="feedback-link">
          <Link to={"/feeback"} className="left-panel-shortcut-link">
            <ion-icon name="chatbox-ellipses-outline" />

            <Typography
              sx={{
                fontWeight: "inherit",
              }}
            >
              {" "}
              Feedback
            </Typography>
          </Link>
        </ul>
      </Box>
    </Box>
  );
}

export default LeftPanel;
