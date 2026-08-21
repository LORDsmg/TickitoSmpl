import { Link, Navigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaHome, FaTicketAlt, FaQrcode } from "react-icons/fa";
//QR code
import QRCode from "react-qr-code";
import { downloadTicket } from "../../utils/ticketGenerator";
import { FaDownload } from "react-icons/fa";
import { useRef } from "react";
import { toPng } from "html-to-image";

import Container from "../../components/common/Container";
import { formatCurrency } from "../../utils/bookingStorage";
import Profile from "./Profile";

function BookingSuccess() {
  const location = useLocation();
  const qrRef = useRef(null);
  const handleDownload = async () => {
    const qrImage = await toPng(qrRef.current);

    downloadTicket(booking, qrImage);
  };

  const booking = location.state?.booking;

  if (!booking) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="py-16">
      <Container>
        <div className="mx-auto max-w-4xl rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8 shadow-2xl md:p-10">
          {/* Success */}

          <div className="flex justify-center">
            <FaCheckCircle size={86} className="text-green-500" />
          </div>

          <h1 className="mt-6 text-center text-5xl font-bold">
            Booking Confirmed
          </h1>

          <p className="mt-3 text-center text-gray-400">
            Your ticket has been booked successfully.
          </p>

          {/* Booking Id */}

          <div className="mt-8 rounded-2xl bg-[#202020] p-5 text-center">
            <p className="text-sm text-gray-400">Booking ID</p>

            <h2 className="mt-2 text-2xl font-bold text-yellow-400">
              #{booking.bookingId}
            </h2>
          </div>

          {/* Ticket */}

          <div className="mt-8 rounded-2xl bg-[#202020] p-6">
            <h2 className="mb-5 text-2xl font-bold">Ticket Details</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-gray-400">Movie</p>

                <p className="font-semibold">{booking.eventName}</p>
              </div>

              <div>
                <p className="text-gray-400">Theatre</p>

                <p className="font-semibold">{booking.venueName}</p>
              </div>

              <div>
                <p className="text-gray-400">Show Date</p>

                <p className="font-semibold">{booking.showDate}</p>
              </div>

              <div>
                <p className="text-gray-400">Show Time</p>

                <p className="font-semibold">
                  {booking.showStartTime?.substring(0, 5)}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Seats</p>

                <p className="font-semibold">{booking.seatNums.join(", ")}</p>
              </div>

              <div>
                <p className="text-gray-400">Amount Paid</p>

                <p className="font-bold text-yellow-400">
                  {formatCurrency(booking.totalAmt)}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Payment Status</p>

                <p className="font-bold text-green-500">
                  {booking.paymentStatus}
                </p>
              </div>

              <div>
                <p className="text-gray-400">Booking Status</p>

                <p className="font-bold text-green-500">
                  {booking.bookingStatus}
                </p>
              </div>
            </div>
          </div>

          {/* QR */}

          <div className="mt-8 flex flex-col items-center rounded-2xl bg-[#202020] p-8">
            <div ref={qrRef} className="rounded-xl bg-white p-4">
              <QRCode
                size={170}
                value={JSON.stringify({
                  bookingId: booking.bookingId,
                  movie: booking.eventName,
                  theatre: booking.venueName,
                  date: booking.showDate,
                  time: booking.showStartTime,
                  seats: booking.seatNums,
                  amount: booking.totalAmt,
                })}
              />
            </div>

            <p className="mt-5 text-center text-sm text-gray-400">
              Scan this QR code at the theatre entrance
            </p>
          </div>

          {/* Buttons */}

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <button
              onClick={handleDownload}
              className="flex items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-bold text-white transition hover:bg-green-500"
            >
              <FaDownload />
              Download Ticket
            </button>
            <Link
              to="/Profile"
              className="flex items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 font-bold text-black"
            >
              <FaTicketAlt />
              My Bookings
            </Link>

            <Link
              to="/"
              className="flex items-center justify-center gap-3 rounded-2xl border border-[#333] py-4 font-bold hover:border-yellow-400"
            >
              <FaHome />
              Back Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default BookingSuccess;
