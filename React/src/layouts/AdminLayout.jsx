import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="flex min-h-screen bg-[#0B0B0B] text-white">

      {/* Desktop Sidebar */}

      <div className="hidden lg:block">

        <AdminSidebar />

      </div>

      {/* Mobile Sidebar */}

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">

          <div className="w-72 bg-[#171717] shadow-2xl">

            <AdminSidebar
              closeSidebar={() =>
                setSidebarOpen(false)
              }
            />

          </div>

          <div
            className="flex-1 bg-black/70"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        </div>
      )}

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col">

        <AdminNavbar
          openSidebar={() =>
            setSidebarOpen(true)
          }
        />

        <main className="flex-1 overflow-y-auto bg-[#101010] p-6">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;