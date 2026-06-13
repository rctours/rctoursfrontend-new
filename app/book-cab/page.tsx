"use client";

import { Suspense } from "react";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

function BookCabContent() {
  const searchParams = useSearchParams();

  const router = useRouter();

const [tripType, setTripType] = useState(
  searchParams.get("tripType")?.trim() || "One Way"
);

console.log("Trip Type:", searchParams.get("tripType"));
console.log("Journey Date:", searchParams.get("journeyDate"));

const [pickup, setPickup] = useState(
  searchParams.get("pickup") || ""
);

const [drop, setDrop] = useState(
  searchParams.get("drop") || ""
);

const [pickupDate, setPickupDate] = useState(
  searchParams.get("journeyDate")?.trim() || ""
);

const [returnDate, setReturnDate] = useState(
  searchParams.get("returnDate") || ""
);

const [pickupTime, setPickupTime] = useState("");

const [distance, setDistance] = useState(
  Number(searchParams.get("distance")) || 0
);

const [rentalPackage, setRentalPackage] = useState("40 KM / 4 Hrs");

const [pickupSuggestions, setPickupSuggestions] = useState<string[]>([]);
const [dropSuggestions, setDropSuggestions] = useState<string[]>([]);

const searchLocation = async (
  text: string,
  type: "pickup" | "drop"
) => {
  if (text.length < 1) {
    if (type === "pickup") {
      setPickupSuggestions([]);
    } else {
      setDropSuggestions([]);
    }
    return;
  }

  try {
    const res = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.NEXT_PUBLIC_ORS_API_KEY}&text=${encodeURIComponent(
        text
      )}&boundary.country=IND&focus.point.lon=79.0882&focus.point.lat=21.1458&size=10`
    );

    const data = await res.json();

    const results =
    data.features?.map(
    (item: any) => item.properties.label
  ) || [];

    if (type === "pickup") {
      setPickupSuggestions(results);
    } else {
      setDropSuggestions(results);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSearch = () => {
  const defaultRate = 11;

  const fare = Math.round(distance * defaultRate * 2);

  const params = new URLSearchParams({
    tripType,
    pickup,
    drop,
    pickupDate,
    returnDate,
    pickupTime,
    distance: distance.toString(),
    toll: "0",
    fare: fare.toString(),
  });

  router.push(`/fleet?${params.toString()}`);
};

useEffect(() => {
  const getDistance = async () => {
    try {
      const res = await fetch("/api/distance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickup,
          drop,
        }),
      });

      const data = await res.json();

      if (data.success) {

  if (tripType === "Outstation Trip") {

  let totalDistance = data.distance * 2;

  if (pickupDate && returnDate) {

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diffTime = end.getTime() - start.getTime();

    const days =
      Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const minimumKm = days * 300;

    totalDistance = Math.max(
      totalDistance,
      minimumKm
    );
  }

  setDistance(totalDistance);

} else {

  setDistance(data.distance);

}
}
    } catch (error) {
      console.log(error);
    } 
  };

  if (pickup && drop) {
    getDistance();
  }
}, [pickup, drop, pickupDate, returnDate, tripType]);

const includedKm =
  rentalPackage === "40 KM / 4 Hrs"
    ? 40
    : rentalPackage === "80 KM / 8 Hrs"
    ? 80
    : 120;

const includedHours =
  rentalPackage === "40 KM / 4 Hrs"
    ? 4
    : rentalPackage === "80 KM / 8 Hrs"
    ? 8
    : 12;

  const cabs = [
  {
  name: "Swift Dzire",
  seats: 4,
  bags: 2,
  rate: 11,
  extraHour: 150,
  image: "/cars/dzire.jpg",
  },
  {
  name: "Ertiga",
  seats: 6,
  bags: 3,
  rate: 13,
  extraHour: 250,
  image: "/cars/ertiga.jpg",
  },
  {
  name: "Toyota Rumion",
  seats: 6,
  bags: 3,
  rate: 13,
  extraHour: 250,
  image: "/cars/rumion.jpg",
  },

  {
  name: "Innova Crysta",
  seats: 7,
  bags: 4,
  rate: 17,
  extraHour: 350,
  image: "/cars/crysta.jpg",
  },
];

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-blue-950 to-blue-700 pt-36 pb-10">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black text-center text-white">Book Your Cab</h1>
          <p className="text-center text-blue-100 mt-3 mb-8">
            Local • Airport • Outstation Taxi Service
          </p>

          <div className="bg-white rounded-[35px] shadow-2xl px-5 py-5">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-3">
              <select
                value={tripType}
                onChange={(e) => setTripType(e.target.value)}
                className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
              >
                <option>Airport Pick-Up & Drop</option>
                <option>One Way Trip</option>
                <option>Local Rental</option>
                <option>Outstation Trip</option>
              </select>

              {tripType === "Local Rental" && (
    <select
    value={rentalPackage}
    onChange={(e) => setRentalPackage(e.target.value)}
    className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
    >
    <option>40 KM / 4 Hrs</option>
    <option>80 KM / 8 Hrs</option>
    <option>120 KM / 12 Hrs</option>
  </select>
  )}

              <div className="relative">
  <input
    type="text"
    placeholder="Pickup Location"
    value={pickup}
    onChange={(e) => {
      setPickup(e.target.value);
      searchLocation(e.target.value, "pickup");
    }}
    className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
  />

  {pickupSuggestions.length > 0 && (
    <div className="absolute z-50 bg-white border rounded-xl w-full max-h-60 overflow-y-auto shadow-lg">
      {pickupSuggestions.map((item, index) => (
        <div
          key={index}
          className="p-3 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setPickup(item);
            setPickupSuggestions([]);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

              <div className="relative">
  <input
    type="text"
    placeholder="Drop Location"
    value={drop}
    onChange={(e) => {
      setDrop(e.target.value);
      searchLocation(e.target.value, "drop");
    }}
    className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
  />

  {dropSuggestions.length > 0 && (
    <div className="absolute z-50 bg-white border rounded-xl w-full max-h-60 overflow-y-auto shadow-lg">
      {dropSuggestions.map((item, index) => (
        <div
          key={index}
          className="p-3 cursor-pointer hover:bg-gray-100"
          onClick={() => {
            setDrop(item);
            setDropSuggestions([]);
          }}
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>

  <input
  type="date"
  title="Journey Date"
  value={pickupDate}
  onChange={(e) => setPickupDate(e.target.value)}
  className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
/>

{tripType === "Outstation Trip" ? (
  <input
  type="date"
  title="Return Date"
  value={returnDate}
  onChange={(e) => setReturnDate(e.target.value)}
  className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
/>
) : (
  <input
    type="time"
    value={pickupTime}
    onChange={(e) => setPickupTime(e.target.value)}
    className="h-[72px] w-full border border-gray-300 rounded-2xl px-5"
  />
)}

              <button
              onClick={handleSearch}
              className="h-[72px] w-full bg-blue-600 text-white rounded-2xl font-bold text-xl"
              >
              Search Cabs
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-blue-900 rounded-3xl p-4">
              <div className="grid grid-cols-3 text-center text-white">
                <div>🛡️<p>Verified Drivers</p></div>
                <div>✅<p>Free Cancellation</p></div>
                <div>🏷️<p>Fixed Fare</p></div>
              </div>
            </div>

            {cabs.map((cab, i) => (
              <div key={i} className="bg-white rounded-2xl shadow border px-4 py-2">
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-32 h-20 md:w-56 md:h-32">
                      <Image src={cab.image} alt={cab.name} fill className="object-contain scale-110" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">

  <div className="flex items-center gap-3">

    <h2 className="text-xl font-bold">
      {cab.name}
    </h2>

    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-sm font-medium">
      SEDAN
    </span>

    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-bold">
      ★ 4.5
    </span>

  </div>

  <p className="text-gray-400 font-semibold mt-3">
    Or Similar
  </p>

  <div className="flex flex-wrap gap-2 mt-2">

    <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
      👤 4 Seater
    </span>

    <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
      ❄️ AC
    </span>

    <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
      🧳 2 Bags
    </span>

    <span className="bg-gray-100 px-2 py-1 text-xs rounded-lg text-sm">
      🧼 Clean Cab
    </span>

  </div>

  <div className="flex flex-wrap gap-2 mt-3">

    <span className="border border-orange-400 text-orange-500 px-2 py-1 text-xs rounded-lg">
      ⛽ CNG
    </span>

    <span className="border border-green-500 text-green-600 px-2 py-1 text-xs rounded-lg">
      ✓ Free Cancellation
    </span>

  </div>

  <p className="text-gray-500 mt-2">

{tripType === "Local Rental" && (
  <>
    {rentalPackage} Included • Extra KM ₹{cab.rate}/KM
  </>
)}

{tripType === "Outstation Trip" && (
  <>
    {distance} KM Included • Extra KM ₹{cab.rate}/KM
  </>
)}

{tripType === "One Way Trip" && (
  <>
    {distance} KM Included • Extra KM ₹{cab.rate}/KM
  </>
)}

{tripType === "Airport Pick-Up & Drop" && (
  <>
    {distance} KM Included • Extra KM ₹{cab.rate}/KM
  </>
)}

</p>

<p className="text-xs text-red-500 mt-1">
  Extra Hour ₹{cab.extraHour}/Hour
</p>


</div>
                  
                  </div>

                  <div className="text-right">

                    <h3 className="text-3xl font-bold">
                  ₹{
                  tripType === "Local Rental"
                  ? includedKm * cab.rate
                  : tripType === "One Way Trip"
                  ? Math.round(distance * cab.rate * 2)
                  : Math.round(distance * cab.rate)
                  }
                  </h3>

                  <p className="text-sm text-gray-500">
                  {tripType === "Local Rental"
                  ? `${includedKm} KM / ${includedHours} Hrs`
                  : `Distance: ${distance} KM`}
                  </p>
                  </div>

                </div>

                <div className="border-t mt-3 pt-3 flex justify-between items-center">
                  <span>Book with ₹476 now</span>

                  <Link
                  href={`/booking-details?vehicle=${encodeURIComponent(cab.name)}&tripType=${encodeURIComponent(tripType)}&pickup=${encodeURIComponent(pickup)}&drop=${encodeURIComponent(drop)}&pickupDate=${encodeURIComponent(pickupDate)}&returnDate=${encodeURIComponent(returnDate)}&pickupTime=${encodeURIComponent(pickupTime)}&distance=${distance}&toll=0&fare=${
                  tripType === "Local Rental"
                  ? includedKm * cab.rate
                  : tripType === "One Way Trip"
                  ? Math.round(distance * cab.rate * 2)
                  : Math.round(distance * cab.rate)
                  }`}
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold"
                  >
                  Book Now
                  </Link>

                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden sticky top-28">
              <iframe
                src={`https://www.google.com/maps?q=${pickup || "Nagpur"} ${drop || ""}&output=embed`}
                width="100%"
                height="260"
                style={{ border: 0 }}
              />

              <div className="p-5">
                <h3 className="text-xl font-bold mb-4">Your Transfer</h3>
                <p><strong>From:</strong> {pickup || "Nagpur"}</p>
                <p><strong>To:</strong> {drop || "Wardha"}</p>

                <a
                  href="tel:+919172271464"
                  className="mt-5 block text-center bg-green-600 text-white py-3 rounded-xl"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* Why RC Tours & Travels */}
<section className="max-w-7xl mx-auto px-4 pb-12">

  <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl p-8">

    <h2 className="text-4xl font-bold text-white mb-8">
      Why RC Tours & Travels?
    </h2>

    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Safety First
        </h3>

        <p className="text-gray-700 text-lg">
          Always verified drivers and 24/7 support so you're never alone on the road.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Transparent Pricing
        </h3>

        <p className="text-gray-700 text-lg">
          No hidden charges, no surge pricing and no last-minute surprises.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6">
        <h3 className="text-blue-600 font-bold text-2xl mb-3">
          Clean & Premium Cabs
        </h3>

        <p className="text-gray-700 text-lg">
          Well-maintained and sanitized vehicles for a smooth travel experience.
        </p>
      </div>

    </div>

  </div>

</section>

{/* Footer */}
<footer
  className="border-t border-white/10 py-10 relative overflow-hidden"
>

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/footer-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

    <div className="grid md:grid-cols-4 gap-10">

      {/* Company */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          RC Tours & Travels
        </h3>

        <p className="text-gray-200">
          Premium Taxi Service In Nagpur For Airport Transfers,
          Local Rentals, Outstation Trips And Tour Packages.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
        Quick Links
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li><a href="/">Home</a></li>
          <li><a href="/fleet">Fleet</a></li>
          <li><a href="/tour-packages">Tour Packages</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
        Services
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li>Airport Transfer</li>
          <li>Local Rental</li>
          <li>Outstation Taxi</li>
          <li>Corporate Cab</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
        Contact Us
        </h3>

        <ul className="space-y-3 text-gray-200">
          <li>📞 +91 9172271464</li>
          <li>📍 Nagpur, Maharashtra</li>
          <li>✉️ info@rctoursandtravels.in</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-200">
      © 2026 RC Tours & Travels. All Rights Reserved.
      Designed by Rupesh Chavhan
    </div>

  </div>

</footer>

{/* Floating Call Button */}
<div className="fixed bottom-24 md:bottom-6 right-3 md:right-0 z-50 flex flex-col items-center gap-1">

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl"
  >
    📞
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-4xl"
  >
    <FaWhatsapp />
  </a>

  {/* Discount Badge */}
  <div className="bg-green-500 text-white px-3 py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>


    </main>
  );
}

export default function BookCabPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookCabContent />
    </Suspense>
  );
}
