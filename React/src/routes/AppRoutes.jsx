import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";

import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Profile from "../pages/user/Profile";

import MovieDetails from "../pages/user/MovieDetails";
import TheatreSelection from "../pages/user/TheatreSelection";
import SeatSelection from "../pages/user/SeatSelection";
import FoodSelection from "../pages/user/FoodSelection";

import BookingSuccess from "../pages/user/BookingSuccess";

import AdminDashboard from "../pages/admin/AdminDashboard";
import MovieList from "../pages/admin/MovieList";
import MovieForm from "../pages/admin/MovieForm";
import TheatreList from "../pages/admin/TheatreList";
import TheatreForm from "../pages/admin/TheatreForm";
import ShowList from "../pages/admin/ShowList";
import ShowForm from "../pages/admin/ShowForm";

import FoodList from "../pages/admin/FoodList";
import FoodForm from "../pages/admin/FoodForm";
import UserList from "../pages/admin/UserList";
import ChangePassword from "../pages/admin/ChangePassword";

// import Settings from "../pages/admin/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* User Routes */}

      {/* User Routes */}

      <Route element={<UserLayout />}>
        {/* Public */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected User Only */}

        <Route element={<ProtectedRoute />}>
          <Route element={<UserRoute />}>
            <Route path="/" element={<Home />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/movie/:id" element={<MovieDetails />} />

            <Route path="/movie/:id/theatres" element={<TheatreSelection />} />

            <Route path="/movie/:id/seats" element={<SeatSelection />} />

            <Route path="/movie/:id/food" element={<FoodSelection />} />

            {/* <Route path="/movie/:id/payment" element={<Payment />} /> */}

            <Route path="/booking-success" element={<BookingSuccess />} />

            <Route path="/movie/:id/success" element={<BookingSuccess />} />
          </Route>
        </Route>
      </Route>

      {/* Admin Routes */}

      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/change-password" element={<ChangePassword />} />

          <Route path="/admin/foods" element={<FoodList />} />

          <Route path="/admin/foods/add" element={<FoodForm />} />

          <Route path="/admin/foods/edit/:id" element={<FoodForm />} />

          <Route path="/admin/users" element={<UserList />} />

          <Route path="/admin/shows/edit/:id" element={<ShowForm />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/movies" element={<MovieList />} />

          <Route path="/admin/movies/add" element={<MovieForm />} />

          <Route path="/admin/movies/edit/:id" element={<MovieForm />} />

          <Route path="/admin/theatres" element={<TheatreList />} />

          <Route path="/admin/theatres/add" element={<TheatreForm />} />

          <Route path="/admin/theatres/edit/:id" element={<TheatreForm />} />

          <Route path="/admin/shows" element={<ShowList />} />

          <Route path="/admin/shows/add" element={<ShowForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;
