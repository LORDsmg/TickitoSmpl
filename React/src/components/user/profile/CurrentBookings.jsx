import BookingCard from "./BookingCard";

function CurrentBookings({ bookings, refreshBookings }) {
  if (!bookings.length) {
    return (
      <div className="rounded-2xl bg-[#202020] p-8 text-center text-gray-400">
        No Current Bookings
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.bookingId}
          booking={booking}
          refreshBookings={refreshBookings}
        />
      ))}
    </div>
  );
}

export default CurrentBookings;
