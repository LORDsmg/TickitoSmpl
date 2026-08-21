import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  setTheatre,
  setShowTime,
} from "../../../redux/slices/bookingSlice";

function TheatreCard({ theatre, movieId }) {
  const dispatch = useDispatch();

  const handleSelect = (time) => {
    dispatch(setTheatre(theatre));
    dispatch(setShowTime(time));
  };

  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#181818] p-6 transition hover:border-yellow-400">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {theatre.name}
          </h2>

          <p className="mt-2 text-gray-400">
            {theatre.location}
          </p>

          <p className="mt-1 text-sm text-gray-500">
            {theatre.distance}
          </p>

        </div>

        <div className="flex gap-2">

          {theatre.formats.map((format) => (
            <span
              key={format}
              className="rounded-lg bg-yellow-400 px-3 py-1 text-sm font-semibold text-black"
            >
              {format}
            </span>
          ))}

        </div>

      </div>

      <div className="mt-8 flex flex-wrap gap-4">

        {theatre.timings.map((time) => (
          <Link
            key={time}
            to={`/movie/${movieId}/seats`}
            onClick={() => handleSelect(time)}
            className="rounded-xl border border-green-500 px-5 py-3 text-green-400 transition hover:bg-green-500 hover:text-black"
          >
            {time}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default TheatreCard;