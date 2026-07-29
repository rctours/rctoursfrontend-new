"use client";

import { useEffect, useState } from "react";
import DriverForm from "./DriverForm";
import DriverTable from "./DriverTable";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDriver, setEditingDriver] = useState(null);

  async function loadDrivers() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/drivers", {
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) {
        setDrivers(data.drivers || []);
      }
    } catch (error) {
      console.error("LOAD DRIVERS ERROR:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDrivers();
  }, []);

  function handleEdit(driver) {
    setEditingDriver(driver);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function handleCancelEdit() {
    setEditingDriver(null);
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
        <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Human Resources
        </span>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
          👨‍✈️ Driver Logistics Management
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Onboard new fleet operations personnel, configure active licensing records, and track operator availability.
        </p>
      </div>

      <DriverForm
        onSuccess={() => {
          loadDrivers();
          setEditingDriver(null);
        }}
        editingDriver={editingDriver}
        onCancel={handleCancelEdit}
      />

      <DriverTable
        drivers={drivers}
        loading={loading}
        onEdit={handleEdit}
        onDelete={loadDrivers}
      />

    </div>
  );
}