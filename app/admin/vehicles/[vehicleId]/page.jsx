"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function VehicleDetailsPage() {
  const { vehicleId } = useParams();
  const router = useRouter();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vehicleId) {
      loadVehicle();
    }
  }, [vehicleId]);

  async function loadVehicle() {
    try {
      const res = await fetch(`/api/admin/vehicles/${vehicleId}`);
      const data = await res.json();

      if (data.success) {
        setVehicle(data.vehicle);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load vehicle.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-2xl font-bold">
        Loading Vehicle...
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="p-8 text-red-600 text-2xl font-bold">
        Vehicle Not Found
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <button
          onClick={() => router.push("/admin/vehicles")}
          className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-xl font-semibold"
        >
          ← Back to Vehicles
        </button>

      </div>

      {/* Vehicle Header */}
      <div className="bg-white rounded-3xl shadow-lg p-6">

        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
          Fleet Vehicle
        </span>

        <h1 className="text-3xl font-black mt-4">
          {vehicle.vehicleName}
        </h1>

        <p className="text-gray-500 mt-2">
          Vehicle ID : {vehicle.vehicleId}
        </p>

      </div>

      {/* Vehicle Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Vehicle Number</p>
          <h2 className="text-2xl font-bold mt-2">
            {vehicle.vehicleNumber}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Vehicle Type</p>
          <h2 className="text-2xl font-bold mt-2">
            {vehicle.vehicleType}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Seating Capacity</p>
          <h2 className="text-2xl font-bold mt-2">
            {vehicle.seats} Seats
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Rate Per KM</p>
          <h2 className="text-2xl font-bold mt-2">
            ₹{vehicle.ratePerKm}/KM
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Status</p>

          <span
            className={`inline-block mt-2 px-4 py-2 rounded-full font-bold ${
              vehicle.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {vehicle.status}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Mongo ID</p>
          <h2 className="text-lg font-bold mt-2 break-all">
            {vehicle._id}
          </h2>
        </div>

      </div>

    </div>
  );
}