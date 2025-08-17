import React, { useState } from "react";
import "./Forgetpassword.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      // 🔗 Replace with your backend API endpoint
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset link sent to your email.");
        setError("");
      } else {
        setError(data.message || "Something went wrong.");
        setMessage("");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      setMessage("");
    }
  };

  return (
    <div className="forget-container">
      <h2>Forgot Password?</h2>
      <p>Enter your email to reset your password</p>

      <form onSubmit={handleSubmit} className="forget-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="forget-input"
        />
        <button type="submit" className="forget-btn">Send Reset Link</button>
      </form>

      {message && <p className="success-msg">{message}</p>}
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default ForgetPassword;
