import "./CommunityCard.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
function CommunityCard({ community }) {
  return (
    <div className="community-card">
      <div className="community-card-header">
        <img src={community.community_photo} alt={community.name} />
        <div className="ccd-desc">
          <h3>{community.name}</h3>
          <div className="ccd-actions">
            <AvatarGroup
              spacing="medium"
              total={community.members_count}
              sx={{
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  fontSize: 12,
                  color: "var(--text-muted)",
                  bgColor: "var(--bg)",
                },
              }}
            >
              {community.community_members_profiles.map(
                (profile_pic, index) => (
                  <Avatar key={index} alt="Member name" src={profile_pic} />
                ),
              )}
            </AvatarGroup>
            <div className="community-card-buttons">
              <Button size="small" variant="outlined">
                Join
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CommunityCard;
