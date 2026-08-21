import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userService } from "../../services/userService";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.oldPassword.trim()) {
      setError("Current password is required.");
      return;
    }

    if (!form.newPassword.trim()) {
      setError("New password is required.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);

      await userService.changePassword({
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      });

      toast.success("Password updated successfully.");

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message || "Unable to update password.";

      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-2xl bg-[#1b1b1b] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Change Password</h1>

        <p className="mt-2 text-gray-400">Update your account password.</p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-600/20 p-4 text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block">Current Password</label>

          <input
            type="password"
            name="oldPassword"
            value={form.oldPassword}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
            placeholder="Enter current password"
          />
        </div>

        <div>
          <label className="mb-2 block">New Password</label>

          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
            placeholder="Enter new password"
          />
        </div>

        <div>
          <label className="mb-2 block">Confirm Password</label>

          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl bg-[#252525] p-4 outline-none"
            placeholder="Confirm new password"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="rounded-xl border border-gray-600 px-8 py-4 hover:bg-[#2d2d2d]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-yellow-400 px-10 py-4 font-semibold text-black hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
