import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import DetailPageHeader from "../components/DetailPageHeader.jsx";
import Box from "@mui/material/Box";
import MarketListItem from "../components/MarketListItem.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { PRODUCTS } from "../data.js";
import { formatMoney, formatTimeAgo } from "../utils/format.js";
import MoreVert from "@mui/icons-material/MoreVert";
import CopyAllIcon from "@mui/icons-material/CopyAll";

function ProductDetail() {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const productId = useParams().id;
  const PRODUCT = PRODUCTS.find((prod) => prod.id === productId);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  if (!PRODUCT) {
    return (
      <Box sx={{ padding: "var(--space-lg)", textAlign: "center" }}>
        <Typography variant="h6">Product not found</Typography>
      </Box>
    );
  }

  const SIMILAR_PRODUCTS = PRODUCTS.filter(
    (prod) => prod.category === PRODUCT.category && prod.id !== PRODUCT.id,
  ).slice(0, 5); // get up to 5 similar products

  const handleCopyDetails = () => {
    const details = `Seller contact details:\nEmail: ${PRODUCT.seller_email || "Not provided"}\nPhone: ${PRODUCT.seller_phone || "Not provided"}\nWhatsApp: ${PRODUCT.seller_phone || "Not provided"}`;
    navigator.clipboard.writeText(details);
    setContactDialogOpen(false);
  };
  return (
    <>
      {" "}
      <Helmet>
        <title>{PRODUCT.product_name} - Marketplace</title>
        <meta
          name="description"
          content={PRODUCT.description?.slice(0, 160) || "Product details"}
        />
      </Helmet>
      <Box>
        {" "}
        <DetailPageHeader heading={PRODUCT.product_name} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "var(--space-lg) 0",
          }}
        >
          <Box
            component="img"
            src={PRODUCT.primary_image}
            alt={PRODUCT.product_name}
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-2xs)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <Typography variant="body1" color="text.secondary">
            Posted {formatTimeAgo(PRODUCT.date_posted)} in {PRODUCT.location}
          </Typography>
          <Typography variant="h5">{PRODUCT.product_name}</Typography>
          <Typography variant="h6" color="text.secondary">
            {formatMoney(PRODUCT.price, PRODUCT.currency)}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "85% 10%",
              gap: "var(--space-2xs)",
            }}
          >
            <Button
              variant="contained"
              onClick={() => setContactDialogOpen(true)}
            >
              Contact Seller
            </Button>
            <Button variant="outlined" sx={{ minWidth: "32px", padding: 0 }}>
              <MoreVert />
            </Button>
            <Dialog
              open={contactDialogOpen}
              onClose={() => setContactDialogOpen(false)}
            >
              <DialogContent>
                <Typography variant="h6">Seller contact details</Typography>
                <Typography variant="body1">
                  Email: {PRODUCT.seller_email || "Not provided"}
                </Typography>
                <Typography variant="body1">
                  Phone: {PRODUCT.seller_phone || "Not provided"}
                </Typography>
                <Typography variant="body1">
                  WhatsApp: {PRODUCT.seller_phone || "Not provided"}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="text"
                  onClick={handleCopyDetails}
                  startIcon={<CopyAllIcon />}
                >
                  Copy Details
                </Button>
              </DialogActions>
            </Dialog>
          </Box>

          <Typography variant="body1" fontWeight={"var(--fw-bold)"}>
            Description
          </Typography>
          <Typography variant="body" color="text.secondary">
            {PRODUCT.description}
          </Typography>
          <Divider />
        </Box>
        {/* similar products section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-md)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <Typography variant="h6">Similar listings</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {SIMILAR_PRODUCTS.length > 0 ? (
              SIMILAR_PRODUCTS.map((prod) => (
                <MarketListItem key={prod.id} marketItem={prod} />
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No similar listings found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ProductDetail;
