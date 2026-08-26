"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  Car,
  MapPin,
  Calendar,
  Phone,
  User,
  Calculator,
  MessageCircle,
  PhoneCall,
  Clock,
  Navigation,
  Receipt,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Route,
  ShieldCheck,
  Wallet,
  ChevronRight,
  Plus,
  X,
  Search,
  Loader2,
  Clock3,
  IndianRupee,
} from "lucide-react";

// =====================================================
// TYPES
// =====================================================

type LocationItem = {
  display_name: string;
  lat: number;
  lon: number;
  type?: string;
  category?: string;
  place_id?: string;
};

type StopItem = {
  id: string;
  value: string;
  selected: LocationItem | null;
};

type RouteResult = {
  distance: number;
  toll: number;
  duration: number;
};

// =====================================================
// VEHICLES
// =====================================================

const vehicleImages: Record<string, string> = {
  dzire: "/swift-dzire.webp",
  ertiga: "/ertiga.webp",
  rumion: "/gallery/Rumion.webp",
  crysta: "/innova-crysta.webp",
  tt13: "/traveller13.webp",
  tt17: "/temp traveller.webp",
  urbania: "/urbania.webp",
};

const vehicleNames: Record<string, string> = {
  dzire: "Swift Dzire",
  ertiga: "Ertiga",
  rumion: "Toyota Rumion",
  crysta: "Innova Crysta",
  tt13: "Tempo Traveller 13 Seater",
  tt17: "Tempo Traveller 17 Seater",
  urbania: "Force Urbania",
};

// =====================================================
// LOCATION AUTOCOMPLETE COMPONENT
// =====================================================

function LocationSearch({
  value,
  onChange,
  onSelect,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  onSelect: (location: LocationItem) => void;
  placeholder: string;
}) {
  const [suggestions, setSuggestions] = useState<
    LocationItem[]
  >([]);

  const [loading, setLoading] = useState(false);

  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(
          event.target as Node
        )
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  useEffect(() => {
    const query = value.trim();

    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller =
      new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/location-search?q=${encodeURIComponent(
            query
          )}`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          setSuggestions([]);
          return;
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setSuggestions(data);
          setShowSuggestions(true);
        } else {
          setSuggestions([]);
        }
      } catch (error: any) {
        if (
          error?.name !== "AbortError"
        ) {
          console.error(
            "LOCATION SEARCH ERROR:",
            error
          );
        }
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [value]);

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      <MapPin className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true);
          }
        }}
        onChange={(e) => {
          onChange(e.target.value);
          setShowSuggestions(true);
        }}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-11 text-sm font-medium text-slate-800 outline-none transition-all focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10"
      />

      {loading && (
        <Loader2 className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-blue-600" />
      )}

      {!loading &&
        value.length >= 3 && (
          <Search className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

      {showSuggestions &&
        suggestions.length > 0 && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {suggestions.map(
              (item, index) => (
                <button
                  key={`${item.lat}-${item.lon}-${index}`}
                  type="button"
                  onClick={() => {
                    onChange(
                      item.display_name
                    );

                    onSelect(item);

                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  className="flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-blue-50 last:border-b-0"
                >
                  <div className="mt-0.5 rounded-lg bg-blue-50 p-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-800">
                      {item.display_name}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-400">
                      {item.type || "Location"}
                    </p>
                  </div>
                </button>
              )
            )}
          </div>
        )}
    </div>
  );
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function FareCalculator() {
  // ===========================================
  // BASIC STATES
  // ===========================================

  const [serviceType, setServiceType] =
    useState("local");

  const [vehicle, setVehicle] =
    useState("");

  const [fare, setFare] =
    useState<number | null>(null);

  const [baseFare, setBaseFare] =
    useState(0);

  const [driverAllowance, setDriverAllowance] =
    useState(0);

  const [totalToll, setTotalToll] =
    useState(0);

  const [totalDistance, setTotalDistance] =
    useState(0);

  const [travelDuration, setTravelDuration] =
    useState(0);

  const [routeLoading, setRouteLoading] =
    useState(false);

  // ===========================================
  // PICKUP
  // ===========================================

  const [pickup, setPickup] =
    useState("");

  const [pickupLocation, setPickupLocation] =
    useState<LocationItem | null>(
      null
    );

  // ===========================================
  // MULTIPLE DESTINATIONS
  // ===========================================

  const [stops, setStops] = useState<
    StopItem[]
  >([
    {
      id: "stop-1",
      value: "",
      selected: null,
    },
  ]);

  // ===========================================
  // LOCAL
  // ===========================================

  const [packageType, setPackageType] =
    useState("");

  const [actualKm, setActualKm] =
    useState("");

  const [actualHours, setActualHours] =
    useState("");

  // ===========================================
  // CUSTOMER
  // ===========================================

  const [customerName, setCustomerName] =
    useState("");

  const [mobileNumber, setMobileNumber] =
    useState("");

  const [journeyDate, setJourneyDate] =
    useState("");

  // ===========================================
  // PRICING
  // ===========================================

  const oneWayRates: Record<
    string,
    number
  > = {
    dzire: 22,
    ertiga: 26,
    rumion: 28,
    crysta: 36,
    tt13: 48,
    tt17: 56,
    urbania: 70,
  };

  const roundTripRates: Record<
    string,
    number
  > = {
    dzire: 12,
    ertiga: 14,
    rumion: 15,
    crysta: 19,
    tt13: 24,
    tt17: 28,
    urbania: 36,
  };

  const localPackages: any = {
    dzire: {
      "8hr": {
        fare: 2000,
        km: 80,
        hrs: 8,
        extraKm: 13,
        extraHr: 200,
      },
      "10hr": {
        fare: 2300,
        km: 100,
        hrs: 10,
        extraKm: 13,
        extraHr: 200,
      },
      "12hr": {
        fare: 2600,
        km: 120,
        hrs: 12,
        extraKm: 13,
        extraHr: 200,
      },
    },

    rumion: {
      "8hr": {
        fare: 2500,
        km: 80,
        hrs: 8,
        extraKm: 14,
        extraHr: 300,
      },
      "10hr": {
        fare: 2800,
        km: 100,
        hrs: 10,
        extraKm: 14,
        extraHr: 300,
      },
      "12hr": {
        fare: 3000,
        km: 120,
        hrs: 12,
        extraKm: 14,
        extraHr: 300,
      },
    },

    ertiga: {
      "8hr": {
        fare: 2500,
        km: 80,
        hrs: 8,
        extraKm: 14,
        extraHr: 300,
      },
      "10hr": {
        fare: 2800,
        km: 100,
        hrs: 10,
        extraKm: 14,
        extraHr: 300,
      },
      "12hr": {
        fare: 3000,
        km: 120,
        hrs: 12,
        extraKm: 14,
        extraHr: 300,
      },
    },

    crysta: {
      "8hr": {
        fare: 3500,
        km: 80,
        hrs: 8,
        extraKm: 19,
        extraHr: 400,
      },
      "10hr": {
        fare: 4000,
        km: 100,
        hrs: 10,
        extraKm: 19,
        extraHr: 400,
      },
      "12hr": {
        fare: 4500,
        km: 120,
        hrs: 12,
        extraKm: 19,
        extraHr: 400,
      },
    },
  };

  // =====================================================
  // ADD STOP
  // =====================================================

  const addStop = () => {
    setStops((previous) => [
      ...previous,
      {
        id: `stop-${Date.now()}`,
        value: "",
        selected: null,
      },
    ]);
  };

  // =====================================================
  // REMOVE STOP
  // =====================================================

  const removeStop = (
    id: string
  ) => {
    if (stops.length === 1) {
      return;
    }

    setStops((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );
  };

  // =====================================================
  // UPDATE STOP TEXT
  // =====================================================

  const updateStopValue = (
    id: string,
    value: string
  ) => {
    setStops((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              value,
              selected: null,
            }
          : item
      )
    );

    setFare(null);
  };

  // =====================================================
  // SELECT STOP
  // =====================================================

  const selectStopLocation = (
    id: string,
    location: LocationItem
  ) => {
    setStops((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              value:
                location.display_name,
              selected: location,
            }
          : item
      )
    );

    setFare(null);
  };

  // =====================================================
  // FORMAT TIME
  // =====================================================

  const formatDuration = (
    minutes: number
  ) => {
    if (!minutes) return "0m";

    const hours = Math.floor(
      minutes / 60
    );

    const mins = minutes % 60;

    if (hours <= 0) {
      return `${mins}m`;
    }

    return `${hours}h ${mins}m`;
  };

  // =====================================================
  // GET DISTANCE BETWEEN TWO POINTS
  // =====================================================

  const getRoute = async (
    from: LocationItem,
    to: LocationItem
  ): Promise<RouteResult> => {
    const response = await fetch(
      "/api/distance",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          pickup: from.display_name,

          drop: to.display_name,

          pickupCoords: {
            lat: from.lat,
            lon: from.lon,
          },

          dropCoords: {
            lat: to.lat,
            lon: to.lon,
          },
        }),
      }
    );

    const data =
      await response.json();

    if (
      !response.ok ||
      !data.success
    ) {
      throw new Error(
        data.message ||
          "Unable to calculate route"
      );
    }

    return {
      distance:
        Number(data.distance) || 0,

      toll:
        Number(data.toll) || 0,

      duration:
        Number(data.duration) || 0,
    };
  };

  // =====================================================
  // CALCULATE FARE
  // =====================================================

  const calculateFare = async () => {
    // =========================================
    // LOCAL RENTAL
    // =========================================

    if (
      serviceType === "local"
    ) {
      if (
        !vehicle ||
        !packageType
      ) {
        alert(
          "Please Select Vehicle & Package"
        );

        return;
      }

      const pkg =
        localPackages[vehicle]?.[
          packageType
        ];

      if (!pkg) {
        alert(
          "Package not available"
        );

        return;
      }

      let total =
        Number(pkg.fare);

      const extraKm =
        Math.max(
          0,
          Number(actualKm || 0) -
            Number(pkg.km)
        );

      const extraHr =
        Math.max(
          0,
          Number(actualHours || 0) -
            Number(pkg.hrs)
        );

      total +=
        extraKm *
        Number(pkg.extraKm);

      total +=
        extraHr *
        Number(pkg.extraHr);

      setBaseFare(
        Number(pkg.fare)
      );

      setTotalToll(0);

      setDriverAllowance(0);

      setTotalDistance(
        Number(actualKm || pkg.km)
      );

      setTravelDuration(
        Math.round(
          Number(actualHours || pkg.hrs) *
            60
        )
      );

      setFare(total);

      setTimeout(() => {
        document
          .getElementById(
            "fare-result"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 150);

      return;
    }

    // =========================================
    // OUTSTATION VALIDATION
    // =========================================

    if (!vehicle) {
      alert(
        "Please select vehicle"
      );

      return;
    }

    if (!pickupLocation) {
      alert(
        "Please select pickup location from suggestions"
      );

      return;
    }

    const validStops =
      stops.filter(
        (item) =>
          item.selected !== null
      );

    if (
      validStops.length === 0
    ) {
      alert(
        "Please select at least one destination from suggestions"
      );

      return;
    }

    try {
      setRouteLoading(true);

      setFare(null);

      let calculatedDistance = 0;
      let calculatedToll = 0;
      let calculatedDuration = 0;

      let currentLocation =
        pickupLocation;

      // =======================================
      // PICKUP → STOP 1 → STOP 2 → STOP 3
      // =======================================

      for (
        let i = 0;
        i < validStops.length;
        i++
      ) {
        const destination =
          validStops[i].selected!;

        const route =
          await getRoute(
            currentLocation,
            destination
          );

        calculatedDistance +=
          route.distance;

        calculatedToll +=
          route.toll;

        calculatedDuration +=
          route.duration;

        currentLocation =
          destination;
      }

      // =======================================
      // ROUND TRIP RETURN TO PICKUP
      // =======================================

      if (
        serviceType === "round"
      ) {
        const returnRoute =
          await getRoute(
            currentLocation,
            pickupLocation
          );

        calculatedDistance +=
          returnRoute.distance;

        calculatedToll +=
          returnRoute.toll;

        calculatedDuration +=
          returnRoute.duration;
      }

      // =======================================
      // FARE CALCULATION
      // =======================================

      let base = 0;
let driver = 500;

if (serviceType === "airport") {
  // Airport 1–10 KM special fare
  const airportSpecialFare: Record<
    string,
    number
  > = {
    dzire: 1100,
    ertiga: 1400,
    rumion: 1500,
    crysta: 1900,
  };

  // 20, 30, 40, 50 KM packages
  const airportPackages: Record<
    string,
    {
      km: number;
      fare: number;
    }[]
  > = {
    dzire: [
      { km: 20, fare: 1200 },
      { km: 30, fare: 1500 },
      { km: 40, fare: 1900 },
      { km: 50, fare: 2300 },
    ],

    ertiga: [
      { km: 20, fare: 1500 },
      { km: 30, fare: 1800 },
      { km: 40, fare: 2200 },
      { km: 50, fare: 2600 },
    ],

    rumion: [
      { km: 20, fare: 1600 },
      { km: 30, fare: 1900 },
      { km: 40, fare: 2300 },
      { km: 50, fare: 2700 },
    ],

    crysta: [
      { km: 20, fare: 2000 },
      { km: 30, fare: 2400 },
      { km: 40, fare: 2900 },
      { km: 50, fare: 3400 },
    ],
  };

  // 1–10 KM → Airport special fare
  if (calculatedDistance <= 10) {
    base =
      airportSpecialFare[vehicle] || 0;

    driver = 0;
  }

  // Above 10 KM to 50 KM → Package fare
  else if (calculatedDistance <= 50) {
    const packages =
      airportPackages[vehicle] || [];

    const selectedPackage =
      packages.find(
        (pkg) =>
          calculatedDistance <= pkg.km
      );

    base =
      selectedPackage?.fare || 0;

    driver = 0;
  }

  // Above 50 KM → Per-KM calculation
  else {
    base =
      calculatedDistance *
      Number(
        oneWayRates[vehicle] || 0
      );
  }
} else {
  const rate =
    serviceType === "oneway"
      ? oneWayRates[vehicle]
      : roundTripRates[
          vehicle
        ];

  base =
    calculatedDistance *
    Number(rate || 0);
}

const total =
  base +
  calculatedToll +
  driver;

      setBaseFare(base);

      setTotalToll(
        calculatedToll
      );

      setDriverAllowance(
        driver
      );

      setTotalDistance(
        calculatedDistance
      );

      setTravelDuration(
        calculatedDuration
      );

      setFare(
        Math.round(total)
      );

      setTimeout(() => {
        document
          .getElementById(
            "fare-result"
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 200);
    } catch (error) {
      console.error(
        "FARE CALCULATION ERROR:",
        error
      );

      alert(
        "Unable to calculate exact route. Please check selected locations and try again."
      );
    } finally {
      setRouteLoading(false);
    }
  };

  // =====================================================
  // WHATSAPP
  // =====================================================

  const handleWhatsAppBooking = () => {
    if (
      !customerName.trim()
    ) {
      alert(
        "Please enter your name"
      );

      return;
    }

    if (
      !mobileNumber.trim()
    ) {
      alert(
        "Please enter mobile number"
      );

      return;
    }

    const tripType =
      serviceType === "local"
        ? "Local Rental"
        : serviceType === "round"
        ? "Round Trip"
        : "One Way Trip";

    const destinations =
      stops
        .filter(
          (item) =>
            item.selected
        )
        .map(
          (item, index) =>
            `${index + 1}. ${
              item.selected
                ?.display_name
            }`
        )
        .join("\n");

    const packageLabel =
      serviceType === "local" &&
      packageType
        ? packageType === "8hr"
          ? "8 Hours / 80 KM"
          : packageType ===
            "10hr"
          ? "10 Hours / 100 KM"
          : "12 Hours / 120 KM"
        : "N/A";

    const whatsappMessage = `Hello RC Tours & Travels,

I would like to book a cab.

👤 Name: ${customerName}
📱 Mobile: ${mobileNumber}

🚖 Trip Type: ${tripType}
🚗 Vehicle: ${
      vehicleNames[vehicle] ||
      vehicle
    }

📍 Pickup:
${
  serviceType === "local"
    ? "Local Rental"
    : pickupLocation?.display_name ||
      pickup
}

🏁 Destination(s):
${
  serviceType === "local"
    ? "Local Rental"
    : destinations || "Not Selected"
}

📅 Journey Date: ${
      journeyDate ||
      "Not Selected"
    }

🛣 Total Distance: ${
      serviceType === "local"
        ? "As per package"
        : `${totalDistance} KM`
    }

🕒 Estimated Travel Time: ${
      serviceType === "local"
        ? "As per package"
        : formatDuration(
            travelDuration
          )
    }

🛣 Estimated Toll: ₹${totalToll}

📦 Package: ${packageLabel}

💰 Estimated Fare: ₹${fare}

Please share booking confirmation.`;

    window.open(
      `https://wa.me/919172271464?text=${encodeURIComponent(
        whatsappMessage
      )}`,
      "_blank"
    );
  };

  // =====================================================
  // LABELS
  // =====================================================

  const tripTypeLabel =
    serviceType === "local"
      ? "Local Rental"
      : serviceType === "round"
      ? "Round Trip"
      : "One Way Trip";

  const packageLabel =
    packageType === "8hr"
      ? "8 Hours / 80 KM"
      : packageType === "10hr"
      ? "10 Hours / 100 KM"
      : packageType === "12hr"
      ? "12 Hours / 120 KM"
      : "Not Selected";

  const destinationNames =
    stops
      .filter(
        (item) =>
          item.selected
      )
      .map(
        (item) =>
          item.selected
            ?.display_name
      )
      .filter(Boolean)
      .join(" → ");

  const bookingUrl =
    `/book-cab?` +
    new URLSearchParams({
      vehicle,

      tripType:
        tripTypeLabel,

      pickup:
        serviceType === "local"
          ? ""
          : pickupLocation
          ?.display_name ||
            pickup,

      drop:
        serviceType === "local"
          ? ""
          : destinationNames,

      distance:
        String(
          serviceType === "local"
            ? actualKm || ""
            : totalDistance
        ),

      fare: String(
        fare || 0
      ),

      journeyDate,
    }).toString();

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all duration-200 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10";

  // =====================================================
  // JSX
  // =====================================================

  return (
    <main className="min-h-screen bg-slate-100 px-4 pb-12 pt-24 text-slate-900 sm:px-6 sm:pb-16 sm:pt-28">
      <div className="mx-auto max-w-5xl">

        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-10">

          {/* HEADER */}

          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-600 ring-1 ring-inset ring-blue-600/20">
              <Sparkles className="h-3.5 w-3.5" />
              Instant Cab Fare Estimator
            </span>

            <h1 className="mt-3 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-5xl">
              RC Tours & Travels
            </h1>

            <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500 sm:text-sm">
              Premium Taxi • Outstation Cabs • Airport Transfers
            </p>
          </div>

          {/* VEHICLE PREVIEW */}

          {vehicle && (
            <div className="my-6 flex justify-center sm:my-8">
              <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50/50 p-2 shadow-lg">
                <Image
                  src={
                    vehicleImages[
                      vehicle
                    ] ||
                    "/gallery/innova.webp"
                  }
                  alt={vehicle}
                  width={420}
                  height={220}
                  className="h-32 w-auto rounded-2xl object-cover sm:h-52"
                />
              </div>
            </div>
          )}

          {/* SERVICE TYPE */}

          <div className="my-6 grid grid-cols-3 gap-2 sm:my-8 sm:gap-4">
            {[
              {
                id: "local",
                label: "Local Rental",
                icon: Clock,
              },
              {
                id: "round",
                label: "Round Trip",
                icon: Navigation,
              },
              {
                id: "oneway",
                label: "One Way",
                icon: Car,
              },
              {
              id: "airport",
              label: "Airport",
              icon: Navigation,
              },
            ].map((tab) => {
              const IconComponent =
                tab.icon;

              const active =
                serviceType ===
                tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setServiceType(
                      tab.id
                    );

                    setFare(null);
                    setTotalDistance(0);
                    setTotalToll(0);
                    setTravelDuration(0);
                    setBaseFare(0);
                  }}
                  className={`flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[10px] font-bold transition-all sm:min-h-0 sm:flex-row sm:gap-2 sm:px-4 sm:text-sm ${
                    active
                      ? "scale-[1.02] bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                      : "border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />

                  <span className="text-center">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* OUTSTATION */}

          {(serviceType ===
          "round" ||
          serviceType ===
          "oneway" ||
          serviceType ===
          "airport") && (
            <div className="space-y-5 rounded-3xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">

              <h2 className="flex items-center gap-2 text-lg font-bold text-blue-600">
                <Route className="h-5 w-5" />

                {serviceType ===
                "round"
                  ? "Outstation Round Trip"
                  : "Outstation One Way"}
              </h2>

              {/* VEHICLE */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Select Vehicle
                </label>

                <select
                  value={vehicle}
                  onChange={(e) => {
                    setVehicle(
                      e.target.value
                    );

                    setFare(null);
                  }}
                  className={inputClass}
                >
                  <option value="">
                    Choose vehicle model...
                  </option>

                  <option value="dzire">
                    Swift Dzire
                  </option>

                  <option value="ertiga">
                    Ertiga
                  </option>

                  <option value="rumion">
                    Toyota Rumion
                  </option>

                  <option value="crysta">
                    Innova Crysta
                  </option>

                  <option value="tt13">
                    Tempo Traveller 13 Seater
                  </option>

                  <option value="tt17">
                    Tempo Traveller 17 Seater
                  </option>

                  <option value="urbania">
                    Force Urbania
                  </option>
                </select>
              </div>

              {/* PICKUP */}

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Pickup Location
                </label>

                <LocationSearch
                  value={pickup}
                  placeholder="Type pickup city or location..."
                  onChange={(value) => {
                    setPickup(value);
                    setPickupLocation(
                      null
                    );
                    setFare(null);
                  }}
                  onSelect={(location) => {
                    setPickup(
                      location.display_name
                    );

                    setPickupLocation(
                      location
                    );

                    setFare(null);
                  }}
                />
              </div>

              {/* DESTINATIONS */}

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Drop City / Destination
                  </label>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold text-blue-600">
                    Multiple Cities Supported
                  </span>
                </div>

                {stops.map(
                  (stop, index) => (
                    <div
                      key={stop.id}
                      className="flex items-start gap-2"
                    >
                      <div className="flex-1">
                        <LocationSearch
                          value={
                            stop.value
                          }
                          placeholder={
                            index === 0
                              ? "Type destination e.g. Karanja Lad"
                              : `Add stop ${
                                  index + 1
                                }...`
                          }
                          onChange={(
                            value
                          ) =>
                            updateStopValue(
                              stop.id,
                              value
                            )
                          }
                          onSelect={(
                            location
                          ) =>
                            selectStopLocation(
                              stop.id,
                              location
                            )
                          }
                        />
                      </div>

                      {stops.length >
                        1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeStop(
                              stop.id
                            )
                          }
                          className="mt-1 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-500 transition hover:bg-red-100"
                          aria-label="Remove destination"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  )
                )}

                <button
                  type="button"
                  onClick={addStop}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-blue-300 bg-blue-50 py-3 text-sm font-bold text-blue-600 transition hover:bg-blue-100"
                >
                  <Plus className="h-4 w-4" />

                  Add Another City
                </button>
              </div>

              {/* LIVE ROUTE INFO */}

              {(totalDistance >
                0 ||
                routeLoading) && (
                <div className="grid gap-3 pt-2 sm:grid-cols-3">

                  <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                    <p className="text-sm font-bold text-slate-500">
                      Distance
                    </p>

                    <p className="mt-2 text-2xl font-black text-blue-700">
                      {routeLoading
                        ? "..."
                        : `${totalDistance} KM`}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-bold text-slate-500">
                      Estimated Toll
                    </p>

                    <p className="mt-2 text-2xl font-black text-amber-700">
                      {routeLoading
                        ? "..."
                        : `₹${totalToll.toLocaleString(
                            "en-IN"
                          )}`}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <p className="text-sm font-bold text-slate-500">
                      Travel Time
                    </p>

                    <p className="mt-2 text-2xl font-black text-emerald-700">
                      {routeLoading
                        ? "..."
                        : formatDuration(
                            travelDuration
                          )}
                    </p>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* LOCAL RENTAL */}

          {serviceType ===
            "local" && (
            <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6">

              <h2 className="flex items-center gap-2 text-lg font-bold text-blue-600">
                <Clock className="h-5 w-5" />
                Local Rental Packages
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    id: "dzire",
                    name: "Swift Dzire",
                    img: "/swift-dzire.webp",
                  },
                  {
                    id: "ertiga",
                    name: "Ertiga",
                    img: "/ertiga.webp",
                  },
                  {
                    id: "rumion",
                    name: "Toyota Rumion",
                    img: "/gallery/Rumion.webp",
                  },
                  {
                    id: "crysta",
                    name: "Innova Crysta",
                    img: "/innova-crysta.webp",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setVehicle(
                        item.id
                      );

                      setFare(null);
                    }}
                    className={`flex flex-col items-center rounded-2xl border p-2.5 transition-all duration-200 sm:p-3 ${
                      vehicle ===
                      item.id
                        ? "border-blue-600 bg-blue-50 shadow-md"
                        : "border-slate-200 bg-white hover:bg-slate-100"
                    }`}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={140}
                      height={90}
                      className="h-14 w-auto object-contain sm:h-16"
                    />

                    <span className="mt-2 text-[11px] font-bold text-slate-800 sm:text-xs">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Package Duration
                </label>

                <select
                  value={
                    packageType
                  }
                  onChange={(e) => {
                    setPackageType(
                      e.target.value
                    );

                    setFare(null);
                  }}
                  className={inputClass}
                >
                  <option value="">
                    Select Local Package
                  </option>

                  <option value="8hr">
                    8 Hours / 80 KM
                  </option>

                  <option value="10hr">
                    10 Hours / 100 KM
                  </option>

                  <option value="12hr">
                    12 Hours / 120 KM
                  </option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actual KM Travelled
                  </label>

                  <input
                    type="number"
                    placeholder="Optional usage KM"
                    value={actualKm}
                    onChange={(e) =>
                      setActualKm(
                        e.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actual Hours Used
                  </label>

                  <input
                    type="number"
                    placeholder="Optional usage Hours"
                    value={
                      actualHours
                    }
                    onChange={(e) =>
                      setActualHours(
                        e.target.value
                      )
                    }
                    className={
                      inputClass
                    }
                  />
                </div>

              </div>

            </div>
          )}

          {/* CALCULATE */}

          <button
            type="button"
            disabled={routeLoading}
            onClick={calculateFare}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4 text-base font-extrabold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {routeLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Calculating Exact Route...
              </>
            ) : (
              <>
                <Calculator className="h-5 w-5" />
                Calculate Estimated Fare
              </>
            )}
          </button>

        </div>

        {/* RESULT */}

        {fare !== null && (
          <section
            id="fare-result"
            className="mt-8 scroll-mt-24"
          >
            <div className="overflow-hidden rounded-[28px] border border-slate-800 bg-slate-950 shadow-2xl">

              <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 px-5 py-8 text-center text-white sm:px-10 sm:py-10">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
                  <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                </div>

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
                  Your Estimated Fare
                </p>

                <h2 className="mt-2 text-5xl font-black tracking-tight sm:text-7xl">
                  ₹
                  {fare.toLocaleString(
                    "en-IN"
                  )}
                </h2>

                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300">
                  This estimate is calculated
                  using your selected route,
                  vehicle, distance, toll and
                  trip details.
                </p>

              </div>

              <div className="bg-white p-5 sm:p-8">

                <div className="mb-6 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Trip Summary
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      Review Your Journey
                    </h3>
                  </div>

                  <div className="rounded-xl bg-blue-50 p-3">
                    <Receipt className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-blue-100 p-2.5">
                        <Car className="h-4 w-4 text-blue-600" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Vehicle
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-slate-800">
                          {
                            vehicleNames[
                              vehicle
                            ]
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-violet-100 p-2.5">
                        <Navigation className="h-4 w-4 text-violet-600" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Trip Type
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-slate-800">
                          {
                            tripTypeLabel
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-emerald-100 p-2.5">
                        <MapPin className="h-4 w-4 text-emerald-600" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Route
                        </p>

                        <p className="mt-0.5 truncate text-sm font-bold text-slate-800">
                          {serviceType ===
                          "local"
                            ? "Local Rental"
                            : `${
                                pickupLocation?.display_name ||
                                pickup
                              } → ${
                                destinationNames ||
                                "Destination"
                              }`}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-amber-100 p-2.5">
                        <Route className="h-4 w-4 text-amber-600" />
                      </div>

                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Distance
                        </p>

                        <p className="mt-0.5 text-sm font-bold text-slate-800">
                          {serviceType ===
                          "local"
                            ? packageLabel
                            : `${totalDistance} KM`}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* BREAKDOWN */}

                <div className="mt-6 rounded-2xl bg-slate-900 p-5 text-white">

                  <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    Fare Breakdown
                  </p>

                  <div className="space-y-3 text-sm">

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">
                        Base Fare
                      </span>

                      <span className="font-bold">
                        ₹
                        {baseFare.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    {serviceType !==
                      "local" && (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            Toll Tax
                          </span>

                          <span className="font-bold">
                            ₹
                            {totalToll.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            Driver Allowance
                          </span>

                          <span className="font-bold">
                            ₹
                            {driverAllowance.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">
                            Travel Time
                          </span>

                          <span className="font-bold">
                            {formatDuration(
                              travelDuration
                            )}
                          </span>
                        </div>
                      </>
                    )}

                    <div className="border-t border-white/10 pt-3">

                      <div className="flex items-center justify-between text-base">
                        <span className="font-bold">
                          Estimated Total
                        </span>

                        <span className="text-xl font-black text-emerald-400">
                          ₹
                          {fare.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </div>

                    </div>

                  </div>

                </div>

                {/* CUSTOMER DETAILS */}

                <div className="mt-8">

                  <div className="mb-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      Almost There
                    </p>

                    <h3 className="mt-1 text-xl font-black text-slate-900">
                      Enter Your Booking Details
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Share your details and continue with your preferred booking option.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <div className="relative">
                      <User className="absolute left-4 top-4 h-4 w-4 text-slate-400" />

                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={
                          customerName
                        }
                        onChange={(e) =>
                          setCustomerName(
                            e.target.value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-4 h-4 w-4 text-slate-400" />

                      <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={
                          mobileNumber
                        }
                        onChange={(e) =>
                          setMobileNumber(
                            e.target.value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>

                    <div className="relative">
                      <Calendar className="absolute left-4 top-4 h-4 w-4 text-slate-400" />

                      <input
                        type="date"
                        value={
                          journeyDate
                        }
                        onChange={(e) =>
                          setJourneyDate(
                            e.target.value
                          )
                        }
                        className={`${inputClass} pl-11`}
                      />
                    </div>

                  </div>
                </div>

                {/* BOOKING ACTIONS */}

                <div className="mt-8 grid gap-3 md:grid-cols-3">

                  <Link
                    href={
                      bookingUrl
                    }
                    className="group flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-4 text-center text-sm font-extrabold text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-[0.99]"
                  >
                    Continue to Full Booking

                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <button
                    type="button"
                    onClick={
                      handleWhatsAppBooking
                    }
                    className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-extrabold text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 active:scale-[0.99]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Booking
                  </button>

                  <a
                    href="tel:+919172271464"
                    className="flex min-h-[58px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-extrabold text-slate-800 transition-all hover:bg-slate-100 active:scale-[0.99]"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Call Now
                  </a>

                </div>

                {/* TRUST */}

                <div className="mt-8 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-3">

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-2.5">
                      <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Trusted Service
                      </p>

                      <p className="text-xs text-slate-500">
                        Safe & reliable travel
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2.5">
                      <Wallet className="h-5 w-5 text-blue-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Transparent Pricing
                      </p>

                      <p className="text-xs text-slate-500">
                        Exact route estimates
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-violet-50 p-2.5">
                      <PhoneCall className="h-5 w-5 text-violet-600" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        Quick Support
                      </p>

                      <p className="text-xs text-slate-500">
                        Call us for assistance
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="mx-auto mt-5 flex items-center gap-1 text-sm font-bold text-slate-500 transition hover:text-blue-600"
            >
              Edit Trip Details

              <ChevronRight className="h-4 w-4" />
            </button>

          </section>
        )}

      </div>
    </main>
  );
}