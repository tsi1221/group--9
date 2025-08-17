import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Platform</h3>
          <ul>
            <li><a href="#">Find Lawyers</a></li>
            <li><a href="#">Case Management</a></li>
            <li><a href="#">Messaging</a></li>
            <li><a href="#">Documents</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Legal Resources</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 Fithabher. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
