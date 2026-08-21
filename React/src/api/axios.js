import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/tikito";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Tikito Spring Boot backend wraps responses in Resp { status, message, data }
    if (response.data && response.data.data !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(errorMsg);
  },
);

export default axiosInstance;

// import axios from "axios";

// const api = axios.create({
//   baseURL:
//     import.meta.env.VITE_API_BASE_URL ||
//     "http://localhost:8080/tikito",

//   timeout: 15000,

//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// /**
//  * Request Interceptor
//  * Automatically attach JWT token
//  */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// /**
//  * Response Interceptor
//  */
// api.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");

//       // Later:
//       // store.dispatch(logout())
//       // navigate("/login")
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;
