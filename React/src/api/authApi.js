import api from "./axios";

/**
 * Authentication APIs
 */

// Register
export const register = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Login
export const login = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

// Logout
export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

// Get Logged-in User Profile
export const getProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

// Update Profile
export const updateProfile = async (data) => {
  const response = await api.put("/auth/profile", data);
  return response.data;
};

// Change Password
export const changePassword = async (data) => {
  const response = await api.put("/auth/change-password", data);
  return response.data;
};

// Refresh Token (Future Ready)
export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-token");
  return response.data;
};