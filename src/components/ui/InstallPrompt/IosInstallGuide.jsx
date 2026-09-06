import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import AddBoxIcon from "@mui/icons-material/AddBox";

export default function IosInstallGuide({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Install Kopalet on iPhone/iPad</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <IosShareIcon />
            <Typography variant="body2">
              Tap the Share icon in Safari's toolbar
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <AddBoxIcon />
            <Typography variant="body2">
              Scroll down and tap "Add to Home Screen"
            </Typography>
          </Stack>
          <Typography variant="body2">
            Then tap "Add" in the top right corner
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Got it</Button>
      </DialogActions>
    </Dialog>
  );
}
