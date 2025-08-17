import React, { useEffect, useState } from 'react';
import { getDashboard } from '../services/api';
import './DashboaredStats.css';

const DashboardStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboard();
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="dashboard-stats">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Lawyers</h3>
          <p>{stats.totalLawyers}</p>
        </div>
        <div className="stat-card">
          <h3>Cases</h3>
          <p>{stats.totalCases}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
