import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
    const userRole = typeof window !== "undefined" ? sessionStorage.getItem("userRole") : null;

    if (!userRole) {
        return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" />;
    }

    return children; 
};

export default ProtectedRoute;
