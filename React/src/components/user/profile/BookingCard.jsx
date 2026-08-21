import { useState } from "react";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaChair,
  FaRupeeSign,
  FaTimesCircle,
} from "react-icons/fa";

import { bookingService } from "../../../services/bookingService";

function BookingCard({ booking, refreshBookings }) {
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      setLoading(true);

      await bookingService.cancelBooking(booking.bookingId);

      toast.success("Booking cancelled successfully.");

      await refreshBookings();
    } catch (err) {
      toast.error(err || "Unable to cancel booking.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#202020] p-6 transition hover:border-yellow-400">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold">{booking.eventName}</h2>

          <div className="mt-4 space-y-2 text-gray-300">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-yellow-400" />
              {booking.venueName}
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-yellow-400" />
              {booking.showDate}
            </div>

            <div className="flex items-center gap-3">
              <FaClock className="text-yellow-400" />
              {booking.showStartTime}
            </div>

            <div className="flex items-center gap-3">
              <FaChair className="text-yellow-400" />

              {booking.seatNumbers?.length
                ? booking.seatNumbers.join(", ")
                : "N/A"}
            </div>

            <div className="flex items-center gap-3">
              <FaRupeeSign className="text-yellow-400" />

              {booking.totalAmt}
            </div>
          </div>
        </div>

        <div className="text-right">
          {/* <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              booking.bookingStatus === "CONFIRMED"
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {booking.bookingStatus}
          </span> */}

          {booking.bookingStatus === "SUCCESS" && (
            <button
              onClick={handleCancelBooking}
              disabled={loading}
              className="mt-6 flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold transition hover:bg-red-500 disabled:opacity-50"
            >
              <FaTimesCircle />

              {loading ? "Cancelling..." : "Cancel Ticket"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
