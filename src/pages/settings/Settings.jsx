import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import SettingsNav from "../../components/layouts/SettingsNav";

const SETTINGS_TABS = [
  {
    path: "account",
    icon: "person-outline",
    label: "Account",
    description: "Email, phone number",
  },
  {
    path: "security",
    icon: "lock-closed-outline",
    label: "Security",
    description: "Password, account protection",
  },
  {
    path: "notifications",
    icon: "notifications-outline",
    label: "Notifications",
    description: "Email alerts and updates",
  },
  {
    path: "privacy",
    icon: "eye-off-outline",
    label: "Privacy",
    description: "Who can see your info",
  },
];

function Settings() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();

  // "at rest" on mobile means exactly /settings — no sub-tab picked yet
  const atSettingsRoot = location.pathname === "/settings";
  const showMobileList = isMobile && atSettingsRoot;
  const showMobileDetail = isMobile && !atSettingsRoot;

  const activeTab = SETTINGS_TABS.find((t) =>
    location.pathname.startsWith(`/settings/${t.path}`),
  );

  if (showMobileList) {
    return (
      <Box sx={{ marginTop: "var(--space-md)" }}>
        <Box sx={{ padding: "0 16px 8px" }}>
          <Typography
            component="h1"
            sx={{ fontSize: "var(--fs-xxl)", fontWeight: "var(--fw-semibold)" }}
          >
            Settings
          </Typography>
        </Box>
        <SettingsNav tabs={SETTINGS_TABS} variant="mobile-list" />
      </Box>
    );
  }

  if (showMobileDetail) {
    return (
      <Box sx={{ marginTop: "var(--space-md)" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            padding: "12px 16px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <IconButton onClick={() => navigate("/settings")} size="small">
            <ion-icon name="arrow-back-outline" style={{ fontSize: "22px" }} />
          </IconButton>
          <Typography
            sx={{ fontWeight: "var(--fw-semibold)", fontSize: "16px" }}
          >
            {activeTab?.label}
          </Typography>
        </Box>
        <Box sx={{ padding: "16px" }}>
          <Outlet />
        </Box>
      </Box>
    );
  }

  // Desktop: sidebar + content, both always visible
  return (
    <Box sx={{ marginTop: "var(--space-md)" }}>
      <Box sx={{ marginBottom: "24px" }}>
        <Typography
          component="h1"
          sx={{ fontSize: "var(--fs-xxl)", fontWeight: "var(--fw-semibold)" }}
        >
          Settings
        </Typography>
        <Typography>Manage your account, security, and preferences</Typography>
      </Box>

      <Box
        sx={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "32px" }}
      >
        <SettingsNav
          tabs={SETTINGS_TABS}
          variant="desktop-sidebar"
          activePath={activeTab?.path}
        />
        <Box
          sx={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Settings;
