const BOOKINGS_KEY = "tikito-bookings";

export function getStoredBookings() {
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveBooking(booking) {
  const bookings = getStoredBookings();
  const updatedBookings = [booking, ...bookings];
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  return updatedBookings;
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
