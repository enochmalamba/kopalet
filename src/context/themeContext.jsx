import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

const ThemeContext = createContext(null);
export const useTheme = () => useContext(ThemeContext);

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
        applyTheme("system");
      }
    };

    media.addEventListener("change", systemListener);
    return () => media.removeEventListener("change", systemListener);
  }, [theme]);

  // Create MUI theme based on resolvedTheme
  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme, // 'light' or 'dark'
          // Optional: Add custom colors for each mode
          ...(resolvedTheme === "light"
            ? {
                // Light mode customization
                primary: { main: "#1976d2" },
                background: { default: "#ffffff", paper: "#f5f5f5" },
              }
            : {
                // Dark mode customization
                primary: { main: "#90caf9" },
                background: { default: "#121212", paper: "#1e1e1e" },
              }),
        },
      }),
    [resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
