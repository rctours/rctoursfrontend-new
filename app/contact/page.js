
import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title: "Contact RC Tours & Travels Nagpur | Taxi Booking & Tour Packages",
  description:
    "Contact RC Tours & Travels Nagpur for local taxi, airport taxi, outstation cab booking, tour packages and Tempo Traveller rental. Call 9172271464.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Contact RC Tours & Travels
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            Book Local Taxi, Airport Transfer, Outstation Cab,
            Tour Packages, Tempo Traveller and Urbania Rental in Nagpur.
          </p>

        </div>
      </section>

      {/* Contact Cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-4">📞</div>

            <h2 className="text-2xl font-bold mb-4">
              Call Us
            </h2>

            <p className="text-gray-600 mb-4">
              Available 24×7 for booking assistance
            </p>

            <a
              href="tel:9172271464"
              className="text-blue-600 font-bold text-lg"
            >
              9172271464
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-4">💬</div>

            <h2 className="text-2xl font-bold mb-4">
              WhatsApp
            </h2>

            <p className="text-gray-600 mb-4">
              Get instant fare and booking support
            </p>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-bold text-lg"
            >
              Chat on WhatsApp
            </a>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
            <div className="text-5xl mb-4">📍</div>

            <h2 className="text-2xl font-bold mb-4">
              Address
            </h2>

            <p className="text-gray-600">
              New Narsala Rd, Beldar Nagar,
              Dighori, Nagpur,
              Maharashtra 440034
            </p>
          </div>

        </div>

      </section>

      {/* About Contact */}
      <section className="max-w-6xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-3xl shadow-xl p-10">

          <h2 className="text-4xl font-black mb-6">
            Why Contact RC Tours & Travels?
          </h2>

          <p className="text-lg text-gray-700 leading-8 mb-6">
            RC Tours & Travels is one of the trusted taxi service providers
            in Nagpur. We provide airport taxi service, local cab booking,
            outstation taxi service, corporate travel solutions, Tempo
            Traveller rental and tour packages across Maharashtra and nearby states.
          </p>

          <p className="text-lg text-gray-700 leading-8">
            Whether you need a cab for Pune, Mumbai, Hyderabad, Tadoba,
            Pench, Chikhaldara, Shirdi, Nashik or local travel within Nagpur,
            our team is available to assist you with instant booking support.
          </p>

        </div>

      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-4xl font-black text-center mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            ✈️ Airport Taxi
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🚖 Local Taxi Service
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🛣️ Outstation Cab
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🚌 Tempo Traveller
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🚐 Urbania Rental
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🌄 Tour Packages
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🏢 Corporate Travel
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            🚉 Railway Pickup & Drop
          </div>

        </div>

      </section>

      {/* Google Map */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-black text-center mb-10">
          Our Location
        </h2>

        <div className="rounded-3xl overflow-hidden shadow-xl">

          <iframe
            src="https://www.google.com/maps?q=New+Narsala+Road+Beldar+Nagar+Dighori+Nagpur&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />

        </div>

        <div className="text-center mt-8">
    <a
    href="https://maps.google.com/?q=RC+Tours+%26+Travels+Nagpur"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold inline-block"
    >
    📍 Get Directions
    </a>
    </div>

      </section>

      {/* CTA */}
      <section className="pb-20 px-6">

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white">

          <h2 className="text-4xl font-black mb-4">
            Need a Taxi Right Now?
          </h2>

          <p className="text-xl mb-8">
            Call or WhatsApp us for instant booking.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="tel:9172271464"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold"
            >
              💬 WhatsApp Booking
            </a>

          </div>

        </div>

      </section>

      {/* Footer */}
<footer
  className="border-t border-white/10 py-10 relative overflow-hidden"
>

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/footer-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

    <div className="grid md:grid-cols-4 gap-10">

      {/* Company */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          RC Tours & Travels
        </h3>

        <p className="text-gray-200">
          Premium Taxi Service In Nagpur For Airport Transfers,
          Local Rentals, Outstation Trips And Tour Packages.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Quick Links
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li><a href="/">Home</a></li>
          <li><a href="/fleet">Fleet</a></li>
          <li><a href="/tour-packages">Tour Packages</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Services
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li>Airport Transfer</li>
          <li>Local Rental</li>
          <li>Outstation Taxi</li>
          <li>Corporate Cab</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Contact Us
        </h3>

        <ul className="space-y-3 text-gray-200">
          <li>📞 +91 9172271464</li>
          <li>📍 Nagpur, Maharashtra</li>
          <li>✉️ info@rctoursandtravels.in</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-200">
      © 2026 RC Tours & Travels. All Rights Reserved.
      Designed by Rupesh Chavhan
    </div>

  </div>

</footer>

{/* Floating Call Button */}
<div className="fixed bottom-6 right-0 z-50 flex flex-col items-center gap-1">

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl"
  >
    📞
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-4xl"
  >
    <FaWhatsapp />
  </a>

  {/* Discount Badge */}
  <div className="bg-green-500 text-white px-3 py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

    </div>

  );
}