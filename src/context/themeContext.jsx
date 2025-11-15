import React, { createContext, useState, useEffect, useContext } from "react";
import { createTheme } from "@mui/material";
const ThemeContext = createContext(null);
export const useSession = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const getStoredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (
      (savedTheme === "light") |
      (savedTheme === "dark") |
      (savedTheme === "system")
    ) {
      return savedTheme;
    }
    return "system";
  };
  const [theme, setTheme] = useState(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState("system");

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const applyTheme = (mode) => {
    let finalTheme;
    if (mode === "system") {
      finalTheme = media.matches ? "dark" : "light";
    } else {
      finalTheme = mode;
    }

    setResolvedTheme(finalTheme);
    document.documentElement.setAttribute("data-theme", finalTheme);
  };
  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme("theme");

    media.addEventListener("change", systemListener);
    return () => media.removeEventListener("change", systemListener);
  }, [theme]);
};
