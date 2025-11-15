import Post from "../components/Post";
import JobPost from "../components/JobPost";
import MarketAd from "../components/MarketAd";
import { Helmet } from "react-helmet";
function Landing() {
  return (
    <>
      <Helmet>
        <title>Home - My App</title>
      </Helmet>
      <Post />
      <JobPost />
      <Post />
      <MarketAd />
      <Post />
      <JobPost />
      <Post />
      <Post />
      <MarketAd />
      <JobPost />
      <JobPost />
      <MarketAd />
      <JobPost />
    </>
  );
}

export default Landing;
