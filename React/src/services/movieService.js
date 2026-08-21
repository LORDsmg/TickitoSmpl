import axiosInstance from "../api/axios";

const buildMovieFormData = (movieData) => {
  const formData = new FormData();

  formData.append("eventName", movieData.eventName);
  formData.append("eventType", "MOVIE");
  formData.append("eventDescription", movieData.eventDescription || "");
  formData.append("eventDurationMin", movieData.eventDurationMin || "");
  formData.append("ageRestriction", movieData.ageRestriction ?? 18);

  if (movieData.poster) {
    formData.append("poster", movieData.poster);
  }

  return formData;
};

export const movieService = {
  getAllMovies: async () => {
    return await axiosInstance.get("/events/type/MOVIE");
  },

  getMovieById: async (id) => {
    return await axiosInstance.get(`/events/${id}`);
  },

  createMovie: async (movieData) => {
    const formData = buildMovieFormData(movieData);

    return await axiosInstance.post("/events", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateMovie: async (id, movieData) => {
    const formData = buildMovieFormData(movieData);

    return await axiosInstance.put(`/events/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMovie: async (id) => {
    return await axiosInstance.delete(`/events/${id}`);
  },
};
