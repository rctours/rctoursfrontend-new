"use client";

import Link from "next/link";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white">

{/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110"
  style={{
    backgroundImage: "url('/footer-bg.png')",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  }}
></div>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-[#08153f]/35"></div>

{/* Purple/Blue Overlay */}
<div
  className="absolute inset-0"
  style={{
    background:
      "linear-gradient(90deg, rgba(20,18,85,0.78) 0%, rgba(38,35,120,0.60) 45%, rgba(18,23,90,0.78) 100%)",
  }}
></div>

{/* Soft Glow */}
<div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at center, rgba(110,90,255,0.18), transparent 65%)",
  }}
></div>

      {/* Content - Compact height and optimized mobile/desktop responsive padding */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">

          {/* Company Column */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-black">
              RC{" "}
              <span className="text-cyan-400">
                Tours & Travels
              </span>
            </h2>

            <p className="mt-2.5 text-xs md:text-sm text-gray-200 leading-relaxed max-w-md">
              Premium Taxi Service in Nagpur providing Airport Transfer,
              Local Rental, One Way Taxi, Outstation Trips,
              Tour Packages and Tempo Traveller Booking
              with professional drivers and transparent pricing.
            </p>

            {/* Social Icons with brand/colored circular button styles */}
            <div className="flex justify-center sm:justify-start gap-3 mt-4">
              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-white text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaWhatsapp size={18} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="w-9 h-9 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-md"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-cyan-300 sm:text-white">
              Quick Links
            </h3>

            <ul className="space-y-2 text-xs md:text-sm text-gray-200">
              <li>
                <Link href="/" className="hover:text-cyan-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-300 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-cyan-300 transition">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className="hover:text-cyan-300 transition">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-300 transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-cyan-300 sm:text-white">
              Our Services
            </h3>

            <ul className="space-y-2 text-xs md:text-sm text-gray-200">
              <li>Airport Transfer</li>
              <li>Local Rental</li>
              <li>Outstation Taxi</li>
              <li>One Way Taxi</li>
              <li>Tempo Traveller</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold mb-3 text-cyan-300 sm:text-white">
              Contact Us
            </h3>

            <ul className="space-y-2 text-xs md:text-sm text-gray-200">
              <li>
                📞 +91 9172271464
              </li>
              <li>
                ✉️ info@rctoursandtravels.in
              </li>
              <li>
                📍 Nagpur, Maharashtra
              </li>
              <li>
                🕒 24×7 Taxi Service
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-300 text-center sm:text-left">
          <p>
            © 2026 RC Tours & Travels. All Rights Reserved.
          </p>
          <p>
            Designed & Developed by <span className="font-semibold text-cyan-400">Rupesh Chavhan</span>
          </p>
        </div>

      </div>

    </footer>
  );
}