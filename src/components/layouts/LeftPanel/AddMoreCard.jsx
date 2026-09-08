import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
const createPostOptions = [
  { label: "Sell an item", link: "/create#market-item" },
  { label: "Post a job", link: "/create#vacancy" },
  { label: "Share thoughts & tips       ", link: "/create#post" },
];
function AddMoreCard() {
  return (
    <Box
      className="animated-border-gradient"
      sx={{
        display: "flex",
        flexShrink: 0,
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
  );
}

export default AddMoreCard;
