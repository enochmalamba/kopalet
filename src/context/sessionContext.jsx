import React, { createContext, useState, useEffect, useContext } from "react";

const sessionContext = createContext();

const API_BASE_URL = "https://api.localsketch.xyz";

export const useSession = () => useContext(sessionContext);

export const SesssionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthnticated, setIsAuthenticated] = useState(false);
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
      const data = await apiFetch("/me.php", { method: "GET" });
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
    se;
  };
};
