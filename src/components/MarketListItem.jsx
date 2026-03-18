import "./MarketListItem.css";

function MarketListItem({ marketItem }) {
  const formatNumber = (num) =>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="market-list-item">
      <img src={marketItem.image} alt={marketItem.name} />
      <h3>{marketItem.name}</h3>
      <p>
        {marketItem.currency} {formatNumber(marketItem.price)}
      </p>
    </div>
  );
}

export default MarketListItem;
