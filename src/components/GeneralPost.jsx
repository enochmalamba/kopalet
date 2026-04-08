import { useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";

const GeneralPost = ({ isPostView = false }) => {
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
        avatarSrc={
          "https://lh3.googleusercontent.com/a/ACg8ocK6G-C-MHz2Q_w_KD6-VGXepOC-dQ9ZRK0XNZ5goivtWyi6m-4l=s288-c-no"
        }
        authorName={"Enoch Malamba "}
        timePosted={"3hr ago"}
        isPromoted={false}
        audience={"Public"}
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta deleniti
        hic ex harum impedit id distinctio, omnis assumenda. Sed illum ratione
        molestiae aliquam quae tenetur alias similique, reprehenderit molestias
        qui!
      </Typography>
      <Box
        component="img"
        src="/defaults/img.JPG"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          objectFit: "cover",
          objectPosition: "top",
          borderRadius: "var(--radius-md)",
        }}
      />{" "}
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
