import { FaMinus, FaPlus } from "react-icons/fa";

function FoodCard({
  item,
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#181818] transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-500/10">
      {/* Food Image */}

      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="h-56 w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      {/* Details */}

      <div className="p-6">
        <span className="rounded-full bg-[#242424] px-3 py-1 text-xs text-yellow-400">
          {item.category}
        </span>

        <h2 className="mt-4 text-2xl font-bold">
          {item.name}
        </h2>

        <p className="mt-2 text-2xl font-bold text-yellow-400">
          ₹{item.price}
        </p>

        {/* Quantity */}

        {quantity === 0 ? (
          <button
            onClick={() => onIncrease(item)}
            className="mt-6 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black transition hover:bg-yellow-300"
          >
            Add Item
          </button>
        ) : (
          <div className="mt-6 flex items-center justify-between rounded-xl bg-[#242424] p-3">
            <button
              onClick={() => onDecrease(item.id)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 transition hover:bg-red-400"
            >
              <FaMinus />
            </button>

            <span className="text-xl font-bold">
              {quantity}
            </span>

            <button
              onClick={() => onIncrease(item)}
              className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500 transition hover:bg-green-400"
            >
              <FaPlus />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FoodCard;