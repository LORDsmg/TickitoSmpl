function SeatCard({ seat, selected, onClick }) {
  let bg = "bg-green-600 hover:bg-green-500";

  if (seat.booked) bg = "bg-gray-700 cursor-not-allowed";
  if (selected) bg = "bg-yellow-400 text-black";

  return (
    <button
      disabled={seat.booked}
      onClick={() => onClick(seat)}
      className={`h-10 w-10 rounded-md text-xs font-semibold transition ${bg}`}
    >
      {seat.seatNo}
    </button>
  );
}

export default SeatCard;