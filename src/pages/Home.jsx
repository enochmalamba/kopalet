import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import PageFilters from "../components/PageFilters";
import axiosInstance from "../api/axios";
import JobPost from "../components/JobPost";
import GeneralPost from "../components/GeneralPost";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";

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
          <h2>Could not load feed</h2>
          <p>{feedError}</p>
          <button onClick={fetchFeed}>Retry</button>
        </div>
      )}

      {!loadingFeed && !feedError && feed.length === 0 && (
        <div className="empty-state">
          <h2>No posts yet</h2>
          <p>Be the first to share an update or opportunity.</p>
        </div>
      )}

      {!loadingFeed &&
        !feedError &&
        feed.map((post) => <GeneralPost key={post.id} post={post} />)}
    </>
  );
}

export default Home;
