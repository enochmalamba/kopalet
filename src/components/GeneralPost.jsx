import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import { North, South, Chat, Share } from "@mui/icons-material";
const GeneralPost = () => {
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
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta deleniti
        hic ex harum impedit id distinctio, omnis assumenda. Sed illum ratione
        molestiae aliquam quae tenetur alias similique, reprehenderit molestias
        qui!
      </Typography>
      <Box
        component="img"
        src="https://i.pinimg.com/1200x/71/53/8b/71538bc0568fd9313079cfb39b98692e.jpg"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "400px",
          objectFit: "cover",
          objectPosition: "top",
          borderRadius: "var(--radius-md)",
        }}
      />{" "}
      <PostActions votes={99000} comments={33500} />
    </Box>
  );
};

export default GeneralPost;
