import axiosInstance from "../api/axios";

export const paymentService = {
  createOrder: async (amount) => {
    return await axiosInstance.post("/payment/create-order", {
      amount: amount,
      currency: "INR",
      receipt: "TIKITO_" + Date.now(),
    });
  },

  verifyPayment: async (paymentData) => {
    return await axiosInstance.post("/payment/verify", paymentData);
  },
};
