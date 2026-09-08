import { Box, Typography, Divider, Switch } from "@mui/material";
import { Link } from "react-router-dom";

const ICON_STYLE = { fontSize: "25px" };

// Renders an array of nav items using the unauthed-menu visual style.
// Items can be: { label, icon, to } | "divider" | "theme_switcher"
function IconMenuList({ items, theme, onThemeToggle }) {
  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-sm)",
        listStyle: "none",
        margin: 0,
        padding: 0,
      }}
    >
      {items.map((item, index) => {
        if (item === "divider") {
          return (
            <li key={`divider-${index}`}>
              <Divider />
            </li>
          );
        }

        if (item === "theme_switcher") {
          return (
            <li key="theme_switcher">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  padding: "var(--space-sm) var(--space-sm)",
                  minWidth: 0,
                }}
              >
                <ion-icon
                  name={theme === "dark" ? "moon" : "moon-outline"}
                  style={ICON_STYLE}
                />
                <Typography sx={{ flex: 1 }}>
                  Dark Mode: {theme === "dark" ? "On" : "Off"}
                </Typography>
                <Switch
                  size="small"
                  checked={theme === "dark"}
                  onChange={onThemeToggle}
                  inputProps={{ "aria-label": "Toggle dark mode" }}
                />
              </Box>
            </li>
          );
        }

        // Supports both `to` (current shape) and `link` (legacy shortcutLinks
        // shape) so I didn't have to touch every place that imports shortcutLinks.
        const destination = item.to || item.link;

        return (
          <li key={destination || `item-${index}`}>
            <Link to={destination}>
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--space-sm)",
                  padding: "var(--space-sm) var(--space-sm)",
                  minWidth: 0,
                }}
              >
                <ion-icon name={item.icon} style={ICON_STYLE} />
                <Typography>{item.label}</Typography>
              </Box>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default IconMenuList;
