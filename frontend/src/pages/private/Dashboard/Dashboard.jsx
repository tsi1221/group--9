import React from 'react';
import DashboardStats from './DashboardStats';

const stats = {
  totalUsers: 12,
  totalLawyers: 5,
  totalCases: 8,
  monthlyUsers: [
    { month: 'Jan', count: 2 },
    { month: 'Feb', count: 1 },
    { month: 'Mar', count: 3 },
    { month: 'Apr', count: 6 },
  ],
};

function Dashboard() {
  return <DashboardStats stats={stats} />;
}

export default Dashboard;
