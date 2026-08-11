import SEO from "../components/SEO";
import UnderDevelopment from "../components/UnderDevelopment";

function Communities() {
  const community = {
    name: "k/WrittingTechniques",
    community_photo: "https://i.ytimg.com/vi/OTfJDFt2TLY/maxresdefault.jpg",
    community_members_profiles: [
      "https://mui.com/static/images/avatar/1.jpg",
      "https://mui.com/static/images/avatar/2.jpg",
      "https://mui.com/static/images/avatar/3.jpg",
    ],
    members_count: 100,
  };
  return (
    <>
      <SEO
        title="Communities - Kopalet"
        description="Explore Kopalet communities, join discussions, and connect with professionals."
        url="/communities"
      />
      <UnderDevelopment page={"Communities"} />
    </>
  );
}

export default Communities;
