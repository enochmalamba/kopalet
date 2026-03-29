import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Divider from "@mui/material/Divider";

const DetailPageHeader = ({ heading }) => {
  const navigate = useNavigate();
  const handleBackClick = () => navigate(-1); // later on will work on this to navigate to the previous page oh home page if the user came from a link outside the app
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "var(--space-md)",
        marginBottom: "var(--space-md)",
      }}
    >
      <IconButton onClick={handleBackClick}>
        <ArrowBack />
      </IconButton>
      <Typography
        variant="h7"
        noWrap
        sx={{
          minWidth: 0,
          lineHeight: 1,
          m: 0,
        }}
      >
        {heading}
      </Typography>{" "}
      <Divider sx={{ flexGrow: 1 }} />
    </Box>
  );
};

export default DetailPageHeader;
