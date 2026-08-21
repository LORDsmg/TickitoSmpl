import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-24 border-t border-[#2A2A2A] bg-[#111111]">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo */}
          <div>
            <h2 className="text-4xl font-bold text-yellow-400">
              TIKITO
            </h2>

            <p className="mt-5 leading-7 text-gray-400">
              Book movie tickets in seconds. Discover the latest movies,
              premium theatres and an amazing booking experience.
            </p>

            <div className="mt-8 flex gap-4">
              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E1E1E] transition hover:bg-yellow-400 hover:text-black"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E1E1E] transition hover:bg-yellow-400 hover:text-black"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E1E1E] transition hover:bg-yellow-400 hover:text-black"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1E1E1E] transition hover:bg-yellow-400 hover:text-black"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">
              Quick Links
            </h3>

            <div className="flex flex-col gap-4 text-gray-400">
              <Link to="/" className="hover:text-yellow-400">
                Home
              </Link>

              <Link to="/movies" className="hover:text-yellow-400">
                Movies
              </Link>

              <Link to="/my-bookings" className="hover:text-yellow-400">
                My Bookings
              </Link>

              <Link to="/profile" className="hover:text-yellow-400">
                Profile
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">
              Support
            </h3>

            <div className="flex flex-col gap-4 text-gray-400">
              <Link to="#" className="hover:text-yellow-400">
                Help Center
              </Link>

              <Link to="#" className="hover:text-yellow-400">
                Terms & Conditions
              </Link>

              <Link to="#" className="hover:text-yellow-400">
                Privacy Policy
              </Link>

              <Link to="#" className="hover:text-yellow-400">
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-2xl font-semibold">
              Contact Us
            </h3>

            <div className="space-y-5 text-gray-400">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-yellow-400" />

                <p>Pune, Maharashtra, India</p>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-yellow-400" />

                <p>+91 98765 43210</p>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" />

                <p>support@tikito.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-[#252525] py-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} TIKITO. All Rights Reserved.
          </p>

          <p>
            Designed & Developed with ❤️ using React + Spring Boot
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;