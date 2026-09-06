import { Box } from "@mui/material";

function PageWrapper({ children, sx }) {
  return (
    <Box
      component="article"
      sx={{
        flex: 1,
        minWidth: 0,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        margin: "0 auto",
        padding: 0,
        overflowX: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default PageWrapper;
