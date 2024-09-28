// src/utils/authUtils.js
import axios from 'axios';

export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const removeToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp < Date.now() / 1000;
    } catch (error) {
      return true;
    }
  };
  
  export const refreshToken = async () => {
    try {
      const response = await axios.post('http://localhost:3010/api/refresh-token', {}, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      setToken(response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      removeToken();
      throw error;
    }
  };