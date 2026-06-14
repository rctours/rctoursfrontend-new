"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const cars = [
  {
  name: "Swift Dzire",
  image: "/dezire.jpg",
  seats: "4+1 Seats",
  luggage: "2 Bags",
  price: "₹12/km",
  rate: 11,
  category: "Sedan",
},
  {
    name: "Hyundai Aura",
    image: "/aura.jpg",
    seats: "4+1 Seats",
    luggage: "2 Bags",
    price: "₹12/km",
    category: "Sedan",
    rate: 12,
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
    image: "/ertiga.jpg",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹14/km",
    category: "SUV",
    rate: 13,
  },
  {
    name: "Toyota Rumion",
    image: "/rumion.jpg",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹14/km",
    category: "SUV",
    rate: 14,
  },
  {
    name: "Kia Carens",
    image: "/carens.jpg",
    seats: "6+1 Seats",
    luggage: "4 Bags",
    price: "₹16/km",
    category: "SUV",
    rate: 16,
  },
  {
    name: "Innova Crysta",
    image: "/crysta.jpg",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹18/km",
    category: "Premium",
    rate: 18,
  },
  {
    name: "Toyota Hycross",
    image: "/hycross.png",
    seats: "7+1 Seats",
    luggage: "5 Bags",
    price: "₹22/km",
    category: "Premium",
    rate: 22,
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

  if (tripType === "Outstation Trip") {
    return Math.round((distance / 2) * car.rate * 2);
  }

  return Math.round(distance * car.rate * 2);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white pt-24 md:pt-32 px-4 md:px-6 pb-20 md:pb-28">
      <div className="max-w-[1600px] mx-auto">

        <p className="text-cyan-400 text-center uppercase tracking-[3px] md:tracking-[6px] text-xs md:text-base mb-3">
          RC Tours & Travels
        </p>

        <h1 className="text-3xl md:text-6xl font-black text-center mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent leading-tight px-2">
          Cab Fleet in Nagpur | Sedan, SUV, Innova & Tempo Traveller
        </h1>
        <p className="text-center text-cyan-300 text-base md:text-lg font-medium mt-3 md:mt-4 px-2">
        Premium Sedan, SUV, Innova & Tempo Traveller Rentals in Nagpur
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mt-6 md:mt-8 mb-10 md:mb-14">
        <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
          ✓ Verified Drivers
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
        ✓ GPS Tracking
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
        ✓ Sanitized Vehicles
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
        ✓ 24×7 Support
        </span>

  <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm">
    ✓ Transparent Pricing
  </span>
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
                className="group bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-400 hover:-translate-y-3 hover:shadow-cyan-500/40 hover:shadow-2xl hover:scale-[1.02] transition-all duration-700"
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

                  <div className="p-3 md:p-4">

                    <h2 className="text-xl md:text-2xl font-extrabold mb-3 tracking-wide">
                  {car.name}
                  </h2>

                  {car.rate && (
                  <p className="text-cyan-400 text-xl md:text-2xl font-bold mb-3">
                  ₹{calculateFare(car)}
                  </p>
                  )}

                <div className="space-y-2 text-gray-300">
                <p>👥 {car.seats}</p>
                <p>🧳 {car.luggage}</p>

                <p className="text-cyan-400 text-xl font-bold">
                {car.price}
                </p>

                      <div className="flex items-center gap-1 mt-2 text-yellow-400">
                        ⭐⭐⭐⭐⭐
                    <span className="text-gray-400 text-sm ml-2">
                    4.9 Rating
                    </span>
                    </div>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">

                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                    AC
                    </span>

                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                    GPS
                    </span>

                    <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                    Music
                    </span>

                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
                  🟢 Available Today
                </span>

              </div>

                    <div className="grid grid-cols-3 gap-2 md:gap-3 mt-5 md:mt-6">

<a
  href="tel:+919172271464"
  className="flex items-center justify-center text-center h-10 md:h-12 rounded-xl font-bold text-[11px] md:text-sm px-1 bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300"
>
  📞 Call
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
  💬 WhatsApp
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

{/* Why Choose RC Tours Fleet */}

<div className="mt-12 md:mt-20 max-w-7xl mx-auto">

  <h2 className="text-2xl md:text-5xl font-black text-center mb-3 md:mb-4 px-4">
    Premium Features in Every Vehicle
  </h2>

  <p className="text-center text-gray-400 text-sm md:text-base mb-8 md:mb-12 px-4">
    Every cab in our fleet is maintained for safety, comfort and reliability.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

    {/* Well Maintained Vehicles */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/well-maintained-vehicles.jpg"
          alt="Well Maintained Vehicles"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          🚘 Well Maintained Vehicles
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Every vehicle is regularly serviced and inspected before trips.
        </p>
      </div>
    </div>

    {/* Professional Drivers */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/professional-driver.jpg"
          alt="Professional Drivers"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          👨‍✈️ Professional Drivers
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Experienced and verified drivers for safe travel.
        </p>
      </div>
    </div>

    {/* GPS Enabled */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/gps-enabled-cab.jpg"
          alt="GPS Enabled"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          📍 GPS Enabled
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Real-time route tracking and smooth navigation.
        </p>
      </div>
    </div>

    {/* AC Comfort */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/ac-comfort-cab.jpg"
          alt="AC Comfort"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          ❄️ AC Comfort
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Comfortable air-conditioned rides for all journeys.
        </p>
      </div>
    </div>

    {/* On Time Pickup */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/on-time-pickup.jpg"
          alt="On Time Pickup"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          ⏰ On Time Pickup
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Punctual service for airport and outstation trips.
        </p>
      </div>
    </div>

    {/* 24x7 Support */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-40 md:h-52">
        <Image
          src="/customer-support-24x7.jpg"
          alt="24x7 Support"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
          📞 24×7 Support
        </h3>

        <p className="text-gray-400 text-sm md:text-base">
          Assistance available before, during and after your trip.
        </p>
      </div>
    </div>

  </div>

</div>

{/* Trust Section */}

<div className="mt-12 md:mt-24">

  <h2 className="text-2xl md:text-5xl font-black text-center mb-6 md:mb-12 px-4 leading-tight">
    Trusted By Hundreds of Travelers
  </h2>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-4xl md:text-6xl mb-2 md:mb-4">🚖</div>

      <h3 className="text-2xl md:text-5xl font-black text-cyan-400">
        1000+
      </h3>

      <p className="text-gray-400 mt-2 md:mt-3 text-xs md:text-base leading-5">
        Trips Successfully Completed
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-4xl md:text-6xl mb-2 md:mb-4">😊</div>

      <h3 className="text-2xl md:text-5xl font-black text-cyan-400">
        500+
      </h3>

      <p className="text-gray-400 mt-2 md:mt-3 text-xs md:text-base leading-5">
        Happy Customers
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-4xl md:text-6xl mb-2 md:mb-4">⭐</div>

      <h3 className="text-2xl md:text-5xl font-black text-cyan-400">
        4.9★
      </h3>

      <p className="text-gray-400 mt-2 md:mt-3 text-xs md:text-base leading-5">
        Average Customer Rating
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-4 md:p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-4xl md:text-6xl mb-2 md:mb-4">📞</div>

      <h3 className="text-2xl md:text-5xl font-black text-cyan-400">
        24×7
      </h3>

      <p className="text-gray-400 mt-2 md:mt-3 text-xs md:text-base leading-5">
        Booking & Customer Support
      </p>
    </div>

  </div>

</div>

{/* How To Book Your Cab */}

<div className="mt-12 md:mt-24">

  <h2 className="text-2xl md:text-5xl font-black text-center mb-3 md:mb-4 px-4 leading-tight">
    How To Book Your Cab
  </h2>

  <p className="text-center text-gray-400 mb-8 md:mb-14 text-sm md:text-base px-4">
    Book your ride in just a few simple steps
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

    <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-4xl md:text-5xl mb-3 md:mb-4">🚘</div>

      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-3 md:mb-4 text-sm md:text-base">
        1
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
        Choose Vehicle
      </h3>

      <p className="text-gray-400 text-sm md:text-base leading-6">
        Select Sedan, SUV, Innova or Tempo Traveller according to your needs.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-4xl md:text-5xl mb-3 md:mb-4">🧮</div>

      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-3 md:mb-4 text-sm md:text-base">
        2
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
        Get Fare Estimate
      </h3>

      <p className="text-gray-400 text-sm md:text-base leading-6">
        Use our fare calculator or contact us for an instant quote.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-4xl md:text-5xl mb-3 md:mb-4">✅</div>

      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-3 md:mb-4 text-sm md:text-base">
        3
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
        Confirm Booking
      </h3>

      <p className="text-gray-400 text-sm md:text-base leading-6">
        Confirm your trip through call or WhatsApp in minutes.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎉</div>

      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-3 md:mb-4 text-sm md:text-base">
        4
      </div>

      <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">
        Enjoy Your Journey
      </h3>

      <p className="text-gray-400 text-sm md:text-base leading-6">
        Sit back and enjoy a safe, comfortable and hassle-free ride.
      </p>
    </div>

  </div>

</div>

{/* Service Locations */}

<div className="mt-12 md:mt-24">

  <h2 className="text-2xl md:text-5xl font-black text-center mb-6 md:mb-12 px-4 leading-tight">
    We Serve Across Maharashtra
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">

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
        className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-5 text-center hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300"
      >
        <p className="font-semibold text-sm md:text-base">
          📍 Cab Service in {city}
        </p>
      </div>
    ))}
  </div>

</div>

{/* SEO Content Section */}

<section className="mt-12 md:mt-24 max-w-5xl mx-auto text-gray-300 leading-7 md:leading-8 px-4">

  <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 text-center leading-tight">
    Cab Service in Nagpur for Local & Outstation Travel
  </h2>

  <p className="text-center mt-4 md:mt-6 text-sm md:text-base">
    We provide taxi services from Nagpur to Pune, Mumbai,
    Nashik, Aurangabad, Raipur, Amravati, Wardha,
    Chandrapur and major destinations across Maharashtra
    and Central India. One-way cabs, round trips,
    airport transfers and corporate travel available 24×7.
  </p>

  <p className="text-center mt-4 text-sm md:text-base">
    RC Tours & Travels provides airport transfers, local cab services,
    outstation taxi bookings, corporate travel solutions and tempo traveller
    rentals in Nagpur. Our fleet includes Swift Dzire, Hyundai Aura,
    Toyota Glanza, Ertiga, Innova Crysta, Toyota Hycross, Force Urbania
    and Tempo Travellers for family trips, corporate travel and group tours.
  </p>

</section>

{/* FAQ Section */}

<div className="mt-12 md:mt-24">

  <h2 className="text-2xl md:text-5xl font-black text-center mb-6 md:mb-12 px-4 leading-tight">
    Frequently Asked Questions
  </h2>

  <div className="space-y-3 md:space-y-4 max-w-4xl mx-auto px-4">

    <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-lg md:text-xl font-bold mb-2">
        Is driver allowance included in fare?
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-6">
        Driver allowance may apply for long-distance and multi-day trips.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-lg md:text-xl font-bold mb-2">
        Are toll and parking charges included?
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-6">
        Toll tax, parking charges and state tax are charged separately when applicable.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-lg md:text-xl font-bold mb-2">
        Do you provide airport pickup and drop?
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-6">
        Yes, we provide 24×7 airport transfers with timely pickup and drop service.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-lg md:text-xl font-bold mb-2">
        Can I book for outstation trips?
      </h3>
      <p className="text-gray-400 text-sm md:text-base leading-6">
        Yes, we offer one-way, round-trip and multi-day outstation bookings across India.
      </p>
    </div>

  </div>

</div>


        {/* CTA Section Start */}

<div className="mt-10 md:mt-16 text-center bg-white/5 border border-cyan-500/20 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl shadow-cyan-500/10">

  <h2 className="text-2xl md:text-5xl font-black mb-3 md:mb-4 px-2 leading-tight bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
    Book Your Ride Today
  </h2>

  <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8 leading-6">
    Choose from Sedan, SUV, Innova Crysta or Tempo Traveller and get instant confirmation.
  </p>

  <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">

    <a
      href="tel:+919172271464"
      className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:scale-105 transition-all duration-300"
    >
      📞 Call Now
    </a>

    <a
      href="https://wa.me/919172271464"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-cyan-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
    >
      💬 WhatsApp Now
    </a>

  </div>

</div>

{/* CTA Section End */}

</div>

{/* Sticky Booking Bar */}

<div className="fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/20 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">

  <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-3">

    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 md:gap-3">

      <div className="text-center sm:text-left">

        <p className="text-white font-bold text-base md:text-lg">
          Need a Cab Right Now?
        </p>

        <p className="text-gray-400 text-xs md:text-sm">
          Instant Booking Available 24×7
        </p>

      </div>

      <div className="grid grid-cols-2 gap-2 md:gap-3 w-full sm:w-auto">

        <a
          href="tel:+919172271464"
          className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all"
        >
          📞 Call Now
        </a>

        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-xl md:rounded-2xl font-bold text-sm md:text-base transition-all"
        >
          💬 WhatsApp
        </a>

      </div>

    </div>

  </div>

</div>

{/* Footer */}

<footer className="border-t border-white/10 py-3 md:py-6 relative overflow-hidden">

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/footer-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-3 md:px-10">

    <div className="grid md:grid-cols-4 gap-4 md:gap-12 lg:gap-16">

      {/* Company */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          RC Tours & Travels
        </h3>

        <p className="text-gray-200 leading-6 md:leading-8">
          Premium Taxi Service In Nagpur For Airport Transfers,
          Local Rentals, Outstation Trips And Tour Packages.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Quick Links
        </h3>

        <ul className="space-y-1 md:space-y-2 text-gray-200">
          <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
          <li><a href="/about" className="hover:text-cyan-400 transition">About</a></li>
          <li><a href="/fleet" className="hover:text-cyan-400 transition">Fleet</a></li>
          <li><a href="/tour-packages" className="hover:text-cyan-400 transition">Tour Packages</a></li>
          <li><a href="/contact" className="hover:text-cyan-400 transition">Contact</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Services
        </h3>

        <ul className="space-y-1 md:space-y-2 text-gray-200">
          <li>Airport Transfer</li>
          <li>Local Rental</li>
          <li>Outstation Taxi</li>
          <li>Corporate Cab</li>
          <li>Tempo Traveller</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-2xl font-bold mb-3 md:mb-5 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Contact Us
        </h3>

        <ul className="space-y-1 md:space-y-3 text-gray-200">
          <li>📞 +91 9172271464</li>
          <li>📍 Nagpur, Maharashtra</li>
          <li>✉️ info@rctoursandtravels.in</li>
          <li>🕒 24×7 Available</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white/10 mt-5 md:mt-12 pt-4 md:pt-8 text-center text-gray-300">

      <p>
        © 2026 RC Tours & Travels. All Rights Reserved.
      </p>

      <p className="mt-1 text-sm text-gray-400">
        Designed By Rupesh Chavhan
      </p>

    </div>

  </div>

</footer>


      </div>
      
    </div>
  );
}
export default function FleetPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FleetContent />
    </Suspense>
  );
}