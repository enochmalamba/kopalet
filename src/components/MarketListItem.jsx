import "./MarketListItem.css";
import { Link } from "react-router-dom";
import { formatMoney, formatTimeAgo } from "../utils/format.js";
import Typography from "@mui/material/Typography";

function MarketListItem({ marketItem }) {
  return (
    <Link
      className="market-list-item"
      to={`/marketplace/product/${marketItem.id}`}
    >
      <img src={marketItem.primary_image_url} alt={marketItem.title} />
      <Typography color="text.secondary" noWrap sx={{ maxWidth: "100%" }}>
        {marketItem.title}
      </Typography>

      <Typography>{formatMoney(marketItem.price, "MWK")}</Typography>

      <Typography variant="caption" color="var(--muted)">
        {formatTimeAgo(marketItem.created_at)} - {marketItem.location}
      </Typography>
    </Link>
  );
}

export default MarketListItem;
