// src/components/Welcome.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./welcome.css";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register");
    }, 4000); // Wait 4 seconds before redirecting
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="welcome-container">
      <div className="welcome-box">
        <h1 className="welcome-title">Welcome to Alpha</h1>
        <p className="welcome-subtitle">Your daily sales tracking assistant</p>
      </div>
    </div>
  );
};

export default Welcome;
