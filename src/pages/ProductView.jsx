import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

import DetailPageHeader from "../components/DetailPageHeader.jsx";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Skeleton from "@mui/material/Skeleton";

import MoreVert from "@mui/icons-material/MoreVert";
import CopyAllIcon from "@mui/icons-material/CopyAll";

import axiosInstance from "../api/axios.js";
import { formatMoney, formatTimeAgo } from "../utils/format.js";

function ProductView() {
  const { id: productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  // 🔹 NEW: image loading state
  const [imageLoaded, setImageLoaded] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // 🔹 Fetch product
  useEffect(() => {
    let isMounted = true;

    axiosInstance
      .get(`/v1/market-item/${productId}`)
      .then((response) => {
        if (!isMounted) return;
        setProduct(response.data.item);
        setLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.log(err);
        setError("Failed to load product.");
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [productId]);

  // 🔹 Loading UI
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 🔹 Error UI
  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // 🔹 Not found
  if (!product) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Product not found</Typography>
      </Box>
    );
  }

  // 🔹 Safe mappings
  const title = product.title;
  const description = product.body;
  const price = product.price;
  const currency = product.currency;
  const location = product.location;
  const createdAt = product.created_at;

  const primaryImage =
    product.media?.find((m) => m.is_primary)?.url ||
    product.media?.[0]?.url ||
    "/fallback-image.png";

  const handleCopyDetails = () => {
    const details = `Seller contact details:
Name: ${product.author?.name || "Unknown"}
Phone: Not provided`;
    navigator.clipboard.writeText(details);
    setContactDialogOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>{title} - Marketplace</title>
        <meta
          name="description"
          content={description?.slice(0, 160) || "Product details"}
        />
      </Helmet>

      <Box>
        <DetailPageHeader heading={title} />

        {/* 🔹 Image with Skeleton */}
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Box sx={{ width: "100%", maxHeight: 400, position: "relative" }}>
            {/* Skeleton */}
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={400}
                sx={{ borderRadius: 2 }}
              />
            )}

            {/* Image */}
            <Box
              component="img"
              src={primaryImage}
              alt={title}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                e.target.src = "/fallback-image.png";
                setImageLoaded(true);
              }}
              sx={{
                width: "100%",
                height: 400,
                objectFit: "cover",
                position: imageLoaded ? "static" : "absolute",
                top: 0,
                left: 0,
                opacity: imageLoaded ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />
          </Box>
        </Box>

        {/* 🔹 Details */}
        <Box sx={{ mb: 4 }}>
          <Typography color="text.secondary">
            Posted {formatTimeAgo(createdAt)} in {location}
          </Typography>

          <Typography variant="h5" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h4">{formatMoney(price, currency)}</Typography>

          {/* Actions 
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "85% 10%",
              gap: 1,
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              onClick={() => setContactDialogOpen(true)}
            >
              Contact Seller
            </Button>

            <Button variant="outlined" sx={{ minWidth: 32, p: 0 }}>
              <MoreVert />
            </Button>
          </Box>*/}

          {/* Contact Dialog */}
          <Dialog
            open={contactDialogOpen}
            onClose={() => setContactDialogOpen(false)}
            fullScreen={fullScreen}
          >
            {/* <DialogContent>
              <Typography variant="h6">Seller details</Typography>
              <Typography>Name: {product.author?.name}</Typography>
              <Typography>Phone: Not provided</Typography>
            </DialogContent> */}

            <DialogActions>
              <Button onClick={handleCopyDetails} startIcon={<CopyAllIcon />}>
                Copy Details
              </Button>
            </DialogActions>
          </Dialog>

          {/* Description */}
          <Typography fontWeight="bold" mt={3}>
            Description
          </Typography>

          <Typography color="text.secondary">
            {description || "No description provided."}
          </Typography>

          <Divider sx={{ mt: 2 }} />
        </Box>
      </Box>
    </>
  );
}

export default ProductView;
