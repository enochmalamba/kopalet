import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function SettingsNav({ tabs, variant, activePath }) {
  const isMobileList = variant === "mobile-list";

  return (
    <Box
      component="nav"
      sx={
        isMobileList
          ? { padding: "0 16px" }
          : { display: "flex", flexDirection: "column", gap: "2px" }
      }
    >
      {tabs.map((tab) => {
        const isActive = tab.path === activePath;

        return (
          <Link
            key={tab.path}
            to={`/settings/${tab.path}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Box
              sx={
                isMobileList
                  ? {
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      padding: "16px 6px",
                      borderBottom: "1px solid var(--border-color, #ececec)",
                    }
                  : {
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      background: isActive
                        ? "var(--black, #0a0a0a)"
                        : "transparent",
                      color: isActive
                        ? "#fff"
                        : "var(--text-secondary, #5c5c5c)",
                    }
              }
            >
              {isMobileList ? (
                <Box
                  sx={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    background: "var(--gray-50, #fafafa)",
                    border: "1px solid var(--border-color, #e2e2e2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <ion-icon name={tab.icon} style={{ fontSize: "19px" }} />
                </Box>
              ) : (
                <ion-icon name={tab.icon} style={{ fontSize: "18px" }} />
              )}

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontSize: isMobileList ? "15.5px" : "13.5px",
                    fontWeight: 700,
                    color: isMobileList ? "inherit" : "inherit",
                  }}
                >
                  {tab.label}
                </Typography>
                {isMobileList && (
                  <Typography
                    sx={{
                      fontSize: "12.5px",
                      color: "var(--text-tertiary, #9c9c9c)",
                    }}
                  >
                    {tab.description}
                  </Typography>
                )}
              </Box>

              {isMobileList && (
                <ion-icon
                  name="chevron-forward-outline"
                  style={{
                    fontSize: "18px",
                    color: "var(--text-tertiary, #d4d4d4)",
                  }}
                />
              )}
            </Box>
          </Link>
        );
      })}
    </Box>
  );
}

export default SettingsNav;
