"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import PremiumHero from "@/components/about/PremiumHero";

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About RC Tours & Travels",
  url: "https://www.rctoursandtravels.in/about",
  description:
    "RC Tours & Travels is a trusted taxi service in Nagpur providing airport transfers, local cabs, outstation taxi services, tempo travellers and tour packages.",
};

export default function AboutPage() {

  const [trips, setTrips] = useState(0);
const [customers, setCustomers] = useState(0);

useEffect(() => {
  const tripsInterval = setInterval(() => {
    setTrips((prev) => {
      if (prev >= 5000) {
        clearInterval(tripsInterval);
        return 5000;
      }
      return prev + 50;
    });
  }, 20);

  const customerInterval = setInterval(() => {
    setCustomers((prev) => {
      if (prev >= 1000) {
        clearInterval(customerInterval);
        return 1000;
      }
      return prev + 10;
    });
  }, 20);

  return () => {
    clearInterval(tripsInterval);
    clearInterval(customerInterval);
  };
}, []);

  return (
    <div className="bg-white min-h-screen">

      <Script
      id="about-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
      __html: JSON.stringify(aboutSchema),
      }}
      />
      <PremiumHero />

{/* Our Journey */}

<section className="py-10 md:py-16 bg-gradient-to-b from-white via-slate-50 to-white">
  <div className="max-w-6xl mx-auto px-4 md:px-8">

    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

      <div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
          Our Journey
        </h2>

        <p className="text-slate-600 text-lg leading-9 mb-6">
          RC Tours & Travels started with a simple vision — to provide safe,
          comfortable and reliable taxi services from Nagpur to destinations
          across India.
        </p>

        <p className="text-slate-600 text-lg leading-9 mb-6">
          Over the years, we have successfully completed thousands of trips
          for families, tourists, corporate clients and groups. Our focus has
          always been customer satisfaction, transparent pricing and professional service.
        </p>

        <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9">
          Today, RC Tours & Travels is a trusted name for airport transfers,
          local taxi services, outstation cab booking and tour packages from Nagpur.
        </p>
      </div>

      <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white rounded-[32px] p-8 md:p-10 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Why Customers Trust Us
        </h3>

        <ul className="space-y-4 text-slate-600 text-lg">
          <li>✅ Professional Drivers</li>
          <li>✅ Clean & Sanitized Vehicles</li>
          <li>✅ Transparent Pricing</li>
          <li>✅ 24×7 Customer Support</li>
          <li>✅ GPS Enabled Fleet</li>
          <li>✅ On-Time Pickup & Drop</li>
        </ul>
      </div>

    </div>

  </div>
</section>


<section className="py-4 md:py-8 bg-gradient-to-r from-blue-600 to-cyan-500">
  <div className="max-w-4xl mx-auto px-4 md:px-8 text-center text-white">

    <h2 className="text-xl md:text-3xl font-black leading-tight">
      Trusted By Thousands Of Travelers Across India
    </h2>

    <p className="mt-2 text-xs md:text-lg leading-6">
      Airport Transfers • Corporate Travel • Outstation Tours • Family Trips
    </p>

  </div>
</section>

      {/* Services Section */}
<section className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-14">

  <h2 className="text-3xl md:text-4xl font-black text-slate-900 text-center mb-8 md:mb-12">
    Our Premium Travel Services
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    {/* Airport Transfer */}
    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-4 hover:shadow-2xl transition duration-300">

      <div className="relative h-48 md:h-72">
        <Image
          src="/airport-transfer.jpg"
          alt="Airport Transfer"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-5 md:p-8">
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
          Airport Transfers
        </h3>

        <p className="text-sm md:text-base text-slate-600 leading-7 md:leading-8">
          Hassle-free airport pickup and drop services with professional drivers and comfortable vehicles.
        </p>
      </div>

    </div>

    {/* Corporate Travel */}
    <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-4 hover:shadow-2xl transition duration-300">

      <div className="relative h-48 md:h-72">
        <Image
          src="/corporate-travel.jpg"
          alt="Corporate Travel"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Corporate Travel
        </h3>

        <p className="text-slate-600 leading-8">
          Premium transportation solutions for executives, meetings and business travel.
        </p>
      </div>

    </div>

    {/* Outstation Travel */}
    <div className="bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:-translate-y-4 hover:shadow-2xl transition duration-300">

      <div className="relative h-48 md:h-72">
        <Image
          src="/outstation-travel.jpg"
          alt="Outstation Travel"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-3">
          Outstation Journeys
        </h3>

        <p className="text-slate-600 leading-8">
          Comfortable long-distance taxi services from Nagpur to destinations across India.
        </p>
      </div>

    </div>

  </div>

</section>

{/* Fleet Section */}
<section className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">

  <div className="text-center mb-5">

  <span className="inline-block bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold tracking-wider">
    PREMIUM VEHICLES
  </span>

</div>

  <h2 className="text-3xl md:text-6xl font-black text-center text-slate-900 mb-4 leading-tight">
  🚖 Our Luxury Fleet Collection
</h2>

<p className="text-center text-gray-500 text-lg md:text-xl max-w-3xl mx-auto mb-16 leading-8">
Choose from our professionally maintained fleet for airport transfers,
outstation trips, family vacations and corporate travel.
</p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">

    {/* Swift Dzire */}
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-4 hover:shadow-cyan-500/20 transition duration-300 border border-slate-700 text-white">

      <div className="relative h-44 md:h-60 overflow-hidden">
        <Image
          src="/swift-dzire.jpg"
          alt="Swift Dzire"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-3 md:p-6 text-center">
        <h3 className="text-lg md:text-2xl font-bold">Swift Dzire</h3>
        <p className="text-gray-300 mt-2">4+1 Seater Sedan</p>
        <p className="text-cyan-400 font-semibold mt-2">
          Starting ₹12/KM
        </p>

        <div className="mt-3 text-yellow-400">
        ⭐⭐⭐⭐⭐
        </div>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">

  <span className="bg-green-500/20 text-green-400 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
    AC
  </span>

  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
    GPS
  </span>

  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
    Sanitized
  </span>

  <p className="text-gray-400 text-xs md:text-sm mt-3">
  Comfortable & Safe Journey
</p>

</div>

        <div className="mt-4 flex gap-2 justify-center">

  <a
    href="/book-cab"
    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex-1"
  >
    Book Cab
  </a>

  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition flex-1"
  >
    WhatsApp
  </a>

</div>
      </div>
    </div>

    {/* Ertiga */}
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-4 hover:shadow-cyan-500/20 transition duration-300 border border-slate-700 text-white">

      <div className="relative h-44 md:h-60 overflow-hidden">
        <Image
          src="/ertiga.jpg"
          alt="Ertiga"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-3 md:p-6 text-center">
      <h3 className="text-lg md:text-2xl font-bold">Ertiga</h3>
        <p className="text-gray-300 mt-2">6+1 Seater MPV</p>
        <p className="text-cyan-400 font-semibold mt-2">
          Starting ₹14/KM
        </p>

        <div className="mt-3 text-yellow-400">
  ⭐⭐⭐⭐⭐
</div>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">

  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
    AC
  </span>

  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
    GPS
  </span>

  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
    Sanitized
  </span>

  <p className="text-gray-400 text-xs md:text-sm mt-3">
  Comfortable & Safe Journey
</p>

</div>

        <div className="mt-4 flex gap-2 justify-center">

  <a
    href="/book-cab"
    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex-1"
  >
    Book Cab
  </a>

  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition flex-1"
  >
    WhatsApp
  </a>

</div>
      </div>
    </div>

    {/* Innova Crysta */}
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-4 hover:shadow-cyan-500/20 transition duration-300 border border-slate-700 text-white">

      <div className="relative h-44 md:h-60 overflow-hidden">
        <Image
          src="/innova-crysta.jpg"
          alt="Innova Crysta"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-3 md:p-6 text-center">
        <h3 className="text-lg md:text-2xl font-bold">Innova Crysta</h3>
        <p className="text-gray-300 mt-2">7 Seater Luxury MPV</p>
        <p className="text-cyan-400 font-semibold mt-2">
          Starting ₹18/KM
        </p>

        <div className="mt-3 text-yellow-400">
  ⭐⭐⭐⭐⭐
</div>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">

  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
    AC
  </span>

  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
    GPS
  </span>

  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
    Sanitized
  </span>

  <p className="text-gray-400 text-xs md:text-sm mt-3">
  Comfortable & Safe Journey
</p>

</div>

        <div className="mt-4 flex gap-2 justify-center">

  <a
    href="/book-cab"
    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex-1"
  >
    Book Cab
  </a>

  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
  >
    WhatsApp
  </a>

</div>

      </div>
    </div>

    {/* Tempo Traveller */}
    <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-4 hover:shadow-cyan-500/20 transition duration-300 border border-slate-700 text-white">

      <div className="relative h-44 md:h-60 overflow-hidden">
        <Image
          src="/traveller17.jpg"
          alt="Tempo Traveller"
          fill
          className="object-cover transition duration-700 hover:scale-110"
        />
      </div>

      <div className="p-3 md:p-6 text-center">
        <h3 className="text-lg md:text-2xl font-bold">Tempo Traveller</h3>
        <p className="text-gray-300 mt-2">13 / 17 Seater</p>
        <p className="text-cyan-400 font-semibold mt-2">
          Starting ₹25/KM
        </p>

        <div className="mt-3 text-yellow-400">
  ⭐⭐⭐⭐⭐
</div>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">

  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
    AC
  </span>

  <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">
    GPS
  </span>

  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
    Sanitized
  </span>

  <p className="text-gray-400 text-xs md:text-sm mt-3">
  Comfortable & Safe Journey
</p>

</div>

        <div className="mt-4 flex gap-2 justify-center">

  <a
    href="/book-cab"
    className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-700 transition flex-1"
  >
    Book Cab
  </a>

  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-600 transition"
  >
    WhatsApp
  </a>

</div>

      </div>
    </div>

  </div>

</section>

{/* Premium Gallery */}

<section className="py-8 md:py-14 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-3xl md:text-5xl font-black text-slate-900 text-center mb-3 md:mb-4">
      Our Travel Gallery
    </h2>

    <p className="text-center text-gray-500 text-sm md:text-base mb-6 md:mb-12">
      Real Moments From RC Tours & Travels
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/dzire.png" alt="Swift Dzire" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/ertiga.png" alt="Ertiga" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/innova.png" alt="Innova Crysta" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/traveller.png" alt="Tempo Traveller" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/airport.png" alt="Airport Pickup" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/tour.png" alt="Tour Package" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

    </div>

  </div>
</section>

{/* Popular Routes */}

<section className="relative py-10 md:py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">

  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>

  <div className="relative max-w-7xl mx-auto px-4 md:px-8">

    <div className="text-center mb-10 md:mb-16">

      <span className="bg-blue-500/20 text-blue-400 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold tracking-wider">
        MOST BOOKED DESTINATIONS
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-white mt-5 md:mt-6 leading-tight">
        🚖 Popular Routes From Nagpur
      </h2>

      <p className="text-gray-300 text-base md:text-lg mt-4 md:mt-5 max-w-3xl mx-auto leading-8">
        Explore our most popular tourist, pilgrimage and outstation taxi routes
        with comfortable vehicles and professional drivers.
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">

      {[
        "Nagpur → Pench",
        "Nagpur → Tadoba",
        "Nagpur → Chikhaldara",
        "Nagpur → Ramtek",
        "Nagpur → Wardha",
        "Nagpur → Amravati",
        "Nagpur → Akola",
        "Nagpur → Yavatmal",
        "Nagpur → Chandrapur",
        "Nagpur → Gadchiroli",
        "Nagpur → Bhandara",
        "Nagpur → Gondia",
        "Nagpur → Seoni",
        "Nagpur → Jabalpur",
        "Nagpur → Bhopal",
        "Nagpur → Indore",
        "Nagpur → Hyderabad",
        "Nagpur → Pune",
        "Nagpur → Mumbai",
        "Nagpur → Nashik",
        "Nagpur → Aurangabad",
        "Nagpur → Shirdi",
        "Nagpur → Goa",
        "Nagpur → Raipur",
        "Nagpur → Bilaspur",
        "Nagpur → Prayagraj",
        "Nagpur → Ayodhya",
        "Nagpur → Varanasi",
        "Nagpur → Ujjain",
        "Nagpur → Omkareshwar",
        "Nagpur → Khajuraho",
        "Nagpur → Kanha National",
        "Nagpur → Pachmarhi",
        "Nagpur → Bhilai",
        "Nagpur → Nanded",
        "Nagpur → Lonavala",
        "Nagpur → Mahabaleshwar",
        "Nagpur → Srisailam",
        "Nagpur → Hampi",
      ].map((route) => (
        <div
          key={route}
          className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 text-center text-white text-xs md:text-base font-medium whitespace-nowrap hover:bg-blue-600 hover:border-blue-500 md:hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 cursor-pointer"
        >
          {route}
        </div>
      ))}

    </div>

  </div>

</section>

{/* Service Areas */}

<section className="py-10 md:py-16 bg-gradient-to-b from-slate-50 to-white">

  <div className="max-w-7xl mx-auto px-8">

    <div className="text-center mb-16">

      <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
        WE SERVE ACROSS INDIA
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-slate-900 mt-5 md:mt-6 leading-tight">
        🌍 Our Service Areas
      </h2>

      <p className="text-gray-500 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-8">
        Reliable taxi services across Maharashtra, Madhya Pradesh,
        Telangana and Chhattisgarh with professional drivers and
        well-maintained vehicles.
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">

      {[
        "Nagpur",
        "Pune",
        "Mumbai",
        "Nashik",
        "Aurangabad",
        "Hyderabad",
        "Bhopal",
        "Indore",
        "Raipur",
        "Jabalpur",
      ].map((city) => (
        <div
          key={city}
          className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 min-h-[72px] flex items-center justify-center text-center text-sm md:text-base font-semibold text-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
        >
          📍 {city}
        </div>
      ))}

    </div>

    <div className="mt-10 md:mt-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 md:p-10 text-center text-white shadow-2xl">

      <h3 className="text-2xl md:text-3xl font-black mb-4">
        Need Taxi Service In Another City?
      </h3>

      <p className="text-lg text-white/90 mb-6">
        We provide outstation taxi services from Nagpur to destinations across India.
      </p>

      <a
        href="tel:9172271464"
        className="inline-block bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
      >
        📞 Call Now
      </a>

    </div>

  </div>

</section>

{/* Testimonials */}

<section className="py-10 md:py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <div className="text-center mb-16">

      <span className="bg-yellow-500/20 text-yellow-400 px-5 py-2 rounded-full text-sm font-semibold">
        CUSTOMER REVIEWS
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-white mt-4 md:mt-6 leading-tight">
        What Our Customers Say
      </h2>

      <p className="text-gray-300 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-8">
        Trusted by hundreds of travelers for airport transfers,
        outstation trips and tour packages.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-5 md:gap-8">

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 text-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">

        <div className="text-yellow-400 text-xl md:text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 text-sm md:text-base leading-7 md:leading-8">
          Excellent service. Clean vehicle, polite driver and on-time pickup.
          Our Tadoba trip was smooth and comfortable.
        </p>

        <div className="mt-6">
          <h4 className="font-bold text-base md:text-lg">
            Amit Sharma
          </h4>
          <p className="text-sm text-gray-400">
            Nagpur → Tadoba
          </p>
        </div>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 text-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">

        <div className="text-yellow-400 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 text-sm md:text-base leading-7 md:leading-8">
          Best airport taxi service in Nagpur. Driver arrived before time
          and the booking process was very easy.
        </p>

        <div className="mt-6">
          <h4 className="font-bold text-base md:text-lg">
            Priya Verma
          </h4>
          <p className="text-sm text-gray-400">
            Nagpur Airport Transfer
          </p>
        </div>

      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-white hover:-translate-y-3 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">

        <div className="text-yellow-400 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-gray-300 leading-8">
          Transparent pricing and comfortable vehicle.
          Highly recommended for family outstation trips.
        </p>

        <div className="mt-6">
          <h4 className="font-bold text-lg">
            Rahul Patel
          </h4>
          <p className="text-sm text-gray-400">
            Nagpur → Pune
          </p>
        </div>

      </div>

    </div>

    <div className="mt-10 md:mt-16 text-center px-4">

      <div className="inline-flex flex-col md:flex-row items-center gap-2 md:gap-3 bg-white/10 backdrop-blur-md px-6 md:px-8 py-4 md:py-4 rounded-2xl border border-white/10 w-full max-w-sm md:max-w-fit">

    <span className="text-yellow-400 text-xl md:text-2xl">
    ⭐⭐⭐⭐⭐
    </span>

    <span className="text-white font-bold text-base md:text-lg text-center">
    4.9/5 Average Customer Rating
    </span>

  </div>

    </div>

  </div>

</section>

{/* Why We Are The Best Taxi Service In Nagpur */}

<section className="bg-slate-950 py-14 md:py-24">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <div className="text-center">

      <span className="bg-blue-500/20 text-blue-400 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
        WHY CHOOSE RC TOURS & TRAVELS
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-white mt-5 md:mt-6 mb-6 md:mb-8 leading-tight">
        Why We Are The Best Taxi Service In Nagpur
      </h2>

      <p className="text-gray-300 text-base md:text-lg leading-8 md:leading-9 max-w-5xl mx-auto">
        RC Tours & Travels is a trusted Nagpur taxi service provider offering
        airport transfers, local cab service, outstation taxi booking and
        customized tour packages across India.
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-10 md:mt-16">

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🚖</div>
        <h3 className="text-white font-bold text-base md:text-xl">
          Professional Drivers
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">💰</div>
        <h3 className="text-white font-bold text-base md:text-xl">
          Transparent Pricing
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">🛡️</div>
        <h3 className="text-white font-bold text-base md:text-xl">
          Safe Journey
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-5 md:p-8 text-center">
        <div className="text-4xl md:text-5xl mb-3 md:mb-4">📞</div>
        <h3 className="text-white font-bold text-base md:text-xl">
          24×7 Support
        </h3>
      </div>

    </div>

  </div>

</section>

{/* FAQ Section */}

<section className="py-10 md:py-16 bg-slate-50">

  <div className="max-w-5xl mx-auto px-4 md:px-8">

    <div className="text-center mb-10 md:mb-14">

      <span className="bg-blue-100 text-blue-600 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
        FAQ
      </span>

      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-5 md:mt-6 leading-tight">
        Frequently Asked Questions
      </h2>

      <p className="text-gray-500 text-base md:text-lg mt-4 max-w-2xl mx-auto">
        Everything You Need To Know About RC Tours & Travels
      </p>

    </div>

    <div className="space-y-4 md:space-y-6">

      <div className="bg-white shadow-lg rounded-3xl p-5 md:p-8">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-3 leading-snug">
          🚖 Do you provide outstation taxi service from Nagpur?
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-7">
          Yes, we provide outstation taxi service from Nagpur to destinations
          across India.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-5 md:p-8">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-3 leading-snug">
          ✈️ Do you provide Nagpur Airport pickup and drop service?
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-7">
          Yes, we offer 24/7 airport pickup and drop taxi service in Nagpur.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-5 md:p-8">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-3 leading-snug">
          🚘 Which vehicles are available?
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-7">
          Swift Dzire, Ertiga, Innova Crysta and Tempo Traveller are available.
        </p>
      </div>

      <div className="bg-white shadow-lg rounded-3xl p-5 md:p-8">
        <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-3 leading-snug">
          📞 How can I book a taxi?
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-7">
          You can call us directly on +91 9172271464 or book through WhatsApp.
        </p>
      </div>

    </div>

  </div>

</section>

{/* SEO Content Section */}

<section className="pt-2 pb-8 md:py-20 bg-slate-50">

  <div className="max-w-6xl mx-auto px-4 md:px-8">

    <h2 className="text-3xl md:text-5xl font-black text-slate-900 text-center mb-6 md:mb-10 leading-tight">
      RC Tours & Travels – Best Taxi Service In Nagpur
    </h2>

    <div className="bg-white rounded-3xl shadow-xl p-5 md:p-10">

      <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9 mb-5 md:mb-6">
        RC Tours & Travels is a trusted taxi and travel company in Nagpur,
        providing airport transfers, local cab services, outstation taxi
        booking, corporate travel and customized tour packages across India.
      </p>

      <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9 mb-5 md:mb-6">
        We offer comfortable and affordable travel solutions with professional
        drivers and well-maintained vehicles. Whether you need a cab from
        Nagpur to Pench, Tadoba, Chikhaldara, Shirdi, Pune, Mumbai,
        Hyderabad, Goa, Indore or any other destination, we ensure a safe
        and hassle-free journey.
      </p>

      <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9 mb-5 md:mb-6">
        Our fleet includes Swift Dzire, Ertiga, Innova Crysta, Urbania and
        Tempo Traveller, suitable for solo travelers, families, corporate
        clients and group tours.
      </p>

      <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9">
        With transparent pricing, 24×7 customer support and years of travel
        experience, RC Tours & Travels has become one of the preferred taxi
        service providers in Nagpur and Central India.
      </p>

    </div>

  </div>

</section>

      {/* Mission & Vision */}

<section className="py-10 md:py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">

  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <div className="text-center mb-10 md:mb-16">

      <span className="bg-blue-500/20 text-blue-400 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
        OUR GOAL
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-white mt-5 md:mt-6 leading-tight">
        Our Mission & Vision
      </h2>

      <p className="text-gray-300 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-8">
        Delivering safe, comfortable and reliable travel experiences across India.
      </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">

      {/* Mission */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 hover:-translate-y-2 hover:border-blue-500 transition-all duration-300">

        <div className="text-5xl md:text-6xl mb-4 md:mb-6">
          🎯
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4 md:mb-5">
          Our Mission
        </h3>

        <p className="text-gray-300 text-base md:text-lg leading-8">
          To provide safe, comfortable, affordable and customer-focused
          travel services while maintaining the highest standards of
          professionalism, reliability and customer satisfaction.
        </p>

      </div>

      {/* Vision */}

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 hover:-translate-y-2 hover:border-cyan-500 transition-all duration-300">

        <div className="text-5xl md:text-6xl mb-4 md:mb-6">
          🚀
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 md:mb-5">
          Our Vision
        </h3>

        <p className="text-gray-300 text-base md:text-lg leading-8">
          To become the most trusted taxi and travel service provider
          in Central India by offering premium travel experiences,
          modern fleet and exceptional customer support.
        </p>

      </div>

    </div>

  </div>

</section>

{/* Premium CTA Section */}

<section className="relative py-10 md:py-16 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">

  <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>

  <div className="relative max-w-6xl mx-auto px-4 md:px-8 text-center">

    <span className="bg-blue-500/20 text-blue-400 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold">
      BOOK YOUR CAB TODAY
    </span>

    <h2 className="text-4xl md:text-7xl font-black text-white mt-6 md:mt-8 leading-tight">
      Ready For Your
      <span className="text-cyan-400"> Next Journey?</span>
    </h2>

    <p className="text-base md:text-xl text-gray-300 mt-6 md:mt-8 max-w-3xl mx-auto leading-8 md:leading-9">
      Airport Transfers • Outstation Taxi • Corporate Travel • Tour Packages •
      Family Trips • Tempo Traveller Booking
    </p>

    {/* Buttons */}

    <div className="flex flex-col sm:flex-row gap-4 md:gap-5 justify-center mt-10 md:mt-12">

      <a
        href="tel:9172271464"
        className="bg-blue-600 hover:bg-blue-700 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto"
      >
        📞 Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto"
      >
        💬 WhatsApp Booking
      </a>

      <a
        href="/book-cab"
        className="bg-white text-slate-900 hover:bg-gray-200 px-6 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg hover:scale-105 transition-all duration-300 w-full sm:w-auto"
      >
        🚖 Book Online
      </a>

    </div>

    {/* Stats */}

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-12 md:mt-16">

  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6">
    <h3 className="text-cyan-400 text-2xl md:text-4xl font-black">
      5000+
    </h3>
    <p className="text-gray-300 mt-1 md:mt-2 text-sm md:text-base">
      Trips Completed
    </p>
  </div>

  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6">
    <h3 className="text-cyan-400 text-2xl md:text-4xl font-black">
      1000+
    </h3>
    <p className="text-gray-300 mt-1 md:mt-2 text-sm md:text-base">
      Happy Customers
    </p>
  </div>

  <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6">
    <h3 className="text-cyan-400 text-2xl md:text-4xl font-black">
      24×7
    </h3>
    <p className="text-gray-300 mt-1 md:mt-2 text-sm md:text-base">
      Customer Support
    </p>
  </div>

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

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-lg md:text-2xl"
  >
    📞
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl md:text-4xl"
  >
    <FaWhatsapp />
  </a>

  {/* Discount Badge */}
  <div className="bg-green-500 text-white px-2 md:px-3 py-1.5 md:py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

</div>

);
}