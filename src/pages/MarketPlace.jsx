import { useState, useEffect } from "react";
import MarketListItem from "../components/MarketListItem";
import { Helmet } from "react-helmet-async";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import axiosInstance from "../api/axios.js";

function MarketPlace() {
  const [items, setItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    axiosInstance
      .get(`/v1/market-items?page=${page}`)
      .then((response) => {
        if (!isMounted) return;

        const newItems = response.data.data || [];

        setItems((prev) => (page === 1 ? newItems : [...prev, ...newItems]));

        const meta = response.data.meta;
        setHasMore(meta.current_page < meta.last_page);

        setLoading(false);
        setLoadingMore(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.log(err);
        setError("Failed to load marketplace items.");
        setLoading(false);
        setLoadingMore(false);
      });

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Market Place - Kopalet</title>
      </Helmet>

      <Typography variant="h5" mb={2}>
        Market Place
      </Typography>

      {error && (
        <Box sx={{ my: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)", // mobile: always 2 columns
              sm: "repeat(3, 1fr)", // tablet: 3
              md: "repeat(3, 1fr)", // desktop: 3
              lg: "repeat(3, 1fr)", // wide: 3
            },
            gap: { xs: 1, sm: 2 },
          }}
        >
          {items.map((item) => (
            <MarketListItem key={item.id} marketItem={item} />
          ))}
        </Box>
      )}

      {!loading && items.length === 0 && (
        <Typography mt={3} color="text.secondary">
          No items available.
        </Typography>
      )}

      {!loading && hasMore && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <Button
            variant="contained"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        </Box>
      )}
    </>
  );
}

export default MarketPlace;
