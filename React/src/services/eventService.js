import axiosInstance from "../api/axios";

export const eventService = {
  getAllEvents: async () => {
    return await axiosInstance.get("/events");
  },

  getEventById: async (id) => {
    return await axiosInstance.get(`/events/${id}`);
  },
};
