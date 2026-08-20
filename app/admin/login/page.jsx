"use client";

import { useState } from "react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ======================================================
  // CONVERT VAPID PUBLIC KEY
  // ======================================================

  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat(
      (4 - (base64String.length % 4)) % 4
    );

    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);

    return Uint8Array.from(
      [...rawData].map((character) =>
        character.charCodeAt(0)
      )
    );
  };

  // ======================================================
  // ADMIN PUSH NOTIFICATION SUBSCRIPTION
  // ======================================================

  const subscribeAdminToPushNotifications = async () => {
    try {
      console.log(
        "Starting admin push notification subscription..."
      );

      // ================================================
      // CHECK BROWSER SUPPORT
      // ================================================

      if (
        !("serviceWorker" in navigator) ||
        !("PushManager" in window) ||
        !("Notification" in window)
      ) {
        console.log(
          "Push notifications are not supported."
        );

        return;
      }

      // ================================================
      // CHECK NOTIFICATION PERMISSION
      // ================================================

      let permission = Notification.permission;

      console.log(
        "Admin notification permission:",
        permission
      );

      if (permission === "default") {
        permission =
          await Notification.requestPermission();
      }

      if (permission !== "granted") {
        console.log(
          "Admin notification permission not granted."
        );

        return;
      }

      console.log(
        "Admin notification permission granted."
      );

      // ================================================
      // REGISTER SERVICE WORKER
      // ================================================

      const registration =
        await navigator.serviceWorker.register(
          "/sw.js"
        );

      console.log(
        "Admin service worker registered:",
        registration
      );

      // ================================================
      // WAIT FOR SERVICE WORKER
      // ================================================

      const readyRegistration =
        await navigator.serviceWorker.ready;

      // ================================================
      // CHECK EXISTING SUBSCRIPTION
      // ================================================

      let subscription =
        await readyRegistration.pushManager.getSubscription();

      // ================================================
      // CREATE NEW SUBSCRIPTION
      // ================================================

      if (!subscription) {
        const vapidPublicKey =
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

        if (!vapidPublicKey) {
          console.error(
            "VAPID public key is missing."
          );

          return;
        }

        const convertedVapidKey =
          urlBase64ToUint8Array(
            vapidPublicKey
          );

        subscription =
          await readyRegistration.pushManager.subscribe({
            userVisibleOnly: true,

            applicationServerKey:
              convertedVapidKey,
          });

        console.log(
          "New admin push subscription created:",
          subscription.toJSON()
        );
      } else {
        console.log(
          "Existing admin push subscription found:",
          subscription.toJSON()
        );
      }

      // ================================================
      // SAVE ADMIN SUBSCRIPTION IN MONGODB
      // ================================================

      const response = await fetch(
        "/api/push/subscribe",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            subscription:
              subscription.toJSON(),

            role: "admin",
          }),
        }
      );

      const data =
        await response.json();

      console.log(
        "Admin push subscription result:",
        data
      );

      if (!response.ok) {
        console.error(
          "Admin push subscription save failed:",
          data
        );
      } else {
        console.log(
          "Admin push subscription saved successfully."
        );
      }
    } catch (error) {
      console.error(
        "ADMIN PUSH SUBSCRIPTION ERROR:",
        error
      );
    }
  };

  // ======================================================
  // ADMIN LOGIN
  // ======================================================

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      console.log(
        "Response Status:",
        res.status
      );

      console.log(
        "Response Data:",
        data
      );

      if (data.success) {
        console.log(
          "Admin login successful."
        );

        // ================================================
        // SUBSCRIBE ADMIN FOR PUSH NOTIFICATIONS
        // ================================================

        await subscribeAdminToPushNotifications();

        console.log(
          "Redirecting to /admin..."
        );

        window.location.href =
          "/admin";
      } else {
        setError(
          data.message ||
            "Invalid authentication credentials."
        );
      }
    } catch (error) {
      console.error(error);

      setError(
        "Network pipeline exception. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // PAGE UI
  // ======================================================

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 relative overflow-hidden">

      {/* Visual Background Elements */}

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">

        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-indigo-100 blur-3xl" />

        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-50 blur-3xl" />

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

        {/* Login Form */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Username */}

          <div>

            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
              Operator Username
            </label>

            <input
              type="text"
              placeholder="Enter unique identity token"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
              required
            />

          </div>

          {/* Password */}

          <div>

            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
              Security Passcode
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter validation key"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-14 text-sm font-mono font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-indigo-600 hover:text-indigo-800 font-bold tracking-wide transition"
              >
                {showPassword
                  ? "HIDE"
                  : "SHOW"}
              </button>

            </div>

          </div>

          {/* Error */}

          {error && (

            <div className="bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold rounded-xl px-4 py-3 leading-relaxed">

              ⚠️ {error}

            </div>

          )}

          {/* Forgot Password */}

          <div className="flex justify-end">

            <Link
              href="/admin/forgot-password"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 hover:underline transition"
            >
              Forgot Password?
            </Link>

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-indigo-700 disabled:bg-slate-300 text-white py-3.5 rounded-xl font-bold transition shadow-sm text-sm tracking-wide mt-2"
          >

            {loading
              ? "Authenticating Session..."
              : "Initialize Dashboard Access"}

          </button>

        </form>

      </div>

    </div>
  );
}