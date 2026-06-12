"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const vehicleImages = {
  "Swift Dzire": "/dezire.jpg",
  "Hyundai Aura": "/aura.jpg",
  "Toyota Glanza": "/glanza.jpg",
  "Maruti Ertiga": "/ertiga.jpg",
  "Toyota Rumion": "/rumion.jpg",
  "Kia Carens": "/carens.jpg",
  "Innova Crysta": "/crysta.jpg",
  "Toyota Hycross": "/hycross.png",
  "Traveller 13 Seater": "/traveller13.jpg",
  "Traveller 17 Seater": "/traveller17.jpg",
  "Traveller 26 Seater": "/traveller26.jpg",
  "Force Urbania": "/urbania.jpg",
};

const vehicleCapacity = {
  "Swift Dzire": 4,
  "Hyundai Aura": 4,
  "Toyota Glanza": 4,
  "Maruti Ertiga": 6,
  "Toyota Rumion": 6,
  "Kia Carens": 6,
  "Innova Crysta": 7,
  "Toyota Hycross": 7,
  "Traveller 13 Seater": 13,
  "Traveller 17 Seater": 17,
  "Traveller 26 Seater": 26,
  "Force Urbania": 17,
};

const vehicleRates = {
  "Swift Dzire": 12,
  "Hyundai Aura": 12,
  "Toyota Glanza": 13,
  "Maruti Ertiga": 14,
  "Toyota Rumion": 14,
  "Kia Carens": 15,
  "Innova Crysta": 18,
  "Toyota Hycross": 20,
};

export default function BookingDetailsPage() {

  const searchParams = useSearchParams();


const vehicle = searchParams.get("vehicle")?.trim() || "";
const tripType = searchParams.get("tripType")?.trim() || "";
const pickupParam = searchParams.get("pickup")?.trim() || "";
const dropParam = searchParams.get("drop")?.trim() || "";
const pickupDate = searchParams.get("pickupDate")?.trim() || "";
const returnDate = searchParams.get("returnDate")?.trim() || "";
const pickupTime = searchParams.get("pickupTime")?.trim() || "";

const distance = Number(
  searchParams.get("distance")?.trim() || 0
);

const displayDistance =
  tripType === "One Way"
    ? distance * 2
    : distance;

const toll = Number(
  searchParams.get("toll")?.trim() || 0
);

const fare = Number(
  searchParams.get("fare")?.trim() || 0
);

console.log({
  vehicle,
  tripType,
  pickupParam,
  dropParam,
  pickupDate,
  returnDate,
  pickupTime,
  distance,
  toll,
  fare,
});

const vehicleImage =
  vehicleImages[vehicle] || "/dezire.jpg";

  const [paymentType, setPaymentType] = useState("partial");

  let calculatedFare = fare;

if (distance > 0 && vehicleRates[vehicle]) {
  calculatedFare =
    distance * (vehicleRates[vehicle] * 2) + toll;
}

const baseFare = fare;

  const [petRide, setPetRide] = useState(false);

  const startDate = new Date(pickupDate);

const endDate = returnDate
  ? new Date(returnDate)
  : new Date(pickupDate);

const totalDays =
  Math.floor(
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24)
  ) + 1;

const driverAllowance =
  tripType === "One Way"
    ? 500
    : tripType === "Outstation Trip"
    ? totalDays * 500
    : tripType === "Airport Transfer"
    ? distance > 150
      ? 300
      : 0
    : 0;

  const totalFare =
  baseFare +
  driverAllowance +
  (petRide ? 500 : 0);

  const advanceAmount = 500;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [pickup, setPickup] = useState(pickupParam);
  const [drop, setDrop] = useState(dropParam);
  const [gender, setGender] = useState("");

  const [passengers, setPassengers] = useState("1");
  const [luggage, setLuggage] = useState("0");
  const [whatsapp, setWhatsapp] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [pickupDetails, setPickupDetails] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const handleProceed = async () => {

    if (
  !pickup ||
  !drop ||
  !name ||
  !mobile ||
  !gender
  ) 
    {
      alert(
        "Please fill all required passenger details before proceeding."
      );
      return;
    }

    if (!confirmed) {
      alert(
        "Please confirm passenger and trip details before proceeding."
      );
      return;
    }

    const bookingId =
      "RCT" + Date.now().toString().slice(-8);

    const bookingData = {
  bookingId,

  vehicle,
  tripType,

  pickup,
  pickupDetails,
  drop,

  pickupDate,
  returnDate,
  pickupTime,

  distance: displayDistance,

  passengers,
  luggage,

  name,
  mobile,
  whatsapp,
  email,
  gender,

  notes,

  paymentType,

  totalFare,

  advancePaid:
    paymentType === "partial"
      ? advanceAmount
      : totalFare,

  remainingAmount:
    paymentType === "partial"
      ? totalFare - advanceAmount
      : 0,

  payableAmount:
    paymentType === "partial"
      ? advanceAmount
      : totalFare,

  paymentStatus: "Pending",
};

    console.log("SAVING BOOKING...");

const res = await fetch("/api/save-booking", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(bookingData),
});

console.log("STATUS:", res.status);

const result = await res.json();

console.log("BOOKING SAVE RESULT:", result);

    localStorage.setItem(
      "bookingData",
      JSON.stringify(bookingData)
    );

    window.location.href = "/payment";
  };

  return (
    <main className="bg-slate-100 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto flex gap-6 items-start">

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">

          {/* Left Side */}
          <div>

            {/* Car Details */}
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

              <div className="grid lg:grid-cols-[320px_1fr]">

                {/* Car Image */}
                <div className="border-r p-6 flex flex-col items-center justify-center">

                  <Image
                  src={vehicleImage}
                  alt={vehicle}
                  width={280}
                  height={160}
                  loading="eager"
                  className="object-contain"
                  />

                  <div className="mt-5 bg-indigo-100 px-8 py-3 rounded-xl text-xl font-semibold">
                    Sedan
                  </div>

                </div>

                {/* Details */}
                <div className="p-6">

                  <h1 className="text-3xl font-bold">
                  {vehicle || "Cab Selected"}
                  </h1>

                  <p className="text-gray-600 mt-2">
                    ⭐ 4.5 Star Ratings
                  </p>

                  <div className="inline-block mt-4 bg-indigo-200 px-5 py-2 rounded-t-xl font-semibold">
                    Hourly Rental
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-6">

                    <div className="grid md:grid-cols-2 gap-6">

                      <div>
                        <h3 className="font-bold text-2xl mb-3">
                          Pickup
                        </h3>

                        <p>{pickupParam}</p>

                        <p className="mt-3">
                        📅 {pickupDate}
                      </p>

                      <p>
                      ⏰ {pickupTime || "Not Selected"}
                      </p>
                      </div>

                      <div className="md:border-l md:pl-6">

                        <h3 className="font-bold text-2xl mb-3">
                        Trip Type
                        </h3>

                        <p>{tripType}</p>

                      </div>

                    </div>

                  </div>

                  <div className="flex flex-wrap gap-3 mt-5">

                    <span className="bg-gray-100 px-3 py-2 rounded-full">
                      🧻 Tissues
                    </span>

                    <span className="bg-gray-100 px-3 py-2 rounded-full">
                      🧴 Sanitiser
                    </span>

                    <span className="bg-gray-100 px-3 py-2 rounded-full">
                      🌸 Freshner
                    </span>

                    <span className="bg-gray-100 px-3 py-2 rounded-full">
                      CNG
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div className="bg-white rounded-3xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Inclusions
                </h2>

                <ul className="space-y-3">
                  <li>✔ Fuel Charges</li>
                  <li>✔ Driver Allowance</li>
                  <li>✔ Toll Included</li>
                  <li>✔ 85 KM Included</li>
                </ul>
              </div>

              <div className="bg-white rounded-3xl shadow p-6">
                <h2 className="text-2xl font-bold mb-4">
                  Exclusions
                </h2>

                <ul className="space-y-3">
                  <li>✖ Parking Charges</li>
                  <li>✖ State Tax</li>
                  <li>✖ Extra Distance Charges</li>
                </ul>
              </div>

            </div>

            {/* Choose Extra */}
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4">
                Choose Extra
              </h2>

              <div className="bg-white rounded-2xl shadow p-5 max-w-md">

                <h3 className="text-xl font-semibold mb-3">
                  Pet Friendly Ride
                </h3>

                <p className="text-gray-600 mb-4">
                  Travel comfortably with your pet.
                </p>

                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={petRide}
                    onChange={(e) => setPetRide(e.target.checked)}
                  />
                  <span className="font-bold">₹500</span>
                </label>

              </div>
            </div>

            {/* Passenger Details */}
            <div className="bg-white rounded-3xl shadow-lg p-6 mt-6">

              <h2 className="text-3xl font-bold mb-6">
                Passenger Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                {/* Pickup Address */}
                <div className="md:col-span-2">
                  <label className="font-medium mb-2 block">
                    Pick-up Address
                  </label>

                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    placeholder="Enter Pickup Address"
                    className="w-full h-14 border rounded-xl px-4"
                  />
                </div>

                {/* Drop Address */}
                <div className="md:col-span-2">
                  <label className="font-medium mb-2 block">
                    Drop-off Address
                  </label>

                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    placeholder="Enter Drop-off Address"
                    className="w-full h-14 border rounded-xl px-4"
                  />

                </div>

                {/* Exact Pickup Details */}
                <div className="md:col-span-2">
                  <label className="font-medium mb-2 block">
                    Exact Pickup Details (Optional)
                  </label>

                  <textarea
                  rows={3}
                  value={pickupDetails}
                  onChange={(e) => setPickupDetails(e.target.value)}
                  placeholder="Flat No, Landmark, Building Name etc."
                  className="w-full border rounded-xl p-4"
                  />
                </div>

                {/* Name */}
                <div>
                  <label className="font-medium mb-2 block">
                    Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-14 border rounded-xl px-4"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="font-medium mb-2 block">
                    Gender
                  </label>

                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full h-14 border rounded-xl px-4"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Mobile */}
                <div>
                  <label className="font-medium mb-2 block">
                    Contact No
                  </label>

                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full h-14 border rounded-xl px-4"
                  />
                </div>

                {/* WhatsApp */}
            <div>
            <label className="font-medium mb-2 block">
            WhatsApp Number
            </label>

            <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="WhatsApp Number"
            className="w-full h-14 border rounded-xl px-4"
            />
            </div>

                {/* Email */}
                <div>
                  <label className="font-medium mb-2 block">
                  Email Id (Optional)
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full h-14 border rounded-xl px-4"
                  />
                </div>

                {/* Passengers */}
    <div>
  <label className="font-medium mb-2 block">
    Number of Passengers
  </label>

  <select
    value={passengers}
    onChange={(e) => setPassengers(e.target.value)}
    className="w-full h-14 border rounded-xl px-4"
  >
    {Array.from({ length: 50 }, (_, i) => (
      <option key={i + 1} value={i + 1}>
        {i + 1} Passenger{i > 0 ? "s" : ""}
      </option>
    ))}
  </select>

  {Number(passengers) >
    (vehicleCapacity[vehicle] || 0) && (
    <p className="mt-2 text-red-600 font-semibold">
      ⚠ Selected vehicle may not be suitable for {passengers} passengers.
    </p>
  )}
</div>

{/* Luggage */}
<div>
  <label className="font-medium mb-2 block">
    Luggage Bags
  </label>

  <select
    value={luggage}
    onChange={(e) => setLuggage(e.target.value)}
    className="w-full h-14 border rounded-xl px-4"
  >
    <option value="0">No Luggage</option>
    <option value="1">1 Bag</option>
    <option value="2">2 Bags</option>
    <option value="3">3 Bags</option>
    <option value="4">4 Bags</option>
    <option value="5">5 Bags</option>
  </select>
</div>

                {/* Remark */}
                <div className="md:col-span-2">
                  <label className="font-medium mb-2 block">
                    Remark (Optional)
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Any special request..."
                    className="w-full border rounded-xl p-4"
                  />
                </div>

              </div>

            </div>

            {/* Booking Confirmation Section */}

            <label className="flex items-start gap-3 mt-6 bg-white p-4 rounded-2xl shadow">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5"
              />

              <span className="text-gray-700">
                I confirm that all passenger and trip details provided above are correct.
              </span>
            </label>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mt-4">

              

              <h3 className="font-bold text-xl text-blue-700 mb-3">
                Review Your Booking Details
              </h3>

              <p className="text-gray-700">
                Please verify your pickup location, drop location,
                passenger information and fare details before proceeding.
              </p>

              <p className="text-gray-700 mt-2">
                After clicking the button below, you will be redirected
                to the payment page to complete your booking.
              </p>

            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mt-5">
              <p className="font-semibold text-yellow-700">
                👉 Select payment option from Fare Summary and then click
                "Confirm Details & Proceed To Payment".
              </p>
            </div>

            <button
              onClick={handleProceed}
              className="w-full mt-5 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-xl shadow-lg"
            >
              Confirm Details & Proceed To Payment
            </button>

          </div>

          {/* Right Sidebar */}
          <div>

            <div className="bg-white rounded-3xl shadow-lg p-6 sticky top-28">

              <div className="bg-blue-600 text-white rounded-xl p-4 text-center font-bold">
                Free Cancellation Available
              </div>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between">
                  <span>Distance</span>
                  <span>{displayDistance} KM</span>
                </div>

                <div className="flex justify-between">
                <span>Base Fare</span>
                <span>₹{baseFare}</span>
                </div>

                <div className="flex justify-between">
                  <span>Driver Allowance</span>
                  <span>₹{driverAllowance}</span>
                </div>

                <div className="flex justify-between">
                <span>Toll Charges</span>
                <span>₹{toll}</span>
                </div>
                {petRide && (
                  <div className="flex justify-between text-green-600 font-semibold">
                    <span>Pet Friendly Ride</span>
                    <span>₹500</span>
                  </div>
                )}

              </div>

              <hr className="my-5" />

              <div className="space-y-4">

                <label className="flex justify-between items-center cursor-pointer">

                  <div>
                    <p className="font-semibold text-lg">
                      Pay Advance Amount
                    </p>

                    <p className="text-sm text-blue-600 font-medium">
                      Recommended
                    </p>

                    <p className="text-sm text-gray-500">
                      Pay ₹500 now and remaining amount to driver after trip completion.
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    checked={paymentType === "partial"}
                    onChange={() => setPaymentType("partial")}
                  />

                </label>

                <label className="flex justify-between items-center cursor-pointer">

                  <div>
                    <p className="font-semibold text-lg">
                      Pay Full Amount
                    </p>

                    <p className="text-sm text-gray-500">
                      Complete booking with full payment now.
                    </p>
                  </div>

                  <input
                    type="radio"
                    name="payment"
                    checked={paymentType === "full"}
                    onChange={() => setPaymentType("full")}
                  />

                </label>

              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span>₹{totalFare}</span>
              </div>

              {paymentType === "partial" && (
                <p className="text-green-600 mt-2">
                  Remaining ₹{totalFare - advanceAmount} payable to driver
                </p>
              )}

              {paymentType === "partial" ? (
                <div className="mt-3 bg-green-50 border border-green-200 rounded-xl p-3">
                  <p className="font-semibold text-green-700">
                    Advance Payment Selected
                  </p>

                  <p className="text-sm text-green-600">
                    Pay ₹500 now.
                  </p>

                  <p className="text-sm text-green-600">
                    Remaining ₹{totalFare - advanceAmount} payable directly to driver.
                  </p>
                </div>
              ) : (
                <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3">
                  <p className="font-semibold text-blue-700">
                    Full Payment Selected
                  </p>

                  <p className="text-sm text-blue-600">
                    No payment pending after booking confirmation.
                  </p>
                </div>
              )}

              <button
              disabled
              className="w-full mt-5 bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg cursor-not-allowed opacity-80"
              >
              🚕 Complete Passenger Details To Unlock Payment
              </button>

              <Link
                href="/book-cab"
                className="block text-center mt-4 text-blue-600 font-semibold"
              >
                ← Back to Cabs
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-0 z-50 flex flex-col items-center gap-1">
      
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