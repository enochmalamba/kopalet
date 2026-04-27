import { useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const GeneralPost = ({ post }) => {
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
  } = post;
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (isPostView) return;
    navigate("/post/1");
  };
  return (
    <Box
      sx={{
        width: "100%",
        background: "var(--surface)",
        padding: "var(--space-sm) var(--space-md)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        borderRadius: "var(--radius-md)",
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
          src={"http://kplt.test" + postMedia[0].url}
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
      />
    </Box>
  );
};

export default GeneralPost;
