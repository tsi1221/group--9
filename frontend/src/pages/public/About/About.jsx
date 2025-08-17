import React from 'react';
import './About.css';
import aboutImage from '../../../assets/about.jpg'; // Replace with your image path

const About = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-text">
          <h1>About Fitihaber Ethiopia</h1>
          <p>
            Fitihaber Ethiopia is a simple, secure, and user-friendly platform connecting lawyers, witnesses,
            and guarantors online. Our goal is to make legal services accessible and fast for everyone.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="Fitihaber Ethiopia" />
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
          To connect people with legal professionals in a simple, secure way, making legal processes
          faster and more accessible for everyone in Ethiopia.
        </p>
      </section>
    </div>
  );
};

export default About;
