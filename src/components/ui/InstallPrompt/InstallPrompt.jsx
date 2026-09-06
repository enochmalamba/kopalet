// src/components/InstallPrompt/InstallPrompt.jsx
import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Stack } from "@mui/material";
import { getDevicePlatform } from "../../../utils/platform";
import IosInstallGuide from "./IosInstallGuide";
import InstallArrowOverlay from "./InstallArrowOverlay";

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);
  const [showIosGuide, setShowIosGuide] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const { isIOS, isStandalone } = getDevicePlatform();

  useEffect(() => {
    if (isStandalone) return;
    if (sessionStorage.getItem("kplt_install_dismissed")) return;

    if (isIOS) {
      setVisible(true);
      return;
    }

    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, [isIOS, isStandalone]);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIosGuide(true);
      return;
    }
    if (!deferredPrompt) return;

    setShowArrow(true);
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setShowArrow(false);
    setDeferredPrompt(null);
    setVisible(false);
  };

  const dismiss = () => {
    sessionStorage.setItem("kplt_install_dismissed", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <Card
        sx={{
          position: "fixed",
          bottom: 16,
          left: 16,
          right: 16,
          maxWidth: 420,
          mx: "auto",
          zIndex: 1300,
          borderRadius: "var(--raius-lg)",
          boxShadow: 6,
          p: "var(--space-sm)",
        }}
      >
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700}>
            Install Kopalet for easy access
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, mb: 2 }}
          >
            Get the latest jobs and deals easily in a single tap
          </Typography>
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              fullWidth
              onClick={dismiss}
              sx={{ borderRadius: 2 }}
            >
              Not now
            </Button>
            <Button variant="contained" fullWidth onClick={handleInstallClick}>
              Install
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {showArrow && (
        <InstallArrowOverlay onDismiss={() => setShowArrow(false)} />
      )}
      <IosInstallGuide
        open={showIosGuide}
        onClose={() => {
          setShowIosGuide(false);
          dismiss();
        }}
      />
    </>
  );
}
