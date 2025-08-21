import axiosInstance from "./axiosConfig";

// src/utils/auth.js
export const logout = async () => {
  // Clear token from local storage or any other storage
  localStorage.removeItem('tizaraUserToken');
  localStorage.removeItem('popupShown');

  await axiosInstance.post('/auth/log-out')


  // Redirect to login page
  window.location.href = '/'; // Adjust the path as needed
};
