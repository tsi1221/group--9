import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo1.png';

const Navbar = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      navigate('/');
    } else {
      navigate('/signin'); 
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <img src={logo} alt="logo" className="logo" />
        <p className="eq">Fithabher</p>
      </Link>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/howitworks">How it works</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/about">About</NavLink>
        {/* <NavLink to="/services">Services</NavLink> */}
      </div>

      <button className="btn" onClick={handleAuthToggle}>
        Login
      </button>
    </nav>
  );
};

export default Navbar;
