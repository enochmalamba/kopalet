import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MoreVert from "@mui/icons-material/MoreVert";

function PostHeader({
  avatarSrc,
  authorName,
  timePosted,
  isPromoted,
  audience,
}) {
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
          // background: "red",
        }}
      >
        <Avatar
          alt={authorName}
          src={avatarSrc}
          sx={{ width: 35, height: 35 }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="subtitle1"
            noWrap // cleaner than manual CSS
            sx={{
              minWidth: 0,
              lineHeight: 1.2,
              m: 0,
            }}
          >
            {authorName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {timePosted} &bull; {isPromoted ? <span>Promoted</span> : audience}
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
