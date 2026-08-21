import theatreService from "./theatreService";
import { showService } from "./showService";
import { userService } from "./userService";
import { movieService } from "./movieService";

const dashboardService = {
  getDashboardData: async () => {
    const [movies, venues, shows, users] = await Promise.all([
      movieService.getAllMovies(),
      theatreService.getAllTheatres(),
      showService.getAllShows(),
      userService.getAllUsers(),
    ]);

    return {
      movies: movies || [],
      venues: venues || [],
      shows: shows || [],
      users: users || [],
    };
  },
};

export default dashboardService;
