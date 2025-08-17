import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/admin'; // adjust if needed

export const getDashboard = async () => {
  const response = await axios.get(`${API_BASE_URL}/dashboard`, { withCredentials: true });
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
  return response.data;
};

export const getAllLawyers = async () => {
  const response = await axios.get(`${API_BASE_URL}/lawyers`, { withCredentials: true });
  return response.data;
};

export const searchUsersByName = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search/users?name=${query}`, { withCredentials: true });
  return response.data;
};

export const searchCases = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search/cases?query=${query}`, { withCredentials: true });
  return response.data;
};
