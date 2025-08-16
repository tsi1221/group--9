import React from 'react';
import './Howitworks.css';

const Howitworks = () => {
  return (
    <div className="container">
      <div className="txt">
        <h1>How Fithaber Works</h1>
        <p>
          Getting legal help has never been easier.
          <br />
          Follow these simple steps to connect with the right lawyer for your needs.
        </p>
      </div>

      <div className="steps-grid">
        <div className="step-item">
          <div className="step-circle">01</div>
          <h3>Create Your Account</h3>
          <p>
            Sign up and tell us about your legal needs. Our platform will match you with
            qualified lawyers in your area.
          </p>
        </div>

        <div className="step-item">
          <div className="step-circle">02</div>
          <h3>Find Your Lawyer</h3>
          <p>
            Browse profiles, read reviews, and select the lawyer that best fits your case
            and budget.
          </p>
        </div>

        <div className="step-item">
          <div className="step-circle">03</div>
          <h3>Manage Your Case</h3>
          <p>
            Communicate securely, track progress, and manage all your legal documents in
            one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Howitworks;
