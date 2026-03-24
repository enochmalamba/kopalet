import { Helmet } from "react-helmet";
import PageFilters from "../components/PageFilters";
import JobPost from "../components/JobPost";
function Home() {
  return (
    <>
      {" "}
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>
      <PageFilters />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
      <JobPost />
    </>
  );
}

export default Home;
