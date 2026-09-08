import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import MarketListItem from "../components/MarketListItem";
import SEO from "../components/SEO";
import FeedbackState from "../components/ui/FeedbackState";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import axiosInstance from "../api/axios.js";
import PageWrapper from "../components/layouts/PageWrapper/PageWrapper.jsx";

function MarketPlace() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const fetchItems = useCallback(async (pageToFetch, isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
        setError(null);
      } else {
        setLoadingMore(true);
        setLoadMoreError(false);
      }

      const { data } = await axiosInstance.get(
        `/v1/market-items?page=${pageToFetch}`,
      );
      const newItems = data.data || [];

      setItems((prev) => (isInitial ? newItems : [...prev, ...newItems]));
      setLastPage(data.meta.last_page);
      setPage(pageToFetch);
    } catch (err) {
      console.error(err);
      if (isInitial) {
        setError("Failed to load marketplace items.");
        setItems([]);
      } else {
        setLoadMoreError(true);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(1, true);
  }, [fetchItems]);

  const retry = () => fetchItems(1, true);
  const loadMore = () => fetchItems(page + 1, false);

  return (
    <>
      <SEO
        title="Marketplace - Kopalet"
        description="Explore local marketplace listings for products and services on Kopalet."
        url="/marketplace"
      />
      <PageWrapper>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <FeedbackState
            icon="cloud-offline-outline"
            title="Couldn't load the marketplace"
            description="Check your connection and try again."
            primaryAction={{ label: "Retry", onClick: retry }}
          />
        )}

        {!loading && !error && items.length === 0 && (
          <FeedbackState
            icon="pricetags-outline"
            title="No listings yet"
            description="Selling something? Get it in front of buyers near you."
            primaryAction={{
              label: "List an item",
              onClick: () => navigate("/marketplace/new"),
            }}
            secondaryAction={{ label: "Refresh", onClick: retry }}
          />
        )}

        {!loading && !error && items.length > 0 && (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
              },
              gap: { xs: 1, sm: 2 },
            }}
          >
            {items.map((item) => (
              <MarketListItem key={item.id} marketItem={item} />
            ))}
          </Box>
        )}

        {!loading && !error && page < lastPage && !loadMoreError && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <Button
              variant="contained"
              onClick={loadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : "Load More"}
            </Button>
          </Box>
        )}

        {loadMoreError && (
          <FeedbackState
            icon="cloud-offline-outline"
            title="Couldn't load more"
            description="Check your connection and try again."
            primaryAction={{ label: "Retry", onClick: loadMore }}
            sx={{ minHeight: "auto", py: 3 }}
          />
        )}
      </PageWrapper>
    </>
  );
}

export default MarketPlace;
