import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome,FaEnvelope,  FaDollarSign,  FaUserCircle,  FaCog, FaGamepad, FaHammer, FaUserTie, FaUserAlt,} from 'react-icons/fa';
import './Sidebar.css';

import logo from '../../assets/logo1.png';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="side-logo"> <img src={logo} alt="logo"/><p>Fithabher</p></div>

      <nav className="sidebar-nav">
             <NavLink to="/dashboard"><FaHome /> Dashboard</NavLink>
             <NavLink to="/lawyers"><FaUserTie /> Lawyers</NavLink>
             <NavLink to="/users"><FaUserAlt /> Users</NavLink>
             <NavLink to="/messages"><FaEnvelope /> Messages</NavLink>
             <NavLink to="/billings"><FaDollarSign /> Billings</NavLink>
      </nav>

      <div className="sidebar-bottom">
        <NavLink to="/Profile"><FaUserCircle /> Profile</NavLink>
        <NavLink to="/Settings"><FaCog /> Settings</NavLink>        
      </div>
    </aside>
  );
};

export default Sidebar;
