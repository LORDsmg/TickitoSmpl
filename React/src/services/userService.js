import axiosInstance from "../api/axios";

export const userService = {
  getProfile: async () => {
    return await axiosInstance.get("/user/profile");
  },

  updateProfile: async (profileData) => {
    return await axiosInstance.put("/user/profile", profileData);
  },

  changePassword: async (passwordData) => {
    return await axiosInstance.put("/user/password", passwordData);
  },

  forgotPassword: async (email) => {
    return await axiosInstance.post("/user/forgot-password", {
      email,
    });
  },

  resetPassword: async (data) => {
    return await axiosInstance.post("/user/reset-password", data);
  },
  getAllUsers: async () => {
    return await axiosInstance.get("/user/admin");
  },
};
