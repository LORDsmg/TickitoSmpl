import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import theatreService from "../../services/theatreService";

const PAGE_SIZE = 8;

function TheatreList() {
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadTheatres();
  }, []);

  const loadTheatres = async () => {
    try {
      setLoading(true);

      const data = await theatreService.getAllTheatres();

      console.log("THEATRES:", data);

      setTheatres(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTheatres([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this theatre?");

    if (!ok) return;

    try {
      await theatreService.deleteTheatre(id);

      toast.success("Theatre deleted successfully.");

      loadTheatres();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Unable to delete theatre.");
    }
  };

  const filteredTheatres = useMemo(() => {
    return theatres.filter((theatre) =>
      `${theatre.name} ${theatre.address}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [theatres, search]);

  const totalPages = Math.ceil(filteredTheatres.length / PAGE_SIZE);

  const pageData = filteredTheatres.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Theatres</h1>

          <p className="text-gray-400">Manage all theatres</p>
        </div>

        <Link
          to="/admin/theatres/add"
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          <FaPlus />
          Add Theatre
        </Link>
      </div>

      {/* Search */}

      <div className="flex items-center rounded-xl bg-[#1d1d1d] px-4">
        <FaSearch className="text-gray-400" />

        <input
          placeholder="Search theatre..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="w-full bg-transparent p-4 outline-none"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
        <table className="w-full">
          <thead className="bg-[#242424]">
            <tr>
              <th className="p-4 text-left">Theatre</th>

              <th className="p-4 text-left">Address</th>

              <th className="p-4 text-left">Seat Capacity</th>

              <th className="p-4 text-left">Facilities</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="p-10 text-center">
                  Loading Theatres...
                </td>
              </tr>
            )}

            {!loading &&
              pageData.map((theatre) => (
                <tr key={theatre.venueId} className="border-t border-[#2c2c2c]">
                  <td className="p-4 font-medium">{theatre.name}</td>

                  <td className="p-4">{theatre.address}</td>

                  <td className="p-4">{theatre.seatCapacity}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        theatre.areFacilitiesAvailable
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {theatre.areFacilitiesAvailable
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/theatres/edit/${theatre.venueId}`}
                        className="rounded-lg bg-blue-600 p-3 hover:bg-blue-500"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(theatre.venueId)}
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
                <td colSpan={5} className="p-12 text-center text-gray-400">
                  No theatres found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

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

export default TheatreList;
