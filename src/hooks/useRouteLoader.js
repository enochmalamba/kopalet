import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

let timeout;

export function useRouteLoader() {
  const location = useLocation();

  useEffect(() => {
    timeout = setTimeout(() => {
      NProgress.start();
    }, 200); // prevents flicker

    return () => {
      clearTimeout(timeout);
      NProgress.done();
    };
  }, [location.pathname]);
}
