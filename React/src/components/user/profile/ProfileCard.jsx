import { FaUserCircle } from "react-icons/fa";

function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="rounded-3xl border border-[#2A2A2A] bg-[#181818] p-8">
      <div className="flex flex-col items-center">
        <FaUserCircle size={120} className="text-yellow-400" />

        <h2 className="mt-6 text-3xl font-bold text-white">
          {user.firstName} {user.lastName}
        </h2>

        <p className="mt-3 text-gray-400">{user.email}</p>

        <p className="mt-2 text-gray-400">{user.phone}</p>
      </div>
    </div>
  );
}

export default ProfileCard;
