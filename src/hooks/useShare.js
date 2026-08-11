import { useCallback } from "react";
import { toast } from "sonner";

/**
 * Capability-detected share handler.
 *
 * Uses navigator.share (Web Share API) when available — this is the
 * "special share" you were thinking of. It opens the native OS share
 * sheet (Messages, WhatsApp, Mail, etc). Support is NOT mobile-only;
 * some desktop browsers (Safari macOS, some Edge builds) implement it
 * too. We branch on actual capability, not screen width, because a
 * media-query guess will misfire on those browsers and on tablets.
 *
 * Falls back to clipboard copy everywhere else, and also falls back
 * to clipboard if navigator.share throws for any reason other than
 * the user cancelling the share sheet (AbortError).
 */
export function useShare() {
  const canNativeShare = useCallback(() => {
    return (
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const share = useCallback(
    async ({ title, text, url }) => {
      if (canNativeShare()) {
        try {
          await navigator.share({ title, text, url });
          return { method: "native", success: true };
        } catch (err) {
          if (err?.name === "AbortError") {
            // User dismissed the share sheet — not an error, don't toast.
            return { method: "native", success: false, cancelled: true };
          }
          // Real failure (e.g. permission, unsupported data) — fall through to clipboard.
        }
      }

      try {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
        return { method: "clipboard", success: true };
      } catch (err) {
        toast.error("Couldn't copy link");
        return { method: "clipboard", success: false };
      }
    },
    [canNativeShare],
  );

  return { share, canNativeShare };
}
