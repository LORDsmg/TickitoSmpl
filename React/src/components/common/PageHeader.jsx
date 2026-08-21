import { Link } from "react-router-dom";

function PageHeader({
  title,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <h1 className="text-3xl font-bold">
        {title}
      </h1>

      {buttonText && buttonLink && (
        <Link
          to={buttonLink}
          className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-black transition hover:bg-yellow-300"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}

export default PageHeader;