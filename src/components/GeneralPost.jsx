import { useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import axiosInstance from "../api/axios";

const GeneralPost = ({ post }) => {
  const { isAuthenticated } = useSession();
  function handleVoteClick(value) {
    if (!isAuthenticated) {
      toast.error("You need to be logged in to vote");
      return;
    }
    axiosInstance
      .post(`/v1/listings/vote`, { value: value, listing_id: post.id })
      .then((response) => {
        toast.success("Vote recorded");
        // Optionally, you can update the post's vote count here
      })
      .catch((error) => {
        toast.error("Failed to record vote");
        console.error("Vote error:", error);
      });
  }
  const isPostView = window.location.pathname.startsWith("/post/");
  const {
    author: postAuthor,
    title: postTitle,
    body: postBody,
    post_type: postType,
    is_sponsored: isSponsored,
    is_anonymous: isAnonymous,
    created_at: createdAt,
    media: postMedia,
    reactions_count: reactionsCount,
    user_reactions: userReactions,
  } = post || {};
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (isPostView) return;
    navigate("/post/" + post.id);
  };
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--surface)",
        padding: "var(--space-sm) var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        // borderRadius: "var(--radius-md)",
      }}
    >
      <PostHeader
        timePosted={createdAt}
        postAuthor={postAuthor}
        isAnonymous={isAnonymous}
      />
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
        <Box
          component="img"
          src={postMedia[0].url}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "var(--radius-md)",
          }}
        />
      )}
      <PostActions
        reactionsCount={reactionsCount}
        userReactions={userReactions}
        handleNavigate={handleNavigate}
        handleVoteClick={handleVoteClick}
      />
    </Box>
  );
};

export default GeneralPost;
