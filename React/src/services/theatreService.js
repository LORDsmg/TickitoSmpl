import {
  getTheatresByMovie,
  getTheatreById,
  getTheatreShows,

  getAllTheatres,
  getAdminTheatreById,
  createTheatre,
  updateTheatre,
  deleteTheatre,
} from "../api/theatreApi";

/* ============================================================
   USER SERVICES
============================================================ */

export const fetchTheatresByMovie = async (
  movieId,
  date = null
) => {
  return await getTheatresByMovie(movieId, date);
};

export const fetchTheatreDetails = async (
  theatreId
) => {
  return await getTheatreById(theatreId);
};

export const fetchTheatreShows = async (
  theatreId
) => {
  return await getTheatreShows(theatreId);
};

/* ============================================================
   ADMIN SERVICES
============================================================ */

export const fetchAdminTheatres = async (
  params = {}
) => {
  return await getAllTheatres(params);
};

export const fetchAdminTheatreById = async (
  id
) => {
  return await getAdminTheatreById(id);
};

export const createAdminTheatre = async (
  theatre
) => {
  return await createTheatre(theatre);
};

export const updateAdminTheatre = async (
  id,
  theatre
) => {
  return await updateTheatre(id, theatre);
};

export const deleteAdminTheatre = async (
  id
) => {
  return await deleteTheatre(id);
};

/* ============================================================
   DEFAULT EXPORT
============================================================ */

const theatreService = {
  // User
  getTheatresByMovie: fetchTheatresByMovie,
  getTheatreById: fetchTheatreDetails,
  getTheatreShows: fetchTheatreShows,

  // Admin
  getAllTheatres: fetchAdminTheatres,
  getAdminTheatreById: fetchAdminTheatreById,
  createTheatre: createAdminTheatre,
  updateTheatre: updateAdminTheatre,
  deleteTheatre: deleteAdminTheatre,
};

export default theatreService;