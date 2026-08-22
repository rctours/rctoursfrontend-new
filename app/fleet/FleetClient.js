"use client";

import Image from "next/image";
import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";

import {
  Car,
  Users,
  Briefcase,
  Star,
  ShieldCheck,
  MapPin,
  Snowflake,
  Clock3,
  Headset,
  Phone,
  MessageCircle,
  Search,
  Calculator,
  BadgeCheck,
  PartyPopper,
  Navigation,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  IndianRupee,
} from "lucide-react";

const cars = [
  {
    name: "Swift Dzire",
    image: "/swift-dzire.webp",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹13/km",
    rate: 13,
    category: "Sedan",
  },
  {
    name: "Hyundai Aura",
    image: "/aura.webp",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹13/km",
    category: "Sedan",
    rate: 13,
  },
  {
    name: "Toyota Glanza",
    image: "/glanza.webp",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹13/km",
    category: "Sedan",
    rate: 13,
  },
  {
    name: "Maruti Ertiga",
    image: "/ertiga.webp",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹15/km",
    category: "SUV",
    rate: 15,
  },
  {
    name: "Toyota Rumion",
    image: "/rumion.webp",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹15/km",
    category: "SUV",
    rate: 15,
  },
  {
    name: "Kia Carens",
    image: "/carens.webp",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹17/km",
    category: "SUV",
    rate: 17,
  },
  {
    name: "Innova Crysta",
    image: "/innova-crysta.webp",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹19/km",
    category: "Premium",
    rate: 19,
  },
  {
    name: "Toyota Hycross",
    image: "/hycross.webp",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹25/km",
    category: "Premium",
    rate: 25,
  },
  {
    name: "Traveller 13 Seater",
    image: "/traveller13.webp",
    seats: "13 Seats",
    luggage: "10 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 25,
  },
  {
    name: "Traveller 17 Seater",
    image: "/traveller17.webp",
    seats: "17 Seats",
    luggage: "12 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 28,
  },
  {
    name: "Traveller 26 Seater",
    image: "/traveller26.webp",
    seats: "26 Seats",
    luggage: "20 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 36,
  },
  {
    name: "Force Urbania",
    image: "/urbania.webp",
    seats: "17 Seats",
    luggage: "12 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 38,
  },
];

const categories = [
  { name: "All", icon: "🚘" },
  { name: "Sedan", icon: "🚗" },
  { name: "SUV", icon: "🚙" },
  { name: "Premium", icon: "✨" },
  { name: "Traveller", icon: "🚌" },
];

function FleetContent() {
  const searchParams = useSearchParams();

  const [showStickyBar, setShowStickyBar] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("All");

  const footerStartRef = useRef(null);

  const tripType = searchParams.get("tripType") || "";
  const pickup = searchParams.get("pickup") || "";
  const drop = searchParams.get("drop") || "";
  const pickupDate = searchParams.get("pickupDate") || "";
  const returnDate = searchParams.get("returnDate") || "";
  const pickupTime = searchParams.get("pickupTime") || "";

  const distance = Number(searchParams.get("distance") || 0);
  const toll = Number(searchParams.get("toll") || 0);

  const filteredCars = cars.filter(
    (car) => category === "All" || car.category === category
  );

  const visibleCars = 4;
  const maxIndex = Math.max(filteredCars.length - visibleCars, 0);

  const calculateFare = (car) => {
    if (!distance || !car.rate) return 0;

    if (tripType === "Airport Pick-Up & Drop") {
      return Math.round(distance * car.rate * 2);
    }

    if (tripType === "Local Rental") {
      return Math.round(distance * car.rate);
    }

    if (tripType === "One Way Trip") {
      return Math.round(distance * car.rate * 2);
    }

    if (tripType === "Outstation Trip") {
      return Math.round(distance * car.rate * 2);
    }

    return Math.round(distance * car.rate);
  };

  const formatPrice = (price) => {
    if (!price) return "";

    return new Intl.NumberFormat("en-IN").format(price);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentIndex(0);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goPrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const createBookingUrl = (car) => {
    const fare = calculateFare(car);

    return (
      `/booking-details?vehicle=${encodeURIComponent(car.name)}` +
      `&tripType=${encodeURIComponent(tripType)}` +
      `&pickup=${encodeURIComponent(pickup)}` +
      `&drop=${encodeURIComponent(drop)}` +
      `&pickupDate=${encodeURIComponent(pickupDate)}` +
      `&returnDate=${encodeURIComponent(returnDate)}` +
      `&pickupTime=${encodeURIComponent(pickupTime)}` +
      `&distance=${encodeURIComponent(distance)}` +
      `&toll=${encodeURIComponent(toll)}` +
      `&fare=${encodeURIComponent(fare)}`
    );
  };

  const handleBookClick = (e, car) => {
    if (!pickup || !drop || !pickupDate || !tripType || distance <= 0) {
      e.preventDefault();

      alert("Please fill Pickup, Drop, Trip Type and Journey Date first.");

      window.location.href = "/book-cab";
      return;
    }

    window.location.href = createBookingUrl(car);
  };

  useEffect(() => {
    if (filteredCars.length <= visibleCars) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [filteredCars.length, maxIndex]);

  useEffect(() => {
  const footerElement = footerStartRef.current;

  if (!footerElement) return;

  const handleScroll = () => {
    const footerTop = footerElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Footer ka START screen me aate hi Sticky Bar hide
    if (footerTop <= windowHeight) {
      setShowStickyBar(false);
    } else {
      setShowStickyBar(true);
    }
  };

  handleScroll();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  window.addEventListener("resize", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-gray-900 pt-24 md:pt-28 px-4 md:px-6 pb-28 md:pb-24">
        <div className="max-w-[1500px] mx-auto">

{/* ================= HERO ================= */}

<section className="relative mb-8 overflow-hidden rounded-[2rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 via-white to-blue-50 px-5 py-10 text-center shadow-sm md:mb-10 md:px-10 md:py-14">

  {/* BACKGROUND DECORATION */}
  <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

  <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl" />

  <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 blur-3xl" />

  <div className="relative z-10">

    {/* BADGE */}
    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 px-4 py-2 text-[10px] font-black tracking-[0.12em] text-cyan-700 shadow-sm backdrop-blur-sm md:text-xs">
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-600 text-white">
        <Car size={13} />
      </span>

      RC TOURS & TRAVELS NAGPUR
    </div>

    {/* HEADING */}
    <h1 className="mx-auto mt-5 max-w-5xl text-3xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
      Best Cab & Taxi Service{" "}

      <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent">
        In Nagpur
      </span>
    </h1>

    {/* DESCRIPTION */}
    <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-lg md:leading-8">
      Book Sedan, SUV, Innova, Force Urbania and Tempo Traveller for local
      sightseeing, Nagpur airport transfers, and comfortable outstation
      journeys.
    </p>

    {/* JOURNEY DETAILS */}
    {tripType && (
      <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2.5">

        {/* TRIP TYPE */}
        <span className="inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-600 px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-cyan-200">
          <Navigation size={15} />
          {tripType}
        </span>

        {/* PICKUP */}
        {pickup && (
          <span className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white bg-white/90 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm">
            <MapPin
              size={15}
              className="shrink-0 text-cyan-600"
            />

            <span className="max-w-[180px] truncate">
              {pickup}
            </span>
          </span>
        )}

        {/* DROP */}
        {drop && (
          <span className="inline-flex max-w-full items-center gap-2 rounded-xl border border-white bg-white/90 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm">
            <MapPin
              size={15}
              className="shrink-0 text-green-600"
            />

            <span className="max-w-[180px] truncate">
              {drop}
            </span>
          </span>
        )}

        {/* DATE */}
        {pickupDate && (
          <span className="inline-flex items-center gap-2 rounded-xl border border-white bg-white/90 px-3.5 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur-sm">
            <CalendarDays
              size={15}
              className="text-cyan-600"
            />

            {pickupDate}
          </span>
        )}

      </div>
    )}

  </div>
</section>

{/* ================= FLEET HEADER ================= */}

<section className="mt-4 mb-5 text-center md:mt-5 md:mb-6">
  <div>
    <p className="text-cyan-600 text-xs font-black uppercase tracking-[0.2em] md:text-sm">
      Choose Your Ride
    </p>

    <h2 className="mt-1.5 text-3xl font-black tracking-tight text-gray-950 md:text-4xl">
      Available Vehicles
    </h2>

    <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-gray-600 md:text-base">
      Select the vehicle that suits your passengers and luggage.
    </p>
  </div>
</section>


{/* ================= CATEGORY ================= */}

<section className="mb-6">
  <div className="flex flex-wrap justify-center gap-2">
    {categories.map((item) => (
      <button
        key={item.name}
        onClick={() => handleCategoryChange(item.name)}
        className={`rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
          category === item.name
            ? "bg-cyan-600 text-white shadow-lg shadow-cyan-200"
            : "border border-gray-200 bg-white text-gray-700 hover:border-cyan-400 hover:text-cyan-700"
        }`}
      >
        <span className="mr-1.5">{item.icon}</span>
        {item.name}
      </button>
    ))}
  </div>
</section>


{/* ================= DOTS + ARROWS ================= */}

{maxIndex > 0 && (
  <div className="mb-5 flex items-center justify-center gap-4">

    {/* PREVIOUS ARROW */}
    <button
      onClick={goPrevious}
      aria-label="Previous vehicles"
      className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md"
    >
      <ArrowLeft
        size={18}
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      />
    </button>

    {/* DOTS */}
    <div className="flex items-center gap-2">
      {Array.from({ length: maxIndex + 1 }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          aria-label={`Go to vehicle group ${index + 1}`}
          className={`h-2 rounded-full transition-all duration-300 ${
            currentIndex === index
              ? "w-8 bg-cyan-600"
              : "w-2 bg-gray-300 hover:bg-gray-400"
          }`}
        />
      ))}
    </div>

    {/* NEXT ARROW */}
    <button
      onClick={goNext}
      aria-label="Next vehicles"
      className="group flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md"
    >
      <ArrowRight
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </button>

  </div>
)}

          {/* VEHICLE CARDS */}

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {filteredCars
              .slice(currentIndex, currentIndex + visibleCars)
              .map((car) => {
                const calculatedFare = calculateFare(car);

                const whatsappMessage = `Hello RC Tours & Travels,

I am interested in booking:

Vehicle: ${car.name}
Trip Type: ${tripType || "Not Selected"}
Pickup: ${pickup || "Not Selected"}
Drop: ${drop || "Not Selected"}
Journey Date: ${pickupDate || "Not Selected"}

Please share booking details.`;

                return (
<article
  key={car.name}
  className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_18px_40px_rgba(8,145,178,0.16)]"
>
  {/* ================= VEHICLE IMAGE ================= */}
  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 md:h-52">
    <Image
      src={car.image}
      alt={`${car.name} Cab Service in Nagpur`}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

    {/* CATEGORY */}
    <div className="absolute left-3 top-3">
      <span className="rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[11px] font-black text-slate-800 shadow-sm backdrop-blur-sm">
        {car.category}
      </span>
    </div>

    {/* AVAILABLE */}
    <div className="absolute bottom-3 left-3">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-lg">
        <CheckCircle2 size={13} />
        Available Today
      </span>
    </div>
  </div>

  {/* ================= CARD CONTENT ================= */}
  <div className="flex flex-1 flex-col p-4 md:p-5">

    {/* VEHICLE NAME */}
    <div className="mb-4">
      <h3 className="text-xl font-black leading-tight tracking-tight text-slate-900">
        {car.name}
      </h3>

      <div className="mt-2 h-1 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-700 transition-all duration-300 group-hover:w-16" />
    </div>

    {/* ================= PRICE BOX ================= */}
    <div className="relative overflow-hidden rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white px-4 py-3.5">
      <div className="absolute right-0 top-0 h-16 w-16 rounded-bl-full bg-cyan-100/40" />

      {calculatedFare > 0 ? (
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-500">
            Estimated Fare
          </p>

          <div className="mt-1 flex items-center gap-1">
            <IndianRupee
              size={20}
              className="text-cyan-600"
            />

            <span className="text-2xl font-black tracking-tight text-cyan-700">
              {formatPrice(calculatedFare)}
            </span>
          </div>
        </div>
      ) : (
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-slate-500">
            Starting Rate
          </p>

          <p className="mt-1 text-2xl font-black tracking-tight text-cyan-700">
            {car.price}
          </p>
        </div>
      )}
    </div>

    {/* ================= PASSENGERS + LUGGAGE ================= */}
    <div className="mt-3 grid grid-cols-2 gap-2.5">
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 transition group-hover:border-cyan-100">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100">
            <Users size={16} className="text-cyan-700" />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
              Passengers
            </p>

            <p className="text-xs font-black text-slate-900">
              {car.seats}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3 transition group-hover:border-cyan-100">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-100">
            <Briefcase size={16} className="text-cyan-700" />
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-wide text-slate-500">
              Luggage
            </p>

            <p className="text-xs font-black text-slate-900">
              {car.luggage}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* ================= FEATURES ================= */}
    <div className="mt-3 flex flex-wrap gap-1.5">
      <span className="inline-flex items-center gap-1 rounded-full border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[10px] font-bold text-cyan-700">
        <Snowflake size={12} />
        AC
      </span>

      <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-600">
        <Navigation size={12} />
        GPS
      </span>

      <span className="inline-flex items-center gap-1 rounded-full border border-yellow-100 bg-yellow-50 px-2.5 py-1 text-[10px] font-bold text-yellow-700">
        <Star
          size={12}
          className="fill-yellow-500 text-yellow-500"
        />
        4.9 Rated
      </span>
    </div>

    {/* ================= BUTTONS ================= */}
    <div className="mt-auto pt-5">

      <div className="grid grid-cols-2 gap-2.5">
        <a
          href="tel:+919172271464"
          className="flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white text-xs font-black text-cyan-700 transition-all duration-200 hover:bg-cyan-50 hover:shadow-sm active:scale-[0.97]"
        >
          <Phone size={16} />
          Call
        </a>

        <a
          href={`https://wa.me/919172271464?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-xs font-black text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[0.97]"
        >
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>

      <a
        href={createBookingUrl(car)}
        onClick={(e) => handleBookClick(e, car)}
        className="mt-2.5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-cyan-600 to-cyan-700 text-sm font-black text-white shadow-[0_8px_18px_rgba(8,145,178,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(8,145,178,0.35)] active:scale-[0.98]"
      >
        <CalendarDays size={17} />
        Book This Vehicle
      </a>

    </div>
  </div>
</article>
                );
              })}
          </section>

{/* ================= WHY CHOOSE ================= */}

<section className="mt-16 md:mt-20">
  
  {/* HEADER */}
  <div className="mb-10 text-center">
    <span className="inline-flex rounded-full bg-cyan-50 px-4 py-2 text-xs font-black text-cyan-700">
      WHY RC TOURS & TRAVELS
    </span>

    <h2 className="mt-4 text-3xl font-black text-gray-950 md:text-5xl">
      Comfortable Ride. Reliable Service.
    </h2>

    <p className="mx-auto mt-3 max-w-3xl text-gray-600">
      We focus on clean vehicles, experienced drivers and a smooth
      travel experience from booking to destination.
    </p>
  </div>

  {/* CARDS */}
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

    {/* CARD 1 */}
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl">

      <div className="relative h-52 overflow-hidden">
        <Image
          src="/well-maintained-vehicles.webp"
          alt="Clean and Well Maintained Cab"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-cyan-700 shadow-sm">
            Premium Fleet
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-gray-950">
          Well Maintained Vehicles
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Regularly serviced, clean and comfortable vehicles for every
          journey.
        </p>

        <div className="mt-4 h-1 w-12 rounded-full bg-cyan-500 transition-all duration-300 group-hover:w-20" />
      </div>
    </div>


    {/* CARD 2 */}
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl">

      <div className="relative h-52 overflow-hidden">
        <Image
          src="/why-professional-driver.webp"
          alt="Professional Cab Driver"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-cyan-700 shadow-sm">
            Trusted Drivers
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-gray-950">
          Professional Drivers
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Experienced and courteous drivers focused on safe, comfortable
          and stress-free travel.
        </p>

        <div className="mt-4 h-1 w-12 rounded-full bg-cyan-500 transition-all duration-300 group-hover:w-20" />
      </div>
    </div>


    {/* CARD 3 */}
    <div className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-xl">

      <div className="relative h-52 overflow-hidden">
        <Image
          src="/on-time-pickup.webp"
          alt="On Time Cab Pickup Service"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-4 left-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-xs font-black text-cyan-700 shadow-sm">
            On-Time Service
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-black text-gray-950">
          On-Time Pickup
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Reliable pickup for airport transfers, local travel and
          outstation trips.
        </p>

        <div className="mt-4 h-1 w-12 rounded-full bg-cyan-500 transition-all duration-300 group-hover:w-20" />
      </div>
    </div>

  </div>
</section>

          {/* STATS */}

          <section className="mt-16 md:mt-20">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm">
                <Car className="mx-auto text-cyan-600 mb-3" size={28} />

                <p className="text-3xl font-black text-gray-950">
                  10K+
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Trips Completed
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm">
                <Users className="mx-auto text-cyan-600 mb-3" size={28} />

                <p className="text-3xl font-black text-gray-950">
                  10K+
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Happy Customers
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm">
                <Star
                  className="mx-auto text-yellow-500 fill-yellow-500 mb-3"
                  size={28}
                />

                <p className="text-3xl font-black text-gray-950">
                  4.9★
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Google Rating
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-200 p-6 text-center shadow-sm">
                <Headset className="mx-auto text-cyan-600 mb-3" size={28} />

                <p className="text-3xl font-black text-gray-950">
                  24×7
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  Customer Support
                </p>
              </div>
            </div>
          </section>

{/* ================= HOW TO BOOK ================= */}

<section className="relative mt-14 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-cyan-50/30 px-4 py-10 shadow-sm md:mt-16 md:px-8 md:py-12">

  {/* BACKGROUND DECORATION */}
  <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[100px]" />

  {/* HEADER */}
  <div className="relative z-10 mx-auto mb-10 max-w-3xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-black tracking-wide text-cyan-700">
      <Clock3 size={14} />
      SIMPLE & EASY BOOKING
    </span>

    <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 md:text-5xl">
      Book Your Cab in{" "}
      <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
        6 Easy Steps
      </span>
    </h2>

    <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
      From selecting your vehicle to completing your journey, booking your cab
      with RC Tours & Travels is simple, fast and convenient.
    </p>
  </div>

  {/* STEPS */}
  <div className="relative z-10">

    {/* DESKTOP CONNECTING LINE */}
    <div className="absolute left-[8%] right-[8%] top-10 hidden h-[2px] bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-300 lg:block" />

    <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-5 lg:grid-cols-6 lg:gap-3">

      {/* STEP 01 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-cyan-500 to-cyan-700 text-white shadow-lg shadow-cyan-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <Car size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            01
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Select Your Cab
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Choose the perfect vehicle for your journey.
          </p>
        </div>

      </div>


      {/* STEP 02 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <Calculator size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            02
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Check Your Fare
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            View your estimated fare before booking.
          </p>
        </div>

      </div>


      {/* STEP 03 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <Users size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            03
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-blue-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Passenger Details
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Enter your personal and journey details.
          </p>
        </div>

      </div>


      {/* STEP 04 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <BadgeCheck size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            04
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-indigo-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Confirm Booking
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Review your trip and confirm the booking.
          </p>
        </div>

      </div>


      {/* STEP 05 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <IndianRupee size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            05
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-emerald-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Make Payment
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Pay securely and complete your reservation.
          </p>
        </div>

      </div>


      {/* STEP 06 */}
      <div className="group relative flex flex-col items-center text-center">

        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20 transition duration-300 group-hover:-translate-y-1 group-hover:scale-105">
          <PartyPopper size={24} strokeWidth={2.3} />

          <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-lg border-2 border-white bg-slate-900 text-[9px] font-black text-white">
            06
          </span>
        </div>

        <div className="mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-purple-300 group-hover:shadow-md md:p-4">
          <h3 className="text-sm font-black text-slate-950">
            Enjoy Your Journey
          </h3>

          <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
            Sit back, relax and enjoy your comfortable ride.
          </p>
        </div>

      </div>

    </div>
  </div>
</section>

{/* ================= SERVICE LOCATIONS ================= */}

<section className="relative mt-8 md:mt-12">

  {/* HEADER */}
  <div className="mb-4 flex flex-col gap-3 md:mb-5 md:flex-row md:items-end md:justify-between">

    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
        <span className="h-px w-5 bg-cyan-500" />
        Where We Travel
      </div>

      <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
        Cab Service From{" "}
        <span className="text-cyan-600">Nagpur</span>
      </h2>

      <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-600 md:text-sm">
        From local rides to outstation journeys, RC Tours & Travels connects
        Nagpur with popular destinations.
      </p>
    </div>

    {/* SERVICE BADGE */}
    <div className="flex w-fit items-center gap-2 rounded-xl border border-cyan-100 bg-cyan-50 px-3 py-2 shadow-sm">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600 text-white">
        <Navigation size={15} />
      </div>

      <div>
        <p className="text-[8px] font-black uppercase tracking-wider text-cyan-700">
          Service Status
        </p>

        <p className="text-[11px] font-black text-slate-900">
          Available 24×7
        </p>
      </div>

    </div>
  </div>


  {/* ================= ROUTE MAP ================= */}

  <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 px-3 py-5 shadow-lg md:px-6 md:py-6">

    {/* BACKGROUND ROAD LINES */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">

      <div className="absolute left-[10%] top-[38%] h-px w-[80%] rotate-6 bg-cyan-300" />

      <div className="absolute left-[8%] top-[65%] h-px w-[85%] -rotate-6 bg-cyan-300" />

      <div className="absolute left-1/2 top-[15%] h-[70%] w-px bg-cyan-300" />

    </div>


    {/* CENTER GLOW */}
    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[60px]" />


    <div className="relative z-10">


      {/* ================= NAGPUR HUB ================= */}

      <div className="mx-auto flex flex-col items-center text-center">

        <div className="relative">

          <div className="absolute inset-0 scale-125 rounded-full bg-cyan-400/15 blur-lg" />

          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan-300 bg-cyan-600 text-white shadow-[0_0_20px_rgba(34,211,238,0.30)] md:h-16 md:w-16">

            <MapPin size={24} />

          </div>

        </div>


        <span className="mt-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2 py-0.5 text-[8px] font-black uppercase tracking-[0.16em] text-cyan-300">
          Starting Point
        </span>


        <h3 className="mt-1 text-lg font-black text-white md:text-xl">
          Nagpur
        </h3>


        <p className="text-[9px] text-slate-400">
          Maharashtra • India
        </p>

      </div>


      {/* ================= ROUTE LINE ================= */}

      <div className="mx-auto mt-4 flex max-w-md items-center justify-center gap-2">

        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan-400/40" />

        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">

          <Car size={11} className="text-cyan-400" />

          <span className="text-[8px] font-black uppercase tracking-wider text-slate-300">
            Popular Routes
          </span>

        </div>

        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan-400/40" />

      </div>


      {/* ================= DESTINATIONS ================= */}

      <div className="mx-auto mt-4 grid max-w-5xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">

        {[
          "Wardha",
          "Amravati",
          "Chandrapur",
          "Bhandara",
          "Gondia",
          "Yavatmal",
          "Akola",
          "Pune",
          "Nashik",
          "Aurangabad",
          "Raipur",
        ].map((city, index) => (

          <div
            key={city}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-cyan-400/[0.06]"
          >

            <span className="absolute right-2 top-1 text-[8px] font-black text-white/10 group-hover:text-cyan-300/40">
              {String(index + 1).padStart(2, "0")}
            </span>


            <div className="flex items-center gap-2">

              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-400/10 text-cyan-300">

                <MapPin size={12} />

              </div>


              <div className="min-w-0 pr-3">

                <p className="truncate text-[11px] font-black text-white md:text-xs">
                  {city}
                </p>

                <p className="text-[8px] text-slate-400">
                  Cab Available
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================= FEATURES ================= */}

      <div className="mt-4 border-t border-white/10 pt-3">

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">

          {[
            "Local Rides",
            "Airport Transfer",
            "Outstation",
            "24×7 Support",
          ].map((feature) => (

            <div key={feature} className="flex items-center gap-1">

              <CheckCircle2
                size={11}
                className="text-emerald-400"
              />

              <span className="text-[9px] font-bold text-slate-300">
                {feature}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  </div>


  {/* BOTTOM TEXT */}

  <p className="mt-2.5 text-center text-[10px] leading-relaxed text-slate-500">
    Don't see your destination? We provide taxi services from Nagpur across
    Maharashtra and India.
  </p>

</section>

{/* ================= SEO CONTENT ================= */}

<section className="mt-10 md:mt-14">
  <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">

    {/* ================= ABOUT CONTENT ================= */}
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">

      {/* DECORATION */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-100/60 blur-3xl" />

      <div className="relative">
        <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
          <span className="h-px w-6 bg-cyan-500" />
          About RC Tours & Travels
        </div>

        <h2 className="mt-3 text-2xl font-black leading-tight tracking-tight text-slate-950 md:text-4xl">
          Cab Service in Nagpur for{" "}
          <span className="text-cyan-600">
            Local, Airport & Outstation Travel
          </span>
        </h2>

        <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 md:text-[15px]">
          <p>
            RC Tours & Travels provides reliable cab service in Nagpur for
            local travel, airport pickup and drop, one-way taxi and outstation
            journeys. Our fleet includes Sedan, SUV, Innova, Force Urbania and
            Tempo Traveller options for individuals, families, business
            travelers and group tours.
          </p>

          <p>
            Whether you need a taxi from Nagpur to Pune, Mumbai, Wardha,
            Amravati, Chandrapur, Pench, Tadoba, Raipur or another destination,
            our professional drivers and well-maintained vehicles help make
            your journey comfortable and convenient.
          </p>

          <p>
            Select your preferred vehicle, check your estimated fare and
            continue with a simple booking process. We focus on transparent
            service, comfortable travel and reliable customer support.
          </p>
        </div>

        {/* FEATURES */}
        <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {[
            "Local Rides",
            "Airport Taxi",
            "Outstation",
            "24×7 Support",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
            >
              <CheckCircle2
                size={15}
                className="shrink-0 text-cyan-600"
              />

              <span className="text-[10px] font-black text-slate-700 sm:text-xs">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>


    {/* ================= QUICK FACTS ================= */}
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">

      <div className="rounded-2xl border border-cyan-100 bg-cyan-50 p-4 md:p-5">
        <Car size={23} className="text-cyan-600" />

        <p className="mt-3 text-xl font-black text-slate-950">
          Multiple Vehicles
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          Sedan, SUV, Innova, Urbania and Tempo Traveller options.
        </p>
      </div>

      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 md:p-5">
        <MapPin size={23} className="text-emerald-600" />

        <p className="mt-3 text-xl font-black text-slate-950">
          Nagpur Based
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-600">
          Local, airport and outstation cab services from Nagpur.
        </p>
      </div>

      <div className="col-span-2 rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white md:p-5 lg:col-span-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <ShieldCheck size={21} className="text-cyan-300" />
          </div>

          <div>
            <p className="text-sm font-black">
              Safe & Reliable Travel
            </p>

            <p className="mt-0.5 text-[11px] text-slate-400">
              Comfortable journeys with professional service.
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</section>


{/* ================= FAQ ================= */}

<section className="mt-12 md:mt-16">
  <div className="mx-auto max-w-4xl">

    {/* HEADER */}
    <div className="mb-6 text-center">
      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-600">
        <span className="h-px w-5 bg-cyan-500" />
        Help Center
        <span className="h-px w-5 bg-cyan-500" />
      </div>

      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 md:text-4xl">
        Frequently Asked Questions
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-600 md:text-sm">
        Everything you need to know before booking your cab with RC Tours &
        Travels.
      </p>
    </div>


    {/* FAQ LIST */}
    <div className="space-y-3">

      <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-cyan-300 hover:shadow-md md:p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-xs font-black text-cyan-600">
            01
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 md:text-base">
              Which vehicles are available?
            </h3>

            <p className="mt-1.5 text-xs leading-6 text-slate-600 md:text-sm">
              Our fleet includes Sedan, SUV, Innova Crysta, Toyota Hycross,
              Force Urbania and Tempo Traveller options.
            </p>
          </div>
        </div>
      </div>


      <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-cyan-300 hover:shadow-md md:p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-xs font-black text-cyan-600">
            02
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 md:text-base">
              Do you provide airport pickup and drop?
            </h3>

            <p className="mt-1.5 text-xs leading-6 text-slate-600 md:text-sm">
              Yes. RC Tours & Travels provides airport pickup and drop
              services for Nagpur and nearby locations.
            </p>
          </div>
        </div>
      </div>


      <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-cyan-300 hover:shadow-md md:p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-xs font-black text-cyan-600">
            03
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 md:text-base">
              Can I book an outstation cab?
            </h3>

            <p className="mt-1.5 text-xs leading-6 text-slate-600 md:text-sm">
              Yes. One-way, round-trip and multi-day outstation cab services
              are available from Nagpur.
            </p>
          </div>
        </div>
      </div>


      <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-cyan-300 hover:shadow-md md:p-5">
        <div className="flex gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-xs font-black text-cyan-600">
            04
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950 md:text-base">
              Are Call and WhatsApp booking options available?
            </h3>

            <p className="mt-1.5 text-xs leading-6 text-slate-600 md:text-sm">
              Yes. You can directly call us, send a WhatsApp message or use
              the Book This Vehicle button to continue with your booking.
            </p>
          </div>
        </div>
      </div>

    </div>


    {/* FAQ CONTACT */}
    <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 px-4 py-4 text-center sm:flex-row sm:text-left">
      <div>
        <p className="text-sm font-black text-slate-950">
          Still have questions?
        </p>

        <p className="mt-0.5 text-xs text-slate-600">
          Our team is available to help you with your booking.
        </p>
      </div>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-xs font-black text-white shadow-sm transition hover:bg-green-600"
      >
        <MessageCircle size={16} />
        Ask on WhatsApp
      </a>
    </div>

  </div>
</section>

{/* ================= FINAL CTA ================= */}

<section className="relative mt-12 overflow-hidden rounded-3xl bg-slate-950 shadow-xl md:mt-16">
  
  {/* BACKGROUND DECORATION */}
  <div className="pointer-events-none absolute inset-0">
    <div className="absolute -left-20 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-3xl" />
    <div className="absolute -right-20 top-0 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />

    <div className="absolute inset-0 opacity-[0.05]">
      <div className="absolute left-[15%] top-0 h-full w-px bg-white" />
      <div className="absolute left-[35%] top-0 h-full w-px bg-white" />
      <div className="absolute left-[65%] top-0 h-full w-px bg-white" />
      <div className="absolute left-[85%] top-0 h-full w-px bg-white" />
    </div>
  </div>

  <div className="relative z-10 px-5 py-8 sm:px-8 md:px-12 md:py-12">

    {/* TOP BADGE */}
    <div className="flex justify-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
        <CheckCircle2 size={13} />
        RC Tours & Travels
      </span>
    </div>

    {/* HEADING */}
    <div className="mx-auto mt-3 max-w-2xl text-center">
      <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
        Ready To Start Your{" "}
        <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Journey?
        </span>
      </h2>

      <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-slate-300 md:text-sm">
        Book your preferred cab for local travel, airport transfers or outstation journeys from Nagpur.
      </p>
    </div>

    {/* BUTTONS */}
    <div className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">

      <a
        href="tel:+919172271464"
        className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-black text-slate-950 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 active:scale-[0.98]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 transition-transform group-hover:scale-110">
          <Phone size={14} />
        </span>
        Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-4 text-xs font-black text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600 active:scale-[0.98]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/15 transition-transform group-hover:scale-110">
          <MessageCircle size={14} />
        </span>
        WhatsApp Us
      </a>

    </div>

    {/* TRUST POINTS */}
    <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/10 pt-4">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
        <CheckCircle2 size={13} className="text-cyan-400" />
        Quick Booking
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
        <ShieldCheck size={13} className="text-cyan-400" />
        Trusted Service
      </div>

      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-300">
        <Clock3 size={13} className="text-cyan-400" />
        24×7 Support
      </div>
    </div>

  </div>

</section>

        </div>
      </main>

      {/* ================= FOOTER ================= */}

      <div ref={footerStartRef} className="w-full">
        <Footer />
      </div>

      {/* ================= STICKY BOOKING BAR ================= */}

      {showStickyBar && (
        <div className="fixed inset-x-0 bottom-0 z-[999] border-t border-gray-200 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.10)]">
          
          <div className="flex w-full flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-10">

            {/* TEXT */}
            <div className="text-center sm:text-left">
              <h3 className="text-sm font-black text-gray-950 md:text-base">
                Need a Cab Right Now?
              </h3>

              <p className="mt-0.5 text-xs text-gray-600">
                Call or WhatsApp us for quick booking.
              </p>
            </div>

            {/* BUTTONS */}
            <div className="flex w-full gap-2 sm:w-auto sm:flex-none">
              
              <a
                href="tel:+919172271464"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-black text-white transition hover:bg-cyan-700 active:scale-95 sm:min-w-[150px]"
              >
                <Phone size={17} />
                Call Now
              </a>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-green-500 px-5 text-sm font-black text-white transition hover:bg-green-600 active:scale-95 sm:min-w-[150px]"
              >
                <MessageCircle size={17} />
                WhatsApp
              </a>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default function FleetClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading Fleet...
        </div>
      }
    >
      <FleetContent />
    </Suspense>
  );
}