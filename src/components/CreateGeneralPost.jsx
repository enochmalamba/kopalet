import { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
function CreateGeneralPost() {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const imageInputRef = useRef(null);
  const docInputRef = useRef(null);

  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [imageAttachments, setImageAttachments] = useState([]);
  const [docAttachments, setDocAttachmentes] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  // const [warning, setWarning] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !postTitle.trim() &&
      !postContent.trim() &&
      imageAttachments.length === 0 &&
      docAttachments.length === 0
    ) {
      return; // nothing was entered
    }

    setIsPosting(true);
    const title = DOMPurify.sanitize(postTitle).replace(/\n/g, "<br>");
    const content = DOMPurify.sanitize(postContent).replace(/\n/g, "<br>");
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
        console.warn(`${file.name} is not an image`);
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        console.warn(`${file.name} is larger than 10MB`);
        return false;
      }

      return true;
    });

    const newFiles = [...imageAttachments, ...validFiles].slice(0, 4);

    setImageAttachments(newFiles);
    e.target.value = null;
  };

  const handleDocs = (e) => {
    if (imageAttachments.length > 0) return;
    const files = Array.from(e.target.files);

    const validFiles = files.filter((file) => {
      if (!allowedDocTypes.includes(file.type)) {
        console.warn(`${file.name} is not a supported document`);
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        console.warn(`${file.name} is larger than 10MB`);
        return false;
      }

      return true;
    });

    const newFiles = [...docAttachments, ...validFiles].slice(0, 4);

    setDocAttachmentes(newFiles);
    e.target.value = null;
  };
  const removeImage = (index) => {
    const updated = imageAttachments.filter((_, i) => i !== index);
    setImageAttachments(updated);
  };

  const removeDoc = (index) => {
    const updated = docAttachments.filter((_, i) => i !== index);
    setDocAttachmentes(updated);
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
        <TextField
          label="Title"
          placeholder="What do you want to talk about"
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          fullWidth
          disabled={isPosting}
        />

        <TextField
          placeholder="Go ahead, share your thoughts, tips, etc"
          type="text"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          fullWidth
          disabled={isPosting}
          multiline
          minRows={5}
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
          <Button
            variant="contained"
            size="small"
            type="submit"
            loadingPosition="end"
            loading={isPosting}
          >
            Post now
          </Button>
        </Stack>
      </form>
    </>
  );
}

export default CreateGeneralPost;
