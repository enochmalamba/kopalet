import ProfileHeader from "./ProfileHeader";
import PageWrapper from "../../components/layouts/PageWrapper/PageWrapper";
import { Tab, Tabs, Typography, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingStates from "../../components/LoadingStates";

const user = {
  name: "Xenon Malamba",
  username: "xml",
  bio: "Yo its yo boy XML, the one and only. I am a software engineer and a tech enthusiast. I love to code and build things that make a difference in people's lives. I am also a gamer and a music lover. Follow me for more updates on my projects and adventures.",
  avatar_url:
    "https://i.pinimg.com/736x/6f/8f/fb/6f8ffb3bc39e9ccc2c50cc55d61db0d3.jpg",
  followers: 8947934,
  listings_count: 48590,
};
function Profile() {
  return (
    <>
      <PageWrapper>
        <ProfileHeader
          display_name={user.name}
          bio={user.bio}
          avatar_url={user.avatar_url}
          followers={user.followers}
          listings_count={user.listings_count}
          isFollowing={false}
          isOwnProfile={false}
          username={user.username}
        />
        <Typography
          variant="body1"
          component={"h6"}
          sx={{
            padding: "var(--space-md)",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          Posts & Listings by {user.name}
        </Typography>
        <Box p={2}>
          <LoadingStates component="post" />
          <LoadingStates component="post" />
          <LoadingStates component="post" />
        </Box>
      </PageWrapper>
    </>
  );
}

export default Profile;
