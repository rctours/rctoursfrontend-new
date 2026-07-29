"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [customer, setCustomer] = useState(null);
  const profileRef = useRef(null);

  useEffect(() => {
  const loadCustomer = () => {
    const data = localStorage.getItem("customer");

    if (data) {
      setCustomer(JSON.parse(data));
    } else {
      setCustomer(null);
    }
  };

  // Initial Load
  loadCustomer();

  // Jab page/tab dubara focus ho
  window.addEventListener("focus", loadCustomer);

  return () => {
    window.removeEventListener("focus", loadCustomer);
  };
}, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
    if (
    profileRef.current &&
    !profileRef.current.contains(event.target)
    ) {
    setProfileMenuOpen(false);
    }
  };

    if (profileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("customer");
    setCustomer(null);
    setProfileMenuOpen(false);
    setIsOpen(false);
    window.location.href = "/";
  };

  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">
        <div className="max-w-[1700px] mx-auto flex items-center justify-between px-4 sm:px-8 xl:px-12 h-[82px]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="bg-white rounded-full p-1.5 shadow-xl">
              <Image
                src="/logo.png"
                alt="RC Tours & Travels"
                width={42}
                height={42}
                className="rounded-full object-contain h-auto sm:w-[46px] sm:h-[46px]"
              />
            </div>
            <div>
              <h1 className="font-black text-white text-xs sm:text-sm md:text-[18px] xl:text-[20px] leading-tight">
                RC TOURS & TRAVELS
              </h1>
              <p className="text-cyan-400 text-[9px] sm:text-[10px] md:text-[12px]">
                Your Journey, Our Responsibility
              </p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-white font-semibold text-[15px] xl:text-[16px] ml-auto mr-6 xl:mr-10">
            <Link href="/" className="hover:text-cyan-400 transition">
              Home
            </Link>
            <Link href="/about" className="hover:text-cyan-400 transition">
              About
            </Link>
            <Link href="/services" className="hover:text-cyan-400 transition">
              Services
            </Link>
            <Link href="/fleet" className="hover:text-cyan-400 transition">
              Fleet
            </Link>
            <Link href="/tour-packages" className="hover:text-cyan-400 transition">
              Tour Packages
            </Link>
            <Link href="/blog" className="hover:text-cyan-400 transition">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-cyan-400 transition">
              Contact
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
            <a
              href="tel:+919172271464"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-3.5 xl:px-4 py-2.5 rounded-full text-white text-[14px] xl:text-[15px] font-semibold transition"
            >
              <Phone size={17} />
              Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-3.5 xl:px-4 py-2.5 rounded-full text-white text-[14px] xl:text-[15px] font-semibold transition"
            >
              <MessageCircle size={17} />
              WhatsApp
            </a>

            {customer ? (
              <div
              ref={profileRef}
              className="relative"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileMenuOpen(!profileMenuOpen);
                  }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3.5 py-2 rounded-full text-[15px] font-semibold transition"
                >
                  <span>👤</span>
                  <span className="max-w-[180px] truncate">
                  {customer.gender === "Male"
                  ? `👋 Hi, Mr. ${customer.name}`
                  : customer.gender === "Female"
                  ? `👋 Hi, Ms. ${customer.name}`
                  : `👋 Hi, ${customer.name}`}
                  </span>
                  <span className="text-xs">▼</span>
                </button>

                {profileMenuOpen && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 top-12 z-50 w-52 rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden py-1.5"
                  >
                    <Link
                      href="/my-profile"
                      onClick={() => setProfileMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 text-gray-800 font-medium transition"
                    >
                      👤 My Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-left px-4 py-3 hover:bg-red-50 text-red-600 font-medium transition border-t border-gray-100"
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/profile-login"
                className="bg-white/10 hover:bg-cyan-500 text-white px-4 py-2.5 rounded-full text-[14px] xl:text-[15px] font-semibold transition"
              >
                👤 Customer Profile
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white p-1 hover:bg-white/10 rounded-lg transition"
            aria-label="Open Menu"
          >
            <Menu size={30} />
          </button>

        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-[360px] bg-slate-950 z-[80] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2 shadow-md">
              <Image
                src="/logo.png"
                alt="RC Tours & Travels"
                width={45}
                height={45}
                className="h-auto rounded-full"
              />
            </div>
            <div>
              <h2 className="text-white font-bold text-sm sm:text-base">
                RC Tours & Travels
              </h2>
              <p className="text-cyan-400 text-xs">
                Premium Taxi Service
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition"
            aria-label="Close Menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Menu Items (Scrollable) */}
        <div className="flex flex-col p-5 gap-3 text-white text-base overflow-y-auto flex-grow">
          {customer && (
            <div className="mb-2 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 p-4">
              <p className="text-base font-bold text-white flex items-center gap-1.5">
                👋 Hi, {customer.name}
              </p>
              <p className="text-xs text-cyan-300 mt-1 font-mono">
                {customer.mobile}
              </p>
            </div>
          )}

          <a href="/" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Home</a>
          <a href="/about" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">About</a>
          <a href="/services" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Services</a>
          <a href="/fleet" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Fleet</a>
          <a href="/tour-packages" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Tour Packages</a>
          <a href="/blog" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Blog</a>
          <a href="/contact" onClick={() => setIsOpen(false)} className="py-2 px-3 rounded-xl hover:bg-white/5 transition font-medium">Contact</a>

          {customer ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10 mt-2">
              <a
                href="/my-profile"
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-white/5 text-cyan-400 font-semibold flex items-center gap-2"
              >
                👤 My Profile
              </a>

              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="text-left py-2.5 px-3 rounded-xl hover:bg-red-500/10 text-red-400 font-semibold flex items-center gap-2"
              >
                🚪 Logout
              </button>
            </div>
          ) : (
            <Link
              href="/profile-login"
              onClick={() => setIsOpen(false)}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 text-center py-3.5 rounded-xl font-bold transition shadow-lg flex items-center justify-center gap-2"
            >
              👤 Customer Profile
            </Link>
          )}

          <div className="border-t border-white/10 pt-4 mt-auto">
            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-center py-3.5 rounded-xl font-bold mb-3 transition shadow-md"
            >
              <MessageCircle size={18} />
              WhatsApp Booking
            </a>

            <a
              href="tel:+919172271464"
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-center py-3.5 rounded-xl font-bold transition shadow-md"
            >
              <Phone size={18} />
              Call Now
            </a>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[70] transition-opacity"
        />
      )}
    </>
  );
}