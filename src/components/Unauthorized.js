import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <button className="auth-button" onClick={() => navigate("/landing")}>Go Home</button>
      </div>
    </div>
  );
};

export default Unauthorized;
