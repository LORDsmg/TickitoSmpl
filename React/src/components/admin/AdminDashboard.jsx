import {
  FaFilm,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaMoneyBillWave,
  FaArrowUp,
} from "react-icons/fa";

const cards = [
  {
    title: "Total Movies",
    value: "124",
    icon: <FaFilm />,
    color: "bg-blue-600",
  },
  {
    title: "Theatres",
    value: "36",
    icon: <FaBuilding />,
    color: "bg-green-600",
  },
  {
    title: "Active Shows",
    value: "542",
    icon: <FaCalendarAlt />,
    color: "bg-purple-600",
  },
  {
    title: "Users",
    value: "12,540",
    icon: <FaUsers />,
    color: "bg-pink-600",
  },
  {
    title: "Today's Booking",
    value: "835",
    icon: <FaTicketAlt />,
    color: "bg-orange-600",
  },
  {
    title: "Revenue",
    value: "£18,420",
    icon: <FaMoneyBillWave />,
    color: "bg-yellow-500",
  },
];

function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-gray-400">Welcome back, Administrator.</p>
      </div>
      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl bg-[#1b1b1b] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400">{card.title}</p>

                <h2 className="mt-3 text-4xl font-bold">{card.value}</h2>

                <div className="mt-3 flex items-center gap-2 text-green-400">
                  <FaArrowUp />

                  <span className="text-sm">+12% this month</span>
                </div>
              </div>

              <div className={`rounded-2xl p-5 text-3xl ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl bg-[#1b1b1b] p-6 xl:col-span-2">
          <h2 className="mb-6 text-xl font-semibold">Revenue Overview</h2>

          <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-gray-700 text-gray-500">
            Revenue Chart
            <br />
            (Backend Ready)
          </div>
        </div>

        <div className="rounded-2xl bg-[#1b1b1b] p-6">
          <h2 className="mb-6 text-xl font-semibold">Quick Actions</h2>

          <div className="space-y-4">
            <button className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black">
              Add Movie
            </button>

            <button className="w-full rounded-xl bg-blue-600 py-3">
              Add Theatre
            </button>

            <button className="w-full rounded-xl bg-green-600 py-3">
              Create Show
            </button>

            <button className="w-full rounded-xl bg-red-600 py-3">
              View Reports
            </button>
          </div>
        </div>
      </div>{" "}
      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Latest Movies */}

        <div className="rounded-2xl bg-[#1b1b1b] p-6">
          <h2 className="mb-5 text-xl font-semibold">Latest Movies</h2>

          <div className="space-y-4">
            {[
              "Avengers Secret Wars",
              "Pushpa 3",
              "KGF Chapter 3",
              "Leo 2",
              "Dunki 2",
            ].map((movie, index) => (
              <div
                key={movie}
                className="flex items-center justify-between rounded-xl bg-[#252525] p-4"
              >
                <div>
                  <h3 className="font-semibold">{movie}</h3>

                  <p className="text-sm text-gray-400">Added Recently</p>
                </div>

                <span className="rounded-full bg-green-600 px-3 py-1 text-sm">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}

        <div className="rounded-2xl bg-[#1b1b1b] p-6">
          <h2 className="mb-5 text-xl font-semibold">Recent Bookings</h2>

          <div className="space-y-4">
            {[
              {
                user: "John Smith",
                movie: "Avengers",
                seats: "A1, A2",
              },
              {
                user: "Rahul Patel",
                movie: "Pushpa",
                seats: "C4",
              },
              {
                user: "Amit Shah",
                movie: "Leo",
                seats: "B2, B3",
              },
              {
                user: "David",
                movie: "KGF",
                seats: "E7",
              },
            ].map((booking, index) => (
              <div key={index} className="rounded-xl bg-[#252525] p-4">
                <h3 className="font-semibold">{booking.user}</h3>

                <p className="text-sm text-gray-400">{booking.movie}</p>

                <p className="mt-1 text-sm">Seats : {booking.seats}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recent Activity */}
      <div className="rounded-2xl bg-[#1b1b1b] p-6">
        <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-green-500"></div>

            <div>
              <h3 className="font-semibold">New Movie Added</h3>

              <p className="text-sm text-gray-400">
                Pushpa 3 was added successfully.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-blue-500"></div>

            <div>
              <h3 className="font-semibold">Theatre Updated</h3>

              <p className="text-sm text-gray-400">
                PVR Hinjewadi updated screen details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-yellow-500"></div>

            <div>
              <h3 className="font-semibold">New User Registered</h3>

              <p className="text-sm text-gray-400">
                28 new users joined today.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-red-500"></div>

            <div>
              <h3 className="font-semibold">Offer Expired</h3>

              <p className="text-sm text-gray-400">
                Weekend 25% discount has expired.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
