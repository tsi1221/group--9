import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import './Signin.css';

const Signin = () => {
  const [formData, setFormData] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Error');
        return;
      }

      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  const LoginFields = [
    { name: "identifier", type: "text", placeholder: "Email or Phone", required: true, maxLength: 100 },
    { name: "password", type: "password", placeholder: "Password", required: true, maxLength: 100 },
  ];

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        {LoginFields.map(field => (
          <div key={field.name} className={field.name === 'password' ? 'password-wrapper' : ''}>
            <input
              type={field.name === 'password' && showPassword ? 'text' : field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              maxLength={field.maxLength}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
            {field.name === 'password' && (
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>
        ))}

        <p className="forgot-password" onClick={() => alert('Forgot password flow')}>
          Forgot Password?
        </p>

        <button type="submit" className="signin-btn">Sign In</button>
      </form>

      <div className="social-login">
        <button className="google-btn"><FaGoogle /> Sign in with Google</button>
        <button className="facebook-btn"><FaFacebook className='f-icon'/> Sign in with Facebook</button>
      </div>

      <p className="signin-links">
        <a onClick={() => navigate('/signup')}> Don't have an account? Sign Up</a>
      </p>
    </div>
  );
};

export default Signin;
