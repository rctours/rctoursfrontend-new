"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Suspense } from "react";
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
} from "lucide-react";

const cars = [
  {
  name: "Swift Dzire",
  image: "/swift-dzire.jpeg",
  seats: "4+1 Seats",
  luggage: "2 Bags",
  price: "₹13/km",
  rate: 13,
  category: "Sedan",
},
  {
    name: "Hyundai Aura",
    image: "/aura.jpg",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹13/km",
    category: "Sedan",
    rate: 13,
  },
  {
    name: "Toyota Glanza",
    image: "/glanza.jpg",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹13/km",
    category: "Sedan",
    rate: 13,
  },
  {
    name: "Maruti Ertiga",
    image: "/ertiga.jpeg",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹15/km",
    category: "SUV",
    rate: 15,
  },
  {
    name: "Toyota Rumion",
    image: "/rumion.png",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹15/km",
    category: "SUV",
    rate: 15,
  },
  {
    name: "Kia Carens",
    image: "/carens.jpg",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹17/km",
    category: "SUV",
    rate: 17,
  },
  {
    name: "Innova Crysta",
    image: "/innova-crysta.jpeg",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹19/km",
    category: "Premium",
    rate: 19,
  },
  {
    name: "Toyota Hycross",
    image: "/hycross.png",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹25/km",
    category: "Premium",
    rate: 25,
  },
  {
    name: "Traveller 13 Seater",
    image: "/traveller13.jpg",
    seats: "13 Seats",
    luggage: "10 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 25,
  },
  {
    name: "Traveller 17 Seater",
    image: "/traveller17.jpg",
    seats: "17 Seats",
    luggage: "12 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 28,
  },
  {
    name: "Traveller 26 Seater",
    image: "/traveller26.jpg",
    seats: "26 Seats",
    luggage: "20 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 36,
  },
  {
    name: "Force Urbania",
    image: "/urbania.jpg",
    seats: "17 Seats",
    luggage: "12 Bags",
    price: "Contact Us",
    category: "Traveller",
    rate: 38,
  },
];

function FleetContent() {

  const searchParams = useSearchParams();

  const [showStickyBar, setShowStickyBar] = useState(true);
  const ctaRef = useRef(null);

  const tripType = searchParams.get("tripType") || "";
const pickup = searchParams.get("pickup") || "";
const drop = searchParams.get("drop") || "";
const pickupDate = searchParams.get("pickupDate") || "";
const returnDate = searchParams.get("returnDate") || "";
const pickupTime = searchParams.get("pickupTime") || "";

const distance = Number(
  searchParams.get("distance") || 0
);

const toll = Number(
  searchParams.get("toll") || 0
);

const fare = Number(
  searchParams.get("fare") || 0
);

const calculateFare = (car) => {
  if (!car.rate) return 0;

  // Airport
  if (tripType === "Airport Pick-Up & Drop") {
    return Math.round(distance * car.rate * 2);
  }

  // Local Rental
  if (tripType === "Local Rental") {
    return Math.round(distance * car.rate);
  }

  // One Way
  if (tripType === "One Way Trip") {
    return Math.round(distance * car.rate * 2);
  }

  // Outstation
  if (tripType === "Outstation Trip") {
    return Math.round(distance * car.rate * 2);
  }

  return Math.round(distance * car.rate);
};

  const [currentIndex, setCurrentIndex] = useState(0);

  const [category, setCategory] = useState("All");

  const filteredCars = cars.filter(
  (car) =>
    category === "All" || car.category === category
  );

  const handleBookNow = (carName) => {
  if (
    !tripType ||
    !pickup ||
    !drop ||
    !pickupDate ||
    !distance ||
    !fare
  ) {
    alert(
      "Please calculate fare first before booking a vehicle."
    );
    return;
  }

  window.location.href =
    `/booking-details?vehicle=${encodeURIComponent(carName)}` +
    `&tripType=${encodeURIComponent(tripType)}` +
    `&pickup=${encodeURIComponent(pickup)}` +
    `&drop=${encodeURIComponent(drop)}` +
    `&pickupDate=${encodeURIComponent(pickupDate)}` +
    `&returnDate=${encodeURIComponent(returnDate)}` +
    `&pickupTime=${encodeURIComponent(pickupTime)}` +
    `&distance=${encodeURIComponent(distance)}` +
    `&toll=${encodeURIComponent(toll)}` +
    `&fare=${encodeURIComponent(
    calculateFare(car)
    )}`;
    };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev >= cars.length - 4 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      setShowStickyBar(!entry.isIntersecting);
    },
    {
      threshold: 0.1,
    }
  );

  if (ctaRef.current) {
  observer.observe(ctaRef.current);
  }

  return () => observer.disconnect();
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 text-gray-900 pt-20 md:pt-28 px-4 md:px-6 pb-10">
      <div className="max-w-[1600px] mx-auto">

        <p className="text-cyan-400 text-center uppercase tracking-[3px] md:tracking-[6px] text-xs md:text-base mb-3">
          RC Tours & Travels
        </p>

        <h1 className="text-3xl md:text-6xl font-black text-center mb-4 md:mb-6 text-gray-900 leading-tight px-2">
          Cab Fleet in Nagpur | Sedan, SUV, Innova & Tempo Traveller
        </h1>
        <p className="text-center text-gray-600 text-base md:text-lg font-medium mt-3 md:mt-4 px-2">
        Premium Sedan, SUV, Innova & Tempo Traveller Rentals in Nagpur
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8 md:mt-10 mb-12">

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
    <ShieldCheck size={28} className="text-cyan-600 mb-3" />
    <span className="text-sm font-semibold text-gray-800 text-center">
      Verified Drivers
    </span>
  </div>

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
    <Car size={28} className="text-cyan-600 mb-3" />
    <span className="text-sm font-semibold text-gray-800 text-center">
      GPS Tracking
    </span>
  </div>

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
    <ShieldCheck size={28} className="text-cyan-600 mb-3" />
    <span className="text-sm font-semibold text-gray-800 text-center">
      Sanitized Vehicles
    </span>
  </div>

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
    <Phone size={28} className="text-cyan-600 mb-3" />
    <span className="text-sm font-semibold text-gray-800 text-center">
      24×7 Support
    </span>
  </div>

  <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col items-center">
    <Star size={28} className="text-yellow-500 fill-yellow-500 mb-3" />
    <span className="text-sm font-semibold text-gray-800 text-center">
      Transparent Pricing
    </span>
  </div>

</div>

        <div className="flex justify-center gap-2 md:gap-3 mb-6 md:mb-10 flex-wrap px-2">

  <button
    onClick={() => setCategory("All")}
    className={`px-4 md:px-5 py-2 text-sm md:text-base rounded-xl ${
    category === "All"
    ? "bg-cyan-500 text-black"
    : "bg-white/10 hover:bg-white/20 transition-all duration-300"
  }`}
  >
    All
  </button>

  <button
    onClick={() => setCategory("Sedan")}
    className={`px-4 md:px-5 py-2 text-sm md:text-base rounded-xl ${
      category === "Sedan"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Sedan
  </button>

  <button
    onClick={() => setCategory("SUV")}
    className={`px-4 md:px-5 py-2 text-sm md:text-base rounded-xl ${
      category === "SUV"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    SUV
  </button>

  <button
    onClick={() => setCategory("Premium")}
    className={`px-4 md:px-5 py-2 text-sm md:text-base rounded-xl ${
      category === "Premium"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Premium
  </button>

  <button
    onClick={() => setCategory("Traveller")}
    className={`px-4 md:px-5 py-2 text-sm md:text-base rounded-xl ${
      category === "Traveller"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Traveller
  </button>

</div>

        <div className="relative">

            <div className="flex justify-center gap-2 mb-5 md:mb-8">
  {Array.from({
  length: Math.max(filteredCars.length - 3, 1),
  }).map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentIndex(index)}
      className={`h-2 rounded-full transition-all duration-300 ${
        currentIndex === index
          ? "w-8 bg-cyan-500"
          : "w-2 bg-gray-600"
      }`}
    />
  ))}
</div>

          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev === 0 ? cars.length - 4 : prev - 1
              )
            }
            className="absolute left-1 md:left-0 top-44 md:top-60 -translate-y-1/2 z-10 bg-cyan-500 hover:bg-cyan-400 text-black w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-lg font-bold shadow-xl"
          >
            ←
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev >= cars.length - 4 ? 0 : prev + 1
              )
            }
            className="absolute right-1 md:right-0 top-44 md:top-60 -translate-y-1/2 z-10 bg-cyan-500 hover:bg-cyan-400 text-black w-8 h-8 md:w-10 md:h-10 rounded-full text-sm md:text-lg font-bold shadow-xl"
          >
            →
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">

            {cars
            .filter(
            (car) =>
            category === "All" || car.category === category
            )
            .slice(currentIndex, currentIndex + 4)
            .map((car, index) => (

            <div
            
            key={index}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-3 hover:border-cyan-500 transition-all duration-500"  
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">

                    <Image
                  src={car.image}
                  alt={`${car.name} Cab Service in Nagpur`}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition duration-700"
                  />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    <div className="absolute top-3 left-3">

                      <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      {car.category}
                      </span>
                    </div>

                  </div>

                  <div className="p-6">

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-2 tracking-tight">
                  {car.name}
                  </h2>

                  {car.rate && (
                  <p className="text-3xl font-extrabold text-cyan-600 mb-4">
                  ₹{calculateFare(car)}
                  </p>
                  )}

                <div className="flex flex-wrap gap-2 mt-4">
                <div className="flex items-center gap-2 text-gray-700">
                <Users size={18} className="text-cyan-600" />
                <span>{car.seats}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                <Briefcase size={18} className="text-cyan-600" />
                <span>{car.luggage}</span>
                </div>

                <p className="text-cyan-400 text-xl font-bold">
                {car.price}
                </p>

                <div className="flex items-center gap-2 mt-3">

                <Star
                size={18}
                className="text-yellow-500 fill-yellow-500"
                />

                <span className="font-semibold text-gray-800">
                4.9
                </span>

                <span className="text-gray-500 text-sm">
                Google Rating
                </span>

                </div>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    AC
                    </span>

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    GPS
                    </span>

                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                    Music
                    </span>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                  <div className="flex items-center gap-2">
                  <ShieldCheck
                  size={16}
                  className="text-green-600"
                  />
                  <span>Available Today</span>
                  </div>
                </span>

              </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-5 md:mt-6">

<a
  href="tel:+919172271464"
  className="flex items-center justify-center text-center h-10 md:h-12 rounded-xl font-bold text-[11px] md:text-sm px-1 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300"
>
  <div className="flex items-center gap-2">
  <Phone size={16} />
  <span>Call</span>
</div>
</a>

<a
  href={`https://wa.me/919172271464?text=${encodeURIComponent(
    `Hello RC Tours & Travels,

Vehicle: ${car.name}
Pickup: ${pickup}
Drop: ${drop}
Trip Type: ${tripType}
Journey Date: ${pickupDate}

Please send best fare.`
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center text-center h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
>
  <div className="flex items-center gap-2">
  <MessageCircle size={16} />
  <span>WhatsApp</span>
</div>
</a>

<a
  href={
    !pickup ||
    !drop ||
    !pickupDate ||
    !tripType ||
    distance <= 0
      ? "#"
      : `/booking-details?vehicle=${encodeURIComponent(
          car.name
        )}&tripType=${encodeURIComponent(
          tripType
        )}&pickup=${encodeURIComponent(
          pickup
        )}&drop=${encodeURIComponent(
          drop
        )}&pickupDate=${encodeURIComponent(
          pickupDate
        )}&returnDate=${encodeURIComponent(
          returnDate
        )}&pickupTime=${encodeURIComponent(
          pickupTime
        )}&distance=${encodeURIComponent(
          distance || ""
        )}&toll=${encodeURIComponent(
          toll || ""
        )}&fare=${encodeURIComponent(
        calculateFare(car)
        )}`
  }
  onClick={(e) => {
    if (
      !pickup ||
      !drop ||
      !pickupDate ||
      !tripType ||
      distance <= 0
    ) {
      e.preventDefault();

      alert(
        "Please fill Pickup, Drop, Trip Type and Journey Date first."
      );

      window.location.href = "/book-cab";
    }
  }}
  className="flex items-center justify-center text-center h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-400 to-cyan-600 text-black shadow-lg shadow-cyan-500/30 hover:scale-105 transition-all duration-300"
>
  Book Now
</a>

</div>

                  </div>
                </div>
              ))}

          </div>        
</div>
{/* Why Choose RC Tours Fleet */}

<div className="mt-16 md:mt-24 max-w-7xl mx-auto">

  <div className="text-center mb-12">
    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
      Why Choose RC Tours & Travels
    </span>

    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-5">
      Premium Features In Every Ride
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-base md:text-lg">
      Every vehicle is carefully maintained to provide a safe, comfortable,
      and premium travel experience for every journey.
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

    {/* Well Maintained */}
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/well-maintained-vehicles.jpg"
          alt="Well Maintained Vehicles"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <Car size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Well Maintained Vehicles
        </h3>

        <p className="text-gray-600 leading-7">
          Every vehicle is regularly serviced, cleaned and inspected before every trip.
        </p>

      </div>

    </div>

    {/* Professional Drivers */}

    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/professional-driver.jpg"
          alt="Professional Drivers"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <ShieldCheck size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          Professional Drivers
        </h3>

        <p className="text-gray-600 leading-7">
          Verified, experienced and courteous chauffeurs for every journey.
        </p>

      </div>

    </div>

    {/* GPS */}

    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/gps-enabled-cab.jpg"
          alt="GPS Enabled"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <MapPin size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          GPS Enabled
        </h3>

        <p className="text-gray-600 leading-7">
          Live navigation ensures faster routes and accurate travel tracking.
        </p>

      </div>

    </div>

    {/* AC */}

    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/ac-comfort-cab.jpg"
          alt="AC Comfort"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <Snowflake size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          AC Comfort
        </h3>

        <p className="text-gray-600 leading-7">
          Clean and comfortable air-conditioned cabins for a relaxing ride.
        </p>

      </div>

    </div>

    {/* Pickup */}

    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/on-time-pickup.jpg"
          alt="On Time Pickup"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <Clock3 size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          On-Time Pickup
        </h3>

        <p className="text-gray-600 leading-7">
          Timely pickups for airport transfers, local rentals and outstation trips.
        </p>

      </div>

    </div>

    {/* Support */}

    <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

      <div className="relative h-56">
        <Image
          src="/customer-support-24x7.jpg"
          alt="24x7 Support"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">

        <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
          <Headset size={28} className="text-cyan-600" />
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          24×7 Customer Support
        </h3>

        <p className="text-gray-600 leading-7">
          Our support team is always available before, during and after your journey.
        </p>

      </div>

    </div>

  </div>

</div>

{/* Trust Section */}

<div className="mt-16 md:mt-24">

  <div className="text-center mb-12">
    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
      Why People Trust RC Tours & Travels
    </span>

    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-5">
      Trusted By Thousands Of Travelers
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Reliable taxi services with professional drivers, premium vehicles and
      excellent customer satisfaction.
    </p>
  </div>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
        <Car size={32} className="text-cyan-600" />
      </div>

      <h3 className="text-4xl font-black text-cyan-600">
        10K+
      </h3>

      <p className="text-gray-600 mt-3">
        Trips Completed
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
        <Users size={32} className="text-cyan-600" />
      </div>

      <h3 className="text-4xl font-black text-cyan-600">
        10K+
      </h3>

      <p className="text-gray-600 mt-3">
        Happy Customers
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
        <Star
          size={32}
          className="text-yellow-500 fill-yellow-500"
        />
      </div>

      <h3 className="text-4xl font-black text-cyan-600">
        4.9★
      </h3>

      <p className="text-gray-600 mt-3">
        Google Rating
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-8 text-center">

      <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-100 flex items-center justify-center mb-5">
        <Headset size={32} className="text-cyan-600" />
      </div>

      <h3 className="text-4xl font-black text-cyan-600">
        24×7
      </h3>

      <p className="text-gray-600 mt-3">
        Customer Support
      </p>

    </div>

  </div>

</div>

{/* How To Book */}

<div className="mt-20 md:mt-28">

  <div className="text-center mb-12">

    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
      Booking Process
    </span>

    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-5">
      Book Your Cab In 4 Easy Steps
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Booking with RC Tours & Travels is quick, easy and completely hassle-free.
    </p>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

      <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-5">
        <Search size={30} className="text-cyan-600" />
      </div>

      <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mx-auto mb-5">
        1
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Choose Vehicle
      </h3>

      <p className="text-gray-600">
        Select your preferred cab according to your travel needs.
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

      <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-5">
        <Calculator size={30} className="text-cyan-600" />
      </div>

      <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mx-auto mb-5">
        2
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Get Fare
      </h3>

      <p className="text-gray-600">
        Receive an instant fare estimate online or by phone.
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

      <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-5">
        <BadgeCheck size={30} className="text-cyan-600" />
      </div>

      <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mx-auto mb-5">
        3
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Confirm Booking
      </h3>

      <p className="text-gray-600">
        Confirm your trip through WhatsApp or phone within minutes.
      </p>

    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 text-center hover:-translate-y-2 hover:shadow-2xl transition">

      <div className="w-16 h-16 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-5">
        <PartyPopper size={30} className="text-cyan-600" />
      </div>

      <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold mx-auto mb-5">
        4
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Enjoy Your Journey
      </h3>

      <p className="text-gray-600">
        Relax and travel safely with our premium cab service.
      </p>

    </div>

  </div>

</div>

{/* Service Locations */}

<div className="mt-16 md:mt-24">

  <div className="text-center mb-12">

    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
      Service Locations
    </span>

    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-5">
      We Serve Across Maharashtra & Central India
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Reliable taxi services for local, airport and outstation travel from
      Nagpur to major cities across Maharashtra and nearby states.
    </p>

  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

    {[
      "Nagpur",
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
    ].map((city) => (

      <div
        key={city}
        className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-cyan-500 transition-all duration-300"
      >

        <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center mx-auto mb-4">
          <MapPin size={24} className="text-cyan-600" />
        </div>

        <h3 className="font-bold text-gray-900">
          {city}
        </h3>

        <p className="text-sm text-gray-500 mt-2">
          Cab Service Available
        </p>

      </div>

    ))}

  </div>

</div>

{/* SEO Content Section */}

<section className="mt-20 md:mt-28 max-w-6xl mx-auto px-4">

  <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-12">

    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
      About Our Taxi Service
    </span>

    <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-6">
      Cab Service in Nagpur for Local, Airport & Outstation Travel
    </h2>

    <p className="text-gray-600 leading-8 mb-5">
      RC Tours & Travels offers dependable taxi services from Nagpur to Pune,
      Mumbai, Nashik, Aurangabad, Raipur, Wardha, Amravati, Chandrapur and
      many other destinations across Maharashtra and Central India. We provide
      one-way cabs, round trips, airport transfers and corporate travel with
      professional drivers and well-maintained vehicles.
    </p>

    <p className="text-gray-600 leading-8">
      Our fleet includes Swift Dzire, Hyundai Aura, Toyota Glanza, Ertiga,
      Toyota Rumion, Innova Crysta, Toyota Hycross, Force Urbania and Tempo
      Travellers for families, business travel, group tours and weekend trips.
      Whether you need a local taxi or a long-distance cab, RC Tours & Travels
      delivers safe, comfortable and affordable transportation 24×7.
    </p>

  </div>

</section>

{/* FAQ Section */}

<div className="mt-20 md:mt-28">

  <div className="text-center mb-12">

    <span className="inline-block bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">
      Frequently Asked Questions
    </span>

    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mt-5">
      Everything You Need To Know
    </h2>

    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
      Find answers to the most common questions about our taxi services.
    </p>

  </div>

  <div className="space-y-5 max-w-5xl mx-auto">

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Is driver allowance included in fare?
      </h3>

      <p className="text-gray-600 leading-7">
        Driver allowance may apply for long-distance and multi-day journeys depending on the package.
      </p>
    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Are toll and parking charges included?
      </h3>

      <p className="text-gray-600 leading-7">
        Toll tax, parking charges and state taxes are charged separately whenever applicable.
      </p>
    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Do you provide airport pickup & drop?
      </h3>

      <p className="text-gray-600 leading-7">
        Yes. We provide 24×7 airport pickup and drop services from Nagpur Airport.
      </p>
    </div>

    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Can I book an outstation cab?
      </h3>

      <p className="text-gray-600 leading-7">
        Yes. We provide one-way, round-trip and multi-day outstation taxi services across India.
      </p>
    </div>

  </div>

</div>


{/* CTA Section */}

<div
  ref={ctaRef}
  className="mt-20 md:mt-28 overflow-hidden rounded-[32px] bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-700 shadow-2xl"
>
  <div className="px-8 md:px-14 py-14 text-center">

    <span className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white">
      RC Tours & Travels
    </span>

    <h2 className="mt-6 text-3xl md:text-5xl font-black text-white">
      Book Your Ride Today
    </h2>

    <p className="mx-auto mt-5 max-w-3xl text-base md:text-lg leading-8 text-cyan-100">
      Choose from Sedan, SUV, Innova Crysta, Urbania or Tempo Traveller and
      enjoy safe, comfortable and affordable travel with instant booking.
    </p>

    <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">

      <a
        href="tel:+919172271464"
        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-cyan-700 transition hover:scale-105"
      >
        <Phone size={20} />
        Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-3 rounded-2xl bg-green-500 px-8 py-4 font-bold text-white transition hover:scale-105 hover:bg-green-600"
      >
        <MessageCircle size={20} />
        WhatsApp Now
      </a>

    </div>

  </div>
</div>

{/* Sticky Booking Bar */}

{showStickyBar && (
  <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-cyan-200 bg-white/95 backdrop-blur-xl shadow-2xl">

    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row">

      <div>

        <h3 className="text-lg font-bold text-gray-900">
          Need a Cab Right Now?
        </h3>

        <p className="text-sm text-gray-600">
          Instant Booking Available 24×7
        </p>

      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

        <a
          href="tel:+919172271464"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white transition hover:bg-cyan-700"
        >
          <Phone size={18} />
          Call Now
        </a>

        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-600"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>

      </div>

    </div>

  </div>
)}

<div className="mt-12 md:mt-20">
  <Footer />
</div>


      </div>
      
    </div>
  );
}
export default function FleetClient() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FleetContent />
    </Suspense>
  );
}