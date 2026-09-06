import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function BackButton({ fallback = "/" }) {
  const navigate = useNavigate();

  const hasHistory = window.history.state?.idx > 0;

  const handleBack = () => {
    if (hasHistory) navigate(-1);
    else navigate(fallback);
  };

  return (
    <Button
      onClick={handleBack}
      variant="outlined"
      sx={{
        margin: "var(--space-sm)",
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-xs)",
      }}
    >
      <ion-icon name="arrow-back" style={{ fontSize: "20px" }} />
      {hasHistory ? "Back" : "Go to home"}
    </Button>
  );
}

export default BackButton;
