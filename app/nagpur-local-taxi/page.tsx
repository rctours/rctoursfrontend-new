

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import LocalCabPackages from "@/components/LocalCabPackages";
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

const PAGE_URL = `${WEBSITE_URL}/nagpur-local-taxi`;

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
   SERVICES
========================================================= */

const services = [
  [
    "🏙️",
    "City Taxi Service",
    "Reliable local cab service for shopping, meetings, appointments, family travel and everyday city movement.",
  ],
  [
    "⏱️",
    "Hourly Taxi Rental",
    "Keep the same cab for multiple stops, meetings, shopping, events and local city requirements.",
  ],
  [
    "✈️",
    "Airport Transfer",
    "Convenient pickup and drop support for Nagpur Airport and local airport travel.",
  ],
  [
    "🚉",
    "Railway Station Transfer",
    "Pickup and drop support for Nagpur Railway Station and nearby city locations.",
  ],
  [
    "💼",
    "Business Travel",
    "Comfortable transportation for office visits, client meetings and business schedules.",
  ],
  [
    "👨‍👩‍👧‍👦",
    "Family & Event Travel",
    "Practical car options for family outings, functions, weddings and special events.",
  ],
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
    "Do you provide local taxi service in Nagpur?",
    "Yes. RC Tours & Travels provides local taxi and cab services across Nagpur for city travel, meetings, shopping, family trips, events and multiple-stop journeys.",
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

export default function NagpurLocalTaxiPage() {
  const [tripType, setTripType] = useState<TripType>("hourly");

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

      <section className="relative overflow-visible bg-[#071a3a] pb-16 pt-8 text-white sm:pb-20 sm:pt-12 lg:pt-14">

{/* Breadcrumb */}
<div className="relative z-30 mx-auto max-w-[1440px] px-4 pt-7 pb-2 sm:px-6 sm:pt-7 sm:pb-3 lg:px-10">
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
      Local Taxi Service in Nagpur
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

                NAGPUR • LOCAL • AIRPORT • OUTSTATION
              </div>

              <h1 className="mt-3 max-w-[620px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-[36px] lg:text-[42px] xl:text-[46px]">
                Local Taxi Service
                <span className="block">
                  in Nagpur
                </span>
              </h1>

              <p className="mt-3 max-w-[600px] text-[13px] leading-6 text-blue-100/90 sm:mt-4 sm:text-base sm:leading-7">
                Book a reliable taxi in Nagpur for local travel, airport transfers, one-way trips, round trips and hourly
                rentals. Choose your route, date, time and preferred vehicle for a smooth and convenient booking
                experience.
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

{/* =====================================================
    NAGPUR TAXI SERVICES — SEO SERVICE SECTION
===================================================== */}

<section className="relative overflow-hidden bg-white pt-40 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28">

  {/* Background decoration */}
  <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-blue-50 blur-3xl" />
  <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-cyan-50 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-5">

    {/* =================================================
        SECTION HEADER
    ================================================= */}

    <div className="mx-auto max-w-4xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-black uppercase tracking-wider text-blue-700">
        <MapPin className="h-3.5 w-3.5" />
        Trusted Taxi Services in Nagpur
      </div>

      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
        Complete Taxi Services in
        <span className="block text-blue-700">
          Nagpur for Every Journey
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
      RC Tours &amp; Travels provides reliable{" "}
      <Link
      href="/taxi-service-in-nagpur"
      className="font-semibold text-blue-700 underline decoration-blue-200 underline-offset-2 hover:text-blue-900"
      >
      taxi service in Nagpur
      </Link>{" "}
      for local city travel, airport transfers, railway station pickup
      and drop, hourly cab rentals, business travel, family journeys
      and special occasions. Choose a suitable vehicle and book your
      cab according to your route, timing and travel requirement.
      </p>

    </div>

    {/* =================================================
        FEATURED SERVICE CARDS
    ================================================= */}

    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">

      {/* =================================================
          LOCAL TAXI
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">

          <Image
            src="/cars/dzire.webp"
            alt="Local taxi service in Nagpur by RC Tours and Travels"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-blue-700 shadow-sm">
            NAGPUR LOCAL
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-blue-600">
            <MapPin className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              City Travel
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Local Taxi Service in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Book a comfortable local taxi in Nagpur for shopping,
            office travel, meetings, appointments, family trips,
            city visits and everyday transportation. Pickup and
            drop service is available across major areas of Nagpur.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-700 hover:text-white"
          >
            Book Local Taxi
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

      {/* =================================================
          HOURLY RENTAL
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-violet-50 to-slate-100">

          <Image
            src="/ertiga.webp"
            alt="Hourly cab rental in Nagpur for multiple stops"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-violet-700 shadow-sm">
            HOURLY RENTAL
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-violet-600">
            <Clock className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Multiple Stops
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Hourly Cab Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Need a taxi for several hours? Choose an hourly cab
            rental in Nagpur for shopping, meetings, appointments,
            multiple stops, events and extended city travel with
            convenient hourly packages.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-black text-violet-700 transition hover:bg-violet-700 hover:text-white"
          >
            Book Hourly Cab
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

      {/* =================================================
          AIRPORT TAXI
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-cyan-50 to-slate-100">

          <Image
            src="/cars/crysta.webp"
            alt="Nagpur Airport taxi pickup and drop service"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-cyan-700 shadow-sm">
            AIRPORT TRANSFER
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-cyan-600">
            <Plane className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Pickup &amp; Drop
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Nagpur Airport Taxi Service
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
          Travel comfortably to or from Nagpur Airport with a{" "}
          <Link
          href="/nagpur-airport-taxi"
          className="font-semibold text-cyan-700 underline decoration-cyan-200 underline-offset-2 hover:text-cyan-900"
          >
          Nagpur Airport Taxi Service
          </Link>
          . Ideal for early morning flights, late-night arrivals,
          family travel, business trips and scheduled airport pickup
          and drop requirements.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-cyan-50 px-4 py-2.5 text-sm font-black text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
          >
            Book Airport Taxi
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

      {/* =================================================
          RAILWAY STATION
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-orange-50 to-slate-100">

          <Image
            src="/cars/rumion.webp"
            alt="Nagpur railway station taxi pickup and drop"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-orange-700 shadow-sm">
            RAILWAY TRANSFER
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-orange-600">
            <Navigation className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Station Pickup
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Railway Station Taxi in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Book a taxi for Nagpur Railway Station pickup and drop.
            Our cab service connects the railway station with homes,
            hotels, offices, residential areas and other destinations
            across Nagpur.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-black text-orange-700 transition hover:bg-orange-600 hover:text-white"
          >
            Book Station Taxi
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

      {/* =================================================
          CORPORATE
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-emerald-50 to-slate-100">

          <Image
            src="/cars/crysta.webp"
            alt="Corporate taxi service in Nagpur for business travel"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-emerald-700 shadow-sm">
            BUSINESS TRAVEL
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-emerald-600">
            <WalletCards className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Professional Travel
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Corporate Taxi Service in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Reliable corporate cab service in Nagpur for office visits,
            client meetings, business appointments, employee travel
            and professional schedules. Choose a comfortable vehicle
            according to your business travel requirement.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-black text-emerald-700 transition hover:bg-emerald-600 hover:text-white"
          >
            Book Business Cab
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

      {/* =================================================
          FAMILY & EVENTS
      ================================================= */}

      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-pink-200 hover:shadow-2xl">

        <div className="relative h-44 overflow-hidden bg-gradient-to-br from-pink-50 to-slate-100">

          <Image
            src="/cars/rumion.webp"
            alt="Family taxi service in Nagpur for events and outings"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black text-pink-700 shadow-sm">
            FAMILY &amp; EVENTS
          </div>

        </div>

        <div className="flex flex-1 flex-col p-5">

          <div className="flex items-center gap-2 text-pink-600">
            <Car className="h-4 w-4" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              Comfortable Travel
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
          Family &amp; Event Taxi Service in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Comfortable taxi options for family outings, weddings,
            functions, shopping trips, events and special occasions
            in Nagpur. Select a suitable sedan, SUV or premium vehicle
            based on your group and travel needs.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-4 inline-flex items-center gap-2 self-start rounded-xl bg-pink-50 px-4 py-2.5 text-sm font-black text-pink-700 transition hover:bg-pink-600 hover:text-white"
          >
            Book Family Cab
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>

      </article>

    </div>

    {/* =================================================
        SEO CONTENT / WHY RC TOURS
    ================================================= */}

    <div className="mt-8 overflow-hidden rounded-2xl bg-[#071a3a] px-5 py-6 text-white shadow-xl sm:px-8 lg:px-10">

      <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-center">

        <div>

          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-300">
            Why Choose RC Tours &amp; Travels
          </p>

          <h3 className="mt-2 text-2xl font-black sm:text-3xl">
            A Reliable Cab Partner for Travel Across Nagpur
          </h3>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-blue-100 sm:text-base">
            Whether you need a local taxi for a few hours, an airport
            transfer, railway station pickup, business cab or family
            vehicle, RC Tours &amp; Travels offers practical travel
            options from Nagpur. Our booking panel makes it easy to
            select your pickup, destination, date, time and preferred
            vehicle before continuing with your booking.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <ShieldCheck className="h-6 w-6 text-cyan-300" />
            <p className="mt-3 text-sm font-black">
              Safe &amp; Reliable
            </p>
            <p className="mt-1 text-xs text-blue-100">
              Customer-first travel
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Headphones className="h-6 w-6 text-cyan-300" />
            <p className="mt-3 text-sm font-black">
              24/7 Support
            </p>
            <p className="mt-1 text-xs text-blue-100">
              Booking assistance
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <WalletCards className="h-6 w-6 text-cyan-300" />
            <p className="mt-3 text-sm font-black">
              Clear Pricing
            </p>
            <p className="mt-1 text-xs text-blue-100">
              Simple fare process
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <Car className="h-6 w-6 text-cyan-300" />
            <p className="mt-3 text-sm font-black">
              Multiple Vehicles
            </p>
            <p className="mt-1 text-xs text-blue-100">
              Sedan, SUV &amp; premium
            </p>
          </div>

        </div>

      </div>

    </div>

    {/* =================================================
        FINAL LOCAL SEO PARAGRAPH
    ================================================= */}

    <div className="mx-auto mt-7 max-w-4xl text-center">

      <h3 className="text-2xl font-black text-slate-900 sm:text-3xl">
        Book a Taxi in Nagpur for Local &amp; Daily Travel
      </h3>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        Looking for a taxi service in Nagpur for local travel?
        RC Tours &amp; Travels provides cab booking options for
        Dighori, Manish Nagar, Wardha Road, Sitabuldi, Dharampeth,
        Sadar, Civil Lines, Besa, MIHAN and other parts of Nagpur.
        Book a local cab, hourly taxi, airport transfer or railway
        station taxi according to your travel requirement.
      </p>

    </div>

  </div>

</section>

{/* ===================================================
    LOCAL CAB PACKAGES
=================================================== */}

<section className="-mt-40 pt-0 sm:-mt-14 sm:pt-0">
  <LocalCabPackages />
</section>

        {/* ===================================================
            FLEET
        =================================================== */}

        <section className="mx-auto max-w-7xl px-4 py-7 sm:px-5 sm:py-12">

          <div className="text-center">

            <p className="text-xs font-black uppercase tracking-widest text-blue-600">
              Local Taxi Fleet
            </p>

            <h2 className="mt-2 text-2xl font-black leading-tight sm:text-4xl">
              Cars for Local Taxi Booking in Nagpur
            </h2>

            <p className="mx-auto mt-2 max-w-3xl text-xs leading-5 text-slate-600 sm:mt-3 sm:text-sm sm:leading-6">
              Choose a vehicle according to
              passenger count, comfort and
              travel requirement.
            </p>

          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {fleet.map((car) => (
              <div
                key={car.name}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="relative h-40 sm:h-52">

                  <Image
                    src={car.image}
                    alt={`${car.name} local taxi in Nagpur`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />

                </div>

                <div className="p-4 sm:p-5">

                  <h3 className="text-lg font-black sm:text-xl">
                    {car.name}
                  </h3>

                  <p className="mt-1.5 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">
                    {car.text}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setVehicle(
                        car.vehicleValue
                      );

                      document
                        .getElementById(
                          "hero-booking-form"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                          block:
                            "center",
                        });
                    }}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-black text-blue-700 sm:mt-4"
                  >
                    Select Vehicle

                    <ArrowRight className="h-4 w-4" />
                  </button>

                </div>

              </div>
            ))}

          </div>

          <div className="mt-7 text-center">

            <Link
              href="/fleet"
              className="inline-flex rounded-xl border border-slate-300 px-6 py-3 text-sm font-black transition hover:bg-slate-50"
            >
              View Complete Fleet

              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Link>

          </div>

        </section>

        {/* ===================================================
            SERVICE AREA
        =================================================== */}

        <section className="bg-slate-50 py-10 sm:py-12">

          <div className="mx-auto max-w-6xl px-4 sm:px-5">

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

              <div className="text-center">

                <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                  Nagpur Service Area
                </p>

                <h2 className="mt-2 text-3xl font-black sm:text-4xl">
                  Local Taxi Service Across Nagpur
                </h2>

                <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                  RC Tours & Travels serves
                  customers across major Nagpur
                  areas, subject to availability
                  and booking requirements.
                </p>

              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">

                {areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700"
                  >
                    📍 {area}
                  </span>
                ))}

              </div>

            </div>

          </div>

        </section>

{/* ===================================================
    WHY CHOOSE / BOOKING PROCESS
=================================================== */}

<section className="mx-auto max-w-5xl px-4 py-7 sm:px-5 sm:py-12">

  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7">

    <p className="text-center text-[11px] font-black uppercase tracking-widest text-blue-600 sm:text-xs">
      Why RC Tours & Travels
    </p>

    <h2 className="mt-2 text-center text-2xl font-black leading-tight text-slate-900 sm:text-4xl">
    How to Book a Local Taxi Service in Nagpur
    </h2>

    <div className="mt-5 grid gap-2.5 sm:mt-6 sm:grid-cols-2 sm:gap-4">

      {[
        "Choose Airport, One-Way, Round-Trip or Hourly Rental.",
        "Search and select pickup and drop locations from location suggestions.",
        "Choose your travel date, pickup time and vehicle.",
        "Round-trip minimum billing logic is applied by the existing fare flow.",
        "Hourly rental uses the selected duration and included-kilometre package.",
        "Continue to the existing /book-cab booking flow for customer details and confirmation.",
      ].map((item, index) => (
        <div
          key={item}
          className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 sm:gap-3 sm:rounded-2xl sm:p-4"
        >

          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 sm:h-5 sm:w-5" />

          <p className="text-xs leading-5 text-slate-700 sm:text-sm sm:leading-6">
            {item}
          </p>

        </div>
      ))}

    </div>

  </div>

</section>

{/* ===================================================
    SEO CONTENT
=================================================== */}

<section className="mx-auto max-w-5xl px-4 pb-7 sm:px-5 sm:pb-12">

  <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-7">

    <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 sm:text-xs">
      Nagpur Local Cab Guide
    </p>

    <h2 className="mt-2 text-xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
    Local Taxi Service in Nagpur for City, Airport & Hourly Travel
    </h2>

    <div className="mt-3 space-y-3 text-xs leading-6 text-slate-600 sm:mt-4 sm:space-y-4 sm:text-base sm:leading-7">

      <p>
        RC Tours &amp; Travels provides local taxi service in Nagpur for
        city travel, office visits, shopping, appointments, family
        journeys, meetings, events and multiple-stop trips. Customers
        can choose a suitable cab based on the number of passengers,
        comfort requirements and expected travel duration.
      </p>

      <p>
        For customers who need a car for several hours, our local
        hourly taxi rental options include 4 Hr / 40 KM, 6 Hr / 60 KM,
        8 Hr / 80 KM and 12 Hr / 120 KM packages. These packages are
        useful when you need the same vehicle for multiple stops around
        Nagpur instead of booking separate rides.
      </p>

      <p>
        The booking panel on this page also supports airport transfers,
        outstation one-way trips and round-trip travel. You can enter
        your pickup and destination, select your travel date and time,
        choose a vehicle, and continue to the existing booking flow.
      </p>

      <p>
        Local taxi bookings are available across areas such as Dighori,
        Manish Nagar, Wardha Road, Sitabuldi, Dharampeth, Sadar, Civil
        Lines, Besa, MIHAN and other parts of Nagpur, subject to
        availability and booking requirements.
      </p>

      <p>
        Available vehicle choices include Swift Dzire, Ertiga, Toyota
        Rumion, Innova Crysta and larger vehicles such as Tempo Traveller
        and Force Urbania, subject to availability. For assistance with a
        local cab, hourly rental or airport taxi, customers can contact
        RC Tours &amp; Travels by phone or WhatsApp.
      </p>

    </div>

  </article>

</section>

        {/* ===================================================
            FAQ
        =================================================== */}

        <section className="bg-slate-50 py-10 sm:py-12">

          <div className="mx-auto max-w-5xl px-5">

            <div className="text-center">

              <p className="text-xs font-black uppercase tracking-widest text-blue-600">
                Local Taxi FAQ
              </p>

              <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Local Taxi Service in Nagpur – Frequently Asked Questions
              </h2>

            </div>

            <div className="mt-6 space-y-3">

              {faqs.map(
                ([question, answer]) => (
                  <details
                    key={question}
                    className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                  >

                    <summary className="cursor-pointer list-none text-base font-black sm:text-lg">
                      {question}
                    </summary>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {answer}
                    </p>

                  </details>
                )
              )}

            </div>

          </div>

        </section>

{/* ===================================================
    FINAL CTA
=================================================== */}

<section className="mx-auto max-w-5xl px-4 py-7 sm:px-5 sm:py-12">

  <div className="rounded-3xl bg-[#071a3a] p-4 text-center text-white shadow-xl sm:p-10">

    <div className="text-3xl sm:text-4xl">
      🚕
    </div>

    <h2 className="mt-3 text-2xl font-black leading-tight sm:mt-4 sm:text-4xl">
      Need a Local Taxi in Nagpur?
    </h2>

    <p className="mx-auto mt-2.5 max-w-3xl text-xs leading-5 text-blue-100 sm:mt-3 sm:text-base sm:leading-6">
      Choose your service, vehicle, date and time, then continue to
      booking. You can also contact RC Tours &amp; Travels directly
      through WhatsApp or phone.
    </p>

    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-5 sm:flex sm:flex-row sm:justify-center sm:gap-3">

      <a
        href="#hero-booking-form"
        className="col-span-2 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-black text-[#12346f] transition hover:bg-blue-50 sm:col-span-1 sm:px-7 sm:py-3.5 sm:text-sm"
      >
        Book Local Taxi
      </a>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-600 sm:px-5 sm:text-[13px]"
      >
        <FaWhatsapp className="h-4 w-4 sm:h-5 sm:w-5" />
        WhatsApp
      </a>

      <a
        href={`tel:${PHONE}`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-xs font-black transition hover:bg-white/10 sm:px-7 sm:py-3.5 sm:text-sm"
      >
        Call Now
      </a>

    </div>

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
                name: "Local Taxi Service in Nagpur | RC Tours & Travels",
                description:
                  "Book a local taxi in Nagpur for city travel, hourly cab rental, airport transfer, railway station pickup and outstation trips.",
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
                name: "Local Taxi Service in Nagpur",
                serviceType: [
                  "Local Taxi Service",
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
                  "Nagpur Local Taxi",

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
                "New Narsala Rd, Beldar Nagar, Dighori",

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
              "Local Taxi Service",
              "Local Cab Service",
              "Hourly Taxi Rental",
              "City Taxi Service",
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