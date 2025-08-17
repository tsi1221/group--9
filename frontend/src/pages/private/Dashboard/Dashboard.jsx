import React from "react";
import DashboardStats from "../../../components/DashboardStats";
import UsersList from "../../../components/UsersList";


const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <DashboardStats />
      <UsersList />
    </div>
  );
};

export default Dashboard;
