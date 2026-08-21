import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import { paymentService } from "../../services/paymentService";
import { bookingService } from "../../services/bookingService";

import Container from "../../components/common/Container";

import movies from "../../constants/movies";
import { foodService } from "../../services/foodService";

import FoodCard from "../../components/user/food/FoodCard";
import FoodSummary from "../../components/user/food/FoodSummary";
import {
  addFoodItem,
  removeFoodItem,
  setSelectedMovie,
} from "../../redux/slices/bookingSlice";

function FoodSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { foodItems, selectedSeats, selectedShow, selectedTheatre } =
    useSelector((state) => state.booking);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const movie = movies.find((movie) => movie.id === Number(id));

  useEffect(() => {
    const loadFoods = async () => {
      try {
        const response = await foodService.getAllFoods();
        setFoods(response);
      } catch (err) {
        setError("Failed to load food items.");
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, []);

  const cart = useMemo(
    () => Object.fromEntries(foodItems.map((item) => [item.id, item])),
    [foodItems],
  );
  const seatTotal = useMemo(() => {
    return selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  }, [selectedSeats]);

  const handleIncrease = (food) => {
    dispatch(addFoodItem(food));
  };

  const handleDecrease = (foodId) => {
    dispatch(removeFoodItem(foodId));
  };

  const totalItems = useMemo(() => {
    return Object.values(cart).reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }, [cart]);
  const loadRazorpay = (order) => {
    const options = {
      key: order.keyId,

      amount: order.amount,

      currency: order.currency,

      name: "Tikito",

      description: "Movie Ticket Booking",

      order_id: order.orderId,

      notes: {
        movie: movie.title,
        theatre: selectedTheatre?.venueName,
      },

      theme: {
        color: "#FACC15",
      },

      handler: async function (response) {
        try {
          await paymentService.verifyPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          const booking = await bookingService.createBooking({
            showId: selectedShow.showId,
            seatIds: selectedSeats.map((seat) => seat.id),
          });

          toast.success("Booking Successful");

          navigate("/booking-success", {
            state: {
              booking,
            },
          });
        } catch (err) {
          console.error(err);
          toast.error("Payment Verification Failed");
        }
      },

      modal: {
        ondismiss: () => {
          toast.info("Payment Cancelled");
        },
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  const handlePayment = async () => {
    try {
      dispatch(setSelectedMovie(movie));

      const foodTotal = Object.values(cart).reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const total = seatTotal + foodTotal;

      const order = await paymentService.createOrder(total);

      loadRazorpay(order);
    } catch (err) {
      console.error(err);
      toast.error("Unable to initiate payment.");
    }
  };

  if (loading) {
    return (
      <Container className="py-20">
        <h2 className="text-3xl text-white">Loading Foods...</h2>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-20">
        <h2 className="text-3xl text-red-500">{error}</h2>
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="py-20">
        <h1 className="text-4xl font-bold text-white">Movie Not Found</h1>
      </Container>
    );
  }

  return (
    <section className="py-12">
      <Container>
        {/* Header */}

        <div className="mb-12">
          <p className="font-semibold uppercase tracking-wider text-yellow-400">
            FOOD & BEVERAGES
          </p>

          <h1 className="mt-2 text-5xl font-bold text-white">{movie.title}</h1>

          <p className="mt-3 text-gray-400">
            Enhance your movie experience with delicious snacks and refreshing
            beverages.
          </p>

          <p className="mt-2 text-sm text-yellow-400">
            {totalItems} item{totalItems !== 1 ? "s" : ""} selected
          </p>
        </div>

        {/* Content */}

        <div className="grid gap-10 xl:grid-cols-[2fr_420px]">
          {/* Food Grid */}

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2">
            {foods.map((food) => (
              <FoodCard
                key={food.foodId}
                item={{
                  id: food.foodId,
                  name: food.foodName,
                  category: food.description,
                  price: food.price,
                  image: food.imageUrl,
                }}
                quantity={cart[food.foodId]?.quantity || 0}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            ))}
          </div>

          {/* Summary */}

          <FoodSummary
            cart={cart}
            seatTotal={seatTotal}
            onContinue={handlePayment}
            loading={loading}
          />
        </div>
      </Container>
    </section>
  );
}

export default FoodSelection;
