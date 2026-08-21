import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function Screens() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Screen Management
          </h1>

          <p className="mt-2 text-gray-400">
            Manage theatre screens and seating configuration.
          </p>
        </div>

        <Link
          to="/admin/screens/add"
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-300"
        >
          <FaPlus />
          Add Screen
        </Link>

      </div>

      <div className="rounded-2xl bg-[#1b1b1b] p-12 text-center">

        <h2 className="mb-4 text-2xl font-bold">
          Screen Module
        </h2>

        <p className="text-gray-400">
          This module is ready for integration.
        </p>

        <p className="mt-2 text-gray-500">
          Once the backend APIs are available, this page will display
          the list of screens with CRUD operations.
        </p>

      </div>

    </div>
  );
}

export default Screens;