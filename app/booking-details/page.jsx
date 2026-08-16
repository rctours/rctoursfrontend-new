"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FaWhatsapp } from "react-icons/fa"; import { LuBriefcase, LuSprayCan, LuFuel } from "react-icons/lu"; import { MdOutlineSanitizer } from "react-icons/md";
import MobileBookingCard from "@/components/MobileBookingCard";
import Script from "next/script";

const vehicleImages = {
  "Swift Dzire": "/swift-dzire.jpg",
  "Dzire": "/swift-dzire.jpg",

  "Hyundai Aura": "/Aura.jpg",

  "Toyota Glanza": "/glanza.jpg",

  "Ertiga": "/ertiga.jpeg",
  "Maruti Ertiga": "/ertiga.jpeg",

  "Toyota Rumion": "/rumion.png",

  "Kia Carens": "/carens.jpg",

  "Innova Crysta": "/innova-crysta.jpg",

  "Toyota Hycross": "/hycross.png",

  "Traveller 13 Seater": "/traveller13.jpg",

  "Traveller 17 Seater": "/traveller17.jpg",

  "Traveller 26 Seater": "/traveller26.jpg",

  "Force Urbania": "/urbania.jpg",
};

const vehicleCapacity = {

  "Swift Dzire": 4,

  "Dzire": 4,

  "Hyundai Aura": 4,

  "Toyota Glanza": 4,

  "Ertiga": 6,

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

const vehicleCategory = {
  "Swift Dzire": "Sedan",
  "Dzire": "Sedan",

  "Hyundai Aura": "Sedan",

  "Toyota Glanza": "Hatchback",

  "Ertiga": "MUV",
  "Maruti Ertiga": "MUV",

  "Toyota Rumion": "MUV",

  "Kia Carens": "MUV",

  "Innova Crysta": "SUV",

  "Toyota Hycross": "SUV",

  "Traveller 13 Seater": "Traveller",
  "Traveller 17 Seater": "Traveller",
  "Traveller 26 Seater": "Traveller",

  "Force Urbania": "Urbania",
};

const vehicleRates = {
  "Swift Dzire": 13,
  "Hyundai Aura": 13,
  "Toyota Glanza": 13,
  "Maruti Ertiga": 15,
  "Toyota Rumion": 15,
  "Kia Carens": 17,
  "Innova Crysta": 19,
  "Toyota Hycross": 24,
};

function BookingDetailsContent() {

  const searchParams = useSearchParams();


const vehicle =
  searchParams.get("vehicle")?.trim() ||
  searchParams.get("cabType")?.trim() ||
  "Swift Dzire";
const tripType = searchParams.get("tripType")?.trim() || "";
const pickupParam = searchParams.get("pickup")?.trim() || "";
const dropParam = searchParams.get("drop")?.trim() || "";
const pickupDate = searchParams.get("pickupDate")?.trim() || "";
const returnDate = searchParams.get("returnDate")?.trim() || "";
const pickupTime = searchParams.get("pickupTime")?.trim() || "";

const distance = Number(
  searchParams.get("distance")?.trim() || 0
);

const displayDistance = distance;

const toll = Number(
  searchParams.get("toll")?.trim() || 0
);

const fare = Number(
  searchParams.get("fare")?.trim() || 0
);

//console.log({
//  vehicle,
//  tripType,
//  pickupParam,
 // dropParam,
 // pickupDate,
 // returnDate,
//  pickupTime,
 // distance,
 // toll,
 // fare,
//});

const vehicleImage =
  vehicleImages[vehicle] || "/swift-dzire.jpg";

  const [paymentType, setPaymentType] = useState("partial");

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
    ? totalDays <= 1
      ? 300
      : 300 + (totalDays - 1) * 500
    : tripType === "Airport Pick-Up & Drop"
    ? distance > 60
      ? 300
      : 0
    : 0;

  const advanceAmount = 1;

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [phone, setPhone] = useState("+91");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const [pickup, setPickup] = useState(pickupParam || "");
  const [drop, setDrop] = useState(dropParam);
  const [gender, setGender] = useState("");

  const [passengers, setPassengers] = useState("1");
  const [luggage, setLuggage] = useState("0");
  const [whatsapp, setWhatsapp] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [pickupDetails, setPickupDetails] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  const [errors, setErrors] = useState({});

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const genderRef = useRef(null);

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const [couponCode, setCouponCode] = useState("");

  const [couponLoading, setCouponLoading] =
  useState(false);

  const [couponApplied, setCouponApplied] =
  useState(false);

  const [discountAmount, setDiscountAmount] =
  useState(0);

  const [showCouponSuccess, setShowCouponSuccess] = useState(false);

  const [checkingOffer, setCheckingOffer] = useState(false);

  const [showBookingSummary, setShowBookingSummary] = useState(false);

  const [loadingBooking, setLoadingBooking] = useState(false);

  const [showFareBreakdown, setShowFareBreakdown] = useState(false);

  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // ================= TITLE CASE FUNCTION =================

const toTitleCase = (text) => {
  return text
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");
};

  const copyCoupon = async () => {
  try {
    await navigator.clipboard.writeText(couponCode);
    setCopiedCoupon(true);

    setTimeout(() => {
      setCopiedCoupon(false);
    }, 2000);
  } catch (error) {
    console.log(error);
  }
};

  const [customerType, setCustomerType] = useState("");

const [customerInfo, setCustomerInfo] = useState(null);

const [checkingCustomer, setCheckingCustomer] = useState(false);

  // Vehicle Fare
  const vehicleFare = baseFare;

// Coupon sirf Vehicle Fare par lagega
  const discountedVehicleFare = Math.max(
  vehicleFare - discountAmount,
  0
  );

// Current Charges
  const tollAmount = toll; // Future: Map API se actual toll
  const petRideCharge = petRide ? 500 : 0;

// Grand Total
  const finalFare =
  discountedVehicleFare +
  driverAllowance +
  tollAmount +
  petRideCharge;

  const checkCustomer = async (mobileNumber) => {

  // Sirf exactly 10 digit Indian mobile par hi coupon check hoga
  if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
  setCustomerType("");
  setCustomerInfo(null);

  setCouponApplied(false);
  setCouponCode("");
  setDiscountAmount(0);

  return;
  }

  try {
    setCheckingCustomer(true);

    const res = await fetch("/api/customer/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      mobile: mobileNumber,
      distance: displayDistance,
      tripType,
      }),
    });

    const data = await res.json();

    if (!data.success) return;

    setCustomerType(data.customerType);

    setCustomerInfo(data.customer);

  if (data.customer?.couponCode) {

  setCouponCode(data.customer.couponCode);

  setDiscountAmount(data.customer.couponDiscount || 0);

  setCouponApplied(true);

  // Popup tabhi dikhao jab number valid ho
  if (/^[6-9]\d{9}$/.test(mobileNumber)) {
  setCheckingOffer(true);

  setTimeout(() => {
    setCheckingOffer(false);
    setShowCouponSuccess(true);
  }, 2500);
}
  
  }

  } catch (error) {
    console.log(error);
  } finally {
    setCheckingCustomer(false);
  }
};

  const handleApplyCoupon = async (
  code = couponCode,
  customerMobile = mobile
  ) => {

  if (!code) {
  alert("Enter coupon code");
  return;
}

  if (!customerMobile) {
    alert("Please enter mobile number first");
    return;
  }

  try {

    setCouponLoading(true);

    const res = await fetch(
      "/api/coupon/validate",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
        couponCode: code,
        mobile: customerMobile,
        }),
      }
    );

    const data = await res.json();

    console.log("Coupon Validate Response:", data);

    if (!data.success) {

      alert(data.message);

      setCouponApplied(false);

      setDiscountAmount(0);

      return;
    }

    setCouponApplied(true);

    setDiscountAmount(
      data.discount
    );

    setShowCouponSuccess(true);

  } catch (error) {

    console.log(error);

    alert(
      "Failed to apply coupon"
    );

  } finally {

    setCouponLoading(false);

  }
};

const openRazorpayCheckout = async () => {

  try {

    setLoadingBooking(true);

    const bookingData = {
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

      baseFare,
      driverAllowance,

      paymentType,

      totalFare: finalFare,

      couponCode,
      couponDiscount: discountAmount,
      couponApplied,

      advancePaid:
        paymentType === "partial"
          ? advanceAmount
          : finalFare,

      remainingAmount:
        paymentType === "partial"
          ? Math.max(finalFare - advanceAmount, 0)
          : 0,

      payableAmount:
        paymentType === "partial"
          ? advanceAmount
          : finalFare,

      paymentStatus: "Pending",
    };

    // Save Booking
    const bookingRes = await fetch("/api/save-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    const bookingResult = await bookingRes.json();

    console.log("BOOKING RESULT:", bookingResult);

    if (!bookingResult.success) {
      alert(bookingResult.message);
      return;
    }

    bookingData.bookingId = bookingResult.bookingId;

    localStorage.setItem(
    "bookingData",
    JSON.stringify(bookingData)
    );

    // Create Razorpay Order
    const orderRes = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount:
          paymentType === "partial"
            ? advanceAmount
            : finalFare,
      }),
    });

    const order = await orderRes.json();

    if (!order.success) {
      alert("Unable to create Razorpay Order");
      return;
    }

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: "RC Tours & Travels",
      description: "Cab Booking",
      order_id: order.id,

      handler: function (response) {

      alert("Payment Successful");

      window.location.href =
      "/booking-success?bookingId=" +
      bookingResult.bookingId;
      },

      prefill: {
        name,
        email,
        contact: mobile,
      },

      theme: {
        color: "#2563eb",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.open();

  } catch (error) {

    console.log(error);

    alert("Payment Failed");

  } finally {

    setLoadingBooking(false);

  }
};

  const handleProceed = async () => {

    const newErrors = {};

if (!name) newErrors.name = "Name is required.";

if (!mobile) newErrors.mobile = "Mobile Number is required.";

if (!gender) newErrors.gender = "Please select gender.";

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) {

  if (newErrors.name && nameRef.current) {

    nameRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    nameRef.current.focus();

  } else if (newErrors.gender && genderRef.current) {

    genderRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  } else if (newErrors.mobile && mobileRef.current) {

    mobileRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  }

  return;
}

if (Object.keys(newErrors).length > 0) {
  return;
}

    if (!confirmed) {
      alert(
        "Please confirm passenger and trip details before proceeding."
      );
      return;
    }

    setShowBookingSummary(true);
    return;

    const bookingData = {

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

    baseFare,
    driverAllowance,

    paymentType,

    totalFare: finalFare,

    couponCode,

    couponDiscount: discountAmount,

    couponApplied,

    advancePaid:
    paymentType === "partial"
    ? advanceAmount
    : finalFare,

    remainingAmount:
    paymentType === "partial"
    ? Math.max(finalFare - advanceAmount,0)
:   0,

    payableAmount:
    paymentType === "partial"
    ? advanceAmount
    : finalFare,

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
  <>
    <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="lazyOnload"
    />

    <main className="bg-slate-100 min-h-screen pt-16 md:pt-32">


      <div className="max-w-7xl mx-auto px-3 md:px-4">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 md:gap-6">

          {/* Left Side */}
          <div>

      {/* Booking Card */}

      <div>

      <MobileBookingCard
      vehicle={vehicle}
    vehicleImage={vehicleImage}
    vehicleCategory={vehicleCategory[vehicle]}
    tripType={tripType}
    pickup={pickup}
    drop={drop}
    pickupDate={pickupDate}
    returnDate={returnDate}
    pickupTime={pickupTime}
    distance={displayDistance}
    passengers={passengers}
    luggage={luggage}
  />

</div>
            
{/* ================= DESKTOP CAR DETAILS ================= */}

<div className="hidden lg:block bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 max-w-[960px]">

  <div className="grid lg:grid-cols-[280px_1fr]">

    {/* ================= LEFT SIDE ================= */}

    <div className="bg-white border-r border-gray-200 flex flex-col items-center justify-center px-5 py-5">

      <Image
        src={vehicleImage}
        alt={vehicle}
        width={220}
        height={140}
        loading="eager"
        className="object-contain w-full max-w-[210px] h-auto"
      />

      <div className="w-full mt-8">

        <div className="bg-[#dcd8ff] text-gray-800 text-center rounded-2xl py-3 text-2xl font-semibold">

          {vehicleCategory[vehicle] || "Sedan"}

        </div>

      </div>

    </div>

    {/* ================= RIGHT SIDE ================= */}

    <div className="p-4">

      {/* Vehicle Header */}

      <div className="flex items-center gap-2">

        <h1 className="text-[30px] font-extrabold leading-none text-gray-900">

          {vehicle || "Cab Selected"}

        </h1>

        <span className="text-yellow-500 text-2xl">
          ★
        </span>

        <span className="text-[14px] text-gray-700">

          4.5 star ratings

        </span>

      </div>

      {/* Trip Type Ribbon */}

      <div className="mt-5">

        <div className="inline-block bg-[#dcd8ff] text-black font-bold text-base px-6 py-2 rounded-tr-2xl [clip-path:polygon(0_0,88%_0,100%_100%,0_100%)]">

          {tripType}

        </div>

      </div>

      {/* Pickup & Drop Box */}

      <div className="bg-[#f5f4ff] rounded-r-2xl rounded-bl-2xl border border-[#ebe8ff] overflow-hidden">

        <div className="grid grid-cols-2">

          {/* Pickup */}

          <div className="px-6 py-6">

            <h2 className="text-[18px] font-bold text-gray-900 mb-3">

              Pickup

            </h2>

            <p className="text-[15px] leading-7 text-gray-600">

              {pickup}

            </p>

            <div className="mt-5 space-y-2">

              <p className="flex items-center gap-2 text-[15px] text-gray-700">

                📅 <span>{pickupDate}</span>

              </p>

              <p className="flex items-center gap-2 text-[15px] text-gray-700">

                🕒 <span>{pickupTime || "Not Selected"}</span>

              </p>

            </div>

          </div>

          {/* Drop */}

          <div className="border-l border-gray-300 px-6 py-6">

            <h2 className="text-[18px] font-bold text-gray-900 mb-3">

              Drop-Off

            </h2>

            <p className="text-[15px] leading-7 text-gray-600">

              {drop}

            </p>

          </div>

        </div>

      </div>

      {/* Amenities */}

      <div className="flex items-center gap-3 mt-6 flex-nowrap overflow-hidden">

      <span className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[15px] text-gray-800 whitespace-nowrap">
      <LuBriefcase className="text-gray-500 text-[18px]" />
      <span>Tissues</span>
      </span>

      <span className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[15px] text-gray-800 whitespace-nowrap">
      <MdOutlineSanitizer className="text-gray-500 text-[18px]" />
      <span>Sanitiser</span>
      </span>

      <span className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[15px] text-gray-800 whitespace-nowrap">
      <LuSprayCan className="text-gray-500 text-[18px]" />
      <span>Car Freshner</span>
      </span>

      <span className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 text-[15px] text-gray-800 whitespace-nowrap">
      <LuFuel className="text-gray-500 text-[18px]" />
      <span>Petrol/Diesel/Cng</span>
      </span>

      </div>

    </div>

  </div>

</div>

            {/* Mobile Inclusions & Exclusions */}

<div className="md:hidden bg-white rounded-3xl shadow-lg p-5 mt-3">

  {/* Inclusions */}

  <div>

    <h2 className="text-xl font-bold">
      Inclusions
      <span className="text-xs text-gray-500 font-normal ml-2">
        (Included in the price)
      </span>
    </h2>

    <ul className="mt-3 space-y-2 text-[15px] text-gray-700">

      <li>• Fuel Charges</li>

      <li>• Driver Allowance</li>

      <li>• Toll Charges</li>

      <li>• {displayDistance} KM Included</li>

    </ul>

  </div>

  <hr className="my-5" />

  {/* Exclusions */}

  <div>

    <h2 className="text-xl font-bold">
      Exclusions
      <span className="text-xs text-gray-500 font-normal ml-2">
        (Not included in the price)
      </span>
    </h2>

    <ul className="mt-3 space-y-3 text-[15px] text-gray-700">

      <li>• Parking Charges</li>

      <li>• State Tax</li>

      <li className="flex justify-between">

  <span>• Extra Distance</span>

  <span className="font-medium text-right">

    {tripType === "One Way"
      ? `After ${displayDistance} KM @ Vehicle Rate / KM`
      : tripType === "Outstation Trip"
      ? totalDays === 1
        ? "After 300 KM @ Vehicle Rate / KM"
        : `After ${totalDays * 300} KM @ Vehicle Rate / KM`
      : "As Per Package"}

  </span>

</li>

  <li className="flex justify-between">

  <span>• Extra Time</span>

  <span className="font-medium text-right">

    {tripType === "One Way"
      ? "After 45 Min ₹100 / 30 Min"
      : tripType === "Outstation Trip"
      ? "After 12:00 AM ₹500 / Hour"
      : "As Per Package"}

  </span>

</li>

    </ul>

  </div>

</div>

      {/* Mobile Choose Extra */}

      <div className="mt-6 lg:hidden ml-2">

      <h2 className="text-2xl font-bold mb-4 ml-2">
      Choose Extra
      </h2>

      <div className="bg-white rounded-2xl shadow-lg p-5 w-full">

      {/* Title */}
      <h3 className="text-xl font-semibold mb-5">
      Pet Friendly Ride
      </h3>

      {/* Option */}
      <label className="flex items-center justify-between border-t pt-4 cursor-pointer">

      {/* Left */}
      <div className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={petRide}
          onChange={(e) => setPetRide(e.target.checked)}
          className="w-5 h-5"
        />

        <span className="text-lg font-medium">
          Pet
        </span>

      </div>

      {/* Right */}
      <div className="text-right">

        <span className="text-2xl font-semibold text-gray-700">
          ₹500.00
        </span>

        <p className="text-xs text-gray-500">
          per day
        </p>

      </div>

    </label>

  </div>

</div>

{/* ================= DESKTOP CAR DETAILS END ================= */}

{/* Inclusions & Exclusions */}
<div className="hidden lg:grid grid-cols-2 gap-0 mt-6 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

  {/* Inclusions */}
  <div className="p-7">

    <div className="flex items-baseline gap-2 mb-5">

      <h2 className="text-[22px] font-bold text-gray-900">
        Inclusions
      </h2>

      <span className="text-[14px] text-gray-500">
        (Included in the price)
      </span>

    </div>

    <ul className="space-y-3 text-[15px] text-gray-700">

      <li>• Fuel Charges</li>

      <li>• Driver Allowance</li>

      <li>• Toll Included</li>

      <li>• {displayDistance} KM Included</li>

    </ul>

  </div>

  {/* Exclusions */}
  <div className="border-l border-gray-300 p-7">

    <div className="flex items-baseline gap-2 mb-5">

      <h2 className="text-[22px] font-bold text-gray-900">
        Exclusions
      </h2>

      <span className="text-[14px] text-gray-500">
        (Not included in the price)
      </span>

    </div>

    <ul className="space-y-3 text-[15px] text-gray-700">

      <li>• Parking Charges</li>

      <li>• State Tax</li>

      <li className="flex justify-between">

  <span>• Extra Distance</span>

  <span className="font-medium">

    {tripType === "One Way"
      ? `After ${displayDistance} KM @ Vehicle Rate / KM`
      : tripType === "Outstation Trip"
      ? totalDays === 1
        ? "After 300 KM @ Vehicle Rate / KM"
        : `After ${totalDays * 300} KM @ Vehicle Rate / KM`
      : "As Per Package"}

  </span>

</li>

<li className="flex justify-between">

  <span>• Extra Time</span>

  <span className="font-medium">

    {tripType === "One Way"
      ? "After 45 Min ₹100 / 30 Min"
      : tripType === "Outstation Trip"
      ? "After 12:00 AM ₹500 / Hour"
      : "As Per Package"}

  </span>

</li>

    </ul>

  </div>

</div>

{/* ================= DESKTOP CHOOSE EXTRA ================= */}

<div className="hidden lg:block mt-6">

  <h2 className="text-3xl font-bold mb-6">
  Choose Extras
</h2>

  <div className="grid grid-cols-2 gap-6 items-stretch">

{/* ================= PET FRIENDLY RIDE ================= */}

<div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 min-h-[240px] flex flex-col">

  <h3 className="text-[28px] font-bold text-gray-900">
    Pet
  </h3>

  <p className="mt-2 text-[15px] leading-7 text-gray-500">

    Traveling with your pet? Add a pet-friendly option for a
    comfortable and safe ride for both you and your furry friend!

  </p>

  <label className="flex items-center gap-5 mt-4 cursor-pointer">

    <input
      type="checkbox"
      checked={petRide}
      onChange={(e) => setPetRide(e.target.checked)}
      className="w-6 h-6 accent-blue-600"
    />

    <div className="flex items-center gap-2">

    <span className="text-[28px] font-bold text-gray-700">
    ₹500.00
    </span>

    <span className="text-sm text-gray-500">
    Per Day
    </span>

  </div>

  </label>

</div>

    {/* ================= RC TOURS DISCOUNT ================= */}

    <div
      className="
      relative
      rounded-2xl
      border
      border-green-200
      bg-gradient-to-r
      from-green-50
      via-white
      to-emerald-50
      shadow
      p-5
      flex
      flex-col
      justify-between
      "
    >

      <span
        className="
        inline-block
        w-fit
        bg-indigo-100
        text-indigo-700
        text-[11px]
        font-bold
        px-3
        py-1
        rounded-full
        "
      >
        🎁 EXCLUSIVE OFFER
      </span>

      <div className="flex items-center gap-4 mt-4">

        {/* Gift */}

        <div className="text-5xl shrink-0">
          🎁
        </div>

        {/* Content */}

        <div className="flex-1">

          <h3 className="text-2xl font-bold text-green-700">
            RC Tours Discount
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-700">

            {couponApplied
              ? "Your exclusive discount has been applied successfully."
              : "Complete passenger details and mobile verification to unlock your discount."}

          </p>

        </div>

      </div>

      {/* Bottom Offer */}

      <div className="mt-4 bg-green-100 rounded-xl px-4 py-3 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <span className="text-lg">
            🏷️
          </span>

          <span className="font-semibold text-green-700 text-sm">
           Your Special Booking Discount is Ready
          </span>

        </div>

        <span className="text-xl text-green-700">
          ›
        </span>

      </div>

    </div>

  </div>

</div>

{/* Mobile Coupon Section */}
<div className="lg:hidden mt-6">

  <div className="bg-white rounded-2xl shadow-lg p-5">

    <h2 className="text-xl font-bold mb-4">
      Enter Coupon Code
    </h2>

    <div className="flex items-center border rounded-xl overflow-hidden">

      <input
        type="text"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Enter offer code"
        className="flex-1 h-12 px-4 outline-none"
      />

      <button
        onClick={handleApplyCoupon}
        disabled={couponLoading}
        className="px-5 text-indigo-500 font-semibold"
      >
        {couponLoading ? "..." : "Apply"}
      </button>

    </div>

  </div>

</div>

  {/* Mobile Fare Summary */}

<div className="hidden lg:hidden mt-6">

  <div className="bg-white rounded-2xl shadow-lg p-4">

    <div className="bg-blue-600 text-white rounded-xl p-3 text-center font-bold">
      Free Cancellation Available
    </div>

    <div className="mt-4 space-y-3">

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

      {couponApplied && (
  <div className="flex justify-between text-green-600 font-semibold">
    <span>Coupon Discount</span>
    <span>-₹{discountAmount}</span>
  </div>
  )}

  {couponApplied && (
  <div className="flex justify-between text-blue-700 font-semibold">
    <span>You Saved</span>
    <span>₹{discountAmount}</span>
  </div>
)}

    </div>

    <hr className="my-4" />

    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>
      <span>₹{finalFare}</span>
    </div>


      {/* Discount Unlock Message */}

      <div
      className="
      mt-5
      bg-gradient-to-r
      from-green-50
      to-blue-50
      border
      border-green-300
      rounded-2xl
      p-4
      "
      >

      {couponApplied ? (

      <>

      <h3 className="text-lg font-bold text-green-700">
      ✅ Discount Applied Successfully
      </h3>

      <p className="mt-2 text-gray-700">

      {customerType === "new"
      ? "🎉 Welcome! Your New Customer Discount has been applied."
      : "💙 Welcome Back! Your Returning Customer Discount has been applied."}

      </p>

      <div
      className="
      mt-4
      bg-white
      rounded-xl
      p-4
      text-center
      "
      >

      <p className="text-gray-500">
      You Saved
      </p>

      <p className="text-4xl font-bold text-green-600">
      ₹{discountAmount}
      </p>

      </div>

      </>

      ) : (

      <>

      <h3 className="text-lg font-bold text-green-700">
      🎁 Unlock Your RC Tours Discount
      </h3>

      <p className="mt-2 text-gray-700">
      Complete passenger details to unlock your distance based RC Tours discount.
      </p>

      <div
      className="
      mt-3
      bg-white
      rounded-xl
      p-3
      text-blue-700
      font-semibold
      "
      >

      ✨ New Customer & Returning Customer benefits available

      </div>

      </>

      )}

      </div>


    {/* Mobile Payment Option */}

    <hr className="my-5" />


    <div>

    <h3 className="font-bold text-lg mb-3">
    Payment Option
    </h3>


    <label className="flex justify-between items-center bg-green-50 p-3 rounded-xl mb-3">

    <div>
    <p className="font-bold">
    Pay Advance Amount
    </p>

    <p className="text-sm text-gray-600">
    Pay ₹{advanceAmount} now
    </p>

    </div>


    <input
    type="radio"
    name="mobilePayment"
    checked={paymentType==="partial"}
    onChange={() =>
    setPaymentType("partial")
    }
    />

    </label>



<label className="flex justify-between items-center bg-blue-50 p-3 rounded-xl">

<div>

<p className="font-bold">
Pay Full Amount
</p>

<p className="text-sm text-gray-600">
Complete payment now
</p>

</div>


<input
type="radio"
name="mobilePayment"
checked={paymentType==="full"}
onChange={() =>
setPaymentType("full")
}
/>


</label>


</div>  

  </div>

</div>

{/* ================= DESKTOP & MOBILE PASSENGER DETAILS ================= */}

<div className="w-full">
  <div className="bg-white rounded-3xl shadow-lg mt-6 overflow-hidden">

    {/* Header */}
    <div className="px-6 py-5 border-b">
      <h2 className="text-2xl font-bold">
        Trip Details
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Please enter your journey details
      </p>
    </div>

    {/* Body */}
    <div className="p-5 lg:p-8 space-y-5">

      {/* DESKTOP GRID CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-5">

        {/* Pickup */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Pick-up Address
          </label>
          <input
            type="text"
            value={pickup}
            readOnly
            className="w-full h-11 rounded-lg border border-gray-200 bg-gray-100 px-3 text-sm text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Drop */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Drop-off Address
          </label>
          <input
            type="text"
            value={drop}
            readOnly
            className="w-full h-11 rounded-lg border border-gray-200 bg-gray-100 px-3 text-sm text-gray-700 cursor-not-allowed"
          />
        </div>

        {/* Exact Pickup */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Exact Pickup Details
            <span className="text-gray-400"> (Optional)</span>
          </label>
          <input
            type="text"
            value={pickupDetails}
            onChange={(e) => setPickupDetails(e.target.value)}
            onBlur={() => {
              setPickupDetails(toTitleCase(pickupDetails));
            }}
            placeholder="Enter Pickup Location"
            className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            ref={nameRef}
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: "" }));
              }
            }}
            onBlur={() => {
              setName(toTitleCase(name));
            }}
            placeholder="Enter your name"
            className={`w-full h-11 rounded-lg px-3 text-sm ${
              errors.name ? "border border-red-500" : "border border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Contact Number */}
<div>
  <label className="block text-sm font-medium mb-2">
    Contact Number
  </label>

  <PhoneInput
    international
    defaultCountry="IN"
    value={phone}
    onChange={(value) => {
      setPhone(value || "");

      let onlyNumber = (value || "").replace(/\D/g, "");

      // Country code remove
      if (onlyNumber.startsWith("91") && onlyNumber.length > 10) {
        onlyNumber = onlyNumber.slice(-10);
      }

      setMobile(onlyNumber);

      // Typing ke time coupon reset
      setCouponApplied(false);
      setCouponCode("");
      setDiscountAmount(0);

      // ❌ Yahan checkCustomer() call mat karo
    }}
    onBlur={() => {
      // Field se bahar aane ke baad hi customer check hoga
      if (/^[6-9]\d{9}$/.test(mobile)) {
        checkCustomer(mobile);
      }
    }}
    className={`rounded-xl px-3 py-3 bg-white ${
      errors.mobile
        ? "border border-red-500"
        : "border border-gray-300"
    }`}
  />

  {errors.mobile && (
    <p className="text-red-500 text-xs mt-1">
      {errors.mobile}
    </p>
  )}
</div>

{/* Gender */}
<div ref={genderRef} className="lg:col-span-2">
  <label className="block text-sm font-medium mb-2">
    Gender
  </label>

  <div className="flex items-center gap-6">
    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
      <input
        type="radio"
        name="gender-desktop"
        value="Male"
        checked={gender === "Male"}
        onChange={(e) => {
          setGender(e.target.value);
          if (errors.gender) {
            setErrors((prev) => ({ ...prev, gender: "" }));
          }
        }}
        className="w-5 h-5"
      />
      <span className="text-sm">Male</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="gender-desktop"
        value="Female"
        checked={gender === "Female"}
        onChange={(e) => {
          setGender(e.target.value);
          if (errors.gender) {
            setErrors((prev) => ({ ...prev, gender: "" }));
          }
        }}
        className="w-5 h-5"
      />
      <span className="text-sm">Female</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="gender-desktop"
        value="Other"
        checked={gender === "Other"}
        onChange={(e) => {
          setGender(e.target.value);
          if (errors.gender) {
            setErrors((prev) => ({ ...prev, gender: "" }));
          }
        }}
        className="w-5 h-5"
      />
      <span className="text-sm">Others</span>
    </label>
  </div>

  {errors.gender && (
    <p className="mt-2 text-sm text-red-600">
      {errors.gender}
    </p>
  )}
</div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              setEmail(email.trim().toLowerCase());
            }}
            placeholder="Enter Email"
            className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm"
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium mb-2">
            WhatsApp Number (Optional)
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="Enter WhatsApp Number"
            className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm"
          />
        </div>

        {/* Passengers */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Passengers
          </label>
          <select
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm bg-white"
          >
            {Array.from({ length: 50 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} Passenger{i > 0 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {/* Luggage */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Luggage
          </label>
          <select
            value={luggage}
            onChange={(e) => setLuggage(e.target.value)}
            className="w-full h-11 rounded-lg border border-gray-300 px-3 text-sm bg-white"
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
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2">
            Remark (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            onBlur={() => {
              setNotes(toTitleCase(notes));
            }}
            placeholder="Enter Remark (Optional)"
            className="w-full h-12 border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none"
          />
        </div>

      </div>{/* End of Desktop Grid */}


      {/* ================= MOBILE CONFIRMATION SECTION ================= */}
      <div className="lg:hidden mt-6">
        <div className="bg-white rounded-3xl shadow-lg p-4">
          <h2 className="text-xl font-bold mb-4">
            Booking Confirmation
          </h2>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 h-[20px] w-[20px] shrink-0 accent-blue-600"
            />
            <span className="text-sm text-gray-700 leading-6">
              I confirm that all passenger and trip details are correct.
            </span>
          </label>

          {/* Privacy Policy */}
          <div className="mt-5 space-y-4">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 h-[20px] w-[20px] shrink-0 accent-blue-600"
              />
              <span className="text-sm text-gray-700 leading-6">
                By proceeding to book, I agree to RC Tours Privacy Policy,
                User Agreement and Terms & Conditions.
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                defaultChecked
                className="mt-1 h-[20px] w-[20px] shrink-0 accent-blue-600"
              />
              <span className="text-sm text-gray-700">
                Use Pickup Address as Billing Address
              </span>
            </label>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            disabled={!confirmed}
            className={`w-full mt-4 py-3 rounded-xl text-base font-bold transition-all ${
              confirmed
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {confirmed
              ? "Confirm Details & Proceed To Payment"
              : "Please Confirm Booking Details"}
          </button>
        </div>
      </div>


      {/* ================= DESKTOP CONFIRMATION & REVIEW ================= */}

      <div className="hidden lg:block space-y-4 pt-4 border-t">

  {/* Confirmation */}
  <label className="flex items-start gap-3 cursor-pointer">

    <input
  type="checkbox"
  checked={confirmed}
  onChange={(e) => {
    const checked = e.target.checked;

    setConfirmed(checked);

    if (checked) {
      setTimeout(() => {
        setShowBookingSummary(true);
      }, 100);
    } else {
      setShowBookingSummary(false);
    }
  }}
  className="mt-1 w-5 h-5 accent-blue-600"
/>

    <span className="text-sm text-gray-700">
      I confirm that all passenger and trip details are correct.
    </span>

  </label>

  {/* Privacy Policy */}

  <label className="flex items-start gap-3 cursor-pointer">

    <input
      type="checkbox"
      defaultChecked
      className="mt-1 w-5 h-5 accent-blue-600"
    />

    <span className="text-sm text-gray-700 leading-6">
      By proceeding to book, I agree to RC Tours Privacy Policy,
      User Agreement and Terms & Conditions.
    </span>

  </label>

  {/* Billing Address */}

  <label className="flex items-start gap-3 cursor-pointer">

    <input
      type="checkbox"
      defaultChecked
      className="mt-1 w-5 h-5 accent-blue-600"
    />

    <span className="text-sm text-gray-700">
      Use Pickup Address as Billing Address
    </span>

  </label>

</div>

    </div>   {/* Body End */}

  </div>     {/* Card End */}

</div>       {/* Wrapper End */}


          {/* Right Sidebar */}
          </div>

          <div className="hidden lg:block">

        <div className="bg-white rounded-3xl shadow-lg lg:sticky lg:top-28 overflow-visible">

  {/* Header */}
  <div className="bg-blue-600 text-white text-center py-5 px-5">
    <h3 className="text-2xl font-bold">
      Free Cancellation Available
    </h3>

    <p className="text-sm text-blue-100 mt-2">
      Book your cab with confidence
    </p>
  </div>

  {/* Body */}
  <div className="p-6">

    {/* Pay Button */}
    <button
    onClick={handleProceed}
    disabled={!confirmed}
    className={`w-full rounded-xl py-3 text-2xl font-bold transition ${
    confirmed
      ? "bg-orange-500 hover:bg-orange-600 text-white"
      : "bg-gray-400 text-white cursor-not-allowed"
      }`}
    >
    Pay ₹{paymentType === "partial" ? advanceAmount : finalFare} Now
    </button>

    {/* Payment Options */}

    <div className="mt-4 space-y-2">

      <label className="flex justify-between items-center cursor-pointer py-2">

        <div className="flex gap-4">

          <input
            type="radio"
            name="payment"
            checked={paymentType === "partial"}
            onChange={() => setPaymentType("partial")}
            className="mt-2 w-5 h-5 accent-blue-600"
          />

          <div>

            <h3 className="text-base font-semibold">
              Pay Partial Amount
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Pay the remaining amount after trip.
            </p>

          </div>

        </div>

        <span className="font-bold text-4xl">
          ₹{advanceAmount}
        </span>

      </label>

      <hr className="my-2" />

      <label className="flex justify-between items-start cursor-pointer">

        <div className="flex gap-4">

          <input
            type="radio"
            name="payment"
            checked={paymentType === "full"}
            onChange={() => setPaymentType("full")}
            className="mt-2 w-5 h-5 accent-blue-600"
          />

          <div>

            <h3 className="text-base font-semibold">
              Pay Full Amount
            </h3>

            <p className="text-gray-500 text-xs mt-1 leading-5">
              Complete payment now.
            </p>

          </div>

        </div>

        <span className="font-bold text-4xl">
          ₹{finalFare}
        </span>

      </label>

    </div>

        <hr className="my-5" />

    {/* Total Amount */}

    <div className="flex justify-between items-start">

      <div>

        <p className="text-[18px] font-semibold text-gray-800">
        Total Amount
        </p>

      </div>

      <div className="relative inline-block group">

  <h2 className="text-[18px] font-semibold text-gray-800">
  ₹{finalFare}
</h2>

<button
  type="button"
  className="mt-2 text-[14px] font-medium text-blue-600 hover:underline"
>
  Fare Breakup
</button>

<div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 hidden group-hover:block z-[99999]">

  <div className="relative bg-[#2f2f2f] rounded-md shadow-2xl px-4 py-3 w-72">

    {/* Arrow */}
    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-[#2f2f2f] rotate-45"></div>

    <div className="space-y-2 text-[15px] text-white">

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
        <div className="flex justify-between">
          <span>Pet Friendly Ride</span>
          <span>₹500</span>
        </div>
      )}

      {couponApplied && (
        <div className="flex justify-between text-green-400">
          <span>Coupon Discount</span>
          <span>-₹{discountAmount}</span>
        </div>
      )}

      <hr className="border-gray-600" />

      <div className="flex justify-between font-semibold">
        <span>Total Fare</span>
        <span>₹{finalFare}</span>
      </div>

    </div>

  </div>

</div>   {/* Tooltip */}

</div>   {/* Relative */}

</div>   {/* Total Amount */}

    {/* Coupon */}

    <div className="mt-5">

      <h3 className="text-[18px] font-semibold text-gray-800 mb-3">
      Available Coupons
      </h3>

      <div className="flex border rounded-xl overflow-hidden">

        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon Code"
          className="flex-1 px-4 py-3 outline-none"
        />

        <button
          onClick={handleApplyCoupon}
          disabled={couponLoading}
          className="px-5 font-semibold text-blue-600"
        >
          {couponLoading ? "..." : "Apply"}
        </button>

      </div>

      {couponApplied && (

        <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">

          <div className="flex justify-between">

            <span className="font-semibold text-green-700">
              Coupon Applied
            </span>

            <span className="font-bold text-green-700">
              -₹{discountAmount}
            </span>

          </div>

        </div>

      )}

    </div>   {/* Coupon */}

</div>     {/* Body */}

</div>     {/* Sidebar Card */}

</div>     {/* hidden lg:block */}

</div>     {/* Main Grid */}

</div>     {/* Main Container */}


{/* Review Booking */}
{showBookingSummary && (
<div className="fixed inset-0 z-[9998] bg-black/60 flex items-center justify-center p-4">
  <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

    {/* Header */}
    <div className="bg-blue-600 text-white p-5 flex-shrink-0">
      <h2 className="text-2xl font-bold">
        Review Booking
      </h2>
      <p className="text-blue-100 mt-1">
        Please verify your booking details before payment.
      </p>
    </div>

    {/* Body */}
    <div className="p-4 md:p-6 space-y-5 overflow-y-auto flex-1 bg-gray-50/50">

{/* ================= VEHICLE SUMMARY ================= */}
<div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">

  <div className="flex flex-col md:flex-row gap-6 items-center">

    {/* Vehicle Image */}
    <div className="w-full md:w-1/3 flex flex-col items-center justify-center">

      <div className="w-full h-28 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden">

  <Image
    src={vehicleImage}
    alt={vehicle}
    width={220}
    height={120}
    className="object-contain max-w-[180px] max-h-[110px]"
  />

</div>

      <div className="w-full mt-3 bg-indigo-100 text-indigo-700 py-2 rounded-xl text-center font-bold text-sm">
        {vehicle}
      </div>

    </div>

    {/* Vehicle Details */}
    <div className="w-full md:w-2/3 flex flex-col justify-between">

      <div>

        <div className="flex flex-wrap items-center justify-between gap-2">

          <h3 className="text-xl font-bold text-gray-900">
            {vehicle} Or Similar
          </h3>

          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            ★ 4.5 Star Rating
          </span>

        </div>

        <div className="inline-block bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-lg mt-3">
          {tripType}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">

          <div className="border-r border-gray-200 pr-3">

            <p className="text-xs uppercase font-bold text-gray-400">
              Pickup
            </p>

            <p className="text-sm font-semibold mt-1 text-gray-800">
              {pickup}
            </p>

            <p className="text-xs text-gray-500 mt-3">
              📅 {pickupDate}
            </p>

            <p className="text-xs text-gray-500">
              🕒 {pickupTime}
            </p>

          </div>

          <div>

            <p className="text-xs uppercase font-bold text-gray-400">
              Drop-Off
            </p>

            <p className="text-sm font-semibold mt-1 text-gray-800">
              {drop}
            </p>

            <p className="text-xs text-gray-500 mt-6">
              📍 {displayDistance} KM
            </p>

          </div>

        </div>

      </div>

      {/* Amenities */}

      <div className="flex flex-wrap gap-2 mt-5">

        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
          🧻 Tissues
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
          🧴 Sanitiser
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
          🍃 Car Freshner
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium">
          ⛽ Petrol / Diesel / CNG
        </span>

      </div>

    </div>

  </div>

</div>

      {/* ================= PASSENGER DETAILS ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100">
            👤
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Passenger Details
            </h3>
            <p className="text-sm text-gray-500">
              Passenger Information
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Name
            </p>
            <p className="font-bold text-gray-800 mt-1 break-words">
              {name || "-"}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Mobile
            </p>
            <p className="font-bold text-gray-800 mt-1 break-all">
              +91 {mobile || "-"}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Gender
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {gender || "-"}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase">
              Passengers
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {passengers}
            </p>
          </div>
        </div>
      </div>

      {/* ================= JOURNEY DETAILS ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl border border-emerald-100">
            🚖
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Journey Details
            </h3>
            <p className="text-sm text-gray-500">
              Trip Information
            </p>
          </div>
        </div>

        <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100 mb-4">
          <div className="flex gap-4">
            <div className="flex flex-col items-center pt-1">
              <div className="w-3.5 h-3.5 rounded-full bg-green-500 ring-4 ring-green-100"></div>
              <div className="w-0.5 flex-1 bg-gray-300 my-2"></div>
              <div className="w-3.5 h-3.5 rounded-full bg-red-500 ring-4 ring-red-100"></div>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <p className="text-xs uppercase font-bold text-gray-400">
                  Pickup
                </p>
                <p className="font-bold text-gray-800 mt-0.5 break-words text-sm">
                  {pickup}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase font-bold text-gray-400">
                  Drop
                </p>
                <p className="font-bold text-gray-800 mt-0.5 break-words text-sm">
                  {drop}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase font-bold text-gray-400">
              Vehicle
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {vehicle}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase font-bold text-gray-400">
              Trip Type
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {tripType}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase font-bold text-gray-400">
              Journey Date
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {pickupDate}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase font-bold text-gray-400">
              Pickup Time
            </p>
            <p className="font-bold text-gray-800 mt-1">
              {pickupTime}
            </p>
          </div>
        </div>
      </div>

      {/* ================= FARE SUMMARY ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl border border-amber-100">
            💳
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Fare Summary
            </h3>
            <p className="text-sm text-gray-500">
              Complete Fare Breakdown
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Base Fare</span>
            <span className="font-semibold text-gray-800">₹{baseFare}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Driver Allowance</span>
            <span className="font-semibold text-gray-800">₹{driverAllowance}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Toll Charges</span>
            <span className="font-semibold text-gray-800">₹{toll}</span>
          </div>

          {petRide && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pet Friendly Ride</span>
              <span className="font-semibold text-gray-800">₹500</span>
            </div>
          )}

          <div className="border-t border-gray-200 pt-3 flex justify-between font-bold text-sm text-gray-800">
            <span>Original Fare</span>
            <span>₹{baseFare + driverAllowance + toll + petRideCharge}</span>
          </div>

          {couponApplied && (
            <>
              <div className="flex justify-between text-green-600 font-bold text-sm">
                <span>Coupon Discount</span>
                <span>-₹{discountAmount}</span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                <p className="text-xs text-green-700 font-medium">Coupon Applied</p>
                <div className="flex justify-between mt-1 text-sm">
                  <span className="font-bold text-green-900">{couponCode}</span>
                  <span className="font-bold text-green-700">Saved ₹{discountAmount}</span>
                </div>
              </div>
            </>
          )}

          <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-black text-gray-900">
            <span>Total Fare</span>
            <span className="text-blue-600">₹{finalFare}</span>
          </div>
        </div>
      </div>

      {/* ================= PAYMENT SUMMARY ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl border border-blue-100">
            💰
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Payment Summary
            </h3>
            <p className="text-sm text-gray-500">
              Complete your booking securely
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase text-gray-400 font-bold">
              Payment Type
            </p>
            <p className="font-bold text-gray-800 mt-2">
              {paymentType === "partial" ? "Advance Payment" : "Full Payment"}
            </p>
          </div>

          <div className="bg-gray-50/70 rounded-2xl p-4 border border-gray-100">
            <p className="text-xs uppercase text-gray-400 font-bold">
              Pay Now
            </p>
            <p className="text-xl font-black text-blue-600 mt-2">
              ₹{paymentType === "partial" ? advanceAmount : finalFare}
            </p>
          </div>
        </div>

        {paymentType === "partial" && (
          <div className="bg-gray-50/70 rounded-2xl p-4 mt-4 border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">
                  Remaining Amount
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  ₹{Math.max(finalFare - advanceAmount, 0)}
                </p>
              </div>
              <div className="text-3xl">🚖</div>
            </div>
            <p className="text-xs text-gray-500 mt-2 border-t border-gray-200 pt-2">
              Pay this amount directly to the driver after trip completion.
            </p>
          </div>
        )}
      </div>

      {/* ================= IMPORTANT INFORMATION ================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-2xl border border-orange-100">
            📌
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Important Information
            </h3>
            <p className="text-sm text-gray-500">
              Please read before payment
            </p>
          </div>
        </div>

        <div className="space-y-3 bg-gray-50/70 p-4 rounded-2xl border border-gray-100 text-sm">
          <div className="flex gap-3 items-start">
            <div className="text-green-600 text-lg">✅</div>
            <p className="text-gray-700">Please verify all booking details before making payment.</p>
          </div>

          <div className="flex gap-3 items-start">
            <div className="text-green-600 text-lg">🚖</div>
            <p className="text-gray-700">Driver details will be shared before your journey starts.</p>
          </div>

          <div className="flex gap-3 items-start">
            <div className="text-green-600 text-lg">💳</div>
            <p className="text-gray-700">Remaining amount (if any) will be paid directly to the driver.</p>
          </div>

          <div className="flex gap-3 items-start">
            <div className="text-red-500 text-lg">⚠️</div>
            <p className="text-gray-700">Advance payment becomes non-refundable after booking confirmation.</p>
          </div>
        </div>
      </div>

    </div>

    {/* Footer */}
    <div className="border-t p-5 flex gap-3 bg-white flex-shrink-0">
      <button
        onClick={() => setShowBookingSummary(false)}
        className="flex-1 border border-gray-300 rounded-xl py-3 font-bold text-gray-700 hover:bg-gray-50 transition"
      >
        Edit Details
      </button>

      <button
      disabled={loadingBooking}
      onClick={async () => {
      setShowBookingSummary(false);
      await openRazorpayCheckout();
      }}
      className={`flex-1 rounded-xl py-3 font-bold text-white ${
      loadingBooking
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700 transition shadow-lg shadow-green-600/20"
      }`}
      >
      {loadingBooking ? "Processing..." : "Confirm Details"}
      </button>
    </div>

  </div>
</div>
)}

{/* ================= FARE BREAKDOWN POPUP ================= */}

{showFareBreakdown && (

<div className="fixed inset-0 z-[9999] bg-black/40 flex items-end">

  <div className="bg-white w-full rounded-t-3xl p-5 animate-slide-up">

    {/* Header */}

    <div className="flex items-center justify-between mb-5">

      <h2 className="text-xl font-bold">
        Fare Breakup
      </h2>

      <button
        onClick={() => setShowFareBreakdown(false)}
        className="text-3xl leading-none"
      >
        ×
      </button>

    </div>

    {/* Fare */}

    <div className="space-y-4">

      <div className="flex justify-between">

        <span>Base Fare</span>

        <span>₹{baseFare}</span>

      </div>

      <div className="flex justify-between">

        <span>Driver Allowance</span>

        <span>₹{driverAllowance}</span>

      </div>

      {petRide && (

        <div className="flex justify-between">

          <span>Pet Friendly Ride</span>

          <span>₹500</span>

        </div>

      )}

      {couponApplied && (

        <div className="flex justify-between text-green-600 font-semibold">

          <span>Coupon Discount</span>

          <span>-₹{discountAmount}</span>

        </div>

      )}

      <hr />

      <div className="flex justify-between">

        <span className="font-semibold">
          Original Fare
        </span>

        <span>
          ₹{baseFare + driverAllowance + tollAmount + petRideCharge}
        </span>

      </div>

      {couponApplied && (

        <div className="flex justify-between text-green-600">

          <span>
            You Saved
          </span>

          <span>
            ₹{discountAmount}
          </span>

        </div>

      )}

      <hr />

      <div className="flex justify-between text-xl font-bold">

        <span>Total Payable</span>

        <span>₹{finalFare}</span>

      </div>

    </div>

  </div>

</div>

)}

{/* Offer Loading Popup */}

{checkingOffer && (

<div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">

  <div className="bg-white rounded-3xl p-10 w-[90%] max-w-md text-center shadow-2xl">

    <div className="text-7xl animate-bounce">
      🎁
    </div>

    <h2 className="text-3xl font-bold mt-6">
      Checking Your Offer...
    </h2>

    <p className="text-gray-500 mt-3">
      Please wait while we unlock your exclusive booking discount.
    </p>

    <div className="flex justify-center gap-2 mt-8">

      <span className="w-3 h-3 rounded-full bg-green-500 animate-bounce"></span>

      <span className="w-3 h-3 rounded-full bg-blue-500 animate-bounce delay-150"></span>

      <span className="w-3 h-3 rounded-full bg-yellow-500 animate-bounce delay-300"></span>

    </div>

  </div>

</div>

)}

{/* Coupon Success Popup */}
{showCouponSuccess && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8 text-center relative overflow-hidden transform transition-all">

      {/* Top Animated Check Icon */}
      <div className="flex justify-center mb-5">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse shadow-inner">
          <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            ✓
          </div>
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
        🎉 Congratulations! 🎉
      </h2>

      {/* Customer Status */}
      <p className="mt-2 text-lg font-bold text-blue-600">
        {customerType === "new" ? "Welcome New Customer" : "Welcome Back"}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {customerType === "new"
          ? "Your Welcome Discount is ready to use."
          : "Your Returning Customer Discount is ready to use."}
      </p>

      {/* Coupon Code & Savings Box */}
      <div className="mt-6 bg-gradient-to-b from-gray-50 to-emerald-50/50 rounded-2xl p-5 border border-emerald-100 shadow-sm">
        <p className="text-gray-400 uppercase tracking-wider text-xs font-semibold">
          Applied Coupon Code
        </p>
        
        <h3 className="text-2xl md:text-3xl font-black text-gray-900 mt-1 tracking-wide">
          {couponCode}
        </h3>

        <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center justify-between px-2">
          <span className="text-sm font-medium text-gray-600">You Saved:</span>
          <span className="text-2xl md:text-3xl font-black text-emerald-600">
            ₹{discountAmount}
          </span>
        </div>
      </div>

      {/* Subtext */}
      <p className="mt-4 text-xs md:text-sm text-gray-500 font-medium">
        Enjoy your ride with RC Tours 🚖
      </p>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        {/* Copy Coupon Button */}
        <button
          onClick={copyCoupon}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-blue-600/20 transition-all"
        >
          {copiedCoupon ? "✅ Coupon Copied" : "📋 Copy Coupon"}
        </button>

        {/* Continue Button */}
        <button
          onClick={() => setShowCouponSuccess(false)}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-sm md:text-base shadow-lg shadow-emerald-600/20 transition-all"
        >
          Continue Booking →
        </button>
      </div>

    </div>
  </div>
)}

{/* ================= MOBILE STICKY PAYMENT BAR ================= */}

<div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#2f2f2f] border-t border-gray-700 px-3 py-2">

  <div className="flex items-center justify-between gap-3">

    {/* Part Pay */}

    <label
    onClick={() => setPaymentType("partial")}
    className={`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-lg transition-all ${
    paymentType === "partial"
      ? "bg-gray-700"
      : "hover:bg-gray-700/40"
    }`}
    >

      <input
      type="radio"
      name="payment-desktop"
      value="partial"
      checked={paymentType === "partial"}
      onChange={() => setPaymentType("partial")}
      className="w-4 h-4 cursor-pointer"
      />

      <div>

        <p className="text-[11px] text-gray-300">
          Part Pay
        </p>

        <p className="text-white font-bold leading-5">
          ₹{advanceAmount}
        </p>

      </div>

    </label>

    {/* Full Pay */}

    <label
    onClick={() => setPaymentType("full")}
    className={`flex items-center gap-2 cursor-pointer px-2 py-2 rounded-lg transition-all ${
    paymentType === "full"
      ? "bg-gray-700"
      : "hover:bg-gray-700/40"
    }`}
    >

      <input
      type="radio"
      name="payment-desktop"
      value="full"
      checked={paymentType === "full"}
      onChange={() => setPaymentType("full")}
      className="w-4 h-4 cursor-pointer"
      />

      <div>

        <p className="text-[11px] text-gray-300">
          Full Pay
        </p>

        <p className="text-white font-bold leading-5">
          ₹{finalFare}
        </p>

      </div>

    </label>

    {/* Info */}

    <button
    type="button"
    onClick={() => setShowFareBreakdown(true)}
    className="text-gray-300 text-lg hover:text-white transition"
    >
    ⓘ
    </button>

    {/* Button */}

    <button
      onClick={handleProceed}
      disabled={!confirmed}
      className={`px-6 py-3 rounded-xl font-bold text-white whitespace-nowrap ${
        confirmed
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-500 cursor-not-allowed"
      }`}
    >
      Pay Now
    </button>

  </div>

</div>

{/* Bottom Space */}

<div className="lg:hidden h-18"></div>

      {/* Floating Call Button */}
      <div className="fixed bottom-16 md:bottom-6 right-2 md:right-4 z-50 flex flex-col items-center gap-2">
      
        {/* Call */}
        <a
          href="tel:+919172271464"
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-xl md:text-2xl"
        >
          📞
        </a>
      
        {/* WhatsApp */}
        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl md:text-4xl"
        >
          <FaWhatsapp />
        </a>
      
        {/* Discount Badge */}
        <div className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-2 rounded-xl shadow-xl animate-pulse">
          <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
            🎁 Get Discount
          </p>
        </div>
      
      </div>

      <div className="hidden lg:block h-12"></div>

        </main>
        </>
  );
}

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingDetailsContent />
    </Suspense>
  );
}