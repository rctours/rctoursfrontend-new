

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
  ChevronLeft,
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
    "Can I book local, airport, one-way and round-trip travel from this page?",
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
   CUSTOMER REVIEWS
========================================================= */

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
    review: "Very good behaviour and polite in nature.",
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
    review: "Very good service.",
    time: "32 weeks ago",
  },
  {
    name: "Raj Kumar Ghasal",
    image: "/reviews/raj kumar ghasal.webp",
    review: "Excellent service, on-time pickup and drop.",
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

  /* =======================================================
     CUSTOMER REVIEWS
  ======================================================= */

  const [reviewIndex, setReviewIndex] = useState(0);
  const reviewTouchStart = useRef<number | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);


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

      <section className="relative overflow-visible bg-[#071a3a] pb-16 pt-14 text-white sm:pb-20 sm:pt-12 lg:pt-14">

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
      Nagpur Local Taxi Service
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

                NAGPUR • LOCAL TAXI • CITY • HOURLY
              </div>

              <h1 className="mt-3 max-w-[620px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-[36px] lg:text-[42px] xl:text-[46px]">
                Local Taxi Service
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
{/* =====================================================
    NAGPUR LOCAL TAXI — PREMIUM SEO SERVICE SECTION
===================================================== */}

<section className="relative overflow-hidden bg-white pt-40 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
  <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-50 blur-3xl" />
  <div className="pointer-events-none absolute -right-40 top-[35%] h-[420px] w-[420px] rounded-full bg-cyan-50 blur-3xl" />

  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    {/* LOCAL TAXI INTRO */}
    <div className="mx-auto max-w-4xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-blue-700 sm:text-[11px]">
        <MapPin className="h-3.5 w-3.5" />
        Local Taxi Service in Nagpur
      </div>

      <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[46px]">
        Reliable Local Taxi Service in
        <span className="block text-blue-700">
          Nagpur for Everyday Travel
        </span>
      </h2>

      <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
        RC Tours &amp; Travels provides local taxi and cab booking in Nagpur for
        daily city travel, office visits, shopping, meetings, family trips,
        railway station transfers, events and multiple-stop journeys. Choose
        your pickup location, destination, date, time and vehicle and continue
        with the online booking process.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        {[
          "Local Taxi in Nagpur",
          "Hourly Cab Rental",
          "4 Hr / 40 KM to 12 Hr / 120 KM",
          "Sedan • SUV • Premium",
        ].map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-extrabold text-slate-600 shadow-sm sm:text-xs"
          >
            {item}
          </span>
        ))}
      </div>
    </div>

    {/* LOCAL TAXI SERVICE CARDS */}
    <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {[
        {
          title: "Local City Taxi",
          text:
            "Book a cab for everyday Nagpur travel including office visits, shopping, appointments, family travel and city transfers.",
          image: "/cars/dzire.webp",
          icon: MapPin,
          label: "CITY TRAVEL",
          color: "border-blue-200 bg-blue-50 text-blue-700",
        },
        {
          title: "Hourly Taxi Rental",
          text:
            "Keep a cab with you for multiple stops, meetings, shopping, events or extended local travel with hourly rental packages.",
          image: "/cars/rumion.webp",
          icon: Clock,
          label: "MULTI-STOP",
          color: "border-cyan-200 bg-cyan-50 text-cyan-700",
        },
        {
          title: "Family & Premium Cab",
          text:
            "Choose a spacious vehicle when you need extra passenger room, luggage space or a more comfortable city journey.",
          image: "/cars/crysta.webp",
          icon: Car,
          label: "COMFORT TRAVEL",
          color: "border-violet-200 bg-violet-50 text-violet-700",
        },
      ].map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
              <Image
                src={item.image}
                alt={`${item.title} in Nagpur by RC Tours and Travels`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-contain p-6 transition duration-500 group-hover:scale-105"
                loading="lazy"
              />

              <span
                className={`absolute left-4 top-4 rounded-full border px-3 py-1.5 text-[10px] font-black ${item.color}`}
              >
                {item.label}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-blue-700">
                <Icon className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.16em]">
                  Nagpur Local Cab
                </span>
              </div>

              <h3 className="mt-3 text-xl font-black text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.text}
              </p>

              <a
                href="#hero-booking-form"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700 transition hover:bg-blue-700 hover:text-white"
              >
                Book Local Cab
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        );
      })}
    </div>

    {/* WHY CHOOSE RC */}
    <div className="mt-10 overflow-hidden rounded-3xl bg-[#071a3a] p-5 text-white shadow-xl sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
            Nagpur City Travel
          </p>

          <h2 className="mt-3 text-2xl font-black leading-tight sm:text-3xl lg:text-4xl">
            A Practical Taxi Booking Option for
            <span className="block text-cyan-300">
              Local Travel Across Nagpur
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100">
            Whether you need a cab for a short city ride, several stops in one
            day, an office visit, shopping, a family outing or a railway
            station transfer, the same booking panel gives you flexible travel
            options. You can select the vehicle and continue with the existing
            booking flow.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Online Booking",
              "Multiple Vehicle Options",
              "Clear Route & Fare Flow",
              "WhatsApp & Phone Support",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-[10px] font-bold text-blue-50 sm:text-xs"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            [ShieldCheck, "Travel Support", "Customer-first assistance"],
            [Headphones, "Booking Help", "Call & WhatsApp"],
            [WalletCards, "Clear Process", "Route-based booking"],
            [UserRoundCheck, "Vehicle Choice", "Sedan to premium"],
          ].map(([Icon, title, text]: any) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Icon className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-sm font-black">{title}</p>
              <p className="mt-1 text-xs leading-5 text-blue-100">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* HOW TO BOOK */}
    <div className="mt-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          Easy Local Cab Booking
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Book a Local Taxi in Nagpur in 4 Simple Steps
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Enter your route, select your travel details and continue through the
          existing RC Tours &amp; Travels booking flow.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["01", "Enter Locations", "Add your pickup and drop locations.", MapPin],
          ["02", "Choose Date & Time", "Select your journey date and pickup time.", CalendarDays],
          ["03", "Select Vehicle", "Choose a sedan, SUV or premium vehicle.", Car],
          ["04", "Continue Booking", "Review your details and continue booking.", ArrowRight],
        ].map(([number, title, text, Icon]: any) => (
          <div
            key={number}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-blue-100">{number}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <h3 className="mt-4 text-base font-black text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </div>
        ))}
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

    {/* FLEET */}
    <div className="mt-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          Nagpur Taxi Fleet
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Choose the Right Car for Your Local Journey
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Select a vehicle according to passenger count, luggage and comfort
          requirements.
        </p>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {fleet.map((car) => (
          <article
            key={car.name}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-44 bg-gradient-to-br from-slate-50 to-blue-50">
              <Image
                src={car.image}
                alt={`${car.name} for local taxi service in Nagpur`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-contain p-5 transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-base font-black text-slate-900">{car.name}</h3>
                <span className="text-[10px] font-black text-blue-700">
                  LOCAL CAB
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-500">{car.text}</p>
              <button
                type="button"
                onClick={() => {
                  setVehicle(car.vehicleValue);
                  document
                    .getElementById("hero-booking-form")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                }}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-black text-slate-800 transition hover:bg-blue-700 hover:text-white"
              >
                Select Vehicle
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>

    {/* SERVICE AREAS */}
    <div className="mt-14 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      <div className="grid gap-7 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
            Local Cab Coverage
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
            Local Taxi Service Across Nagpur
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Local cab booking is available for major residential, commercial
            and business areas of Nagpur. Enter your exact pickup and
            destination in the booking form for route-based processing.
          </p>

          <a
            href="#hero-booking-form"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-black text-white shadow-md hover:bg-blue-800"
          >
            Book Local Taxi
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2">
          {areas.map((area) => (
            <span
              key={area}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700"
            >
              <MapPin className="h-3.5 w-3.5 text-blue-600" />
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>

    {/* LOCAL TAXI USE CASES */}
    <div className="mt-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          Everyday Nagpur Travel
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Local Cab for Different Travel Requirements
        </h2>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[
          ["Office & Business Travel", "Book a cab for office visits, client meetings, business appointments and city travel."],
          ["Shopping & Personal Work", "Use an hourly cab when you need multiple stops for shopping, errands or appointments."],
          ["Family & Senior Travel", "Choose a comfortable vehicle for family outings, local functions and city journeys."],
          ["Railway Station Transfers", "Travel to or from Nagpur railway stations with a route-based local cab booking."],
          ["Events & Functions", "Arrange local transport for weddings, functions, events and guest movement."],
          ["Multiple City Stops", "Keep the cab for an extended local itinerary when one simple point-to-point ride is not enough."],
        ].map(([title, text]) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-black text-slate-900">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
          </article>
        ))}
      </div>
    </div>

    {/* INTERNAL SERVICE LINKS */}
    <div className="mt-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          RC Tours &amp; Travels
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Explore More Taxi &amp; Cab Services in Nagpur
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Choose the service page that matches your travel requirement.
        </p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["/nagpur-airport-taxi", "Nagpur Airport Taxi", "Airport pickup and drop service"],
          ["/car-rental-in-nagpur", "Car Rental in Nagpur", "Local rental and vehicle options"],
          ["/nagpur-to-tadoba-cab", "Nagpur to Tadoba Taxi", "Outstation cab for Tadoba"],
          ["/nagpur-to-pench-cab", "Nagpur to Pench Taxi", "Cab booking for Pench travel"],
        ].map(([href, title, text]) => (
          <Link
            key={href}
            href={href}
            className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-black text-slate-900 group-hover:text-blue-700">
                {title}
              </h3>
              <ArrowRight className="h-4 w-4 shrink-0 text-blue-600" />
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
          </Link>
        ))}
      </div>
    </div>

    {/* LOCAL SEO CONTENT */}
    <div className="mt-14 grid gap-5 lg:grid-cols-2">
      {[
        [
          "Local Taxi Service in Nagpur",
          "Looking for a local taxi in Nagpur for everyday city travel? RC Tours & Travels provides cab booking for office travel, shopping, family journeys, appointments, events and city transfers. Enter your pickup and drop locations, select the date, time and vehicle, and continue through the booking flow.",
        ],
        [
          "Hourly Taxi Rental in Nagpur",
          "Hourly cab rental is useful when your travel includes several stops or you need a vehicle for an extended period. The booking panel supports 4 Hr / 40 KM, 6 Hr / 60 KM, 8 Hr / 80 KM and 12 Hr / 120 KM local rental options.",
        ],
        [
          "Local Cab from Dighori, Manish Nagar & Wardha Road",
          "Customers from Dighori, Manish Nagar, Wardha Road, MIHAN, Besa, Sitabuldi, Sadar, Dharampeth, Civil Lines and nearby Nagpur areas can enter their exact locations in the booking form and request a local cab.",
        ],
        [
          "Sedan, Ertiga, Rumion & Innova Crysta",
          "Vehicle selection can be matched to passenger count, luggage and comfort requirements. The local taxi fleet includes Swift Dzire, Ertiga, Toyota Rumion and Innova Crysta, while the booking flow also includes larger vehicle options.",
        ],
      ].map(([title, text]) => (
        <article
          key={title}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6"
        >
          <h3 className="text-xl font-black text-slate-900">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
        </article>
      ))}
    </div>

    {/* REVIEWS — MOBILE SWIPE / DESKTOP 3 CARDS */}
    <section className="mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-7">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          Customer Experiences
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
          What Our Customers Say About RC Tours &amp; Travels
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Real customer feedback shared with RC Tours &amp; Travels.
        </p>
      </div>

      <div className="relative mx-auto mt-7 max-w-7xl">
        <div className="hidden items-center justify-between sm:flex">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() =>
              setReviewIndex(
                (prev) => (prev - 1 + reviews.length) % reviews.length
              )
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-blue-700 hover:text-white"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <span className="text-xs font-bold text-slate-500">
            {reviewIndex + 1} / {reviews.length}
          </span>

          <button
            type="button"
            aria-label="Next review"
            onClick={() =>
              setReviewIndex((prev) => (prev + 1) % reviews.length)
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-blue-700 hover:text-white"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          className="mt-4 touch-pan-y"
          onTouchStart={(event) => {
            reviewTouchStart.current =
              event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            const startX = reviewTouchStart.current;
            const endX = event.changedTouches[0]?.clientX ?? null;

            if (startX === null || endX === null) return;

            const diff = startX - endX;

            if (Math.abs(diff) >= 50) {
              setReviewIndex((prev) =>
                diff > 0
                  ? (prev + 1) % reviews.length
                  : (prev - 1 + reviews.length) % reviews.length
              );
            }

            reviewTouchStart.current = null;
          }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((offset) => {
              const review =
                reviews[(reviewIndex + offset) % reviews.length];

              return (
                <article
                  key={`${review.name}-${offset}-${reviewIndex}`}
                  className={`flex min-h-[260px] flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${
                    offset > 0 ? "hidden md:flex" : ""
                  } ${offset === 2 ? "md:hidden xl:flex" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-slate-100">
                      <Image
                        src={review.image}
                        alt={`${review.name} customer review`}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-black text-slate-900">
                        {review.name}
                      </h3>
                      <div
                        className="mt-1 text-sm tracking-[2px] text-amber-500"
                        aria-label="5 star review"
                      >
                        ★★★★★
                      </div>
                    </div>
                  </div>

                  <p className="mt-5 flex-1 text-sm leading-7 text-slate-600">
                    “{review.review}”
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
                        <Image
                          src="/google.webp"
                          alt="Google"
                          width={22}
                          height={22}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500">
                        Google Review
                      </span>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-400">
                      {review.time}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() =>
              setReviewIndex(
                (prev) => (prev - 1 + reviews.length) % reviews.length
              )
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <span className="text-[11px] font-black text-slate-500">
            Swipe • {reviewIndex + 1}/{reviews.length}
          </span>

          <button
            type="button"
            aria-label="Next review"
            onClick={() =>
              setReviewIndex((prev) => (prev + 1) % reviews.length)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <div className="mt-14">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
          Local Taxi FAQ
        </p>
        <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
          Frequently Asked Questions
        </h2>
      </div>

      <div className="mx-auto mt-7 max-w-4xl space-y-3">
        {faqs.map(([question, answer], index) => (
          <div
            key={question}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <button
              type="button"
              onClick={() =>
                setOpenFaq((prev) => (prev === index ? null : index))
              }
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-black text-slate-900 sm:text-base">
                {question}
              </span>
              <ChevronRight
                className={`h-4 w-4 shrink-0 text-blue-600 transition-transform ${
                  openFaq === index ? "rotate-90" : ""
                }`}
              />
            </button>

            {openFaq === index && (
              <div className="border-t border-slate-100 px-5 pb-5 pt-4">
                <p className="text-sm leading-7 text-slate-600">{answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

{/* FINAL LOCAL TAXI CTA */}
<div className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0a2a63] via-[#1747a0] to-[#0a2a63] p-6 text-white shadow-xl sm:p-9">
  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    {/* CTA CONTENT */}
    <div className="max-w-3xl">
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-200">
        Nagpur Local Cab Booking
      </p>

      <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">
        Need a Local Taxi in Nagpur?
      </h2>

      <p className="mt-3 text-sm leading-7 text-blue-100">
        Enter your pickup and destination, choose the date, time and
        vehicle, and continue with the RC Tours &amp; Travels booking flow.
        For assistance, you can also contact us by phone or WhatsApp.
      </p>
    </div>

    {/* CTA BUTTONS */}
    <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:shrink-0">

      {/* BOOK LOCAL TAXI */}
      <a
        href="#hero-booking-form"
        className="inline-flex min-h-11 min-w-[150px] shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-black whitespace-nowrap text-blue-800 shadow-lg transition hover:bg-blue-50"
      >
        <span>Book Local Taxi</span>
        <ArrowRight className="h-4 w-4 shrink-0" />
      </a>

      {/* WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-11 min-w-[175px] shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-black whitespace-nowrap text-white shadow-lg transition hover:bg-emerald-600"
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" />
        <span>WhatsApp</span>
      </a>

      {/* CALL NOW */}
      <a
        href={`tel:${PHONE}`}
        className="inline-flex min-h-11 min-w-[125px] shrink-0 items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 text-sm font-black whitespace-nowrap text-white transition hover:bg-white/15"
      >
        <Phone className="h-4 w-4 shrink-0" />
        <span>Call Now</span>
      </a>

    </div>
  </div>
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
                  "Book a local taxi in Nagpur for city travel, hourly rental, railway station transfers and everyday cab requirements.",
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
                  "City Cab Service",
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
              "Local Taxi Service",
              "Local Cab Service",
              "Hourly Taxi Rental",
              "City Taxi Service",
              "Railway Station Taxi",
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