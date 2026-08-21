import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { showService } from "../../services/showService";

const PAGE_SIZE = 8;

function ShowList() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadShows();
  }, []);

  const loadShows = async () => {
    try {
      setLoading(true);

      const data = await showService.getAllShows();

      setShows(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setShows([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteShow = async (id) => {
    const ok = window.confirm("Delete this show?");

    if (!ok) return;

    try {
      await showService.deleteShow(id);

      toast.success("Show deleted successfully.");

      loadShows();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Unable to delete show.");
    }
  };

  const filteredShows = useMemo(() => {
    return shows.filter((show) =>
      `${show.eventName}
       ${show.venueName}
       ${show.language}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [shows, search]);

  const totalPages = Math.ceil(filteredShows.length / PAGE_SIZE);

  const pageData = filteredShows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Shows</h1>

          <p className="text-gray-400">Manage all movie shows</p>
        </div>

        <Link
          to="/admin/shows/add"
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-300"
        >
          <FaPlus />
          Add Show
        </Link>
      </div>

      {/* Search */}

      <div className="flex items-center rounded-xl bg-[#1b1b1b] px-4">
        <FaSearch className="text-gray-400" />

        <input
          className="w-full bg-transparent p-4 outline-none"
          placeholder="Search show..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
        <table className="w-full">
          <thead className="bg-[#242424]">
            <tr>
              <th className="p-4 text-left">Movie</th>

              <th className="p-4 text-left">Venue</th>

              <th className="p-4 text-left">Language</th>

              <th className="p-4 text-left">Date</th>

              <th className="p-4 text-left">Start</th>

              <th className="p-4 text-left">End</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={8} className="p-10 text-center">
                  Loading shows...
                </td>
              </tr>
            )}

            {!loading &&
              pageData.map((show) => (
                <tr key={show.showId} className="border-t border-[#2c2c2c]">
                  <td className="p-4 font-medium">{show.eventName}</td>

                  <td className="p-4">{show.venueName}</td>

                  <td className="p-4">{show.language}</td>

                  <td className="p-4">{show.showDate}</td>

                  <td className="p-4">{show.showStartTime}</td>

                  <td className="p-4">{show.showEndTime}</td>

                  <td className="p-4 font-semibold">₹ {show.price}</td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/shows/edit/${show.showId}`}
                        className="rounded-lg bg-blue-600 p-3 hover:bg-blue-500"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => deleteShow(show.showId)}
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
                <td colSpan={8} className="p-12 text-center text-gray-400">
                  No shows found.
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

export default ShowList;
