import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import theatreService from "../../services/theatreService";

const initialState = {
  name: "",
  address: "",
  seatCapacity: "",
  areFacilitiesAvailable: false,
};

function TheatreForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [theatre, setTheatre] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadTheatre();
    }
  }, [id]);

  const loadTheatre = async () => {
    try {
      setLoading(true);

      const data = await theatreService.getAdminTheatreById(id);

      console.log("THEATRE:", data);

      setTheatre({
        name: data.name || "",
        address: data.address || "",
        seatCapacity: data.seatCapacity ?? "",
        areFacilitiesAvailable: data.areFacilitiesAvailable || false,
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load theatre.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTheatre((prev) => ({
      ...prev,
      [name]:
        name === "seatCapacity"
          ? Number(value)
          : name === "areFacilitiesAvailable"
            ? value === "true"
            : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-lg">
        Loading Theatre...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-[#1b1b1b] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {id ? "Edit Theatre" : "Add Theatre"}
        </h1>

        <p className="mt-2 text-gray-400">Enter Theatre information.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <form className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Venue Name */}

        <div>
          <label className="mb-2 block">Theatre Name</label>

          <input
            type="text"
            name="name"
            value={theatre.name}
            onChange={handleChange}
            placeholder="Enter Name"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
            required
          />
        </div>

        {/* Seat Capacity */}

        <div>
          <label className="mb-2 block">Seat Capacity</label>

          <input
            type="number"
            min="1"
            name="seatCapacity"
            value={theatre.seatCapacity}
            onChange={handleChange}
            placeholder="0"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Address */}

        <div className="lg:col-span-2">
          <label className="mb-2 block">Address</label>

          <textarea
            rows={4}
            name="address"
            value={theatre.address}
            onChange={handleChange}
            placeholder="Enter Theatre address"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Facilities */}

        <div>
          <label className="mb-2 block">Facilities Available</label>

          <select
            name="areFacilitiesAvailable"
            value={theatre.areFacilitiesAvailable}
            onChange={(e) =>
              setTheatre((prev) => ({
                ...prev,
                areFacilitiesAvailable: e.target.value === "true",
              }))
            }
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 lg:col-span-2">
          <button
            type="button"
            onClick={() => navigate("/admin/theatres")}
            className="rounded-xl border border-gray-600 px-8 py-4 transition hover:bg-[#2d2d2d]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={async (e) => {
              e.preventDefault();

              setError("");

              if (!theatre.name.trim()) {
                setError("Theatre name is required.");
                return;
              }

              if (!theatre.address.trim()) {
                setError("Address is required.");
                return;
              }

              try {
                setSaving(true);

                if (id) {
                  await theatreService.updateTheatre(id, theatre);
                } else {
                  await theatreService.createTheatre(theatre);
                }

                toast.success(
                  id
                    ? "Theatre updated successfully."
                    : "Theatre added successfully.",
                );

                navigate("/admin/theatres");
              } catch (err) {
                console.error(err);

                setError(
                  err?.response?.data?.message || "Unable to save Theatre.",
                );

                toast.error(
                  err?.response?.data?.message || "Unable to save Theatre.",
                );
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving..." : id ? "Update Theatre" : "Add Theatre"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TheatreForm;
