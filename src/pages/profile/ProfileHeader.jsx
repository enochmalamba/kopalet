import {
  Avatar,
  Box,
  Typography,
  Stack,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { formatCount } from "../../utils/format";

function ProfileHeader({
  display_name,
  username,
  avatar_url,
  bio,
  followers,
  listings_count,
  isOwnProfile,
  isFollowing,
  onFollowToggle,
  onEditClick,
  onMessageClick,
  onShareClick,
  onReportClick,
  onBlockClick,
}) {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const menuOpen = Boolean(menuAnchor);

  const chipStyles = {
    display: "flex",
    flexDirection: "column",
    padding: "var(--space-2xs) var(--space-xs)",
    borderRadius: "var(--radius-lg)",
    textTransform: "capitalize",
  };
  return (
    <Box
      sx={{
        width: "100%",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 2,
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Avatar
          src={avatar_url || "/user-icon.jpg"}
          alt={display_name || username}
          sx={{ width: { xs: 72, sm: 96 }, height: { xs: 72, sm: 96 } }}
        />

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="h6"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {display_name || username}
          </Typography>

          {bio && <Typography variant="body2">{bio}</Typography>}

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mt: 1,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Typography variant="body2" sx={chipStyles}>
              <strong>{formatCount(followers) ?? 0}</strong> followers
            </Typography>
            <Typography variant="body2" sx={chipStyles}>
              <strong>{formatCount(listings_count) ?? 0}</strong> listings
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {isOwnProfile ? (
          <Tooltip title="Edit profile">
            <IconButton onClick={onEditClick} vari aria-label="edit profile">
              <ion-icon name="pencil-outline" style={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>
        ) : (
          <>
            <Button
              variant={isFollowing ? "outlined" : "contained"}
              onClick={onFollowToggle}
              size="small"
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>

            <Button
              variant="outlined"
              onClick={onMessageClick}
              size="small"
              sx={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ion-icon name="mail-outline" style={{ fontSize: "18px" }} />
              Send Mail
            </Button>
          </>
        )}

        <Tooltip title="Share">
          <IconButton onClick={onShareClick} aria-label="share profile">
            <ion-icon
              name="share-outline"
              style={{ fontSize: "24px" }}
            ></ion-icon>
          </IconButton>
        </Tooltip>

        <IconButton
          onClick={(e) => setMenuAnchor(e.currentTarget)}
          aria-label="more options"
          aria-controls={menuOpen ? "profile-more-menu" : undefined}
          aria-haspopup="true"
        >
          <ion-icon name="ellipsis-horizontal" style={{ fontSize: "24px" }} />
        </IconButton>

        <Menu
          id="profile-more-menu"
          anchorEl={menuAnchor}
          open={menuOpen}
          onClose={() => setMenuAnchor(null)}
        >
          {!isOwnProfile && [
            <MenuItem
              key="report"
              onClick={() => {
                setMenuAnchor(null);
                onReportClick?.();
              }}
            >
              <ListItemIcon>
                <ion-icon name="flag-outline" style={{ fontSize: "18px" }} />
              </ListItemIcon>
              <ListItemText>Report profile</ListItemText>
            </MenuItem>,
            <MenuItem
              key="block"
              onClick={() => {
                setMenuAnchor(null);
                onBlockClick?.();
              }}
            >
              <ListItemIcon>
                <ion-icon name="ban-outline" style={{ fontSize: "18px" }} />
              </ListItemIcon>
              <ListItemText>Block user</ListItemText>
            </MenuItem>,
          ]}
          {isOwnProfile && (
            <MenuItem
              onClick={() => {
                setMenuAnchor(null);
                onShareClick?.();
              }}
            >
              <ListItemIcon>
                <ion-icon name="link-outline" style={{ fontSize: "18px" }} />
              </ListItemIcon>
              <ListItemText>Copy profile link</ListItemText>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </Box>
  );
}

export default ProfileHeader;
