import { Navigate } from "react-router-dom";
import { useSession } from "../../context/sessionContext";
import LoadingStates from "../../components/LoadingStates";

export default function ProfileRedirect() {
  const { user, isAuthenticated, isInitialized } = useSession();

  if (!isInitialized) return <LoadingStates component="spinner" />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login?redirect=/profile" replace />;
  }

  return <Navigate to={`/profile/${user.id}`} replace />;
}
