import { FaBars, FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function AdminNavbar({ openSidebar }) {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard",
    "/admin/movies": "Movies",
    "/admin/theatres": "Theatres",
    "/admin/shows": "Shows",
    "/admin/foods": "Foods",
    "/admin/offers": "Offers",
    "/admin/bookings": "Bookings",
    "/admin/users": "Users",
    "/admin/reports": "Reports",
    "/admin/settings": "Settings",
  };

  const title = pageTitles[location.pathname] || "Admin Panel";

  return (
    <header className="sticky top-0 z-30 border-b border-[#242424] bg-[#151515]">
      <div className="flex items-center justify-end px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Profile */}

          <div className="flex items-center gap-3 rounded-xl bg-[#222] px-3 py-2">
            <FaUserCircle size={34} className="text-yellow-400" />

            <div className="hidden sm:block">
              <h3 className="font-semibold">Administrator</h3>

              <p className="text-xs text-gray-400">admin@movie.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
