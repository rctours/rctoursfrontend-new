"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
const [message, setMessage] = useState("");

const [success, setSuccess] = useState(false);
const [countdown, setCountdown] = useState(3);

  // ===========================
  // Live Password Validation
  // ===========================
  const passwordRules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&^#()_\-+=]/.test(password),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!token) {
      setMessage("Invalid reset link.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        setMessage(data.message);
        return;
      }

      setSuccess(true);

     let seconds = 3;

    const timer = setInterval(() => {
    seconds--;

    if (seconds <= 0) {
    clearInterval(timer);
    router.push("/admin/login");
    return;
    }

    setCountdown(seconds);
    }, 1000);

    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {

  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md text-center">

        <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">

        <span className="text-5xl">
        ✅
        </span>

        </div>

        <h1 className="text-3xl font-bold text-green-700 mt-5">
          Password Changed Successfully
        </h1>

        <p className="text-gray-500 mt-3">
          Redirecting to Login...
        </p>

        <div className="text-5xl font-black text-blue-600 mt-8">
          {countdown}
        </div>

      </div>

    </main>

  );

}

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* New Password */}
          <div>
            <label className="block mb-2 font-medium">
              New Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-3 pr-20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 font-medium">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border rounded-lg px-4 py-3 pr-20"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-blue-600 hover:text-blue-800"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="rounded-xl border bg-gray-50 p-4">
            <h3 className="font-semibold mb-3">
              Password Requirements
            </h3>

            <div className="space-y-2 text-sm">

              <p className={passwordRules.length ? "text-green-600" : "text-red-500"}>
                {passwordRules.length ? "✅" : "❌"} Minimum 8 characters
              </p>

              <p className={passwordRules.uppercase ? "text-green-600" : "text-red-500"}>
                {passwordRules.uppercase ? "✅" : "❌"} One Uppercase Letter
              </p>

              <p className={passwordRules.lowercase ? "text-green-600" : "text-red-500"}>
                {passwordRules.lowercase ? "✅" : "❌"} One Lowercase Letter
              </p>

              <p className={passwordRules.number ? "text-green-600" : "text-red-500"}>
                {passwordRules.number ? "✅" : "❌"} One Number
              </p>

              <p className={passwordRules.special ? "text-green-600" : "text-red-500"}>
                {passwordRules.special ? "✅" : "❌"} One Special Character
              </p>

            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-600 p-3 text-center font-medium">
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-lg font-bold transition"
          >
            {loading ? "Please Wait..." : "Reset Password"}
          </button>

        </form>

      </div>
    </main>
  );
}