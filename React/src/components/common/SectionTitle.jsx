import { Link } from "react-router-dom";

function SectionTitle({ title, action }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-4xl font-bold text-white">{title}</h2>

        <p className="mt-2 text-gray-400">
          Discover the latest releases and trending movies.
        </p>
      </div>

      {/* {action && (
        <Link
          to="/movies"
          className="rounded-xl border border-yellow-400 px-5 py-2 text-sm font-semibold text-yellow-400 transition-all duration-300 hover:bg-yellow-400 hover:text-black"
        >
          {action}
        </Link>
      )} */}
    </div>
  );
}

export default SectionTitle;
