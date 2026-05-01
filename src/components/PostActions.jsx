import React from "react";
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
  handleVoteClick,
  userReactions,
  reactionsCount,
  onComment,
  onShare,
  onSave,
  onUpvote,
  onDownvote,
  cardType = "post",
  handleNavigate,
}) {
  const { upvotes = 0, downvotes = 0, comments = 0 } = reactionsCount || {};
  const { vote = 0, comment = false, saved = false } = userReactions || {};

  const votes = upvotes - downvotes;

  const getIconStyles = ({ isActive, activeBg, activeColor }) => ({
    borderRadius: "var(--radius-md)",
    padding: "var(--space-2xs)",
    transition: "background-color 0.15s ease, color 0.15s ease",

    backgroundColor: isActive ? activeBg : "transparent",

    "&:hover": {
      backgroundColor: isActive ? activeBg : "var(--hover-bg)",
    },

    "&:active": {
      backgroundColor: isActive ? activeBg : "var(--hover-bg)",
    },

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
            onClick={() => handleVoteClick(1)}
            sx={getIconStyles({
              isActive: vote === 1,
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
            onClick={() => handleVoteClick(-1)}
            sx={getIconStyles({
              isActive: vote === -1,
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
              isActive: comment,
              activeBg: "var(--info-bg)",
              activeColor: "var(--info)",
            })}
          >
            {comment ? (
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
                isActive: saved,
                activeBg: "var(--primary-bg)",
                activeColor: "var(--primary)",
              })}
            >
              {saved ? (
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
