import React from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const imageSx = {
  minWidth: "200px",
  maxWidth: "100%",
  height: "auto",
  maxHeight: "400px",
  objectFit: "contain",
  objectPosition: "left",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
};

const GeneralPost = React.memo(({ post }) => {
  const { isAuthenticated } = useSession();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);

  const isPostView = window.location.pathname.startsWith("/post/");

  const {
    author: postAuthor,
    title: postTitle,
    body: postBody,
    created_at: createdAt,
    media: postMedia,
    reactions_count: reactionsCount,
    user_reactions: userReactions,
  } = post || {};

  // build slides only when media changes
  const slides = React.useMemo(() => {
    return postMedia?.map((m) => ({ src: m.url })) || [];
  }, [postMedia]);

  function handleVoteClick(value) {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to vote");
      return;
    }

    axiosInstance
      .post(`/v1/listings/vote`, {
        value,
        listing_id: post.id,
      })
      .then(() => {
        toast.success("Vote recorded");
      })
      .catch((error) => {
        toast.error("Failed to record vote");
        console.error("Vote error:", error);
      });
  }

  const handleNavigate = React.useCallback(() => {
    if (isPostView) return;
    navigate("/post/" + post.id);
  }, [isPostView, navigate, post?.id]);

  const handleOpenLightbox = React.useCallback(() => {
    setOpen(true);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--surface)",
        padding: "var(--space-sm) var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <PostHeader timePosted={createdAt} postAuthor={postAuthor} />

      <Box>
        {postTitle && (
          <Typography
            sx={{
              color: "var(--text)",
              ...(!isPostView && {
                display: "-webkit-box",
                WebkitLineClamp: 1,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }),
            }}
          >
            {postTitle}
          </Typography>
        )}

        {postBody && (
          <Typography
            sx={{
              color: "var(--muted)",
              ...(!isPostView && {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }),
            }}
          >
            {postBody}
          </Typography>
        )}
      </Box>

      {postMedia?.length > 0 && (
        <>
          {/* Carousel preview */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {postMedia.map((media, i) => (
              <Box
                key={media.id || i}
                component="img"
                src={media.url}
                loading="lazy"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                sx={{
                  ...imageSx,
                  flex: "0 0 85%",
                  minWidth: "85%", // IMPORTANT FIX
                  scrollSnapAlign: "start",
                }}
              />
            ))}
          </Box>

          {/* Lightbox */}
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            on={{
              view: ({ index: i }) => setIndex(i),
            }}
            controller={{
              closeOnBackdropClick: true,
              closeOnPullDown: true,
              closeOnPullUp: true,
            }}
            animation={{
              fade: 0.2,
            }}
            carousel={{
              finite: true, // IMPORTANT: stops infinite looping
            }}
            render={{
              buttonPrev: () =>
                index > 0 ? (
                  <Button
                    variant="outlined"
                    onClick={() => setIndex(index - 1)}
                  >
                    Prev
                  </Button>
                ) : null,

              buttonNext: () =>
                index < slides.length - 1 ? (
                  <Button
                    variant="outlined"
                    onClick={() => setIndex(index + 1)}
                  >
                    Next
                  </Button>
                ) : null,
            }}
          />
        </>
      )}

      <PostActions
        reactionsCount={reactionsCount}
        userReactions={userReactions}
        handleNavigate={handleNavigate}
        handleVoteClick={handleVoteClick}
      />
    </Box>
  );
});

export default GeneralPost;
