import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import PostActions from "./PostActions";
import "./CommentCard.css";
const CommentCard = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "start", gap: "var(--space-xs)" }}>
      {" "}
      <div className="comment-card-avatar">
        <Avatar src="/defaults/img.JPG" alt="Hello Sir" />
      </div>
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
        <PostActions cardType="comment" />
        <Stack
          direction={"row"}
          alignItems={"center"}
          gap={"var(--space-xs)"}
          sx={{ cursor: "pointer" }}
        >
          <Avatar src="/xenon.jpg" sx={{ width: "25px", height: "25px" }} />{" "}
          <Typography variant="body2" fontWeight={"var(--fw-bold)"}>
            Xenon Malamba
          </Typography>
          <Typography variant="body2" color="var(--muted)">
            replied
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default CommentCard;
