import { Box, Button } from "@mui/material";

function Header() {
  return (
    <Box component={"header"}>
      <div className="logo">KOPALET</div>
      <Box style={{ display: "flex !important", gap: "var(--space-sm)" }}>
        <Button variant="outlined" href="/login">
          Log in
        </Button>

        <Button variant="contained" href="/signup">
          Register
        </Button>
      </Box>
    </Box>
  );
}

export default Header;
