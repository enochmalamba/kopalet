import { useEffect } from "react";
import { useSession } from "../context/sessionContext";

export default function VisitGuard() {
  const { user, isLoading, setAuthModalOpen, setAuthModalReason } =
    useSession();

  useEffect(() => {
    if (isLoading) return;

    // They're in the app — mark as visited
    localStorage.setItem("cab_visited", "true");

    // If guest, show modal once this session
    if (!user) {
      const alreadyPrompted = sessionStorage.getItem("cab_auth_prompted");
      if (!alreadyPrompted) {
        sessionStorage.setItem("cab_auth_prompted", "true");
        setAuthModalReason("session_start");
        setAuthModalOpen(true);
      }
    }
  }, [isLoading]);

  return null;
}
