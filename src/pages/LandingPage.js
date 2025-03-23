import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimate(true), 100);
  }, []);

  return (
    <div className="landing-container">
      <div className={`glass-card ${animate ? "animate" : ""}`}>
        <h1 className="title">Welcome to Work Vertex</h1>
        <p className="subtitle">Find your next job or hire the best talent.</p>
        <div className="button-group">
          <button
            className="btn-employee"
            onClick={() => navigate("/register?role=employee")}
          >
            Continue as Employee
          </button>
          <button
            className="btn-company"
            onClick={() => navigate("/register?role=company")}
          >
            Continue as Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
