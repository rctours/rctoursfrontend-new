"use client";

import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

export default function AdminProfilePage() {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/profile", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!data.success) {
        setError(data.message);
        return;
      }

      setAdmin(data.admin);
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <h1 className="text-3xl font-bold mb-4">
            Admin Profile
          </h1>

          <p className="text-gray-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6">
        <div className="bg-white rounded-2xl shadow p-8">

          <h1 className="text-3xl font-bold mb-4">
            Admin Profile
          </h1>

          <div className="bg-red-100 text-red-600 p-4 rounded-xl">
            {error}
          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="p-6">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          👤 Admin Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="text-gray-500 text-sm">
              Full Name
            </label>

            <div className="mt-1 text-lg font-semibold">
              {admin?.name || "-"}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Username
            </label>

            <div className="mt-1 text-lg font-semibold">
              {admin?.username || "-"}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Email
            </label>

            <div className="mt-1 text-lg font-semibold break-all">
              {admin?.email || "-"}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Role
            </label>

            <div className="mt-1">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                {admin?.role || "-"}
              </span>
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Status
            </label>

            <div className="mt-1">
              {admin?.isActive ? (
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                  Active
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
                  Inactive
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Last Login
            </label>

            <div className="mt-1 text-lg">
              {admin?.lastLogin
                ? new Date(admin.lastLogin).toLocaleString()
                : "-"}
            </div>
          </div>

          <div>
            <label className="text-gray-500 text-sm">
              Account Created
            </label>

            <div className="mt-1 text-lg">
              {admin?.createdAt
                ? new Date(admin.createdAt).toLocaleDateString()
                : "-"}
            </div>
          </div>

        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <button
            onClick={() => setEditOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
            Edit Profile
        </button>

          <button
            onClick={() => setChangePasswordOpen(true)}
            className="bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-xl font-semibold"
            >
            Change Password
        </button>

        </div>

      </div>

      <EditProfileModal
    open={editOpen}
    onClose={() => setEditOpen(false)}
    admin={admin}
    onSuccess={fetchProfile}
    />

    <ChangePasswordModal
    open={changePasswordOpen}
    onClose={() => setChangePasswordOpen(false)}
    />

    </main>
  );
}