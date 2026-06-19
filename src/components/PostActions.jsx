import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { formatCount } from "../utils/format";
import { useSession } from "../context/sessionContext";

export default function PostActions({
  handleVoteClick,
  userReactions,
  reactionsCount,
  onComment,
  onShare,
  onSave,
  cardType = "post",
  handleNavigate,
}) {
  const { requireAuth } = useSession();

  const { upvotes = 0, downvotes = 0, comments = 0 } = reactionsCount || {};

  const { vote = 0, comment = false, saved = false } = userReactions || {};

  const votes = upvotes - downvotes;

  const getButtonStyles = ({ isActive, activeBg, activeColor }) => ({
    color: isActive ? activeColor : "var(--text)",
    backgroundColor: isActive ? activeBg : "transparent",
    textTransform: "none",
    minWidth: "unset",
    px: 1.25,
    py: 0.75,
    gap: 0.5,

    "&:hover": {
      backgroundColor: isActive ? activeBg : "var(--hover-bg)",
    },

    "& .MuiSvgIcon-root": {
      color: isActive ? activeColor : "inherit",
      fontSize: "1.1rem",
    },
  });

  const groupStyles = {
    borderRadius: "9999px",

    "& .MuiButtonGroup-firstButton": {
      borderTopLeftRadius: "9999px",
      borderBottomLeftRadius: "9999px",
    },

    "& .MuiButtonGroup-lastButton": {
      borderTopRightRadius: "9999px",
      borderBottomRightRadius: "9999px",
    },

    "& .MuiButtonGroup-grouped": {
      borderColor: "var(--border)",
    },
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
      <Box sx={iconContainerStyles}>
        {/* VOTES */}
        <ButtonGroup variant="outlined" disableElevation sx={groupStyles}>
          <Button
            onClick={() => requireAuth(() => handleVoteClick(1), "vote")}
            sx={getButtonStyles({
              isActive: vote === 1,
              activeBg: "var(--primary-bg)",
              activeColor: "var(--primary)",
            })}
          >
            <ArrowUpwardIcon />

            <Typography
              variant="body2"
              sx={{
                fontWeight: "var(--fw-bold)",
                color: "inherit",
              }}
            >
              {formatCount(Math.max(votes, 0))}
            </Typography>
          </Button>

          <Button
            onClick={() => requireAuth(() => handleVoteClick(-1), "vote")}
            sx={getButtonStyles({
              isActive: vote === -1,
              activeBg: "var(--danger-bg)",
              activeColor: "var(--danger)",
            })}
          >
            <ArrowDownwardIcon />
          </Button>
        </ButtonGroup>

        {/* COMMENTS */}
        <Box sx={iconBoxStyles}>
          <ButtonGroup variant="outlined" disableElevation sx={groupStyles}>
            <Button
              size="small"
              onClick={handleNavigate}
              onClick={(e) => {
                e.stopPropagation();

                if (typeof onComment === "function") {
                  requireAuth(onComment, "comment");
                }
              }}
              sx={getButtonStyles({
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

              <Typography
                variant="body2"
                sx={{
                  color: "inherit",
                  fontWeight: "var(--fw-bold)",
                }}
              >
                {formatCount(comments)}
              </Typography>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>

      {/* RIGHT */}
      <Box sx={iconContainerStyles}>
        {cardType === "post" && (
          <ButtonGroup variant="outlined" disableElevation sx={groupStyles}>
            <Button
              onClick={() => {
                if (typeof onShare === "function") {
                  onShare();
                }
              }}
              sx={getButtonStyles({
                isActive: false,
                activeBg: "transparent",
                activeColor: "inherit",
              })}
            >
              <ShareOutlinedIcon />
            </Button>

            <Button
              onClick={() => {
                if (typeof onSave === "function") {
                  requireAuth(onSave, "save");
                }
              }}
              sx={getButtonStyles({
                isActive: saved,
                activeBg: "var(--primary-bg)",
                activeColor: "var(--primary)",
              })}
            >
              {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
            </Button>
          </ButtonGroup>
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
};
