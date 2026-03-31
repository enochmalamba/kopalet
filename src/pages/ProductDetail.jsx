import { useParams } from "react-router-dom";
import DetailPageHeader from "../components/DetailPageHeader.jsx";
import PostHeader from "../components/PostHeader.jsx";
import Box from "@mui/material/Box";
import MarketListItem from "../components/MarketListItem.jsx";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { PRODUCTS } from "../data.js";
function ProductDetail() {
  const productId = useParams().id;
  const PRODUCT = PRODUCTS.find((prod) => prod.id === productId);

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
  return (
    <Box>
      <DetailPageHeader heading={PRODUCT.product_name} />
      <PostHeader
        authorName={"John Doe"}
        timePosted={PRODUCT.date_posted}
        avatarSrc={PRODUCT.primary_image}
        audience={"Market listing"}
      />
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
        <Typography variant="h5">{PRODUCT.product_name}</Typography>
        <Typography variant="h6" color="text.secondary">
          {PRODUCT.price}
          {PRODUCT.currency}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {" "}
          Condition: {PRODUCT.condition}; Location: {PRODUCT.location}
        </Typography>
        <Typography variant="body">{PRODUCT.description}</Typography>
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
  );
}

export default ProductDetail;
