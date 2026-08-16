"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import TravelAssistantButton from "@/components/TravelAssistantButton";

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Fuel,
  HandCoins,
} from "lucide-react";

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  handleResize();

  window.addEventListener("resize", handleResize);

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

const [isRouteHovered, setIsRouteHovered] = useState(false);

const [pickup, setPickup] = useState("");
const [drop, setDrop] = useState("");

const [pickupSuggestions, setPickupSuggestions] = useState([]);
const [dropSuggestions, setDropSuggestions] = useState([]);

const [journeyDate, setJourneyDate] = useState("");

const [pickupTime, setPickupTime] = useState("");

const [returnDate, setReturnDate] = useState("");

const [tripType, setTripType] = useState("One Way Trip");

const [selectedVehicle, setSelectedVehicle] = useState("Swift Dzire");

const [cabType, setCabType] = useState("Sedan");

const [distance, setDistance] = useState(0);
const [fare, setFare] = useState(0);
const [loading, setLoading] = useState(false);

const searchLocation = async (
  text: string,
  type: "pickup" | "drop"
) => {
  if (text.length < 1) {
  if (type === "pickup") {
    setPickupSuggestions([]);
  } else {
    setDropSuggestions([]);
  }
  return;
}

  console.log("API KEY:", process.env.NEXT_PUBLIC_ORS_API_KEY);
  console.log("SEARCH TEXT:", text);


  try {
    const res = await fetch(
  `/api/location-search?q=${encodeURIComponent(text)}`
);

const data = await res.json();

const results =
  data.map((item: any) => item.display_name) || [];

    if (type === "pickup") {
      setPickupSuggestions(results);
    } else {
      setDropSuggestions(results);
    }
  } catch (error) {

  console.log(error);

  return {
    distance: 0,
    fare: 0,
  };

}
};

const calculateFare = async () => {
  try {

    if (!pickup || !drop) {
      alert("Enter Pickup & Drop");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickup,
        drop,
      }),
    });

    const data = await res.json();

    if (!data.success) {

  return {
    distance: 0,
    fare: 0,
  };

}

    const distanceKm = data.distance;

let totalDistance = distanceKm;
let totalFare = 0;

  if (tripType === "One Way Trip") {
    totalFare =
    distanceKm *
    vehicleRates[cabType as keyof typeof vehicleRates] *
    2;
  }

else if (tripType === "Outstation Trip") {

  const startDate = new Date(journeyDate);
  const endDate = new Date(returnDate);

  const totalDays =
    returnDate
      ? Math.floor(
          (endDate.getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24)
        ) + 1
      : 1;

  if (totalDays > 1) {

    // Multi Day Outstation
    totalDistance = totalDays * 300;

    totalFare =
      totalDistance *
      vehicleRates[cabType as keyof typeof vehicleRates];

  } else {

    // Same Day Outstation
    totalDistance = distanceKm * 2;

    totalFare =
      totalDistance *
      vehicleRates[cabType as keyof typeof vehicleRates];
  }
}

else {
  totalFare = distanceKm * vehicleRates[cabType as keyof typeof vehicleRates];
}

setDistance(Math.round(totalDistance));
setFare(Math.round(totalFare));

return {
  distance: Math.round(totalDistance),
  fare: Math.round(totalFare),
};

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

const vehicleRates = {
  Sedan: 11,
  Ertiga: 13,
  "Toyota Rumion": 13,
  Innova: 16,
  "Innova Crysta": 17,
  "Tempo Traveller 13": 25,
  "Tempo Traveller 17": 27,
  "Urbania 17": 40,
};

const [routeIndex, setRouteIndex] = useState(0);

const [selectedPackage, setSelectedPackage] = useState("4hr");

const [reviewIndex, setReviewIndex] = useState(0);

const [openFaq, setOpenFaq] = useState<number | null>(null);

const [openService, setOpenService] = useState(0);

const [showAllAreas, setShowAllAreas] = useState(false);

const routes = [
  ["Wardha","₹1800"],
  ["Amravati","₹3000"],
  ["Chandrapur","₹2500"],
  ["Bhandara","₹1500"],
  ["Gondia","₹2200"],
  ["Tadoba","₹2999"],
  ["Pench","₹2499"],
  ["Chikhaldara","₹4999"],
  ["Shegaon","₹3500"],
  ["Shirdi","₹5999"],
  ["Pune","₹6999"],
  ["Hyderabad","₹7499"],
];

const reviews = [
  {
    name: "Amit Sharma",
    image: "/review1.jpg",
    review: "Excellent service. Clean vehicle and polite driver.",
    time: "1 month ago"
  },

  {
    name: "Priya Verma",
    image: "/review2.jpg",
    review:
      "Very professional taxi service in Nagpur. Booking process was smooth and pricing was transparent.",
    time: "3 weeks ago"
  },
  {
    name: "Rahul Deshmukh",
    image: "/review3.jpg",
    review:
      "Used RC Tours & Travels for a family trip. Vehicle was neat and driver was cooperative.",
  },
  {
    name: "Sneha Patil",
    image: "/review1.jpg",
    review:
      "Best taxi service for airport transfer. Driver arrived before time.",
  },
  {
    name: "Vikas Joshi",
    image: "/review2.jpg",
    review:
      "Booked Innova Crysta for family tour. Amazing experience.",
  },
];

const actions = [
  {
    text: "View Cabs",
    href: "/fleet",
    color: "bg-orange-500 hover:bg-orange-600",
  },
  {
    text: "Book Now",
    href: "https://wa.me/919172271464",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    text: "Call Now",
    href: "tel:+919172271464",
    color: "bg-blue-500 hover:bg-blue-600",
  },
];
const [ctaIndex, setCtaIndex] = useState(0);
const [isReviewHovered, setIsReviewHovered] = useState(false);

let bookCabUrl = "";

if (tripType === "Local Rental") {
  bookCabUrl = "#local-rental";
} else {
  bookCabUrl =
  `/book-cab?vehicle=${encodeURIComponent(selectedVehicle)}` +
  `&tripType=${encodeURIComponent(tripType)}` +
  `&pickup=${encodeURIComponent(pickup)}` +
  `&drop=${encodeURIComponent(drop)}` +
  `&journeyDate=${journeyDate}` +
  `&pickupTime=${pickupTime}` +
  `&returnDate=${returnDate}` +
  `&distance=${distance}` +
  `&fare=${fare}`;
}

console.log("bookCabUrl:", bookCabUrl);
console.log("tripType:", tripType);
console.log("pickup:", pickup);
console.log("drop:", drop);
console.log("journeyDate:", journeyDate);

useEffect(() => {
  if (isReviewHovered) return;

  const timer = setInterval(() => {
    setReviewIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  }, 3000);

  return () => clearInterval(timer);
}, [isReviewHovered, reviews.length]);


useEffect(() => {
  const timer = setInterval(() => {
    setCtaIndex((prev) =>
      prev === 2 ? 0 : prev + 1
    );
  }, 2000);

  return () => clearInterval(timer);
}, []);


  return (
  <>
    <AnnouncementPopup />

    <main className="min-h-screen bg-black text-white pt-20 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#071a52] via-[#0b2a78] to-[#0f4cc9] overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 pt-8 md:pt-10 pb-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Hero Content */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="inline-block px-5 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 mb-4 text-sm font-semibold">
              👑 #1 Taxi Service in Nagpur
            </div>

            <h1 className="font-black leading-[1.05] text-3xl sm:text-4xl md:text-5xl lg:text-7xl">

            {/* Mobile */}
            <span className="block md:hidden">
            Taxi Service <span className="text-cyan-400">In Nagpur</span>
            </span>

            {/* Desktop */}
            <span className="hidden md:block">
            Taxi Service
            <br />
            In
            <span className="text-cyan-400"> Nagpur</span>
            </span>

            </h1>

            <p className="mt-6 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] text-gray-300 leading-7 md:leading-8 max-w-xl">
              Book the best taxi service in Nagpur for airport transfers, local cab rental,
              one-way taxi, round trip, outstation travel, corporate cab service, Tempo Traveller
              rental and tour packages. RC Tours & Travels receives daily taxi booking requests
              from Nagpur for Pune, Mumbai, Hyderabad, Shirdi, Nashik, Pench, Tadoba,
              Amravati, Wardha, Chandrapur and many other destinations across Maharashtra
              and India. Enjoy professional drivers, clean vehicles, transparent pricing and
              24×7 booking support.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-6 rounded-2xl hover:scale-105 hover:border-cyan-400/40 transition-all duration-300">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">7+</h2>
                <p className="text-xs md:text-sm text-gray-400">Years Experience</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-6 rounded-2xl hover:scale-105 hover:border-cyan-400/40 transition-all duration-300">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">4.9★</h2>
                <p className="text-xs md:text-sm text-gray-400">Google Rating</p>
              </div>

              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 md:p-6 rounded-2xl hover:scale-105 hover:border-cyan-400/40 transition-all duration-300">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">98%</h2>
                <p className="text-xs md:text-sm text-gray-400">Satisfaction</p>
              </div>
            </div>
          </div>

          {/* New Clean & Fixed Booking Box */}
          <div
          id="book-ride"
          className="bg-white rounded-3xl p-3 sm:p-5 md:p-6 max-w-xl w-full mx-auto md:ml-auto shadow-2xl border border-gray-100 text-gray-900 relative z-20 md:-mt-6 lg:-mt-8"
          >
            <div className="text-center mb-4">
              <div className="flex justify-center mb-2">
                <a
                  href="tel:+919172271464"
                  className="relative inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:bg-orange-600 transition-all"
                >
                  <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-40"></span>
                  <span className="relative">📞 Call Now</span>
                </a>
              </div>
              <h3 className="text-xl font-black text-gray-950">Book Your Ride</h3>
              <p className="text-gray-500 text-xs mt-0.5">Book Your Ride In Just 30 Seconds</p>
            </div>

            <div className="space-y-2 md:space-y-3">

              {/* Mobile Trip Type */}

<div className="block lg:hidden mb-5">

  <label className="text-xs font-bold text-gray-700 mb-2 block">
    Select Trip Type
  </label>

  <select
    value={tripType}
    onChange={(e) => setTripType(e.target.value)}
    className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
  >
    <option value="">Choose Trip Type</option>
    <option value="Airport Pick-Up & Drop">
      ✈ Airport
    </option>

    <option value="One Way Trip">
      🚗 One Way
    </option>

    <option value="Outstation Trip">
      🔁 Round Trip
    </option>

    <option value="Local Rental">
      🏠 Local Rental
    </option>

  </select>

</div>

              {/* Premium Trip Type Tabs */}

              <div className="hidden lg:block mb-5">

              <p className="text-xs font-bold text-gray-700 mb-3">
              Select Trip Type
              </p>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">

              <button
              type="button"
              onClick={() => setTripType("Airport Pick-Up & Drop")}
              className={`rounded-xl px-3 py-3 text-sm font-bold transition-all border
              ${
              tripType === "Airport Pick-Up & Drop"
              ? "bg-cyan-500 text-white border-cyan-500 shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400"
              }`}
              >
              ✈️ Airport
              </button>

              <button
              type="button"
              onClick={() => setTripType("One Way Trip")}
              className={`rounded-xl px-3 py-3 text-sm font-bold transition-all border
              ${
              tripType === "One Way Trip"
              ? "bg-cyan-500 text-white border-cyan-500 shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400"
              }`}
              >
              🚗 One Way
              </button>

              <button
              type="button"
              onClick={() => setTripType("Outstation Trip")}
              className={`rounded-xl px-3 py-3 text-sm font-bold transition-all border
              ${
              tripType === "Outstation Trip"
              ? "bg-cyan-500 text-white border-cyan-500 shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400"
              }`}
              >
              🔁 Round Trip
              </button>

              <button
              type="button"
              onClick={() => setTripType("Local Rental")}
              className={`rounded-xl px-2 py-3 text-xs lg:text-sm font-bold transition-all border whitespace-nowrap
              ${
              tripType === "Local Rental"
              ? "bg-cyan-500 text-white border-cyan-500 shadow-lg"
              : "bg-white text-gray-700 border-gray-200 hover:border-cyan-400"
              }`}
              >
              🏠 Local Rental
              </button>

            </div>

          </div>

              {/* Pickup + Drop Row */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Pickup */}
            <div className="relative">

            <label className="text-xs font-bold text-gray-700 mb-2 block">
            📍 Pickup Location
            </label>

            <input
            type="text"
            value={pickup}
            onChange={(e) => {
            setPickup(e.target.value);
            searchLocation(e.target.value, "pickup");
            }}
            placeholder="Enter Pickup Location"
            className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
            />

            {pickupSuggestions.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">

            {pickupSuggestions.map((item, index) => (

            <div
            key={index}
            onClick={() => {
              setPickup(item);
              setPickupSuggestions([]);
            }}
            className="px-4 py-3 cursor-pointer hover:bg-cyan-50 text-sm"
            >
            📍 {item}
            </div>

            ))}

            </div>
            )}

          </div>

          {/* Drop */}

          <div className="relative">

          <label className="text-xs font-bold text-gray-700 mb-2 block">
          📍 Drop Location
          </label>

          <input
          type="text"
          value={drop}
          onChange={(e) => {
            setDrop(e.target.value);
            searchLocation(e.target.value, "drop");
          }}
          placeholder="Enter Drop Location"
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
          />

          {dropSuggestions.length > 0 && (

          <div className="absolute left-0 right-0 mt-1 bg-white border rounded-xl shadow-xl max-h-48 overflow-y-auto z-50">

          {dropSuggestions.map((item, index) => (

          <div
            key={index}
            onClick={() => {
              setDrop(item);
              setDropSuggestions([]);
            }}
            className="px-4 py-3 cursor-pointer hover:bg-cyan-50 text-sm"
            >
            📍 {item}
            </div>

            ))}

            </div>

            )}

          </div>

          </div>

              {/* Date + Return + Vehicle */}

          <div
          className={`grid gap-4 ${
          tripType === "Outstation Trip"
          ? "grid-cols-1 md:grid-cols-4"
          : "grid-cols-1 md:grid-cols-3"
          }`}
          >

          {/* Journey Date */}
          <div className="md:col-span-1">

          <label className="text-xs font-bold text-gray-700 mb-2 block">
          📅 Journey Date
          </label>

          <input
          type="date"
          value={journeyDate}
          onChange={(e) => setJourneyDate(e.target.value)}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
          />

          </div>

          {/* Return Date */}

          {tripType === "Outstation Trip" && (

          <div>

          <label className="text-xs font-bold text-gray-700 mb-2 block">
          🔁 Return Date
          </label>

          <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
          />

          </div>

          )}

          {/* Pickup Time */}

          <div>

          <label className="text-xs font-bold text-gray-700 mb-2 block">
          🕒 Select Time
          </label>

          <input
          type="time"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm cursor-pointer focus:outline-none focus:border-cyan-500"
          />

          </div>

          {/* Vehicle */}
          

          <div>

          <label className="text-xs font-bold text-gray-700 mb-2 block">
          🚘 Select Vehicle
          </label>

          <select
          value={cabType}
          onChange={(e) => {
          const value = e.target.value;
          setCabType(value);

          if (value === "Sedan")
            setSelectedVehicle("Swift Dzire");

          else if (value === "Ertiga")
            setSelectedVehicle("Ertiga");

          else if (value === "Toyota Rumion")
            setSelectedVehicle("Toyota Rumion");

          else if (
            value === "Innova" ||
            value === "Innova Crysta"
          )
          setSelectedVehicle("Innova Crysta");
          }}
          className="w-full h-12 rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm focus:outline-none focus:border-cyan-500"
          >

          <option value="Sedan">
          Sedan (Dzire / Etios)
          </option>

          <option value="Ertiga">
          Ertiga (SUV)
          </option>

          <option value="Toyota Rumion">
          Toyota Rumion
          </option>

          <option value="Innova">
          Innova
          </option>

          <option value="Innova Crysta">
          Innova Crysta
          </option>

          <option value="Tempo Traveller 13">
          Tempo Traveller 13
          </option>

          <option value="Tempo Traveller 17">
          Tempo Traveller 17
          </option>

          <option value="Urbania 17">
          Urbania 17
          </option>

        </select>

      </div>

    </div>

              {/* Action Button */}

              <div className="pt-1">

              <Link
              href={!pickup || !drop || !journeyDate ? "#" : bookCabUrl}
              onClick={async (e) => {

              e.preventDefault();

              if (!pickup || !drop || !journeyDate) {
              alert("Please enter Pickup, Drop and Journey Date");
              return;
              }

              const result = await calculateFare();

              console.log("HOME RESULT :", result);

              if (!result) return;

              window.location.href =
              `/book-cab?vehicle=${encodeURIComponent(selectedVehicle)}` +
              `&tripType=${encodeURIComponent(tripType)}` +
              `&pickup=${encodeURIComponent(pickup)}` +
              `&drop=${encodeURIComponent(drop)}` +
              `&journeyDate=${journeyDate}` +
              `&pickupTime=${pickupTime}` +
              `&returnDate=${returnDate}` +
              `&distance=${result.distance}` +
              `&fare=${result.fare}`;

              }}
              className="w-full h-12 md:h-14 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-cyan-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg font-bold flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
              🚖 Book Taxi Now
              </Link>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] md:text-xs text-gray-500">

              <div className="flex items-center gap-1">
              🛡 Secure Booking
              </div>

              <div className="flex items-center gap-1">
              ⚡ Instant Confirmation
              </div>

              <div className="flex items-center gap-1">
              📞 24×7 Support
            </div>

          </div>

      </div>
              </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-slate-950 border-y border-white/10 py-5">

      <div className="max-w-7xl mx-auto px-4 md:px-10">

      <div className="flex overflow-x-auto gap-3 scrollbar-hide">

      {/* Card 1 */}
      <div className="min-w-[230px] flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">

        <span className="text-2xl">🕒</span>

        <div>
          <h3 className="text-sm font-bold text-white">
            24×7 Availability
          </h3>

          <p className="text-xs text-gray-400">
            Instant Booking Support
          </p>
        </div>

      </div>

      {/* Card 2 */}
      <div className="min-w-[230px] flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">

        <span className="text-2xl">🛡️</span>

        <div>
          <h3 className="text-sm font-bold text-white">
            Verified Drivers
          </h3>

          <p className="text-xs text-gray-400">
            Safe & Reliable Journey
          </p>
        </div>

      </div>

      {/* Card 3 */}
      <div className="min-w-[230px] flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">

        <span className="text-2xl">🚘</span>

        <div>
          <h3 className="text-sm font-bold text-white">
            Premium Fleet
          </h3>

          <p className="text-xs text-gray-400">
            Sedan • SUV • Traveller
          </p>
        </div>

      </div>

      {/* Card 4 */}
      <div className="min-w-[230px] flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">

        <span className="text-2xl">✨</span>

        <div>
          <h3 className="text-sm font-bold text-white">
            Clean Vehicles
          </h3>

          <p className="text-xs text-gray-400">
            Well Maintained
          </p>
        </div>

      </div>

      {/* Card 5 */}
      <div className="min-w-[230px] flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">

        <span className="text-2xl">💰</span>

        <div>
          <h3 className="text-sm font-bold text-white">
            No Hidden Charges
          </h3>

          <p className="text-xs text-gray-400">
            Transparent Pricing
          </p>
        </div>

      </div>

    </div>

  </div>

</section>


{/* Popular Routes Section */}
<section className="pt-4 pb-8 md:py-12 bg-slate-50 text-black">

  <div className="max-w-7xl mx-auto px-6 md:px-10">

    <p className="text-cyan-500 uppercase tracking-[6px] text-center mb-3">
      Most Booked Routes
    </p>

    <h2 className="text-3xl md:text-5xl font-black text-center mb-3 text-black leading-tight">
      Popular Routes From Nagpur
    </h2>

    <p className="text-center text-sm md:text-base text-gray-600 mb-5">
      Affordable One Way & Round Trip Taxi Service
    </p>

    <div className="max-w-5xl mx-auto text-center mb-6 md:mb-12">
  <p className="text-black text-sm md:text-[16px] leading-7">
    Looking for a reliable taxi service from Nagpur? RC Tours & Travels
    provides safe and affordable cab services for airport transfers,
    local travel, outstation trips, and tour packages. Travel comfortably
    to Tadoba, Pench, Wardha, Chandrapur, Pune, Hyderabad, Shirdi, and
    other destinations with professional drivers, clean vehicles, and
    transparent pricing.
  </p>

</div>
{/* Desktop Navigation */}

<div className="hidden md:flex justify-center items-center gap-3 md:gap-5 mb-6">

  <button
    onClick={() =>
      setRouteIndex((prev) =>
        prev === 0 ? 11 : prev - 1
      )
    }
    className="w-12 h-12 rounded-full bg-white border border-slate-300 shadow-md hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
  >
    <ChevronLeft className="mx-auto" size={22} />
  </button>

  <div className="px-5 py-2 rounded-full bg-cyan-500 text-white text-sm font-semibold shadow-lg">
    Swipe Routes
  </div>

  <button
    onClick={() =>
      setRouteIndex((prev) =>
        prev === routes.length - 1 ? 0 : prev + 1
      )
    }
    className="w-12 h-12 rounded-full bg-white border border-slate-300 shadow-md hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300"
  >
    <ChevronRight className="mx-auto" size={22} />
  </button>

</div>

{/* Mobile Navigation */}

<div className="md:hidden flex items-center justify-between mb-5">

  <div>

    <h3 className="text-xl font-bold text-black">
      Popular Routes
    </h3>

    <div className="flex items-center gap-1 mt-2">

    {Array.from({ length: 12 }).map((_, index) => (

    <div
      key={index}
      className={`rounded-full transition-all duration-300 ${
        index === routeIndex
          ? "w-6 h-2 bg-cyan-500"
          : "w-2 h-2 bg-gray-300"
      }`}
    />

  ))}

</div>

  </div>

  <div className="flex gap-2">

    <button
      onClick={() =>
        setRouteIndex((prev) =>
          prev === 0 ? 11 : prev - 1
        )
      }
      className="w-10 h-10 rounded-full bg-white border border-slate-300 shadow"
    >
      <ChevronLeft className="mx-auto" size={18} />
    </button>

    <button
      onClick={() =>
        setRouteIndex((prev) =>
          prev === 11 ? 0 : prev + 1
        )
      }
      className="w-10 h-10 rounded-full bg-white border border-slate-300 shadow"
    >
      <ChevronRight className="mx-auto" size={18} />
    </button>

  </div>

</div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

{(isMobile ? [0] : [0,1,2]).map((offset) => {

const route =
routes[(routeIndex + offset) % routes.length];

return (

<div
  key={offset}
  onMouseEnter={() => setIsRouteHovered(true)}
  onMouseLeave={() => setIsRouteHovered(false)}
  className="rounded-3xl p-4 md:p-5 flex flex-col flex-col lg:flex-row justify-between gap-4 bg-white min-h-auto md:min-h-[240px]"
>
   {/* Left Side */}
  <div>

    <div className="inline-block mb-3 px-3 py-1 rounded-full bg-cyan-500 text-white text-xs font-bold">
      MOST BOOKED
    </div>

    <h3 className="text-xl md:text-2xl font-bold text-black">
      Nagpur → {route[0]}
    </h3>

    <div className="flex gap-2 mt-4 flex-wrap">

      <span className="px-3 py-1 rounded-full bg-slate-100 text-gray-700 text-xs border border-slate-200">
        One Way
      </span>

      <span className="px-3 py-1 rounded-full bg-slate-100 text-gray-700 text-xs border border-slate-200">
        Round Trip
      </span>

      <span className="px-3 py-1 rounded-full bg-slate-100 text-gray-700 text-xs border border-slate-200">
        24×7 Service
      </span>

    </div>

    <div className="flex flex-col gap-2 mt-5 text-gray-700">

      <span>⭐ 4.9 Rating</span>

      <span>🚖 Sedan / SUV</span>

      <span>🛡️ Verified Drivers</span>

    </div>

  </div>

  {/* Right Side */}
  <div className="text-left md:text-right w-full md:min-w-[170px]">

    <p className="text-gray-500 text-sm">
      Starting From
    </p>

    <p className="text-3xl md:text-4xl font-black text-black mt-1">
      {route[1]}
    </p>

    <p className="text-cyan-500 font-semibold text-sm mt-2">
      Best Price Guarantee
    </p>

    <div className="flex flex-col gap-2 mt-4 w-full md:w-[130px] md:ml-auto">

      <a
        href="tel:+919172271464"
        className="w-full h-10 rounded-xl flex items-center justify-center text-sm font-semibold text-white bg-blue-500 hover:scale-105 transition"
      >
        Call Now
      </a>

      <Link
        href="/book-cab"
        className="w-full h-10 rounded-xl flex items-center justify-center text-sm font-semibold text-white bg-green-500 hover:scale-105 transition"
      >
        Book Now
      </Link>

      <Link
        href="/fleet"
        className="w-full h-10 rounded-xl flex items-center justify-center text-sm font-semibold text-white bg-orange-500 hover:scale-105 transition"
      >
        View Cabs
      </Link>

    </div>

  </div>

</div>

);

})}

</div>

  </div>

</section>

{/* Local Rental Packages */}

<section
  id="local-rental"
  className="pt-0 pb-2 md:pb-4 bg-white text-black"
>

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-10">

    <p className="text-cyan-500 uppercase tracking-[6px] text-center mb-3">
      Local Rental
    </p>

    <h2 className="text-3xl md:text-5xl font-black text-center mb-3">
      Hourly Cab Packages In Nagpur
    </h2>

    <p className="text-center text-gray-600 mb-6 md:mb-12">
      Flexible local rental packages for business meetings, shopping,
      city tours and family travel.
    </p>

    {/* Package Buttons */}
    <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-12">

      <button
        onClick={() => setSelectedPackage("4hr")}
        className={`px-6 py-3 rounded-full font-bold transition ${
        selectedPackage === "4hr"
        ? "bg-cyan-500 text-white"
        : "border border-gray-300"
        }`}
        >
        4 Hr / 40 KM
        </button>

      <button
        onClick={() => setSelectedPackage("8hr")}
        className={`px-6 py-3 rounded-full font-bold transition ${
        selectedPackage === "8hr"
        ? "bg-cyan-500 text-white"
        : "border border-gray-300"
        }`}
        >
        8 Hr / 80 KM
        </button>

      <button
        onClick={() => setSelectedPackage("12hr")}
        className={`px-6 py-3 rounded-full font-bold transition ${
        selectedPackage === "12hr"
        ? "bg-cyan-500 text-white"
        : "border border-gray-300"
        }`}
        >
        12 Hr / 120 KM
        </button>

    </div>


    {/* Vehicle Cards */}
<div
  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-8"
  onMouseEnter={() => setIsReviewHovered(true)}
  onMouseLeave={() => setIsReviewHovered(false)}
>

  {/* Dzire */}
  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

    <Image
      src="/dezire.jpeg"
      alt="Swift Dzire"
      width={500}
      height={300}
      className="w-full h-44 md:h-44 object-contain p-4 md:p-2"
    />

    <div className="p-4 md:p-5 flex-1">

      <h3 className="text-xl font-bold">
        Swift Dzire
      </h3>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="flex gap-2">
          <Clock3 size={22} />
          <div>
            <p className="text-gray-500 text-sm">INCLUDED</p>
            <p className="font-semibold">
            {selectedPackage === "4hr"
            ? "4 Hr | 40 KM"
            : selectedPackage === "8hr"
            ? "8 Hr | 80 KM"
            : "12 Hr | 120 KM"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <ShieldCheck size={22} className="text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">CANCELLATION</p>
            <p className="font-semibold text-green-600">
              Free Up To 1 Hr
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Fuel size={22} />
          <div>
            <p className="text-gray-500 text-sm">SEATS</p>
            <p className="font-semibold">4+1 Seats</p>
          </div>
        </div>

        <div className="flex gap-2">
          <HandCoins size={22} />
          <div>
            <p className="text-gray-500 text-sm">DRIVER</p>
            <p className="font-semibold">Included</p>
          </div>
        </div>

      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-5">

        <div>
          <p className="text-3xl font-bold">
          {selectedPackage === "4hr"
          ? "₹1200"
          : selectedPackage === "8hr"
          ? "₹2200"
          : "₹2800"}
          </p>
          <p className="text-xs text-gray-500">
            + Taxes & Charges
          </p>
        </div>

        <Link
        href={`/booking-details?tripType=Local Rental&cabType=Swift%20Dzire&package=${selectedPackage}&fare=${
        selectedPackage === "4hr"
        ? 1200
        : selectedPackage === "8hr"
        ? 2200
        : 2800
        }&driverCharge=0`}
        className="w-full md:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
        Book Now
        </Link>

      </div>

    </div>

    <div className="bg-gray-100 text-center text-xs py-3">
    After{" "}
    {selectedPackage === "4hr"
    ? "40 KM"
    : selectedPackage === "8hr"
    ? "80 KM"
    : "120 KM"}{" "}
    charges apply • Tolls & Parking Extra
    </div>

  </div>

  {/* Ertiga */}
  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg flex flex-col h-full">

    <Image
      src="/ertiga.jpeg"
      alt="Ertiga"
      width={500}
      height={300}
      className="w-full h-36 md:h-44 object-contain p-2"
    />

    <div className="p-4 md:p-5 flex-1">

      <h3 className="text-xl font-bold">
        Ertiga
      </h3>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="flex gap-2">
          <Clock3 size={22} />
          <div>
            <p className="text-gray-500 text-sm">INCLUDED</p>
            <p className="font-semibold">
            {selectedPackage === "4hr"
            ? "4 Hr | 40 KM"
            : selectedPackage === "8hr"
            ? "8 Hr | 80 KM"
            : "12 Hr | 120 KM"}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <ShieldCheck size={22} className="text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">CANCELLATION</p>
            <p className="font-semibold text-green-600">
              Free Up To 1 Hr
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Fuel size={22} />
          <div>
            <p className="text-gray-500 text-sm">SEATS</p>
            <p className="font-semibold">6+1 Seats</p>
          </div>
        </div>

        <div className="flex gap-2">
          <HandCoins size={22} />
          <div>
            <p className="text-gray-500 text-sm">DRIVER</p>
            <p className="font-semibold">Included</p>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between mt-5">

        <div>
          <p className="text-3xl font-bold">
          {selectedPackage === "4hr"
          ? "₹2000"
          : selectedPackage === "8hr"
          ? "₹2700"
          : "₹3200"}
          </p>
          <p className="text-xs text-gray-500">
            + Taxes & Charges
          </p>
        </div>

        <Link
        href={`/booking-details?tripType=Local Rental&cabType=Ertiga&package=${selectedPackage}&fare=${
        selectedPackage === "4hr"
        ? 2000
        : selectedPackage === "8hr"
        ? 2700
        : 3200
        }&driverCharge=0`}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
        Book Now
        </Link>

      </div>

    </div>

    <div className="bg-gray-100 text-center text-xs py-3">
    After{" "}
    {selectedPackage === "4hr"
    ? "40 KM"
    : selectedPackage === "8hr"
    ? "80 KM"
    : "120 KM"}{" "}
    charges apply • Tolls & Parking Extra
    </div>

  </div>

  {/* Innova Crysta */}
  <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg flex flex-col h-full">

    <Image
      src="/crysta.jpeg"
      alt="Innova Crysta"
      width={500}
      height={300}
      className="w-full h-36 md:h-44 object-contain p-2"
    />

    <div className="p-5 flex-1">

      <h3 className="text-xl font-bold">
        Innova Crysta
      </h3>

      <div className="grid grid-cols-2 gap-4 mt-4">

        <div className="flex gap-2">
          <Clock3 size={22} />
          <div>
            <p className="text-gray-500 text-sm">INCLUDED</p>
            <p className="font-semibold">
            {selectedPackage === "4hr"
            ? "4 Hr | 40 KM"
            : selectedPackage === "8hr"
            ? "8 Hr | 80 KM"
            : "12 Hr | 120 KM"}
          </p>
          </div>
        </div>

        <div className="flex gap-2">
          <ShieldCheck size={22} className="text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">CANCELLATION</p>
            <p className="font-semibold text-green-600">
              Free Up To 1 Hr
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Fuel size={22} />
          <div>
            <p className="text-gray-500 text-sm">SEATS</p>
            <p className="font-semibold">7+1 Seats</p>
          </div>
        </div>

        <div className="flex gap-2">
          <HandCoins size={22} />
          <div>
            <p className="text-gray-500 text-sm">PREMIUM</p>
            <p className="font-semibold">Vehicle</p>
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between mt-5">

        <div>
          <p className="text-3xl font-bold">
          {selectedPackage === "4hr"
          ? "₹3500"
          : selectedPackage === "8hr"
          ? "₹4200"
          : "₹5000"}
          </p>
          <p className="text-xs text-gray-500">
            + Taxes & Charges
          </p>
        </div>

        <Link
        href={`/booking-details?tripType=Local Rental&cabType=Innova Crysta&package=${selectedPackage}&fare=${
        selectedPackage === "4hr"
        ? 3500
        : selectedPackage === "8hr"
        ? 4200
        : 5000
        }&driverCharge=0`}
        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold"
        >
        Book Now
        </Link>

      </div>

    </div>

    <div className="bg-gray-100 text-center text-xs py-3">
    After{" "}
    {selectedPackage === "4hr"
    ? "40 KM"
    : selectedPackage === "8hr"
    ? "80 KM"
    : "120 KM"}{" "}
    charges apply • Tolls & Parking Extra
    </div>

  </div>
</div>

  </div>

  </section>

  {/* Why Choose RC Tours & Travels */}

  <section className="pt-0 pb-2 md:pt-2 md:pb-4 bg-gray-50">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-10">

      <p className="text-cyan-600 font-semibold mb-3">
        Trusted Taxi Service in Nagpur
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-black">
  Why Choose RC Tours & Travels?
</h2>

      <p className="text-gray-600 mt-2 text-sm md:text-base">
        Reliable Cabs • Professional Drivers • Transparent Pricing
      </p>

    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

      {/* Card 1 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">

        <Image
          src="/fleet1.jpg"
          alt="Wide Fleet"
          width={400}
          height={250}
          className="w-full h-40 md:h-52 object-cover"
        />

        <div className="p-4 md:p-5">

          <h3 className="font-bold text-lg md:text-xl mb-2">
            Large Fleet Availability
          </h3>

          <p className="text-gray-600 text-sm md:text-base leading-6">
            From Sedan to SUV and Tempo Traveller, we have vehicles
            available for local, outstation and airport travel.
          </p>

        </div>

      </div>

      {/* Card 2 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">

        <Image
          src="/driver.jpg"
          alt="Professional Drivers"
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <h3 className="font-bold text-xl mb-3">
            Professional Drivers
          </h3>

          <p className="text-gray-600">
            Experienced and verified drivers focused on safety,
            comfort and timely service.
          </p>

        </div>

      </div>

      {/* Card 3 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">

        <Image
          src="/service.jpg"
          alt="24x7 Service"
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <h3 className="font-bold text-xl mb-3">
            24×7 Customer Support
          </h3>

          <p className="text-gray-600">
            Book your cab anytime. Our support team is available
            round the clock for assistance.
          </p>

        </div>

      </div>

      {/* Card 4 */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">

        <Image
          src="/pricing.jpg"
          alt="Transparent Pricing"
          width={400}
          height={250}
          className="w-full h-52 object-cover"
        />

        <div className="p-5">

          <h3 className="font-bold text-xl mb-3">
            Transparent Pricing
          </h3>

          <p className="text-gray-600">
            No hidden charges. Clear pricing for airport transfers,
            local rides and outstation trips.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

<section className="pt-2 pb-10 md:pt-6 md:pb-20 bg-gray-100 overflow-hidden">

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-10">

    <h2 className="text-3xl md:text-6xl font-black text-center text-blue-900 mb-6 md:mb-12 leading-tight">
      What Our Customers Say
    </h2>

    <div className="relative max-w-7xl mx-auto">

      <div className="relative overflow-visible">

        

  {/* Left Arrow */}
  <button
  onClick={() =>
    setReviewIndex((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    )
  }
  className="hidden md:flex absolute left-[-55px] lg:left-[-70px] top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl w-14 h-14 rounded-full items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300"
>
  <ChevronLeft size={28} className="text-blue-900" />
</button>

  {/* Right Arrow */}
  <button
  onClick={() =>
    setReviewIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    )
  }
  className="hidden md:flex absolute right-[-55px] lg:right-[-70px] top-1/2 -translate-y-1/2 z-30 bg-white shadow-xl w-14 h-14 rounded-full items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300"
>
  <ChevronRight size={28} className="text-blue-900" />
</button>

{/* Mobile Review Navigation */}

<div className="md:hidden flex justify-center items-center gap-4 mb-5">

  <button
    onClick={() =>
      setReviewIndex((prev) =>
        prev === 0 ? reviews.length - 1 : prev - 1
      )
    }
    className="w-10 h-10 rounded-full bg-cyan-500 text-white shadow-lg active:scale-95 transition"
  >
    <ChevronLeft className="mx-auto" size={18} />
  </button>

  <span className="text-sm font-semibold text-gray-600">
    {reviewIndex + 1} / {reviews.length}
  </span>

  <button
    onClick={() =>
      setReviewIndex((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      )
    }
    className="w-10 h-10 rounded-full bg-cyan-500 text-white shadow-lg active:scale-95 transition"
  >
    <ChevronRight className="mx-auto" size={18} />
  </button>

</div>

  <div
  className="grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8"
  onMouseEnter={() => setIsReviewHovered(true)}
  onMouseLeave={() => setIsReviewHovered(false)}
  >
    

    {(isMobile ? [0] : [0,1,2]).map((offset) => {

      const review =
        reviews[
          (reviewIndex + offset) % reviews.length
        ];

      return (

        <div
        key={offset}
        className="bg-white rounded-3xl shadow-xl p-5 md:p-8 w-full min-h-[220px] md:min-h-[300px] flex flex-col justify-between"
        >

          {/* Top */}
          <div className="flex items-center gap-4 mb-6">

            <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=0ea5e9&color=fff&size=128`}
            alt={review.name}
            width={60}
            height={60}
            className="rounded-full"
            />

            <div>
              <h3 className="text-xl font-bold text-black">
                {review.name}
              </h3>

              <div className="text-yellow-500">
                ★★★★★
              </div>
            </div>

          </div>

          {/* Review */}
          <p className="text-gray-600 text-lg leading-8 mt-4">
          {review.review}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-8">

            <div className="flex items-center gap-2">
              <Image
              src="/google.png"
              alt="Google"
              width={32}
              height={32}
              />

              <span className="text-gray-500">
                Posted on Google
              </span>
            </div>

            <span className="text-gray-400 text-sm">
            {review.time}
            </span>

          </div>

        </div>

      );
    })}

  </div>

</div>

    </div>

  </div>

</section>

{/* Areas We Serve */}
<section className="pt-2 pb-6 md:pt-4 md:pb-8 bg-white text-black">

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-10">

    <h2 className="text-3xl md:text-5xl font-black mb-3">
      Areas We Serve In Nagpur
    </h2>

    <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-10">
      We provide airport transfer, local rental and outstation taxi
      services across all major areas of Nagpur.
    </p>

    <div className="bg-gray-50 rounded-3xl border border-gray-200 p-5 md:p-8">

      {/* Mobile */}
<div className="block md:hidden">

  <div className="space-y-3 text-sm">

    <p>📍 Sitabuldi</p>
    <p>📍 Manish Nagar</p>
    <p>📍 Trimurti Nagar</p>
    <p>📍 Sakkardara</p>
    <p>📍 Kamptee Road</p>
    <p>📍 Dharampeth</p>
    <p>📍 Pratap Nagar</p>
    <p>📍 MIHAN</p>

    {showAllAreas && (
      <>
        <p>📍 Gandhibagh</p>
        <p>📍 Ayodhya Nagar</p>
        <p>📍 Wadi</p>
        <p>📍 Civil Lines</p>
        <p>📍 Bajaj Nagar</p>
        <p>📍 Indora</p>
        <p>📍 Besa</p>
        <p>📍 Wardhaman Nagar</p>
        <p>📍 Gokulpeth</p>
        <p>📍 Pardi</p>
        <p>📍 Hingna Road</p>
        <p>📍 Koradi Road</p>
      </>
    )}

  </div>

  <button
    onClick={() => setShowAllAreas(!showAllAreas)}
    className="mt-5 text-cyan-600 font-bold"
  >
    {showAllAreas
      ? "Show Less ▲"
      : "View All Areas ▼"}
  </button>

</div>

      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">

        <div className="space-y-3 text-sm md:text-base">
          <p>📍 Sitabuldi</p>
          <p>📍 Manish Nagar</p>
          <p>📍 Trimurti Nagar</p>
          <p>📍 Sakkardara</p>
          <p>📍 Kamptee Road</p>
        </div>

        <div className="space-y-3 text-sm md:text-base">
          <p>📍 Dharampeth</p>
          <p>📍 Pratap Nagar</p>
          <p>📍 Gandhibagh</p>
          <p>📍 Ayodhya Nagar</p>
          <p>📍 Wadi</p>
        </div>

        <div className="space-y-3 text-sm md:text-base">
          <p>📍 Civil Lines</p>
          <p>📍 Bajaj Nagar</p>
          <p>📍 Indora</p>
          <p>📍 Besa</p>
          <p>📍 MIHAN</p>
        </div>

        <div className="space-y-3 text-sm md:text-base">
          <p>📍 Wardhaman Nagar</p>
          <p>📍 Gokulpeth</p>
          <p>📍 Pardi</p>
          <p>📍 Hingna Road</p>
          <p>📍 Koradi Road</p>
        </div>

      </div>

    </div>

    <div className="mt-10 text-center">

      <p className="text-gray-600 mb-6">
        Can't find your area? We provide taxi service across
        entire Nagpur and nearby locations.
      </p>

      <a
  href="tel:+919172271464"
  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold"
>
  📞 Check Availability
</a>

    </div>

  </div>

  {/* Service Highlights */}
<div className="max-w-6xl mx-auto px-6 py-4 md:py-5">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="border rounded-xl p-5 text-center shadow-sm">
      <h3 className="font-bold text-cyan-600">24/7 Service</h3>
      <p>Available Anytime</p>
    </div>

    <div className="border rounded-xl p-5 text-center shadow-sm">
      <h3 className="font-bold text-cyan-600">Clean Vehicles</h3>
      <p>Sanitized Fleet</p>
    </div>

    <div className="border rounded-xl p-5 text-center shadow-sm">
      <h3 className="font-bold text-cyan-600">Verified Drivers</h3>
      <p>Professional Team</p>
    </div>

    <div className="border rounded-xl p-5 text-center shadow-sm">
      <h3 className="font-bold text-cyan-600">Outstation Trips</h3>
      <p>Across Maharashtra</p>
    </div>

  </div>
</div>

</section>

<section className="pt-0 pb-4 md:pt-0 md:pb-4 bg-white">
  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-8">

    <div className="w-full">


      {/* Content Blocks */}

<div className="pb-3">
  <h2 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    Trusted Taxi Service in Nagpur | RC Tours & Travels
  </h2>
  <p className="text-gray-700 leading-8 text-[16px]">
    RC Tours & Travels provides reliable local, airport and outstation taxi
    services across Nagpur. Whether you need a quick city ride, airport
    transfer or long-distance travel, our professional drivers and
    well-maintained fleet ensure a safe and comfortable journey.
  </p>
</div>

<div className="pb-6">
  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    Nagpur Airport Taxi Service
  </h3>
  <p className="text-gray-700 leading-8 text-[16px]">
    Book hassle-free airport pickups and drops to and from Dr. Babasaheb
    Ambedkar International Airport. Our drivers track flight timings and
    ensure timely arrivals and departures.
  </p>
</div>

<div className="pb-6">
  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    Outstation Cab Service from Nagpur
  </h3>
  <p className="text-gray-700 leading-8 text-[16px]">
    Travel comfortably from Nagpur to Pune, Mumbai, Shirdi, Amravati,
    Chikhaldara, Pench and Tadoba with our affordable outstation cab
    packages.
  </p>
</div>

<div className="pb-6">
  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    Local Sightseeing & City Tours
  </h3>
  <p className="text-gray-700 leading-8 text-[16px]">
    Explore Deekshabhoomi, Futala Lake, Ambazari Garden, Dragon Palace,
    Ramtek and other attractions with our flexible local taxi services.
  </p>
</div>

<div className="pb-6">
  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    Corporate & Business Travel
  </h3>
  <p className="text-gray-700 leading-8 text-[16px]">
    We offer dedicated transportation solutions for corporate meetings,
    employee travel, airport transfers and business events across Maharashtra.
  </p>
</div>

<div className="pb-6">
  <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-2">
    24/7 Cab Booking in Nagpur
  </h3>
  <p className="text-gray-700 leading-8 text-[16px]">
    Our customer support team is available round the clock to assist with
    bookings, schedule changes and travel inquiries. Book your cab anytime
    with confidence.
  </p>
</div>

    </div>
  </div>
</section>

<section className="-mt-4 pt-0 pb-6 md:-mt-6 md:pt-0 md:pb-8 bg-gray-50">
  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-8">

    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-5 md:mb-8">
  Frequently Asked Questions (FAQ's)
</h2>

    {[
      {
        q: "How can I book a taxi in Nagpur?",
        a: "You can book a taxi by calling us, sending a WhatsApp message, or filling out the booking form on our website.",
      },
      {
        q: "Do you provide airport taxi service in Nagpur?",
        a: "Yes, we provide 24/7 airport pickup and drop services to and from Dr. Babasaheb Ambedkar International Airport.",
      },
      {
        q: "Are your drivers verified and experienced?",
        a: "Yes, all our drivers are verified, experienced and trained.",
      },
      {
        q: "Do you offer outstation taxi services?",
        a: "Yes, we provide outstation cabs to Pune, Mumbai, Shirdi, Tadoba, Pench, Chikhaldara and more.",
      },
      {
        q: "Is your taxi service available 24/7?",
        a: "Yes, our booking support is available round the clock.",
      },
    ].map((faq, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 mb-3 rounded-lg overflow-hidden"
      >
        <button
          onClick={() =>
            setOpenFaq(openFaq === index ? null : index)
          }
          className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-black"
        >
          {faq.q}
          <span className="text-black font-bold">
          {openFaq === index ? "-" : "+"}
          </span>
        </button>

        {openFaq === index && (
          <div className="px-5 pb-4 text-gray-600">
            {faq.a}
          </div>
        )}
      </div>
    ))}
  </div>
</section>

  {/* Nagpur Taxi Service Content */}

<section className="-mt-6 pt-4 pb-4 md:mt-0 md:pb-4 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-8 md:mb-8">

      <p className="text-cyan-500 uppercase tracking-[5px] mb-3">
        Taxi Service In Nagpur
      </p>

      <h2 className="text-3xl md:text-5xl font-black text-black mb-3">
        Trusted Taxi Service In Nagpur
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto leading-7 text-sm md:text-base">
        RC Tours & Travels provides airport transfers, local rental
        and outstation taxi services across Nagpur with professional
        drivers, clean vehicles and transparent pricing.
      </p>

    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

      {/* Airport Taxi */}
      <div className="min-w-[85%] md:min-w-0 snap-center bg-slate-50 border border-gray-200 rounded-3xl p-5 md:p-8 hover:shadow-xl transition">

        <div className="text-5xl mb-4">
          ✈️
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
          Airport Taxi Service
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-6">
          24×7 airport pickup and drop service with on-time arrival,
          flight tracking and professional drivers.
        </p>

      </div>

      {/* Outstation Taxi */}
      <div className="min-w-[85%] md:min-w-0 snap-center bg-slate-50 border border-gray-200 rounded-3xl p-5 md:p-8 hover:shadow-xl transition">

        <div className="text-4xl md:text-5xl mb-3">
          🛣️
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
          Outstation Taxi
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-6">
          Travel comfortably from Nagpur to Pune, Mumbai, Shirdi,
          Tadoba, Pench, Chikhaldara and more destinations.
        </p>

      </div>

      {/* Local Rental */}
      <div className="min-w-[85%] md:min-w-0 snap-center bg-slate-50 border border-gray-200 rounded-3xl p-5 md:p-8 hover:shadow-xl transition">

        <div className="text-5xl mb-4">
          🚕
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
          Local Rental
        </h3>

        <p className="text-gray-600 text-sm md:text-base leading-6">
          Flexible hourly cab packages for business meetings,
          city tours, shopping and family travel.
        </p>

      </div>

    </div>

  </div>

</section>

{/* Popular Cab Routes */}
<section className="pt-5 pb-6 md:pb-8 bg-white">

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-8 md:p-10 mb-0">

    <div className="text-center mb-4 md:mb-6">

      <p className="text-cyan-600 font-semibold uppercase tracking-[4px] mb-3">
        Popular Taxi Services
      </p>

      <h2 className="text-3xl md:text-5xl font-black text-black">
        Explore Our Most Booked Services
      </h2>

      <p className="text-gray-600 text-sm md:text-base mt-3 max-w-3xl mx-auto">
        Click any service below and get an instant quote through our
        booking form.
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-5 md:p-6 text-black">

      {/* ================= DESKTOP ================= */}

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">

        {/* Column 1 */}
        <div>

          <h3 className="font-bold text-lg mb-3 border-b pb-2">
            🚖 From Nagpur
          </h3>

          <div className="space-y-2">

            <a href="#book-ride" className="block hover:text-cyan-600">Nagpur → Ramtek Taxi</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Nagpur → Pench Taxi</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Nagpur → Amravati Taxi</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Nagpur → Chandrapur Taxi</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Nagpur → Wardha Taxi</a>

          </div>

        </div>

        {/* Column 2 */}
        <div>

          <h3 className="font-bold text-lg mb-3 border-b pb-2">
            ✈ Airport Services
          </h3>

          <div className="space-y-2">

            <a href="#book-ride" className="block hover:text-cyan-600">Airport Pickup</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Airport Drop</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Late Night Airport Taxi</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Business Airport Transfer</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Family Airport Transfer</a>

          </div>

        </div>

        {/* Column 3 */}
        <div>

          <h3 className="font-bold text-lg mb-3 border-b pb-2">
            🚕 Local Rental
          </h3>

          <div className="space-y-2">

            <a href="#book-ride" className="block hover:text-cyan-600">4 Hr / 40 KM</a>
            <a href="#book-ride" className="block hover:text-cyan-600">8 Hr / 80 KM</a>
            <a href="#book-ride" className="block hover:text-cyan-600">12 Hr / 120 KM</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Corporate Rental</a>
            <a href="#book-ride" className="block hover:text-cyan-600">City Tour Package</a>

          </div>

        </div>

        {/* Column 4 */}
        <div>

          <h3 className="font-bold text-lg mb-3 border-b pb-2">
            🚌 Fleet Options
          </h3>

          <div className="space-y-2">

            <a href="#book-ride" className="block hover:text-cyan-600">Sedan</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Ertiga</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Innova</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Innova Crysta</a>
            <a href="#book-ride" className="block hover:text-cyan-600">Tempo Traveller</a>

          </div>

        </div>

      </div>

      {/* ================= MOBILE ================= */}

      <div className="md:hidden space-y-3">

        {[
          {
            title: "🚖 From Nagpur",
            items: [
              "Nagpur → Ramtek Taxi",
              "Nagpur → Pench Taxi",
              "Nagpur → Amravati Taxi",
              "Nagpur → Chandrapur Taxi",
              "Nagpur → Wardha Taxi",
            ],
          },
          {
            title: "✈ Airport Services",
            items: [
              "Airport Pickup",
              "Airport Drop",
              "Late Night Airport Taxi",
              "Business Airport Transfer",
              "Family Airport Transfer",
            ],
          },
          {
            title: "🚕 Local Rental",
            items: [
              "4 Hr / 40 KM",
              "8 Hr / 80 KM",
              "12 Hr / 120 KM",
              "Corporate Rental",
              "City Tour Package",
            ],
          },
          {
            title: "🚌 Fleet Options",
            items: [
              "Sedan",
              "Ertiga",
              "Innova",
              "Innova Crysta",
              "Tempo Traveller",
            ],
          },
        ].map((section, index) => (

          <div
            key={index}
            className="border rounded-2xl overflow-hidden"
          >

            <button
              onClick={() =>
                setOpenService(openService === index ? -1 : index)
              }
              className="w-full flex justify-between items-center px-5 py-4 font-bold"
            >
              {section.title}

              <span className="text-xl">
                {openService === index ? "−" : "+"}
              </span>

            </button>

            {openService === index && (

              <div className="px-5 pb-5 space-y-3">

                {section.items.map((item) => (

                  <a
                    key={item}
                    href="#book-ride"
                    className="block hover:text-cyan-600"
                  >
                    {item}
                  </a>

                ))}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  </div>

</section>

{/* About RC Tours & Travels */}
<section className="-mt-6 pt-0 pb-6 md:-mt-4 md:pt-0 md:pb-4 bg-white">
  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-4 md:p-10">

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

      {/* Left Side */}
      <div className="lg:col-span-2">

        <span className="text-cyan-600 font-semibold uppercase tracking-[3px] text-sm">
          Trusted Taxi Service In Nagpur
        </span>

        <h2 className="text-3xl md:text-5xl font-black text-black mt-2 mb-4 leading-tight">
          About RC Tours & Travels
        </h2>

        <p className="text-gray-700 text-[15px] md:text-lg leading-7 mb-4 md:mb-6">
          RC Tours & Travels is one of the trusted taxi service providers in
          Nagpur, offering reliable local cab services, airport transfers,
          outstation taxi bookings, corporate travel solutions and tour
          packages. We are committed to providing safe, comfortable and
          affordable travel experiences for individuals, families and business
          travelers.
        </p>

        <p className="text-gray-700 text-[15px] md:text-lg leading-7 mb-5 md:mb-8">
          Whether you need a cab for daily travel, airport pickup and drop,
          outstation trips, wedding transportation or Tempo Traveller booking,
          our professional drivers and well-maintained vehicles ensure a smooth,
          punctual and hassle-free journey every time.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-5">

          <div className="border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-black text-cyan-600">
              7+
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Years Experience
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-black text-cyan-600">
              24×7
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Booking Support
            </p>
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-4xl font-black text-cyan-600">
              100%
            </h3>
            <p className="text-gray-600 mt-2 font-medium">
              Transparent Pricing
            </p>
          </div>

        </div>

        <p className="text-gray-600 mt-8 leading-7">
          Serving customers across Nagpur and nearby destinations including
          Ramtek, Pench, Wardha, Amravati, Chandrapur and major cities across
          Maharashtra with dependable taxi services.
        </p>

      </div>

      {/* Right Side */}
      <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-10">

        <h3 className="text-2xl md:text-3xl font-bold text-black mb-5">
          Why Choose RC Tours & Travels?
        </h3>

        <div className="space-y-3 md:space-y-5">

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              Verified & Experienced Drivers
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              Airport Pickup & Drop Service
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              Local, Outstation & One-Way Taxi Service
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              Clean, Sanitized & Well-Maintained Vehicles
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              Transparent Pricing — No Hidden Charges
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              24×7 Booking Assistance via Call & WhatsApp
            </p>
          </div>

          <div className="flex gap-3">
            <span className="text-green-600 font-bold text-xl">✓</span>
            <p className="text-gray-700 text-sm md:text-base">
              On-Time Pickup & Reliable Service
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>

      
</section>

{/* Premium CTA Section */}
<section className="-mt-8 pt-0 pb-2 md:-mt-8 md:pt-0 md:pb-8 bg-white">

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-2 md:p-6">

    <div className="rounded-[32px] bg-gradient-to-r from-cyan-500 via-blue-600 to-blue-700 p-5 md:p-10 text-center shadow-2xl">

      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm">
        🚖 RC Tours & Travels
      </div>

      <h2 className="text-2xl md:text-5xl font-black text-white leading-tight">
      Book Your Taxi In Nagpur Today
    </h2>

      <p className="mt-5 text-lg md:text-xl text-white/90">
        24×7 Taxi Service For Airport Transfer, Local Rental,
        Outstation Trips & Tour Packages
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-2 mt-5">

        <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium">
          ⚡ Instant Booking
        </span>

        <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium">
          🕒 24×7 Available
        </span>

        <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium">
          🛡 Safe Rides
        </span>

        <span className="px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium">
          🚘 Clean Vehicles
        </span>

      </div>

      {/* Buttons */}
      <div className="flex flex-row justify-center gap-3 md:gap-5 mt-8 md:mt-10">

        <a
          href="https://wa.me/919172271464"
          className="inline-flex items-center justify-center flex-1 md:flex-none md:w-[320px] h-[52px] md:h-[64px] bg-green-500 hover:bg-green-600 text-white font-bold text-base md:text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
        >
          WhatsApp Booking
        </a>

        <a
        href="tel:+919172271464"
        className="inline-flex items-center justify-center flex-1 md:flex-none md:w-[320px] h-[52px] md:h-[64px] bg-white/15 backdrop-blur-md border border-white/30 text-white font-bold text-base md:text-lg rounded-2xl transition-all duration-300 hover:bg-white/25 hover:scale-105 shadow-lg"
        >
        📞 Call Now
        </a>

      </div>

{/* ================= DESKTOP ================= */}

<div className="hidden md:flex mt-8 justify-center items-center gap-4">

  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
    <span className="text-green-300">✔</span>
    <span className="text-white text-base font-medium">
      4.9★ Google Rated
    </span>
  </div>

  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
    <span className="text-yellow-300">⚡</span>
    <span className="text-white text-base font-medium">
      Instant Confirmation
    </span>
  </div>

  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
    <span className="text-cyan-300">🛡️</span>
    <span className="text-white text-base font-medium">
      Safe & Verified Drivers
    </span>
  </div>

</div>

{/* ================= MOBILE ================= */}

<div className="md:hidden mt-5 flex justify-center">

  <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-5 py-3 backdrop-blur-md">

    <span className="text-yellow-300 text-lg">
      ⭐⭐⭐⭐⭐
    </span>

    <span className="text-white text-sm font-semibold">
      Rated 4.9 on Google
    </span>

  </div>

</div>

    </div>

  </div>

</section>

<Footer />

{/* Floating Call Button */}
<div className="fixed bottom-4 sm:bottom-5 md:bottom-6 right-3 md:right-4 z-50 flex flex-col items-center gap-1">

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
  <div className="bg-green-500 text-white px-2 py-1 rounded-xl shadow-xl animate-pulse">
    <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

      {/* RC Travel Assistant Floating Button - TEMPORARILY HIDDEN
<TravelAssistantButton />
*/}

    </main>
  </>
);
}