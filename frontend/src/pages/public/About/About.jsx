import React from 'react'
import "./About.css";

const About = () => {
  return (
    <div>
      {/* About Header */}
      <section className="about-header">
        <h1>About Us</h1>
        <p>
          Building trust, delivering justice, and empowering clients with <br />
          reliable legal consultation.
        </p>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            We are a team of dedicated and experienced developers with the aim
            of connecting clients with legal professionals committed to
            connecting clients with the right lawyers. Our platform ensures that
            every lawyer you meet is verified, licensed, and ready to provide
            the best legal advice tailored to your needs.
          </p>
          <p>
            Since our founding, we have helped countless individuals and
            businesses navigate complex legal challenges with confidence and
            ease.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://attorneyatlawmagazine.com/wp-content/uploads/2023/08/bigstock-Ai-Ethics-Or-Ai-Law-Concept-D-477080089-1024x675.jpg"
            alt="Law Office"
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          Our mission is to make legal help accessible, secure, and reliable
          for everyone. By combining modern technology with trusted legal
          expertise, we aim to break barriers and deliver justice where it
          matters most.
        </p>
      </section>
    </div>
  );
};

export default About;