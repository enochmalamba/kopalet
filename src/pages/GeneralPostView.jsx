import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import GeneralPost from "../components/GeneralPost";
import Comment from "../components/Comment";
import LoadingStates from "../components/LoadingStates";

function GeneralPostView() {
  const [post, setPost] = useState(null);
  const [isFetchingPost, setIsFetchingPost] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const [postFetchError, setPostFetchError] = useState(null);
  const [commentsFetchError, setCommentsFetchError] = useState(null);

  const { id: postId } = useParams();

  const fetchPost = async () => {
    try {
      setIsFetchingPost(true);
      setPostFetchError(null);
      const { data } = await axiosInstance.get(`/v1/posts/${postId}`);
      setPost(data.data);
    } catch (error) {
      console.error(error);
      setPostFetchError("Failed to load post.");
    } finally {
      setIsFetchingPost(false);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <>
      {isFetchingPost ? (
        <Box sx={{ marginTop: "50px" }}>
          <LoadingStates component="spinner" />
        </Box>
      ) : (
        <>
          <GeneralPost post={post} />

          <TextField
            fullWidth
            label="Add comment"
            placeholder="Share your thoughts"
            multiline
            minRows={1}
            maxRows={4}
          />

          {isFetchingComments && <LoadingStates component="spinner" />}
        </>
      )}
      {/* <Typography variant="body" color="var(--muted)">
        Comments
      </Typography>
      <Comment /> */}
    </>
  );
}

export default GeneralPostView;
