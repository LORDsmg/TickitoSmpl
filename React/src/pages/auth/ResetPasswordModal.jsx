import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { userService } from "../../services/userService";

function ResetPasswordModal({ open, email, onClose }) {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await userService.resetPassword({
        email,
        otp: Number(otp),
        newPassword,
      });

      toast.success("Password reset successfully. Please sign in.");

      // Clear form
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");

      onClose();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-3xl bg-[#181818] p-8">
        <h2 className="text-3xl font-bold">Reset Password</h2>

        <p className="mt-2 text-gray-400">Enter the OTP sent to your email.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <input
            type="number"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            className="w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400"
          />

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-[#444] py-3"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="flex-1 rounded-xl bg-yellow-400 py-3 font-bold text-black"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPasswordModal;
