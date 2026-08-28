"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RouteData = {
  destination: string;
  pickup: string;
  drop: string;
  tripType: string;
  airport?: boolean;
  distance?: number;
  duration?: number;
};

const routeDisplayData: Record<
  string,
  {
    recommended: string;
    rating: string;
    badge?: string | null;
    href: string;
  }
> = {
  "Nagpur Airport to City": {
    recommended: "Sedan",
    rating: "4.9",
    badge: "Airport Transfer",
    href: "/book-cab?pickup=Dr.%20Babasaheb%20Ambedkar%20International%20Airport%2C%20Nagpur&drop=Nagpur&tripType=Airport%20Pick-Up%20%26%20Drop",
  },

  Wardha: {
    recommended: "Sedan",
    rating: "4.5",
    badge: "Most booked",
    href: "/book-cab?pickup=Nagpur&drop=Wardha&tripType=One%20Way%20Trip",
  },

  Bhandara: {
    recommended: "Sedan",
    rating: "4.6",
    href: "/book-cab?pickup=Nagpur&drop=Bhandara&tripType=One%20Way%20Trip",
  },

  Chandrapur: {
    recommended: "Sedan",
    rating: "4.6",
    href: "/book-cab?pickup=Nagpur&drop=Chandrapur&tripType=One%20Way%20Trip",
  },

  Amravati: {
    recommended: "Sedan",
    rating: "4.5",
    href: "/book-cab?pickup=Nagpur&drop=Amravati&tripType=One%20Way%20Trip",
  },

  Pench: {
    recommended: "SUV",
    rating: "4.7",
    badge: "Most booked",
    href: "/nagpur-to-pench-cab",
  },

  Tadoba: {
    recommended: "SUV",
    rating: "4.8",
    badge: "Most booked",
    href: "/nagpur-to-tadoba-cab",
  },

  Saoner: {
    recommended: "Hatchback",
    rating: "4.4",
    href: "/book-cab?pickup=Nagpur&drop=Saoner&tripType=One%20Way%20Trip",
  },

  Kamptee: {
    recommended: "Hatchback",
    rating: "4.3",
    href: "/book-cab?pickup=Nagpur&drop=Kamptee&tripType=One%20Way%20Trip",
  },

  Ramtek: {
    recommended: "Hatchback",
    rating: "4.5",
    href: "/book-cab?pickup=Nagpur&drop=Ramtek&tripType=One%20Way%20Trip",
  },

  Umred: {
    recommended: "Hatchback",
    rating: "4.4",
    href: "/book-cab?pickup=Nagpur&drop=Umred&tripType=One%20Way%20Trip",
  },

  Katol: {
    recommended: "Hatchback",
    rating: "4.4",
    href: "/book-cab?pickup=Nagpur&drop=Katol&tripType=One%20Way%20Trip",
  },

  Chhindwara: {
    recommended: "Sedan",
    rating: "4.5",
    href: "/nagpur-to-chhindwara-cab",
  },
};

function formatDuration(minutes?: number) {
  if (!minutes) return "Time unavailable";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

/* =====================================
   POPULAR ROUTE STARTING FARE

   Swift Dzire starting price logic
===================================== */

function getStartingFare(
  distance: number,
  tripType: string,
  airport?: boolean
) {
  if (!distance || distance <= 0) return 0;

  const discountedRate = 11;

  // =====================================
  // AIRPORT PICK-UP & DROP
  // =====================================

  if (airport || tripType === "Airport Pick-Up & Drop") {
    if (distance <= 10) return 1100;
    if (distance <= 20) return 1200;
    if (distance <= 30) return 1500;
    if (distance <= 40) return 1900;
    if (distance <= 50) return 2300;
    if (distance <= 60) return 2700;
    if (distance <= 70) return 3100;
    if (distance <= 80) return 3500;

    return Math.round(distance * discountedRate * 2);
  }

  // =====================================
  // ONE WAY TRIP
  // =====================================

  if (
    tripType === "One Way Trip" ||
    tripType === "One Way"
  ) {
    if (distance <= 10) return 1100;

    if (distance <= 20) return 1200;

    if (distance <= 30) return 1500;

    if (distance <= 40) return 1900;

    if (distance <= 50) return 2300;

    if (distance < 100) {
      return Math.round(
        distance * discountedRate * 2
      );
    }

    if (distance < 150) {
      return Math.round(
        150 * discountedRate * 2
      );
    }

    return Math.round(
      distance * discountedRate * 2
    );
  }

  return Math.round(distance * discountedRate);
}

export default function PopularCabRoutes() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPopularRoutes() {
      try {
        const response = await fetch(
          "/api/popular-routes"
        );

        const data = await response.json();

        if (
          !cancelled &&
          response.ok &&
          data?.success &&
          Array.isArray(data.routes)
        ) {
          setRoutes(data.routes);
        }
      } catch (error) {
        console.error(
          "POPULAR ROUTES LOAD ERROR:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPopularRoutes();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-white py-5 sm:py-8">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

        {/* ================= HEADING ================= */}

        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Popular Cab Routes from Nagpur
          </h2>

          <p className="mt-1.5 max-w-5xl text-xs leading-relaxed text-slate-600 sm:text-sm">
            Looking for a reliable taxi service in Nagpur?
            RC Tours & Travels provides convenient cab
            options for airport transfers, nearby destinations
            and outstation journeys from Nagpur.
          </p>
        </div>

        {/* ================= LOADING ================= */}

        {loading && (
          <div className="mt-4 space-y-2.5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-16 w-full animate-pulse rounded-xl bg-slate-100"
              />
            ))}
          </div>
        )}

        {/* ================= ROUTES ================= */}

        {!loading && (
          <div className="mt-4 space-y-2.5 sm:space-y-4">
            {routes.map((route) => {
              const display =
                routeDisplayData[route.destination];

              if (!display) return null;

              const distance =
                Number(route.distance) || 0;

              const duration =
                Number(route.duration) || 0;

              const startingFare =
                getStartingFare(
                  distance,
                  route.tripType,
                  route.airport
                );

              const href =
                distance > 0 && startingFare > 0
                  ? display.href.includes("?")
                    ? `${display.href}&distance=${encodeURIComponent(
                        distance
                      )}&fare=${encodeURIComponent(
                        startingFare
                      )}`
                    : `${display.href}?distance=${encodeURIComponent(
                        distance
                      )}&fare=${encodeURIComponent(
                        startingFare
                      )}`
                  : display.href;

              return (
                <div
                  key={route.destination}
                  className="group rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs transition-all hover:border-slate-300 hover:shadow-md sm:p-5"
                >
                  <div className="flex items-center justify-between gap-3">

                    {/* ================= LEFT INFO ================= */}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {!route.airport && (
                          <span className="text-[11px] text-slate-500 sm:text-sm">
                            Nagpur to
                          </span>
                        )}

                        <h3 className="text-sm font-bold text-slate-900 sm:text-lg">
                          {route.destination}
                        </h3>

                        {display.badge && (
                          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-semibold text-amber-700 border border-amber-200/60 sm:text-[10px]">
                            {display.badge}
                          </span>
                        )}
                      </div>

                      {/* Meta Details: Compact on Mobile */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500 sm:text-sm sm:gap-x-3">
                        <span>
                          {distance > 0
                            ? `${distance} km`
                            : "N/A"}
                        </span>

                        <span>•</span>

                        <span>
                          {duration > 0
                            ? formatDuration(duration)
                            : "N/A"}
                        </span>

                        <span>•</span>

                        <span>
                          Rec: <strong className="text-slate-700">{display.recommended}</strong>
                        </span>

                        <span>•</span>

                        <span className="flex items-center gap-0.5 font-medium text-slate-700">
                          <span className="text-amber-500">★</span>
                          {display.rating}
                        </span>
                      </div>
                    </div>

                    {/* ================= RIGHT PRICE & ACTION ================= */}

                    <div className="flex shrink-0 items-center gap-3 sm:gap-6">
                      <div className="text-right">
                        <p className="text-[10px] font-medium text-slate-400 sm:text-[11px]">
                          Starting from
                        </p>
                        <p className="text-sm font-black text-slate-900 sm:text-xl">
                          {startingFare > 0
                            ? `₹${startingFare.toLocaleString("en-IN")}`
                            : "Check"}
                        </p>
                      </div>

                      <Link
                        href={href}
                        className="inline-flex h-9 min-w-[88px] items-center justify-center rounded-lg bg-[#990000] px-3.5 text-xs font-bold text-white transition-colors hover:bg-[#800000] sm:h-10 sm:min-w-[120px] sm:px-5 sm:text-sm"
                      >
                        View Cabs
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}