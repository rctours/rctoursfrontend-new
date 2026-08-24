"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";
import AnnouncementPopup from "@/components/AnnouncementPopup";
import CampaignPopup from "@/components/CampaignPopup";
import TravelAssistantButton from "@/components/TravelAssistantButton";

import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShieldCheck,
  Fuel,
  HandCoins,
  LocateFixed,
  Headphones,
  BadgeIndianRupee,
  UserRoundCheck,
  Calculator,
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

useEffect(() => {
  if (!isMobile || isRouteHovered || routes.length === 0) {
    return;
  }

  const interval = setInterval(() => {
    setRouteIndex((prev) => {
      return (prev + 1) % routes.length;
    });
  }, 4000);

  return () => {
    clearInterval(interval);
  };
}, [isMobile, isRouteHovered]);

const [pickup, setPickup] = useState("");
const [drop, setDrop] = useState("");

const [pickupCoords, setPickupCoords] = useState<{
  lat: number;
  lon: number;
} | null>(null);

const [dropCoords, setDropCoords] = useState<{
  lat: number;
  lon: number;
} | null>(null);

const [gettingLocation, setGettingLocation] = useState(false);

type LocationSuggestion = {
  display_name: string;
  lat: string | number;
  lon: string | number;
  place_id?: string | number;
};

const [pickupSuggestions, setPickupSuggestions] =
  useState<LocationSuggestion[]>([]);

const [dropSuggestions, setDropSuggestions] =
  useState<LocationSuggestion[]>([]);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const searchAbortRef = useRef<AbortController | null>(null);

const [journeyDate, setJourneyDate] = useState("");

const [pickupTime, setPickupTime] = useState("");

const [returnDate, setReturnDate] = useState("");

const [tripType, setTripType] = useState("One Way Trip");

const [selectedVehicle, setSelectedVehicle] = useState("Swift Dzire");

const [cabType, setCabType] = useState("Sedan");

const [distance, setDistance] = useState(0);
const [fare, setFare] = useState(0);
const [loading, setLoading] = useState(false);

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Your browser does not support location access.");
    return;
  }

  setGettingLocation(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      console.log("CURRENT LOCATION LAT:", latitude);
      console.log("CURRENT LOCATION LNG:", longitude);

      try {
        const res = await fetch(
          `/api/location-search?lat=${latitude}&lon=${longitude}`
        );

       const data = await res.json();

if (data?.display_name) {
  setPickup(data.display_name);

  setPickupCoords({
    lat: Number(latitude),
    lon: Number(longitude),
  });

  console.log("CURRENT PICKUP COORDS SET:", {
    lat: Number(latitude),
    lon: Number(longitude),
  });

  setPickupSuggestions([]);
} else if (Array.isArray(data) && data.length > 0) {
  setPickup(data[0].display_name || "");

  setPickupCoords({
    lat: Number(latitude),
    lon: Number(longitude),
  });

  setPickupSuggestions([]);
} else {
  setPickup(`${latitude}, ${longitude}`);

  setPickupCoords({
    lat: Number(latitude),
    lon: Number(longitude),
  });

  setPickupSuggestions([]);
}
} catch (error) {
  console.log("Current location error:", error);

  // Agar address convert nahi hua,
  // to latitude/longitude ko pickup me save karenge.
  setPickup(`${latitude}, ${longitude}`);

  setPickupCoords({
    lat: Number(latitude),
    lon: Number(longitude),
  });

  setPickupSuggestions([]);
} finally {
  setGettingLocation(false);
}
},
(error) => {
  console.log("Location permission/error:", error);

  setGettingLocation(false);

  if (error.code === 1) {
    alert("Please allow location permission to use your current location.");
      } else if (error.code === 2) {
        alert("Unable to detect your current location.");
      } else if (error.code === 3) {
        alert("Location request timed out. Please try again.");
      } else {
        alert("Unable to get your current location.");
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0,
    }
  );
};

const searchLocation = (
  text: string,
  type: "pickup" | "drop"
) => {
  // Previous typing timer cancel
  if (searchTimeoutRef.current) {
    clearTimeout(searchTimeoutRef.current);
  }

  // Previous API request cancel
  if (searchAbortRef.current) {
    searchAbortRef.current.abort();
  }

  const query = text.trim();

  // Empty search
  if (!query) {
    if (type === "pickup") {
      setPickupSuggestions([]);
    } else {
      setDropSuggestions([]);
    }

    return;
  }

  // Customer typing stop karne ke baad search
  searchTimeoutRef.current = setTimeout(async () => {
    // New request controller
    const controller = new AbortController();

    searchAbortRef.current = controller;

    try {
      const res = await fetch(
        `/api/location-search?q=${encodeURIComponent(query)}`,
        {
          signal: controller.signal,
        }
      );

      if (!res.ok) {
        throw new Error("Location search failed");
      }

      const data = await res.json();

      const results: LocationSuggestion[] =
        Array.isArray(data) ? data : [];

      // Sirf latest search result show hoga
      if (!controller.signal.aborted) {
        if (type === "pickup") {
          setPickupSuggestions(results);
        } else {
          setDropSuggestions(results);
        }
      }
    } catch (error: any) {
      // Abort error normal hai
      if (error?.name === "AbortError") {
        return;
      }

      console.log("Location search error:", error);

      if (type === "pickup") {
        setPickupSuggestions([]);
      } else {
        setDropSuggestions([]);
      }
    }
  }, 350);
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
      pickupCoords,
      dropCoords,
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
  ["Wardha","₹1824"],
  ["Amravati","₹3803"],
  ["Chandrapur","₹4088"],
  ["Bhandara","₹1802"],
  ["Gondia","₹3495"],
  ["Tadoba","₹2528"],
  ["Pench","₹3165"],
  ["Chikhaldara","₹5451"],
  ["Shegaon","₹7056"],
  ["Shirdi","₹12155"],
  ["Pune","₹14968"],
  ["Hyderabad","₹10924"],
];

const reviews = [
  {
    name: "Bhairavi Sarpatwar",
    image: "/reviews/bhairavi sarpatwar.webp",
    review:
      "Comfortable vehicles.....polite and trained drivers.....keep it up....nice experience with RC Tours & Travels 👍👍",
    time: "4 weeks ago",
  },

  {
    name: "Mahesh Kulkarni",
    image: "/reviews/mahesh kulkarni.webp",
    review:
      "I have booked Cab with RC for one day tour to Ramtek including Nagpur points. Cab service was good, clean and comfortable.",
    time: "15 weeks ago",
  },

  {
    name: "Shaikh Naeem",
    image: "/reviews/shaikh naeem.webp",
    review:
      "I had a fantastic experience! Vicky Janpat displayed excellent driving skills, ensuring a smooth and comfortable journey.",
    time: "19 weeks ago",
  },

  {
    name: "Rakesh Juneja",
    image: "/reviews/rakesh juneja.webp",
    review:
      "Good service. Nice behaviour. Very co-operative. Neat, clean, punctual. Highly recommend.",
    time: "21 weeks ago",
  },

  {
    name: "Durgesh Gumgaokar",
    image: "/reviews/durgesh gumgaokar.webp",
    review:
      "I booked my Jabalpur trip from Nagpur with RC Tours & Travels, and the entire experience was truly wonderful.",
    time: "21 weeks ago",
  },

  {
    name: "Divyanshu Singh",
    image: "/reviews/divyanshu singh.webp",
    review:
      "Thank you RC Tours and Travels and Rupesh ji for an excellent experience. Our driver Vicky was very polite and experienced.",
    time: "22 weeks ago",
  },

  {
    name: "Alluri Rakesh",
    image: "/reviews/alluri rakesh.webp",
    review:
      "Simply superb service, comfortable ride till the end. Thank you for your services.",
    time: "22 weeks ago",
  },

  {
    name: "Sarnam Singh Kurra",
    image: "/reviews/sarnam singh kurra.webp",
    review:
      "Nice experience with RC Tours and Travels. The driver was nice and the car was totally clean. Overall very good service.",
    time: "30 weeks ago",
  },

  {
    name: "Kishor Kumar Nayak",
    image: "/reviews/kishor kumar nayak.webp",
    review:
      "I'm traveling with RC Tours and Travels and had the best experience with the driver and supportive RC Tours team. Thank you so much 🙏🏻",
    time: "30 weeks ago",
  },

  {
    name: "Binayak Sarkar",
    image: "/reviews/binayak sarkar.webp",
    review:
      "Very good behaviour and polite in nature.",
    time: "30 weeks ago",
  },

  {
    name: "Vineet Goyal",
    image: "/reviews/vineet goyal.webp",
    review:
      "We rented an Ertiga car with RC Tours and Travels. The car was neat and clean, in good condition, and the driver was polite.",
    time: "30 weeks ago",
  },

  {
    name: "Kishor Gund",
    image: "/reviews/kishor gund.webp",
    review:
      "Aniket is a very good driver. He is very cooperative and soft spoken person.",
    time: "32 weeks ago",
  },

  {
    name: "Mukund Sangolkar",
    image: "/reviews/mukund sangolkar.webp",
    review:
      "Very good service.",
    time: "32 weeks ago",
  },

  {
    name: "Raj Kumar Ghasal",
    image: "/reviews/raj kumar ghasal.webp",
    review:
      "Excellent service, on-time pickup and drop.",
    time: "35 weeks ago",
  },

  {
    name: "Nitin Mohane",
    image: "/reviews/nitin.webp",
    review:
      "Literally one of the best travel experiences. The ambience of the car, professionalism, safety, punctuality and comfort were outstanding. Truly one of the best travel experiences with great expertise and travel knowledge.",
    time: "35 weeks ago",
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

const banners = [
  {
    badge: "POPULAR",
    titleNormal: "Planning an",
    titleHighlight: "Outstation Trip?",
    subtext:
      "Travel comfortably from Nagpur with professional drivers and well-maintained vehicles.",
    buttonText: "Book Outstation Cab",
    tripType: "Outstation Trip",
    images: [
      "https://images.unsplash.com/photo-1585135497277-ee4e19597172?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    badge: "24×7 SERVICE",
    titleNormal: "Need a Quick",
    titleHighlight: "Airport Cab?",
    subtext:
      "Reliable airport pickup and drop service with comfortable rides and on-time travel.",
    buttonText: "Book Airport Cab",
    tripType: "Airport Pick-Up & Drop",
    images: [
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=80",
    ],
  },

  {
    badge: "WEEKEND SPECIAL",
    titleNormal: "Planning a",
    titleHighlight: "Weekend Getaway?",
    subtext:
      "Explore Tadoba, Pench, Chikhaldara and more amazing destinations from Nagpur.",
    buttonText: "Explore Tour Packages",
    tripType: "Outstation Trip",
    images: [
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1511497584788-876761197069?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    ],
  },
];

const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
  const timer = setInterval(() => {
    setCurrentIndex((prevIndex) => {
      return (prevIndex + 1) % banners.length;
    });
  }, 4000);

  return () => clearInterval(timer);
}, []);

const banner = banners[currentIndex];

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
    `&fare=${fare}` +
    `&pickupLat=${pickupCoords?.lat ?? ""}` +
    `&pickupLon=${pickupCoords?.lon ?? ""}` +
    `&dropLat=${dropCoords?.lat ?? ""}` +
    `&dropLon=${dropCoords?.lon ?? ""}`;
}

console.log("bookCabUrl:", bookCabUrl);
console.log("tripType:", tripType);
console.log("pickup:", pickup);
console.log("drop:", drop);
console.log("journeyDate:", journeyDate);
console.log("pickupCoords:", pickupCoords);
console.log("dropCoords:", dropCoords);

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
<section className="relative overflow-visible bg-gradient-to-br from-[#051336] via-[#09225c] to-[#08348a] pt-6 pb-12 md:pt-12 md:pb-20">

  {/* Background Glow Effects */}
  <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />
  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/15 blur-[160px] rounded-full pointer-events-none" />

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Top Grid Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

      {/* Left Content (Desktop par full, Mobile par compact & SEO strong) */}
      <div className="lg:col-span-7 text-left">

        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-md text-xs sm:text-sm font-semibold text-cyan-200 shadow-sm mb-4 lg:mb-6">
          <span className="text-sm sm:text-base">👑</span>
          #1 Taxi Service in Nagpur
        </div>

        {/* Main Heading */}
        <h1 className="font-extrabold tracking-tight text-2xl sm:text-5xl md:text-[55px] text-white leading-tight">
          Book Your Cab{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
            from Nagpur
          </span>
        </h1>

        {/* SEO Supporting Text */}
        <p className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg text-blue-200/80 font-medium">
          Book trusted taxi service in Nagpur for local travel, airport pickup and drop,
          one way cab and outstation taxi bookings with RC Tours & Travels. Enjoy safe
          rides, professional drivers, affordable fares and 24×7 cab booking from Nagpur.
        </p>

      </div>

      {/* Right Car Image (Desktop Only) */}
      <div className="lg:col-span-5 hidden lg:flex justify-center relative">
        <div className="relative w-full max-w-lg">
          <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-full blur-sm scale-95 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
          <img
            src="/car-hero.webp"
            alt="RC Tours & Travels Cab"
            className="relative z-10 w-full object-contain drop-shadow-2xl"
          />
        </div>
      </div>

    </div>


{/* ================= TRIP TYPE BUTTONS ================= */}
<div className="relative z-20 w-full mt-4 mb-3">

  {/* Desktop */}
  <div className="hidden sm:flex w-full justify-center">
    <div className="flex items-center justify-center gap-2 sm:gap-3">

      {[
        {
          type: "Airport Pick-Up & Drop",
          label: "Airport",
        },
        {
          type: "One Way Trip",
          label: "Outstation One-Way",
        },
        {
          type: "Outstation Trip",
          label: "Outstation Round-Trip",
        },
        {
          type: "Local Rental",
          label: "Hourly Rental",
        },
      ].map((item) => {
        const isActive = tripType === item.type;

        return (
          <button
            key={item.type}
            type="button"
            onClick={() => setTripType(item.type)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-[#5068a8] to-[#3d568f] text-white shadow-lg ring-2 ring-white/20"
                : "bg-white/95 text-gray-800 shadow-md hover:bg-white"
            }`}
          >
            <span
              className={`h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center ${
                isActive
                  ? "border-white bg-white/10"
                  : "border-gray-400"
              }`}
            >
              {isActive && (
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </span>

            {item.label}
          </button>
        );
      })}

    </div>
  </div>


{/* ================= MOBILE - ALL 4 IN ONE LINE ================= */}
<div className="grid sm:hidden grid-cols-4 w-full gap-1 px-0">

  {[
    {
      type: "Airport Pick-Up & Drop",
      label: "Airport",
    },
    {
      type: "One Way Trip",
      label: "One-Way",
    },
    {
      type: "Outstation Trip",
      label: "Round-Trip",
    },
    {
      type: "Local Rental",
      label: "Hourly",
    },
  ].map((item) => {
    const isActive = tripType === item.type;

    return (
      <button
        key={item.type}
        type="button"
        onClick={() => setTripType(item.type)}
        className={`w-full min-w-0 h-9 flex items-center justify-center gap-1 rounded-lg px-1 text-[9px] font-semibold whitespace-nowrap transition-all duration-200 ${
          isActive
            ? "bg-gradient-to-r from-[#5068a8] to-[#3d568f] text-white shadow-lg ring-1 ring-white/20"
            : "bg-white/95 text-gray-700 shadow-md"
        }`}
      >
        <span
          className={`hidden min-[380px]:flex h-3 w-3 shrink-0 rounded-full border items-center justify-center ${
            isActive
              ? "border-white bg-white/10"
              : "border-gray-400"
          }`}
        >
          {isActive && (
            <span className="w-1 h-1 rounded-full bg-white" />
          )}
        </span>

        <span className="truncate">
          {item.label}
        </span>
      </button>
    );
  })}

</div>

</div>


{/* ================= BOOKING BAR ================= */}
<div
  id="book-ride"
  className="relative z-[100] bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/20 p-3.5 sm:p-6 border border-white/20"
>
  <div
    className={`grid gap-3 sm:gap-4 items-end ${
      tripType === "Outstation Trip"
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-7"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6"
    }`}
  >

    {/* Pickup */}
    <div className="relative">
      <label className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide">
        📍 Pickup
      </label>

      <div className="relative">
        <input
          type="text"
          value={pickup}
          onChange={(e) => {
            setPickup(e.target.value);
            searchLocation(e.target.value, "pickup");
          }}
          placeholder="Pickup Location"
          className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 pl-3.5 pr-12 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
        />

        <button
          type="button"
          onClick={getCurrentLocation}
          disabled={gettingLocation}
          title={
            gettingLocation
              ? "Getting your location..."
              : "Use current location"
          }
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 transition disabled:opacity-50"
        >
          <LocateFixed size={16} strokeWidth={2.3} />
        </button>
      </div>

      {pickupSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-52 overflow-y-auto z-[9999] divide-y divide-gray-50">
          {pickupSuggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setPickup(item.display_name);
                setPickupCoords({
                  lat: Number(item.lat),
                  lon: Number(item.lon),
                });
                setPickupSuggestions([]);
              }}
              className="px-3.5 py-2.5 cursor-pointer hover:bg-cyan-50/70 text-xs sm:text-sm text-gray-800 transition-colors"
            >
              📍 {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Drop */}
    <div className="relative">
      <label className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide">
        📍 Drop
      </label>

      <input
        type="text"
        value={drop}
        onChange={(e) => {
          setDrop(e.target.value);
          searchLocation(e.target.value, "drop");
        }}
        placeholder="Drop Location"
        className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 text-xs sm:text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
      />

      {dropSuggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 rounded-xl shadow-2xl max-h-52 overflow-y-auto z-[9999] divide-y divide-gray-50">
          {dropSuggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setDrop(item.display_name);
                setDropCoords({
                  lat: Number(item.lat),
                  lon: Number(item.lon),
                });
                setDropSuggestions([]);
              }}
              className="px-3.5 py-2.5 cursor-pointer hover:bg-cyan-50/70 text-xs sm:text-sm text-gray-800 transition-colors"
            >
              📍 {item.display_name}
            </div>
          ))}
        </div>
      )}
    </div>

{/* Journey Date */}
<div>
  <label
    htmlFor="journey-date"
    className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide"
  >
    📅 Date
  </label>

  <input
    id="journey-date"
    type="date"
    value={journeyDate}
    onChange={(e) => setJourneyDate(e.target.value)}
    className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
  />
</div>

{/* Return Date */}
{tripType === "Outstation Trip" && (
  <div>
    <label
      htmlFor="return-date"
      className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide"
    >
      🔁 Return
    </label>

    <input
      id="return-date"
      type="date"
      value={returnDate}
      onChange={(e) => setReturnDate(e.target.value)}
      className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
    />
  </div>
)}

    {/* Pickup Time */}
    <div>
      <label className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide">
        🕒 Time
      </label>

      <input
        type="time"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
        className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
      />
    </div>

    {/* Vehicle */}
    <div>
      <label className="text-[11px] sm:text-xs font-bold text-gray-700 mb-1 block tracking-wide">
        🚘 Vehicle
      </label>

      <select
        value={cabType}
        onChange={(e) => {
          const value = e.target.value;

          setCabType(value);

          if (value === "Sedan") {
            setSelectedVehicle("Swift Dzire");
          } else if (value === "Ertiga") {
            setSelectedVehicle("Ertiga");
          } else if (value === "Toyota Rumion") {
            setSelectedVehicle("Toyota Rumion");
          } else if (
            value === "Innova" ||
            value === "Innova Crysta"
          ) {
            setSelectedVehicle("Innova Crysta");
          } else if (value === "Tempo Traveller 13") {
            setSelectedVehicle("Tempo Traveller 13");
          } else if (value === "Tempo Traveller 17") {
            setSelectedVehicle("Tempo Traveller 17");
          } else if (value === "Urbania 17") {
            setSelectedVehicle("Urbania 17");
          }
        }}
        className="w-full h-11 sm:h-12 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all"
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

    {/* Book Button */}
    <div>
      <label className="text-xs font-bold text-transparent mb-1 block select-none hidden lg:block">
        Action
      </label>

      <Link
        href={
          !pickup || !drop || !journeyDate
            ? "#"
            : bookCabUrl
        }
        onClick={async (e) => {
          e.preventDefault();

          if (!pickup || !drop || !journeyDate) {
            alert(
              "Please enter Pickup, Drop and Journey Date"
            );
            return;
          }

          const result = await calculateFare();

          if (!result) return;

          window.location.href =
            `/book-cab?vehicle=${encodeURIComponent(
              selectedVehicle
            )}` +
            `&tripType=${encodeURIComponent(tripType)}` +
            `&pickup=${encodeURIComponent(pickup)}` +
            `&drop=${encodeURIComponent(drop)}` +
            `&journeyDate=${journeyDate}` +
            `&pickupTime=${pickupTime}` +
            `&returnDate=${returnDate}` +
            `&distance=${result.distance}` +
            `&fare=${result.fare}` +
            `&pickupLat=${pickupCoords?.lat ?? ""}` +
            `&pickupLon=${pickupCoords?.lon ?? ""}` +
            `&dropLat=${dropCoords?.lat ?? ""}` +
            `&dropLon=${dropCoords?.lon ?? ""}`;
        }}
        className="w-full h-11 sm:h-12 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-600 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        🚖 Book Now →
      </Link>
    </div>

  </div>
</div>

{/* ================= TRUST CARDS ================= */}
<div className="grid grid-cols-5 gap-1.5 sm:grid-cols-2 lg:grid-cols-5 sm:gap-4 mt-4">

  {[
    {
      title: "Trusted & Safe",
      desc: "100% Secure Journey",
      icon: <ShieldCheck />,
    },
    {
      title: "24×7 Support",
      desc: "Always Available",
      icon: <Headphones />,
    },
    {
      title: "Best Price",
      desc: "No Hidden Charges",
      icon: <BadgeIndianRupee />,
    },
    {
      title: "Professional Drivers",
      desc: "Verified & Trained",
      icon: <UserRoundCheck />,
    },
    {
      title: "Fare Calculator",
      desc: "Calculate Fare",
      icon: <Calculator />,
      link: "/fare-calculator",
    },
  ].map((item, idx) => {

    const cardContent = (
      <>
        {/* Icon */}
        <div
          className="
            w-7 h-7
            sm:w-10 sm:h-10
            rounded-md sm:rounded-xl
            bg-cyan-500/20
            flex
            items-center
            justify-center
            text-cyan-300
            shrink-0
          "
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5">
            {item.icon}
          </div>
        </div>

        {/* Text */}
        <div className="min-w-0">

          <h4
            className="
              text-white
              font-bold
              text-[8px] sm:text-sm
              leading-tight
              truncate
            "
          >
            {item.title}
          </h4>

          <p
            className="
              text-blue-200/70
              text-[7px] sm:text-xs
              leading-tight
              mt-0.5
              truncate
            "
          >
            {item.desc}
          </p>

        </div>
      </>
    );

    return item.link ? (

      <Link
        key={idx}
        href={item.link}
        aria-label="Open Fare Calculator"
        className="
          bg-cyan-500/20
          border
          border-cyan-400/40
          rounded-lg sm:rounded-2xl
          p-1.5 sm:p-4
          flex
          flex-col sm:flex-row
          items-center
          justify-center sm:justify-start
          text-center sm:text-left
          gap-1 sm:gap-3
          backdrop-blur-md
          min-w-0
          cursor-pointer
          transition-all
          duration-300
          hover:bg-cyan-500/30
          hover:border-cyan-300
          hover:scale-[1.03]
          active:scale-95
        "
      >
        {cardContent}
      </Link>

    ) : (

      <div
        key={idx}
        className="
          bg-white/5
          border
          border-white/10
          rounded-lg sm:rounded-2xl
          p-1.5 sm:p-4
          flex
          flex-col sm:flex-row
          items-center
          justify-center sm:justify-start
          text-center sm:text-left
          gap-1 sm:gap-3
          backdrop-blur-md
          min-w-0
        "
      >
        {cardContent}
      </div>

    );

  })}

</div>

</div>
</section>

{/* ================= ADMIN CAMPAIGN BANNER SECTION ================= */}
<CampaignPopup />


{/* ================= POPULAR ROUTES SECTION ================= */}
<section className="relative bg-[#f5f6f8] pt-6 pb-10 md:pt-10 md:pb-14 text-black overflow-hidden">
  <div className="max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-10">

    {/* Section Heading */}
    <div className="text-center mb-6 md:mb-10">
      <p className="text-cyan-700 uppercase tracking-[4px] md:tracking-[6px] text-[10px] md:text-xs font-bold mb-2">
        Most Booked Routes
      </p>

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-gray-900 leading-tight">
        Popular Routes From Nagpur
      </h2>

      <p className="text-center text-xs sm:text-sm md:text-base text-gray-600 mt-2">
        Affordable One Way & Round Trip Taxi Service
      </p>
    </div>

    {/* Route Description */}
    <div className="max-w-5xl mx-auto text-center mb-8 md:mb-12">
      <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-6 md:leading-7">
        Looking for a reliable taxi service from Nagpur? RC Tours & Travels
        provides safe and affordable cab services for airport transfers,
        local travel, outstation trips, and tour packages. Travel comfortably
        to Tadoba, Pench, Wardha, Chandrapur, Pune, Hyderabad, Shirdi, and
        other destinations with professional drivers, clean vehicles, and
        transparent pricing.
      </p>
    </div>

    {/* Slider Container */}
    <div className="relative max-w-[1450px] mx-auto px-2 md:px-12">

      {/* Desktop Left Arrow */}
      <button
        type="button"
        onClick={() =>
          setRouteIndex((prev) =>
            prev === 0 ? routes.length - 1 : prev - 1
          )
        }
        className="hidden md:flex absolute -left-2 lg:-left-4 top-[42%] -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-gray-200 shadow-xl items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
        aria-label="Previous Route"
      >
        <ChevronLeft size={28} strokeWidth={2} />
      </button>

      {/* Desktop Right Arrow */}
      <button
        type="button"
        onClick={() =>
          setRouteIndex((prev) =>
            prev === routes.length - 1 ? 0 : prev + 1
          )
        }
        className="hidden md:flex absolute -right-2 lg:-right-4 top-[42%] -translate-y-1/2 z-30 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white border border-gray-200 shadow-xl items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300"
        aria-label="Next Route"
      >
        <ChevronRight size={28} strokeWidth={2} />
      </button>

      {/* Desktop 4 Cards */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        {[0, 1, 2, 3].map((offset) => {
          const route = routes[(routeIndex + offset) % routes.length];

          const routeImages: Record<string, string> = {
            Tadoba: "/tadoba.webp",
            Pench: "/pench.webp",
            Wardha: "/wardha.webp",
            Pune: "/pune.webp",
            Hyderabad: "/hyderabad.webp",
            Mumbai: "/mumbai.webp",
            Shirdi: "/shirdi.webp",
            Amravati: "/amravati.webp",
            Bhandara: "/bhandara.webp",
            Shegaon: "/shegaon.JPG.webp",
            Chandrapur: "/chandarapur.webp",
            Gondia: "/gondia.webp",
          };

          const routeImage =
            routeImages[route[0]] ||
            route[2] ||
            "/outstation-travel.webp";

          return (
            <div
              key={`${route[0]}-${offset}`}
              onMouseEnter={() => setIsRouteHovered(true)}
              onMouseLeave={() => setIsRouteHovered(false)}
              className="relative group flex flex-col justify-end"
            >
              {/* Image Card */}
              <div className="relative h-[250px] lg:h-[280px] rounded-[36px] overflow-hidden shadow-xl">
                <img
                  src={routeImage}
                  alt={`Nagpur to ${route[0]}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating White Content Card */}
              <div className="relative z-10 -mt-16 mx-3.5 bg-white rounded-[24px] p-3.5 lg:p-4 shadow-2xl border border-gray-100 flex flex-col justify-between">
                <h3 className="text-sm lg:text-base font-black text-gray-900 tracking-tight flex items-center gap-1 flex-wrap">
                  <span>Nagpur</span>
                  <span className="text-gray-400 font-normal text-xs">
                    to
                  </span>
                  <span className="text-gray-900 truncate">
                    {route[0]}
                  </span>
                </h3>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Starting From
                    </p>

                    <p className="text-sm lg:text-base font-black text-gray-900 mt-0.5">
                      {route[1]}
                    </p>
                  </div>

                  <Link
                    href={`/book-cab?tripType=${encodeURIComponent(
                    "One Way Trip"
                    )}&pickup=${encodeURIComponent(
                    "Nagpur"
                    )}&drop=${encodeURIComponent(route[0])}`}
                    className="h-9 px-3.5 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all hover:scale-105 shrink-0"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Single Card */}
      <div className="md:hidden">
        {(() => {
          const route = routes[routeIndex];

          const routeImages: Record<string, string> = {
            Tadoba: "/tadoba.webp",
            Pench: "/pench.webp",
            Wardha: "/wardha.webp",
            Pune: "/pune.webp",
            Hyderabad: "/hyderabad.webp",
            Mumbai: "/mumbai.webp",
            Shirdi: "/shirdi.webp",
            Amravati: "/amravati.webp",
            Bhandara: "/bhandara.webp",
            Shegaon: "/shegaon.JPG.webp",
            Chandrapur: "/chandarapur.webp",
            Gondia: "/gondia.webp",
          };

          const routeImage =
            routeImages[route?.[0]] ||
            route?.[2] ||
            "/outstation-travel.webp";

          return (
            <div className="relative max-w-sm mx-auto">
              {/* Mobile Image */}
              <div className="relative h-[260px] rounded-[36px] overflow-hidden shadow-xl">
                <img
                  src={routeImage}
                  alt={`Nagpur to ${route?.[0] || ""}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Mobile Floating Card */}
              <div className="relative z-10 -mt-16 mx-4 bg-white rounded-[24px] p-4 shadow-2xl border border-gray-100">
                <h3 className="text-base font-black text-gray-900 tracking-tight flex items-center gap-1 flex-wrap">
                  <span>Nagpur</span>

                  <span className="text-gray-400 font-normal text-xs">
                    to
                  </span>

                  <span className="text-gray-900 truncate">
                    {route?.[0]}
                  </span>
                </h3>

                <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">
                      Starting From
                    </p>

                    <p className="text-sm font-black text-gray-900 mt-0.5">
                      {route?.[1]}
                    </p>
                  </div>

                  <Link
                    href={`/book-cab?tripType=${encodeURIComponent(
                    "One Way Trip"
                    )}&pickup=${encodeURIComponent(
                    "Nagpur"
                    )}&drop=${encodeURIComponent(route?.[0] || "")}`}
                    className="h-9 px-3.5 rounded-xl flex items-center justify-center text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 shrink-0"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>

              {/* Mobile Navigation */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={() =>
                    setRouteIndex((prev) =>
                      prev === 0 ? routes.length - 1 : prev - 1
                    )
                  }
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-blue-600"
                  aria-label="Previous Route"
                >
                  <ChevronLeft size={22} />
                </button>

                <div className="flex items-center gap-1.5 max-w-[180px] overflow-hidden">
                  {routes.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRouteIndex(index)}
                      className={`rounded-full transition-all duration-300 ${
                        index === routeIndex
                          ? "w-5 h-2 bg-blue-600"
                          : "w-2 h-2 bg-gray-300"
                      }`}
                      aria-label={`Go to route ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setRouteIndex((prev) =>
                      prev === routes.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-blue-600"
                  aria-label="Next Route"
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  </div>
</section>

{/* Local Rental Packages */}

<section
  id="local-rental"
  className="pt-0 pb-2 md:pb-4 bg-white text-black"
>

  <div className="bg-gray-50 border border-gray-200 rounded-3xl p-5 md:p-10">

    <p className="text-cyan-700 uppercase tracking-[6px] text-center mb-3">
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
      src="/swift-dzire.webp"
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
      src="/ertiga.webp"
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
      src="/innova-crysta.webp"
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
          src="/fleet1.webp"
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
          src="/driver.webp"
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
          src="/service.webp"
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
          src="/pricing.webp"
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
      prev === reviews.length - 1 ? 0 : prev + 1
    )
  }
  aria-label="Next review"
  className="w-10 h-10 rounded-full bg-cyan-500 text-white shadow-lg active:scale-95 transition"
  >
  <ChevronRight className="mx-auto" size={18} />
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
            src={review.image}
            alt={review.name}
            width={60}
            height={60}
            className="w-[60px] h-[60px] rounded-full object-cover"
            onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            review.name
            )}&background=0ea5e9&color=fff&size=128`;
            }}
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
              src="/google.webp"
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
<section className="-mt-6 pt-2 pb-6 md:-mt-8 md:pt-4 md:pb-8 bg-white text-black">

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

      <p className="text-cyan-700 uppercase tracking-[5px] mb-3">
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
  aria-label="Chat on WhatsApp"
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

      {/* Campaign Popup - Home Page */}
      <CampaignPopup />

    </main>
  </>
);
}
