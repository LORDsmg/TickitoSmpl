import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FaDownload,
  FaMapMarkerAlt,
  FaClock,
  FaChair,
  FaTicketAlt,
} from "react-icons/fa";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";

function Ticket() {
  const navigate = useNavigate();

  const {
    movie,
    theatre,
    showTime,
    seats,
    food,
    ticketAmount,
    foodAmount,
    convenienceFee,
    totalAmount,
  } = useSelector((state) => state.booking);

  const bookingId =
    "BK" + Math.floor(100000 + Math.random() * 900000);

  return (
    <section className="py-12">
      <Container>

        <h1 className="mb-10 text-center text-4xl font-bold">
          Digital Ticket
        </h1>

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-yellow-400 bg-[#181818]">

          <div className="grid lg:grid-cols-3">

            {/* LEFT */}

            <div className="lg:col-span-2 p-8">

              <div className="flex gap-6">

                <img
                  src={movie?.image}
                  alt={movie?.title}
                  className="w-44 rounded-2xl"
                />

                <div>

                  <h2 className="text-3xl font-bold">
                    {movie?.title}
                  </h2>

                  <p className="mt-3 text-gray-400">
                    {movie?.language}
                  </p>

                  <p className="text-gray-400">
                    {movie?.duration}
                  </p>

                  <div className="mt-8 space-y-3">

                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      {theatre?.name}
                    </div>

                    <div className="flex items-center gap-3">
                      <FaClock className="text-yellow-400" />
                      {showTime}
                    </div>

                    <div className="flex items-center gap-3">
                      <FaChair className="text-yellow-400" />

                      {seats.length
                        ? seats
                            .map((seat) => seat.seatNo)
                            .join(", ")
                        : "-"}

                    </div>

                  </div>

                </div>

              </div>

              <div className="mt-10 rounded-2xl bg-[#242424] p-6">

                <h3 className="mb-4 text-xl font-bold">
                  Food Items
                </h3>

                {food.length ? (
                  food.map((item) => (
                    <div
                      key={item.id}
                      className="mb-2 flex justify-between"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>

                      <span>
                        ₹ {item.price * item.quantity}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">
                    No Food Selected
                  </p>
                )}

              </div>

            </div>

            {/* RIGHT */}

            <div className="border-l border-[#2A2A2A] p-8">

              <div className="text-center">

                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${bookingId}`}
                  alt="QR"
                  className="mx-auto rounded-xl bg-white p-2"
                />

                <h2 className="mt-6 text-2xl font-bold">
                  {bookingId}
                </h2>

              </div>

              <div className="mt-10 space-y-3">

                <div className="flex justify-between">
                  <span>Tickets</span>
                  <span>₹ {ticketAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Food</span>
                  <span>₹ {foodAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span>Fee</span>
                  <span>₹ {convenienceFee}</span>
                </div>

                <hr className="border-[#333]" />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-yellow-400">
                    ₹ {totalAmount}
                  </span>

                </div>

              </div>

              <Button
                className="mt-10 w-full"
              >
                <FaDownload className="mr-2 inline" />
                Download Ticket
              </Button>

              <button
                onClick={() => navigate("/")}
                className="mt-4 w-full rounded-xl border border-yellow-400 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
              >
                Back To Home
              </button>

            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}

export default Ticket;