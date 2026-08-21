import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaLock, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import Container from "../../components/common/Container";

import ProfileCard from "../../components/user/profile/ProfileCard";
import BookingTabs from "../../components/user/profile/BookingTabs";

import { userService } from "../../services/userService";
import { bookingService } from "../../services/bookingService";

import { logout } from "../../redux/slices/authSlice";

import ChangePasswordModal from "../../components/user/profile/ChangePasswordModal";

function Profile() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  const [bookings, setBookings] = useState([]);

  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const profile = await userService.getProfile();

      setUser(profile);

      const myBookings = await bookingService.getMyBookings();

      console.log(JSON.stringify(myBookings, null, 2));

      setBookings(myBookings);
    } catch (err) {
      toast.error("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    dispatch(logout());

    toast.success("Logged out successfully.");

    navigate("/login");
  };

  if (loading) {
    return (
      <Container className="py-20">
        <h2 className="text-center text-2xl">Loading Profile...</h2>
      </Container>
    );
  }

  return (
    <section className="py-12">
      <Container>
        <div className="mb-10">
          <p className="font-semibold text-yellow-400">MY PROFILE</p>

          <h1 className="mt-3 text-5xl font-bold">Welcome, {user.firstName}</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[330px_1fr]">
          {/* LEFT */}

          <div className="space-y-6">
            <ProfileCard user={user} />

            <button
              className="flex w-full items-center justify-between rounded-2xl border border-[#303030] bg-[#181818] p-5 transition hover:border-yellow-400"
              onClick={() => setShowPasswordModal(true)}
            >
              <div className="flex items-center gap-4">
                <FaLock className="text-yellow-400" />
                Change Password
              </div>
              →
            </button>

            <button
              className="flex w-full items-center justify-between rounded-2xl border border-red-500 bg-[#181818] p-5 text-red-400 transition hover:bg-red-600 hover:text-white"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-4">
                <FaSignOutAlt />
                Logout
              </div>
              →
            </button>
          </div>

          {/* RIGHT */}

          <div className="rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8">
            <BookingTabs bookings={bookings} refreshBookings={loadData} />
          </div>
        </div>
      </Container>
      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </section>
  );
}

export default Profile;
