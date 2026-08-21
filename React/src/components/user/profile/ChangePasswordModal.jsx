import { useState } from "react";
import { FaLock, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { userService } from "../../../services/userService";

function ChangePasswordModal({ open, onClose }) {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.oldPassword.trim()) {
      toast.error("Current password is required.");
      return;
    }

    if (!form.newPassword.trim()) {
      toast.error("New password is required.");
      return;
    }

    if (form.newPassword.length < 6) {
      toast.error("Password must contain at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await userService.changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully.");

      clearForm();

      onClose();
    } catch (err) {
      toast.error(err || "Unable to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaLock className="text-yellow-400" size={22} />

            <h2 className="text-2xl font-bold">Change Password</h2>
          </div>

          <button onClick={onClose}>
            <FaTimes className="text-gray-400 hover:text-white" size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Current Password
            </label>

            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                value={form.oldPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#333] bg-[#202020] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              New Password
            </label>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#333] bg-[#202020] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#333] bg-[#202020] px-4 py-3 pr-12 outline-none focus:border-yellow-400"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => {
                clearForm();
                onClose();
              }}
              className="rounded-xl border border-[#333] px-5 py-3 hover:border-yellow-400"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-yellow-400 px-6 py-3 font-bold text-black transition hover:bg-yellow-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
