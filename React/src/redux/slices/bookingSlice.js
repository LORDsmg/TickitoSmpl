import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
  selectedTheatre: null,
  selectedShow: null,

  selectedSeats: [],

  foodItems: [],

  payment: {
    method: "",
    coupon: "",
    subtotal: 0,
    convenienceFee: 0,
    gst: 0,
    total: 0,
    paymentStatus: "PENDING",
  },

  bookingDetails: null,

  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",

  initialState,

  reducers: {
    setSelectedMovie: (state, action) => {
      state.selectedMovie = action.payload;
    },

    setSelectedTheatre: (state, action) => {
      state.selectedTheatre = action.payload;
    },

    setSelectedShow: (state, action) => {
      state.selectedShow = action.payload;
    },

    setSelectedSeats: (state, action) => {
      state.selectedSeats = action.payload;
    },

    addSeat: (state, action) => {
      const exists = state.selectedSeats.find(
        (seat) => seat.id === action.payload.id
      );

      if (!exists) {
        state.selectedSeats.push(action.payload);
      }
    },

    removeSeat: (state, action) => {
      state.selectedSeats = state.selectedSeats.filter(
        (seat) => seat.id !== action.payload
      );
    },

    clearSeats: (state) => {
      state.selectedSeats = [];
    },

    setFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },

    addFoodItem: (state, action) => {
      const item = action.payload;

      const existing = state.foodItems.find(
        (food) => food.id === item.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.foodItems.push({
          ...item,
          quantity: 1,
        });
      }
    },

    removeFoodItem: (state, action) => {
      const existing = state.foodItems.find(
        (food) => food.id === action.payload
      );

      if (!existing) return;

      if (existing.quantity === 1) {
        state.foodItems = state.foodItems.filter(
          (food) => food.id !== action.payload
        );
      } else {
        existing.quantity -= 1;
      }
    },

    clearFoodItems: (state) => {
      state.foodItems = [];
    },

    setPayment: (state, action) => {
      state.payment = {
        ...state.payment,
        ...action.payload,
      };
    },

    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },

    setBookingLoading: (state, action) => {
      state.loading = action.payload;
    },

    setBookingError: (state, action) => {
      state.error = action.payload;
    },

    clearBooking: (state) => {
      state.selectedMovie = null;
      state.selectedTheatre = null;
      state.selectedShow = null;
      state.selectedSeats = [];
      state.foodItems = [];
      state.bookingDetails = null;
      state.loading = false;
      state.error = null;

      state.payment = {
        method: "",
        coupon: "",
        subtotal: 0,
        convenienceFee: 0,
        gst: 0,
        total: 0,
        paymentStatus: "PENDING",
      };
    },
  },
});

export const {
  setSelectedMovie,
  setSelectedTheatre,
  setSelectedShow,

  setSelectedSeats,
  addSeat,
  removeSeat,
  clearSeats,

  setFoodItems,
  addFoodItem,
  removeFoodItem,
  clearFoodItems,

  setPayment,
  setBookingDetails,

  setBookingLoading,
  setBookingError,

  clearBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;