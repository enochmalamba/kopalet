import CommunityCard from "../components/CommunityCard";
import AdBanner from "../components/AdBanner";
import SEO from "../components/SEO";

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
      <h2>Communities</h2>
      <CommunityCard community={community} />
      <CommunityCard community={community} />
      <AdBanner />
    </>
  );
}

export default Communities;
