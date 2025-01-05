import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, adminOnly }) => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
