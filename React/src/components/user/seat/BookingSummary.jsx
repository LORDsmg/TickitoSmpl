import { FaChair, FaTicketAlt, FaArrowRight } from "react-icons/fa";

function BookingSummary({ selectedSeats, onContinue }) {
  const totalSeats = selectedSeats.length;

  const totalAmount = selectedSeats.reduce(
    (total, seat) => total + seat.price,
    0,
  );

  return (
    <div className="sticky top-28 rounded-3xl border border-[#2A2A2A] bg-[#181818] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Booking Summary</h2>

      {/* Selected Seats */}

      <div className="rounded-2xl bg-[#202020] p-4">
        <div className="mb-3 flex items-center gap-2">
          <FaChair className="text-yellow-400" />

          <h3 className="font-semibold">Selected Seats</h3>
        </div>

        {selectedSeats.length === 0 ? (
          <p className="text-sm text-gray-400">No seats selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSeats.map((seat) => (
              <span
                key={seat.number}
                className="rounded-lg bg-yellow-400 px-3 py-2 text-sm font-bold text-black"
              >
                {seat.number}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details */}

      <div className="mt-6 space-y-4 rounded-2xl bg-[#202020] p-4">
        <div className="flex justify-between">
          <span className="text-gray-400">Tickets</span>

          <span className="font-semibold">{totalSeats}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Convenience Fee</span>

          <span className="font-semibold">₹50</span>
        </div>

        <div className="border-t border-[#333] pt-4">
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>

            <span className="text-yellow-400">
              ₹{totalAmount + (totalSeats > 0 ? 50 : 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Continue Button */}

      <button
        type="button"
        onClick={onContinue}
        className={`mt-8 flex w-full items-center justify-center gap-3 rounded-2xl py-4 text-lg font-bold transition ${
          totalSeats === 0
            ? "pointer-events-none bg-gray-700 text-gray-400"
            : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        <FaTicketAlt />
        Continue
        <FaArrowRight />
      </button>
    </div>
  );
}

export default BookingSummary;
