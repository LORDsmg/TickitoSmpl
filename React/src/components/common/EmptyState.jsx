function EmptyState({
  title = "No Data Found",
  subtitle = "Nothing to display.",
}) {
  return (
    <div className="rounded-xl bg-[#181818] p-12 text-center">
      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="mt-3 text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

export default EmptyState;