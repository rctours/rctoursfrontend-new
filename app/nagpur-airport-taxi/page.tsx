

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  CalendarCheck,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronRight,
  Clock,
  Headphones,
  MapPin,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  ChevronLeft,
  WalletCards,
  UserRoundCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

/* =========================================================
   TYPES
========================================================= */

type TripType = "airport" | "oneway" | "roundtrip" | "hourly";

type LocationType = "pickup" | "drop";

type LocationResult = {
  name?: string;
  display_name?: string;
  full_address?: string;
  lat?: number | string;
  lon?: number | string;
};

/* =========================================================
   BUSINESS CONSTANTS
========================================================= */

const PHONE = "+919172271464";

const WHATSAPP_URL = "https://wa.me/919172271464";

const WEBSITE_URL = "https://www.rctoursandtravels.in";

const PAGE_URL = `${WEBSITE_URL}/nagpur-airport-taxi`;

/* =========================================================
   VEHICLE RATES
   Keep aligned with existing fare flow.
========================================================= */

const vehicleRates: Record<string, number> = {
  "Sedan (Dzire / Etios)": 11,
  "SUV (Ertiga)": 13,
  "Toyota Rumion": 13,
  "Innova Crysta": 17,
  "Tempo Traveller": 25,
  "Force Urbania": 40,
};

const vehicles = Object.keys(vehicleRates);

/* =========================================================
   HOURLY PACKAGES
========================================================= */

const hourlyPackages = [
  {
    id: "4hr-40km",
    label: "4 Hr / 40 KM",
    hours: 4,
    km: 40,
  },
  {
    id: "6hr-60km",
    label: "6 Hr / 60 KM",
    hours: 6,
    km: 60,
  },
  {
    id: "8hr-80km",
    label: "8 Hr / 80 KM",
    hours: 8,
    km: 80,
  },
  {
    id: "12hr-120km",
    label: "12 Hr / 120 KM",
    hours: 12,
    km: 120,
  },
];

/* =========================================================
   FLEET
========================================================= */

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.webp",
    vehicleValue: "Sedan (Dzire / Etios)",
    text: "Comfortable sedan for local and everyday travel.",
  },
  {
    name: "Ertiga",
    image: "/ertiga.webp",
    vehicleValue: "SUV (Ertiga)",
    text: "Spacious family MPV for comfortable city journeys.",
  },
  {
    name: "Toyota Rumion",
    image: "/cars/rumion.webp",
    vehicleValue: "Toyota Rumion",
    text: "Practical family vehicle for longer local requirements.",
  },
  {
    name: "Innova Crysta",
    image: "/cars/crysta.webp",
    vehicleValue: "Innova Crysta",
    text: "Premium comfort for business and family travel.",
  },
];

/* =========================================================
   NAGPUR SERVICE AREAS
========================================================= */

const areas = [
  "Dighori",
  "Manish Nagar",
  "Wardha Road",
  "Sitabuldi",
  "Dharampeth",
  "Medical Square",
  "Hingna",
  "Sadar",
  "Civil Lines",
  "Trimurti Nagar",
  "Besa",
  "MIHAN",
];

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  [
    "Do you provide airport taxi service in Nagpur?",
    "Yes. RC Tours & Travels provides airport taxi and cab services across Nagpur for city travel, meetings, shopping, family trips, events and multiple-stop journeys.",
  ],
  [
    "Which local rental packages are available?",
    "Local rental options include 4 Hr / 40 KM, 6 Hr / 60 KM, 8 Hr / 80 KM and 12 Hr / 120 KM packages, subject to vehicle availability and applicable booking terms.",
  ],
  [
    "Can I choose the vehicle myself?",
    "Yes. Customers can select from sedan, MPV, premium and larger vehicle options according to passenger count and travel requirements.",
  ],
  [
    "Can I book airport, one-way and round-trip travel from this page?",
    "Yes. The booking panel supports Airport, Outstation One-Way, Outstation Round-Trip and Hourly Rental modes.",
  ],
  [
    "Can I book an hourly taxi for multiple stops?",
    "Yes. Hourly rental is suitable for multiple local stops, meetings, shopping, appointments, events and extended city travel.",
  ],
  [
    "Can I book through WhatsApp or phone?",
    "Yes. Customers can use the WhatsApp or phone buttons to check availability and confirm booking details.",
  ],
];

/* =========================================================
   TODAY
========================================================= */

const getTodayString = () => {
  const date = new Date();

  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  return localDate.toISOString().split("T")[0];
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function NagpurAirportTaxiPage() {
  const [tripType, setTripType] = useState<TripType>("airport");

    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [pickup, setPickup] = useState("");

  const [drop, setDrop] = useState("");

  const [journeyDate, setJourneyDate] = useState(getTodayString());

  const [journeyTime, setJourneyTime] = useState("");

  const [returnDate, setReturnDate] = useState("");

  const [vehicle, setVehicle] = useState("Sedan (Dzire / Etios)");

  const [selectedPackage, setSelectedPackage] =
    useState("4hr-40km");

  const [loading, setLoading] = useState(false);

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

  const [reviewIndex, setReviewIndex] = useState(0);
const [isMobile, setIsMobile] = useState(false);
const [isReviewHovered, setIsReviewHovered] = useState(false);

useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  checkMobile();

  window.addEventListener("resize", checkMobile);

  return () => {
    window.removeEventListener("resize", checkMobile);
  };
}, []);

  const [pickupResults, setPickupResults] = useState<
    LocationResult[]
  >([]);

  const [dropResults, setDropResults] = useState<
    LocationResult[]
  >([]);

  const [activeSearch, setActiveSearch] =
    useState<LocationType | null>(null);

  const pickupCoords = useRef<{
    lat: number;
    lon: number;
  } | null>(null);

  const dropCoords = useRef<{
    lat: number;
    lon: number;
  } | null>(null);

  const searchTimer = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const controller = useRef<AbortController | null>(null);

  /* =======================================================
     SELECTED HOURLY PACKAGE
  ======================================================= */

  const selectedHourlyPackage = useMemo(
    () =>
      hourlyPackages.find(
        (pkg) => pkg.id === selectedPackage
      ) ?? hourlyPackages[0],
    [selectedPackage]
  );

  /* =======================================================
     ROUND TRIP RETURN DATE
  ======================================================= */

  useEffect(() => {
    if (
      tripType === "roundtrip" &&
      journeyDate &&
      (!returnDate || returnDate < journeyDate)
    ) {
      setReturnDate(journeyDate);
    }

    if (tripType !== "roundtrip") {
      setReturnDate("");
    }
  }, [tripType, journeyDate, returnDate]);

  /* =======================================================
     LOCATION SEARCH
  ======================================================= */

  const searchLocation = (
    value: string,
    type: LocationType
  ) => {
    if (type === "pickup") {
      setPickup(value);
      pickupCoords.current = null;
      setPickupResults([]);
    } else {
      setDrop(value);
      dropCoords.current = null;
      setDropResults([]);
    }

    setActiveSearch(type);

    if (searchTimer.current) {
      clearTimeout(searchTimer.current);
    }

    if (controller.current) {
      controller.current.abort();
    }

    const query = value.trim();

    if (!query) {
      setActiveSearch(null);
      return;
    }

    searchTimer.current = setTimeout(async () => {
      controller.current = new AbortController();

      try {
        const response = await fetch(
          `/api/location-search?q=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller.current.signal,
          }
        );

        if (!response.ok) {
          throw new Error("Location search failed");
        }

        const data = await response.json();

        const results = Array.isArray(data)
          ? data.slice(0, 6)
          : [];

        if (type === "pickup") {
          setPickupResults(results);
        } else {
          setDropResults(results);
        }

        setActiveSearch(
          results.length > 0 ? type : null
        );
      } catch (error: unknown) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Location search error:",
          error
        );

        setActiveSearch(null);
      }
    }, 350);
  };

  /* =======================================================
     CHOOSE LOCATION
  ======================================================= */

  const chooseLocation = (
    type: LocationType,
    location: LocationResult
  ) => {
    const value =
      location.display_name ||
      location.full_address ||
      location.name ||
      "";

    const lat = Number(location.lat);

    const lon = Number(location.lon);

    const coords =
      Number.isFinite(lat) && Number.isFinite(lon)
        ? {
            lat,
            lon,
          }
        : null;

    if (type === "pickup") {
      setPickup(value);
      pickupCoords.current = coords;
      setPickupResults([]);
    } else {
      setDrop(value);
      dropCoords.current = coords;
      setDropResults([]);
    }

    setActiveSearch(null);
  };

  /* =======================================================
     CALCULATE DISTANCE + FARE
  ======================================================= */

  const calculateDistanceFare = async () => {
    if (!pickup.trim()) {
      throw new Error(
        "Please enter Pickup location."
      );
    }

    if (!drop.trim()) {
      throw new Error(
        "Please enter Drop location."
      );
    }

    const response = await fetch("/api/distance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pickup: pickup.trim(),
        drop: drop.trim(),
        pickupCoords: pickupCoords.current,
        dropCoords: dropCoords.current,
      }),
    });

    if (!response.ok) {
      throw new Error(
        "Distance service failed."
      );
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        "Unable to calculate distance. Please select valid locations."
      );
    }

    const distanceKm = Number(
      data.distance || 0
    );

    if (
      !Number.isFinite(distanceKm) ||
      distanceKm <= 0
    ) {
      throw new Error(
        "Unable to calculate valid route distance."
      );
    }

    const rate =
      vehicleRates[vehicle] ?? 11;

    let totalDistance = distanceKm;

    let totalFare = 0;

    let finalTripType = "One Way Trip";

    /* =====================================================
       ROUND TRIP
    ===================================================== */

    if (tripType === "roundtrip") {
      finalTripType = "Outstation Trip";

      const start = new Date(
        `${journeyDate}T00:00:00`
      );

      const end = new Date(
        `${returnDate}T00:00:00`
      );

      let totalDays = 1;

      if (
        !Number.isNaN(start.getTime()) &&
        !Number.isNaN(end.getTime()) &&
        end >= start
      ) {
        totalDays =
          Math.floor(
            (end.getTime() -
              start.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1;
      }

      /*
       * Existing business rule:
       * Minimum 300 KM per day for round trip.
       */

      if (totalDays > 1) {
        totalDistance =
          totalDays * 300;

        totalFare =
          totalDistance * rate;
      } else {
        totalDistance =
          distanceKm * 2;

        totalFare =
          totalDistance * rate;
      }
    }

    /* =====================================================
       ONE WAY
    ===================================================== */

    else if (tripType === "oneway") {
      finalTripType = "One Way Trip";

      /*
       * Existing one-way logic:
       * Distance × Rate × 2
       */

      totalFare =
        distanceKm * rate * 2;
    }

    /* =====================================================
       AIRPORT
    ===================================================== */

    else if (tripType === "airport") {
      finalTripType =
        "Airport Pick-Up & Drop";

      totalFare =
        distanceKm * rate;
    }

    return {
      distance: Math.round(
        totalDistance
      ),
      fare: Math.round(
        totalFare
      ),
      tripType:
        finalTripType,
    };
  };

  /* =======================================================
     SUBMIT BOOKING
  ======================================================= */

  const submitBooking = async () => {
    /* -----------------------------------------------------
       PICKUP
    ----------------------------------------------------- */

    if (!pickup.trim()) {
      alert(
        tripType === "hourly"
          ? "Please enter pickup / starting location."
          : "Please enter Pickup location."
      );

      return;
    }

    /* -----------------------------------------------------
       DATE
    ----------------------------------------------------- */

    if (!journeyDate) {
      alert(
        "Please select journey date."
      );

      return;
    }

    /* -----------------------------------------------------
       TIME
    ----------------------------------------------------- */

    if (!journeyTime) {
      alert(
        "Please select pickup time."
      );

      return;
    }

    /* -----------------------------------------------------
       DROP FOR DISTANCE BASED TRIPS
    ----------------------------------------------------- */

    if (
      tripType !== "hourly" &&
      !drop.trim()
    ) {
      alert(
        "Please enter Drop location."
      );

      return;
    }

    /* -----------------------------------------------------
       ROUND TRIP RETURN DATE
    ----------------------------------------------------- */

    if (
      tripType === "roundtrip" &&
      !returnDate
    ) {
      alert(
        "Please select return date."
      );

      return;
    }

    if (
      tripType === "roundtrip" &&
      returnDate < journeyDate
    ) {
      alert(
        "Return date cannot be before journey date."
      );

      return;
    }

    setLoading(true);

    try {
      const params =
        new URLSearchParams();

      /* ---------------------------------------------------
         COMMON PARAMETERS
      --------------------------------------------------- */

      params.set(
        "vehicle",
        vehicle
      );

      params.set(
        "pickup",
        pickup.trim()
      );

      params.set(
        "drop",
        drop.trim()
      );

      params.set(
        "journeyDate",
        journeyDate
      );

      params.set(
        "pickupTime",
        journeyTime
      );

      params.set(
        "returnDate",
        returnDate
      );

      /* ---------------------------------------------------
         HOURLY RENTAL
         
         No /api/distance call.
         Package is the booking unit.
      --------------------------------------------------- */

      if (tripType === "hourly") {
        params.set(
          "tripType",
          "Local Rental"
        );

        // Send the exact package code expected by /book-cab
      const packageCode =
      selectedHourlyPackage.id.split("-")[0];

      params.set(
        "package",
      packageCode
      );

        params.set(
          "durationHours",
          String(
            selectedHourlyPackage.hours
          )
        );

        params.set(
          "includedKm",
          String(
            selectedHourlyPackage.km
          )
        );

        params.set(
          "distance",
          String(
            selectedHourlyPackage.km
          )
        );

        /*
         * Fare remains 0 here intentionally.
         *
         * Existing /book-cab flow should apply
         * its local rental package pricing.
         */

        params.set(
          "fare",
          "0"
        );

        params.set(
          "pickupLat",
          pickupCoords.current
            ? String(
                pickupCoords.current.lat
              )
            : ""
        );

        params.set(
          "pickupLon",
          pickupCoords.current
            ? String(
                pickupCoords.current.lon
              )
            : ""
        );

        params.set(
          "dropLat",
          ""
        );

        params.set(
          "dropLon",
          ""
        );
      }

      /* ---------------------------------------------------
         AIRPORT / ONE WAY / ROUND TRIP
      --------------------------------------------------- */

      else {
        const result =
          await calculateDistanceFare();

        params.set(
          "tripType",
          result.tripType
        );

        params.set(
          "distance",
          String(
            result.distance
          )
        );

        params.set(
          "fare",
          String(
            result.fare
          )
        );

        params.set(
          "pickupLat",
          pickupCoords.current
            ? String(
                pickupCoords.current.lat
              )
            : ""
        );

        params.set(
          "pickupLon",
          pickupCoords.current
            ? String(
                pickupCoords.current.lon
              )
            : ""
        );

        params.set(
          "dropLat",
          dropCoords.current
            ? String(
                dropCoords.current.lat
              )
            : ""
        );

        params.set(
          "dropLon",
          dropCoords.current
            ? String(
                dropCoords.current.lon
              )
            : ""
        );
      }

      /* ---------------------------------------------------
         OPEN EXISTING BOOKING FLOW
      --------------------------------------------------- */

      window.location.href =
        `/book-cab?${params.toString()}`;
    } catch (error: unknown) {
      console.error(
        "Booking calculation error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Unable to calculate fare. Please try again.";

      alert(message);

      setLoading(false);
    }
  };

  /* =======================================================
     INPUT STYLE
  ======================================================= */

  const inputClass =
  "h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[12px] font-medium text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white sm:h-11 sm:text-sm";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
  <>
    <main className="min-h-screen bg-white text-slate-900">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-visible bg-[#071a3a] pb-16 pt-14 text-white sm:pb-20 sm:pt-12 lg:pt-14">

{/* Breadcrumb */}
<div className="relative z-30 mx-auto max-w-[1440px] px-4 pt-10 pb-2 sm:px-6 sm:pt-7 sm:pb-3 lg:px-10">
  <nav
    aria-label="Breadcrumb"
    className="!flex !flex-row items-center gap-2 whitespace-nowrap text-sm"
  >
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-1 text-blue-100/80 transition hover:text-white"
    >
      <ChevronRight className="h-3.5 w-3.5 rotate-180" />
      Home
    </Link>

    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-blue-300/50" />

    <span className="shrink-0 font-medium text-white/90">
      Nagpur Airport Taxi Service
    </span>
  </nav>
</div>

        {/* Background Glow */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute inset-0 bg-gradient-to-r from-[#07152f] via-[#0a2048] to-[#06152f]" />

          <div className="absolute left-[62%] top-[18%] h-[340px] w-[560px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />

          <div className="absolute right-[-100px] top-[20%] h-[320px] w-[320px] rounded-full bg-blue-500/10 blur-[110px]" />

          <div className="absolute bottom-[-160px] left-[60%] h-[280px] w-[650px] -translate-x-1/2 rounded-full bg-blue-700/15 blur-[120px]" />

          <div className="absolute left-[7%] top-[14%] hidden h-32 w-32 opacity-25 lg:block">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)",
                backgroundSize:
                  "14px 14px",
              }}
            />
          </div>

          <div className="absolute right-[3%] top-[24%] hidden h-44 w-36 opacity-25 lg:block">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #2563eb 1.5px, transparent 1.5px)",
                backgroundSize:
                  "14px 14px",
              }}
            />
          </div>

        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">


          {/* =================================================
              HERO MAIN
          ================================================= */}

          <div className="grid items-center gap-2 lg:grid-cols-[0.95fr_1.05fr] lg:gap-3">

            {/* LEFT */}

            <div className="relative z-10 pt-2 lg:pb-4">

              <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-blue-100 backdrop-blur-sm sm:text-xs">
                <MapPin className="h-3.5 w-3.5 text-cyan-300" />

                NAGPUR • AIRPORT • CITY • OUTSTATION
              </div>

              <h1 className="mt-3 max-w-[620px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-[36px] lg:text-[42px] xl:text-[46px]">
                Airport Taxi Service
                <span className="block">
                  in Nagpur
                </span>
              </h1>

              <p className="mt-3 max-w-[600px] text-[13px] leading-6 text-blue-100/90 sm:mt-4 sm:text-base sm:leading-7">
                Book a reliable Nagpur Airport Taxi for airport pickup and drop, one-way trips,
                round trips and hourly rentals. Choose your pickup, destination, date,
                time and preferred vehicle for a smooth booking experience.
              </p>

{/* HERO BUTTONS */}

<div className="mt-4 flex w-full flex-row gap-2 sm:mt-5 sm:w-auto sm:flex-wrap sm:gap-2.5">

  {/* BOOK TAXI */}
  <a
    href="#hero-booking-form"
    className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-lg bg-white px-2 py-3 text-[10px] font-extrabold leading-none whitespace-nowrap text-[#12346f] shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 sm:min-h-[46px] sm:flex-none sm:gap-2 sm:px-5 sm:py-0 sm:text-[13px]"
  >
    <CalendarDays className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

    <span className="whitespace-nowrap">
      Book Your Taxi
    </span>

    <ArrowRight className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
  </a>

  {/* WHATSAPP */}
  <a
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-lg bg-emerald-500 px-2 py-3 text-[10px] font-extrabold leading-none whitespace-nowrap text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:min-h-[46px] sm:flex-none sm:gap-2 sm:px-5 sm:py-0 sm:text-[13px]"
  >
    <FaWhatsapp className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" />

    <span className="whitespace-nowrap">
      WhatsApp Now
    </span>
  </a>

  {/* CALL */}
  <a
    href={`tel:${PHONE}`}
    className="inline-flex min-w-0 flex-1 items-center justify-center gap-1 rounded-lg border border-white/30 bg-white/5 px-2 py-3 text-[10px] font-extrabold leading-none whitespace-nowrap text-white transition hover:bg-white/10 sm:min-h-[46px] sm:flex-none sm:gap-2 sm:px-5 sm:py-0 sm:text-[13px]"
  >
    <Phone className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

    <span className="whitespace-nowrap">
      Call Now
    </span>
  </a>

</div>
</div>

              {/* Right Car - Desktop Only */}
              <div className="relative z-10 mx-auto -mt-1 hidden w-full lg:ml-auto lg:mt-0 lg:block lg:max-w-[760px]">

              {/* Blue glow behind car */}
              <div className="absolute left-[56%] top-1/2 h-[210px] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[80px] sm:h-[240px]" />

              {/* Circular ring behind car */}
              <div className="absolute left-[12%] top-[8%] hidden h-[78%] w-[78%] rounded-full border border-blue-400/20 lg:block" />

              {/* Car */}
              <div className="relative mx-auto aspect-[1.9/1] w-[92%] sm:w-[88%] lg:ml-auto lg:w-[90%]">

              <Image
              src="/seo-hero-bg.webp"
              alt="RC Tours and Travels taxi service in Nagpur"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 58vw"
              className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.45)]"
              />

              </div>

            </div>
          </div>

          {/* =================================================
              TRUST FEATURES
          ================================================= */}

          <div className="relative z-20 mt-3 grid grid-cols-4 gap-1 py-2 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-y-3 sm:py-2.5">

            {[
              [
                ShieldCheck,
                "Safe & Secure",
                "Customer-first travel",
              ],
              [
                Headphones,
                "24/7 Support",
                "Booking assistance",
              ],
              [
                WalletCards,
                "Fair Pricing",
                "Clear fare process",
              ],
              [
                UserRoundCheck,
                "Professional",
                "Travel assistance",
              ],
            ].map(
              ([Icon, title, text]: any) => (
                <div
                  key={title}
                  className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-2 sm:border-r sm:border-white/15 sm:pr-5 sm:text-left"
                >

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/45 bg-white/5 sm:h-9 sm:w-9">
                    <Icon className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                  </div>

                  <div>

                    <p className="text-[9px] font-bold leading-tight text-white sm:text-[13px]">
                      {title}
                    </p>

                    <p className="mt-0.5 hidden text-[9px] text-blue-100 sm:block sm:text-[10px]">
                      {text}
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

        {/* ===================================================
            BOOKING ENGINE
        =================================================== */}

        <div
        id="hero-booking-form"
        className="absolute left-1/2 top-full z-30 w-[calc(100%-32px)] max-w-[1500px] -translate-x-1/2 -translate-y-[50%] px-0 sm:w-[calc(100%-40px)] lg:w-[calc(100%-64px)] lg:-translate-y-[68px]"
        >

          <div className="rounded-2xl bg-white p-2 text-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.25)] sm:p-2.5">

            {/* =================================================
                TRIP TYPE TABS
            ================================================= */}

            <div className="grid grid-cols-4 gap-1 sm:gap-1.5">

              {[
                ["airport", "Airport", Plane],
                [
                  "oneway",
                  "Outstation One-Way",
                  Navigation,
                ],
                [
                  "roundtrip",
                  "Outstation Round-Trip",
                  Car,
                ],
                [
                  "hourly",
                  "Hourly Rental",
                  Clock,
                ],
              ].map(
                ([value, label, Icon]: any) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setTripType(
                        value as TripType
                      )
                    }
                    className={`flex h-9 items-center justify-center gap-1 rounded-lg border px-1 text-[9px] font-bold transition sm:h-10 sm:gap-1.5 sm:px-2.5 sm:text-xs ${
                      tripType === value
                        ? "border-blue-700 bg-[#1c4488] text-white shadow-md"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <Icon className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />

                    <span>
                      {label}
                    </span>
                  </button>
                )
              )}

            </div>

            {/* =================================================
                HOURLY RENTAL FORM
            ================================================= */}

            {tripType === "hourly" ? (
              <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-2 xl:grid-cols-[1.6fr_1fr_1fr_1.05fr_1.2fr_auto] xl:items-end">

                <LocationInput
                  label="From"
                  icon={
                    <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  }
                  value={pickup}
                  placeholder="Starting Location"
                  onChange={(value) =>
                    searchLocation(
                      value,
                      "pickup"
                    )
                  }
                  results={pickupResults}
                  active={
                    activeSearch ===
                    "pickup"
                  }
                  onChoose={(result) =>
                    chooseLocation(
                      "pickup",
                      result
                    )
                  }
                  inputClass={inputClass}
                />

                <Field
                  label="Departure"
                  icon={
                    <CalendarCheck className="h-3.5 w-3.5 text-violet-600" />
                  }
                >
                  <input
                    type="date"
                    min={getTodayString()}
                    value={journeyDate}
                    onChange={(event) =>
                      setJourneyDate(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Pickup-Time"
                  icon={
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                  }
                >
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(event) =>
                      setJourneyTime(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </Field>

                <Field
                  label="Duration"
                  icon={
                    <Clock className="h-3.5 w-3.5 text-blue-600" />
                  }
                >
                  <select
                    value={selectedPackage}
                    onChange={(event) =>
                      setSelectedPackage(
                        event.target.value
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    {hourlyPackages.map(
                      (pkg) => (
                        <option
                          key={pkg.id}
                          value={pkg.id}
                        >
                          {pkg.hours} Hours /{" "}
                          {pkg.km} KM
                        </option>
                      )
                    )}
                  </select>
                </Field>

                <Field
                  label="Vehicle"
                  icon={
                    <Car className="h-3.5 w-3.5 text-rose-500" />
                  }
                >
                  <select
                    value={vehicle}
                    onChange={(event) =>
                      setVehicle(
                        event.target.value
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    {vehicles.map(
                      (vehicleName) => (
                        <option
                          key={vehicleName}
                          value={vehicleName}
                        >
                          {vehicleName}
                        </option>
                      )
                    )}
                  </select>
                </Field>

                <button
                  type="button"
                  onClick={submitBooking}
                  disabled={loading}
                  className="h-10 min-w-[82px] rounded-lg bg-gradient-to-r from-[#245ab2] to-[#1747a0] px-4 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:h-11"
                >
                  {loading
                    ? "Opening..."
                    : "Go"}

                  {!loading && (
                    <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                  )}
                </button>

              </div>
            ) : (

              /* =================================================
                 AIRPORT / ONE WAY / ROUND TRIP FORM
              ================================================= */

              <div
              className={`mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 ${
              tripType === "roundtrip"
              ? "xl:grid-cols-7"
              : "xl:grid-cols-6"
              }`}
              >

                {/* PICKUP */}

                <LocationInput
                  label="Pickup"
                  icon={
                    <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  }
                  value={pickup}
                  placeholder="Pickup Location"
                  onChange={(value) =>
                    searchLocation(
                      value,
                      "pickup"
                    )
                  }
                  results={pickupResults}
                  active={
                    activeSearch ===
                    "pickup"
                  }
                  onChoose={(result) =>
                    chooseLocation(
                      "pickup",
                      result
                    )
                  }
                  inputClass={inputClass}
                />

                {/* DROP */}

                <LocationInput
                  label="Drop"
                  icon={
                    <MapPin className="h-3.5 w-3.5 text-rose-500" />
                  }
                  value={drop}
                  placeholder="Drop Location"
                  onChange={(value) =>
                    searchLocation(
                      value,
                      "drop"
                    )
                  }
                  results={dropResults}
                  active={
                    activeSearch ===
                    "drop"
                  }
                  onChoose={(result) =>
                    chooseLocation(
                      "drop",
                      result
                    )
                  }
                  inputClass={inputClass}
                />

                {/* DATE */}

                <Field
                  label="Date"
                  icon={
                    <CalendarCheck className="h-3.5 w-3.5 text-violet-600" />
                  }
                >
                  <input
                    type="date"
                    min={getTodayString()}
                    value={journeyDate}
                    onChange={(event) =>
                      setJourneyDate(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </Field>

                {/* TIME */}

                <Field
                  label="Time"
                  icon={
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                  }
                >
                  <input
                    type="time"
                    value={journeyTime}
                    onChange={(event) =>
                      setJourneyTime(
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </Field>

                {/* RETURN DATE */}

                {tripType === "roundtrip" && (
                  <Field
                    label="Return Date"
                    icon={
                      <CalendarDays className="h-3.5 w-3.5 text-violet-600" />
                    }
                  >
                    <input
                      type="date"
                      min={
                        journeyDate ||
                        getTodayString()
                      }
                      value={returnDate}
                      onChange={(event) =>
                        setReturnDate(
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />
                  </Field>
                )}

                {/* VEHICLE */}

                <Field
                  label="Vehicle"
                  icon={
                    <Car className="h-3.5 w-3.5 text-rose-500" />
                  }
                >
                  <select
                    value={vehicle}
                    onChange={(event) =>
                      setVehicle(
                        event.target.value
                      )
                    }
                    className={`${inputClass} cursor-pointer`}
                  >
                    {vehicles.map(
                      (vehicleName) => (
                        <option
                          key={vehicleName}
                          value={vehicleName}
                        >
                          {vehicleName}
                        </option>
                      )
                    )}
                  </select>
                </Field>

                {/* BOOK */}

                <button
                  type="button"
                  onClick={submitBooking}
                  disabled={loading}
                  className="h-11 rounded-lg bg-gradient-to-r from-[#245ab2] to-[#1747a0] px-4 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading
                    ? "Calculating..."
                    : "Book Now"}

                  {!loading && (
                    <ArrowRight className="ml-1.5 inline h-3.5 w-3.5" />
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      </section>


{/* ============================================================
    PREMIUM NAGPUR AIRPORT TAXI EXPERIENCE
    Hero + existing booking engine above remain unchanged.
============================================================ */}

<section className="relative overflow-hidden bg-[#f5f8ff] pb-14 pt-35 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-24">
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
  <div className="pointer-events-none absolute -right-40 top-[35%] h-[28rem] w-[28rem] rounded-full bg-cyan-200/20 blur-3xl" />

  <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">

    {/* LOCAL COMPANY INTRO */}
    <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
      <div>
        <div className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-blue-200 bg-white px-3 py-2 text-[9px] font-black uppercase tracking-[0.08em] text-blue-700 shadow-sm sm:gap-2 sm:px-4 sm:text-xs sm:tracking-[0.18em]">
        <MapPin className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
        <span>Nagpur Based • Airport • Local • Outstation</span>
        </div>

        <h2 className="mt-5 max-w-3xl text-3xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-4xl lg:text-6xl">
          Nagpur Airport Taxi
          <span className="block text-blue-700">
            Built Around Your Journey
          </span>
        </h2>

        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          RC Tours &amp; Travels is a Nagpur-focused taxi company providing
          airport pickup and drop, local cab rental, hourly packages and
          outstation travel. Our booking experience keeps pickup, destination,
          date, time and vehicle together in one flow.
        </p>

        <div className="mt-7 flex flex-wrap gap-2.5">
          {[
            ["Airport Pickup", Plane],
            ["Airport Drop", Navigation],
            ["Hourly Rental", Clock],
            ["Nagpur Local Taxi", Car],
          ].map(([label, Icon]: any) => (
            <a
              key={label}
              href="#hero-booking-form"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-black text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-700 hover:shadow-md"
            >
              <Icon className="h-4 w-4 text-blue-600" />
              {label}
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#hero-booking-form"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-[#0b5cff] px-6 py-3 text-sm font-black text-white shadow-[0_14px_35px_rgba(11,92,255,.25)] transition hover:-translate-y-1 hover:bg-[#084fdc]"
          >
            Book Airport Taxi
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-black text-slate-800 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:text-blue-700"
          >
            <Phone className="h-4 w-4 text-blue-600" />
            Call for Booking
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-3 text-sm font-black text-emerald-700 transition hover:-translate-y-1 hover:bg-emerald-500 hover:text-white"
          >
            <FaWhatsapp className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-blue-200/60 via-white to-cyan-100/60 blur-xl" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white bg-[#071a3a] p-4 shadow-[0_30px_80px_rgba(15,40,90,.18)] sm:p-6">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
                  Nagpur Airport Cab
                </p>
                <p className="mt-1 text-lg font-black text-white sm:text-xl">
                  Airport → Your Destination
                </p>
              </div>

              <div className="rounded-xl bg-white/10 px-3 py-2 text-center backdrop-blur">
                <Plane className="mx-auto h-5 w-5 text-cyan-300" />
                <span className="mt-1 block text-[9px] font-bold text-white/70">
                  TRANSFER
                </span>
              </div>
            </div>

            <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-b from-white to-slate-100">
              <div className="absolute left-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-blue-700 shadow-sm">
                Comfortable Vehicle Options
              </div>

              <Image
                src="/cars/crysta.webp"
                alt="Innova Crysta airport taxi in Nagpur"
                width={800}
                height={500}
                className="h-[245px] w-full object-contain p-5 transition duration-700 hover:scale-105 sm:h-[320px]"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["Pickup", Plane],
                ["Comfort", Car],
                ["Destination", MapPin],
              ].map(([label, Icon]: any) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                >
                  <Icon className="mx-auto h-4 w-4 text-cyan-300" />
                  <p className="mt-1 text-[10px] font-bold text-white">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>


    {/* PROFESSIONAL SERVICE PROMISE */}
    <div className="mt-12 grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,.07)] sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          icon: ShieldCheck,
          title: "Safety-Focused Travel",
          text: "A customer-first approach to everyday and airport travel.",
        },
        {
          icon: Car,
          title: "Well-Maintained Cars",
          text: "Sedan, SUV and larger vehicle options according to your requirement.",
        },
        {
          icon: Headphones,
          title: "Professional Call Support",
          text: "Call directly when you want help with your booking.",
        },
        {
          icon: WalletCards,
          title: "Clear Booking Flow",
          text: "Route, timing, vehicle and fare stay organised in the booking process.",
        },
      ].map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className={`group flex items-start gap-4 p-5 transition hover:bg-blue-50/60 sm:p-6 ${
              index !== 0
                ? "border-t border-slate-100 sm:border-l sm:border-t-0"
                : ""
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-sm font-black text-slate-900 sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {item.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>


{/* AIRPORT TRAVEL USE CASES */}
<div className="mt-8 sm:mt-12 lg:mt-16">
  <div className="max-w-3xl">
    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 sm:text-xs">
      One Nagpur Taxi Company • Multiple Travel Needs
    </p>

    <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
      Airport Travel That Fits
      <span className="text-blue-700"> The Way You Travel</span>
    </h2>

    <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
      Whether you are catching an early flight, arriving in Nagpur,
      travelling with family, attending a business meeting or making
      multiple city stops, choose the booking mode that matches your
      journey.
    </p>
  </div>

  <div className="mt-8 grid gap-4 lg:grid-cols-12">

    {/* AIRPORT PICKUP & DROP */}
    <article className="group relative min-h-[430px] overflow-hidden rounded-[2rem] bg-[#071a3a] text-white shadow-xl lg:col-span-7">
      <div className="grid min-h-[430px] lg:grid-cols-[48%_52%]">

        {/* LEFT CONTENT */}
        <div className="relative z-20 flex flex-col justify-center p-6 sm:p-8 lg:p-9">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <Plane className="h-6 w-6 text-cyan-300" />
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 sm:text-xs">
            Airport Pickup &amp; Drop
          </p>

          <h3 className="mt-2 text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl">
            From Your Nagpur Location
            <span className="mt-1 block text-cyan-300">
              To The Airport &amp; Back
            </span>
          </h3>

          <p className="mt-4 max-w-md text-sm leading-7 text-blue-100">
            Enter your actual pickup and destination in the booking form.
            Our existing route and fare system calculates the distance
            before continuing to the booking page.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-7 inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#071a3a] transition hover:-translate-y-1 hover:bg-cyan-50 sm:text-sm"
          >
            Start Airport Booking
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* VEHICLE VISUAL */}
        <div className="relative flex min-h-[240px] items-end justify-center overflow-hidden bg-white lg:min-h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50" />

          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100/70 blur-3xl" />

          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-slate-100/70 to-transparent" />

          <Image
            src="/cars/dzire.webp"
            alt="Swift Dzire sedan taxi for Nagpur airport transfer"
            width={700}
            height={420}
            loading="lazy"
            className="relative z-10 mb-4 w-[94%] object-contain transition duration-700 group-hover:scale-105 sm:w-[88%] lg:mb-8 lg:w-[108%]"
          />

          <div className="absolute bottom-4 left-4 z-20 rounded-full border border-slate-200 bg-white/90 px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur sm:text-[10px] lg:bottom-5 lg:left-5">
            Airport Transfer
          </div>
        </div>
      </div>
    </article>

    {/* RIGHT SIDE */}
    <div className="grid gap-4 lg:col-span-5">

      {/* HOURLY CAB */}
      <article className="group relative min-h-[205px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute right-[-30px] top-[-30px] h-40 w-40 rounded-full bg-violet-100 blur-3xl" />

        <div className="relative z-10 flex h-full items-center justify-between gap-5 p-6 sm:p-7">

          <div className="max-w-[68%]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-700">
              <Clock className="h-5 w-5" />
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-violet-600">
              Flexible City Travel
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-slate-900">
              Hourly Cab Rental
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Keep one cab for meetings, shopping, appointments,
              multiple stops, events and extended city travel.
            </p>
          </div>

          <div className="relative flex h-full w-[34%] items-end justify-center">
            <Image
              src="/ertiga.webp"
              alt="Maruti Ertiga hourly cab rental in Nagpur"
              width={320}
              height={220}
              loading="lazy"
              className="w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </article>

      {/* ONE BOOKING EXPERIENCE */}
      <article className="group relative min-h-[205px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="absolute bottom-[-30px] right-[-30px] h-40 w-40 rounded-full bg-cyan-100 blur-3xl" />

        <div className="relative z-10 flex h-full items-center justify-between gap-5 p-6 sm:p-7">

          <div className="max-w-[68%]">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Navigation className="h-5 w-5" />
            </div>

            <p className="mt-5 text-[10px] font-black uppercase tracking-widest text-cyan-600">
              Airport • Railway • City
            </p>

            <h3 className="mt-2 text-2xl font-black leading-tight text-slate-900">
              One Booking Experience
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the same booking system for airport, outstation and
              hourly travel requirements.
            </p>
          </div>

          <div className="relative flex h-full w-[34%] items-end justify-center">
            <Image
              src="/cars/rumion.webp"
              alt="Toyota Rumion taxi for airport and city travel in Nagpur"
              width={320}
              height={220}
              loading="lazy"
              className="w-full object-contain transition duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </article>

    </div>
  </div>
</div>


    {/* BOOKING PROCESS */}
    <div className="mt-20 overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_70px_rgba(15,23,42,.08)]">
      <div className="grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative overflow-hidden bg-[#0b1f47] p-7 text-white sm:p-10 lg:p-12">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300">
              Simple • Professional • Direct
            </p>

            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              A Booking Process
              <span className="block text-cyan-300">
                Made For Real Customers
              </span>
            </h2>

            <p className="mt-4 text-sm leading-7 text-blue-100">
              Enter the route, select travel details and continue to the
              existing RC Tours &amp; Travels booking flow.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {["Airport", "One-Way", "Round-Trip", "Hourly"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-black text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="space-y-5">
            {[
              {
                no: "01",
                icon: MapPin,
                title: "Enter Pickup & Destination",
                text: "Search and select your locations in the booking form.",
              },
              {
                no: "02",
                icon: CalendarDays,
                title: "Choose Date & Time",
                text: "Select the journey date and pickup time that suits your plan.",
              },
              {
                no: "03",
                icon: Car,
                title: "Select Your Vehicle",
                text: "Choose a vehicle according to passengers, luggage and comfort requirements.",
              },
              {
                no: "04",
                icon: CheckCircle2,
                title: "Continue Booking",
                text: "The existing booking flow receives the selected trip details and route information.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.no} className="flex gap-4">
                  <div className="flex shrink-0 flex-col items-center">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="h-5 w-5" />
                    </div>

                    {step.no !== "04" && (
                      <div className="mt-2 h-5 w-px bg-slate-200" />
                    )}
                  </div>

                  <div>
                    <span className="text-[10px] font-black tracking-widest text-blue-600">
                      STEP {step.no}
                    </span>

                    <h3 className="mt-1 text-base font-black text-slate-900 sm:text-lg">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>


{/* LOCAL RENTAL PACKAGES */}

<section
  id="local-rental"
  className="mt-10 md:mt-20 bg-white text-black"
>
  <div className="rounded-3xl border border-gray-200 bg-gray-50 px-3 py-5 md:p-10">

    <p className="mb-3 text-center uppercase tracking-[6px] text-cyan-700">
      Local Rental
    </p>

    <h2 className="mb-2 text-center text-3xl leading-tight font-black md:mb-3 md:text-5xl">
      Hourly Cab Packages In Nagpur
    </h2>

    <p className="mb-4 text-center text-sm leading-6 text-gray-600 md:mb-12 md:text-base">
      Flexible local rental packages for business meetings, shopping,
      city tours and family travel.
    </p>


    {/* PACKAGE BUTTONS */}

    <div className="mb-4 flex flex-wrap justify-center gap-2 md:mb-12">

      <button
        type="button"
        onClick={() => setSelectedPackage("4hr-40km")}
        className={`rounded-full px-6 py-3 font-bold transition ${
          selectedPackage === "4hr-40km"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 bg-white text-black"
        }`}
      >
        4 Hr / 40 KM
      </button>


      <button
        type="button"
        onClick={() => setSelectedPackage("6hr-60km")}
        className={`rounded-full px-6 py-3 font-bold transition ${
          selectedPackage === "6hr-60km"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 bg-white text-black"
        }`}
      >
        6 Hr / 60 KM
      </button>


      <button
        type="button"
        onClick={() => setSelectedPackage("8hr-80km")}
        className={`rounded-full px-6 py-3 font-bold transition ${
          selectedPackage === "8hr-80km"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 bg-white text-black"
        }`}
      >
        8 Hr / 80 KM
      </button>


      <button
        type="button"
        onClick={() => setSelectedPackage("12hr-120km")}
        className={`rounded-full px-6 py-3 font-bold transition ${
          selectedPackage === "12hr-120km"
            ? "bg-cyan-500 text-white"
            : "border border-gray-300 bg-white text-black"
        }`}
      >
        12 Hr / 120 KM
      </button>

    </div>


    {/* VEHICLE CARDS */}

    <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-5 md:grid md:grid-cols-2 xl:grid-cols-3 md:overflow-visible md:pb-0">


      {/* SWIFT DZIRE */}

      <div className="w-[90%] shrink-0 snap-center flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl md:w-auto md:shrink">

        <Image
          src="/cars/dzire.webp"
          alt="Swift Dzire hourly cab rental in Nagpur"
          width={500}
          height={300}
          loading="lazy"
          className="h-36 w-full object-contain px-4 pt-3 pb-1 md:h-44 md:p-2"
        />


        <div className="flex-1 px-4 pt-2 pb-4 md:p-5">

          <h3 className="text-xl font-bold">
            Swift Dzire
          </h3>


          <div className="mt-4 grid grid-cols-2 gap-4">


            {/* INCLUDED */}

            <div className="flex gap-2">

              <Clock className="h-[22px] w-[22px] shrink-0" />

              <div>
                <p className="text-sm text-gray-500">
                  INCLUDED
                </p>

                <p className="font-semibold">
                  {selectedPackage === "4hr-40km"
                    ? "4 Hr | 40 KM"
                    : selectedPackage === "6hr-60km"
                    ? "6 Hr | 60 KM"
                    : selectedPackage === "8hr-80km"
                    ? "8 Hr | 80 KM"
                    : "12 Hr | 120 KM"}
                </p>
              </div>

            </div>


            {/* CANCELLATION */}

            <div className="flex gap-2">

              <ShieldCheck
                className="h-[22px] w-[22px] shrink-0 text-green-600"
              />

              <div>
                <p className="text-sm text-gray-500">
                  CANCELLATION
                </p>

                <p className="font-semibold text-green-600">
                  Free Up To 1 Hr
                </p>
              </div>

            </div>


            {/* SEATS */}

            <div className="flex gap-2">

              <UserRoundCheck
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  SEATS
                </p>

                <p className="font-semibold">
                  4+1 Seats
                </p>
              </div>

            </div>


            {/* DRIVER */}

            <div className="flex gap-2">

              <WalletCards
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  DRIVER
                </p>

                <p className="font-semibold">
                  Included
                </p>
              </div>

            </div>

          </div>


          {/* PRICE + BOOK */}

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">

            <div>

              <p className="text-3xl font-bold">
                {selectedPackage === "4hr-40km"
                  ? "₹1400"
                  : selectedPackage === "6hr-60km"
                  ? "₹1800"
                  : selectedPackage === "8hr-80km"
                  ? "₹2200"
                  : "₹2800"}
              </p>

              <p className="text-xs text-gray-500">
                + Taxes &amp; Charges
              </p>

            </div>


            <Link
              href={`/book-cab?tripType=Local%20Rental&cabType=Swift%20Dzire&package=${selectedPackage}&fare=${
                selectedPackage === "4hr-40km"
                  ? 1400
                  : selectedPackage === "6hr-60km"
                  ? 1800
                  : selectedPackage === "8hr-80km"
                  ? 2200
                  : 2800
              }&driverCharge=0`}
              className="w-full rounded-xl bg-orange-500 px-6 py-3 text-center font-semibold text-white transition hover:bg-orange-600 md:w-auto"
            >
              Book Now
            </Link>

          </div>

        </div>


        {/* FOOTER */}

        <div className="bg-gray-100 py-3 text-center text-xs">

          After{" "}

          {selectedPackage === "4hr-40km"
            ? "40 KM"
            : selectedPackage === "6hr-60km"
            ? "60 KM"
            : selectedPackage === "8hr-80km"
            ? "80 KM"
            : "120 KM"}

          {" "}charges apply • Tolls &amp; Parking Extra

        </div>

      </div>



      {/* ERTIGA */}

      <div className="w-[90%] shrink-0 snap-center flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl md:w-auto md:shrink">

        <Image
          src="/ertiga.webp"
          alt="Ertiga hourly cab rental in Nagpur"
          width={500}
          height={300}
          loading="lazy"
          className="h-44 w-full object-contain p-2 md:h-44"
        />


        <div className="flex-1 p-4 md:p-5">

          <h3 className="text-xl font-bold">
            Ertiga
          </h3>


          <div className="mt-4 grid grid-cols-2 gap-4">


            {/* INCLUDED */}

            <div className="flex gap-2">

              <Clock className="h-[22px] w-[22px] shrink-0" />

              <div>
                <p className="text-sm text-gray-500">
                  INCLUDED
                </p>

                <p className="font-semibold">
                  {selectedPackage === "4hr-40km"
                    ? "4 Hr | 40 KM"
                    : selectedPackage === "6hr-60km"
                    ? "6 Hr | 60 KM"
                    : selectedPackage === "8hr-80km"
                    ? "8 Hr | 80 KM"
                    : "12 Hr | 120 KM"}
                </p>
              </div>

            </div>


            {/* CANCELLATION */}

            <div className="flex gap-2">

              <ShieldCheck
                className="h-[22px] w-[22px] shrink-0 text-green-600"
              />

              <div>
                <p className="text-sm text-gray-500">
                  CANCELLATION
                </p>

                <p className="font-semibold text-green-600">
                  Free Up To 1 Hr
                </p>
              </div>

            </div>


            {/* SEATS */}

            <div className="flex gap-2">

              <UserRoundCheck
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  SEATS
                </p>

                <p className="font-semibold">
                  6+1 Seats
                </p>
              </div>

            </div>


            {/* DRIVER */}

            <div className="flex gap-2">

              <WalletCards
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  DRIVER
                </p>

                <p className="font-semibold">
                  Included
                </p>
              </div>

            </div>

          </div>


          {/* PRICE + BOOK */}

          <div className="mt-5 flex items-center justify-between gap-4">

            <div>

              <p className="text-3xl font-bold">
                {selectedPackage === "4hr-40km"
                  ? "₹2000"
                  : selectedPackage === "6hr-60km"
                  ? "₹2200"
                  : selectedPackage === "8hr-80km"
                  ? "₹2700"
                  : "₹3200"}
              </p>

              <p className="text-xs text-gray-500">
                + Taxes &amp; Charges
              </p>

            </div>


            <Link
              href={`/book-cab?tripType=Local%20Rental&cabType=Ertiga&package=${selectedPackage}&fare=${
                selectedPackage === "4hr-40km"
                  ? 2000
                  : selectedPackage === "6hr-60km"
                  ? 2200
                  : selectedPackage === "8hr-80km"
                  ? 2700
                  : 3200
              }&driverCharge=0`}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Book Now
            </Link>

          </div>

        </div>


        <div className="bg-gray-100 py-3 text-center text-xs">

          After{" "}

          {selectedPackage === "4hr-40km"
            ? "40 KM"
            : selectedPackage === "6hr-60km"
            ? "60 KM"
            : selectedPackage === "8hr-80km"
            ? "80 KM"
            : "120 KM"}

          {" "}charges apply • Tolls &amp; Parking Extra

        </div>

      </div>



      {/* INNOVA CRYSTA */}

      <div className="w-[90%] shrink-0 snap-center flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-2xl md:w-auto md:shrink">

        <Image
          src="/cars/crysta.webp"
          alt="Innova Crysta hourly cab rental in Nagpur"
          width={500}
          height={300}
          loading="lazy"
          className="h-44 w-full object-contain p-2 md:h-44"
        />


        <div className="flex-1 p-5">

          <h3 className="text-xl font-bold">
            Innova Crysta
          </h3>


          <div className="mt-4 grid grid-cols-2 gap-4">


            {/* INCLUDED */}

            <div className="flex gap-2">

              <Clock className="h-[22px] w-[22px] shrink-0" />

              <div>
                <p className="text-sm text-gray-500">
                  INCLUDED
                </p>

                <p className="font-semibold">
                  {selectedPackage === "4hr-40km"
                    ? "4 Hr | 40 KM"
                    : selectedPackage === "6hr-60km"
                    ? "6 Hr | 60 KM"
                    : selectedPackage === "8hr-80km"
                    ? "8 Hr | 80 KM"
                    : "12 Hr | 120 KM"}
                </p>
              </div>

            </div>


            {/* CANCELLATION */}

            <div className="flex gap-2">

              <ShieldCheck
                className="h-[22px] w-[22px] shrink-0 text-green-600"
              />

              <div>
                <p className="text-sm text-gray-500">
                  CANCELLATION
                </p>

                <p className="font-semibold text-green-600">
                  Free Up To 1 Hr
                </p>
              </div>

            </div>


            {/* SEATS */}

            <div className="flex gap-2">

              <UserRoundCheck
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  SEATS
                </p>

                <p className="font-semibold">
                  7+1 Seats
                </p>
              </div>

            </div>


            {/* PREMIUM */}

            <div className="flex gap-2">

              <WalletCards
                className="h-[22px] w-[22px] shrink-0"
              />

              <div>
                <p className="text-sm text-gray-500">
                  PREMIUM
                </p>

                <p className="font-semibold">
                  Vehicle
                </p>
              </div>

            </div>

          </div>


          {/* PRICE + BOOK */}

          <div className="mt-5 flex items-center justify-between gap-4">

            <div>

              <p className="text-3xl font-bold">
                {selectedPackage === "4hr-40km"
                  ? "₹2300"
                  : selectedPackage === "6hr-60km"
                  ? "₹3000"
                  : selectedPackage === "8hr-80km"
                  ? "₹3800"
                  : "₹4200"}
              </p>

              <p className="text-xs text-gray-500">
                + Taxes &amp; Charges
              </p>

            </div>


            <Link
              href={`/book-cab?tripType=Local%20Rental&cabType=Innova%20Crysta&package=${selectedPackage}&fare=${
                selectedPackage === "4hr-40km"
                  ? 2300
                  : selectedPackage === "6hr-60km"
                  ? 3000
                  : selectedPackage === "8hr-80km"
                  ? 3800
                  : 4200
              }&driverCharge=0`}
              className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Book Now
            </Link>

          </div>

        </div>


        <div className="bg-gray-100 py-3 text-center text-xs">

          After{" "}

          {selectedPackage === "4hr-40km"
            ? "40 KM"
            : selectedPackage === "6hr-60km"
            ? "60 KM"
            : selectedPackage === "8hr-80km"
            ? "80 KM"
            : "120 KM"}

          {" "}charges apply • Tolls &amp; Parking Extra

        </div>

      </div>

    </div>

  </div>
</section>

{/* CUSTOMER REVIEWS */}
<section className="bg-gray-100 pt-2 pb-4 md:pt-6 md:pb-12 overflow-hidden">
  <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
    <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 sm:p-5 md:p-10">

      {/* HEADING */}
      <div className="mx-auto mb-5 max-w-3xl text-center md:mb-10">
        <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.18em] text-blue-600 md:mb-2 md:text-sm md:tracking-wider">
          Trusted By Travelers
        </p>

        <h2 className="text-3xl font-black leading-tight text-blue-900 md:text-6xl">
          What Our Customers Say
        </h2>

        <p className="mx-auto mt-2 max-w-2xl text-sm leading-6 text-gray-600 md:mt-3 md:text-lg md:leading-7">
          Real experiences from customers who booked airport transfers,
          local taxis and outstation cabs with RC Tours &amp; Travels.
        </p>
      </div>

      {/* REVIEW AREA */}
      <div className="relative mx-auto max-w-7xl">

        {/* DESKTOP LEFT ARROW */}
        <button
          type="button"
          onClick={() =>
            setReviewIndex(
              (reviewIndex - 1 + reviews.length) % reviews.length
            )
          }
          onMouseEnter={() => setIsReviewHovered(true)}
          onMouseLeave={() => setIsReviewHovered(false)}
          className="
            absolute left-0 top-1/2 z-20 hidden
            h-11 w-11 -translate-x-1/2 -translate-y-1/2
            items-center justify-center rounded-full
            border border-gray-200 bg-white
            text-blue-900 shadow-lg
            transition-all duration-300
            hover:bg-blue-900 hover:text-white
            md:flex xl:-left-3
          "
          aria-label="Previous review"
        >
          <ChevronLeft size={22} />
        </button>

        {/* DESKTOP RIGHT ARROW */}
        <button
          type="button"
          onClick={() =>
            setReviewIndex((reviewIndex + 1) % reviews.length)
          }
          onMouseEnter={() => setIsReviewHovered(true)}
          onMouseLeave={() => setIsReviewHovered(false)}
          className="
            absolute right-0 top-1/2 z-20 hidden
            h-11 w-11 translate-x-1/2 -translate-y-1/2
            items-center justify-center rounded-full
            border border-gray-200 bg-white
            text-blue-900 shadow-lg
            transition-all duration-300
            hover:bg-blue-900 hover:text-white
            md:flex xl:-right-3
          "
          aria-label="Next review"
        >
          <ChevronRight size={22} />
        </button>

        {/* REVIEW CARDS */}
        <div
          className="overflow-hidden"
          onTouchStart={(e) => {
            const touch = e.touches[0];
            e.currentTarget.dataset.touchStart = String(touch.clientX);
          }}
          onTouchEnd={(e) => {
            const start = Number(e.currentTarget.dataset.touchStart || 0);
            const end = e.changedTouches[0]?.clientX || 0;

            if (!start || !end) return;

            const distance = start - end;

            if (Math.abs(distance) > 50) {
              if (distance > 0) {
                setReviewIndex(
                  (reviewIndex + 1) % reviews.length
                );
              } else {
                setReviewIndex(
                  (reviewIndex - 1 + reviews.length) % reviews.length
                );
              }
            }

            e.currentTarget.dataset.touchStart = "";
          }}
          style={{ touchAction: "pan-y" }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">

            {(isMobile ? [0] : [0, 1, 2]).map((offset) => {
              const review =
                reviews[(reviewIndex + offset) % reviews.length];

              return (
                <div
                  key={`${reviewIndex}-${offset}`}
                  className="
                    min-w-0 rounded-2xl border border-gray-200
                    bg-white p-4 shadow-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl
                    sm:p-5 md:p-6
                  "
                >

                  {/* CUSTOMER INFO */}
                  <div className="flex items-center gap-3 sm:gap-4">

                    <Image
                      src={review.image}
                      alt={`${review.name} - RC Tours & Travels customer`}
                      width={56}
                      height={56}
                      className="
                        h-12 w-12 shrink-0 rounded-full
                        border-2 border-gray-100 object-cover
                        sm:h-14 sm:w-14
                      "
                      onError={(e) => {
                        e.currentTarget.src =
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            review.name
                          )}&background=eff6ff&color=1e3a8a&size=128`;
                      }}
                    />

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base md:text-lg">
                        {review.name}
                      </h3>

                      <div
                        className="mt-1 flex flex-wrap items-center gap-1"
                        aria-label="5 star review"
                      >
                        <span className="text-xs tracking-wide text-yellow-500 sm:text-sm">
                          ★★★★★
                        </span>

                        <span className="text-[10px] text-gray-500 sm:text-xs">
                          Verified Google Review
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* REVIEW TEXT */}
                  <p className="
                    mt-4
                    text-sm leading-6 text-gray-700
                    md:mt-5 md:min-h-[105px]
                    md:text-base md:leading-7
                  ">
                    “{review.review}”
                  </p>

                  {/* BOTTOM */}
                  <div className="
                    mt-4 flex items-center justify-between
                    gap-2 border-t border-gray-100 pt-3
                    md:mt-5 md:gap-3 md:pt-4
                  ">

                    <Image
                      src="/google.webp"
                      alt="Google Reviews"
                      width={80}
                      height={28}
                      className="h-6 w-auto object-contain md:h-7"
                    />

                    <span className="text-[10px] text-gray-500 sm:text-xs md:text-sm">
                      {review.time}
                    </span>

                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* MOBILE NAVIGATION */}
        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">

          <button
            type="button"
            onClick={() =>
              setReviewIndex(
                (reviewIndex - 1 + reviews.length) % reviews.length
              )
            }
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full border border-gray-200
              bg-white text-blue-900 shadow-md
              transition active:scale-90
            "
            aria-label="Previous review"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="min-w-[55px] text-center text-xs font-semibold text-gray-600">
            {reviewIndex + 1} / {reviews.length}
          </span>

          <button
            type="button"
            onClick={() =>
              setReviewIndex(
                (reviewIndex + 1) % reviews.length
              )
            }
            className="
              flex h-9 w-9 items-center justify-center
              rounded-full border border-gray-200
              bg-white text-blue-900 shadow-md
              transition active:scale-90
            "
            aria-label="Next review"
          >
            <ChevronRight size={18} />
          </button>

        </div>

        {/* MOBILE SWIPE HINT */}
        <p className="mt-2 text-center text-[10px] text-gray-400 md:hidden">
          Swipe left or right to see more reviews
        </p>

      </div>
    </div>
  </div>
</section>

    {/* NAGPUR SERVICE AREAS */}
    <div className="mt-4 grid gap-6 sm:mt-8 lg:mt-12 lg:grid-cols-[.85fr_1.15fr]">
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,.07)] sm:p-9">

     <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
      <MapPin className="h-5 w-5" />
      </div>

      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-blue-600 sm:text-xs sm:tracking-[0.2em]">
      Nagpur City Service Areas
      </p>
      </div>

        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
          Airport Taxi Pickup From
          <span className="text-blue-700"> Across Nagpur</span>
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          Airport journeys can begin from your home, office, hotel, business
          location or another point in Nagpur. Enter your actual pickup and
          destination in the booking panel.
        </p>

        <a
          href="#hero-booking-form"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs font-black text-white shadow-lg transition hover:bg-blue-700 sm:text-sm"
        >
          Enter Pickup Location
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2.5">
  {areas.map((area) => (
    <span
      key={area}
      className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-4 sm:py-2.5 sm:text-xs"
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
      <span className="truncate">{area}</span>
    </span>
  ))}
</div>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5">
          <p className="text-xs font-black uppercase tracking-wider text-slate-900">
            Popular Nagpur Airport Taxi Searches
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Airport Taxi Nagpur",
              "Nagpur Airport Cab",
              "Airport Pickup Nagpur",
              "Airport Drop Nagpur",
              "Nagpur Airport Transfer",
              "Taxi Near Nagpur Airport",
              "Nagpur Cab Service",
              "Nagpur Local Taxi",
            ].map((keyword) => (
              <span
                key={keyword}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold text-slate-600 sm:text-xs"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>


{/* POPULAR TAXI SERVICES IN NAGPUR */}
<div className="mt-10 md:mt-16">

  {/* SECTION HEADER */}
  <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-5 py-7 sm:px-7 md:px-10 md:py-10">

    {/* Decorative shapes */}
    <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-blue-200/30 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-cyan-200/30 blur-3xl" />

    <div className="relative">

      {/* Small label */}
      <div className="mb-3 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-blue-600" />

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 sm:text-xs">
          Popular Taxi Services in Nagpur
        </p>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

        <div className="max-w-3xl">

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Reliable Taxi &amp; Car Rental
            <span className="block text-blue-700">
              Services From Nagpur
            </span>
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
            Choose from local taxi booking, car rental and popular
            outstation routes with professional drivers, clean vehicles
            and a simple booking experience.
          </p>

          {/* TRUST POINTS */}
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                ✓
              </span>
              Professional Drivers
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                ✓
              </span>
              Well-Maintained Vehicles
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                ✓
              </span>
              Easy Booking
            </div>

          </div>

        </div>

        {/* MAIN CTA */}
        <Link
          href="/services"
          className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-800 hover:shadow-xl"
        >
          View All Services

          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

      </div>
    </div>
  </div>


  {/* SERVICE CARDS */}
  <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-7 lg:grid-cols-4">

    {[
      {
        number: "01",
        label: "LOCAL TAXI",
        title: "Taxi Service in Nagpur",
        text: "Comfortable city rides for office, shopping, family travel and daily commute.",
        image: "/cars/dzire.webp",
        alt: "Swift Dzire taxi service in Nagpur",
        href: "/taxi-service-in-nagpur",
        cta: "Book Local Taxi",
      },
      {
        number: "02",
        label: "CAR RENTAL",
        title: "Car Rental in Nagpur",
        text: "Flexible hourly and full-day rental options with clean and comfortable cars.",
        image: "/ertiga.webp",
        alt: "Ertiga car rental service in Nagpur",
        href: "/car-rental-in-nagpur",
        cta: "Explore Car Rental",
      },
      {
        number: "03",
        label: "TADOBA TAXI",
        title: "Nagpur to Tadoba Taxi",
        text: "Plan your Tadoba trip with comfortable vehicles and experienced drivers.",
        image: "/cars/crysta.webp",
        alt: "Innova Crysta for Nagpur to Tadoba taxi",
        href: "/nagpur-to-tadoba-taxi",
        cta: "Book Tadoba Taxi",
      },
      {
        number: "04",
        label: "PENCH TAXI",
        title: "Nagpur to Pench Taxi",
        text: "Reliable cab options for family trips, wildlife tours and planned travel.",
        image: "/cars/crysta.webp",
        alt: "Innova Crysta for Nagpur to Pench taxi",
        href: "/nagpur-to-pench-taxi",
        cta: "Book Pench Taxi",
      },
    ].map((item) => (

      <Link
        key={item.href}
        href={item.href}
        className="
          group relative flex min-w-0 flex-col overflow-hidden
          rounded-[1.5rem] border border-slate-200
          bg-white shadow-sm
          transition-all duration-300
          hover:-translate-y-1
          hover:border-blue-200
          hover:shadow-[0_20px_50px_rgba(37,99,235,0.14)]
        "
      >

        {/* TOP IMAGE */}
        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 sm:h-40 md:h-44">

          <Image
            src={item.image}
            alt={item.alt}
            width={500}
            height={300}
            loading="lazy"
            className="
              h-full w-full object-contain
              p-3 transition-transform duration-500
              group-hover:scale-105
              sm:p-4
            "
          />

          {/* Image overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

          {/* Number */}
          <span className="
            absolute left-3 top-3
            flex h-8 w-8 items-center justify-center
            rounded-full bg-white
            text-[10px] font-black text-blue-700
            shadow-md sm:h-9 sm:w-9 sm:text-xs
          ">
            {item.number}
          </span>

          {/* Category */}
          <span className="
            absolute bottom-3 left-3
            rounded-full bg-white/95
            px-2.5 py-1
            text-[8px] font-black uppercase
            tracking-wider text-blue-700
            shadow-sm sm:px-3 sm:text-[9px]
          ">
            {item.label}
          </span>

        </div>


        {/* CONTENT */}
        <div className="flex flex-1 flex-col p-3.5 sm:p-5">

          <h3 className="
            text-sm font-black leading-5 text-slate-950
            sm:text-base sm:leading-6
            md:text-lg
          ">
            {item.title}
          </h3>

          <p className="
            mt-2 line-clamp-3
            text-[11px] leading-5 text-slate-500
            sm:text-xs sm:leading-5
          ">
            {item.text}
          </p>


          {/* BENEFITS */}
          <div className="mt-3 space-y-1.5">

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 sm:text-xs">
              <span className="text-blue-600">✓</span>
              Professional Driver
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-600 sm:text-xs">
              <span className="text-blue-600">✓</span>
              Clean &amp; Maintained Vehicle
            </div>

          </div>


          {/* CARD CTA */}
          <div className="
            mt-auto flex items-center justify-between
            border-t border-slate-100 pt-3
            sm:mt-5 sm:pt-4
          ">

            <span className="
              text-[9px] font-black uppercase
              tracking-wide text-blue-700
              sm:text-[10px]
            ">
              {item.cta}
            </span>

            <span className="
              flex h-7 w-7 shrink-0 items-center justify-center
              rounded-full bg-blue-700 text-white
              transition-all duration-300
              group-hover:bg-blue-800
              group-hover:translate-x-1
              sm:h-8 sm:w-8
            ">
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </span>

          </div>

        </div>

      </Link>

    ))}
  </div>


  {/* TRUST / SUPPORT STRIP */}
  <div className="
    mt-4 flex flex-col gap-4
    rounded-[1.5rem]
    border border-blue-100
    bg-blue-50/70
    px-4 py-4
    sm:flex-row sm:items-center sm:justify-between
    sm:px-6
    lg:mt-5
  ">

    <div className="flex items-center gap-3">

      <div className="
        flex h-10 w-10 shrink-0 items-center justify-center
        rounded-xl bg-blue-700 text-white
        shadow-md
      ">
        <Headphones className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs font-black text-slate-900 sm:text-sm">
          Need help choosing a taxi service?
        </p>

        <p className="mt-0.5 text-[10px] leading-4 text-slate-500 sm:text-xs">
          Our team can help you choose the right vehicle and service.
        </p>
      </div>

    </div>

    <div className="flex flex-wrap gap-2">

      <a
        href="tel:+919172271464"
        className="
          inline-flex items-center gap-2
          rounded-full bg-white
          px-4 py-2.5
          text-xs font-black text-blue-700
          shadow-sm transition hover:shadow-md
        "
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          rounded-full bg-green-500
          px-4 py-2.5
          text-xs font-black text-white
          shadow-sm transition hover:bg-green-600 hover:shadow-md
        "
      >
        <FaWhatsapp className="h-4 w-4" />
        WhatsApp
      </a>

    </div>

  </div>

</div>


    {/* STRONG LOCAL SEO CONTENT */}
    <article className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:mt-12 sm:p-9 lg:mt-14 lg:p-12">
      <div className="max-w-4xl">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 sm:text-xs">
          Nagpur Airport Taxi Service Guide
        </p>

        <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
          Nagpur Airport Taxi Service for
          <span className="text-blue-700"> Local &amp; Airport Travel</span>
        </h2>

        <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
          RC Tours &amp; Travels is a Nagpur-focused taxi company serving
          airport, local and outstation travel requirements. Customers can
          use the booking panel on this page to select Airport, Outstation
          One-Way, Outstation Round-Trip or Hourly Rental according to the
          journey they are planning.
        </p>
      </div>

      <div className="mt-9 grid gap-8 lg:grid-cols-2">
        <div className="space-y-7">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Nagpur Airport Pickup &amp; Drop
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Airport travel can start from residential areas, offices,
              hotels or other locations across Nagpur. Customers can enter
              the pickup and destination in the booking system and continue
              with their selected date, time and vehicle.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">
              Professional Call &amp; Booking Assistance
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              If you prefer to speak before booking, RC Tours &amp; Travels
              provides direct phone and WhatsApp contact options. Customers
              can discuss the route, vehicle requirement, timing and booking
              details before confirming their travel plan.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">
              Well-Maintained Vehicle Options
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              The fleet includes sedan, MPV and premium vehicle options.
              Customers can select the vehicle that suits their passenger,
              luggage and comfort requirements, subject to availability.
            </p>
          </div>
        </div>

        <div className="space-y-7">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              Hourly Taxi Rental in Nagpur
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Hourly rental is useful when your plan includes multiple stops.
              Available package options include 4 Hr / 40 KM, 6 Hr / 60 KM,
              8 Hr / 80 KM and 12 Hr / 120 KM, subject to applicable booking
              terms and vehicle availability.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">
              Taxi for Business &amp; Family Travel
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              Airport and local taxi requirements are not limited to one type
              of passenger. The service can be used for business meetings,
              family travel, shopping, appointments, events and planned
              city journeys.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900">
              Nagpur Local Taxi Company
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              The service is focused on Nagpur and its surrounding travel
              requirements, with coverage across major city areas. For a
              specific pickup point, use the live location search in the
              booking panel above.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-[#071a3a] p-5 text-white sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">
              Book Directly
            </p>

            <h3 className="mt-2 text-xl font-black sm:text-2xl">
              Need a Nagpur airport cab?
            </h3>

            <p className="mt-2 text-xs leading-5 text-blue-100 sm:text-sm">
              Enter your pickup, destination, date, time and vehicle above.
              You can also call or WhatsApp RC Tours &amp; Travels.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href="#hero-booking-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#071a3a] transition hover:bg-cyan-50 sm:text-sm"
            >
              Book Airport Taxi
              <ArrowRight className="h-4 w-4" />
            </a>

            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-xs font-black text-white transition hover:bg-white/10 sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </div>
        </div>
      </div>
    </article>


    {/* FAQ */}
    <section className="mt-20">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 sm:text-xs">
          Nagpur Airport Taxi FAQ
        </p>

        <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
          Questions Customers Ask
          <span className="block text-blue-700">
            Before Booking
          </span>
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          Useful information about airport taxi booking, vehicles, hourly
          rentals and Nagpur travel.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-4xl space-y-3">
        {faqs.map(([question, answer]) => (
          <details
            key={question}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-black text-slate-900 sm:px-6 sm:text-base">
              <span>{question}</span>

              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition group-open:rotate-45 group-open:bg-blue-600 group-open:text-white">
                +
              </span>
            </summary>

            <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6">
              <p className="text-sm leading-7 text-slate-600">
                {answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>


{/* FINAL CONVERSION CTA */}
<section className="relative mt-12 overflow-hidden rounded-[2rem] bg-[#061735] px-5 py-7 text-center text-white shadow-[0_20px_60px_rgba(7,26,58,.18)] sm:mt-14 sm:px-8 sm:py-9 lg:mt-16 lg:px-12 lg:py-10">
  <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
  <div className="pointer-events-none absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />

  <div className="relative mx-auto max-w-4xl">

    {/* ICON */}
    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
      <Plane className="h-5 w-5 text-cyan-300" />
    </div>

    {/* LABEL */}
    <p className="mt-3 text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300 sm:text-[10px]">
      RC Tours &amp; Travels • Nagpur
    </p>

    {/* HEADING */}
    <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
      Your Airport Journey
      <span className="block text-cyan-300">
        Starts With One Booking
      </span>
    </h2>

    {/* DESCRIPTION */}
    <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-blue-100 sm:text-sm sm:leading-7">
      Book online through the form or contact RC Tours &amp; Travels
      directly by phone or WhatsApp for assistance with your Nagpur taxi
      requirement.
    </p>

    {/* BUTTONS */}
    <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">

      <a
        href="#hero-booking-form"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-6 py-2.5 text-xs font-black text-[#061735] shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50 sm:text-sm"
      >
        Book Airport Taxi
        <ArrowRight className="h-4 w-4" />
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-2.5 text-xs font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-600 sm:text-sm"
      >
        <FaWhatsapp className="h-5 w-5" />
        WhatsApp Booking
      </a>

      <a
        href={`tel:${PHONE}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:text-sm"
      >
        <Phone className="h-4 w-4" />
        Call Now
      </a>

    </div>
  </div>
</section>

</div>
</section>


      {/* =====================================================
          WEBPAGE + SERVICE JSON-LD
      ===================================================== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `${PAGE_URL}#webpage`,
                url: PAGE_URL,
                name: "Nagpur Airport Taxi Service | RC Tours & Travels",
                description:
                  "Book a Nagpur Airport Taxi for airport pickup and drop, city transfers, hourly rental and outstation travel.",
                isPartOf: {
                  "@type": "WebSite",
                  name: "RC Tours & Travels",
                  url: WEBSITE_URL,
                },
                breadcrumb: {
                  "@id": `${PAGE_URL}#breadcrumb`,
                },
              },
              {
                "@type": "Service",
                "@id": `${PAGE_URL}#service`,
                name: "Nagpur Airport Taxi Service",
                serviceType: [
                  "Airport Taxi Service",
                  "Hourly Cab Rental",
                  "Airport Taxi",
                  "Railway Station Taxi",
                  "Outstation Taxi Service",
                ],
                provider: {
                  "@type": "TaxiService",
                  name: "RC Tours & Travels",
                  url: WEBSITE_URL,
                  telephone: PHONE,
                },
                areaServed: {
                  "@type": "City",
                  name: "Nagpur",
                },
                url: PAGE_URL,
              },
            ],
          }),
        }}
      />

      {/* =====================================================
          FAQ JSON-LD
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",

            "@type": "FAQPage",

            mainEntity:
              faqs.map(
                ([question, answer]) => ({
                  "@type":
                    "Question",

                  name: question,

                  acceptedAnswer: {
                    "@type":
                      "Answer",

                    text: answer,
                  },
                })
              ),
          }),
        }}
      />

      {/* =====================================================
          BREADCRUMB JSON-LD
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",

            "@type":
              "BreadcrumbList",
            "@id": `${PAGE_URL}#breadcrumb`,

            itemListElement: [
              {
                "@type":
                  "ListItem",

                position: 1,

                name: "Home",

                item:
                  `${WEBSITE_URL}/`,
              },

              {
                "@type":
                  "ListItem",

                position: 2,

                name:
                  "Nagpur Airport Taxi",

                item:
                  PAGE_URL,
              },
            ],
          }),
        }}
      />

      {/* =====================================================
          TAXI SERVICE JSON-LD
      ===================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context":
              "https://schema.org",

            "@type":
              "TaxiService",

            name:
              "RC Tours & Travels",

            image:
              `${WEBSITE_URL}/logo.png`,

            url:
              PAGE_URL,

            telephone:
              PHONE,

            address: {
              "@type":
                "PostalAddress",

              streetAddress:
                "No. 171, Umred Rd, Near Maruti Mandir, Dighori",

              addressLocality:
                "Nagpur",

              addressRegion:
                "Maharashtra",

              postalCode:
                "440034",

              addressCountry:
                "IN",
            },

            areaServed: {
              "@type":
                "City",

              name:
                "Nagpur",
            },

            serviceType: [
              "Airport Taxi Service",
              "Airport Cab Service",
              "Airport & Hourly Taxi Rental",
              "Airport Transfer Service",
              "Airport Taxi Service",
              "Outstation Taxi Service",
            ],

            priceRange:
              "₹₹",

            openingHours:
              "Mo-Su 00:00-23:59",
          }),
        }}
      />

        {/* Floating Call & WhatsApp Buttons */}
    <div className="fixed bottom-4 right-3 z-50 flex flex-col items-center gap-2 sm:bottom-5 md:bottom-6 md:right-4">

      {/* Mobile Large Buttons - Before Scroll */}
      {!isScrolled && (
        <div className="flex flex-col gap-2 md:hidden">

          {/* WhatsApp Large Button */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="flex h-12 w-36 items-center justify-center gap-2 rounded-full bg-green-500 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:bg-green-600"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Chat with us</span>
          </a>

          {/* Call Large Button */}
          <a
            href={`tel:${PHONE}`}
            aria-label="Call us now"
            className="flex h-12 w-36 items-center justify-center gap-2 rounded-full bg-cyan-500 text-sm font-bold text-white shadow-2xl transition-all duration-300 hover:bg-cyan-600"
          >
            <span className="text-xl">📞</span>
            <span>Call us now</span>
          </a>

        </div>
      )}

      {/* Mobile Small Buttons - After Scroll */}
      {isScrolled && (
        <div className="flex flex-col items-center gap-2 md:hidden">

          {/* Small Call */}
          <a
            href={`tel:${PHONE}`}
            aria-label="Call us"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-xl text-white shadow-2xl transition-all duration-300 hover:bg-cyan-600"
          >
            📞
          </a>

          {/* Small WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl transition-all duration-300 hover:bg-green-600"
          >
            <FaWhatsapp />
          </a>

        </div>
      )}

      {/* Desktop Existing Buttons - No Change */}
      <div className="hidden flex-col items-center gap-1 md:flex">

        {/* Call */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call us"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg text-white shadow-2xl hover:bg-cyan-600 md:h-16 md:w-16 md:text-2xl"
        >
          📞
        </a>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl hover:bg-green-600 md:h-16 md:w-16 md:text-4xl"
        >
          <FaWhatsapp />
        </a>

        {/* Discount Badge */}
        <div className="animate-pulse rounded-xl bg-green-500 px-2 py-1 text-white shadow-xl">
          <p className="whitespace-nowrap text-center text-[9px] font-bold md:text-[11px]">
            🎁 Get Discount
          </p>
        </div>

      </div>

    </div>

    </main>

    <Footer />
  </>
  );
}

/* ============================================================
   FIELD COMPONENT
============================================================ */

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">

      <label className="mb-1 flex items-center gap-1.5 text-[10px] font-black text-slate-800 sm:mb-1.5 sm:text-xs">
        {icon}
        {label}
      </label>

      {children}

    </div>
  );
}

/* ============================================================
   LOCATION INPUT COMPONENT
============================================================ */

function LocationInput({
  label,
  icon,
  value,
  placeholder,
  onChange,
  results,
  active,
  onChoose,
  inputClass,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  results: LocationResult[];
  active: boolean;
  onChoose: (
    location: LocationResult
  ) => void;
  inputClass: string;
}) {
  return (
    <div className="relative min-w-0">

      <label className="mb-1 flex items-center gap-1.5 text-[10px] font-black text-slate-800 sm:mb-1.5 sm:text-xs">
        {icon}
        {label}
      </label>

      <div className="relative">

        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          autoComplete="off"
          className={`${inputClass} pr-9`}
        />

        <Navigation className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-blue-600 sm:h-4 sm:w-4" />

      </div>

      {/* =====================================================
          LOCATION SUGGESTIONS
      ===================================================== */}

      {active &&
        results.length > 0 && (
          <div className="absolute left-0 right-0 top-[62px] z-[100] max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-2xl">

            {results.map(
              (
                location,
                index
              ) => (
                <button
                  key={`${location.display_name || location.name || "location"}-${index}`}
                  type="button"
                  onMouseDown={(event) =>
                    event.preventDefault()
                  }
                  onClick={() =>
                    onChoose(
                      location
                    )
                  }
                  className="block w-full border-b border-slate-100 px-3 py-3 text-left transition last:border-0 hover:bg-blue-50"
                >

                  <div className="text-sm font-bold text-slate-800">
                    {location.name ||
                      location.display_name ||
                      "Location"}
                  </div>

                  <div className="mt-0.5 text-xs leading-5 text-slate-500">
                    {location.full_address ||
                      location.display_name ||
                      ""}
                  </div>

                </button>
              )
            )}

          </div>
        )}

    </div>
  );
}