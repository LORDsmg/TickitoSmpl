import api from "./axios";

/* ============================================================
   USER MOVIE APIs
============================================================ */

// Get All Movies
export const getAllMovies = async (params = {}) => {
  const response = await api.get("/movies", {
    params,
  });

  return response.data;
};

// Get Movie By ID
export const getMovieById = async (movieId) => {
  const response = await api.get(`/movies/${movieId}`);

  return response.data;
};

// Get Trending Movies
export const getTrendingMovies = async () => {
  const response = await api.get("/movies/trending");

  return response.data;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const response = await api.get("/movies/upcoming");

  return response.data;
};

// Search Movies
export const searchMovies = async (query) => {
  const response = await api.get("/movies/search", {
    params: {
      query,
    },
  });

  return response.data;
};

// Movies By Genre
export const getMoviesByGenre = async (genre) => {
  const response = await api.get("/movies/genre", {
    params: {
      genre,
    },
  });

  return response.data;
};

// Recommended Movies
export const getRecommendedMovies = async () => {
  const response = await api.get("/movies/recommended");

  return response.data;
};

// Now Showing Movies
export const getNowShowingMovies = async () => {
  const response = await api.get("/movies/now-showing");

  return response.data;
};

// Movie Cast
export const getMovieCast = async (movieId) => {
  const response = await api.get(
    `/movies/${movieId}/cast`
  );

  return response.data;
};

// Movie Reviews
export const getMovieReviews = async (movieId) => {
  const response = await api.get(
    `/movies/${movieId}/reviews`
  );

  return response.data;
};

/* ============================================================
   ADMIN MOVIE APIs
============================================================ */

// Admin - Get All Movies
export const getAllMoviesAdmin = async (params = {}) => {
  const response = await api.get(
    "/admin/movies",
    {
      params,
    }
  );

  return response.data;
};

// Admin - Get Movie By ID
export const getMovieByIdAdmin = async (
  movieId
) => {
  const response = await api.get(
    `/admin/movies/${movieId}`
  );

  return response.data;
};

// Admin - Create Movie
export const createMovie = async (
  movieData
) => {
  const response = await api.post(
    "/admin/movies",
    movieData
  );

  return response.data;
};

// Admin - Update Movie
export const updateMovie = async (
  movieId,
  movieData
) => {
  const response = await api.put(
    `/admin/movies/${movieId}`,
    movieData
  );

  return response.data;
};

// Admin - Delete Movie
export const deleteMovie = async (
  movieId
) => {
  const response = await api.delete(
    `/admin/movies/${movieId}`
  );

  return response.data;
};

// Upload Poster
export const uploadMoviePoster =
  async (formData) => {
    const response = await api.post(
      "/admin/movies/upload/poster",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

// Upload Banner
export const uploadMovieBanner =
  async (formData) => {
    const response = await api.post(
      "/admin/movies/upload/banner",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };