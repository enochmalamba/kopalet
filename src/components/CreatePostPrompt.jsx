import { Box, Avatar, Typography, Divider } from "@mui/material";

function CreatePostPrompt({ user, onOpenComposer }) {
  const openComposer = (initialTab = "text") => {
    onOpenComposer?.(initialTab);
  };

  return (
    <Box
      sx={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border)",
        borderRadius: "var(--border-radius-lg)",
        marginBottom: 3,
        overflow: "hidden",
      }}
    >
      {/* Trigger row */}
      <Box
        role="button"
        tabIndex={0}
        onClick={() => openComposer("text")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") openComposer("text");
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "var(--space-sm)",
          cursor: "pointer",
          "&:hover": { backgroundColor: "var(--bg-hover, rgba(0,0,0,0.04))" },
        }}
      >
        <Avatar
          src={user?.avatarUrl || "/user-icon.jpg"}
          sx={{ flexShrink: 0 }}
        />
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "var(--border)" }}
        />
        <Typography color="text.secondary" noWrap>
          {user
            ? "Share a tip, job lead, or resource…"
            : "Join the community to share what you know"}
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "var(--border)" }} />

      {/* Action row */}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          padding: "var(--space-xs) var(--space-sm)",
        }}
      >
        <Box
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            openComposer("image");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              openComposer("image");
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            padding: "4px 10px",
            borderRadius: "var(--border-radius-md)",
            cursor: "pointer",
            "&:hover": { backgroundColor: "var(--bg-hover, rgba(0,0,0,0.04))" },
          }}
        >
          <ion-icon
            name="images-outline"
            style={{ fontSize: "20px" }}
            color="var(--text-secondary)"
          />
          <Typography variant="body2" color="text.secondary">
            Photos
          </Typography>
        </Box>

        <Box
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            openComposer("document");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.stopPropagation();
              openComposer("document");
            }
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            padding: "4px 10px",
            borderRadius: "var(--border-radius-md)",
            cursor: "pointer",
            "&:hover": { backgroundColor: "var(--bg-hover, rgba(0,0,0,0.04))" },
          }}
        >
          <ion-icon
            name="document-text-outline"
            style={{ fontSize: "20px" }}
            color="var(--text-secondary)"
          />
          <Typography variant="body2" color="text.secondary">
            Document
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CreatePostPrompt;
