import { Helmet } from "react-helmet";
import PageFilters from "../components/PageFilters";
function Home() {
  return (
    <>
      {" "}
      <Helmet>
        <title>Home - Kopalet</title>
      </Helmet>
      <PageFilters />
      <div>Home Page Content</div>
      <div
        style={{
          height: "110vh",
          width: "80px",
          background: "var(--primary)",
        }}
      ></div>
    </>
  );
}

export default Home;
