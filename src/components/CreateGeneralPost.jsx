import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";
import DOMPurify from "dompurify";
import CreatorHeader from "./CreatorHeader.jsx";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { toast } from "sonner";

function CreateGeneralPost() {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);
  const [topicOpen, setTopicOpen] = useState(false);
  const [postTopic, setPostTopic] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageAttachments, setImageAttachments] = useState([]);
  const [docAttachments, setDocAttachments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !postTopic.trim() &&
      !postContent.trim() &&
      imageAttachments.length === 0 &&
      docAttachments.length === 0
    ) {
      toast.error("Please add a topic, content, or attachment before posting.");
      return;
    }

    setIsPosting(true);
    const toastId = toast.loading("Publishing your post...");

    const formData = new FormData();
    formData.append(
      "title",
      DOMPurify.sanitize(postTopic).replace(/\n/g, "<br>")
    );
    formData.append(
      "body",
      DOMPurify.sanitize(postContent).replace(/\n/g, "<br>")
    );
    formData.append("post_type", "regular");

    [...imageAttachments, ...docAttachments].forEach((file) => {
      formData.append("media[]", file);
    });

    axiosInstance
      .post("/v1/listings/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        setIsPosting(false);
        toast.success("Post published.", { id: toastId });
        const postId = response.data.data.id;
        navigate(`/post/${postId}`);
      })
      .catch((error) => {
        setIsPosting(false);

        if (error instanceof TypeError) {
          toast.error("Unexpected response from server. Please try again.", {
            id: toastId,
          });
          return;
        }

        if (!error.response) {
          toast.error(
            "Could not reach the server. Check your connection and try again.",
            { id: toastId }
          );
          return;
        }

        const { status, data } = error.response;

        switch (status) {
          case 422:
            toast.error(
              data.message ||
                "Some fields have errors. Please review and try again.",
              { id: toastId }
            );
            break;
          case 401:
            toast.error("Your session has expired. Please log in again.", {
              id: toastId,
            });
            break;
          case 403:
            toast.error("You do not have permission to post.", { id: toastId });
            break;
          case 413:
            toast.error(
              "Your upload is too large. Maximum total size is 10MB per file.",
              { id: toastId }
            );
            break;
          case 429:
            toast.error(
              "You are posting too fast. Please wait a moment and try again.",
              { id: toastId }
            );
            break;
          case 500:
          default:
            toast.error(
              data?.message ||
                "Something went wrong on our end. Please try again later.",
              { id: toastId }
            );
        }
      });
  };
  const allowedDocTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
    "text/csv",
  ];

  const handleImages = (e) => {
    if (docAttachments.length > 0) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not a valid image.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the 10MB limit.`);
        return false;
      }
      return true;
    });

    setImageAttachments([...imageAttachments, ...validFiles].slice(0, 4));
    e.target.value = null;
  };

  const handleDocs = (e) => {
    if (imageAttachments.length > 0) return;

    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => {
      if (!allowedDocTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported document type.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`${file.name} exceeds the 10MB limit.`);
        return false;
      }
      return true;
    });

    setDocAttachments([...docAttachments, ...validFiles].slice(0, 4));
    e.target.value = null;
  };
  const removeImage = (index) => {
    const updated = imageAttachments.filter((_, i) => i !== index);
    setImageAttachments(updated);
  };

  const removeDoc = (index) => {
    const updated = docAttachments.filter((_, i) => i !== index);
    setDocAttachments(updated);
  };
  const handleTopicToggle = () => {
    if (topicOpen) {
      setPostTopic("");
      setTopicOpen(false);
    }
    if (!topicOpen) {
      setTopicOpen(true);
    }
  };

  return (
    <>
      <form className="create-post-form" onSubmit={handleSubmit}>
        {/* hidden inputs start */}

        <input
          type="file"
          accept="image/*"
          multiple
          ref={imageInputRef}
          style={{ display: "none" }}
          onChange={handleImages}
        />

        <input
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.ods,.txt"
          ref={docInputRef}
          style={{ display: "none" }}
          onChange={handleDocs}
        />

        {/* hidden inputs end */}
        <Box
          sx={{
            width: "100%",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            padding: " var(--space-sm) var(--space-xs)",
          }}
        >
          <CreatorHeader />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xs)",
              cursor: "pointer",
              margin: "var(--space-xs) 0",
            }}
            onClick={handleTopicToggle}
          >
            <IconButton size="small">
              {topicOpen ? (
                <CloseIcon sx={{ width: "18px" }} />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>

            <Typography variant={topicOpen && "caption"}>
              {topicOpen ? "Remove topic" : "Add topic"}
            </Typography>
          </Box>
          <Collapse in={!!topicOpen}>
            {topicOpen && (
              <TextField
                placeholder="Add a topic to your post"
                type="text"
                value={postTopic}
                onChange={(e) => setPostTopic(e.target.value)}
                fullWidth
                disabled={isPosting}
                sx={{ transition: "ease-in .2s" }}
              />
            )}
          </Collapse>
          <TextField
            placeholder="What do you want to talk about?"
            type="text"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            fullWidth
            disabled={isPosting}
            multiline
            minRows={2}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              "& .MuiInputBase-root": {
                padding: "var(--space-sm) var(--space-xs)",
              },
            }}
          />
          {imageAttachments.length > 0 && (
            <div className="create-post-form-upload-preview">
              {imageAttachments.map((file, index) => (
                <div className="upload-preview-card" key={index}>
                  <IconButton
                    size="small"
                    onClick={() => removeImage(index)}
                    sx={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      background: "rgba(0,0,0,0.55)",
                      zIndex: 2,
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>

                  <img src={URL.createObjectURL(file)} alt="" />

                  <div className="file-preview-details">
                    <span>{file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {docAttachments.length > 0 && (
            <div className="create-post-form-upload-preview">
              {docAttachments.map((file, index) => (
                <div className="upload-preview-card" key={index}>
                  <ArticleOutlinedIcon
                    sx={{ fontSize: "48px", color: "white" }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => removeDoc(index)}
                    sx={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      background: "rgba(0,0,0,0.55)",
                      zIndex: 2,
                    }}
                  >
                    <CloseOutlinedIcon />
                  </IconButton>

                  <div className="file-preview-details">
                    <span>{file.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Stack
            direction="row"
            spacing={1}
            sx={{ alignItems: "center", flexWrap: "wrap" }}
          >
            <Chip
              icon={<AddPhotoAlternateOutlinedIcon />}
              label={`Images (${imageAttachments.length}/4)`}
              variant="outlined"
              onClick={() => imageInputRef.current.click()}
              disabled={docAttachments.length > 0}
            />
            <Chip
              icon={<AttachFileOutlinedIcon />}
              label={`Documents (${docAttachments.length}/4)`}
              variant="outlined"
              onClick={() => docInputRef.current.click()}
              disabled={imageAttachments.length > 0}
            />
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            marginTop: "var(--space-md)",
          }}
        >
          {/* <Button variant="outlined" size="medium">
          Schedule post
        </Button> */}
          <Button variant="contained" type="submit">
            POST
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateGeneralPost;
