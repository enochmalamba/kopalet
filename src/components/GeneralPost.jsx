import { useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const GeneralPost = ({
  isPostView = false,
  title,
  content,
  userName,
  userAvatar,
  audience = "Public",
  createdAt,
  postMedia,
}) => {
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
        avatarSrc={userAvatar}
        authorName={userName}
        timePosted={createdAt}
        isPromoted={false}
        audience={audience}
      />
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
        {content}
      </Typography>
      {postMedia && (
        <Box
          component="img"
          src={postMedia[0]}
          sx={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "var(--radius-md)",
          }}
        />
      )}{" "}
      <PostActions
        initialVotes={99000}
        initialUserVote={1}
        comments={3350000}
        hasCommented={true}
        isSaved={true}
        handleNavigate={handleNavigate}
      />
    </Box>
  );
};

export default GeneralPost;
