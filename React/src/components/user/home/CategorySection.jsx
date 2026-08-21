import { FaFilm, FaMasksTheater, FaMusic } from "react-icons/fa6";
import { FaLaugh } from "react-icons/fa";

import Container from "../../common/Container";

const categories = [
  {
    name: "All",
    icon: <FaFilm size={34} />,
  },
  {
    name: "Movies",
    icon: <FaFilm size={34} />,
  },
  {
    name: "Drama",
    icon: <FaMasksTheater size={34} />,
  },
  {
    name: "Concert",
    icon: <FaMusic size={34} />,
  },
  {
    name: "Comedy",
    icon: <FaLaugh size={34} />,
  },
];

function CategorySection({ selectedCategory, onCategoryChange }) {
  return (
    <section className="py-8">
      <Container>
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-white">Categories</h2>

            <p className="mt-2 text-gray-400">
              Explore entertainment by category.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() => onCategoryChange(item.name)}
              className={`group cursor-pointer rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2
    ${
      selectedCategory === item.name
        ? "border-yellow-400 bg-[#202020]"
        : "border-[#2A2A2A] bg-[#181818] hover:border-yellow-400 hover:bg-[#202020]"
    }`}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#242424] text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black">
                {item.icon}
              </div>

              <h3 className="mt-6 text-center text-xl font-semibold">
                {item.name}
              </h3>

              <p className="mt-2 text-center text-sm text-gray-400">
                Browse the latest {item.name.toLowerCase()} events.
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default CategorySection;
