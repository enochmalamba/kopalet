import React, { createContext, useState, useEffect, useContext } from "react";

const SessionContext = createContext();

const API_BASE_URL = "https://api.localsketch.xyz";

export const useSession = () => useContext(SessionContext);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const apiFetch = async (endpoint, options = {}) => {
    const responce = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    const data = await responce
      .json()
      .catch(() => ({ message: "Server error: Invalid JSON responce" }));
    if (!responce.ok) {
      throw new Error(data.message || `HTTP error: Status: ${responce.status}`);
    }

    return data;
  };

  const checkSession = async () => {
    setIsLoading(true);
    try {
      const data = await apiFetch("/auth/me.php", { method: "GET" });
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

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const data = await apiFetch("/login.php", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const userData = data.user;
      setUser(userData);
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message);
      console.error(err);
    }
  };
  const logout = async () => {
    setIsLoading(true);
    try {
      await apiFetch("/logout", { method: "POST" });
    } catch (error) {
      console.warn(
        "Logout failed on server, but clearing local session.",
        error
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
    login,
    logout,
    checkSession,
  };

  return (
    <SessionContext.Provider value={contextValues}>
      {isLoading ? <div>session manager is loading</div> : children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
