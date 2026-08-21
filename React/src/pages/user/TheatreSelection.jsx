import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";

import { toast } from "react-toastify";

import { useEffect, useState } from "react";

import { eventService } from "../../services/eventService";
import { showService } from "../../services/showService";

import Container from "../../components/common/Container";
import movies from "../../constants/movies";
import {
  setSelectedMovie,
  setSelectedShow,
  setSelectedTheatre,
} from "../../redux/slices/bookingSlice";

function TheatreSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      // Fetch movie details
      const event = await eventService.getEventById(id);

      setMovie({
        id: event.eventId,
        title: event.eventName,
        image: event.posterUrl,
      });

      // Fetch all shows for this event
      const shows = await showService.getShowsByEventId(id);

      // Group shows by theatre
      const grouped = {};

      shows.forEach((show) => {
        if (!grouped[show.venueId]) {
          grouped[show.venueId] = {
            venueId: show.venueId,
            name: show.venueName,
            location: show.venueAddress,
            rating: 4.5, // Temporary
            shows: [],
          };
        }

        grouped[show.venueId].shows.push(show);
      });

      setTheatres(Object.values(grouped));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectShow = (theatre, show) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.info("Please login to continue booking.");

      navigate("/login", {
        state: {
          from: `/movie/${movie.id}/seats`,
        },
      });

      return;
    }

    dispatch(
      setSelectedMovie({
        id: movie.id,
        title: movie.title,
        image: movie.image,
      }),
    );

    dispatch(
      setSelectedTheatre({
        venueId: theatre.venueId,
        venueName: theatre.name,
        venueAddress: theatre.location,
      }),
    );

    // Store the complete ShowResponseDto
    dispatch(setSelectedShow(show));

    navigate(`/movie/${movie.id}/seats`);
  };

  if (loading) {
    return (
      <Container className="py-20">
        <h2 className="text-center text-2xl">Loading Theatres...</h2>
      </Container>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <div className="mb-10">
          <p className="text-yellow-400 font-semibold">BOOK TICKETS</p>

          <h1 className="mt-3 text-5xl font-bold">{movie?.title}</h1>

          <p className="mt-3 text-gray-400">
            Choose your preferred theatre and show time.
          </p>
        </div>

        <div className="space-y-8">
          {theatres.map((theatre) => (
            <div
              key={theatre.venueId}
              className="rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-bold">{theatre.name}</h2>

                  <div className="mt-3 flex flex-wrap items-center gap-5 text-gray-400">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-yellow-400" />
                      {theatre.location}
                    </div>

                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      {theatre.rating}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {theatre.shows.map((show) => (
                    <button
                      key={show.showId}
                      type="button"
                      onClick={() => selectShow(theatre, show)}
                      className="flex items-center gap-2 rounded-xl border border-yellow-400 px-5 py-3 font-semibold text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                    >
                      <FaClock />
                      {show.showStartTime.substring(0, 5)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TheatreSelection;
