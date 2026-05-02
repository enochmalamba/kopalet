import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axiosInstance from "../api/axios.js";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LoadingStates from "./LoadingStates.jsx";
// must have at least name, description, price, condition, and optionally location, images, and category
const CreateMarketItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("null");
  const [description, setDescription] = useState("");
  const [isSingleItem, setIsSingleItem] = useState(true);
  const [location, setLocation] = useState("");
  const [imageAttachments, setImageAttachments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [loadingCategoriesError, setLoadingCategoriesError] = useState(null);

  const navigate = useNavigate();

  const handleUploadImages = (event) => {
    const files = Array.from(event.target.files);
    // images must be >= 10mb and not more than 5 images
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024);
    if (validFiles.length + imageAttachments.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }
    setImageAttachments((prev) => [...prev, ...validFiles]);
  };

  const removeImage = (index) => {
    setImageAttachments((prev) => prev.filter((_, i) => i !== index));
  };
  const handleSumbit = (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !price ||
      condition === "null" ||
      imageAttachments.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setIsPosting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("currency", "MWK");
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("isSingleItem", isSingleItem);
    formData.append("location", location);
    imageAttachments.forEach((file) => formData.append("media[]", file));

    axiosInstance
      .post("/v1/listings/market-item", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        navigate(`/marketplace/product/${response.data.item.id}`);
      })
      .catch((error) => {})
      .finally(() => setIsPosting(false));
  };

  const fetchCategories = () => {
    setLoadingCategoriesError(null);
    setIsLoadingCategories(true);
    axiosInstance
      .get("/v1/market-item-categories")
      .then((response) => {
        setCategoryOptions(response.data);
        setIsLoadingCategories(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingCategoriesError("Something went wrong, retry or refresh.");
        setIsLoadingCategories(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  // no posting if categories are not loaded

  if (isLoadingCategories) {
    return (
      <Box sx={{ paddingTop: "80px" }}>
        <LoadingStates component="spinner" />
      </Box>
    );
  }
  if (loadingCategoriesError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "var(--space-lg)",
          paddingTop: "var(--space-xxl)",
          gap: "var(--space-xxl)",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {loadingCategoriesError}
        </Typography>
        <Button onClick={fetchCategories} sx={{ mt: 1 }} variant="contained">
          Retry
        </Button>
      </Box>
    );
  }
  return (
    <form className="create-market-item-form" onSubmit={handleSumbit}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label="Item name"
          variant="outlined"
        />
        <Box
          sx={{
            display: "flex",
            gap: "var(--space-sm)",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <TextField
              label="Condition"
              variant="outlined"
              defaultValue={"null"}
              onChange={(e) => setCondition(e.target.value)}
              select
              fullWidth
            >
              <MenuItem value={"null"}>Select</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="like-new">Like New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ flex: 1 }}>
            <TextField
              label="LIst as"
              defaultValue={false}
              variant="outlined"
              select
              fullWidth
              onChange={(e) => setIsSingleItem(e.target.value)}
            >
              <MenuItem default selected value={false}>
                Single item
              </MenuItem>
              <MenuItem value={true}>In stock</MenuItem>
            </TextField>
          </Box>
        </Box>
        <TextField
          label="Price"
          variant="outlined"
          type="number"
          InputProps={{
            startAdornment: (
              <Typography sx={{ marginRight: "var(--space-md)" }}>
                MWK
              </Typography>
            ),
          }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        <TextField
          label="Location"
          variant="outlined"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          helperText="Dont forget to add contact details "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          fullWidth
          component="label"
          role={undefined}
          variant="outlined"
          tabIndex={-1}
          startIcon={<CameraAltOutlined />}
        >
          Upload images
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleUploadImages}
          />
        </Button>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isPosting}
          loading={isPosting}
          loadingPosition="start"
        >
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateMarketItem;
