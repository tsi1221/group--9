import React from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import './DashboardStats.css';

const DashboardStats = ({ stats }) => {
  const { totalUsers, totalLawyers, totalCases, totalPayment, monthlyUsers } = stats;

  const pieData = [
    { name: 'Users', value: totalUsers },
    { name: 'Lawyers', value: totalLawyers },
    { name: 'Cases', value: totalCases },
    { name: 'Monthly Payment', value: totalPayment },
  ];

  const COLORS = ['#4e54c8', '#50b77c', '#ffb347', '#b389f4'];

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card card-users">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
        <div className="card card-lawyers">
          <h3>Total Lawyers</h3>
          <p>{totalLawyers}</p>
        </div>
        <div className="card card-cases">
          <h3>Total Cases</h3>
          <p>{totalCases}</p>
        </div>
        <div className="card card-payment">
          <h3>Monthly Payment</h3>
          <p>$424{totalPayment}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts">
        {/* Bar Chart for Monthly Users */}
        <div className="chart-container">
          <h3>Monthly Users</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyUsers} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="month" tick={{ fontSize: 16, fontWeight: 'bold' }} />
              <YAxis tick={{ fontSize: 16 }} />
              <Tooltip
                contentStyle={{ fontSize: '16px', borderRadius: '8px' }}
                formatter={(value) => [value, 'Users']}
              />
              <Legend wrapperStyle={{ fontSize: '16px' }} />
              <Bar dataKey="count" name="Users" fill="#4e54c8" radius={[8, 8, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart for Overall Distribution */}
        <div className="chart-container">
          <h3>Overall Distribution</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: '16px', borderRadius: '8px' }} />
              <Legend wrapperStyle={{ fontSize: '16px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
