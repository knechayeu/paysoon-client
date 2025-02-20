import axios from 'axios';

const API_BASE_URL = process.env.BACKEND_HOST;

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-user`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    return null;
  }
};

export const getAllRooms = async () => {
  const response = await axios.get(`${API_BASE_URL}/rooms`);
  return response.data;
}; 