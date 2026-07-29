"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TourPackagesPage() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPackages = async () => {
    try {
      const res = await fetch("/api/tour-packages");

      const data = await res.json();

      if (data.success) {
        setPackages(data.packages || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const deletePackage = async (id) => {
    const ok = confirm("Delete this package?");

    if (!ok) return;

    try {
      const res = await fetch(`/api/tour-packages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        loadPackages();
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-10 text-center">
        Loading packages...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">

      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-black text-slate-900">
            🌍 Tour Package Management
          </h1>

          <p className="text-slate-500 mt-2">
            Add, edit and manage all your tour packages.
          </p>
        </div>

        <Link
          href="/admin/tour-packages/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold transition"
        >
          + Add Package
        </Link>

      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

        {packages.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              No Tour Packages Available
            </h2>

            <p className="text-slate-500">
              Click on "Add Package" to create your first package.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">

              <thead className="bg-slate-100">
                <tr>
                  <th className="text-left p-4">Package</th>
                  <th className="text-left p-4">Location</th>
                  <th className="text-left p-4">Price</th>
                  <th className="text-left p-4">Duration</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>

              <tbody>

                {packages.map((pkg) => (
                  <tr
                    key={pkg._id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="p-4">
                      <div className="font-bold">
                        {pkg.title}
                      </div>

                      <div className="text-sm text-slate-500">
                        {pkg.slug}
                      </div>
                    </td>

                    <td className="p-4">
                      {pkg.location}
                    </td>

                    <td className="p-4 font-bold text-green-600">
                      ₹{pkg.price}
                    </td>

                    <td className="p-4">
                      {pkg.duration}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          pkg.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {pkg.status}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">

                        <Link
                          href={`/admin/tour-packages/edit/${pkg._id}`}
                          className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => deletePackage(pkg._id)}
                          className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm"
                        >
                          Delete
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>
        )}

      </div>

    </div>
  );
}