import React, { createContext, useState, useEffect, useContext } from "react";
import { createTheme } from "@mui/material";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext); // Fixed: was useSession

const ThemeProvider = ({ children }) => {
  const getStoredTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (
      savedTheme === "light" ||
      savedTheme === "dark" ||
      savedTheme === "system"
    ) {
      return savedTheme;
    }
    return "system";
  };

  const [theme, setTheme] = useState(getStoredTheme);
  const [resolvedTheme, setResolvedTheme] = useState("light");

  const applyTheme = (mode) => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    let finalTheme;

    if (mode === "system") {
      finalTheme = media.matches ? "dark" : "light";
    } else {
      finalTheme = mode;
    }

    setResolvedTheme(finalTheme);
    localStorage.setItem("theme", mode);
    document.documentElement.setAttribute("data-theme", finalTheme);
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const systemListener = () => {
      if (theme === "system") {
        applyTheme("system"); // Fixed: was passing string "theme"
      }
    };

    media.addEventListener("change", systemListener);
    return () => media.removeEventListener("change", systemListener);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
