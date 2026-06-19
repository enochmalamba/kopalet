import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SessionProvider from "./context/sessionContext";
import ThemeProvider from "./context/themeContext";
import { HelmetProvider } from "react-helmet-async";
import AuthPromptModal from "./components/AuthPromptModal.jsx";
import Sonner from "./components/Sonner.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SessionProvider>
          <HelmetProvider>
            <AuthPromptModal />
            <Sonner />
            <App />
          </HelmetProvider>
        </SessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
