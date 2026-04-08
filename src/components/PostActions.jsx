import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { formatCount } from "../utils/format";

export default function PostActions({
  initialVotes = 0,
  initialUserVote = 0, // -1, 0, 1
  comments = 0,
  onComment,
  onShare,
  onSave,
  hasCommented = false,
  isSaved = false,
  cardType = "post",
  handleNavigate,
}) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);

  // ✅ Fix: sync props → state
  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  useEffect(() => {
    setUserVote(initialUserVote);
  }, [initialUserVote]);

  // ✅ Voting logic
  const handleUpvote = () => {
    if (userVote === 1) {
      setVotes((v) => v - 1);
      setUserVote(0);
    } else if (userVote === -1) {
      setVotes((v) => v + 2);
      setUserVote(1);
    } else {
      setVotes((v) => v + 1);
      setUserVote(1);
    }
  };

  const handleDownvote = () => {
    if (userVote === -1) {
      setVotes((v) => v + 1);
      setUserVote(0);
    } else if (userVote === 1) {
      setVotes((v) => v - 2);
      setUserVote(-1);
    } else {
      setVotes((v) => v - 1);
      setUserVote(-1);
    }
  };

  const getIconStyles = ({ isActive, activeBg, activeColor }) => ({
    borderRadius: "var(--radius-md)",
    padding: "var(--space-2xs)",
    transition: "background-color 0.15s ease, color 0.15s ease",

    // DEFAULT
    backgroundColor: isActive ? activeBg : "transparent",

    // HOVER
    "&:hover": {
      backgroundColor: isActive
        ? activeBg // keep SAME bg if already active
        : "var(--hover-bg)",
    },

    // CLICK (only meaningful when active)
    "&:active": {
      backgroundColor: isActive ? activeBg : "var(--hover-bg)", // prevent wrong flash
    },

    // ICON COLOR
    "& svg": {
      color: isActive ? activeColor : "inherit",
    },
  });

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
      <Box sx={iconContainerStyles}>
        {/* VOTES */}
        <Box sx={iconBoxStyles}>
          {/* UPVOTE */}
          <IconButton
            size="small"
            onClick={handleUpvote}
            sx={getIconStyles({
              isActive: userVote === 1,
              activeBg: "var(--primary-bg)",
              activeColor: "var(--primary)",
            })}
          >
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>

          {/* COUNT */}
          <Typography
            variant="body2"
            sx={{ color: "var(--muted)", fontWeight: "var(--fw-bold)" }}
          >
            {formatCount(Math.max(votes, 0))}
          </Typography>

          {/* DOWNVOTE */}
          <IconButton
            size="small"
            onClick={handleDownvote}
            sx={getIconStyles({
              isActive: userVote === -1,
              activeBg: "var(--danger-bg)",
              activeColor: "var(--danger)",
            })}
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* COMMENTS */}
        <Box sx={iconBoxStyles} onClick={handleNavigate}>
          <IconButton
            size="small"
            onClick={onComment}
            sx={getIconStyles({
              isActive: hasCommented, // boolean from your logic
              activeBg: "var(--info-bg)",
              activeColor: "var(--info)",
            })}
          >
            {hasCommented ? (
              <ChatBubbleIcon fontSize="small" />
            ) : (
              <ChatBubbleOutlineIcon fontSize="small" />
            )}
          </IconButton>

          <Typography
            variant="body2"
            sx={{ color: "var(--muted)", fontWeight: "var(--fw-bold)" }}
          >
            {formatCount(comments)}
          </Typography>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box sx={iconContainerStyles}>
        {cardType === "post" && (
          <>
            {" "}
            <IconButton
              size="small"
              onClick={onShare}
              sx={getIconStyles({
                isActive: false,
                activeBg: "transparent",
                activeColor: "inherit",
              })}
            >
              <ShareOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onSave}
              sx={getIconStyles({
                isActive: isSaved,
                activeBg: "var(--primary-bg)",
                activeColor: "var(--primary)",
              })}
            >
              {isSaved ? (
                <BookmarkIcon fontSize="small" />
              ) : (
                <BookmarkBorderIcon fontSize="small" />
              )}
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
}

const iconContainerStyles = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-sm)",
};

const iconBoxStyles = {
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2xs)",
};
