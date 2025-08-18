import React from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css"; // Import the CSS file

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return (
    <div className="settings-container">
      <h2 className="settings-title">Settings</h2>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Settings;
