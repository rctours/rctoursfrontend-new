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

const PAGE_URL = `${WEBSITE_URL}/car-rental-in-nagpur`;

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
    "City Car Rental",
    "Reliable car rental with driver for shopping, meetings, appointments, family travel and everyday city movement.",
  ],
  [
    "⏱️",
    "Hourly Car Rental",
    "Keep the same car for multiple stops, meetings, shopping, events and local city requirements.",
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
    "Do you provide local car rental service in Nagpur?",
    "Yes. RC Tours & Travels provides chauffeur-driven car rental services across Nagpur for city travel, meetings, shopping, family trips, events and multiple-stop journeys.",
  ],
  [
    "Which car rental packages are available?",
    "Local rental options include 4 Hr / 40 KM, 6 Hr / 60 KM, 8 Hr / 80 KM and 12 Hr / 120 KM packages, subject to vehicle availability and applicable booking terms.",
  ],
  [
    "Can I choose the car myself?",
    "Yes. Customers can select from sedan, MPV, premium and larger vehicle options according to passenger count and travel requirements.",
  ],
  [
    "Can I book airport, one-way and round-trip car rental from this page?",
    "Yes. The booking panel supports Airport, Outstation One-Way, Outstation Round-Trip and Hourly Rental modes.",
  ],
  [
    "Can I book an hourly car rental for multiple stops?",
    "Yes. Hourly car rental is suitable for multiple local stops, meetings, shopping, appointments, events and extended city travel.",
  ],
  [
    "Can I book a car through WhatsApp or phone?",
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

function LocationInput({
  label,
  icon,
  value,
  onChange,
  placeholder,
  results,
  active,
  onChoose,
  inputClass,
}: {
  label: string;
  icon: ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  results: LocationResult[];
  active: boolean;
  onChoose: (result: LocationResult) => void;
  inputClass: string;
}) {
  return (
    <div className="relative min-w-0">
      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">
        {icon}
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={inputClass}
      />
      {active && results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-1 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-2xl">
          {results.map((result, index) => {
            const title = result.name || result.display_name || "Location";
            const subtitle = result.full_address || result.display_name || "";
            return (
              <button
                key={`${title}-${index}`}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => onChoose(result)}
                className="flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left transition hover:bg-blue-50"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                <span className="min-w-0">
                  <span className="block truncate text-xs font-bold text-slate-800">
                    {title}
                  </span>
                  {subtitle && (
                    <span className="mt-0.5 block line-clamp-2 text-[10px] leading-4 text-slate-500">
                      {subtitle}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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
      <label className="mb-1.5 flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wide text-slate-600">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CarRentalInNagpurPage() {
  const [tripType, setTripType] = useState<TripType>("hourly");



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
   SCROLL STATE — MOBILE FLOATING BUTTONS
======================================================= */

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
<div className="relative z-30 mx-auto max-w-[1440px] px-4 pt-12 pb-2 sm:px-6 sm:pt-7 sm:pb-3 lg:px-10">
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
      Car Rental in Nagpur
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

                NAGPUR • CAR RENTAL • LOCAL • OUTSTATION
              </div>

              <h1 className="mt-3 max-w-[620px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-[36px] lg:text-[42px] xl:text-[46px]">
                Car Rental in Nagpur
                <span className="block">
                  with Driver
                </span>
              </h1>

              <p className="mt-3 max-w-[600px] text-[13px] leading-6 text-blue-100/90 sm:mt-4 sm:text-base sm:leading-7">
                Book a reliable car rental in Nagpur with driver for local travel, airport transfers, one-way trips, round trips and hourly
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
      Book Your Car
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
              alt="RC Tours and Travels car rental service in Nagpur"
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
    CAR RENTAL FLEET + SEO CONTENT — NAGPUR
===================================================== */}

<section className="relative overflow-hidden bg-slate-50 pb-16 pt-[152px] sm:py-20 lg:py-24">
  {/* Background decoration */}
  <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
  <div className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-cyan-100/50 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-5">

    {/* =====================================================
        SECTION HEADER
    ===================================================== */}

    <div className="mx-auto max-w-4xl text-center">

      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-[11px] font-black uppercase tracking-wider text-blue-700 shadow-sm">
        <Car className="h-3.5 w-3.5" />
        Car Rental Fleet in Nagpur
      </div>

      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[44px]">
        Choose the Right Car for Your
        <span className="block text-blue-700">
          Rental in Nagpur
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
        Looking for a comfortable car rental in Nagpur with a driver?
        Choose from our range of sedan, family cars, premium SUVs and
        group travel vehicles according to your passengers, luggage,
        destination and journey requirement. RC Tours &amp; Travels
        provides chauffeur-driven cars for local travel, airport
        transfers, business trips, family outings, weddings, sightseeing
        and outstation journeys from Nagpur.
      </p>

    </div>


    {/* =====================================================
        FLEET GRID
    ===================================================== */}

    <div
      className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
    >

      {/* =====================================================
          SWIFT DZIRE
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100">

          <Image
            src="/cars/dzire.webp"
            alt="Swift Dzire car rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-blue-700 shadow-sm">
            Sedan
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Swift Dzire Car Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            A reliable and comfortable sedan for city travel, airport
            transfers, office visits, shopping, local sightseeing and
            everyday transportation in Nagpur. A practical choice for
            individuals and small families looking for affordable
            chauffeur-driven car rental service.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-700">
              4 Passengers
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              City &amp; Airport
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-700 hover:text-white"
          >
            Book Dzire
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>


      {/* =====================================================
          ERTIGA
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-emerald-50 to-slate-100">

          <Image
            src="/ertiga.webp"
            alt="Maruti Ertiga car rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-emerald-700 shadow-sm">
            Family Car
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Ertiga Car Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            A spacious family-friendly car for city rides, airport
            pickup and drop, family outings, sightseeing and longer
            journeys. The Ertiga is a convenient option when you need
            more seating space and luggage capacity than a regular
            sedan.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
              Family Travel
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              Spacious
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm font-black text-emerald-700 transition hover:bg-emerald-700 hover:text-white"
          >
            Book Ertiga
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>


      {/* =====================================================
          TOYOTA RUMION
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-violet-50 to-slate-100">

          <Image
            src="/cars/rumion.webp"
            alt="Toyota Rumion car rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-violet-700 shadow-sm">
            MPV
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Toyota Rumion Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Choose Toyota Rumion rental in Nagpur for family travel,
            airport transfers, local sightseeing and comfortable
            outstation journeys. Its spacious cabin makes it suitable
            for passengers travelling with additional luggage and
            wanting a relaxed chauffeur-driven journey.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-violet-50 px-3 py-1 text-[10px] font-bold text-violet-700">
              Spacious
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              Family Trips
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-50 px-4 py-2.5 text-sm font-black text-violet-700 transition hover:bg-violet-700 hover:text-white"
          >
            Book Rumion
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>


      {/* =====================================================
          INNOVA CRYSTA
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-orange-50 to-slate-100">

          <Image
            src="/cars/crysta.webp"
            alt="Innova Crysta rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-orange-700 shadow-sm">
            Premium
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Innova Crysta Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Premium chauffeur-driven Innova Crysta rental for business
            travel, family trips, weddings, airport transfers,
            sightseeing and long-distance journeys. Choose Crysta when
            comfort, spacious seating and a premium travel experience
            are important for your trip from Nagpur.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-orange-50 px-3 py-1 text-[10px] font-bold text-orange-700">
              Premium Comfort
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              Outstation
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2.5 text-sm font-black text-orange-700 transition hover:bg-orange-600 hover:text-white"
          >
            Book Crysta
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>


      {/* =====================================================
          TEMPO TRAVELLER
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-cyan-50 to-slate-100">

          <Image
            src="/tempo traveller.webp"
            alt="Tempo Traveller rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-cyan-700 shadow-sm">
            Group Travel
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Tempo Traveller Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tempo Traveller rental in Nagpur is a convenient option
            for larger families, corporate groups, tours, weddings,
            events and outstation travel. Choose a group vehicle when
            travelling together is more comfortable than using multiple
            smaller cars.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-bold text-cyan-700">
              13 &amp; 17 Seater
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              Group Tours
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-2.5 text-sm font-black text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
          >
            Book Traveller
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>


      {/* =====================================================
          FORCE URBANIA
      ===================================================== */}

      <article className="group min-w-[88%] snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl sm:min-w-0">

        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-indigo-50 to-slate-100">

          <Image
            src="/urbania.webp"
            alt="Force Urbania rental in Nagpur with driver"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain p-5 mix-blend-multiply transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-indigo-700 shadow-sm">
            Premium Group
          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-black text-slate-900">
            Force Urbania Rental in Nagpur
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Force Urbania rental with driver for corporate groups,
            family tours, weddings, events and premium outstation
            journeys from Nagpur. It is designed for group travel where
            passengers want a more comfortable and spacious travel
            arrangement.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold text-indigo-700">
              17 Seater
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              With Driver
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
              Premium Group
            </span>

          </div>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2.5 text-sm font-black text-indigo-700 transition hover:bg-indigo-700 hover:text-white"
          >
            Book Urbania
            <ArrowRight className="h-4 w-4" />
          </a>

        </div>
      </article>

    </div>

    {/* Mobile swipe hint */}
    <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 sm:hidden">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
      <span>Swipe to explore more vehicles</span>
      <ArrowRight className="h-3.5 w-3.5" />
    </div>


{/* =====================================================
    VEHICLE SELECTION SEO CONTENT
===================================================== */}

<div className="mt-8 grid gap-5 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">

  {/* =====================================================
      LEFT SEO CONTENT
  ===================================================== */}

  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-8">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-[11px]">
      Car Rental Guide
    </p>

    <h3 className="mt-2 text-xl font-black leading-snug text-slate-900 sm:mt-3 sm:text-3xl">
      Which Car Rental is Best for Your Journey in Nagpur?
    </h3>

    <div className="mt-3 space-y-3 text-xs leading-5 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-7">

      <p>
        Choosing the right car rental in Nagpur depends on the number
        of passengers, luggage, destination, travel duration and the
        type of journey you are planning. For a short city ride or
        airport transfer, a sedan such as Swift Dzire can be a
        practical choice. Families travelling with more passengers
        may prefer Ertiga or Toyota Rumion for additional space.
      </p>

      <p>
        For premium family travel, business transportation, weddings
        and longer journeys, Innova Crysta offers a more spacious
        and comfortable option. If you are travelling as a larger
        group, Tempo Traveller and Force Urbania provide group
        transportation with a dedicated driver, making it easier
        for everyone to travel together.
      </p>

      <p>
        RC Tours &amp; Travels provides chauffeur-driven car rental
        services in Nagpur for local rental, airport pickup and drop,
        railway station transfers, corporate travel, family trips,
        sightseeing and outstation journeys. You can select a
        suitable vehicle based on your actual travel requirement
        instead of choosing a car only by its model.
      </p>

    </div>

  </div>


  {/* =====================================================
      RIGHT SELECTION BOX
  ===================================================== */}

  <div className="rounded-2xl bg-[#071a3a] p-4 text-white shadow-xl sm:rounded-3xl sm:p-8">

    <h3 className="text-xl font-black sm:text-2xl">
      Quick Car Selection Guide
    </h3>

    <p className="mt-1 text-xs leading-5 text-blue-100 sm:mt-2 sm:text-sm">
      Not sure which vehicle to choose? Use this simple guide.
    </p>

    <div className="mt-4 grid gap-2.5 sm:mt-6 sm:gap-3">

      <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
        <p className="text-xs font-black text-white sm:text-base">
          1–4 Passengers
        </p>

        <p className="mt-1 text-[11px] leading-4 text-blue-100 sm:text-sm sm:leading-6">
          Swift Dzire is suitable for regular city travel,
          airport transfers and small family journeys.
        </p>
      </div>


      <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
        <p className="text-xs font-black text-white sm:text-base">
          Family &amp; More Space
        </p>

        <p className="mt-1 text-[11px] leading-4 text-blue-100 sm:text-sm sm:leading-6">
          Ertiga or Toyota Rumion can be considered when
          additional passenger and luggage space is required.
        </p>
      </div>


      <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
        <p className="text-xs font-black text-white sm:text-base">
          Premium Travel
        </p>

        <p className="mt-1 text-[11px] leading-4 text-blue-100 sm:text-sm sm:leading-6">
          Innova Crysta is a strong option for comfortable
          family, business and long-distance travel.
        </p>
      </div>


      <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:rounded-2xl sm:p-4">
        <p className="text-xs font-black text-white sm:text-base">
          Large Groups
        </p>

        <p className="mt-1 text-[11px] leading-4 text-blue-100 sm:text-sm sm:leading-6">
          Tempo Traveller or Force Urbania can be used for
          group tours, events, corporate travel and family trips.
        </p>
      </div>

    </div>

  </div>

</div>


{/* =====================================================
    TYPES OF CAR RENTAL SERVICES
===================================================== */}

<div className="mt-10 sm:mt-14">

  <div className="mx-auto max-w-3xl text-center">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
      Rental Options
    </p>

    <h3 className="mt-2 text-xl font-black text-slate-900 sm:mt-3 sm:text-3xl">
      Car Rental Services Available in Nagpur
    </h3>

    <p className="mt-2 text-xs leading-5 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
      From short city rentals to airport transfers and long-distance
      journeys, choose the rental service according to your travel plan.
    </p>

  </div>


  <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">

    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 sm:h-11 sm:w-11">
        <Car className="h-5 w-5 text-blue-700" />
      </div>

      <h4 className="mt-3 text-base font-black text-slate-900 sm:mt-4 sm:text-lg">
        Local Car Rental
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Chauffeur-driven local car rental for office work,
        shopping, meetings, personal work, family travel and
        city transportation in Nagpur.
      </p>

      <a
        href="/nagpur-local-taxi"
        className="mt-3 inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900 sm:mt-4 sm:text-sm"
      >
        Explore Local Taxi
        <ArrowRight className="h-4 w-4" />
      </a>

    </article>


    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 sm:h-11 sm:w-11">
        <Plane className="h-5 w-5 text-cyan-700" />
      </div>

      <h4 className="mt-3 text-base font-black text-slate-900 sm:mt-4 sm:text-lg">
        Airport Car Rental
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Book a car with driver for Nagpur Airport pickup and
        drop, including scheduled airport travel.
      </p>

      <a
        href="/airport-taxi-nagpur"
        className="mt-3 inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900 sm:mt-4 sm:text-sm"
      >
        Airport Taxi Service
        <ArrowRight className="h-4 w-4" />
      </a>

    </article>


    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 sm:h-11 sm:w-11">
        <Car className="h-5 w-5 text-emerald-700" />
      </div>

      <h4 className="mt-3 text-base font-black text-slate-900 sm:mt-4 sm:text-lg">
        Outstation Car Rental
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Comfortable chauffeur-driven cars for one-way and round
        trip travel from Nagpur to nearby cities, tourist
        destinations and other locations across India.
      </p>

      <a
        href="/fare-calculator"
        className="mt-3 inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900 sm:mt-4 sm:text-sm"
      >
        Calculate Fare
        <ArrowRight className="h-4 w-4" />
      </a>

    </article>


    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 sm:h-11 sm:w-11">
        <UserRoundCheck className="h-5 w-5 text-violet-700" />
      </div>

      <h4 className="mt-3 text-base font-black text-slate-900 sm:mt-4 sm:text-lg">
        Corporate Car Rental
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Professional chauffeur-driven transportation for meetings,
        office visits, corporate guests, business travel and
        company requirements in Nagpur.
      </p>

      <a
        href="/services"
        className="mt-3 inline-flex items-center gap-1 text-xs font-black text-blue-700 hover:text-blue-900 sm:mt-4 sm:text-sm"
      >
        View Our Services
        <ArrowRight className="h-4 w-4" />
      </a>

    </article>

  </div>

</div>


{/* =====================================================
    NAGPUR SERVICE AREA SEO
===================================================== */}

<div className="mt-10 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm sm:mt-14 sm:rounded-3xl sm:p-9">

  <div className="mx-auto max-w-5xl text-center">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
      Serving Nagpur
    </p>

    <h3 className="mt-2 text-xl font-black leading-tight text-slate-900 sm:mt-3 sm:text-3xl">
      Car Rental Service Across Nagpur
    </h3>

    <p className="mt-3 text-xs leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
      RC Tours &amp; Travels provides chauffeur-driven car rental
      services across Nagpur for local travel, airport transfers,
      railway station transfers, business trips, family travel,
      sightseeing and outstation journeys. Customers can share
      their pickup point, destination and travel requirement to
      find a suitable vehicle.
    </p>

    <p className="mt-3 text-xs leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
      Our service is designed for customers searching for
      <strong className="font-black text-slate-800">
        {" "}car rental in Nagpur with driver
      </strong>,
      chauffeur-driven car hire in Nagpur, local car rental,
      airport car rental, family car rental and outstation taxi
      service from Nagpur. Vehicle availability depends on the
      selected date, time and travel requirement.
    </p>

  </div>


  <div className="mt-5 flex flex-wrap justify-center gap-1.5 sm:mt-7 sm:gap-2">

    {[
      "Nagpur City",
      "Dighori",
      "Narsala",
      "Manewada",
      "Manish Nagar",
      "Somalwada",
      "Besa",
      "Beltarodi",
      "Khamla",
      "Pratap Nagar",
      "Trimurti Nagar",
      "Narendra Nagar",
      "Chhatrapati Square",
      "Wardha Road",
      "MIHAN",
      "Wardhaman Nagar",
      "Sadar",
      "Dharampeth",
      "Sitabuldi",
      "Civil Lines",
      "Medical Square",
      "Mankapur",
      "Koradi",
      "Wadi",
      "Hingna Road",
      "Nagpur Airport",
      "Nagpur Railway Station",
    ].map((area) => (
      <span
        key={area}
        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-bold text-slate-700 sm:px-4 sm:py-2 sm:text-xs"
      >
        {area}
      </span>
    ))}

  </div>

</div>


{/* =====================================================
    USE CASE SEO SECTION
===================================================== */}

<div className="mt-10 sm:mt-14">

  <div className="mx-auto max-w-3xl text-center">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
      Travel for Every Need
    </p>

    <h3 className="mt-2 text-xl font-black text-slate-900 sm:mt-3 sm:text-3xl">
      When Do People Book a Car Rental in Nagpur?
    </h3>

  </div>


  <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">

    {[
      {
        title: "Airport Transfers",
        text: "Comfortable pickup and drop service for Nagpur Airport travel with a pre-booked chauffeur-driven car.",
      },
      {
        title: "Family Trips",
        text: "Spacious cars for family outings, visiting relatives, sightseeing and planned journeys from Nagpur.",
      },
      {
        title: "Business Travel",
        text: "Professional transportation for meetings, office visits, corporate guests and business travel.",
      },
      {
        title: "Weddings & Events",
        text: "Cars and larger group vehicles for weddings, functions, events and guest transportation.",
      },
      {
        title: "Outstation Trips",
        text: "Sedans, MPVs and premium vehicles for one-way and round-trip travel from Nagpur.",
      },
      {
        title: "Tour & Sightseeing",
        text: "Comfortable chauffeur-driven travel for sightseeing and popular destinations around Nagpur.",
      },
    ].map((item) => (
      <article
        key={item.title}
        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
      >
        <h4 className="text-base font-black text-slate-900 sm:text-lg">
          {item.title}
        </h4>

        <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
          {item.text}
        </p>
      </article>
    ))}

  </div>

</div>


{/* =====================================================
    WHY CHOOSE RC TOURS
===================================================== */}

<div className="mt-10 grid gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-[0.9fr_1.1fr]">

  <div className="rounded-2xl bg-[#071a3a] p-5 text-white shadow-xl sm:rounded-3xl sm:p-9">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-200 sm:text-xs">
      Why Choose Us
    </p>

    <h3 className="mt-2 text-xl font-black leading-tight sm:mt-3 sm:text-3xl">
      A Simple &amp; Reliable Way to Hire a Car in Nagpur
    </h3>

    <p className="mt-3 text-xs leading-6 text-blue-100 sm:mt-4 sm:text-sm sm:leading-7">
      We focus on making car booking simple. Share your pickup,
      destination, date and vehicle requirement, and choose a
      suitable chauffeur-driven car for your journey.
    </p>

    <a
      href="#hero-booking-form"
      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-black text-[#12346f] transition hover:bg-blue-50 sm:mt-6 sm:px-5 sm:py-3 sm:text-sm"
    >
      <CalendarDays className="h-4 w-4" />
      Check Car Availability
    </a>

  </div>


  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h4 className="text-base font-black text-slate-900 sm:text-lg">
        Chauffeur-Driven Service
      </h4>
      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Our car rental service is designed for customers who
        want a vehicle with a driver for local, airport or
        outstation travel.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h4 className="text-base font-black text-slate-900 sm:text-lg">
        Multiple Vehicle Options
      </h4>
      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Select from sedan, family cars, premium vehicles and
        larger group transportation according to your requirement.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h4 className="text-base font-black text-slate-900 sm:text-lg">
        Local &amp; Outstation
      </h4>
      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        One service for city travel, airport transfers,
        sightseeing, business travel and journeys outside Nagpur.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <h4 className="text-base font-black text-slate-900 sm:text-lg">
        Easy Online Booking
      </h4>
      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Enter your travel details in the booking form and
        continue with the available vehicle and fare options.
      </p>
    </div>

  </div>

</div>


{/* =====================================================
    HOW TO BOOK SEO CONTENT
===================================================== */}

<div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:mt-14 sm:rounded-3xl sm:p-9">

  <div className="mx-auto max-w-4xl text-center">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
      Easy Booking Process
    </p>

    <h3 className="mt-2 text-xl font-black text-slate-900 sm:mt-3 sm:text-3xl">
      How to Book a Car Rental in Nagpur
    </h3>

    <p className="mt-3 text-xs leading-6 text-slate-600 sm:mt-4 sm:text-base sm:leading-7">
      Booking a chauffeur-driven car with RC Tours &amp; Travels
      is simple. Provide your travel details so we can understand
      your route, date and vehicle requirement.
    </p>

  </div>


  <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3 sm:gap-5">

    <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
      <div className="text-xl font-black text-blue-700 sm:text-2xl">
        01
      </div>

      <h4 className="mt-2 text-base font-black text-slate-900 sm:mt-3 sm:text-lg">
        Enter Your Journey
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Add your pickup location, destination, journey date
        and required travel details.
      </p>
    </div>


    <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
      <div className="text-xl font-black text-blue-700 sm:text-2xl">
        02
      </div>

      <h4 className="mt-2 text-base font-black text-slate-900 sm:mt-3 sm:text-lg">
        Choose Your Vehicle
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Select a suitable sedan, family car, premium vehicle
        or group transportation option.
      </p>
    </div>


    <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">
      <div className="text-xl font-black text-blue-700 sm:text-2xl">
        03
      </div>

      <h4 className="mt-2 text-base font-black text-slate-900 sm:mt-3 sm:text-lg">
        Confirm Your Booking
      </h4>

      <p className="mt-2 text-xs leading-5 text-slate-600 sm:text-sm sm:leading-6">
        Review the journey details and continue with the
        booking process to arrange your car.
      </p>
    </div>

  </div>

</div>


{/* =====================================================
    STRONG SEO TEXT BLOCK
===================================================== */}

<div className="mt-10 rounded-2xl bg-slate-100 p-5 sm:mt-14 sm:rounded-3xl sm:p-9">

  <h3 className="text-xl font-black leading-tight text-slate-900 sm:text-3xl">
    Car Rental in Nagpur with Driver for Local, Airport &amp;
    Outstation Travel
  </h3>

  <div className="mt-4 space-y-3 text-xs leading-6 text-slate-600 sm:mt-5 sm:space-y-4 sm:text-base sm:leading-7">

    <p>
      If you are searching for a reliable
      <strong className="font-black text-slate-800">
        {" "}car rental in Nagpur
      </strong>
      for local travel, airport transfers, business visits,
      family trips or outstation journeys, RC Tours &amp; Travels
      offers chauffeur-driven transportation with multiple vehicle
      choices. Depending on your journey, you can choose a Swift
      Dzire, Ertiga, Toyota Rumion, Innova Crysta, Tempo Traveller
      or Force Urbania.
    </p>

    <p>
      Our
      <strong className="font-black text-slate-800">
        {" "}car rental service in Nagpur with driver
      </strong>
      is suitable for customers who prefer a convenient travel
      arrangement without driving themselves. Whether you need a
      car for a few hours within Nagpur, a scheduled airport
      transfer, a business trip, family transportation or an
      outstation journey, the vehicle can be selected according
      to your passengers and travel requirement.
    </p>

    <p>
      For customers looking for
      <strong className="font-black text-slate-800">
        {" "}local car rental in Nagpur
      </strong>
      , we provide options for city transportation, office work,
      shopping, meetings, personal visits and local sightseeing.
      For airport travel, customers can book a chauffeur-driven
      vehicle for Nagpur Airport pickup or drop. For longer
      journeys, our outstation cars and larger vehicles are
      available depending on route, date and availability.
    </p>

    <p>
      Families and groups can choose larger vehicles when they
      need additional seating and luggage space. Ertiga and
      Toyota Rumion are suitable options for family travel, while
      Innova Crysta provides a premium option for comfortable
      long-distance travel. Tempo Traveller and Force Urbania
      are available for larger groups, tours, weddings, corporate
      outings and events.
    </p>

    <p>
      RC Tours &amp; Travels is based in Nagpur and serves customers
      travelling from Nagpur to destinations across Maharashtra
      and other parts of India. Before booking, customers can
      provide the pickup point, destination, journey date,
      passenger count and vehicle requirement so that the most
      suitable rental option can be selected.
    </p>

  </div>

</div>


{/* =====================================================
    INTERNAL SEO LINKS
===================================================== */}

<div className="mt-10 sm:mt-12">

  <div className="text-center">

    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 sm:text-xs">
      Explore More
    </p>

    <h3 className="mt-2 text-xl font-black text-slate-900 sm:mt-3 sm:text-3xl">
      More Taxi &amp; Travel Services in Nagpur
    </h3>

  </div>


  <div className="mt-5 flex flex-wrap justify-center gap-2 sm:mt-7 sm:gap-3">

    <a
      href="/taxi-service-in-nagpur"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Taxi Service in Nagpur
    </a>

    <a
      href="/nagpur-local-taxi"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Nagpur Local Taxi
    </a>

    <a
      href="/airport-taxi-nagpur"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Airport Taxi Nagpur
    </a>

    <a
      href="/nagpur-to-tadoba-cab"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Nagpur to Tadoba Cab
    </a>

    <a
      href="/nagpur-to-pench-cab"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Nagpur to Pench Cab
    </a>

    <a
      href="/car-rental-in-nagpur"
      className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700 shadow-sm sm:px-5 sm:py-3 sm:text-sm"
    >
      Car Rental in Nagpur
    </a>

    <a
      href="/fare-calculator"
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 sm:px-5 sm:py-3 sm:text-sm"
    >
      Fare Calculator
    </a>

  </div>

</div>


{/* =====================================================
    FINAL CTA
===================================================== */}

<div className="mt-10 rounded-2xl bg-[#071a3a] px-5 py-7 text-center shadow-xl sm:mt-14 sm:rounded-3xl sm:px-10 sm:py-10">

  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-200 sm:text-xs">
    Book Your Ride from Nagpur
  </p>

  <h3 className="mt-2 text-xl font-black text-white sm:mt-3 sm:text-3xl lg:text-4xl">
    Need a Car Rental in Nagpur with Driver?
  </h3>

  <p className="mx-auto mt-2 max-w-2xl text-xs leading-6 text-blue-100 sm:mt-3 sm:text-base sm:leading-7">
    Share your pickup location, destination, date and passenger
    requirement. Choose a suitable vehicle and plan your journey
    with RC Tours &amp; Travels.
  </p>

  <div className="mt-5 flex flex-col justify-center gap-3 sm:mt-6 sm:flex-row">

    <a
      href="#hero-booking-form"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-black text-[#12346f] transition hover:bg-blue-50 sm:px-6 sm:py-3.5 sm:text-sm"
    >
      <CalendarDays className="h-4 w-4" />
      Book Your Car
    </a>

    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-xs font-black text-white transition hover:bg-emerald-600 sm:px-6 sm:py-3.5 sm:text-sm"
    >
      <FaWhatsapp className="h-5 w-5" />
      Ask on WhatsApp
    </a>

  </div>

</div>


{/* =====================================================
    END SEO CONTENT SECTION
===================================================== */}

</div>
</section>


{/* =====================================================
    FLOATING CALL & WHATSAPP BUTTONS
===================================================== */}

<div className="fixed bottom-4 right-3 z-50 flex flex-col items-center gap-2 sm:bottom-5 md:bottom-6 md:right-4">

  {/* MOBILE — BEFORE SCROLL */}

  {!isScrolled && (
    <div className="flex flex-col gap-2 md:hidden">

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RC Tours and Travels on WhatsApp"
        className="flex h-11 w-32 items-center justify-center gap-2 rounded-full bg-green-500 text-xs font-bold text-white shadow-2xl transition-all duration-300 hover:bg-green-600 sm:h-12 sm:w-36 sm:text-sm"
      >
        <FaWhatsapp className="text-xl sm:text-2xl" />
        <span>Chat with us</span>
      </a>

      <a
        href="tel:+919172271464"
        aria-label="Call RC Tours and Travels now"
        className="flex h-11 w-32 items-center justify-center gap-2 rounded-full bg-cyan-500 text-xs font-bold text-white shadow-2xl transition-all duration-300 hover:bg-cyan-600 sm:h-12 sm:w-36 sm:text-sm"
      >
        <span className="text-lg sm:text-xl">📞</span>
        <span>Call us now</span>
      </a>

    </div>
  )}


  {/* MOBILE — AFTER SCROLL */}

  {isScrolled && (
    <div className="flex flex-col items-center gap-2 md:hidden">

      <a
        href="tel:+919172271464"
        aria-label="Call RC Tours and Travels"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-lg text-white shadow-2xl transition-all duration-300 hover:bg-cyan-600 sm:h-12 sm:w-12 sm:text-xl"
      >
        📞
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with RC Tours and Travels on WhatsApp"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-xl text-white shadow-2xl transition-all duration-300 hover:bg-green-600 sm:h-12 sm:w-12 sm:text-2xl"
      >
        <FaWhatsapp />
      </a>

    </div>
  )}


  {/* DESKTOP — EXISTING BUTTONS */}

  <div className="hidden flex-col items-center gap-1 md:flex">

    <a
      href="tel:+919172271464"
      aria-label="Call RC Tours and Travels"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg text-white shadow-2xl hover:bg-cyan-600 md:h-16 md:w-16 md:text-2xl"
    >
      📞
    </a>

    <a
      href="https://wa.me/919172271464"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RC Tours and Travels on WhatsApp"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-2xl hover:bg-green-600 md:h-16 md:w-16 md:text-4xl"
    >
      <FaWhatsapp />
    </a>

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