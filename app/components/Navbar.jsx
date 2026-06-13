"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl">

        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4 lg:px-8 py-2">

          {/* Logo */}
          <a href="/" className="flex items-center gap-3">

            <div className="bg-white rounded-full p-2 shadow-xl">

              <Image
              src="/logo.png"
              alt="RC Tours & Travels"
              width={55}
              height={55}
              className="rounded-full object-contain"
              />

            </div>

            <div>

              <h1 className="font-black text-white text-sm md:text-2xl leading-tight">
                RC TOURS & TRAVELS
              </h1>

              <p className="text-cyan-400 text-[11px] md:text-sm">
                Your Journey, Our Responsibility
              </p>

            </div>

          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-white font-semibold">

            <a href="/" className="hover:text-cyan-400 transition">
              Home
            </a>

            <a href="/about" className="hover:text-cyan-400 transition">
              About
            </a>

            <a href="/services" className="hover:text-cyan-400 transition">
              Services
            </a>

            <a href="/fleet" className="hover:text-cyan-400 transition">
              Fleet
            </a>

            <a href="/tour-packages" className="hover:text-cyan-400 transition">
              Tour Packages
            </a>

            <a href="/blog" className="hover:text-cyan-400 transition">
              Blog
            </a>

            <a href="/contact" className="hover:text-cyan-400 transition">
              Contact
            </a>

          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">

            <a
              href="tel:+919172271464"
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-5 py-3 rounded-full text-white font-bold transition"
            >
              <Phone size={18} />
              Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-full text-white font-bold transition"
            >
              <MessageCircle size={18} />
              WhatsApp
            </a>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden text-white"
          >
            <Menu size={34} />
          </button>

        </div>

      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-[85%] max-w-[320px] bg-slate-950 z-[80] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">

          <div className="flex items-center gap-3">

            <div className="bg-white rounded-full p-2">

              <Image
                src="/logo.png"
                alt="RC Tours & Travels"
                width={55}
                height={55}
              />

            </div>

            <div>

              <h2 className="text-white font-bold">
                RC Tours & Travels
              </h2>

              <p className="text-cyan-400 text-xs">
                Premium Taxi Service
              </p>

            </div>

          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
          >
            <X size={30} />
          </button>

        </div>

        {/* Menu */}
        <div className="flex flex-col p-6 gap-5 text-white text-lg">

          <a href="/" onClick={() => setIsOpen(false)}>
            Home
          </a>

          <a href="/about" onClick={() => setIsOpen(false)}>
            About
          </a>

          <a href="/services" onClick={() => setIsOpen(false)}>
            Services
          </a>

          <a href="/fleet" onClick={() => setIsOpen(false)}>
            Fleet
          </a>

          <a href="/tour-packages" onClick={() => setIsOpen(false)}>
            Tour Packages
          </a>

          <a href="/blog" onClick={() => setIsOpen(false)}>
            Blog
          </a>

          <a href="/contact" onClick={() => setIsOpen(false)}>
            Contact
          </a>

          <div className="border-t border-white/10 pt-5 mt-3">

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-500 text-center py-3 rounded-xl font-bold mb-3"
            >
              WhatsApp Booking
            </a>

            <a
              href="tel:+919172271464"
              className="block bg-cyan-500 text-center py-3 rounded-xl font-bold"
            >
              Call Now
            </a>

          </div>

        </div>

      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 z-[70]"
        />
      )}
    </>
  );
}