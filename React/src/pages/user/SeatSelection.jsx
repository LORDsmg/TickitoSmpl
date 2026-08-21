import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Container from "../../components/common/Container";
import SeatLegend from "../../components/user/seat/SeatLegend";
import SeatGrid from "../../components/user/seat/SeatGrid";
import BookingSummary from "../../components/user/seat/BookingSummary";

import { toast } from "react-toastify";

import { bookingService } from "../../services/bookingService";

import { setSelectedSeats } from "../../redux/slices/bookingSlice";

function SeatSelection() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedShow = useSelector((state) => state.booking.selectedShow);

  const selectedMovie = useSelector((state) => state.booking.selectedMovie);

  const selectedSeats = useSelector((state) => state.booking.selectedSeats);

  const [layout, setLayout] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedShow?.showId) {
      navigate(-1);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to continue booking.");

      navigate("/login", {
        state: {
          from: `/movie/${selectedMovie.id}/seats`,
        },
      });

      return;
    }

    loadSeats();
  }, []);

  const loadSeats = async () => {
    try {
      const seats = await bookingService.getAvailableSeats(selectedShow.showId);

      const rowsMap = {};

      seats.forEach((seat) => {
        const row = seat.seatNo.charAt(0);

        if (!rowsMap[row]) rowsMap[row] = [];

        rowsMap[row].push({
          id: seat.seatId,
          number: seat.seatNo,
          booked: seat.booked,
          price: selectedShow.price,
        });
      });

      const rows = Object.keys(rowsMap)
        .sort()
        .map((row) => ({
          row,
          seats: rowsMap[row],
        }));

      setLayout([
        {
          category: "Standard",
          price: selectedShow.price,
          rows,
        },
      ]);
    } catch (err) {
      console.error(err);

      if (
        err.toString().includes("403") ||
        err.toString().toLowerCase().includes("forbidden")
      ) {
        toast.error("Please login to continue booking.");

        navigate("/login", {
          state: {
            from: `/movie/${selectedMovie.id}/seats`,
          },
        });

        return;
      }

      toast.error("Unable to load seats.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seat) => {
    const exists = selectedSeats.find((s) => s.id === seat.id);

    if (exists) {
      dispatch(setSelectedSeats(selectedSeats.filter((s) => s.id !== seat.id)));

      return;
    }

    dispatch(setSelectedSeats([...selectedSeats, seat]));
  };

  const continueBooking = () => {
    if (!selectedSeats.length) return;

    navigate(`/movie/${selectedMovie.id}/food`);
  };

  if (loading) return <Container className="py-20">Loading Seats...</Container>;

  return (
    <section className="py-12">
      <Container>
        <div className="mb-12">
          <p className="font-semibold text-yellow-400">SELECT YOUR SEATS</p>

          <h1 className="mt-2 text-5xl font-bold">{selectedMovie.title}</h1>

          <p className="mt-3 text-gray-400">Choose your preferred seats.</p>
        </div>

        <div className="grid gap-10 xl:grid-cols-[2fr_420px]">
          <div className="space-y-10">
            <SeatLegend />

            <SeatGrid
              layout={layout}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>

          <BookingSummary
            selectedSeats={selectedSeats}
            onContinue={continueBooking}
          />
        </div>
      </Container>
    </section>
  );
}

export default SeatSelection;
