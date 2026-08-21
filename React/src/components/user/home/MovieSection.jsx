import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";
import MovieCard from "./MovieCard";

function MovieSection({ title, movies }) {
  return (
    <section className="py-16">
      <Container>
        <SectionTitle title={title} action="See All" />

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-[#2A2A2A] bg-[#181818] p-10 text-center">
              <h3 className="text-2xl font-bold text-white">No Movies Found</h3>

              <p className="mt-3 text-gray-400">
                Try searching with another movie name.
              </p>
            </div>
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}
        </div>
      </Container>
    </section>
  );
}

export default MovieSection;
