import React from "react";
import "./Home.css";

import verifyImg from "../../../assets/verify.jpg";
import seemlessImg from "../../../assets/seemless.png";
import caseImg from "../../../assets/case.png";

const Home = () => {
  return (
    <div>
      {/* Header Section */}
      <section className="header">
        <div className="text-box">
          <h1>Get matched with the right lawyer today</h1>
          <p>
            If you need an experienced lawyer, we have the solution, let us
            connect you to <br />
            lawyers that fight for you in the court.
          </p>
          <a href="/signup" className="button-like">
            Sign up to start working with us
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <h1>Services we offer</h1>
        <p>
          We provide a wide range of legal services designed to connect you
          with trusted lawyers and simplify your legal journey.
        </p>
        <div className="rows">
          <div className="services-col">
            <h3>Consulting</h3>
            <p>
              Get expert legal advice from professionals who specialize in
              different fields of law, ensuring you make informed decisions
              before taking action.
            </p>
          </div>
          <div className="services-col">
            <h3>Case Management</h3>
            <p>
              Track, organize, and manage your legal cases in one place. From
              documentation to deadlines, we help you stay on top of every
              detail.
            </p>
          </div>
          <div className="services-col">
            <h3>Assistance on Legal Procedures</h3>
            <p>
              Our platform guides you through complex legal processes such as
              filing cases, drafting contracts, and handling legal paperwork
              efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h1>Key Features</h1>
        <p>
          Our company provides unique features that make us stand out in the
          legal consultancy space.
        </p>
        <div className="rerows">
          <div className="feature-card">
            <img src={verifyImg} alt="Verified Lawyers" />
            <h3>Verified Lawyers</h3>
            <p>
              We only connect you with licensed, experienced, and trustworthy
              lawyers.
            </p>
          </div>
          <div className="feature-card">
            <img src={seemlessImg} alt="Seamless Communication" />
            <h3>Seamless Communication</h3>
            <p>
              Chat, call, or video conference with your lawyer directly on our
              platform.
            </p>
          </div>
          <div className="feature-card">
            <img src={caseImg} alt="Case Tracking" />
            <h3>Case Tracking</h3>
            <p>Track the progress of your case in real time with regular updates.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
