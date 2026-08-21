import { useEffect, useState } from "react";
import { FaFilm, FaBuilding, FaCalendarAlt, FaUsers } from "react-icons/fa";

import dashboardService from "../../services/dashboardService";

function AdminDashboard() {
  const [stats, setStats] = useState({
    movies: [],
    venues: [],
    shows: [],
    users: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const data = await dashboardService.getDashboardData();

      setStats({
        movies: data.movies || [],
        venues: data.venues || [],
        shows: data.shows || [],
        users: data.users || [],
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-xl">
        Loading Dashboard...
      </div>
    );
  }

  const cards = [
    {
      title: "Movies",
      count: stats.movies.length,
      icon: <FaFilm />,
      color: "bg-blue-600",
    },
    {
      title: "Venues",
      count: stats.venues.length,
      icon: <FaBuilding />,
      color: "bg-green-600",
    },
    {
      title: "Shows",
      count: stats.shows.length,
      icon: <FaCalendarAlt />,
      color: "bg-purple-600",
    },
    {
      title: "Users",
      count: stats.users.length,
      icon: <FaUsers />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-400">Welcome to the Tikito Admin Panel</p>
      </div>

      {/* Statistics Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-[#1b1b1b] p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">{card.title}</p>

                <h2 className="mt-3 text-4xl font-bold">{card.count}</h2>
              </div>

              <div
                className={`rounded-full p-4 text-2xl text-white ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Movies */}

      <div className="rounded-2xl bg-[#1b1b1b] p-6">
        <h2 className="mb-5 text-2xl font-semibold">Recent Movies</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#333] text-left">
              <tr>
                <th className="p-3">Movie</th>
                <th className="p-3">Type</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Age</th>
              </tr>
            </thead>

            <tbody>
              {stats.movies.slice(0, 5).map((movie) => (
                <tr key={movie.eventId} className="border-b border-[#2a2a2a]">
                  <td className="p-3 font-medium">{movie.eventName}</td>

                  <td className="p-3">{movie.eventType}</td>

                  <td className="p-3">{movie.eventDurationMin} mins</td>

                  <td className="p-3">{movie.ageRestriction}+</td>
                </tr>
              ))}

              {stats.movies.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No Movies Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Venues */}

      <div className="rounded-2xl bg-[#1b1b1b] p-6">
        <h2 className="mb-5 text-2xl font-semibold">Recent Venues</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#333] text-left">
              <tr>
                <th className="p-3">Venue</th>
                <th className="p-3">Address</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Facilities</th>
              </tr>
            </thead>

            <tbody>
              {stats.venues.slice(0, 5).map((venue) => (
                <tr key={venue.venueId} className="border-b border-[#2a2a2a]">
                  <td className="p-3 font-medium">{venue.name}</td>

                  <td className="p-3">{venue.address}</td>

                  <td className="p-3">{venue.seatCapacity}</td>

                  <td className="p-3">
                    {venue.areFacilitiesAvailable ? "Available" : "No"}
                  </td>
                </tr>
              ))}

              {stats.venues.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-6 text-center text-gray-400">
                    No Venues Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
