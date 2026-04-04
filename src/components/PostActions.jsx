import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const formatCount = (num) => {
  if (!num) return 0;
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "k";
  return num;
};

export default function PostActions({
  initialVotes = 0,
  initialUserVote = 0, // -1, 0, 1
  comments = 0,
}) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);

  const handleUpvote = () => {
    if (userVote === 1) {
      // remove upvote
      setVotes((v) => v - 1);
      setUserVote(0);
    } else if (userVote === -1) {
      // switch from downvote to upvote
      setVotes((v) => v + 2);
      setUserVote(1);
    } else {
      // new upvote
      setVotes((v) => v + 1);
      setUserVote(1);
    }
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      // remove downvote
      setVotes((v) => v + 1);
      setUserVote(0);
    } else if (userVote === 1) {
      // switch from upvote to downvote
      setVotes((v) => v - 2);
      setUserVote(-1);
    } else {
      // new downvote
      setVotes((v) => v - 1);
      setUserVote(-1);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 1,
        py: 0.5,
      }}
    >
      {/* LEFT */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* VOTES */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
          <IconButton size="small" onClick={handleUpvote}>
            <ArrowUpwardIcon
              fontSize="small"
              sx={{
                color: userVote === 1 ? "orange" : "inherit",
              }}
            />
          </IconButton>

          <Typography variant="body2">{formatCount(votes)}</Typography>

          <IconButton size="small" onClick={handleDownvote}>
            <ArrowDownwardIcon
              fontSize="small"
              sx={{
                color: userVote === -1 ? "blue" : "inherit",
              }}
            />
          </IconButton>
        </Box>

        {/* COMMENTS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small">
            <ChatBubbleOutlineIcon fontSize="small" />
          </IconButton>
          <Typography variant="body2">{formatCount(comments)}</Typography>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton size="small">
          <ShareOutlinedIcon fontSize="small" />
        </IconButton>

        <IconButton size="small">
          <BookmarkBorderIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}
