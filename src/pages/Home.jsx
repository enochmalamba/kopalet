import { Helmet } from "react-helmet-async";
import PageFilters from "../components/PageFilters";
import Post from "../components/Post";
import JobPost from "../components/JobPost";
import GeneralPost from "../components/GeneralPost";

function Home() {
  return (
    <>
      {" "}
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>{" "}
      <GeneralPost />
      <PageFilters />
      <JobPost />
      <Post />
    </>
  );
}

export default Home;
