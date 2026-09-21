import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import PageWrapper from "../../components/layouts/PageWrapper/PageWrapper";
import FeedbackState from "../../components/ui/FeedbackState";
import axiosInstance from "../../api/axios";
import { useSession } from "../../context/sessionContext";
import ProfileHeader from "./ProfileHeader";

const getDisplayName = (u) =>
  [u.first_name, u.last_name].filter(Boolean).join(" ") || u.username;

function Profile() {
  const { userId } = useParams();
  const { user: authUser } = useSession();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // { status }
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        setProfile(null);

        const { data } = await axiosInstance.get(`/v1/users/${userId}`, {
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;
        setProfile(data.data);
      } catch (err) {
        if (controller.signal.aborted || err.code === "ERR_CANCELED") return;
        console.error(err);
        setError({ status: err.response?.status ?? 0 });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProfile();
    return () => controller.abort();
  }, [userId, reloadKey]);

  if (error) {
    const { status } = error;
    return (
      <PageWrapper>
        {status === 404 ? (
          <FeedbackState
            icon="planet-outline"
            code={404}
            title="Profile not found"
            description="This user doesn't exist or has been removed."
            fullPage
          />
        ) : status === 403 ? (
          <FeedbackState
            icon="lock-closed-outline"
            title="This profile is private"
            fullPage
          />
        ) : (
          <FeedbackState
            icon="cloud-offline-outline"
            title="Couldn't load this profile"
            description="Check your connection and try again."
            primaryAction={{
              label: "Retry",
              onClick: () => setReloadKey((k) => k + 1),
            }}
            fullPage
          />
        )}
      </PageWrapper>
    );
  }

  const displayName = profile ? getDisplayName(profile) : "";
  const isOwnProfile = !!profile && authUser?.id === profile.id;

  return (
    <PageWrapper>
      <ProfileHeader
        isLoading={loading}
        display_name={displayName}
        username={profile?.username}
        bio={profile?.bio}
        avatar_url={profile?.avatar_url}
        followers={profile?.followers_count}
        listings_count={profile?.listings_count}
        isOwnProfile={isOwnProfile}
        isFollowing={false}
      />

      {!loading && profile && (
        <>
          <Typography
            variant="body1"
            component="h6"
            sx={{ p: "var(--space-md)" }}
          >
            Posts & Listings by {displayName}
          </Typography>

          <FeedbackState
            icon="construct-outline"
            title="Posts and listings are unavailable"
            description="This service is currently unavailable. Please check back later."
          />
        </>
      )}
    </PageWrapper>
  );
}

export default Profile;
