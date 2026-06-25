import { useEffect } from "react";
import { useSession } from "../context/sessionContext";

export default function VisitGuard() {
  const { user, isInitialized, setAuthModalOpen, setAuthModalReason } =
    useSession();

  useEffect(() => {
    if (!isInitialized) return;

    localStorage.setItem("cab_visited", "true");

    if (!user) {
      const alreadyPrompted = sessionStorage.getItem("cab_auth_prompted");
      if (!alreadyPrompted) {
        sessionStorage.setItem("cab_auth_prompted", "true");
        setAuthModalReason("session_start");
        setAuthModalOpen(true);
      }
    }
  }, [isInitialized]);

  return null;
}
