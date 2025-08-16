import React from 'react';
import './Contact.css';
import { FaMailBulk, FaPhone, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='container1'>
      <h1>Get in Touch</h1>

      <div className='contact-wrapper'>
        <div className='left'>
          <div className='box'>
            <h2><FaMapMarkerAlt /> Address</h2>
            <p>Fithabher, Wereda 8, Bole Sub city, Addis Ababa, Ethiopia</p>
          </div>

          <div className='box'>
            <h2><FaMailBulk /> Email</h2>
            <p><a href="mailto:support@Fithabher.com">support@Fithabher.com</a></p>
          </div>

          <div className='box'>
            <h2><FaPhone /> Phone</h2>
            <p><a href="tel:+251932641435">+251-932-54-14-35</a></p>
          </div>

          <div className='box'>
            <h2><FaWhatsapp /> WhatsApp</h2>
            <p><a href="https://wa.me/+251932641435" target="_blank" rel="noreferrer">+251-932-54-14-35</a></p>
          </div>
        </div>

        <div className='right'>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3941.940058128082!2d38.80975339999999!3d8.8851654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b82a7e392203f%3A0xb05f440eacc98f9f!2sAddis%20Ababa%20Science%20and%20Technology%20University!5e0!3m2!1sen!2set!4v1755219388957!5m2!1sen!2set"
            style={{ width: '100%', height: '100%', border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
