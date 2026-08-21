function Seat({ seat, price, isSelected, onSelect }) {
  const handleClick = () => {
    if (seat.booked) return;

    onSelect({
      id: seat.id,
      number: seat.number,
      price,
    });
  };

  let seatStyle = "bg-green-500 hover:bg-green-400 cursor-pointer";

  if (seat.booked) {
    seatStyle = "bg-red-600 cursor-not-allowed opacity-70";
  }

  if (isSelected) {
    seatStyle = "bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer";
  }

  return (
    <button
      disabled={seat.booked}
      onClick={handleClick}
      className={`
        ${seatStyle}
        h-10
        w-10
        rounded-md
        text-xs
        font-bold
        transition-all
        duration-300
        hover:scale-110
        active:scale-95
      `}
    >
      {seat.number}
    </button>
  );
}

export default Seat;
