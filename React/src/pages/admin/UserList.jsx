import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";

import { userService } from "../../services/userService";

const PAGE_SIZE = 8;

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const data = await userService.getAllUsers();

      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      `${user.firstName} ${user.lastName} ${user.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [users, search]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const pageData = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Users</h1>

        <p className="text-gray-400">Registered Users</p>
      </div>

      <div className="flex items-center rounded-xl bg-[#1d1d1d] px-4">
        <FaSearch className="text-gray-400" />

        <input
          placeholder="Search user..."
          value={search}
          onChange={(e) => {
            setCurrentPage(1);
            setSearch(e.target.value);
          }}
          className="w-full bg-transparent p-4 outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl bg-[#1b1b1b]">
        <table className="w-full">
          <thead className="bg-[#242424]">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Phone</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan={3} className="p-10 text-center">
                  Loading Users...
                </td>
              </tr>
            )}

            {!loading &&
              pageData.map((user) => (
                <tr key={user.userId} className="border-t border-[#2c2c2c]">
                  <td className="p-4 font-medium">
                    {user.firstName} {user.lastName}
                  </td>

                  <td className="p-4">{user.email}</td>

                  <td className="p-4">{user.phone || "-"}</td>
                </tr>
              ))}

            {!loading && pageData.length === 0 && (
              <tr>
                <td colSpan={3} className="p-12 text-center text-gray-400">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-lg px-4 py-2 ${
                currentPage === index + 1
                  ? "bg-yellow-400 text-black"
                  : "bg-[#242424]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
