import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaChair,
  FaEye,
  FaCheckCircle,
} from "react-icons/fa";

import Container from "../../components/common/Container";
import { bookingService } from "../../services/bookingService";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data);
    } catch (err) {
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `₹${Number(amount).toFixed(2)}`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return time.substring(0, 5);
  };

  if (loading) {
    return (
      <section className="py-12">
        <Container>
          <h2 className="text-center text-2xl">Loading Bookings...</h2>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12">
      <Container>
        {/* Header */}

        <div className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            MY BOOKINGS
          </p>

          <h1 className="mt-2 text-5xl font-bold">Booking History</h1>

          <p className="mt-3 text-gray-400">View all your booked tickets.</p>
        </div>

        <div className="space-y-6">
          {bookings.map((booking) => (
            <article
              key={booking.bookingId}
              className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#181818]"
            >
              <div className="p-6">
                <div className="flex flex-col justify-between gap-5 sm:flex-row">
                  <div>
                    <h2 className="text-2xl font-bold">{booking.eventName}</h2>

                    <div className="mt-4 grid gap-2 text-sm text-gray-300 sm:grid-cols-2">
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-yellow-400" />
                        {booking.venueName}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaCalendarAlt className="text-yellow-400" />
                        {formatDate(booking.showDate)}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaClock className="text-yellow-400" />
                        {formatTime(booking.showStartTime)}
                      </span>

                      <span className="flex items-center gap-2">
                        <FaChair className="text-yellow-400" />
                        {booking.seatNumbers.join(", ")}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right">
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-2 text-sm text-green-400">
                      <FaCheckCircle />

                      {booking.bookingStatus}
                    </span>

                    <p className="mt-4 text-2xl font-bold text-yellow-400">
                      {formatCurrency(booking.totalAmt)}
                    </p>

                    <p className="text-xs text-gray-400">
                      Booking ID : {booking.bookingId}
                    </p>
                  </div>
                </div>

                <Link
                  to="/booking-success"
                  state={{ booking }}
                  className="mt-6 inline-flex items-center gap-2 rounded-xl border border-yellow-400 px-4 py-2 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <FaEye />
                  View Ticket
                </Link>
              </div>
            </article>
          ))}

          {bookings.length === 0 && (
            <div className="rounded-3xl border border-dashed border-[#333] py-20 text-center">
              <h2 className="text-3xl font-bold">No Bookings Yet</h2>

              <p className="mt-3 text-gray-400">
                Book a movie and it will appear here.
              </p>

              <Link
                to="/"
                className="mt-8 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black"
              >
                Explore Movies
              </Link>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

export default MyBookings;
