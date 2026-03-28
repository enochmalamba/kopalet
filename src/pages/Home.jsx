import { Helmet } from "react-helmet";
import PageFilters from "../components/PageFilters";
import PostHeader from "../components/PostHeader";
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
      <PostHeader
        avatarSrc={"https://avatar.iran.liara.run/public/96"}
        authorName={"Hamed Henderson"}
        timePosted={"1 day"}
        // isPromoted={true}
        audience={"Vacancy"}
      />
      <JobPost />
      <Post />
      <Post />
    </>
  );
}

export default Home;
