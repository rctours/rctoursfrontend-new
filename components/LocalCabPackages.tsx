"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock3,
  ShieldCheck,
  Fuel,
  WalletCards,
} from "lucide-react";

type Car = {
  carName: string;
  carSubtitle: string;
  image: string;
  fuelType: string;
  price: string;
  href: string;
};

type Package = {
  package: string;
  included: string;
  footerText: string;
  cars: Car[];
};

export default function LocalCabPackages() {
  const [selectedLocalPackage, setSelectedLocalPackage] =
    useState("4 Hr / 40 KM");

  const [showPopular, setShowPopular] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopular(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const packages: Package[] = [
    {
      package: "4 Hr / 40 KM",
      included: "4 Hrs | 40 Kms",
      footerText:
        "After 40 km: charges apply • Tolls & parking at actuals",
      cars: [
        {
          carName: "Dzire",
          carSubtitle: "Or Similar",
          image: "/swift-dzire.webp",
          fuelType: "CNG",
          price: "₹1,400",
          href:
            "/book-cab?tripType=Local%20Rental&package=4hr&cabType=Swift%20Dzire&fare=1400",
        },
        {
          carName: "Ertiga",
          carSubtitle: "Or Similar",
          image: "/ertiga.webp",
          fuelType: "CNG",
          price: "₹1,800",
          href:
            "/book-cab?tripType=Local%20Rental&package=4hr&cabType=Ertiga&fare=1800",
        },
        {
          carName: "Innova Crysta",
          carSubtitle: "Or Similar",
          image: "/innova-crysta.webp",
          fuelType: "Diesel",
          price: "₹2,300",
          href:
            "/book-cab?tripType=Local%20Rental&package=4hr&cabType=Innova%20Crysta&fare=2300",
        },
      ],
    },

    {
      package: "6 Hr / 60 KM",
      included: "6 Hrs | 60 Kms",
      footerText:
        "After 60 km: charges apply • Tolls & parking at actuals",
      cars: [
        {
          carName: "Dzire",
          carSubtitle: "Or Similar",
          image: "/swift-dzire.webp",
          fuelType: "CNG",
          price: "₹1,800",
          href:
            "/book-cab?tripType=Local%20Rental&package=6hr&cabType=Swift%20Dzire&fare=1800",
        },
        {
          carName: "Ertiga",
          carSubtitle: "Or Similar",
          image: "/ertiga.webp",
          fuelType: "CNG",
          price: "₹2,200",
          href:
            "/book-cab?tripType=Local%20Rental&package=6hr&cabType=Ertiga&fare=2200",
        },
        {
          carName: "Innova Crysta",
          carSubtitle: "Or Similar",
          image: "/innova-crysta.webp",
          fuelType: "Diesel",
          price: "₹3,000",
          href:
            "/book-cab?tripType=Local%20Rental&package=6hr&cabType=Innova%20Crysta&fare=3000",
        },
      ],
    },

    {
      package: "8 Hr / 80 KM",
      included: "8 Hrs | 80 Kms",
      footerText:
        "After 80 km: charges apply • Tolls & parking at actuals",
      cars: [
        {
          carName: "Dzire",
          carSubtitle: "Or Similar",
          image: "/swift-dzire.webp",
          fuelType: "CNG",
          price: "₹2,200",
          href:
            "/book-cab?tripType=Local%20Rental&package=8hr-80km&cabType=Swift%20Dzire&fare=2200&car=dzire",
        },
        {
          carName: "Ertiga",
          carSubtitle: "Or Similar",
          image: "/ertiga.webp",
          fuelType: "CNG",
          price: "₹2,600",
          href:
            "/book-cab?tripType=Local%20Rental&package=8hr-80km&cabType=Ertiga&fare=2600&car=ertiga",
        },
        {
          carName: "Innova Crysta",
          carSubtitle: "Or Similar",
          image: "/innova-crysta.webp",
          fuelType: "Diesel",
          price: "₹3,800",
          href:
            "/book-cab?tripType=Local%20Rental&package=8hr-80km&cabType=Innova%20Crysta&fare=3800&car=crysta",
        },
      ],
    },

    {
      package: "12 Hr / 120 KM",
      included: "12 Hrs | 120 Kms",
      footerText:
        "After 120 km: charges apply • Tolls & parking at actuals",
      cars: [
        {
          carName: "Dzire",
          carSubtitle: "Or Similar",
          image: "/swift-dzire.webp",
          fuelType: "CNG",
          price: "₹2,800",
          href:
            "/book-cab?tripType=Local%20Rental&package=12hr-120km&cabType=Swift%20Dzire&fare=2800&car=dzire",
        },
        {
          carName: "Ertiga",
          carSubtitle: "Or Similar",
          image: "/ertiga.webp",
          fuelType: "CNG",
          price: "₹3,200",
          href:
            "/book-cab?tripType=Local%20Rental&package=12hr-120km&cabType=Ertiga&fare=3200&car=ertiga",
        },
        {
          carName: "Innova Crysta",
          carSubtitle: "Or Similar",
          image: "/innova-crysta.webp",
          fuelType: "Diesel",
          price: "₹4,200",
          href:
            "/book-cab?tripType=Local%20Rental&package=12hr-120km&cabType=Innova%20Crysta&fare=4200&car=crysta",
        },
      ],
    },
  ];

  const selectedPackage = packages.find(
    (item) => item.package === selectedLocalPackage
  );

  return (
    <section className="mx-auto max-w-7xl px-3 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* POPULAR HIGHLIGHT */}
      <div
        className={`transition-all duration-700 ${
          showPopular
            ? "rounded-2xl border border-orange-200 bg-gradient-to-b from-orange-50/70 via-white to-white p-4 shadow-md sm:rounded-3xl sm:p-8"
            : "border-transparent bg-transparent p-0 shadow-none"
        }`}
      >
        {/* POPULAR BADGE */}
        <div
          className={`overflow-hidden text-center transition-all duration-500 ${
            showPopular
              ? "mb-4 max-h-16 opacity-100 sm:mb-6 sm:max-h-20"
              : "mb-0 max-h-0 opacity-0"
          }`}
        >
          <span className="inline-flex animate-pulse items-center gap-1.5 rounded-full border border-orange-200 bg-orange-100 px-4 py-1.5 text-xs font-bold text-orange-700 shadow-xs sm:px-5 sm:py-2 sm:text-sm">
            🔥 Popular Local Cab Packages
          </span>
        </div>

        {/* ================= HEADING ================= */}
        <div>
          <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-600 sm:text-xs">
            Local Travel
          </span>

          <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-4xl">
            Hourly Cab Packages in Nagpur
          </h2>

          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-base">
            Choose a suitable local taxi package for meetings, shopping,
            family travel, city sightseeing and other travel requirements
            within Nagpur.
          </p>
        </div>

        {/* ================= SELECT PACKAGE (Horizontal Scroll on Mobile) ================= */}
        <div className="mt-6 sm:mt-10">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal sm:font-bold sm:text-slate-700 mb-2.5">
            Select Package
          </p>

          <div className="flex w-full gap-1.5 sm:gap-3">
            {packages.map((item) => (
            <button
            key={item.package}
            type="button"
            onClick={() =>
            setSelectedLocalPackage(item.package)
            }
            className={`flex-1 rounded-lg border px-1 py-2 text-[9px] font-bold leading-tight transition-all duration-300 sm:flex-none sm:px-5 sm:py-2.5 sm:text-sm ${
            selectedLocalPackage === item.package
            ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-200"
            : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
            }`}
            >
            {item.package}
            </button>
            ))}
            </div>
        </div>

        {/* ================= PACKAGE CARDS ================= */}
        <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:mt-10 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3">
          {selectedPackage?.cars.map((car) => (
            <div
              key={`${selectedPackage.package}-${car.carName}`}
              className="flex w-[88%] shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:border-blue-200 hover:shadow-lg sm:w-auto sm:shrink sm:rounded-3xl"
            >
              {/* CAR IMAGE SECTION */}
              <div className="relative border-b border-slate-100 bg-slate-50/60 p-4 pb-2 text-center sm:p-5 sm:pb-2">
                <span className="absolute left-3 top-3 inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 sm:left-4 sm:top-4 sm:px-3 sm:py-1 sm:text-[11px]">
                  {selectedPackage.package}
                </span>

                <img
                  src={car.image}
                  alt={`${car.carName} local taxi package in Nagpur`}
                  className="mx-auto mt-2 h-28 w-full object-contain sm:mt-4 sm:h-36"
                />
              </div>

              {/* CARD CONTENT */}
              <div className="flex flex-1 flex-col p-4 sm:p-6">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                    {car.carName}
                  </h3>

                  <span className="text-[11px] font-medium text-slate-500 sm:text-xs">
                    {car.carSubtitle}
                  </span>
                </div>

                {/* DETAILS GRID */}
                <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3.5 border-y border-slate-100 py-4 text-xs sm:mt-5 sm:gap-x-3 sm:gap-y-5 sm:py-5">
                  {/* INCLUDED */}
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                        Included
                      </p>
                      <p className="mt-0.5 text-[11px] font-bold text-slate-800 sm:text-xs">
                        {selectedPackage.included}
                      </p>
                    </div>
                  </div>

                  {/* CANCELLATION */}
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                        Cancellation
                      </p>
                      <p className="mt-0.5 text-[11px] font-bold text-slate-800 sm:text-xs">
                        Free Up To 1 Hr
                      </p>
                    </div>
                  </div>

                  {/* FUEL TYPE */}
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <Fuel className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                        Fuel Type
                      </p>
                      <p className="mt-0.5 text-[11px] font-bold text-slate-800 sm:text-xs">
                        {car.fuelType}
                      </p>
                    </div>
                  </div>

                  {/* PART PAYMENT */}
                  <div className="flex items-start gap-1.5 sm:gap-2">
                    <WalletCards className="mt-0.5 h-4 w-4 shrink-0 text-slate-600 sm:h-5 sm:w-5" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wide text-slate-400 sm:text-[10px]">
                        Part Payment
                      </p>
                      <p className="mt-0.5 text-[11px] font-bold leading-tight text-slate-800">
                        Pay 20% Now
                      </p>
                    </div>
                  </div>
                </div>

                {/* PRICE + BUTTON */}
                <div className="mt-auto flex items-center justify-between gap-3 pt-4 sm:pt-5">
                  <div>
                    <p className="text-lg font-black text-slate-900 sm:text-xl">
                      {car.price}
                    </p>
                    <p className="text-[9px] font-medium text-slate-400 sm:text-[10px]">
                      + Taxes & Charges
                    </p>
                  </div>

                  <Link
                    href={car.href}
                    className="inline-flex h-10 min-w-[96px] shrink-0 items-center justify-center rounded-xl bg-[#b20d06] px-4 text-xs font-bold text-white transition hover:bg-[#920b05] sm:h-11 sm:min-w-[110px] sm:px-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* FOOTER */}
              <div className="border-t border-slate-200/60 bg-slate-50 px-3 py-2.5 text-center text-[10px] font-medium text-slate-600 sm:px-4 sm:py-3">
                {selectedPackage.footerText}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}