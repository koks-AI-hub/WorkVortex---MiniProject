import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/SplashScreen.css";
import logo from '../logo.svg';

const SplashScreen = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      setTimeout(() => {
        navigate("/landing");
      }, 3000);
    }, [navigate]);
  
    return (
      <div className="splash-container">
        <div className="splash-content">
          <img src={logo} alt="Work Vertex Logo" className="splash-logo" />
          <h1 className="splash-title">Work Vertex</h1>
          <p className="splash-tagline">Empowering Workforce, Connecting Opportunities</p>
        </div>
      </div>
    );
  };
  
  export default SplashScreen;
