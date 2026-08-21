import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function UserRoute() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "ROLE_USER") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

export default UserRoute;
