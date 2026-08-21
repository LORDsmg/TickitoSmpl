import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { showService } from "../../services/showService";
import { movieService } from "../../services/movieService";
import theatreService from "../../services/theatreService";

const initialState = {
  eventId: "",
  venueId: "",
  language: "English",
  price: "",
  eighteenPlus: false,
  showDate: "",
  showStartTime: "",
  showEndTime: "",
};

function ShowForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [form, setForm] = useState(initialState);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    loadDropdowns();

    if (id) {
      loadShow();
    }
  }, [id]);

  const loadDropdowns = async () => {
    try {
      const [movieData, theatreData] = await Promise.all([
        movieService.getAllMovies(),
        theatreService.getAllTheatres(),
      ]);

      setMovies(Array.isArray(movieData) ? movieData : []);
      setTheatres(Array.isArray(theatreData) ? theatreData : []);
    } catch (err) {
      console.error(err);

      setMovies([]);
      setTheatres([]);
    }
  };

  const loadShow = async () => {
    try {
      setLoading(true);

      const data = await showService.getShowById(id);

      setForm({
        ...initialState,
        ...data,
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load show.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-lg">
        Loading Show...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-2xl bg-[#1b1b1b] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{id ? "Edit Show" : "Add Show"}</h1>

        <p className="mt-2 text-gray-400">Enter show information.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Movie */}

        <div>
          <label className="mb-2 block">Movie</label>

          <select
            name="eventId"
            value={form.eventId}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          >
            <option value="">Select Movie</option>

            {movies.map((movie) => (
              <option key={movie.eventId} value={movie.eventId}>
                {movie.eventName}
              </option>
            ))}
          </select>
        </div>

        {/* Venue */}

        <div>
          <label className="mb-2 block">Venue</label>

          <select
            name="venueId"
            value={form.venueId}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          >
            <option value="">Select Venue</option>

            {theatres.map((theatre) => (
              <option key={theatre.venueId} value={theatre.venueId}>
                {theatre.name}
              </option>
            ))}
          </select>
        </div>

        {/* Language */}

        <div>
          <label className="mb-2 block">Language</label>

          <input
            type="text"
            name="language"
            value={form.language}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Price */}

        <div>
          <label className="mb-2 block">Ticket Price</label>

          <input
            type="number"
            min="0"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="250"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Date */}

        <div>
          <label className="mb-2 block">Show Date</label>

          <input
            type="date"
            name="showDate"
            value={form.showDate}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Start Time */}

        <div>
          <label className="mb-2 block">Start Time</label>

          <input
            type="time"
            name="showStartTime"
            value={form.showStartTime}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* End Time */}

        <div>
          <label className="mb-2 block">End Time</label>

          <input
            type="time"
            name="showEndTime"
            value={form.showEndTime}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* 18+ */}

        <div>
          <label className="mb-2 block">18+ Show</label>

          <select
            name="eighteenPlus"
            value={form.eighteenPlus}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                eighteenPlus: e.target.value === "true",
              }))
            }
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>

        <div className="flex gap-4 md:col-span-2">
          <button
            type="button"
            onClick={() => navigate("/admin/shows")}
            className="rounded-xl border border-gray-600 px-8 py-4 hover:bg-[#2a2a2a]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
            onClick={async (e) => {
              e.preventDefault();

              setError("");

              if (!form.eventId) {
                setError("Please select a movie.");
                return;
              }

              if (!form.venueId) {
                setError("Please select a venue.");
                return;
              }

              if (!form.showDate) {
                setError("Show date is required.");
                return;
              }

              if (!form.showStartTime || !form.showEndTime) {
                setError("Please select start and end time.");
                return;
              }

              if (!form.price) {
                setError("Ticket price is required.");
                return;
              }

              try {
                setSaving(true);

                if (id) {
                  await showService.updateShow(id, form);

                  toast.success("Show updated successfully.");
                } else {
                  await showService.createShow(form);

                  toast.success("Show added successfully.");
                }

                navigate("/admin/shows");
              } catch (err) {
                console.error(err);

                setError(
                  err?.response?.data?.message || "Unable to save show.",
                );

                toast.error(
                  err?.response?.data?.message || "Unable to save show.",
                );
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving..." : id ? "Update Show" : "Add Show"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShowForm;
