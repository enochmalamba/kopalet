import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import PostActions from "./PostActions";

const CommentCard = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "start", gap: "var(--space-xs)" }}>
      {" "}
      <Avatar src="/defaults/img.JPG" alt="Hello Sir" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-xs)",
        }}
      >
        <Box
          sx={{
            background: "var(--surface)",
            padding: "var(--space-sm)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <Typography variant="body2">Enoch Malamba</Typography>
          <Typography variant="body2" color="var(--muted)">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio ea
            eligendi dolores cum , placeat velit repellendus odit.
          </Typography>
        </Box>
        <PostActions />
      </Box>
    </Box>
  );
};

export default CommentCard;
