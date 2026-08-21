import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { foodService } from "../../services/foodService";

const initialState = {
  foodName: "",
  description: "",
  imageUrl: "",
  price: "",
  available: true,
};

function FoodForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [food, setFood] = useState(initialState);
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      loadFood();
    }
  }, [id]);

  const loadFood = async () => {
    try {
      setLoading(true);

      const data = await foodService.getFoodById(id);

      setFood({
        ...initialState,
        ...data,
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load food.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFood((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "price" ? value : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!food.foodName.trim()) {
      setError("Food name is required.");
      return;
    }

    if (!food.price || Number(food.price) <= 0) {
      setError("Valid price is required.");
      return;
    }

    try {
      setSaving(true);

      if (id) {
        await foodService.updateFood(id, food, image);

        toast.success("Food updated successfully.");
      } else {
        await foodService.createFood(food, image);

        toast.success("Food added successfully.");
      }

      navigate("/admin/foods");
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message || err?.message || "Unable to save food.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#1b1b1b] p-10">
        <h2 className="text-2xl font-bold">Loading Food...</h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-[#1b1b1b] p-8">
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">{id ? "Edit Food" : "Add Food"}</h1>

        <p className="mt-2 text-gray-400">Enter food information.</p>
      </div>

      {/* Error */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {/* Food Name */}

        <div>
          <label className="mb-2 block">Food Name</label>

          <input
            type="text"
            name="foodName"
            value={food.foodName}
            onChange={handleChange}
            placeholder="Large Popcorn"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Price */}

        <div>
          <label className="mb-2 block">Price</label>

          <input
            type="number"
            min="0"
            name="price"
            value={food.price}
            onChange={handleChange}
            placeholder="250"
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Image */}

        <div className="lg:col-span-2">
          <label className="mb-2 block">Food Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full rounded-xl bg-[#252525] p-4 text-gray-300"
          />

          {/* New image preview */}

          {image && (
            <img
              src={URL.createObjectURL(image)}
              alt="Food Preview"
              className="mt-4 h-48 w-48 rounded-xl border border-[#333] object-cover"
            />
          )}

          {/* Existing image */}

          {!image && food.imageUrl && (
            <img
              src={food.imageUrl}
              alt={food.foodName}
              className="mt-4 h-48 w-48 rounded-xl border border-[#333] object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          <p className="mt-2 text-sm text-gray-500">
            {id
              ? "Select a new image only if you want to replace the existing image."
              : "Select an image for this food item."}
          </p>
        </div>

        {/* Description */}

        <div className="lg:col-span-2">
          <label className="mb-2 block">Description</label>

          <textarea
            rows={5}
            name="description"
            value={food.description}
            onChange={handleChange}
            placeholder="Food description..."
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          />
        </div>

        {/* Availability */}

        <div>
          <label className="mb-2 block">Availability</label>

          <select
            name="available"
            value={food.available}
            onChange={(e) =>
              setFood((prev) => ({
                ...prev,
                available: e.target.value === "true",
              }))
            }
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
          >
            <option value="true">Available</option>

            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Buttons */}

        <div className="flex gap-4 lg:col-span-2">
          <button
            type="button"
            onClick={() => navigate("/admin/foods")}
            className="rounded-xl border border-gray-600 px-8 py-4 hover:bg-[#2d2d2d]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-semibold text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : id ? "Update Food" : "Add Food"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FoodForm;
