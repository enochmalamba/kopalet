import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useShare } from "../hooks/useShare";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
// import toast from "react-hot-toast";
import { toast } from "sonner";
import axiosInstance from "../api/axios";

import { preserveLineBreaks } from "../utils/textFormat";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const CAROUSEL_HEIGHT = "320px";

const imageSx = {
  flex: "0 0 85%",
  minWidth: "85%",
  height: CAROUSEL_HEIGHT,
  objectFit: "cover",
  objectPosition: "center",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  scrollSnapAlign: "start",
  display: "block",
};

const GeneralPost = React.memo(({ post }) => {
  const navigate = useNavigate();
  const { share } = useShare();
  const location = useLocation();

  const [open, setOpen] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [isVoting, setIsVoting] = React.useState(false);
  const [localReactions, setLocalReactions] = React.useState(null);
  const [mediaStatus, setMediaStatus] = React.useState({});

  const scrollerRef = React.useRef(null);
  const dragState = React.useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  const isPostView = location.pathname.startsWith("/post/");

  const {
    id: postId,
    author: postAuthor,
    title: postTitle,
    body: postBody,
    created_at: createdAt,
    media: postMedia,
    reactions_count: reactionsCount,
    user_reactions: userReactions,
  } = post || {};

  const slides = React.useMemo(() => {
    return (
      postMedia
        ?.filter((_, i) => mediaStatus[i] !== "error")
        .map((m) => ({ src: m.url })) || []
    );
  }, [postMedia, mediaStatus]);

  React.useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [slides, index]);

  const handleVoteClick = React.useCallback(
    (value) => {
      if (!postId || isVoting) return;

      setIsVoting(true);

      const prevReactions = localReactions ?? {
        count: reactionsCount,
        user: userReactions,
      };

      setLocalReactions({
        count:
          prevReactions.count +
          (prevReactions.user === value
            ? -value
            : value - (prevReactions.user || 0)),
        user: prevReactions.user === value ? 0 : value,
      });

      axiosInstance
        .post(`/v1/listings/vote`, { value, listing_id: postId })
        .then(() => {
          toast.success("Vote recorded");
        })
        .catch((error) => {
          setLocalReactions(prevReactions);
          const status = error.response?.status;
          if (status === 401) {
            toast.error("Please log in to vote");
          } else if (status === 429) {
            toast.error("Slow down — too many requests");
          } else {
            toast.error("Failed to record vote");
          }
          console.error("Vote error:", error);
        })
        .finally(() => {
          setIsVoting(false);
        });
    },
    [postId, isVoting, localReactions, reactionsCount, userReactions],
  );

  const handleNavigate = React.useCallback(() => {
    if (isPostView) return;
    navigate("/post/" + postId);
  }, [isPostView, navigate, postId]);

  const onShare = React.useCallback(() => {
    share({
      title: postTitle || "Check this out on Kopalet",
      text: postBody ? postBody.slice(0, 120) : postTitle,
      url: `https://kopalet.com/post/${postId}`,
    });
  }, [share, postTitle, postBody, postId]);

  const onPointerDown = React.useCallback((e) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current = {
      isDown: true,
      startX: e.pageX,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
    el.style.cursor = "grabbing";
    el.style.scrollSnapType = "none";
  }, []);

  const onPointerMove = React.useCallback((e) => {
    const el = scrollerRef.current;
    if (!el || !dragState.current.isDown) return;
    const dx = e.pageX - dragState.current.startX;
    if (Math.abs(dx) > 3) dragState.current.moved = true;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  }, []);

  const endDrag = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    dragState.current.isDown = false;
    el.style.cursor = "grab";
    el.style.scrollSnapType = "x mandatory";
  }, []);

  const handleImageClick = React.useCallback((i) => {
    if (dragState.current.moved) {
      dragState.current.moved = false;
      return;
    }
    setIndex(i);
    setOpen(true);
  }, []);

  const handleImageLoad = React.useCallback((i) => {
    setMediaStatus((prev) => ({ ...prev, [i]: "loaded" }));
  }, []);

  const handleImageError = React.useCallback((i) => {
    setMediaStatus((prev) => ({ ...prev, [i]: "error" }));
  }, []);

  const displayReactions = localReactions ?? {
    count: reactionsCount,
    user: userReactions,
  };

  return (
    <Box
      sx={{
        width: "100%",

        borderBottom: "1px solid var(--border)",
        padding: "var(--space-sm) var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
      }}
    >
      <PostHeader timePosted={createdAt} postAuthor={postAuthor} />

      <Box onClick={handleNavigate} sx={{ cursor: "pointer" }}>
        {postTitle && (
          <Typography
            sx={{
              color: "var(--text)",
              fontWeight: " var(--fw-bold) ",
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
              fontWeight: "var(--fw-regular) ",
              ...(!isPostView && {
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }),
            }}
          >
            {preserveLineBreaks(postBody)}
          </Typography>
        )}
      </Box>

      {postMedia?.length > 0 && (
        <>
          <Box
            ref={scrollerRef}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
            sx={{
              display: "flex",
              gap: 1,
              height: CAROUSEL_HEIGHT,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: "grab",
              userSelect: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {postMedia.map((media, i) => {
              const status = mediaStatus[i] || "loading";

              if (status === "error") {
                return (
                  <Box
                    key={media.id || i}
                    sx={{
                      ...imageSx,
                      cursor: "default",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "var(--space-xs)",
                      backgroundColor: "var(--surface-alt, #1e1e1e)",
                      border: "1px solid var(--border, #2c2c2c)",
                      color: "var(--muted)",
                    }}
                  >
                    <ImageNotSupportedOutlinedIcon
                      sx={{ fontSize: 36, opacity: 0.6 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: "var(--muted)", opacity: 0.8 }}
                    >
                      Image unavailable
                    </Typography>
                  </Box>
                );
              }

              return (
                <Box
                  key={media.id || i}
                  sx={{
                    position: "relative",
                    flex: "0 0 85%",
                    minWidth: "85%",
                    height: CAROUSEL_HEIGHT,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    scrollSnapAlign: "start",
                    flexShrink: 0,
                  }}
                >
                  {status === "loading" && (
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(90deg, var(--surface-alt, #1e1e1e) 25%, var(--surface-hover, #2a2a2a) 50%, var(--surface-alt, #1e1e1e) 75%)",
                        backgroundSize: "200% 100%",
                        animation:
                          "post-media-shimmer 1.4s ease-in-out infinite",
                        "@keyframes post-media-shimmer": {
                          "0%": { backgroundPosition: "200% 0" },
                          "100%": { backgroundPosition: "-200% 0" },
                        },
                      }}
                    />
                  )}

                  <Box
                    component="img"
                    src={media.url}
                    alt={postTitle || "Post image"}
                    loading="lazy"
                    onLoad={() => handleImageLoad(i)}
                    onError={() => handleImageError(i)}
                    onClick={() => handleImageClick(i)}
                    draggable={false}
                    sx={{
                      ...imageSx,
                      flex: "unset",
                      minWidth: "unset",
                      width: "100%",
                      opacity: status === "loaded" ? 1 : 0,
                      transition: "opacity 0.25s ease",
                    }}
                  />
                </Box>
              );
            })}
          </Box>

          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
            on={{ view: ({ index: i }) => setIndex(i) }}
            controller={{
              closeOnBackdropClick: true,
              closeOnPullDown: true,
              closeOnPullUp: true,
            }}
            animation={{ fade: 0.2 }}
            carousel={{ finite: true }}
          />
        </>
      )}

      <PostActions
        reactionsCount={displayReactions.count}
        userReactions={displayReactions.user}
        handleNavigate={handleNavigate}
        handleVoteClick={handleVoteClick}
        onShare={onShare}
        isVoting={isVoting}
      />
    </Box>
  );
});

export default GeneralPost;
