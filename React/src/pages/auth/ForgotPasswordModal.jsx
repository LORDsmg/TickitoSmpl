import { useState } from "react";
import { toast } from "react-toastify";

import { userService } from "../../services/userService";

function ForgotPasswordModal({ open, onClose, onOtpSent }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await userService.forgotPassword(email);

      toast.success("OTP sent to your email.");

      onOtpSent(email);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-3xl bg-[#181818] p-8">
        <h2 className="text-3xl font-bold">Forgot Password</h2>

        <p className="mt-2 text-gray-400">Enter your registered email.</p>

        <form onSubmit={handleSubmit} className="mt-8">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-[#333] bg-[#222] px-4 py-3 outline-none focus:border-yellow-400"
          />

          <div className="mt-8 flex gap-4">
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
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
