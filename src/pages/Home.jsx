import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import PageFilters from "../components/PageFilters";
import axiosInstance from "../api/axios";
import JobPost from "../components/JobPost";
import GeneralPost from "../components/GeneralPost";
import JobCard from "../components/JobCard";

function Home() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching feed and users...");

        // 1. Fetch both files simultaneously
        const [feedRes, usersRes] = await Promise.all([
          axiosInstance.get("/feed.json"),
          axiosInstance.get("/users.json"),
        ]);

        const rawFeed = feedRes.data.feed || [];
        const usersList = usersRes.data.users || usersRes.data || [];

        // 2. Merge user details into the feed listings
        const mergedData = rawFeed.map((item) => {
          // Use .toString() to ensure "usr_0" matches correctly regardless of type
          const userDetails = usersList.find(
            (u) => u.id?.toString() === item.listing.user_id?.toString(),
          );

          return {
            ...item,
            listing: {
              ...item.listing,
              // Match avatar_url from users.json
              user: userDetails || { name: "Unknown User", avatar_url: null },
            },
          };
        });

        setFeed(mergedData);
        console.log("Feed items loaded:", mergedData.length);
      } catch (err) {
        console.error("Fetch error:", err);
        setFeed([]); // Stop loading state on error
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>

      {/* Static components at the top of the feed */}
      <GeneralPost />
      <PageFilters />
      <JobPost />

      {/* Dynamic Feed Content */}
      {feed.length === 0 ? (
        <p style={{ textAlign: "center", padding: "20px" }}>Loading feed...</p>
      ) : (
        feed.map((item) => {
          const type = item.listing?.type;

          // Render General Posts
          if (type === "post") {
            return (
              <GeneralPost
                key={item.listing.id}
                isPostView={false}
                title={item.listing.title}
                content={item.listing.description}
                userName={item.listing.user.name}
                userAvatar={item.listing.user.avatar_url}
                audience={item.listing.audience}
                createdAt={item.listing.created_at}
                postMedia={item.listing.post_media}
              />
            );
          }

          // Render Vacancies/Opportunities
          if (type === "job") {
            return <JobCard key={item.listing.id} data={item} />;
          }

          return null;
        })
      )}
    </>
  );
}

export default Home;
