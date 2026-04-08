import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import GeneralPost from "../components/GeneralPost";
import CommentCard from "../components/CommentCard";
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
      <CommentCard />
    </>
  );
}

export default GeneralPostView;
