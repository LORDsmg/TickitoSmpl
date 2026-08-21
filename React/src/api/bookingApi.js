import api from "./axios";

/**
 * Booking APIs
 */

// Create Booking
export const createBooking = async (data) => {
  const response = await api.post("/bookings", data);

  return response.data;
};

// Get Logged-in User Bookings
export const getMyBookings = async (params = {}) => {
  const response = await api.get("/bookings/my", {
    params,
  });

  return response.data;
};

// Get Booking By ID
export const getBookingById = async (bookingId) => {
  const response = await api.get(
    `/bookings/${bookingId}`
  );

  return response.data;
};

// Cancel Booking
export const cancelBooking = async (
  bookingId,
  reason = ""
) => {
  const response = await api.patch(
    `/bookings/${bookingId}/cancel`,
    {
      reason,
    }
  );

  return response.data;
};

// Download Ticket (PDF)
export const downloadTicket = async (
  bookingId
) => {
  const response = await api.get(
    `/bookings/${bookingId}/ticket`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

// Resend Ticket Email
export const resendTicketEmail =
  async (bookingId) => {
    const response = await api.post(
      `/bookings/${bookingId}/resend-email`
    );

    return response.data;
  };

// Get QR Code
export const getBookingQrCode =
  async (bookingId) => {
    const response = await api.get(
      `/bookings/${bookingId}/qr`
    );

    return response.data;
  };

// Get Booking Invoice
export const getBookingInvoice =
  async (bookingId) => {
    const response = await api.get(
      `/bookings/${bookingId}/invoice`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  };

// Verify Booking
export const verifyBooking = async (
  bookingId
) => {
  const response = await api.get(
    `/bookings/${bookingId}/verify`
  );

  return response.data;
};