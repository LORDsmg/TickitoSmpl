import axiosInstance from '../api/axios';

export const authService = {
login: async (credentials) => {
  const data = await axiosInstance.post("/auth/login", {
    email: credentials.email,
    password: credentials.password,
  });

  const user = {
    userId: data.userId,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    role: data.role,
  };

  localStorage.setItem("token", data.jwtToken);
  localStorage.setItem("user", JSON.stringify(user));

  return {
    token: data.token,
    user,
  };
},

  register: async (userData) => {
   const payload = {
  firstName: userData.firstName,
  lastName: userData.lastName,
  email: userData.email,
  password: userData.password,
  phone: userData.phone,
};
    return await axiosInstance.post('/user/register', payload);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};













// import {
//   login,
//   register,
//   logout,
//   getProfile,
//   updateProfile,
//   changePassword,
// } from "../api/authApi";

// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
//   logout as logoutAction,
//   updateUser,
// } from "../redux/slices/authSlice";

// /**
//  * Login User
//  */
// export const loginUser =
//   (credentials) => async (dispatch) => {
//     dispatch(loginStart());

//     try {
//       const response = await login(credentials);

//       localStorage.setItem(
//         "token",
//         response.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(response.user)
//       );

//       dispatch(
//         loginSuccess({
//           token: response.token,
//           user: response.user,
//         })
//       );

//       return response;
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Login failed.";

//       dispatch(loginFailure(message));

//       throw error;
//     }
//   };

// /**
//  * Register User
//  */
// export const registerUser =
//   (userData) => async () => {
//     return await register(userData);
//   };

// /**
//  * Logout User
//  */
// export const logoutUser =
//   () => async (dispatch) => {
//     try {
//       await logout();
//     } catch (error) {
//       // Ignore API failure during logout
//     }

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     dispatch(logoutAction());
//   };

// /**
//  * Fetch Profile
//  */
// export const fetchProfile =
//   () => async (dispatch) => {
//     const profile = await getProfile();

//     dispatch(updateUser(profile));

//     return profile;
//   };

// /**
//  * Update Profile
//  */
// export const saveProfile =
//   (data) => async (dispatch) => {
//     const updated = await updateProfile(data);

//     dispatch(updateUser(updated));

//     return updated;
//   };

// /**
//  * Change Password
//  */
// export const updatePassword =
//   (data) => async () => {
//     return await changePassword(data);
//   };