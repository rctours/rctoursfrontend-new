"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/admin/login" ||
    pathname === "/admin/reset-password";

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const notificationRef = useRef(null);

  // AUTO LOGOUT AFTER 30 MINUTES
  useEffect(() => {
    if (isAuthPage) return;

    let logoutTimer;

    const logout = async () => {
      try {
        await fetch("/api/logout", {
          method: "POST",
        });

        window.location.href = "/admin/login";
      } catch (error) {
        console.log(error);
      }
    };

    const resetTimer = () => {
      clearTimeout(logoutTimer);

      logoutTimer = setTimeout(() => {
        logout();
      }, 30 * 60 * 1000);
    };

    const events = [
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
      "touchstart",
    ];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    resetTimer();

    return () => {
      clearTimeout(logoutTimer);

      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [isAuthPage]);

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
      name: "Vehicles",
      href: "/admin/vehicles",
      icon: "🚗",
    },
    {
      name: "Customers",
      href: "/admin/customers",
      icon: "👥",
    },
    {
      name: "Blogs",
      href: "/admin/blogs",
      icon: "📝",
    },
    {
      name: "Tours",
      href: "/admin/tour-packages",
      icon: "🌍",
    },
    {
    name: "Campaigns",
    href: "/admin/campaigns",
    icon: "📢",
    },
    {
      name: "Reports",
      href: "/admin/reports",
      icon: "📈",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: "⚙️",
    },
    {
      name: "Profile",
      href: "/admin/profile",
      icon: "👤",
    },
  ];

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);

      const res = await fetch("/api/admin/notifications");
      const data = await res.json();

      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Notification Error:", error);
    } finally {
      setLoadingNotifications(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      const res = await fetch("/api/admin/notifications/read-all", {
        method: "PUT",
      });

      const data = await res.json();

      if (data.success) {
        fetchNotifications();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!isAuthPage) {
      fetchNotifications();
    }
  }, [isAuthPage]);

useEffect(() => {
  function handleClickOutside(event) {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  }

  if (showNotifications) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showNotifications]);

  if (isAuthPage) {
    return children;
  }
  const handleLogout = async () => {
  await fetch("/api/logout", {
    method: "POST",
  });

  window.location.href = "/admin/login";
};

return (
  <div className="min-h-screen bg-slate-50">
    <div className="flex">

      {/* SIDEBAR */}
      <aside
        className="
          hidden md:block
          w-64
          min-h-screen
          bg-slate-950
          text-white
        "
      >
        <div className="p-5 border-b border-slate-800">
          <h1 className="text-lg font-black">
            🚖 RC Admin
          </h1>

          <p className="text-xs text-slate-500">
            Tours & Travels
          </p>
        </div>

        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3
                  px-3 py-2.5
                  rounded-lg
                  text-sm
                  font-bold
                  ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-900"
                  }
                `}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1">

        <header
          className="
            sticky
            top-0
            z-50
            bg-white
            border-b
            px-5
            py-3
            flex
            justify-between
            items-center
          "
        >
          <div className="flex items-center gap-4">
            <h2 className="font-black">
              RC Control Panel
            </h2>
          </div>

          <div className="relative flex items-center gap-4">

            {/* Notification Bell */}
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);

                if (!showNotifications) {
                  fetchNotifications();
                }
              }}
              className="
                relative
                text-2xl
                hover:scale-110
                transition
              "
            >
              🔔

              {unreadCount > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-red-600
                    text-white
                    text-[10px]
                    rounded-full
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    font-bold
                  "
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div
              ref={notificationRef}
                className="
                  absolute
                  right-16
                  top-14
                  w-80
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  z-50
                  overflow-hidden
                "
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-black text-lg">
                    🔔 Notifications
                  </h3>
                </div>

                {loadingNotifications ? (
                  <div className="p-6 text-center text-gray-500">
                    Loading...
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No notifications found
                  </div>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="
                        p-4
                        border-b
                        hover:bg-slate-50
                        cursor-pointer
                      "
                    >
                      <h4 className="font-bold text-sm">
                        {item.title}
                      </h4>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.message}
                      </p>
                    </div>
                  ))
                )}
                                <div className="p-3">
                  <button
                    onClick={markAllAsRead}
                    className="
                      w-full
                      bg-indigo-600
                      hover:bg-indigo-700
                      text-white
                      rounded-lg
                      py-2
                      text-sm
                      font-bold
                    "
                  >
                    Mark All as Read
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="
                bg-red-600
                hover:bg-red-700
                text-white
                px-4
                py-2
                rounded-lg
                text-xs
                font-bold
              "
            >
              🚪 Logout
            </button>

          </div>
        </header>

        <main className="p-4 md:p-6">
          {children}
        </main>

      </div>
    </div>
  </div>
);
}