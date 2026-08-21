import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import Container from "./Container";
import { eventService } from "../../services/eventService";

function Navbar() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const events = await eventService.getAllEvents();

      const formattedMovies = events.map((event) => ({
        id: event.eventId,
        title: event.eventName,
        image: event.posterUrl,
      }));

      setMovies(formattedMovies);
    } catch (err) {
      console.error(err);
    }
  };

  const matches = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return movies
      .filter((movie) => movie.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 4);
  }, [query]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#252525] bg-[#111111]/90 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between gap-8">
          <Link
            to="/"
            className="text-3xl font-bold text-yellow-400 whitespace-nowrap"
          >
            TIKITO
          </Link>

          <div className="relative hidden w-full max-w-md lg:block xl:max-w-lg">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-xl border border-[#2D2D2D] bg-[#1A1A1A] pl-12 pr-4 outline-none transition focus:border-yellow-400"
            />

            {query && (
              <div className="absolute left-0 right-0 top-14 overflow-hidden rounded-xl border border-[#2D2D2D] bg-[#181818] p-2 shadow-2xl">
                {matches.length > 0 ? (
                  matches.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      onClick={() => setQuery("")}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-[#252525]"
                    >
                      <img
                        src={movie.image}
                        alt=""
                        className="h-10 w-8 rounded object-cover"
                      />
                      <span className="text-sm font-medium">{movie.title}</span>
                    </Link>
                  ))
                ) : (
                  <p className="px-3 py-3 text-sm text-gray-400">
                    No movies found
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-5">
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              aria-label="Account"
            >
              <FaUserCircle className="text-3xl transition hover:text-yellow-400" />
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Navbar;
