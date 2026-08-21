import { useEffect, useMemo, useState } from "react";

import HeroBanner from "../../components/user/home/HeroBanner";
import CategorySection from "../../components/user/home/CategorySection";
import MovieSection from "../../components/user/home/MovieSection";

import { eventService } from "../../services/eventService";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const events = await eventService.getAllEvents();

      const formattedMovies = events.map((event) => ({
        id: event.eventId,
        title: event.eventName,
        genre: event.eventType,
        description: event.eventDescription,
        duration: `${event.eventDurationMin} min`,
        image: event.posterUrl,
        banner: event.posterUrl,
        rating: "N/A",
        language: "Hindi",
        certification: event.ageRestriction >= 18 ? "A" : "U/A",
      }));

      setMovies(formattedMovies);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredMovies = useMemo(() => {
    if (selectedCategory === "All") return movies;

    if (selectedCategory === "Movies") {
      return movies.filter((movie) => movie.genre === "Movie");
    }

    return movies.filter(
      (movie) => movie.genre.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [movies, selectedCategory]);

  if (loading) {
    return <div className="py-20 text-center text-xl">Loading Movies...</div>;
  }

  return (
    <>
      <HeroBanner movies={movies} />

      <MovieSection title="Now Showing" movies={movies} />

      <CategorySection
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MovieSection
        title={selectedCategory === "All" ? "All Events" : selectedCategory}
        movies={filteredMovies}
      />
    </>
  );
}

export default Home;
