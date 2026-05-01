import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axiosInstance from "../api/axios";
import JobCard from "../components/JobCard";
import LoadingStates from "../components/LoadingStates";
import Box from "@mui/material/Box";
function Vacancies() {
  const [feed, setFeed] = useState([]);
  const [loadingFeed, setLoadingFeed] = useState(true);
  const [feedError, setFeedError] = useState(null);

  const fetchFeed = async () => {
    try {
      setLoadingFeed(true);
      setFeedError(null);

      const { data } = await axiosInstance.get("/v1/vacancies");
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
        <title>Vacancies - Kopalet</title>
      </Helmet>{" "}
      {loadingFeed && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "calc(var(--space-lg) * 8)",
            }}
          >
            <LoadingStates component="spinner" />
          </Box>
        </>
      )}
      {!loadingFeed && feedError && (
        <div className="empty-state">
          <h2>Could not load vacancies</h2>
          <p>{feedError}</p>
          <button onClick={fetchFeed}>Retry</button>
        </div>
      )}
      {!loadingFeed && !feedError && feed.length === 0 && (
        <div className="empty-state">
          <h2>No vacancies yet</h2>
          <p>Be the first to share an update or opportunity.</p>
        </div>
      )}
      {!loadingFeed &&
        !feedError &&
        feed.map((job) => <JobCard key={job.id} job={job} />)}
    </>
  );
}

export default Vacancies;
