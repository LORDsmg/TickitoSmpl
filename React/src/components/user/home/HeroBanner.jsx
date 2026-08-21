import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Container from "../../common/Container";
import Button from "../../common/Button";

function HeroBanner({ movies }) {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!movies.length) return;

    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % movies.length);
        setFade(true);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [movies]);

  if (!movies.length) return null;

  const movie = movies[current];

  const previousSlide = () => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
      setFade(true);
    }, 300);
  };

  const nextSlide = () => {
    setFade(false);

    setTimeout(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
      setFade(true);
    }, 300);
  };

  return (
    <section className="py-8">
      <Container>
        <div className="relative h-[420px] overflow-hidden rounded-3xl md:h-[520px] xl:h-[620px]">
          <img
            src={movie.banner}
            alt={movie.title}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent" />

          {/* Content */}

          <div className="absolute bottom-14 left-8 z-20 max-w-xl md:left-12">
            <p className="mb-3 text-lg font-semibold text-yellow-400">
              NOW SHOWING
            </p>

            <h1 className="text-5xl font-bold md:text-7xl">{movie.title}</h1>

            <p className="mt-5 text-lg text-gray-300 line-clamp-2">
              {movie.description}
            </p>

            <Link to={`/movie/${movie.id}`}>
              <Button className="mt-8">Book Tickets</Button>
            </Link>
          </div>

          {/* Left Arrow */}

          <button
            onClick={previousSlide}
            className="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 transition hover:bg-yellow-400 hover:text-black"
          >
            <FaChevronLeft />
          </button>

          {/* Right Arrow */}

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-3 transition hover:bg-yellow-400 hover:text-black"
          >
            <FaChevronRight />
          </button>

          {/* Dots */}

          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setFade(false);

                  setTimeout(() => {
                    setCurrent(index);
                    setFade(true);
                  }, 300);
                }}
                className={`h-3 w-3 rounded-full transition ${
                  current === index ? "bg-yellow-400" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HeroBanner;
