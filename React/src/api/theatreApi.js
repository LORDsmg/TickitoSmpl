import api from "./axios";

/* USER */

export const getTheatresByMovie = async (movieId, date = null) => {
  return await api.get("/venue", {
    params: { movieId, date },
  });
};

export const getTheatreById = async (id) => {
  return await api.get(`/venue/${id}`);
};

export const getTheatreShows = async (id) => {
  return await api.get(`/venue/${id}`);
};

/* ADMIN */

export const getAllTheatres = async () => {
  return await api.get("/venue");
};

export const getAdminTheatreById = async (id) => {
  return await api.get(`/venue/${id}`);
};

export const createTheatre = async (data) => {
  return await api.post("/venue/admin", data);
};

export const updateTheatre = async (id, data) => {
  return await api.put(`/venue/admin/${id}`, data);
};

export const deleteTheatre = async (id) => {
  return await api.delete(`/venue/admin/${id}`);
};
