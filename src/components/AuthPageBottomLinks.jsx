import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import OpenInNew from "@mui/icons-material/OpenInNew";
import { Height } from "@mui/icons-material";
const AuthPageBottomLinks = () => {
  return (
    <Stack
      direction={"row"}
      gap={"var(--space-sm)"}
      className="auth__page__links"
    >
      <Link to={"/legal/privacy"} style={linkStyles} className="auth-link">
        Privacy <OpenInNew sx={iconStyles} />
      </Link>
      <Link to={""} style={linkStyles} className="auth-link">
        Terms <OpenInNew sx={iconStyles} />
      </Link>
      <Link style={linkStyles} className="auth-link">
        Help <OpenInNew sx={iconStyles} />
      </Link>
    </Stack>
  );
};

const linkStyles = {
  display: "flex",
  alignItems: "center",
  gap: "var(--space-2xs)",
  "&:hover": {
    textDecoration: "underline",
  },
};
const iconStyles = {
  width: "18px",
  Height: "18px",
};
export default AuthPageBottomLinks;
