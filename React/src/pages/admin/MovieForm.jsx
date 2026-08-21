import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { movieService } from "../../services/movieService";

const initialState = {
  eventName: "",
  eventDescription: "",
  eventDurationMin: "",
  ageRestriction: 18,
};

function MovieForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [movie, setMovie] = useState(initialState);

  const [poster, setPoster] = useState(null);
  const [posterPreview, setPosterPreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadMovie();
    }
  }, [id]);

  const loadMovie = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await movieService.getMovieById(id);

      setMovie({
        eventName: data.eventName || "",
        eventDescription: data.eventDescription || "",
        eventDurationMin: data.eventDurationMin || "",
        ageRestriction: data.ageRestriction ?? 18,
      });

      // Existing Cloudinary poster
      if (data.posterUrl) {
        setPosterPreview(data.posterUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load movie.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setMovie((prev) => ({
      ...prev,
      [name]:
        name === "eventDurationMin" || name === "ageRestriction"
          ? Number(value)
          : value,
    }));
  };

  const handlePosterChange = (e) => {
    const selectedPoster = e.target.files?.[0];

    if (!selectedPoster) {
      return;
    }

    setPoster(selectedPoster);

    const previewUrl = URL.createObjectURL(selectedPoster);
    setPosterPreview(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!movie.eventName.trim()) {
      setError("Movie name is required.");
      return;
    }

    if (!movie.eventDurationMin || Number(movie.eventDurationMin) <= 0) {
      setError("Valid movie duration is required.");
      return;
    }

    try {
      setSaving(true);

      if (id) {
        await movieService.updateMovie(id, {
          ...movie,
          poster,
        });

        toast.success("Movie updated successfully.");
      } else {
        await movieService.createMovie({
          ...movie,
          poster,
        });

        toast.success("Movie added successfully.");
      }

      navigate("/admin/movies");
    } catch (err) {
      console.error(err);

      const message =
        typeof err === "string"
          ? err
          : err?.response?.data?.message || "Unable to save movie.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <h2 className="text-3xl text-white">Loading Movie...</h2>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">
          {id ? "Edit Movie" : "Add Movie"}
        </h1>

        <p className="mt-2 text-gray-400">Enter movie information.</p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {/* Movie Name */}

        <div>
          <label className="mb-2 block text-white">Movie Name</label>

          <input
            type="text"
            name="eventName"
            value={movie.eventName}
            onChange={handleChange}
            placeholder="Enter movie name"
            className="w-full rounded-xl bg-[#252525] p-4 text-white outline-none"
          />
        </div>

        {/* Duration */}

        <div>
          <label className="mb-2 block text-white">Duration (minutes)</label>

          <input
            type="number"
            min="1"
            name="eventDurationMin"
            value={movie.eventDurationMin}
            onChange={handleChange}
            placeholder="150"
            className="w-full rounded-xl bg-[#252525] p-4 text-white outline-none"
          />
        </div>

        {/* Age Restriction */}

        <div>
          <label className="mb-2 block text-white">Age Restriction</label>

          <input
            type="number"
            min="0"
            name="ageRestriction"
            value={movie.ageRestriction}
            onChange={handleChange}
            placeholder="18"
            className="w-full rounded-xl bg-[#252525] p-4 text-white outline-none"
          />
        </div>

        {/* Poster */}

        <div>
          <label className="mb-2 block text-white">Movie Poster</label>

          <input
            type="file"
            accept="image/*"
            onChange={handlePosterChange}
            className="w-full rounded-xl bg-[#252525] p-4 text-white"
          />

          {posterPreview && (
            <div className="mt-4">
              <p className="mb-2 text-sm text-gray-400">Poster Preview</p>

              <img
                src={posterPreview}
                alt="Movie poster preview"
                className="h-56 w-40 rounded-xl border border-[#333] object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* Description */}

        <div className="lg:col-span-2">
          <label className="mb-2 block text-white">Movie Description</label>

          <textarea
            rows={5}
            name="eventDescription"
            value={movie.eventDescription}
            onChange={handleChange}
            placeholder="Enter movie description..."
            className="w-full rounded-xl bg-[#252525] p-4 text-white outline-none"
          />
        </div>

        {/* Buttons */}

        <div className="flex gap-4 lg:col-span-2">
          <button
            type="button"
            onClick={() => navigate("/admin/movies")}
            className="rounded-xl border border-gray-600 px-8 py-4 text-white hover:bg-[#2d2d2d]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
          >
            {saving ? "Saving..." : id ? "Update Movie" : "Add Movie"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
