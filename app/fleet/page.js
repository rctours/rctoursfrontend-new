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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white pt-32 px-6 pb-28">
      <div className="max-w-[1600px] mx-auto">

        <p className="text-cyan-400 text-center uppercase tracking-[6px] mb-3">
          RC Tours & Travels
        </p>

        <h1 className="text-4xl md:text-6xl font-black text-center mb-6 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
          Cab Fleet in Nagpur | Sedan, SUV, Innova & Tempo Traveller
        </h1>
        <p className="text-center text-cyan-300 text-lg font-medium mt-4">
        Premium Sedan, SUV, Innova & Tempo Traveller Rentals in Nagpur
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8 mb-14">
        <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm">
          ✓ Verified Drivers
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm">
        ✓ GPS Tracking
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm">
        ✓ Sanitized Vehicles
        </span>

        <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm">
        ✓ 24×7 Support
        </span>

  <span className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-sm">
    ✓ Transparent Pricing
  </span>
</div>

        <div className="flex justify-center gap-3 mb-10 flex-wrap">

  <button
    onClick={() => setCategory("All")}
    className={`px-5 py-2 rounded-xl ${
    category === "All"
    ? "bg-cyan-500 text-black"
    : "bg-white/10 hover:bg-white/20 transition-all duration-300"
  }`}
  >
    All
  </button>

  <button
    onClick={() => setCategory("Sedan")}
    className={`px-5 py-2 rounded-xl ${
      category === "Sedan"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Sedan
  </button>

  <button
    onClick={() => setCategory("SUV")}
    className={`px-5 py-2 rounded-xl ${
      category === "SUV"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    SUV
  </button>

  <button
    onClick={() => setCategory("Premium")}
    className={`px-5 py-2 rounded-xl ${
      category === "Premium"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Premium
  </button>

  <button
    onClick={() => setCategory("Traveller")}
    className={`px-5 py-2 rounded-xl ${
      category === "Traveller"
        ? "bg-cyan-500 text-black"
        : "bg-white/10"
    }`}
  >
    Traveller
  </button>

</div>

        <div className="relative">

            <div className="flex justify-center gap-2 mb-8">
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
            className="absolute left-0 top-60 -translate-y-1/2 z-10 bg-cyan-500 hover:bg-cyan-400 text-black w-10 h-10 rounded-full text-lg font-bold shadow-xl"
          >
            ←
          </button>

          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                prev >= cars.length - 4 ? 0 : prev + 1
              )
            }
            className="absolute right-0 top-60 -translate-y-1/2 z-10 bg-cyan-500 hover:bg-cyan-400 text-black w-10 h-10 rounded-full text-lg font-bold shadow-xl"
          >
            →
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

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
                  <div className="relative h-56 overflow-hidden">

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

                  <div className="p-4">

                    <h2 className="text-2xl font-extrabold mb-3 tracking-wide">
                  {car.name}
                  </h2>

                  {car.rate && (
                  <p className="text-cyan-400 text-2xl font-bold mb-3">
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

                    <div className="grid grid-cols-3 gap-3 mt-6">

<a
  href="tel:+919172271464"
  className="flex items-center justify-center text-center h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:scale-105 transition-all duration-300"
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

<div className="mt-20 max-w-7xl mx-auto">

  <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
  Premium Features in Every Vehicle
</h2>

<p className="text-center text-gray-400 mb-12">
  Every cab in our fleet is maintained for safety, comfort and reliability.
</p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {/* Well Maintained Vehicles */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/well-maintained-vehicles.jpg"
          alt="Well Maintained Vehicles"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

  <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          🚘 Well Maintained Vehicles
        </h3>

        <p className="text-gray-400">
          Every vehicle is regularly serviced and inspected before trips.
        </p>
      </div>
    </div>

    {/* Professional Drivers */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/professional-driver.jpg"
          alt="Professional Drivers"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          👨‍✈️ Professional Drivers
        </h3>

        <p className="text-gray-400">
          Experienced and verified drivers for safe travel.
        </p>
      </div>
    </div>

    {/* GPS Enabled */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/gps-enabled-cab.jpg"
          alt="GPS Enabled"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          📍 GPS Enabled
        </h3>

        <p className="text-gray-400">
          Real-time route tracking and smooth navigation.
        </p>
      </div>
    </div>

    {/* AC Comfort */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/ac-comfort-cab.jpg"
          alt="AC Comfort"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          ❄️ AC Comfort
        </h3>

        <p className="text-gray-400">
          Comfortable air-conditioned rides for all journeys.
        </p>
      </div>
    </div>

    {/* On Time Pickup */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/on-time-pickup.jpg"
          alt="On Time Pickup"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          ⏰ On Time Pickup
        </h3>

        <p className="text-gray-400">
          Punctual service for airport and outstation trips.
        </p>
      </div>
    </div>

    {/* 24x7 Support */}
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-52">
        <Image
          src="/customer-support-24x7.jpg"
          alt="24x7 Support"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">
          📞 24×7 Support
        </h3>

        <p className="text-gray-400">
          Assistance available before, during and after your trip.
        </p>
      </div>
    </div>

  </div>

</div>

{/* Trust Section */}

<div className="mt-24">

  <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
    Trusted By Hundreds of Travelers
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-3xl p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-6xl mb-4">🚖</div>

      <h3 className="text-5xl font-black text-cyan-400">
        1000+
      </h3>

      <p className="text-gray-400 mt-3">
        Trips Successfully Completed
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-3xl p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-6xl mb-4">😊</div>

      <h3 className="text-5xl font-black text-cyan-400">
        500+
      </h3>

      <p className="text-gray-400 mt-3">
        Happy Customers
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-3xl p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-6xl mb-4">⭐</div>

      <h3 className="text-5xl font-black text-cyan-400">
        4.9★
      </h3>

      <p className="text-gray-400 mt-3">
        Average Customer Rating
      </p>
    </div>

    <div className="bg-gradient-to-b from-cyan-500/10 to-white/5 border border-cyan-500/20 rounded-3xl p-8 text-center hover:scale-105 hover:border-cyan-500 transition-all duration-300">
      <div className="text-6xl mb-4">📞</div>

      <h3 className="text-5xl font-black text-cyan-400">
        24×7
      </h3>

      <p className="text-gray-400 mt-3">
        Booking & Customer Support
      </p>
    </div>

  </div>

</div>

{/* How To Book Your Cab */}

<div className="mt-24">

  <h2 className="text-4xl md:text-5xl font-black text-center mb-4">
    How To Book Your Cab
  </h2>

  <p className="text-center text-gray-400 mb-14">
    Book your ride in just a few simple steps
  </p>

  <div className="grid md:grid-cols-4 gap-6">

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-5xl mb-4">🚘</div>

      <div className="w-10 h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-4">
        1
      </div>

      <h3 className="text-xl font-bold mb-3">
        Choose Vehicle
      </h3>

      <p className="text-gray-400">
        Select Sedan, SUV, Innova or Tempo Traveller according to your needs.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-5xl mb-4">🧮</div>

      <div className="w-10 h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-4">
        2
      </div>

      <h3 className="text-xl font-bold mb-3">
        Get Fare Estimate
      </h3>

      <p className="text-gray-400">
        Use our fare calculator or contact us for an instant quote.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-5xl mb-4">✅</div>

      <div className="w-10 h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-4">
        3
      </div>

      <h3 className="text-xl font-bold mb-3">
        Confirm Booking
      </h3>

      <p className="text-gray-400">
        Confirm your trip through call or WhatsApp in minutes.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300">
      <div className="text-5xl mb-4">🎉</div>

      <div className="w-10 h-10 rounded-full bg-cyan-500 text-black font-black flex items-center justify-center mx-auto mb-4">
        4
      </div>

      <h3 className="text-xl font-bold mb-3">
        Enjoy Your Journey
      </h3>

      <p className="text-gray-400">
        Sit back and enjoy a safe, comfortable and hassle-free ride.
      </p>
    </div>

  </div>

</div>

{/* Service Locations */}

<div className="mt-24">

  <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
    We Serve Across Maharashtra
  </h2>

  <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">

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
        className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300"
      >
        <p className="font-semibold">
          📍 Cab Service in {city}
        </p>
      </div>
    ))}
  </div>

</div>

{/* SEO Content Section */}

<section className="mt-24 max-w-5xl mx-auto text-gray-300 leading-8">

  <h2 className="text-4xl font-black text-white mb-6 text-center">
    Cab Service in Nagpur for Local & Outstation Travel
  </h2>

  <p className="text-center mt-6">
  We provide taxi services from Nagpur to Pune, Mumbai,
  Nashik, Aurangabad, Raipur, Amravati, Wardha,
  Chandrapur and major destinations across Maharashtra
  and Central India. One-way cabs, round trips,
  airport transfers and corporate travel available 24×7.
  </p>

  <p className="text-center">
    RC Tours & Travels provides airport transfers, local cab services,
    outstation taxi bookings, corporate travel solutions and tempo traveller
    rentals in Nagpur. Our fleet includes Swift Dzire, Hyundai Aura,
    Toyota Glanza, Ertiga, Innova Crysta, Toyota Hycross, Force Urbania
    and Tempo Travellers for family trips, corporate travel and group tours.
  </p>

</section>

{/* FAQ Section */}

<div className="mt-24">

  <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
    Frequently Asked Questions
  </h2>

  <div className="space-y-4 max-w-4xl mx-auto">

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-xl font-bold mb-2">
        Is driver allowance included in fare?
      </h3>
      <p className="text-gray-400">
        Driver allowance may apply for long-distance and multi-day trips.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-xl font-bold mb-2">
        Are toll and parking charges included?
      </h3>
      <p className="text-gray-400">
        Toll tax, parking charges and state tax are charged separately when applicable.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-xl font-bold mb-2">
        Do you provide airport pickup and drop?
      </h3>
      <p className="text-gray-400">
        Yes, we provide 24×7 airport transfers with timely pickup and drop service.
      </p>
    </div>

    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 hover:-translate-y-2 transition-all duration-300">
      <h3 className="text-xl font-bold mb-2">
        Can I book for outstation trips?
      </h3>
      <p className="text-gray-400">
        Yes, we offer one-way, round-trip and multi-day outstation bookings across India.
      </p>
    </div>

  </div>

</div>


        {/* CTA Section Start */}

<div className="mt-16 text-center bg-white/5 border border-cyan-500/20 rounded-3xl p-12 shadow-2xl shadow-cyan-500/10">



  <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
    Book Your Ride Today
  </h2>

  <p className="text-gray-400 max-w-2xl mx-auto mb-8">
    Choose from Sedan, SUV, Innova Crysta or Tempo Traveller and get instant confirmation.
  </p>

  <div className="flex flex-col md:flex-row justify-center gap-4">

    <a
      href="tel:+919172271464"
      className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all duration-300"
    >
      📞 Call Now
    </a>

    <a
      href="https://wa.me/919172271464"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
    >
      💬 WhatsApp Now
    </a>

  </div>

</div>

{/* CTA Section End */}


        </div>

        {/* Sticky Booking Bar */}

<div className="fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-md border-t border-cyan-500 z-40">

  <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

    <div>
      <p className="text-white font-bold">
        Need a Cab Right Now?
      </p>

      <p className="text-gray-400 text-sm">
        Instant Booking Available 24×7
      </p>
    </div>

    <div className="flex gap-3">

      <a
        href="tel:+919172271464"
        className="bg-white text-black px-4 py-2 rounded-xl font-bold"
      >
        📞 Call
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-cyan-500 text-black px-4 py-2 rounded-xl font-bold"
      >
        💬 WhatsApp
      </a>

    </div>

  </div>

</div>


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