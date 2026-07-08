"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: "📊",
    },
    {
      name: "Bookings",
      href: "/admin/bookings",
      icon: "🚖",
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: "💳",
    },
    {
      name: "Drivers",
      href: "/admin/drivers",
      icon: "👨‍✈️",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: "📈",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen bg-black text-white shadow-xl hidden md:block">
          <div className="p-6 border-b border-gray-800">
            <h1 className="text-2xl font-bold text-yellow-400">
              🚖 RC Admin
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Tours & Travels
            </p>
          </div>

          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  pathname === item.href
                    ? "bg-yellow-400 text-black font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b px-4 md:px-6 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="font-semibold text-base md:text-lg text-center md:text-left">
                RC Tours & Travels Admin Panel
              </h2>

              <div className="flex justify-center md:justify-end">
                <div className="flex items-center gap-2">
                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                System Active
              </div>

            <button
            onClick={async () => {
            await fetch("/api/logout", {
            method: "POST",
            });

            window.location.href = "/admin/login";
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm font-medium"
            >
            Logout
            </button>
            </div>
              </div>
            </div>
          </header>

          {/* Mobile Menu */}
          <div className="md:hidden bg-black text-white p-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                    pathname === item.href
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-800"
                  }`}
                >
                  {item.icon} {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Page Content */}
          <main className="p-4 pt-6 md:p-8 md:pt-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}