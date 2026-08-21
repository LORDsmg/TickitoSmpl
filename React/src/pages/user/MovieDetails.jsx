import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaClock,
  FaGlobe,
  FaCalendarAlt,
  FaTicketAlt,
  FaPlay,
} from "react-icons/fa";

import Container from "../../components/common/Container";
import Button from "../../components/common/Button";
import { eventService } from "../../services/eventService";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovie();
  }, [id]);

  const loadMovie = async () => {
    try {
      const event = await eventService.getEventById(id);

      setMovie({
        id: event.eventId,
        title: event.eventName,
        genre: event.eventType,
        description: event.eventDescription,
        duration: `${event.eventDurationMin} min`,
        image: event.posterUrl,
        banner: event.posterUrl,

        // Temporary values
        rating: "N/A",
        language: "Hindi",
        certification: event.ageRestriction >= 18 ? "A" : "U/A",

        releaseDate: "Coming Soon",
      });
    } catch (error) {
      console.error("Failed to load movie:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-24">
        <h1 className="text-4xl font-bold text-center">Loading Movie...</h1>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="py-24">
        <h1 className="text-4xl font-bold">Movie Not Found</h1>
      </Container>
    );
  }

  return (
    <>
      {/* Banner */}

      <section className="relative h-[650px] overflow-hidden">
        <img
          src={movie.banner}
          alt={movie.title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <Container className="absolute inset-0 flex items-center">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[340px_1fr]">
            {/* Poster */}

            <img
              src={movie.image}
              alt={movie.title}
              className="h-[500px] w-full rounded-3xl object-cover shadow-2xl"
            />

            {/* Details */}

            <div>
              <p className="mb-3 text-lg font-semibold text-yellow-400">
                NOW SHOWING
              </p>

              <h1 className="text-6xl font-bold">{movie.title}</h1>

              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 font-semibold text-black">
                  <FaStar />
                  {movie.rating}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#202020] px-4 py-2">
                  <FaClock />
                  {movie.duration}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#202020] px-4 py-2">
                  <FaGlobe />
                  {movie.language}
                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#202020] px-4 py-2">
                  <FaCalendarAlt />
                  {movie.releaseDate}
                </div>
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-300">
                {movie.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-5">
                <Link to={`/movie/${movie.id}/theatres`}>
                  <Button className="flex items-center gap-3">
                    <FaTicketAlt />
                    Book Tickets
                  </Button>
                </Link>

                <button className="flex items-center gap-3 rounded-xl border border-white px-8 py-3 transition hover:bg-white hover:text-black">
                  <FaPlay />
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Movie Info */}

      <section className="py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="rounded-3xl border border-[#252525] bg-[#181818] p-8">
              <h2 className="mb-6 text-3xl font-bold">Movie Info</h2>

              <div className="space-y-5 text-gray-300">
                <p>
                  <span className="font-semibold text-white">Genre:</span>{" "}
                  {movie.genre}
                </p>

                <p>
                  <span className="font-semibold text-white">Language:</span>{" "}
                  {movie.language}
                </p>

                <p>
                  <span className="font-semibold text-white">Duration:</span>{" "}
                  {movie.duration}
                </p>

                <p>
                  <span className="font-semibold text-white">Certificate:</span>{" "}
                  {movie.certification}
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-[#252525] bg-[#181818] p-8 lg:col-span-2">
              <h2 className="mb-6 text-3xl font-bold">Story</h2>

              <p className="leading-8 text-gray-300">{movie.description}</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default MovieDetails;
