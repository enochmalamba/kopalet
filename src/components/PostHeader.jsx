import { formatTimeAgo } from "../utils/format";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";

function PostHeader({
  postAuthor,
  isAnonymous,
  timePosted,
  audience,
  isSponsored,
}) {
  const { name, avatar } = postAuthor || {};
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          flex: 1,
        }}
      >
        <Avatar alt={name} src={avatar} />
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            alignSelf: "stretch",
            alignItems: "start",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="body1"
            noWrap
            sx={{
              minWidth: 0,
              lineHeight: 1,
              m: 0,
            }}
          >
            {isAnonymous ? "Anonymous" : name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatTimeAgo(timePosted)} &bull;{" "}
            {isSponsored ? <span>Promoted</span> : audience}
          </Typography>
        </Box>
      </Box>
      <IconButton sx={{ width: "30px", height: "30px" }}>
        <MoreVert />
      </IconButton>
    </Box>
  );
}

export default PostHeader;
