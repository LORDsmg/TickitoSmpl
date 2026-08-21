import {
  FaHome,
  FaFilm,
  FaBuilding,
  FaCalendarAlt,
  FaUsers,
  FaTicketAlt,
  FaChartBar,
  FaCog,
  FaHamburger,
  FaGift,
  FaSignOutAlt,
  FaTimes,
  FaKey,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const menus = [
  {
    name: "Dashboard",
    icon: <FaHome />,
    path: "/admin/dashboard",
  },
  {
    name: "Movies",
    icon: <FaFilm />,
    path: "/admin/movies",
  },
  {
    name: "Theatres",
    icon: <FaBuilding />,
    path: "/admin/theatres",
  },
  {
    name: "Shows",
    icon: <FaCalendarAlt />,
    path: "/admin/shows",
  },
  {
    name: "Foods",
    icon: <FaHamburger />,
    path: "/admin/foods",
  },

  {
    name: "Users",
    icon: <FaUsers />,
    path: "/admin/users",
  },
  {
    name: "Change Password",
    path: "/admin/change-password",
    icon: <FaKey />,
  },
];

function AdminSidebar({ closeSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    dispatch(logout());

    toast.success("Logged out successfully.");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[#2b2b2b] bg-[#111111]">
      {/* Logo */}

      <div className="flex items-center justify-between border-b border-[#222] px-6 py-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-400">Tikito Admin</h1>

          <p className="text-xs text-gray-500">Management Panel</p>
        </div>

        {closeSidebar && (
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 hover:bg-[#252525] lg:hidden"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Navigation */}

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {menus.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-400 text-black shadow-lg"
                    : "text-gray-300 hover:bg-[#222] hover:text-white"
                }`
              }
            >
              <span className="text-lg">{menu.icon}</span>

              {menu.name}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Footer */}

      <div className="border-t border-[#222] p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-500"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
