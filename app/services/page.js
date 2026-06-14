import { FaWhatsapp } from "react-icons/fa";

export const metadata = {
  title:
    "Taxi Services In Nagpur | Airport Taxi, Outstation Cab | RC Tours & Travels",

  description:
    "Book airport taxi, local cab booking, outstation taxi, Tempo Traveller rental and corporate travel services in Nagpur. Call RC Tours & Travels at +91 9172271464.",

  keywords:
    "Taxi Service Nagpur, Airport Taxi Nagpur, Cab Booking Nagpur, Outstation Taxi Nagpur, Tempo Traveller Nagpur, Nagpur To Pune Taxi, Nagpur To Hyderabad Taxi, RC Tours And Travels",
};

export default function ServicesPage() {
  return (
    <main className="bg-white">

      {/* Hero Section */}
<section className="bg-white pt-24 md:pt-32 pb-12 md:pb-24">
  <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">

    <span className="bg-blue-100 text-blue-700 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
      RC TOURS & TRAVELS NAGPUR
    </span>

    <h1 className="text-3xl md:text-7xl font-black text-slate-900 mt-5 md:mt-8 leading-tight">
      Taxi Services In Nagpur
    </h1>

    <p className="max-w-4xl mx-auto text-base md:text-xl text-gray-600 mt-5 md:mt-8 leading-7 md:leading-9 px-2">
      Airport Taxi, Local Cab Booking, Outstation Taxi, Corporate Travel,
      Tempo Traveller Rental and Tour Packages from Nagpur.
    </p>

    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mt-8 md:mt-10">

      <a
        href="tel:+919172271464"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-sm md:text-base"
      >
        📞 Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-2xl font-bold text-sm md:text-base"
      >
        💬 WhatsApp Booking
      </a>

    </div>

  </div>
</section>

      {/* Services */}
<section className="border-t border-slate-200 py-8 md:py-10 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-3xl md:text-5xl font-black text-center text-slate-900 mb-8 md:mb-16">
      Our Taxi Services
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8">

      {/* Airport Taxi */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/airport-taxi.jpeg"
          alt="Airport Taxi Service Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Airport Taxi Service
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Reliable airport pickup and drop taxi service in Nagpur with
            professional drivers and clean vehicles.
          </p>
        </div>
      </div>

      {/* Local Cab */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/local-cab.jpg"
          alt="Local Cab Booking Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Local Cab Booking
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Affordable local taxi services for city travel, shopping,
            meetings and daily transportation.
          </p>
        </div>
      </div>

      {/* Outstation Taxi */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/outstation-taxi.jpeg"
          alt="Outstation Taxi Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Outstation Taxi
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Comfortable outstation taxi service from Nagpur to Pune,
            Mumbai, Hyderabad, Indore and more cities.
          </p>
        </div>
      </div>

      {/* Corporate Travel */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/corporate-travel.png"
          alt="Corporate Travel Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Corporate Travel
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Professional transportation solutions for companies,
            business meetings and corporate events.
          </p>
        </div>
      </div>

      {/* Tempo Traveller */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/tempo-traveller.png"
          alt="Tempo Traveller Rental Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Tempo Traveller Rental
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Comfortable Tempo Traveller rental for family tours,
            group travel and pilgrimage trips.
          </p>
        </div>
      </div>

      {/* Tour Packages */}
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden border">
        <img
          src="/services/tour-packages.jpg"
          alt="Tour Packages Nagpur"
          className="w-full h-44 md:h-56 object-cover"
        />

        <div className="p-5 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
            Tour Packages
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-7 md:leading-8">
            Customized tour packages for Pench, Tadoba,
            Chikhaldara, Shirdi, Goa and more.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>

            {/* Vehicles Available */}

<section className="border-t border-slate-200 py-8 md:py-10">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-6 md:mb-10">
      Vehicles Available
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

      {[
        "Swift Dzire",
        "Maruti Ertiga",
        "Toyota Innova Crysta",
        "Tempo Traveller",
      ].map((car) => (
        <div
          key={car}
          className="bg-slate-100 rounded-2xl p-3 md:p-5 text-center border text-sm md:text-base font-semibold"
        >
          {car}
        </div>
      ))}

    </div>

  </div>

</section>

      {/* Why Choose Us */}

<section className="border-t border-white/10 py-8 md:py-10 relative overflow-hidden">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-5xl font-black text-center text-slate-900 mb-8 md:mb-16 leading-tight">
      Why Choose RC Tours & Travels
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

      <div className="bg-white p-4 md:p-8 rounded-3xl text-center border shadow-lg">
        <div className="text-3xl md:text-5xl mb-2 md:mb-4">🚖</div>

        <h3 className="font-bold text-sm md:text-xl">
          Professional Drivers
        </h3>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-3xl text-center border shadow-lg">
        <div className="text-3xl md:text-5xl mb-2 md:mb-4">💰</div>

        <h3 className="font-bold text-sm md:text-xl">
          Transparent Pricing
        </h3>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-3xl text-center border shadow-lg">
        <div className="text-3xl md:text-5xl mb-2 md:mb-4">🛡️</div>

        <h3 className="font-bold text-sm md:text-xl">
          Safe Journey
        </h3>
      </div>

      <div className="bg-white p-4 md:p-8 rounded-3xl text-center border shadow-lg">
        <div className="text-3xl md:text-5xl mb-2 md:mb-4">📞</div>

        <h3 className="font-bold text-sm md:text-xl">
          24×7 Support
        </h3>
      </div>

    </div>

  </div>

</section>

      {/* Popular Routes */}
      <section className="border-t border-white/10 py-8 md:py-10 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 md:px-8">

      <h2 className="text-2xl md:text-5xl font-black text-center text-slate-900 mb-8 md:mb-16 leading-tight">
      Popular Routes From Nagpur
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

      {[
        "Nagpur → Pench",
        "Nagpur → Tadoba",
        "Nagpur → Chikhaldara",
        "Nagpur → Shirdi",
        "Nagpur → Hyderabad",
        "Nagpur → Pune",
        "Nagpur → Mumbai",
        "Nagpur → Goa",
        "Nagpur → Bhopal",
        "Nagpur → Indore",
        "Nagpur → Raipur",
        "Nagpur → Jabalpur",
      ].map((route) => (
        <div
          key={route}
          className="bg-slate-100 rounded-2xl p-3 md:p-5 text-center border text-xs md:text-base"
        >
          {route}
        </div>
      ))}

    </div>

  </div>

</section>

{/* Service Areas */}

<section className="border-t border-slate-200 py-8 md:py-10">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-4 md:mb-6 leading-tight">
      Taxi Service Available Across Nagpur & Nearby Areas
    </h2>

    <p className="text-center text-gray-600 max-w-4xl mx-auto mb-8 md:mb-10 text-sm md:text-base leading-7 md:leading-8">
      RC Tours & Travels provides airport taxi, local cab booking,
      outstation taxi and Tempo Traveller services across Nagpur city,
      MIHAN, Hingna, Wardha Road, Besa, Manewada, Dighori, Narsala,
      Kamptee, Wadi, Butibori, Ramtek and nearby locations.
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

      {[
        "Nagpur City",
        "Sitabuldi",
        "Dharampeth",
        "Ramdaspeth",
        "Sadar",
        "Civil Lines",
        "Wardha Road",
        "Airport Area",
        "Manish Nagar",
        "Pratap Nagar",
        "Trimurti Nagar",
        "Laxmi Nagar",
        "Bajaj Nagar",
        "Hingna",
        "MIDC Hingna",
        "MIHAN",
        "Besa",
        "Manewada",
        "Dighori",
        "Narsala",
        "Hudkeshwar",
        "Kamptee",
        "Koradi",
        "Katol Road",
        "Amravati Road",
        "Wadi",
        "Friends Colony",
        "Jaripatka",
        "Pardi",
        "Kalamna",
        "Nandanvan",
        "Medical Square",
        "Mahal",
        "Itwari",
        "Gittikhadan",
        "Zingabai Takli",
        "Pachpaoli",
        "Mankapur",
        "Omkar Nagar",
        "Narendra Nagar",
        "Wardhaman Nagar",
        "Ajni",
        "Chhatrapati Square",
        "Shankar Nagar",
        "Beltarodi",
        "Pipla",
        "Butibori",
        "Umred Road",
        "Ramtek",
        "Savner",
        "Kuhi",
        "Bhandara Road"
      ].map((area) => (
        <div
          key={area}
          className="bg-slate-100 rounded-xl p-3 md:p-4 text-center border hover:shadow-lg transition text-xs md:text-base"
        >
          {area}
        </div>
      ))}

    </div>

  </div>

</section>

{/* FAQ Section */}

<section className="border-t border-slate-200 py-8 md:py-10">

  <div className="max-w-5xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-4xl font-black text-center text-slate-900 mb-8 md:mb-10 leading-tight">
      Frequently Asked Questions
    </h2>

    <div className="space-y-3 md:space-y-5">

      <div className="bg-slate-100 p-4 md:p-6 rounded-2xl">
        <h3 className="font-bold text-base md:text-xl mb-2">
          What is the taxi fare from Nagpur Airport?
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          Taxi fare depends on pickup and drop location. Contact RC Tours &
          Travels for an instant fare quote.
        </p>
      </div>

      <div className="bg-slate-100 p-4 md:p-6 rounded-2xl">
        <h3 className="font-bold text-base md:text-xl mb-2">
          Do you provide outstation taxi service from Nagpur?
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          Yes, we provide outstation taxi service from Nagpur to Pune,
          Mumbai, Hyderabad, Indore, Bhopal, Shirdi and many more destinations.
        </p>
      </div>

      <div className="bg-slate-100 p-4 md:p-6 rounded-2xl">
        <h3 className="font-bold text-base md:text-xl mb-2">
          Is Tempo Traveller available in Nagpur?
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          Yes, we provide Tempo Traveller rental for family trips,
          corporate tours, pilgrimages and group travel.
        </p>
      </div>

      <div className="bg-slate-100 p-4 md:p-6 rounded-2xl">
        <h3 className="font-bold text-base md:text-xl mb-2">
          Do you offer one-way taxi service?
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          Yes, one-way and round-trip taxi services are available for
          local and outstation routes.
        </p>
      </div>

      <div className="bg-slate-100 p-4 md:p-6 rounded-2xl">
        <h3 className="font-bold text-base md:text-xl mb-2">
          How can I book a taxi in Nagpur?
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          You can call us directly at +91 9172271464 or book through WhatsApp.
        </p>
      </div>

    </div>

  </div>

</section>

{/* Contact Information */}

<section className="border-t border-slate-200 py-6 md:py-12">

  <div className="max-w-6xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-5xl font-black text-center text-slate-900 mb-3 md:mb-4 leading-tight">
      Contact RC Tours & Travels
    </h2>

    <p className="text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-6 md:mb-12 leading-6 md:leading-7">
      Looking for Airport Taxi, Local Cab, Outstation Taxi or Tempo Traveller
      in Nagpur? Contact our team today for instant booking and fare details.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-5xl mx-auto">

      {/* Call */}
      <div className="bg-white border shadow-lg rounded-3xl p-4 md:p-8 text-center">

        <div className="text-4xl md:text-5xl mb-2 md:mb-4">
          📞
        </div>

        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
          Call Us
        </h3>

        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
          Quick booking and fare information.
        </p>

        <a
          href="tel:+919172271464"
          className="text-blue-600 font-bold text-base md:text-lg break-all"
        >
          +91 9172271464
        </a>

      </div>

      {/* WhatsApp */}
      <div className="bg-white border shadow-lg rounded-3xl p-4 md:p-8 text-center">

        <div className="text-4xl md:text-5xl mb-2 md:mb-4">
          💬
        </div>

        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
          WhatsApp Booking
        </h3>

        <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
          Instant response for taxi booking.
        </p>

        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 font-bold text-base md:text-lg"
        >
          Chat On WhatsApp
        </a>

      </div>

      {/* Location */}
      <div className="bg-white border shadow-lg rounded-3xl p-4 md:p-8 text-center">

        <div className="text-4xl md:text-5xl mb-2 md:mb-4">
          📍
        </div>

        <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3">
          Our Location
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
          New Narsala Rd, Beldar Nagar,
          Dighori, Nagpur,
          Maharashtra 440034
        </p>

      </div>

    </div>

    <div className="mt-6 md:mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-3xl p-4 md:p-10 text-center shadow-xl">

      <p className="max-w-3xl mx-auto text-sm md:text-lg leading-6 md:leading-8">
        Airport Pickup & Drop • Local Cab Service • Outstation Taxi •
        Tempo Traveller • Corporate Travel • Tour Packages
      </p>

    </div>

  </div>

</section>

      {/* SEO Content */}
<section className="border-t border-white/10 py-8 md:py-10 relative overflow-hidden">

  <div className="max-w-6xl mx-auto px-4 md:px-8">

    <h2 className="text-2xl md:text-5xl font-black text-center text-slate-900 mb-8 md:mb-12 leading-tight">
      Best Taxi Service In Nagpur
    </h2>

    <div className="bg-white rounded-3xl shadow-xl p-5 md:p-10">

      <p className="text-sm md:text-lg text-gray-600 leading-7 md:leading-9 mb-5 md:mb-6">
        RC Tours & Travels is a trusted taxi service provider in Nagpur
        offering airport taxi, local cab booking, outstation taxi,
        corporate travel and Tempo Traveller rental services.
      </p>

      <p className="text-sm md:text-lg text-gray-600 leading-7 md:leading-9 mb-5 md:mb-6">
        We provide transportation services from Nagpur to Pench,
        Tadoba, Chikhaldara, Wardha, Amravati, Pune, Mumbai,
        Hyderabad, Indore, Bhopal, Shirdi and many other destinations.
      </p>

      <p className="text-sm md:text-lg text-gray-600 leading-7 md:leading-9">
        Our focus is on customer satisfaction, clean vehicles,
        experienced drivers, transparent pricing and safe travel.
        Whether you need a local cab or an outstation taxi,
        RC Tours & Travels is ready to serve you.
      </p>

    </div>

  </div>

</section>

{/* CTA */}
<section className="border-t border-white/10 py-8 md:py-10 relative overflow-hidden">

  <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">

    <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 leading-tight">
      Need A Taxi In Nagpur?
      <br />
      Call RC Tours & Travels Now
    </h2>

    <p className="text-base md:text-xl mb-8 md:mb-10 leading-7">
      24×7 Airport Taxi • Outstation Cab • Tempo Traveller Booking
    </p>

    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">

      <a
        href="tel:+919172271464"
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base"
      >
        📞 Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold text-sm md:text-base"
      >
        💬 WhatsApp Booking
      </a>

    </div>

  </div>

</section>

{/* Footer */}

<footer className="border-t border-white/10 py-3 md:py-6 relative overflow-hidden">

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/footer-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-3 md:px-10">

    <div className="grid md:grid-cols-4 gap-4 md:gap-12 lg:gap-16">

      {/* Company */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          RC Tours & Travels
        </h3>

        <p className="text-gray-200 leading-6 md:leading-8">
          Premium Taxi Service In Nagpur For Airport Transfers,
          Local Rentals, Outstation Trips And Tour Packages.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Quick Links
        </h3>

        <ul className="space-y-1 md:space-y-2 text-gray-200">
          <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
          <li><a href="/about" className="hover:text-cyan-400 transition">About</a></li>
          <li><a href="/fleet" className="hover:text-cyan-400 transition">Fleet</a></li>
          <li><a href="/tour-packages" className="hover:text-cyan-400 transition">Tour Packages</a></li>
          <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Services
        </h3>

        <ul className="space-y-1 md:space-y-2 text-gray-200">
          <li>Airport Transfer</li>
          <li>Local Rental</li>
          <li>Outstation Taxi</li>
          <li>Corporate Cab</li>
          <li>Tempo Traveller</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Contact Us
        </h3>

        <ul className="space-y-1 md:space-y-3 text-gray-200">
          <li>📞 +91 9172271464</li>
          <li>📍 Nagpur, Maharashtra</li>
          <li>✉️ info@rctoursandtravels.in</li>
          <li>🕒 24×7 Available</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white/10 mt-5 md:mt-12 pt-4 md:pt-8 text-center text-gray-300">

      <p>
        © 2026 RC Tours & Travels. All Rights Reserved.
      </p>

      <p className="mt-1 text-sm text-gray-400">
        Designed By Rupesh Chavhan
      </p>

    </div>

  </div>

</footer>

{/* Floating Buttons */}
<div className="fixed bottom-4 md:bottom-6 right-2 md:right-0 z-50 flex flex-col items-center gap-1">

  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl"
  >
    📞
  </a>

  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl md:text-4xl"
  >
    <FaWhatsapp />
  </a>

  <div className="bg-green-500 text-white px-2 md:px-3 py-1.5 md:py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

</main>
  );
}