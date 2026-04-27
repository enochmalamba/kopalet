import React, { createContext, useState, useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import LoadingStates from "../components/LoadingStates";

const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authError, setAuthError] = useState(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const redirect = searchParams.get("redirect");

  const checkSession = async () => {
    setIsLoading(true);

    try {
      await axiosInstance.get("/sanctum/csrf-cookie");

      const { data } = await axiosInstance.get("/v1/auth/me");
      if (data && data.user) {
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createAccount = async (name, email, password) => {
    setIsRegistering(true);
    setAuthError(null);
    await axiosInstance.get("/sanctum/csrf-cookie");

    try {
      const { data } = await axiosInstance.post("/v1/auth/register", {
        name,
        email,
        password,
      });

      setUser(data.user);
      console.log(data.user);
      setIsAuthenticated(true);
      setAuthError(null);
      if (redirect && redirect.startsWith("/")) {
        navigate(redirect);
      } else {
        navigate("/home");
      }
    } catch (err) {
      const { status, data } = err.response || {};

      if (status === 422) {
        setAuthError(data.message);
      } else {
        setAuthError("Something went wrong. Please try again later.");
      }

      setIsAuthenticated(false);
    } finally {
      setIsRegistering(false);
    }
  };

  const login = async (email, password) => {
    setAuthError(null);
    setIsLoggingIn(true);
    try {
      await axiosInstance.get("/sanctum/csrf-cookie");
      const { data } = await axiosInstance.post("/v1/auth/login", {
        email,
        password,
      });
      const userData = data.user;
      setUser(userData);
      setIsAuthenticated(true);
      setAuthError(null);

      if (redirect && redirect.startsWith("/")) {
        navigate(redirect);
      } else {
        navigate("/home");
      }
    } catch (err) {
      const { status, data } = err.response || {};
      if (status === 422) {
        setAuthError(data.message);
      } else {
        setAuthError("Something went wrong. Please try again later.");
      }
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
      await axiosInstance.post("/v1/auth/logout");
    } catch (error) {
      console.warn(
        "Logout failed on server, clearing local session anyway.",
        error,
      );
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const contextValues = {
    user,
    isAuthenticated,
    isLoading,
    authError,
    isRegistering,
    isLoggingIn,
    setAuthError,
    setIsLoggingIn,
    login,
    logout,
    createAccount,
  };

  // Show a simple fallback during initial session check, not the actual children
  if (isLoading && !user) {
    return (
      <SessionContext.Provider value={contextValues}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center ",
          }}
        >
          <LoadingStates component="spinner" />
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
