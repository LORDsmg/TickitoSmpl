import { Link } from "react-router-dom";
import { FaHeart, FaStar, FaPlay } from "react-icons/fa";

function MovieCard({ movie }) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#181818] shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-yellow-500/20"
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden">
        <img
          src={movie.image}
          alt={movie.title}
          className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Wishlist */}
        {/* <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 backdrop-blur transition hover:bg-red-500"
        >
          <FaHeart className="text-white" />
        </button> */}

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow-lg">
          <FaStar />
          {movie.rating}
        </div>

        {/* Hover Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-2xl text-black shadow-xl">
            <FaPlay />
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-5">
        <h2 className="truncate text-2xl font-bold text-white">
          {movie.title}
        </h2>

        <p className="mt-2 text-gray-400">
          {movie.genre} • {movie.duration}
        </p>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{movie.language}</span>
          <span>{movie.certification}</span>
        </div>

        <span className="mt-6 block w-full rounded-2xl bg-yellow-400 py-3 text-center font-bold text-black transition-all duration-300 group-hover:scale-[1.02] group-hover:bg-yellow-300">
          🎟 Book Tickets
        </span>
      </div>
    </Link>
  );
}

export default MovieCard;
