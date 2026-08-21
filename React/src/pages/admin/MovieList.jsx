import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";

import { toast } from "react-toastify";
import { movieService } from "../../services/movieService";
//import movieService from "../../services/movieService";

const PAGE_SIZE = 8;

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);

      const data = await movieService.getAllMovies();

      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this movie?");

    if (!ok) return;

    try {
      await movieService.deleteMovie(id);

      toast.success("Movie deleted successfully.");

      await loadMovies();
    } catch (err) {
      toast.error("Unable to load movies.");
      console.error(err);
      setMovies([]);
    }
  };

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.eventName?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [movies, search]);

  const totalPages = Math.ceil(filteredMovies.length / PAGE_SIZE);

  const pageData = filteredMovies.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Movies</h1>

          <p className="text-gray-400">Manage all movies</p>
        </div>

        <Link
          to="/admin/movies/add"
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          <FaPlus />
          Add Movie
        </Link>
      </div>

      <div className="flex items-center rounded-xl bg-[#1d1d1d] px-4">
        <FaSearch className="text-gray-400" />

        <input
          placeholder="Search movie..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="w-full bg-transparent p-4 outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#1a1a1a]">
        <table className="w-full">
          <thead className="bg-[#242424]">
            <tr>
              <th className="p-4 text-left">Poster</th>

              <th className="p-4 text-left">Movie Name</th>

              <th className="p-4 text-left">Type</th>

              {/* <th className="p-4 text-left">Language</th> */}

              <th className="p-4 text-left">Duration</th>

              {/* <th className="p-4 text-left">Rating</th> */}

              <th className="p-4 text-left">Age Limit</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="p-10 text-center">
                  Loading Movies...
                </td>
              </tr>
            )}

            {!loading &&
              pageData.map((movie) => (
                <tr key={movie.eventId} className="border-t border-[#2c2c2c]">
                  <td className="p-4">
                    <img
                      src={movie.posterUrl || "https://placehold.co/80x120"}
                      alt={movie.eventName}
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x120";
                      }}
                      className="h-24 w-16 rounded-lg object-cover"
                    />
                  </td>

                  <td className="p-4 font-medium">{movie.eventName}</td>

                  <td className="p-4">{movie.eventType}</td>

                  {/* <td className="p-4">{movie.language}</td> */}

                  <td className="p-4">{movie.eventDurationMin} min</td>

                  <td className="p-4">{movie.ageRestriction}+</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/movies/edit/${movie.eventId}`}
                        className="rounded-lg bg-blue-600 p-3 hover:bg-blue-500"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(movie.eventId)}
                        className="rounded-lg bg-red-600 p-3 hover:bg-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && pageData.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-400">
                  No Movies Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-yellow-400 text-black"
                  : "bg-[#242424]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
