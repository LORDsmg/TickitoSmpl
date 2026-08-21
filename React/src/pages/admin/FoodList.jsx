import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import { foodService } from "../../services/foodService";

const PAGE_SIZE = 8;

function FoodList() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadFoods();
  }, []);

  const loadFoods = async () => {
    try {
      setLoading(true);

      const data = await foodService.getAllFoods();

      setFoods(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this food?");

    if (!ok) return;

    try {
      await foodService.deleteFood(id);

      toast.success("Food deleted successfully.");

      loadFoods();
    } catch (err) {
      console.error(err);

      toast.error(err?.response?.data?.message || "Unable to delete food.");
    }
  };

  const filteredFoods = useMemo(() => {
    return foods.filter((food) =>
      `${food.foodName}
       ${food.description}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [foods, search]);

  const totalPages = Math.ceil(filteredFoods.length / PAGE_SIZE);

  const pageData = filteredFoods.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Foods</h1>

          <p className="text-gray-400">Manage all food items</p>
        </div>

        <Link
          to="/admin/foods/add"
          className="flex items-center gap-2 rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-black hover:bg-yellow-300"
        >
          <FaPlus />
          Add Food
        </Link>
      </div>

      {/* Search */}

      <div className="flex items-center rounded-xl bg-[#1b1b1b] px-4">
        <FaSearch className="text-gray-400" />

        <input
          placeholder="Search food..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-transparent p-4 outline-none"
        />
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
        <table className="w-full">
          <thead className="bg-[#242424]">
            <tr>
              <th className="p-4 text-left">Image</th>

              <th className="p-4 text-left">Food</th>

              <th className="p-4 text-left">Description</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="p-10 text-center">
                  Loading foods...
                </td>
              </tr>
            )}

            {!loading &&
              pageData.map((food) => (
                <tr key={food.foodId} className="border-t border-[#2c2c2c]">
                  <td className="p-4">
                    <img
                      src={food.imageUrl || "https://placehold.co/80x80"}
                      alt={food.foodName}
                      className="h-16 w-16 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/80x80";
                      }}
                    />
                  </td>

                  <td className="p-4 font-medium">{food.foodName}</td>

                  <td className="p-4">{food.description}</td>

                  <td className="p-4 font-semibold">₹ {food.price}</td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        food.available ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {food.available ? "Available" : "Unavailable"}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/admin/foods/edit/${food.foodId}`}
                        className="rounded-lg bg-blue-600 p-3 hover:bg-blue-500"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        onClick={() => handleDelete(food.foodId)}
                        className="rounded-lg bg-red-600 p-3 hover:bg-red-500"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {!loading && pageData.length === 0 && (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-400">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-yellow-400 text-black"
                  : "bg-[#242424]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodList;
