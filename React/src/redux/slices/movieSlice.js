import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  movieDetails: null,

  theatres: [],
  shows: [],

  trendingMovies: [],
  upcomingMovies: [],

  searchQuery: "",
  searchResults: [],

  selectedGenre: "All",

  loading: false,
  error: null,
};

const movieSlice = createSlice({
  name: "movies",

  initialState,

  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },

    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },

    clearMovieDetails: (state) => {
      state.movieDetails = null;
    },

    setTheatres: (state, action) => {
      state.theatres = action.payload;
    },

    setShows: (state, action) => {
      state.shows = action.payload;
    },

    setTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },

    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },

    clearSearch: (state) => {
      state.searchQuery = "";
      state.searchResults = [];
    },

    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },

    setMovieLoading: (state, action) => {
      state.loading = action.payload;
    },

    setMovieError: (state, action) => {
      state.error = action.payload;
    },

    clearMovieError: (state) => {
      state.error = null;
    },

    resetMovieState: () => initialState,
  },
});

export const {
  setMovies,
  setMovieDetails,
  clearMovieDetails,

  setTheatres,
  setShows,

  setTrendingMovies,
  setUpcomingMovies,

  setSearchQuery,
  setSearchResults,
  clearSearch,

  setSelectedGenre,

  setMovieLoading,
  setMovieError,
  clearMovieError,

  resetMovieState,
} = movieSlice.actions;

export default movieSlice.reducer;