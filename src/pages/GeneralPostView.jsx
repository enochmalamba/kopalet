import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import GeneralPost from "../components/GeneralPost";
import Comment from "../components/Comment";
function GeneralPostView() {
  return (
    <>
      <GeneralPost isPostView />
      <TextField
        fullWidth
        label="Add comment"
        placeholder="Share your thoughts"
        multiline
        minRows={1}
        maxRows={4}
      ></TextField>
      <Typography variant="body" color="var(--muted)">
        Comments
      </Typography>
      <Comment />
    </>
  );
}

export default GeneralPostView;
