import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaFolderOpen,  FaCalendarAlt,  FaEnvelope,  FaDollarSign,  FaUserCircle,  FaCog, FaGamepad, FaHammer,} from 'react-icons/fa';
import './Sidebar.css';
import logo2 from '../../assets/logo.svg'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="side-logo"> <img src={logo2} alt="logo"/><p>Fithabher</p></div>

      <nav className="sidebar-nav">
             <NavLink to="/dashboard"><FaHome /> Dashboard</NavLink>
             <NavLink to="/cases"><FaFolderOpen /> Cases</NavLink>
             <NavLink to="/calendar"><FaCalendarAlt /> Calendar</NavLink>
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
