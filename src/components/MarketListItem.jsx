import "./MarketListItem.css";
import { Link } from "react-router-dom";
import { formatMoney } from "../utils/format.js";

function MarketListItem({ marketItem }) {
  return (
    <Link className="market-list-item" to={`/product/${marketItem.id}`}>
      <img src={marketItem.primary_image} alt={marketItem.name} />
      <h3>{marketItem.product_name}</h3>
      <p>{formatMoney(marketItem.price, marketItem.currency)}</p>
    </Link>
  );
}

export default MarketListItem;
