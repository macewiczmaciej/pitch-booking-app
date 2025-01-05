import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const res = await API.get(`/users/${userId}`);
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user data:", err);
          setUser(null);
        }
      }
    };

    fetchUser();
  }, []);


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
