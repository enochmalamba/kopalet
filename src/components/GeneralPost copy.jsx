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

import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const IMAGE_MIME_PREFIX = "image/";
const MIN_ASPECT_RATIO = 0.8; // 4:5 — matches Instagram's portrait cap, prevents feed-breaking tall images
const MAX_ASPECT_RATIO = 1.91; // landscape cap
const FALLBACK_ASPECT_RATIO = 1;

const DOCUMENT_META = {
  "application/pdf": { label: "PDF", Icon: PictureAsPdfOutlinedIcon },
  "application/msword": { label: "DOC", Icon: DescriptionOutlinedIcon },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    label: "DOCX",
    Icon: DescriptionOutlinedIcon,
  },
  "application/vnd.ms-excel": { label: "XLS", Icon: GridOnOutlinedIcon },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    label: "XLSX",
    Icon: GridOnOutlinedIcon,
  },
  "application/vnd.ms-powerpoint": {
    label: "PPT",
    Icon: SlideshowOutlinedIcon,
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    label: "PPTX",
    Icon: SlideshowOutlinedIcon,
  },
};

function getDocumentMeta(mimeType) {
  return (
    DOCUMENT_META[mimeType] || {
      label: "FILE",
      Icon: InsertDriveFileOutlinedIcon,
    }
  );
}

function getImageRatio(media) {
  if (media?.width && media?.height) return media.width / media.height;
  const parsed = parseFloat(media?.aspect_ratio);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : FALLBACK_ASPECT_RATIO;
}

function formatBytes(bytes) {
  if (bytes === null || bytes === undefined) return null;
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let val = bytes / 1024;
  let i = 0;
  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }
  return `${val.toFixed(val < 10 ? 1 : 0)} ${units[i]}`;
}

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

  const images = React.useMemo(
    () =>
      postMedia?.filter((m) => m.mime_type?.startsWith(IMAGE_MIME_PREFIX)) ||
      [],
    [postMedia],
  );

  const documents = React.useMemo(
    () =>
      postMedia?.filter((m) => !m.mime_type?.startsWith(IMAGE_MIME_PREFIX)) ||
      [],
    [postMedia],
  );

  const primaryImage = React.useMemo(
    () => images.find((m) => m.is_primary) || images[0],
    [images],
  );

  const carouselRatio = React.useMemo(() => {
    const raw = getImageRatio(primaryImage);
    return Math.min(MAX_ASPECT_RATIO, Math.max(MIN_ASPECT_RATIO, raw));
  }, [primaryImage]);

  const slides = React.useMemo(() => {
    return images
      .filter((_, i) => mediaStatus[i] !== "error")
      .map((m) => ({ src: m.url }));
  }, [images, mediaStatus]);

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

                WebkitLineClamp: 3,
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
                WebkitLineClamp: 3,
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

      {images.length > 0 && (
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
              aspectRatio: carouselRatio,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
              cursor: "grab",
              userSelect: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {images.map((media, i) => {
              const status = mediaStatus[i] || "loading";

              if (status === "error") {
                return (
                  <Box
                    key={media.id || i}
                    sx={{
                      flex: images.length > 1 ? "0 0 85%" : "0 0 100%",
                      minWidth: images.length > 1 ? "85%" : "100%",
                      aspectRatio: carouselRatio,
                      cursor: "default",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "var(--space-xs)",
                      backgroundColor: "var(--surface-alt, #1e1e1e)",
                      border: "1px solid var(--border, #2c2c2c)",
                      borderRadius: "var(--radius-md)",
                      color: "var(--muted)",
                      scrollSnapAlign: "start",
                      flexShrink: 0,
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
                    flex: images.length > 1 ? "0 0 85%" : "0 0 100%",
                    minWidth: images.length > 1 ? "85%" : "100%",
                    aspectRatio: carouselRatio,
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    scrollSnapAlign: "start",
                    flexShrink: 0,
                    backgroundColor:
                      media.dominant_color || "var(--surface-alt, #1e1e1e)",
                  }}
                >
                  {status === "loading" && !media.dominant_color && (
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
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      cursor: "pointer",
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

      {documents.length > 0 && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-xs)",
          }}
        >
          {documents.map((doc, i) => {
            const { label, Icon } = getDocumentMeta(doc.mime_type);
            const size = formatBytes(doc.size_bytes);
            return (
              <Box
                key={doc.id || i}
                component="a"
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-sm)",
                  padding: "var(--space-sm) var(--space-md)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border)",
                  textDecoration: "none",
                  color: "var(--text)",
                  "&:hover": {
                    backgroundColor: "var(--surface-hover, #2a2a2a)",
                  },
                }}
              >
                <Icon sx={{ fontSize: 28, flexShrink: 0, opacity: 0.8 }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: "var(--fw-bold)", flex: 1, minWidth: 0 }}
                >
                  {label} document{size ? ` · ${size}` : ""}
                </Typography>
                <FileDownloadOutlinedIcon
                  sx={{ fontSize: 22, opacity: 0.6, flexShrink: 0 }}
                />
              </Box>
            );
          })}
        </Box>
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
