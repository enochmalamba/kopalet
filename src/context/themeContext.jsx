import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";

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

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

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

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: resolvedTheme,

          primary: {
            main: "#000",
          },

          background: {
            default: "var(--bg)",
            paper: "var(--surface)",
          },
        },

        components: {
          MuiCssBaseline: {
            styleOverrides: {
              body: {
                backgroundColor: "var(--bg)",
                color: "var(--text)",
              },
            },
          },

          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
                borderRadius: "var(--radius-md)",
              },

              contained: {
                backgroundColor: "var(--text)",
                color: "var(--bg)",
                boxShadow: "none",

                "&:hover": {
                  backgroundColor: "var(--text)",
                  opacity: 0.85,
                  boxShadow: "none",
                },

                "&:active": {
                  transform: "scale(0.97)",
                  opacity: 0.75,
                },
              },

              outlined: {
                borderColor: "var(--text)",
                color: "var(--text)",

                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                  borderColor: "var(--text)",
                },

                "&:active": {
                  opacity: 0.5,
                },
              },

              text: {
                color: "var(--text)",

                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
              },
            },
          },

          MuiButtonBase: {
            defaultProps: {
              disableRipple: true,
            },
          },

          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--border)",
                },

                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--text)",
                },

                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "var(--primary)", // 👈 green lives here
                  borderWidth: "2px",
                },
              },

              input: {
                color: "var(--text)",
              },
            },
          },

          MuiInputLabel: {
            styleOverrides: {
              root: {
                color: "var(--muted)",

                "&.Mui-focused": {
                  color: "var(--primary)", // 👈 green only on focus
                },
              },
            },
          },

          // ✅ Tabs (minimal + consistent)
          MuiTabs: {
            styleOverrides: {
              indicator: {
                backgroundColor: "var(--primary)",
              },
            },
          },

          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "none",
                color: "var(--muted)",

                "&.Mui-selected": {
                  color: "var(--text)",
                },
              },
            },
          },
        },
      }),
    [resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4500,
            style: {
              background: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--text)",
              borderRadius: "var(--radius-md)",
              fontSize: "var(--font-size-sm)",
              padding: "12px 16px",
              boxShadow: "var(--shadow-md)",
            },
            success: {
              iconTheme: {
                primary: "var(--success)",
                secondary: "var(--surface)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--danger)",
                secondary: "var(--surface)",
              },
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
