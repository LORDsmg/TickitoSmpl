import axiosInstance from "../api/axios";

export const bookingService = {
  getAvailableSeats: async (showId) => {
    return await axiosInstance.get(
      `/booking/admin/getAvailableSeats?showId=${showId}`,
    );
  },

  createBooking: async (bookingData) => {
    return await axiosInstance.post("/booking/user", bookingData);
  },

  getMyBookings: async () => {
    return await axiosInstance.get("/booking/user/getMyBookings");
  },

  cancelBooking: async (bookingId) => {
    return await axiosInstance.patch(`/booking/user/cancel/${bookingId}`);
  },
};
