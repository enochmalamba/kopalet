// components/AuthPromptModal.jsx
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/sessionContext";

const REASON_COPY = {
  like: {
    title: "Log in to like posts",
    body: "Create a free account to like posts and keep track of what interests you.",
  },
  vote: {
    title: "Log in to vote",
    body: "Create a free account to vote on posts and help surface the best content.",
  },
  save: {
    title: "Log in to save items",
    body: "Create a free account to save jobs, posts, and listings for later.",
  },
  comment: {
    title: "Log in to comment",
    body: "Join Kopalet to join the conversation and connect with others.",
  },
  apply: {
    title: "Log in to apply",
    body: "Create a free account to apply for jobs and scholarships.",
  },
  message: {
    title: "Log in to send messages",
    body: "Create a free account to message other users on Kopalet.",
  },
  session_expired: {
    title: "Session expired",
    body: "Your session has ended. Please log in again to continue.",
  },
  default: {
    title: "Get full access ",
    body: "Create a free account to list jobs and market items, share thoughts, and many more.",
  },
};

export default function AuthPromptModal() {
  const navigate = useNavigate();
  const { authModalOpen, authModalReason, setAuthModalOpen } = useSession();

  const copy = REASON_COPY[authModalReason] || REASON_COPY.default;

  const handleClose = () => setAuthModalOpen(false);

  const handleLogin = () => {
    handleClose();
    navigate("/login", { state: { from: window.location.pathname } });
  };

  const handleSignup = () => {
    handleClose();
    navigate("/register", { state: { from: window.location.pathname } });
  };

  return (
    <Dialog
      open={authModalOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 2, p: 1 } }}
    >
      <IconButton
        onClick={handleClose}
        sx={{ zIndex: 1, position: "absolute", top: 8, right: 8 }}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <DialogContent sx={{ pt: 4, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {copy.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {copy.body}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ flexDirection: "column", gap: 1, px: 3, pb: 3 }}>
        <Button fullWidth variant="contained" onClick={handleSignup}>
          Create an account
        </Button>
        <Button fullWidth variant="text" onClick={handleLogin}>
          I already have an account — Log in
        </Button>
      </DialogActions>
    </Dialog>
  );
}
