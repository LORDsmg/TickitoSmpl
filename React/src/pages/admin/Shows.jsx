import ShowList from "./ShowList";

function Shows() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Show Management
        </h1>

        <p className="mt-2 text-gray-400">
          Manage all movie shows, timings and ticket pricing.
        </p>
      </div>

      <ShowList />
    </div>
  );
}

export default Shows;