import axiosInstance from "../api/axios";

export const showService = {
  // List all shows
 getAllShows: async () => {
  return await axiosInstance.get("/shows");
},

//get show by id
getShowById: async (id) => {
  return await axiosInstance.get(`/shows/${id}`);
},

  // Create
  createShow: async (data) => {
    return await axiosInstance.post("/shows/admin", data);
  },

  // Update
  updateShow: async (id, data) => {
    return await axiosInstance.put(`/shows/admin/${id}`, data);
  },

  // Delete
  deleteShow: async (id) => {
    return await axiosInstance.delete(`/shows/admin/${id}`);
  },

  // User API
  getShowsByEventId: async (eventId) => {
    return await axiosInstance.get(`/shows/event/${eventId}`);
  },
};
