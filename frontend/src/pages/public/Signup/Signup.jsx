import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch('/api/register', {
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

  const RegisterFields = [
    { name: "firstname", placeholder: "Enter your first name", required: true, maxLength: 50 },
    { name: "middlename", placeholder: "Enter your middle name", maxLength: 50 },
    { name: "lastname", placeholder: "Enter your last name", required: true, maxLength: 50 },
    { name: "email", placeholder: "Enter your email", type: "email", required: true, maxLength: 100 },
    { name: "phone", placeholder: "Enter your phone number", type: "tel", required: true, maxLength: 15 },
    { name: "password", placeholder: "Enter a password", type: "password", required: true, maxLength: 100 },
    { name: "confirmPassword", placeholder: "Confirm your password", type: "password", required: true, maxLength: 100 },
    { name: "address", placeholder: "Enter your address", maxLength: 255 },
  ];

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {RegisterFields.map(field => {
          const isPassword = field.name === 'password';
          const isConfirmPassword = field.name === 'confirmPassword';

          return (
            <div key={field.name} className={(isPassword || isConfirmPassword) ? 'password-wrapper' : ''}>
              <input
                type={isPassword && showPassword ? 'text' : isConfirmPassword && showConfirmPassword ? 'text' : field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxLength}
                value={formData[field.name] || ''}
                onChange={handleChange}
                className="auth-input"
              />
              {(isPassword || isConfirmPassword) && (
                <span
                  className="eye-icon"
                  onClick={() =>
                    isPassword ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {(isPassword && showPassword) || (isConfirmPassword && showConfirmPassword) ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          );
        })}

        <select
          name="roleId"
          required
          value={formData.roleId || ''}
          onChange={handleChange}
          className="auth-input"
        >
          <option value=""> Select Role </option>
          <option value="Client">Client</option>
          <option value="Lawyer">Lawyer</option>
        </select>

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>



      <p className="signup-toggle" onClick={() => navigate('/signin')}>
        Already have an account? Sign In
      </p>
    </div>
  );
};

export default Signup;
