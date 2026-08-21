function BookingHistory({ bookings }) {
  if (!bookings.length)
    return (
      <div className="rounded-2xl bg-[#202020] p-6 text-gray-400">
        No Booking History
      </div>
    );

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.bookingId} className="rounded-2xl bg-[#202020] p-5">
          <div className="font-semibold">{booking.eventName}</div>

          <div className="text-gray-400">{booking.showDate}</div>

          <div>{booking.bookingStatus}</div>
        </div>
      ))}
    </div>
  );
}

export default BookingHistory;
