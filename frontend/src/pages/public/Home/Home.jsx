import React from "react";
import "./Home.css";
import { FaUserTie, FaEye, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1>Connect with Legal Professionals</h1>
          <p>
            Find and connect with lawyers, witnesses, and guarantors for your legal needs.
            Our platform simplifies the process, ensuring you have the support you need.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Sign Up</button>
            <button className="btn-secondary">Log in</button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <p>Our platform offers a range of features designed to streamline your legal process.</p>
        <div className="features-grid">
          <div className="feature-card">
            <FaUserTie className="feature-icon" />
            <h3>Connect with Lawyers</h3>
            <p>Easily search and connect with experienced lawyers specializing in various fields of law.</p>
          </div>

          <div className="feature-card">
            <FaEye className="feature-icon" />
            <h3>Find Reliable Witnesses</h3>
            <p>Locate and connect with credible witnesses to support your case.</p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Secure Guarantors</h3>
            <p>Find and secure guarantors to ensure compliance with legal requirements.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Sign up today and take the first step towards a smoother legal journey.</p>
        <button className="btn-primary btn-cta">Get Started</button>
      </section>
    </div>
  );
};

export default Home;
