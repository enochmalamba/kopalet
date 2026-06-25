import { useState, useEffect, useRef, useCallback } from "react";
import SEO from "../components/SEO";
import axiosInstance from "../api/axios";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";
import Box from "@mui/material/Box";

function Vacancies() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [feedError, setFeedError] = useState(null);

  const observerRef = useRef(null);
  const sentinelRef = useRef(null);

  const fetchFeed = async (pageToFetch, isInitial = false) => {
    try {
      if (isInitial) {
        setLoadingFeed(true);
        setFeedError(null);
      } else {
        setLoadingMore(true);
      }

      const { data } = await axiosInstance.get(
        `/v1/feed?view=vacancies&page=${pageToFetch}`,
      );

      setFeed((prev) => (isInitial ? data.data : [...prev, ...data.data]));
      setLastPage(data.meta.last_page);
    } catch (error) {
      console.error(error);
      if (isInitial) {
        setFeedError("Failed to load vacancies.");
        setFeed([]);
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
    if (loadingMore || loadingFeed) return;
    if (page >= lastPage) return;

    const nextPage = page + 1;
    setPage(nextPage);
    fetchFeed(nextPage, false);
  }, [page, lastPage, loadingMore, loadingFeed]);

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
    setPage(1);
    fetchFeed(1, true);
  };

  return (
    <>
      <SEO
        title="Vacancies - Kopalet"
        description="Browse the latest job vacancies on Kopalet and apply to opportunities that fit your skills."
        url="/vacancies"
      />

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
        <div className="empty-state">
          <h2>Could not load vacancies</h2>
          <p>{feedError}</p>
          <button onClick={retryInitial}>Retry</button>
        </div>
      )}

      {!loadingFeed && !feedError && feed.length === 0 && (
        <div className="empty-state">
          <h2>No vacancies yet</h2>
          <p>Check back later for new opportunities.</p>
        </div>
      )}

      {!loadingFeed &&
        !feedError &&
        feed.map((job) => <JobCard key={job.id} job={job} />)}

      {!loadingFeed && !feedError && page < lastPage && (
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
    </>
  );
}

export default Vacancies;
