import React, { createContext, useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axios";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [registeringError, setRegisteringError] = useState(null);
  const [authError, setAuthError] = useState(null);

  const checkSession = async () => {
    console.log("Loading data from server");
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get("/auth/me.php");
      if (data && data.user) {
        setUser(data.user);

        console.log(data);
        setIsAuthenticated(true);
      } else {
        console.log("not expected but heres the data: ", data);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.log("something went wrong coz of this:", err);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
      console.log("this is the end of session check");
    }
  };

  const createAccount = async (email, password) => {
    setIsRegistering(true);
    setRegisteringError(null);
    try {
      const { data } = await axiosInstance.post("/auth/register.php", {
        email,
        password,
      });
      console.log(data);
      // Auto-login after successful registration
      setUser(data.user);
      setIsAuthenticated(true);
      setRegisteringError(null);
    } catch (err) {
      console.error(err);
      setRegisteringError(err.message || "Registration failed");
      setIsAuthenticated(false);
    } finally {
      setIsRegistering(false);
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      const { data } = await axiosInstance.post("/auth/login.php", {
        email,
        password,
      });
      const userData = data.user;
      setUser(userData);
      setIsAuthenticated(true);
      setAuthError(null); // ✓ Explicitly clear on success
    } catch (err) {
      setAuthError(err.message || "Login failed");
      setIsAuthenticated(false);
      setUser(null);
      console.error(err);
    } finally {
      setIsLoggingIn(false);
    }
  };
  const logout = async () => {
    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/logout.php");
    } catch (error) {
      console.warn(
        "Logout failed on server, but clearing local session.",
        error,
      );
    }

    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);

    // Optional reload
    // window.location.reload();
  };

  useEffect(() => {
    checkSession();
  }, []);

  const contextValues = {
    user,
    isAuthenticated,
    isLoading,
    authError,
    registeringError,
    isRegistering,
    isLoggingIn,
    setIsLoggingIn,
    login,
    logout,
    createAccount,
  };

  // Show a simple fallback during initial session check, not the actual children
  if (isLoading && !user) {
    return (
      <SessionContext.Provider value={contextValues}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Loading session...</p>
        </div>
      </SessionContext.Provider>
    );
  }

  return (
    <SessionContext.Provider value={contextValues}>
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
