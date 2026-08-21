import { createSlice } from '@reduxjs/toolkit';
const storedUser = localStorage.getItem("user");

let initialUser = null;

try {
  initialUser =
    storedUser && storedUser !== "undefined"
      ? JSON.parse(storedUser)
      : null;
} catch (err) {
  localStorage.removeItem("user");
  initialUser = null;
}

const initialToken = localStorage.getItem("token") || null;
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
    token: initialToken,
    isAuthenticated: !!initialToken,
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;















// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const authSlice = createSlice({
//   name: "auth",

//   initialState,

//   reducers: {
//     loginStart: (state) => {
//       state.loading = true;
//       state.error = null;
//     },

//     loginSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.token = action.payload.token;
//       state.isAuthenticated = true;
//       state.error = null;
//     },

//     loginFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//     },

//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//       state.error = null;
//     },

//     updateUser: (state, action) => {
//       state.user = {
//         ...state.user,
//         ...action.payload,
//       };
//     },

//     clearError: (state) => {
//       state.error = null;
//     },
//   },
// });

// export const {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout,
//   updateUser,
//   clearError,
// } = authSlice.actions;

// export default authSlice.reducer;