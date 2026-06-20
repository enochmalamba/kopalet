import { useEffect, useState, useRef, useCallback } from "react";
import PageFilters from "../components/PageFilters";
import axiosInstance from "../api/axios";
import GeneralPost from "../components/GeneralPost";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";
import MarketplaceBanner from "../components/MarketplaceBanner";
import AdBanner from "../components/AdBanner";
import SEO from "../components/SEO";
import { Button, Typography } from "@mui/material";

const INSERT_EVERY = 5;

function Home() {
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
        `/v1/feed?view=home&page=${pageToFetch}`,
      );

      // market_item type items are excluded from the linear feed for now -
      // the marketplace banner handles that promotion separately
      const listingsOnly = data.data.filter(
        (item) => item.type !== "market_item",
      );

      setFeed((prev) =>
        isInitial ? listingsOnly : [...prev, ...listingsOnly],
      );
      setLastPage(data.meta.last_page);
    } catch (error) {
      console.error(error);
      if (isInitial) {
        setFeedError("Failed to load posts.");
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

  // Builds the render list with the marketplace banner / ad blocks
  // spliced in every INSERT_EVERY items. First special block is the
  // marketplace banner, every block after that is an ad.
  const buildRenderItems = () => {
    const result = [];
    let specialBlockCount = 0;

    feed.forEach((item, index) => {
      result.push({
        kind: "listing",
        item,
        key: `listing-${item.type}-${item.id}`,
      });

      const isInsertPoint = (index + 1) % INSERT_EVERY === 0;
      if (isInsertPoint) {
        specialBlockCount += 1;
        if (specialBlockCount === 1) {
          result.push({
            kind: "marketplace_banner",
            key: "marketplace-banner",
          });
        } else {
          result.push({ kind: "ad", key: `ad-${specialBlockCount}` });
        }
      }
    });

    return result;
  };

  const renderItems = buildRenderItems();

  return (
    <>
      <SEO
        title="Home - Kopalet"
        description="Discover jobs, market items, posts, and opportunities on Kopalet."
        url="/home"
      />
      <PageFilters />
      {loadingFeed && (
        <>
          <LoadingStates type="post" />
          <LoadingStates type="post" />
        </>
      )}
      {!loadingFeed && feedError && (
        <div className="empty-state">
          <Typography variant="h4">Ooops!</Typography>
          <Typography>Something went wrong. We're working on it.</Typography>
          <Button
            variant="outlined"
            onClick={retryInitial}
            sx={{ fontSize: "var(--fs-lg)", mt: 5 }}
          >
            Retry
          </Button>
        </div>
      )}
      {!loadingFeed && !feedError && feed.length === 0 && (
        <div className="empty-state">
          <Typography variant="h4">No posts yet</Typography>
          <Typography>
            Be the first to share an update or opportunity.
          </Typography>
        </div>
      )}
      {!loadingFeed &&
        !feedError &&
        renderItems.map((entry) => {
          if (entry.kind === "marketplace_banner") {
            return <MarketplaceBanner key={entry.key} />;
          }

          if (entry.kind === "ad") {
            return <AdBanner key={entry.key} />;
          }

          // entry.kind === "listing"
          const { item } = entry;

          if (item.type === "job") {
            return <JobCard key={entry.key} job={item} />;
          }

          // type === "post" (only type in use for now)
          return <GeneralPost key={entry.key} post={item} />;
        })}
      {/* Sentinel for infinite scroll - stays mounted even while loading more */}
      {!loadingFeed && !feedError && page < lastPage && (
        <div ref={sentinelRef} style={{ height: "1px" }} />
      )}
      {loadingMore && <LoadingStates type="post" />}
    </>
  );
}

export default Home;
