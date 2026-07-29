"use client";

import { useEffect, useState } from "react";
import VehicleForm from "./VehicleForm";
import VehicleTable from "./VehicleTable";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingVehicle, setEditingVehicle] = useState(null);

  async function loadVehicles() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/vehicles", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setVehicles(data.vehicles || []);
      }
    } catch (error) {
      console.error("LOAD VEHICLES ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  function handleEdit(vehicle) {
    setEditingVehicle(vehicle);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingVehicle(null);
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* Premium Header Panel */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Fleet Assets
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
          🚗 Vehicle Fleet Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Maintain your fleet database, track active vehicle assets, and manage operational status.
        </p>
      </div>

      {/* Form Controller Block */}
      <VehicleForm
        editingVehicle={editingVehicle}
        onCancel={handleCancelEdit}
        onSuccess={() => {
          loadVehicles();
          setEditingVehicle(null);
        }}
      />

      {/* Data Roster Block */}
      <VehicleTable
        vehicles={vehicles}
        loading={loading}
        onEdit={handleEdit}
        onDelete={loadVehicles}
      />

    </div>
  );
}