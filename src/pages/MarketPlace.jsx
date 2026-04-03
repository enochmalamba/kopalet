import { useState, useEffect } from "react";
import { PRODUCTS } from "../data";
import PageFilters from "../components/PageFilters";
import MarketListItem from "../components/MarketListItem";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";

function MarketPlace() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const generateCategories = () => {
    const uniqueCategories = new Set(PRODUCTS.map((prod) => prod.category));

    const cleanedCategories = [...uniqueCategories].filter(
      (cat) => cat !== "All",
    );

    setCategories(["All", ...cleanedCategories]);
  };

  useEffect(() => {
    generateCategories();
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? PRODUCTS
      : PRODUCTS.filter((prod) => prod.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Market Place - Kopalet</title>
      </Helmet>

      <h2>Market Place</h2>

      <PageFilters
        filters={categories.map((cat) => ({ id: cat, label: cat }))}
        defaultActive={["All"]}
        onChange={(selected) => {
          if (!selected?.length) return; // safety check
          setSelectedCategory(selected[0]);
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {filteredItems.map((prod) => (
          <MarketListItem key={prod.id} marketItem={prod} />
        ))}
      </Box>
    </>
  );
}

export default MarketPlace;
