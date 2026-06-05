import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios.js";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LoadingStates from "./LoadingStates.jsx";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // match backend: 10MB
const MAX_IMAGES = 5;

const CreateMarketItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("null");
  const [description, setDescription] = useState("");
  const [isSingleItem, setIsSingleItem] = useState(false);
  const [location, setLocation] = useState("");
  const [imageAttachments, setImageAttachments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [productCategoryId, setProductCategoryId] = useState("");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [loadingCategoriesError, setLoadingCategoriesError] = useState(null);
  const [errors, setErrors] = useState({ general: null, fields: {} });

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const clearErrors = () => setErrors({ general: null, fields: {} });

  const handleUploadImages = (event) => {
    const files = Array.from(event.target.files);

    const validFiles = files.filter((file) => {
      if (file.size > MAX_FILE_SIZE) {
        setErrors((prev) => ({
          ...prev,
          general: `"${file.name}" exceeds the 2MB limit and was skipped.`,
        }));
        return false;
      }
      return true;
    });

    const combined = [...imageAttachments, ...validFiles];
    if (combined.length > MAX_IMAGES) {
      setErrors((prev) => ({
        ...prev,
        general: `You can only upload up to ${MAX_IMAGES} images.`,
      }));
      setImageAttachments(combined.slice(0, MAX_IMAGES));
    } else {
      setImageAttachments(combined);
    }

    event.target.value = null;
  };

  const removeImage = (index) => {
    setImageAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrors();

    // Client-side guard — catches obvious gaps before hitting the API
    if (
      !title.trim() ||
      !description.trim() ||
      !price ||
      condition === "null" ||
      imageAttachments.length === 0
    ) {
      setErrors({
        general:
          "Please fill in all required fields and add at least one image.",
        fields: {},
      });
      return;
    }

    setIsPosting(true);

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("currency", "MWK");
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("in_stock", isSingleItem ? "1" : "0");
    formData.append("location", location.trim());
    if (productCategoryId) {
      formData.append("category_id", productCategoryId);
    }
    imageAttachments.forEach((file) => formData.append("media[]", file));

    axiosInstance
      .post("/v1/listings/market-item", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        navigate(`/marketplace/product/${response.data.item.id}`);
      })
      .catch((error) => {
        if (!error.response) {
          setErrors({
            general:
              "Could not reach the server. Check your connection and try again.",
            fields: {},
          });
          return;
        }

        const { status, data } = error.response;

        switch (status) {
          case 422:
            setErrors({
              general:
                data.message ||
                "Some fields have errors. Please review and try again.",
              fields: data.errors || {},
            });
            break;
          case 401:
            setErrors({
              general: "Your session has expired. Please log in again.",
              fields: {},
            });
            break;
          case 403:
            setErrors({
              general: "You do not have permission to post listings.",
              fields: {},
            });
            break;
          case 413:
            setErrors({
              general:
                "One or more images are too large. Maximum is 2MB per image.",
              fields: {},
            });
            break;
          case 429:
            setErrors({
              general:
                "You are submitting too fast. Please wait and try again.",
              fields: {},
            });
            break;
          case 500:
          default:
            setErrors({
              general:
                data?.message ||
                "Something went wrong on our end. Please try again later.",
              fields: {},
            });
        }
      })
      .finally(() => setIsPosting(false));
  };

  const fetchCategories = () => {
    setLoadingCategoriesError(null);
    setIsLoadingCategories(true);
    axiosInstance
      .get("/v1/market-item-categories")
      .then((response) => {
        setCategoryOptions(response.data.categories);
      })
      .catch(() => {
        setLoadingCategoriesError(
          "Failed to load categories. Please retry or refresh.",
        );
      })
      .finally(() => setIsLoadingCategories(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    <form className="create-market-item-form" onSubmit={handleSubmit}>
      {errors.general && (
        <Alert
          severity="error"
          onClose={clearErrors}
          sx={{ marginBottom: "var(--space-sm)" }}
        >
          {errors.general}
        </Alert>
      )}

      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isPosting}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

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
          onChange={(e) => {
            setTitle(e.target.value);
            clearErrors();
          }}
          label="Item name"
          variant="outlined"
          error={!!errors.fields?.title}
          helperText={errors.fields?.title?.[0]}
        />

        <Box sx={{ display: "flex", gap: "var(--space-sm)" }}>
          <TextField
            label="Condition"
            variant="outlined"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            select
            fullWidth
            error={!!errors.fields?.condition}
            helperText={errors.fields?.condition?.[0]}
          >
            <MenuItem value="null" disabled>
              Select condition
            </MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="like-new">Like New</MenuItem>
            <MenuItem value="used">Used</MenuItem>
          </TextField>

          <TextField
            label="List as"
            variant="outlined"
            value={isSingleItem}
            select
            fullWidth
            onChange={(e) => setIsSingleItem(e.target.value)}
          >
            <MenuItem value={false}>Single item</MenuItem>
            <MenuItem value={true}>In stock</MenuItem>
          </TextField>
        </Box>

        {/* Category selector */}
        <TextField
          label="Category"
          variant="outlined"
          value={productCategoryId}
          onChange={(e) => setProductCategoryId(e.target.value)}
          select
          fullWidth
          error={!!errors.fields?.category_id}
          helperText={errors.fields?.category_id?.[0]}
        >
          <MenuItem value="">No category</MenuItem>
          {categoryOptions.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Price (MWK)"
          variant="outlined"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          error={!!errors.fields?.price}
          helperText={errors.fields?.price?.[0]}
          inputProps={{ min: 0 }}
        />

        <TextField
          label="Location"
          variant="outlined"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          error={!!errors.fields?.location}
          helperText={errors.fields?.location?.[0]}
        />

        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          helperText={
            errors.fields?.description?.[0] ??
            "Don't forget to add contact details"
          }
          error={!!errors.fields?.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          fullWidth
          component="label"
          variant="outlined"
          startIcon={<CameraAltOutlined />}
          disabled={imageAttachments.length >= MAX_IMAGES}
        >
          Upload images ({imageAttachments.length}/{MAX_IMAGES})
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleUploadImages}
          />
        </Button>

        {errors.fields?.media && (
          <Alert severity="error">
            {Array.isArray(errors.fields.media)
              ? errors.fields.media.join(" ")
              : errors.fields.media}
          </Alert>
        )}

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
        <Button type="submit" variant="contained" color="primary">
          PUBLISH
        </Button>
      </Stack>
    </form>
  );
};

export default CreateMarketItem;
