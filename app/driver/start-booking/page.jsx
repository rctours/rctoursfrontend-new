"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Car,
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  User,
  Phone,
  FileText,
  MapPin,
  Calendar,
  Fuel,
  Wrench,
  DollarSign,
  Building,
  Flag,
  Sparkles,
  Check,
} from "lucide-react";

export default function DriverStartBookingPage() {
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [form, setForm] = useState({
    guestName: "",
    guestMobile: "",
    bookingNo: "",
    companyName: "RC Tours & Travels",

    pickupAddress: "",
    dropAddress: "",
    reportingTime: "",
    dutyType: "",

    vehicleNo: "",
    vehicleType: "",

    driverName: "",
    driverMobile: "",

    startDate: "",
    startTime: "",
    garageStartKm: "",
    pickupKm: "",
    fuelAmount: "",

    vehicleCondition: "OK",
    vehicleProblem: "",

    endDate: "",
    endTime: "",
    dropKm: "",
    garageClosingKm: "",
    extraKm: "",
    extraHours: "",

    tollAmount: "",
    parkingAmount: "",

    driverAllowance: "",
    allowanceReceived: "",

    holdCharge: "",
    holdChargeReceived: "",

    customerCashReceived: "",
    customerCashAmount: "",

    tripNotes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartDuty = () => {
    if (!form.guestName || !form.pickupAddress || !form.startTime) {
      alert("Please fill Guest Name, Pickup Address and Start Time.");
      return;
    }
    setStarted(true);
  };

  const handleCompleteDuty = () => {
    if (!form.endTime) {
      alert("Please enter End Time.");
      return;
    }
    setCompleted(true);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all duration-200 focus:border-indigo-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const labelClass =
    "mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500";

  return (
    <main className="min-h-screen bg-slate-900/5 pb-16 pt-4 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        
        {/* HEADER */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 p-6 text-white shadow-2xl sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/15 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 ring-1 ring-inset ring-indigo-500/30">
                <Sparkles className="h-3.5 w-3.5" /> RC Tours & Travels Portal
              </span>
              <h1 className="mt-3 flex items-center gap-2.5 text-2xl font-black tracking-tight sm:text-3xl">
                <Car className="h-8 w-8 text-indigo-400" /> Duty Slip & Trip Manager
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                Manage your running duty, start-end parameters, and collections easily.
              </p>
            </div>

            <Link
              href="/driver"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
            >
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</p>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm font-black text-indigo-600 sm:text-base">
              {completed ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : started ? <Clock className="h-4 w-4 text-indigo-600 animate-pulse" /> : <AlertTriangle className="h-4 w-4 text-amber-500" />}
              {completed ? "Completed" : started ? "On Duty" : "Pending"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Allowance</p>
            <p className="mt-1.5 flex items-center gap-1 text-sm font-black text-slate-800 sm:text-base">
              <DollarSign className="h-4 w-4 text-slate-400" />{form.driverAllowance || "0"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Hold Charge</p>
            <p className="mt-1.5 flex items-center gap-1 text-sm font-black text-slate-800 sm:text-base">
              <Building className="h-4 w-4 text-slate-400" />{form.holdCharge || "0"}
            </p>
          </div>
        </div>

        {/* BOOKING DETAILS */}
        <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Booking Details</h2>
              <p className="text-xs text-slate-400">Customer itinerary and schedule info.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelClass}>Guest Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="guestName" value={form.guestName} onChange={handleChange} placeholder="e.g. Rahul Sharma" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Guest Mobile</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="guestMobile" value={form.guestMobile} onChange={handleChange} placeholder="10-digit number" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Booking Number</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="bookingNo" value={form.bookingNo} onChange={handleChange} placeholder="RC-1049" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Pickup Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="pickupAddress" value={form.pickupAddress} onChange={handleChange} placeholder="Pickup location" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Drop Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="dropAddress" value={form.dropAddress} onChange={handleChange} placeholder="Drop location" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Duty Type</label>
              <select name="dutyType" value={form.dutyType} onChange={handleChange} className={inputClass}>
                <option value="">Select Duty Type</option>
                <option value="Local">Local</option>
                <option value="One Way">One Way</option>
                <option value="Round Trip">Round Trip</option>
                <option value="Airport">Airport</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Reporting Time</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input type="time" name="reportingTime" value={form.reportingTime} onChange={handleChange} className={`${inputClass} pl-10`} />
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLE + DRIVER */}
        <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Vehicle & Driver Details</h2>
              <p className="text-xs text-slate-400">Assigned cab and driver data.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label className={labelClass}>Vehicle Number</label>
              <input name="vehicleNo" value={form.vehicleNo} onChange={handleChange} placeholder="MH-49-XX-0000" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Vehicle Type</label>
              <input name="vehicleType" value={form.vehicleType} onChange={handleChange} placeholder="Swift Dzire / Ertiga" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Driver Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="driverName" value={form.driverName} onChange={handleChange} placeholder="Driver full name" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Driver Mobile</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input name="driverMobile" value={form.driverMobile} onChange={handleChange} placeholder="Mobile number" className={`${inputClass} pl-10`} />
              </div>
            </div>
          </div>
        </section>

        {/* START DUTY */}
        <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Start Duty Metrics</h2>
              <p className="text-xs text-slate-400">Odometer readings and initial condition.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className={labelClass}>Start Date</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input type="time" name="startTime" value={form.startTime} onChange={handleChange} className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Start Garage KM</label>
              <input type="number" name="garageStartKm" value={form.garageStartKm} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Pickup KM</label>
              <input type="number" name="pickupKm" value={form.pickupKm} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Fuel Amount</label>
              <div className="relative">
                <Fuel className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <input type="number" name="fuelAmount" value={form.fuelAmount} onChange={handleChange} placeholder="₹0" className={`${inputClass} pl-10`} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Vehicle Condition</label>
              <select name="vehicleCondition" value={form.vehicleCondition} onChange={handleChange} className={inputClass}>
                <option value="OK">Vehicle OK</option>
                <option value="Minor Issue">Minor Issue</option>
                <option value="Major Issue">Major Issue</option>
              </select>
            </div>
          </div>

          {form.vehicleCondition !== "OK" && (
            <div className="mt-5">
              <label className={labelClass}>Vehicle Problem Details</label>
              <textarea name="vehicleProblem" value={form.vehicleProblem} onChange={handleChange} rows={3} placeholder="Describe the vehicle problem..." className={inputClass} />
            </div>
          )}

          {!started ? (
            <button
              type="button"
              onClick={handleStartDuty}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 py-4 text-sm font-extrabold tracking-wide text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700 active:scale-[0.99] sm:w-auto sm:px-8"
            >
              <Sparkles className="h-4 w-4" /> START DUTY NOW
            </button>
          ) : (
            <div className="mt-6 flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200/60 p-4 text-sm font-bold text-emerald-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="h-4 w-4" />
              </span>
              Duty Started Successfully! You can now complete the trip when done.
            </div>
          )}
        </section>

        {/* COMPLETE DUTY */}
        {started && (
          <section className="mb-6 rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Flag className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Complete Duty & Settlements</h2>
                <p className="text-xs text-slate-400">Closing kilometers, expenses, and allowances.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className={labelClass}>End Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className={`${inputClass} pl-10`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>End Time</label>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input type="time" name="endTime" value={form.endTime} onChange={handleChange} className={`${inputClass} pl-10`} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Drop KM</label>
                <input type="number" name="dropKm" value={form.dropKm} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Closing Garage KM</label>
                <input type="number" name="garageClosingKm" value={form.garageClosingKm} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Extra KM</label>
                <input type="number" name="extraKm" value={form.extraKm} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Extra Hours</label>
                <input type="number" name="extraHours" value={form.extraHours} onChange={handleChange} placeholder="0" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Toll Amount</label>
                <input type="number" name="tollAmount" value={form.tollAmount} onChange={handleChange} placeholder="₹0" className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Parking Amount</label>
                <input type="number" name="parkingAmount" value={form.parkingAmount} onChange={handleChange} placeholder="₹0" className={inputClass} />
              </div>
            </div>

            {/* DRIVER ALLOWANCE */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                <DollarSign className="h-5 w-5 text-indigo-600" /> Driver Allowance
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Allowance Amount</label>
                  <input type="number" name="driverAllowance" value={form.driverAllowance} onChange={handleChange} placeholder="₹0" className={inputClass} />
                </div>

                <div>
                  <label className={labelClass}>Allowance Received from Customer?</label>
                  <select name="allowanceReceived" value={form.allowanceReceived} onChange={handleChange} className={inputClass}>
                    <option value="">Select option</option>
                    <option value="Yes">Yes - Received</option>
                    <option value="No">No - Add to Salary</option>
                  </select>
                </div>
              </div>

              {form.allowanceReceived === "No" && (
                <div className="mt-3 flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200/60 p-4 text-xs font-semibold text-amber-800">
                  <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600" />
                  ₹{form.driverAllowance || "0"} will be added directly to driver's pending salary account.
                </div>
              )}
            </div>

            {/* HOLD CHARGE */}
            {form.dutyType === "Round Trip" && (
              <div className="mt-8 border-t border-slate-100 pt-6">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                  <Building className="h-5 w-5 text-indigo-600" /> Hold Charge
                </h3>
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <div>
                    <label className={labelClass}>Hold Charge Amount</label>
                    <input type="number" name="holdCharge" value={form.holdCharge} onChange={handleChange} placeholder="₹0" className={inputClass} />
                  </div>

                  <div>
                    <label className={labelClass}>Hold Charge Received?</label>
                    <select name="holdChargeReceived" value={form.holdChargeReceived} onChange={handleChange} className={inputClass}>
                      <option value="">Select option</option>
                      <option value="Yes">Yes - Received</option>
                      <option value="No">No - Add to Salary</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* CUSTOMER CASH COLLECTION */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-800">
                <DollarSign className="h-5 w-5 text-indigo-600" /> Customer Payment Collection
              </h3>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Customer paid cash directly to driver?</label>
                  <select name="customerCashReceived" value={form.customerCashReceived} onChange={handleChange} className={inputClass}>
                    <option value="">Select option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {form.customerCashReceived === "Yes" && (
                  <div>
                    <label className={labelClass}>Received Amount</label>
                    <input type="number" name="customerCashAmount" value={form.customerCashAmount} onChange={handleChange} placeholder="₹0" className={inputClass} />
                  </div>
                )}
              </div>
            </div>

            {/* NOTES */}
            <div className="mt-8 border-t border-slate-100 pt-6">
              <label className={labelClass}>Trip Notes & Remarks</label>
              <textarea name="tripNotes" value={form.tripNotes} onChange={handleChange} rows={4} placeholder="Any trip issues, vehicle problems or important note..." className={inputClass} />
            </div>

            {!completed ? (
              <button
                type="button"
                onClick={handleCompleteDuty}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-sm font-extrabold tracking-wide text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.99] sm:w-auto sm:px-8"
              >
                <CheckCircle2 className="h-4 w-4" /> SUBMIT & COMPLETE DUTY
              </button>
            ) : (
              <div className="mt-8 flex items-center gap-3 rounded-2xl bg-emerald-600 p-5 text-base font-bold text-white shadow-xl">
                <CheckCircle2 className="h-6 w-6 text-white" /> Duty Successfully Completed & Recorded!
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}