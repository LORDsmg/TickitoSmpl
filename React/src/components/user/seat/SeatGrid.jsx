import Seat from "./Seat";

function SeatGrid({
  layout,
  selectedSeats,
  onSeatSelect,
}) {
  return (
    <div className="space-y-12">
      {/* Screen */}
      <div className="flex justify-center">
        <div className="w-full max-w-5xl">
          <div className="rounded-full bg-gradient-to-r from-gray-500 via-white to-gray-500 py-2 text-center text-sm font-semibold tracking-[0.4em] text-black shadow-lg">
            SCREEN
          </div>

          <p className="mt-3 text-center text-sm text-gray-400">
            All eyes this way please!
          </p>
        </div>
      </div>

      {/* Seat Categories */}
      {layout.map((section) => (
        <div key={section.category}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-yellow-400">
              {section.category}
            </h2>

            <span className="rounded-full bg-[#222] px-4 py-2 text-sm text-gray-300">
              ₹{section.price} / Seat
            </span>
          </div>

          <div className="space-y-4">
            {section.rows.map((row) => (
              <div
                key={row.row}
                className="flex items-center justify-center gap-4"
              >
                {/* Row Name */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#222] font-bold text-yellow-400">
                  {row.row}
                </div>

                {/* Seats */}
                <div className="flex flex-wrap justify-center gap-2">
                  {row.seats.map((seat) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      price={section.price}
                      isSelected={selectedSeats.some(
                        (selected) => selected.id === seat.id
                      )}
                      onSelect={onSeatSelect}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;