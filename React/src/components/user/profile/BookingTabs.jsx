import { useState } from "react";

import CurrentBookings from "./CurrentBookings";
import BookingHistory from "./BookingHistory";

function BookingTabs({ bookings, refreshBookings }) {
  const [tab, setTab] = useState("current");

  const today = new Date();

  const current = bookings.filter(
    (booking) =>
      new Date(booking.showDate) >= today &&
      booking.bookingStatus === "SUCCESS",
  );

  const history = bookings.filter(
    (booking) =>
      new Date(booking.showDate) < today || booking.bookingStatus !== "SUCCESS",
  );

  return (
    <>
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setTab("current")}
          className={`rounded-xl px-6 py-3 font-semibold ${
            tab === "current" ? "bg-yellow-400 text-black" : "bg-[#202020]"
          }`}
        >
          Current Bookings
        </button>

        <button
          onClick={() => setTab("history")}
          className={`rounded-xl px-6 py-3 font-semibold ${
            tab === "history" ? "bg-yellow-400 text-black" : "bg-[#202020]"
          }`}
        >
          Booking History
        </button>
      </div>

      {tab === "current" ? (
        <CurrentBookings bookings={current} refreshBookings={refreshBookings} />
      ) : (
        <BookingHistory bookings={history} />
      )}
    </>
  );
}

export default BookingTabs;
