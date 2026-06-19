import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import PageFilters from "../components/PageFilters";
import axiosInstance from "../api/axios";
import JobPost from "../components/JobPost";
import GeneralPost from "../components/GeneralPost";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";
import { Button, Typography } from "@mui/material";

function Home() {
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(null);

  const fetchFeed = async () => {
    try {
      setLoadingFeed(true);
      setFeedError(null);

      const { data } = await axiosInstance.get("/v1/posts");
      setFeed(data.data);
    } catch (error) {
      console.error(error);
      setFeedError("Failed to load posts.");
      setFeed([]);
    } finally {
      setLoadingFeed(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>

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
            onClick={fetchFeed}
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
        feed.map((post) => <GeneralPost key={post.id} post={post} />)}
    </>
  );
}

export default Home;
