import axios from 'axios';
import { BACKEND_URL } from '../constants';

export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(BACKEND_URL.CreateUser, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    return null;
  }
};

export const getAllRooms = async () => {
  const response = await axios.get(BACKEND_URL.GetAllRooms);
  return response.data;
}; 