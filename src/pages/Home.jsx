import { Helmet } from "react-helmet";
import PageFilters from "../components/PageFilters";
import Post from "../components/Post";
import JobPost from "../components/JobPost";

function Home() {
  return (
    <>
      {" "}
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>{" "}
      <PageFilters />
      <JobPost />
      <Post />
    </>
  );
}

export default Home;
