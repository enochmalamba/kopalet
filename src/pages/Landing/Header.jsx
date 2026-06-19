import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box component={"header"}>
      <div className="logo">Kopalet</div>
      <Box style={{ display: "flex !important", gap: "var(--space-sm)" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="outlined">Log in</Button>
        </Link>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button variant="contained">Register</Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
