"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-10 py-3 bg-[#071a52]/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
          src="/logo.png"
          alt="RC Tours & Travels"
          width={180}
          height={80}
          style={{ width: "auto", height: "80px" }}
          />

          <div>
            <h1 className="font-extrabold text-lg md:text-xl text-white/80 whitespace-nowrap">
              RC TOURS & TRAVELS
            </h1>

            <p className="text-orange-400 text-xs md:text-sm">
              Your Journey, Our Responsibility
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 text-base font-medium text-white">

          <a href="/" className="hover:text-cyan-400">
            Home
          </a>

          <a href="/about" className="hover:text-cyan-400">
            About
          </a>

          <a href="/services" className="hover:text-cyan-400">
          Services
          </a>

          <a href="/fleet" className="hover:text-cyan-400">
            Fleet
          </a>

          <a href="/tour-packages" className="hover:text-cyan-400">
            Tour Packages
          </a>

          <a href="/blog" className="hover:text-cyan-400">
            Blog
          </a>

          <a href="/contact" className="hover:text-cyan-400">
            Contact
          </a>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-slate-950 z-[60] transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >

        <div className="flex justify-between items-center p-5 border-b border-white/10">

          <h2 className="text-white font-bold text-xl">
            Menu
          </h2>

          <button
            onClick={() => setIsOpen(false)}
            className="text-white"
          >
            <X size={28} />
          </button>

        </div>

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

          <a
            href="https://wa.me/919172271464"
            className="bg-green-500 text-center py-3 rounded-xl font-bold"
          >
            WhatsApp Booking
          </a>

          <a
            href="tel:+919172271464"
            className="bg-cyan-500 text-center py-3 rounded-xl font-bold"
          >
            Call Now
          </a>

        </div>

      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 z-50"
        />
      )}
    </>
  );
}