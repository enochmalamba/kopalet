// components/LandingGuard.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LandingGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem("cab_visited");
    if (hasVisited) {
      navigate("/home", { replace: true });
    }
  }, []);

  return null;
}
