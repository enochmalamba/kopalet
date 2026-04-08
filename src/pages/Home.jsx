import { Helmet } from "react-helmet-async";
import PageFilters from "../components/PageFilters";

import JobPost from "../components/JobPost";
import GeneralPost from "../components/GeneralPost";
import JobCard from "../components/JobCard";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>
      <GeneralPost />
      <PageFilters />
      <JobPost />
      <JobCard />
    </>
  );
}

export default Home;
