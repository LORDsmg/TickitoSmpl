import {
  FaShoppingBasket,
  FaArrowRight,
  FaUtensils,
  FaCreditCard,
} from "react-icons/fa";

function FoodSummary({ cart, seatTotal = 0, onContinue, loading = false }) {
  const items = Object.values(cart);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const foodTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const grandTotal = seatTotal + foodTotal;

  return (
    <div className="sticky top-28 rounded-3xl border border-[#2A2A2A] bg-[#181818] p-6">
      <h2 className="mb-6 text-2xl font-bold text-white">Booking Summary</h2>

      {/* Food Items */}

      <div className="rounded-2xl bg-[#202020] p-4">
        <div className="mb-4 flex items-center gap-2">
          <FaUtensils className="text-yellow-400" />

          <h3 className="font-semibold text-white">Selected Food</h3>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-gray-400">No food items selected.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-[#303030] pb-3 last:border-none last:pb-0"
              >
                <div>
                  <p className="font-medium text-white">{item.name}</p>

                  <p className="text-sm text-gray-400">Qty : {item.quantity}</p>
                </div>

                <p className="font-semibold text-yellow-400">
                  ₹{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bill */}

      <div className="mt-6 rounded-2xl bg-[#202020] p-4">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Ticket Total</span>

            <span className="font-semibold text-white">₹{seatTotal}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Food Items ({totalItems})</span>

            <span className="font-semibold text-white">₹{foodTotal}</span>
          </div>

          <div className="border-t border-[#333333] pt-4">
            <div className="flex justify-between text-xl font-bold">
              <span className="text-white">Grand Total</span>

              <span className="text-yellow-400">₹{grandTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Razorpay Button */}

      <button
        type="button"
        onClick={onContinue}
        disabled={loading}
        className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaCreditCard />

        {loading ? "Processing..." : `Pay ₹${grandTotal}`}

        <FaArrowRight />
      </button>

      <p className="mt-4 text-center text-xs text-gray-400">
        Secure payments powered by Razorpay
      </p>
    </div>
  );
}

export default FoodSummary;
