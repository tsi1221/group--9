import React from 'react';
import './About.css';
import aboutImage from '../../../assets/about.jpg'; // Replace with your image path

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About Fithabher</h1>
          <p>
            Fithabher is dedicated to providing the best solutions to help you connect, grow, 
            and achieve your goals. Our platform is designed with simplicity, performance, and
            love for the user in mind.
          </p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-text">
          <h2>Our Mission</h2>
          <p>
            Our mission is to empower every user with seamless digital experiences,
            ensuring efficiency, reliability, and a touch of joy in every interaction.
          </p>

          <h2>Our Vision</h2>
          <p>
            To become a trusted platform known for excellence, innovation, and making
            everyday digital tasks easier for everyone.
          </p>

          <h2>Our Values</h2>
          <p>
            Integrity, User-Centric Design, Innovation, and Sustainability guide every
            decision we make and every feature we build.
          </p>
        </div>
        <div className="about-image">
          <img src={aboutImage} alt="About Fithabher" />
        </div>
      </section>
    </div>
  );
};

export default About;
