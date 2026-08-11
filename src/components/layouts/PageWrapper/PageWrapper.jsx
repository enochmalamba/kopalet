import { Box } from "@mui/material";

function PageWrapper({ children }) {
  return (
    <Box
      component={"article"}
      sx={{
        flex: 1,
        minWidth: 0,
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        margin: "var(--space-md) auto",
        padding: "var(--space-md) 0",
      }}
    >
      {children}
    </Box>
  );
}

export default PageWrapper;
