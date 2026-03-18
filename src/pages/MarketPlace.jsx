import MarketListItem from "../components/MarketListItem";
function MarketPlace() {
  const marketItem = {
    name: "Men's Stylish Set ",
    description:
      "Dope looking set for men. Available in different color pallets. Deliver only around Lilongwe 49",
    image:
      "https://i.pinimg.com/1200x/b3/05/3b/b3053b368ff570dd2dbf088790c5b850.jpg",
    price: 78000,
    currency: "MWK",
  };
  return (
    <>
      <h2>MarketPlace</h2>
      <MarketListItem marketItem={marketItem} />
      <MarketListItem marketItem={marketItem} />
    </>
  );
}
export default MarketPlace;
