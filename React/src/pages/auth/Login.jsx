import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authService } from "../../services/authService";
import { setAuth } from "../../redux/slices/authSlice";
import ResetPasswordModal from "./ResetPasswordModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await authService.login(credentials);
      dispatch(
        setAuth({
          user: res.user || res,
          token: res.token,
        }),
      );

      const loggedInUser = res.user || res;

      if (loggedInUser.role === "ROLE_ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.toString() || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8"
        >
          <p className="font-semibold tracking-widest text-yellow-400">
            WELCOME BACK
          </p>

          <h1 className="mt-2 text-4xl font-bold">Sign in to TIKITO</h1>

          {error && <p className="mt-3 text-red-500">{error}</p>}

          <label className="mt-8 block text-sm font-medium">
            Email
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400"
            />
          </label>

          <label className="mt-5 block text-sm font-medium">
            Password
            <div className="relative mt-2">
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </label>

          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={() => setShowForgotModal(true)}
              className="text-sm text-yellow-400 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          <button
            disabled={loading}
            className="mt-8 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          <p className="mt-5 text-center text-sm text-gray-400">
            Don't have account?
            <Link to="/register" className="text-yellow-400 ml-1">
              Create account
            </Link>
          </p>
        </form>
      </div>
      <ForgotPasswordModal
        open={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        onOtpSent={(email) => {
          setResetEmail(email);
          setShowResetModal(true);
        }}
      />

      <ResetPasswordModal
        open={showResetModal}
        email={resetEmail}
        onClose={() => {
          setShowResetModal(false);
          setShowForgotModal(false);

          setResetEmail("");

          setCredentials({
            email: "",
            password: "",
          });

          setTimeout(() => {
            emailRef.current?.focus();
          }, 100);
        }}
      />
    </section>
  );
};
export default Login;

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { loginSuccess } from "../../redux/slices/authSlice";
// import Container from "../../components/common/Container";

// function Login() {
//   const [email, setEmail] = useState("demo@tikito.com");
//   const [password, setPassword] = useState("password");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//  const submit = async (event) => {
//   event.preventDefault();

//   try {
//     const response = await api.post("/auth/login", {
//       email,
//       password,
//     });

//     console.log(response.data);

//     const data = response.data.data;

//     localStorage.setItem("token", data.token);

//     dispatch(
//       loginSuccess({
//         user: data.user,
//         token: data.token,
//       })
//     );

//     navigate("/");
//   } catch (err) {
//     console.error(err);
//     alert("Invalid email or password");
//   }
// };

//   return <section className="py-16"><Container><form onSubmit={submit} className="mx-auto max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8"><p className="font-semibold tracking-widest text-yellow-400">WELCOME BACK</p><h1 className="mt-2 text-4xl font-bold">Sign in to TIKITO</h1><p className="mt-3 text-sm text-gray-400">Demo mode: any email and password will work.</p><label className="mt-8 block text-sm font-medium">Email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400" /></label><label className="mt-5 block text-sm font-medium">Password<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-2 w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400" /></label><button className="mt-8 w-full rounded-xl bg-yellow-400 py-3 font-bold text-black">Sign In</button><div className="mt-5 flex justify-between text-sm text-gray-400"><Link to="/forgot-password" className="hover:text-yellow-400">Forgot password?</Link><Link to="/register" className="hover:text-yellow-400">Create account</Link></div></form></Container></section>;
// }

// export default Login;
