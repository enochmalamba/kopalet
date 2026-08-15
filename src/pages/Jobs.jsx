import { useState, useEffect, useRef, useCallback } from "react";
import SEO from "../components/SEO";
import axiosInstance from "../api/axios";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";
import FeedbackState from "../components/FeedbackState";
import Box from "@mui/material/Box";
import PageWrapper from "../components/layouts/PageWrapper/PageWrapper";

function Jobs() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [feedError, setFeedError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetchFeed = async (pageToFetch, isInitial = false) => {
    try {
      if (isInitial) {
        setLoadingFeed(true);
        setFeedError(null);
      } else {
        setLoadingMore(true);
        setLoadMoreError(false);
      }

      const { data } = await axiosInstance.get(
        `/v1/feed?view=vacancies&page=${pageToFetch}`,
      );

      setFeed((prev) => (isInitial ? data.data : [...prev, ...data.data]));
      setLastPage(data.meta.last_page);
      setPage(pageToFetch);
    } catch (error) {
      console.error(error);
      if (isInitial) {
        setFeedError("Failed to load vacancies.");
        setFeed([]);
      } else {
        // don't let the sentinel keep retrying a broken request in a loop
        setLoadMoreError(true);
      }
    } finally {
      setLoadingFeed(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchFeed(1, true);
  }, []);

  const loadMore = useCallback(() => {
    if (loadingMore || loadingFeed || loadMoreError) return;
    if (page >= lastPage) return;

    fetchFeed(page + 1, false);
  }, [page, lastPage, loadingMore, loadingFeed, loadMoreError]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );

    observerRef.current.observe(sentinelRef.current);

    return () => observerRef.current?.disconnect();
  }, [loadMore]);

  const retryInitial = () => {
    fetchFeed(1, true);
  };

  const retryLoadMore = () => {
    fetchFeed(page + 1, false);
  };

  return (
    <>
      <SEO
        title="Vacancies - Kopalet"
        description="Browse the latest job vacancies on Kopalet and apply to opportunities that fit your skills."
        url="/vacancies"
      />
      <PageWrapper>
        {loadingFeed && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "calc(var(--space-lg) * 8)",
            }}
          >
            <LoadingStates component="spinner" />
          </Box>
        )}

        {!loadingFeed && feedError && (
          <FeedbackState
            icon="cloud-offline-outline"
            title="Couldn't load vacancies"
            description="Check your connection and try again."
            primaryAction={{ label: "Retry", onClick: retryInitial }}
          />
        )}

        {!loadingFeed && !feedError && feed.length === 0 && (
          <FeedbackState
            icon="briefcase-outline"
            title="No vacancies right now"
            description="New jobs go up daily. Check back soon, or tell us what you're looking for."
            primaryAction={{ label: "Refresh", onClick: retryInitial }}
          />
        )}

        {!loadingFeed &&
          !feedError &&
          feed.map((job) => <JobCard key={job.id} job={job} />)}

        {!loadingFeed && !feedError && page < lastPage && !loadMoreError && (
          <div ref={sentinelRef} style={{ height: "1px" }} />
        )}

        {loadingMore && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "var(--space-lg)",
            }}
          >
            <LoadingStates component="spinner" />
          </Box>
        )}

        {loadMoreError && (
          <FeedbackState
            icon="cloud-offline-outline"
            title="Couldn't load more"
            description="Check your connection and try again."
            primaryAction={{ label: "Retry", onClick: retryLoadMore }}
            sx={{ minHeight: "auto", py: 3 }}
          />
        )}
      </PageWrapper>
    </>
  );
}

export default Jobs;
