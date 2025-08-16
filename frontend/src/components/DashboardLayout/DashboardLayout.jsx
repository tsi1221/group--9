import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
