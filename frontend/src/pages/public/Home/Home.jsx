import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaEye, FaShieldAlt } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Connect with Legal Professionals</h1>
          <p className="hero-subtitle">
            Find and connect with lawyers, witnesses, and guarantors for your legal needs.
            Our platform simplifies the process, ensuring you have the support you need.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
            <button className="btn-secondary" onClick={() => navigate("/signin")}>
              Log In
            </button>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2 className="section-title">Key Features</h2>
        <p className="section-description">
          Our platform offers a range of features designed to streamline your legal process.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <FaUserTie className="feature-icon" />
            <h3 className="feature-title">Connect with Lawyers</h3>
            <p className="feature-desc">
              Easily search and connect with experienced lawyers specializing in various fields of law.
            </p>
          </div>

          <div className="feature-card">
            <FaEye className="feature-icon" />
            <h3 className="feature-title">Find Reliable Witnesses</h3>
            <p className="feature-desc">
              Locate and connect with credible witnesses to support your case.
            </p>
          </div>

          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3 className="feature-title">Secure Guarantors</h3>
            <p className="feature-desc">
              Find and secure guarantors to ensure compliance with legal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2 className="cta-title">Ready to Get Started?</h2>
        <p className="cta-subtitle">
          Sign up today and take the first step towards a smoother legal journey.
        </p>
        <button className="btn-primary btn-cta" onClick={() => navigate("/signup")}>
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Home;
