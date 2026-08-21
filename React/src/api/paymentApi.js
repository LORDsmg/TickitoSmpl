import api from "./axios";

/**
 * Payment APIs
 */

// Create Payment Order
export const createPaymentOrder = async (data) => {
  const response = await api.post("/payments/order", data);

  return response.data;
};

// Verify Payment
export const verifyPayment = async (data) => {
  const response = await api.post("/payments/verify", data);

  return response.data;
};

// Get Payment Status
export const getPaymentStatus = async (paymentId) => {
  const response = await api.get(
    `/payments/${paymentId}/status`
  );

  return response.data;
};

// Request Refund
export const requestRefund = async (
  paymentId,
  reason = ""
) => {
  const response = await api.post(
    `/payments/${paymentId}/refund`,
    {
      reason,
    }
  );

  return response.data;
};

// Get Payment Receipt
export const downloadPaymentReceipt =
  async (paymentId) => {
    const response = await api.get(
      `/payments/${paymentId}/receipt`,
      {
        responseType: "blob",
      }
    );

    return response.data;
  };

// Apply Coupon
export const applyCoupon = async (
  couponCode,
  bookingAmount
) => {
  const response = await api.post(
    "/payments/apply-coupon",
    {
      couponCode,
      bookingAmount,
    }
  );

  return response.data;
};

// Validate Coupon
export const validateCoupon = async (
  couponCode
) => {
  const response = await api.get(
    "/payments/validate-coupon",
    {
      params: {
        couponCode,
      },
    }
  );

  return response.data;
};

// Remove Coupon
export const removeCoupon = async (
  couponCode
) => {
  const response = await api.post(
    "/payments/remove-coupon",
    {
      couponCode,
    }
  );

  return response.data;
};

// Get Supported Payment Methods
export const getPaymentMethods =
  async () => {
    const response = await api.get(
      "/payments/methods"
    );

    return response.data;
  };

// Get Payment History
export const getPaymentHistory =
  async (params = {}) => {
    const response = await api.get(
      "/payments/history",
      {
        params,
      }
    );

    return response.data;
  };