// src/services/adminServices.js
import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/roles";

export const getAdminDashboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admin/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    throw error;
  }
};

export const getLawyerDashboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lawyer/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lawyer dashboard:", error);
    throw error;
  }
};

export const getUserDashboard = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/dashboard`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user dashboard:", error);
    throw error;
  }
};
