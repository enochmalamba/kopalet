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
      <img src={marketItem.media[0].url} alt={marketItem.name} />

      <Typography
        fontSize={"var(--fs-sm)"}
        color="text.secondary"
        noWrap
        sx={{ maxWidth: "100%" }}
      >
        {marketItem.product_name}
      </Typography>

      <Typography fontSize={"var(--fs-base)"}>
        {formatMoney(marketItem.price, "MWK")}
      </Typography>

      <Typography variant="caption" color="var(--muted)">
        {formatTimeAgo(marketItem.created_at)}
      </Typography>
    </Link>
  );
}

export default MarketListItem;
