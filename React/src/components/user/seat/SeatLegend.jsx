function LegendItem({
  color,
  label,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`h-6 w-6 rounded-md border border-[#3A3A3A] ${color}`}
      />

      <span className="text-sm text-gray-300">
        {label}
      </span>
    </div>
  );
}

function SeatLegend() {
  return (
    <div className="rounded-2xl border border-[#2A2A2A] bg-[#181818] p-6">
      <h3 className="mb-5 text-xl font-semibold text-white">
        Seat Legend
      </h3>

      <div className="flex flex-wrap items-center gap-8">
        <LegendItem
          color="bg-green-500"
          label="Available"
        />

        <LegendItem
          color="bg-yellow-400"
          label="Selected"
        />

        <LegendItem
          color="bg-red-600"
          label="Booked"
        />

        <LegendItem
          color="bg-[#2A2A2A]"
          label="Empty Space"
        />
      </div>
    </div>
  );
}

export default SeatLegend;