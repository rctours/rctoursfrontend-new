"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

console.log("Response Status:", res.status);
console.log("Response Data:", data);

if (data.success) {
  console.log("Redirecting to /admin...");
  window.location.href = "/admin";
} else {
  setError(data.message || "Invalid authentication credentials.");
}
    } catch (error) {
      console.error(error);
      setError("Network pipeline exception. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">
      
      {/* Visual Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-100 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-50 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl shadow-xl p-8 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-indigo-100/30">
            Secure Portal
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-3 tracking-tight">
            RC Tours & Travels
          </h1>
          <p className="text-slate-400 text-xs font-semibold mt-1">
            Authorized operations management access only.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
              Operator Username
            </label>
            <input
              type="text"
              placeholder="Enter unique identity token"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
              Security Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter validation key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm font-mono font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-indigo-600 hover:text-indigo-800 font-bold tracking-wide transition"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          {/* Exception Alerts */}
          {error && (
            <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl px-4 py-3 leading-relaxed">
              ⚠️ {error}
            </div>
          )}

          <div className="flex justify-end">
          <Link
          href="/admin/forgot-password"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition"
          >
          Forgot Password?
          </Link>
          </div>

          {/* Form Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-indigo-650 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-bold transition shadow-sm text-sm tracking-wide mt-2"
          >
            {loading ? "Authenticating Session..." : "Initialize Dashboard Access"}
          </button>

        </form>

      </div>
    </div>
  );
}