function FoodCard({ food, quantity, onAdd, onRemove }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#181818]">

      <img
        src={food.image}
        alt={food.name}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl font-bold">
          {food.name}
        </h2>

        <p className="mt-2 text-yellow-400 text-lg font-semibold">
          ₹ {food.price}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <button
            onClick={onRemove}
            className="h-10 w-10 rounded-lg bg-red-500 text-xl"
          >
            -
          </button>

          <span className="text-xl font-bold">
            {quantity}
          </span>

          <button
            onClick={onAdd}
            className="h-10 w-10 rounded-lg bg-green-500 text-xl"
          >
            +
          </button>

        </div>

      </div>

    </div>
  );
}

export default FoodCard;