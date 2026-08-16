"use client";

import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, BadgeCheck, ShieldCheck, Ticket, Info } from "lucide-react";

function BookCabContent() {
  const searchParams = useSearchParams();

  const selectedVehicle = searchParams.get("vehicle");

  const fromHome = false;

  const router = useRouter();

  const [showInfoPopup, setShowInfoPopup] = useState(false);

  const [loadingDistance, setLoadingDistance] = useState(false);

  const footerRef = useRef(null);

  const [footerVisible, setFooterVisible] = useState(false);

const [tripType, setTripType] = useState(
  searchParams.get("tripType")?.trim() || "One Way"
);

console.log("Search Param Trip Type:", searchParams.get("tripType"));
console.log("State Trip Type:", tripType);
console.log("Journey Date:", searchParams.get("journeyDate"));

const [pickup, setPickup] = useState(
  searchParams.get("pickup") || ""
);

const [drop, setDrop] = useState(
  searchParams.get("drop") || ""
);

const [pickupDate, setPickupDate] = useState(
  searchParams.get("pickupDate") ||
  searchParams.get("journeyDate") ||
  ""
);

const [returnDate, setReturnDate] = useState(
  searchParams.get("returnDate") || ""
);

const [pickupTime, setPickupTime] = useState(
  searchParams.get("pickupTime") || ""
);

const [showSearchModal, setShowSearchModal] = useState(false);

const [distance, setDistance] = useState(
  Number(searchParams.get("distance")) || 0
);

const [fare, setFare] = useState(
  Number(searchParams.get("fare")) || 0
);

console.log("BOOK DISTANCE :", searchParams.get("distance"));

console.log("BOOK FARE :", searchParams.get("fare"));

const [rentalPackage, setRentalPackage] = useState("40 KM / 4 Hrs");

const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);

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
  }
};

const handleSearch = () => {

  console.log("Search Button Clicked");

  if (!pickup.trim()) {
  alert("Please enter Pickup Location");
  return;
}

if (!drop.trim()) {
  alert("Please enter Drop Location");
  return;
}

if (!pickupDate) {
  alert("Please select Journey Date");
  return;
}

if (
  tripType === "Outstation Trip" &&
  !returnDate
) {
  alert("Please select Return Date");
  return;
}

if (
  tripType !== "Outstation Trip" &&
  !pickupTime
) {
  alert("Please select Pickup Time");
  return;
}

  const defaultRate = 13;

  const fare = Math.round(distance * defaultRate * 2);

  const params = new URLSearchParams({
    tripType,
    pickup,
    drop,
    pickupDate,
    returnDate,
    pickupTime,
    distance: distance.toString(),
    toll: "0",
    fare: fare.toString(),
  });

  const url = `/fleet?${params.toString()}`;

  console.log("Navigating To:", url);

  router.push(`/fleet?${params.toString()}`);
};

useEffect(() => {
  const getDistance = async () => {

    setLoadingDistance(true);

    const cacheKey = `${pickup}-${drop}-${tripType}-${pickupDate}-${returnDate}`;

const cachedDistance =
  sessionStorage.getItem(cacheKey);

if (cachedDistance) {
  setDistance(Number(cachedDistance));
  setLoadingDistance(false);
  return;
}

    try {
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

      if (data.success) {

if (tripType === "Outstation Trip") {

  const start = new Date(pickupDate);
  const end = new Date(returnDate);

  const totalDays =
    returnDate
      ? Math.floor(
          (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
        ) + 1
      : 1;

  // API se actual one-way road distance
const oneWayDistance = Number(data.distance);

// Actual round-trip distance
const actualRoundTripDistance =
  oneWayDistance * 2;

// Minimum billing = 300 KM per day
const minimumBillableDistance =
  totalDays * 300;

// Actual round trip ya minimum billing,
// dono me jo zyada hai wahi final included KM
const billableDistance = Math.max(
  actualRoundTripDistance,
  minimumBillableDistance
);

console.log(
  "OUTSTATION ONE WAY DISTANCE:",
  oneWayDistance
);

console.log(
  "OUTSTATION ACTUAL ROUND TRIP:",
  actualRoundTripDistance
);

console.log(
  "OUTSTATION MINIMUM DISTANCE:",
  minimumBillableDistance
);

console.log(
  "OUTSTATION FINAL BILLABLE DISTANCE:",
  billableDistance
);

setDistance(billableDistance);

  sessionStorage.setItem(
    cacheKey,
    billableDistance.toString()
  );

  setLoadingDistance(false);

} else {

  setDistance(data.distance);

  sessionStorage.setItem(
    cacheKey,
    data.distance.toString()
  );

  setLoadingDistance(false);

}
}
    } catch (error) {

      setLoadingDistance(false);

      console.log(error);
    } 
  };

  if (pickup && drop) {
    getDistance();
  }
}, [pickup, drop, pickupDate, returnDate, tripType]);

useEffect(() => {
  const footer = footerRef.current;

  if (!footer) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setFooterVisible(entry.isIntersecting);
    },
    {
      threshold: 0,
    }
  );

  observer.observe(footer);

  return () => observer.disconnect();
}, []);

const includedKm =
  rentalPackage === "40 KM / 4 Hrs"
    ? 40
    : rentalPackage === "80 KM / 8 Hrs"
    ? 80
    : 120;

const includedHours =
  rentalPackage === "40 KM / 4 Hrs"
    ? 4
    : rentalPackage === "80 KM / 8 Hrs"
    ? 8
    : 12;

  const cabs = [
  {
  name: "Swift Dzire",
  seats: 4,
  bags: 2,
  fuel: "CNG / Petrol",
  rate: 13,
  extraHour: 150,
  image: "/cars/dzire.jpg",

  packageFare: {
    "40 KM / 4 Hrs": 1200,
    "80 KM / 8 Hrs": 2200,
    "120 KM / 12 Hrs": 3000,
  },
  },

  {
  name: "Ertiga",
  seats: 6,
  bags: 3,
  fuel: "CNG / Petrol",
  rate: 15,
  extraHour: 250,
  image: "/ertiga.jpeg",

    packageFare: {
    "40 KM / 4 Hrs": 1500,
    "80 KM / 8 Hrs": 2500,
    "120 KM / 12 Hrs": 3100,
  },
  },

  {
  name: "Toyota Rumion",
  seats: 6,
  bags: 3,
  fuel: "CNG / Petrol",
  rate: 15,
  extraHour: 250,
  image: "/cars/rumion.png",

   packageFare: {
    "40 KM / 4 Hrs": 1600,
    "80 KM / 8 Hrs": 2600,
    "120 KM / 12 Hrs": 3200,
  },
  },

  {
  name: "Innova Crysta",
  seats: 7,
  bags: 4,
  fuel: "Diesel",
  rate: 19,
  extraHour: 350,
  image: "/cars/crysta.jpg",

  packageFare: {
    "40 KM / 4 Hrs": 3500,
    "80 KM / 8 Hrs": 4200,
    "120 KM / 12 Hrs": 5000,
  },
  },
  
];

const isNagpurAirportTransfer =
  tripType === "Airport Pick-Up & Drop" &&
  distance <= 25;

const isAirportPackageFare =
  tripType === "Airport Pick-Up & Drop" &&
  distance > 25 &&
  distance <= 60;

const isAirportOutstationFare =
  tripType === "Airport Pick-Up & Drop" &&
  distance > 60;

const sortedCabs = [...cabs].sort((a, b) => {
  if (a.name === selectedVehicle) return -1;
  if (b.name === selectedVehicle) return 1;
  return 0;
});

const isFormComplete =
  pickup.trim() !== "" &&
  drop.trim() !== "" &&
  pickupDate !== "";

  const getCabFare = (cab: typeof cabs[number]) => {
  if (!isFormComplete) return 0;

  if (isNagpurAirportTransfer) {
    if (cab.name === "Swift Dzire") return 1500;
    if (cab.name === "Ertiga" || cab.name === "Toyota Rumion") return 2000;
    return 2500;
  }

  if (isAirportPackageFare) {
    return Math.round(distance * cab.rate * 4);
  }

  if (isAirportOutstationFare) {
    return Math.round(distance * cab.rate * 2);
  }

  if (tripType === "Local Rental") {
    return cab.packageFare[
      rentalPackage as keyof typeof cab.packageFare
    ];
  }

  if (tripType === "One Way Trip" || tripType === "One Way") {
  return Math.round(distance * cab.rate * 2);
  }

if (tripType === "Outstation Trip") {

  // "distance" me already final Included KM hai:
  // short route  -> 300 KM/day minimum
  // long route   -> actual round-trip distance
  //
  // Isliye fare bhi isi displayed distance
  // ke according calculate hoga.

  return Math.round(distance * cab.rate);
}

  return Math.round(distance * cab.rate);
};

  return (
  <main className="min-h-screen bg-slate-100">
  

    {!fromHome && (

      <section className="bg-white md:bg-[#0B1F69] pt-[90px] md:pt-24 pb-0">
        <div className="w-full px-0">

          {/* Hidden Heading */}
          {false && (
          <>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center text-white tracking-wide">
          Book Your Cab
          </h1>

          <p className="text-center text-blue-100 text-sm md:text-lg mt-2 mb-8 opacity-90">
          Local • Airport • Outstation Taxi Service
        </p>
      </>
      )}

          <div className="bg-white md:bg-[#0B1F69] px-5 py-5">

{/* ================= MOBILE SEARCH ================= */}
  <div
  className="md:hidden bg-white px-4 pt-1 pb-3 -mt-3 cursor-pointer"
  onClick={() => setShowSearchModal(true)}
  >
  {/* Header */}
  <div className="flex items-center">
    {/* Back */}
    <div className="flex items-center justify-center mr-4 mt-1 text-gray-800 cursor-pointer">
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </div>

    {/* Pickup / Drop */}
    <div className="flex-1 relative">
      <div className="absolute left-[5px] top-[10px] bottom-[10px] w-[1px] bg-gray-300" />

      {/* Pickup */}
      <div className="flex items-center h-10 mb-2">
        <div className="w-3 text-gray-400 text-xs">●</div>

        <input
        type="text"
        value={pickup}
        placeholder="Pickup Location"
        readOnly
        onClick={() => setShowSearchModal(true)}
        onChange={(e) => {
        setPickup(e.target.value);
        searchLocation(e.target.value, "pickup");
        }}
        className="flex-1 ml-3 h-10 border-b border-gray-200 outline-none bg-transparent text-[15px] font-medium text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Drop */}
      <div className="flex items-center">
        <div className="w-3 text-gray-400 text-xs">●</div>

        <input
        type="text"
        value={drop}
        placeholder="Drop Location"
        readOnly
        onClick={() => setShowSearchModal(true)}
        onChange={(e) => {
        setDrop(e.target.value);
        searchLocation(e.target.value, "drop");
        }}
        className="flex-1 ml-3 h-10 border-b border-gray-200 outline-none bg-transparent text-[15px] font-medium text-gray-800 placeholder-gray-400"
        />
      </div>
    </div>

    {/* Pencil */}
    <div
      onClick={() => setShowSearchModal(true)}
      className="flex items-center justify-center ml-4 mt-1 cursor-pointer"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    </div>
  </div>

  {/* Date */}
  <div className="flex items-center mt-4 ml-7">
    <svg
      className="w-4 h-4 mr-2 text-gray-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>

    <input
      type="datetime-local"
      value={
        pickupDate && pickupTime
          ? `${pickupDate}T${pickupTime}`
          : ""
      }
      onChange={(e) => {
        const value = e.target.value;

        if (value) {
          const [date, time] = value.split("T");
          setPickupDate(date);
          setPickupTime(time);
        }
      }}
      className="appearance-none outline-none bg-transparent text-[14px] font-medium text-blue-600 [&::-webkit-calendar-picker-indicator]:hidden"
    />
  </div>
</div>


          <div
          className={`hidden md:grid md:grid-cols-[1fr_1fr_50px_1fr_1fr_1fr_180px] gap-3 items-center ${
          tripType === "Local Rental"
          ? "lg:grid-cols-7 xl:grid-cols-7"
          : "lg:grid-cols-6 xl:grid-cols-6"
          }`}
          >
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
              >
                <option>Airport Pick-Up & Drop</option>
                <option>One Way Trip</option>
                <option>Local Rental</option>
                <option>Outstation Trip</option>
              </select>

              {tripType === "Local Rental" && (
    <select
    value={rentalPackage}
    onChange={(e) => setRentalPackage(e.target.value)}
    className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
    >
    <option>40 KM / 4 Hrs</option>
    <option>80 KM / 8 Hrs</option>
    <option>120 KM / 12 Hrs</option>
  </select>
  )}

  <div className="relative">

  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
    📍
  </span>

  <input
    type="text"
    placeholder="Pickup Location"
    value={pickup}
    onChange={(e) => {
      setPickup(e.target.value);
      searchLocation(e.target.value, "pickup");
    }}
    className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white pl-12 pr-5 text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
  />

  {pickupSuggestions.length > 0 && (
    <div className="absolute z-50 bg-white border rounded-xl w-full max-h-60 overflow-y-auto shadow-lg">
      {pickupSuggestions.map((item, index) => (
        <div
          key={index}
          className="p-3 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setPickup(item);
            setPickupSuggestions([]);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

  <div className="relative">

  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
    🏁
  </span>

  <input
    type="text"
    placeholder="Drop Location"
    value={drop}
    onChange={(e) => {
      setDrop(e.target.value);
      searchLocation(e.target.value, "drop");
    }}
    className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white pl-12 pr-5 text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
  />

  {dropSuggestions.length > 0 && (
    <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl max-h-60 overflow-y-auto">

      {dropSuggestions.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer px-4 py-3 hover:bg-orange-50 transition"
          onClick={() => {
            setDrop(item);
            setDropSuggestions([]);
          }}
        >
          {item}
        </div>
      ))}

    </div>
  )}

</div>

  <div className="relative">

  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
    📅
  </span>

  <input
    type="date"
    title="Journey Date"
    value={pickupDate}
    onChange={(e) => setPickupDate(e.target.value)}
    className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white pl-12 pr-5 text-gray-800 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
  />

</div>

{tripType === "Outstation Trip" ? (
  <input
  type="date"
  title="Return Date"
  value={returnDate}
  onChange={(e) => setReturnDate(e.target.value)}
  className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white px-5 text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
/>
) : (
  <div className="relative">

    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">
      🕒
    </span>

    <input
      type="time"
      value={pickupTime}
      onChange={(e) => setPickupTime(e.target.value)}
      className="h-[58px] md:h-[64px] w-full rounded-2xl border-2 border-gray-200 bg-white pl-12 pr-5 text-gray-800 shadow-sm transition-all duration-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-100 focus:outline-none hover:border-orange-300"
    />

  </div>
)}

              <button
              disabled={loadingDistance}
              onClick={handleSearch}
              className="hidden md:flex items-center justify-center h-[64px] w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-2xl transition-all duration-300"
              >
              {loadingDistance ? "Searching..." : "🔍 Search"}
              </button>

            </div>
          </div>
        </div>
      </section>
      )}

  <section
  className="max-w-7xl mx-auto px-4 py-3 md:py-6 -mt-4 md:mt-0">
        <div className="grid lg:grid-cols-4 gap-6">

          <div className="lg:col-span-3 space-y-6">

            <div className="hidden md:block relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-2xl px-3 md:px-5 py-4 shadow-lg">

  <div className="grid grid-cols-3 md:flex md:items-center md:justify-between gap-3">

    <button
    onClick={() => setShowInfoPopup(true)}
    className="absolute top-2 right-2 md:top-3 md:right-3 z-20 w-7 h-7 md:w-9 md:h-9 rounded-full bg-white/20 hover:bg-white/30 md:border-0 border border-white/30 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110"
    >
    <Info size={14} strokeWidth={3} className="text-white md:w-[18px] md:h-[18px]"/>
    
    </button>

    {/* Verified Drivers */}
    <div className="relative flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left text-white flex-1">

      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center text-xl md:text-2xl">
        🛡️
      </div>

      <div>
        <h3 className="font-bold text-[12px] md:text-lg leading-tight">
          Verified Drivers
        </h3>

        <p className="hidden md:block text-sm text-blue-100">
          Professional & Background Checked
        </p>
      </div>

    </div>

    <div className="hidden md:block w-px h-12 bg-white/20"></div>

    {/* Free Cancellation */}
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left text-white flex-1">

      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center text-xl md:text-2xl">
        ✅
      </div>

      <div>
        <h3 className="font-bold text-[12px] md:text-lg leading-tight">
          Free Cancellation
        </h3>

        <p className="hidden md:block text-sm text-blue-100">
          Before Driver Assignment
        </p>
      </div>

    </div>

    <div className="hidden md:block w-px h-12 bg-white/20"></div>

    {/* Fixed Fare */}
    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left text-white flex-1">

      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center text-xl md:text-2xl">
        🏷️
      </div>

      <div>
        <h3 className="font-bold text-[12px] md:text-lg leading-tight">
          Fixed Fare
        </h3>

        <p className="hidden md:block text-sm text-blue-100">
          No Hidden Charges
        </p>
      </div>

    </div>

  </div>

</div>

{/* ================= MOBILE SEARCH MODAL ================= */}

{showSearchModal && (
  <div className="fixed inset-0 z-[9999] bg-black/50 flex items-start justify-center md:hidden">

    <div className="bg-white w-full rounded-b-3xl shadow-2xl p-5 relative">

      {/* Header */}
      <div className="relative flex items-center justify-center">

        <button
          onClick={() => setShowSearchModal(false)}
          className="absolute left-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold">
        {tripType} Cabs
        </h2>

      </div>

      {/* From & To Container with Swap Button */}
      <div className="relative mt-6">

        {/* From */}
        <div className="relative border rounded-xl p-3">

  <p className="text-gray-500 text-sm">
    From
  </p>

  <input
    type="text"
    value={pickup}
    placeholder="Enter Pickup Location"
    onChange={(e) => {
      setPickup(e.target.value);
      searchLocation(e.target.value, "pickup");
    }}
    className="w-full outline-none font-semibold mt-1"
  />

  {pickupSuggestions.length > 0 && (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto z-50">

      {pickupSuggestions.map((item, index) => (

        <div
          key={index}
          onClick={() => {
            setPickup(item);
            setPickupSuggestions([]);
          }}
          className="px-4 py-3 cursor-pointer hover:bg-orange-50"
        >
          {item}
        </div>

      ))}

    </div>
  )}

</div>

        {/* Swap Button */}
        <button
          type="button"
          onClick={() => {
            const temp = pickup;
            setPickup(drop);
            setDrop(temp);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 z-10"
        >
          ⇄
        </button>

        {/* To */}
        <div className="relative mt-4 border rounded-xl p-3">

  <p className="text-gray-500 text-sm">
    To
  </p>

  <input
    type="text"
    value={drop}
    placeholder="Enter Drop Location"
    onChange={(e) => {
      setDrop(e.target.value);
      searchLocation(e.target.value, "drop");
    }}
    className="w-full outline-none font-semibold mt-1"
  />

  {dropSuggestions.length > 0 && (
    <div className="absolute left-0 right-0 top-full mt-1 bg-white border rounded-xl shadow-lg max-h-52 overflow-y-auto z-50">

      {dropSuggestions.map((item, index) => (

        <div
          key={index}
          onClick={() => {
            setDrop(item);
            setDropSuggestions([]);
          }}
          className="px-4 py-3 cursor-pointer hover:bg-orange-50"
        >
          {item}
        </div>

      ))}

    </div>
  )}

</div>

      </div>

      {/* Date Time */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-sm">
            Pick-up Date
          </p>
          <input
            type="date"
            value={pickupDate}
            onChange={(e)=>setPickupDate(e.target.value)}
            className="w-full outline-none font-semibold"
          />
        </div>

        <div className="border rounded-xl p-3">
          <p className="text-gray-500 text-sm">
            Pickup-Time
          </p>
          <input
            type="time"
            value={pickupTime}
            onChange={(e)=>setPickupTime(e.target.value)}
            className="w-full outline-none font-semibold"
          />
        </div>

      </div>

      <button
      onClick={() => {
      handleSearch();
      setShowSearchModal(false);
      }}
      className="mt-6 w-full h-14 rounded-2xl bg-orange-500 text-white text-xl font-bold"
      >
      Search Modify
      </button>

    </div>

  </div>
)}

{/* ================= MOBILE FEATURE BAR ================= */}

<div className="md:hidden -mt-2 mb-4 px-1">

  <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 rounded-[18px] py-2.5 px-2 shadow-lg">

    <button
      onClick={() => setShowInfoPopup(true)}
      className="absolute right-3 top-2"
    >
      <Info
      size={14}
      className="text-white"
      />
    </button>

    <div className="grid grid-cols-3 gap-2 items-center">

      <div className="flex flex-col items-center">

        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm shadow">
          🛡️
        </div>

        <p className="text-white text-[9px] mt-1 font-medium text-center leading-3">
          Verified Drivers
        </p>

      </div>

      <div className="flex flex-col items-center">

        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm shadow">
          ✅
        </div>

        <p className="text-white text-[9px] mt-1 font-medium text-center leading-3">
          Free Cancellation
        </p>

      </div>

      <div className="flex flex-col items-center">

        <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-sm shadow">
          🏷️
        </div>

        <p className="text-white text-[9px] mt-1 font-medium text-center leading-3">
          Fixed Fare
        </p>

      </div>

    </div>

  </div>

</div>

<div className="md:hidden h-1"></div>

            {sortedCabs.map((cab, i) => (
              <div
              key={i}
              className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-4 md:px-4"
              >
                <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-3 md:gap-4">
                  <div className="flex flex-col gap-2 md:flex-row md:gap-4">
                    <div className="relative w-full h-40 md:h-32 md:w-56 flex items-center justify-center">
                      
                      <Image
                      src={cab.image}
                      alt={cab.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-contain scale-125 md:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-center mt-2 md:mt-0">

  <div className="flex flex-wrap items-center gap-2">

    <h2 className="text-xl md:text-xl font-bold text-gray-900 leading-7">
      {cab.name}
    </h2>

    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-medium">
      SEDAN
    </span>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">
      ★ 4.5
    </span>

  </div>

  <p className="text-gray-400 font-semibold mt-3">
    Or Similar
  </p>

  <div className="flex flex-wrap gap-2 mt-2">

  <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
    👤 {cab.seats} Seater
  </span>

  <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
    ❄️ AC
  </span>

  <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
    🧳 {cab.bags} Bags
  </span>

  <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
    🧼 Clean Cab
  </span>

</div>

  <div className="flex flex-wrap gap-2 mt-3">

    <span className="border border-orange-400 text-orange-500 px-2 py-1 text-xs rounded-lg">
      ⛽ {cab.fuel}
    </span>

    <span className="border border-green-500 text-green-600 px-2 py-1 text-xs rounded-lg">
      ✓ Free Cancellation
    </span>

  </div>

  <p className="text-gray-500 mt-2">

{tripType === "Local Rental" && (
  <>
    {rentalPackage} Included
  </>
)}

{tripType === "Outstation Trip" && (
  <>
    {distance} KM Included
  </>
)}

{tripType === "One Way Trip" && (
  <>
    {distance} KM Included
  </>
)}

{tripType === "Airport Pick-Up & Drop" && (
  <>
    {distance} KM Included
  </>
)}

</p>

{tripType === "Local Rental" && (
  <p className="text-xs text-red-500 mt-1">
    Extra Hour ₹{cab.extraHour}/Hour
  </p>
)}


</div>
                  
                  </div>

                  <div className="hidden md:block mt-3 md:mt-0 text-left md:text-right">

                    <p className="text-red-500 text-xs">
                    {tripType}
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold">

                    ₹{getCabFare(cab)}

                  </h3>

                  <p className="text-sm text-gray-500">
                  {tripType === "Local Rental"
                  ? `${includedKm} KM / ${includedHours} Hrs`
                  : `Distance: ${distance} KM`}
                  </p>

                  <p className="text-xs text-red-500 font-medium mt-1">
                  Toll, Parking & State Tax Extra
                  </p>

                  </div>

                </div>

<div className="border-t mt-3 pt-3">

  {/* ================= Desktop ================= */}
  <div className="hidden md:flex justify-between items-center">

    <span className="text-sm md:text-base font-semibold text-gray-700">
      Book with ₹500 Advance
    </span>

    <Link
      href={`/booking-details?vehicle=${encodeURIComponent(cab.name)}&tripType=${encodeURIComponent(tripType)}&pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}&pickupTime=${encodeURIComponent(pickupTime)}&distance=${distance}&toll=0&fare=${getCabFare(cab)}`}
      className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-6 py-3 rounded-full font-bold text-base shadow-lg transition-all duration-300"
    >
      Book Now
    </Link>

  </div>

  {/* ================= Mobile ================= */}

  <div className="md:hidden">

    <div className="flex items-center justify-between">

      <div>

        <h3 className="text-3xl font-bold">
          ₹{getCabFare(cab)}
        </h3>

        <p className="text-sm text-gray-500">
          Distance: {distance} KM
        </p>

        <p className="text-xs text-red-500 mt-1">
          Toll, Parking & State Tax Extra
        </p>

      </div>

      <Link
        href={`/booking-details?vehicle=${encodeURIComponent(cab.name)}&tripType=${encodeURIComponent(tripType)}&pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}&pickupTime=${encodeURIComponent(pickupTime)}&distance=${distance}&toll=0&fare=${getCabFare(cab)}`}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-full font-bold"
      >
        Book Now
      </Link>

    </div>

    <p className="text-center mt-3 font-semibold text-gray-700">
      Book with ₹500 Advance
    </p>

  </div>

</div>
              </div>
            ))}
          </div>

          <div>

  {/* Transfer Card */}
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden sticky md:top-28">

    {/* Map */}
<div className="overflow-hidden rounded-t-3xl">

  <iframe
    src={`https://www.google.com/maps?saddr=${encodeURIComponent(
      pickup || "Nagpur"
    )}&daddr=${encodeURIComponent(
      drop || "Amravati"
    )}&output=embed`}
    width="100%"
    className="h-[160px] md:h-[260px]"
    style={{ border: 0 }}
    loading="lazy"
  />

</div>

    <div className="p-5">

      <h3 className="text-2xl font-bold mb-5">
        Your Transfer
      </h3>

      {/* From / To */}
      <div className="grid grid-cols-2 gap-4 border-b pb-5">

        <div>
          <p className="text-green-500 text-sm font-semibold">
            ● From
          </p>

          <p className="font-bold text-gray-800 leading-6 mt-1">
            {pickup || "Nagpur, Maharashtra, India"}
          </p>
        </div>

        <div>
          <p className="text-red-500 text-sm font-semibold">
            ● To
          </p>

          <p className="font-bold text-gray-800 leading-6 mt-1">
            {drop || "Destination"}
          </p>
        </div>

      </div>

      {/* Trip Details */}

      <div className="py-5 space-y-4 border-b">

        <div className="flex items-center gap-3">
          <span className="text-xl">📅</span>

          <span className="font-medium">
            {pickupDate || "Select Date"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">🕒</span>

          <span className="font-medium">
            {distance > 0
              ? `${Math.floor(distance / 60)} hr ${Math.round(((distance / 60) % 1) * 60)} min`
              : "--"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xl">📍</span>

          <span className="font-medium">
            {distance} kms
          </span>
        </div>

      </div>

      {/* Call Button */}

      <a
        href="tel:+919172271464"
        className="mt-5 block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-xl font-bold transition"
      >
        📞 Call Now
      </a>

    </div>

  </div>

  {/* Trustpilot */}

  <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

    <h3 className="text-center text-2xl font-bold mb-6">
      Trustpilot
    </h3>

    <div className="flex justify-center gap-3">

      {[1,2,3,4,5].map((star)=>(
        <div
          key={star}
          className="w-12 h-12 rounded bg-green-500 flex items-center justify-center text-white text-2xl"
        >
          ★
        </div>
      ))}

    </div>

    <p className="text-center mt-5 text-lg font-semibold">
      Rated <b>4.8</b> | <b>12,923</b> reviews
    </p>

  </div>

</div>

</div>

</section>

{/* Why RC Tours & Travels */}
<section className="max-w-7xl mx-auto px-4 pb-12">

  <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl px-5 py-6 md:p-8">

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 leading-tight">
      Why RC Tours & Travels?
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Safety First
        </h3>

        <p className="text-gray-700 text-lg">
          Always verified drivers and 24/7 support so you're never alone on the road.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Transparent Pricing
        </h3>

        <p className="text-gray-700 text-lg">
          No hidden charges, no surge pricing and no last-minute surprises.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Clean & Premium Cabs
        </h3>

        <p className="text-gray-700 text-lg">
          Well-maintained and sanitized vehicles for a smooth travel experience.
        </p>
      </div>

    </div>

  </div>

</section>

{!footerVisible && (
  <div
    className="md:hidden fixed left-0 right-0 bottom-0 z-[99999] bg-white border-t p-3 shadow-2xl"
  >
    <button
      onClick={handleSearch}
      className="w-full h-14 rounded-xl bg-blue-600 text-white font-bold text-lg"
    >
      🔍 Search Cabs
    </button>
  </div>
)}

<div ref={footerRef}>
  <Footer />
</div>

{/* Floating Call Button */}
<div
  className={`fixed bottom-24 md:bottom-6 right-2 md:right-4 z-50 flex flex-col items-center gap-1`}
  >

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl"
  >
    📞
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-3xl md:text-4xl"
  >
    <FaWhatsapp />
  </a>

  {/* Discount Badge */}
  <div className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

{showInfoPopup && (
  <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">

    <div className="relative w-full max-w-[920px] bg-white rounded-[24px] md:rounded-[28px] shadow-2xl px-5 py-6 sm:px-6 sm:py-7 md:px-12 md:py-10">

      {/* Close */}
      <button
        onClick={() => setShowInfoPopup(false)}
        className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
      >
        <span className="text-3xl leading-none text-gray-600">×</span>
      </button>

      <h2 className="text-[28px] sm:text-[32px] md:text-[42px] font-bold leading-tight text-gray-900">
        Guaranteed On-Time Cabs!
      </h2>

      <p className="mt-2 text-[15px] md:text-[18px] leading-7 text-gray-500">
        Real-time monitoring of the allocated cab through our command centre.
      </p>

      <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">

        {/* Item 1 */}
        <div className="flex items-start gap-3 md:gap-5">

          <div className="text-sky-500 shrink-0">
            <BadgeCheck size={34} />
          </div>

          <div>
            <h3 className="text-[18px] md:text-[24px] font-semibold text-gray-900">
              Verified Cars & Drivers
            </h3>

            <p className="mt-1 text-[14px] md:text-[17px] leading-7 text-gray-600">
              Well-maintained, clean cabs with ID-verified and experienced drivers.
            </p>
          </div>

        </div>

        {/* Item 2 */}

        <div className="flex items-start gap-3 md:gap-5">

          <div className="text-blue-500 shrink-0">
            <ShieldCheck size={34} />
          </div>

          <div>

            <h3 className="text-[18px] md:text-[24px] font-semibold text-gray-900">
              All-Inclusive Pricing
            </h3>

            <p className="mt-1 text-[14px] md:text-[17px] leading-7 text-gray-600">
              No hidden charges. View complete fare breakup including kms,
              driver allowance and tolls before booking.
            </p>

          </div>

        </div>

        {/* Item 3 */}

        <div className="flex items-start gap-3 md:gap-5">

          <div className="text-blue-500 shrink-0">
            <Ticket size={34} />
          </div>

          <div>

            <h3 className="text-[18px] md:text-[24px] font-semibold text-gray-900">
              Free Cancellation & 24×7 Support
            </h3>

            <p className="mt-1 text-[14px] md:text-[17px] leading-7 text-gray-600">
              Plan easily with free cancellation and round-the-clock customer
              assistance.
            </p>

          </div>

        </div>

      </div>

      <button
        onClick={() => setShowInfoPopup(false)}
        className="mt-8 md:mt-10 h-12 md:h-14 w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-base md:text-xl font-semibold transition"
      >
        Okay, Got It!
      </button>

    </div>

  </div>
)}

    </main>
  );
}

export default function BookCabPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookCabContent />
    </Suspense>
  );
}
