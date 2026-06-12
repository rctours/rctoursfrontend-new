"use client";
import Image from "next/image";

import { useState } from "react";

const vehicleImages: any = {
  dzire: "/gallery/dzire.jpg",
  ertiga: "/gallery/ertiga.jpg",
  rumion: "/gallery/Rumion.jpg",
  crysta: "/gallery/innova.jpg",
  tt13: "/gallery/traveller.jpg",
  tt17: "/gallery/traveller.jpg",
  urbania: "/gallery/Urbania.jpg",
};

export default function FareCalculator() {
  const [serviceType, setServiceType] = useState("local");
  const [vehicle, setVehicle] = useState("");
  const [distance, setDistance] = useState("");
  const [tollTax, setTollTax] = useState("");
  const [fare, setFare] = useState<number | null>(null);

  const [baseFare, setBaseFare] = useState(0);
  const [driverAllowance, setDriverAllowance] = useState(0);
  const [totalToll, setTotalToll] = useState(0);

  const [packageType, setPackageType] = useState("");
  const [actualKm, setActualKm] = useState("");
  const [actualHours, setActualHours] = useState("");

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dropCity, setDropCity] = useState("");
  const [journeyDate, setJourneyDate] = useState("");

  const oneWayRates: any = {
    dzire: 22,
    ertiga: 26,
    rumion: 28,
    crysta: 36,
    tt13: 48,
    tt17: 56,
    urbania: 70,
  };

  const roundTripRates: any = {
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
    "8hr": { fare: 2000, km: 80, hrs: 8, extraKm: 13, extraHr: 200 },
    "10hr": { fare: 2300, km: 100, hrs: 10, extraKm: 13, extraHr: 200 },
    "12hr": { fare: 2600, km: 120, hrs: 12, extraKm: 13, extraHr: 200 },
  },

  rumion: {
    "8hr": { fare: 2500, km: 80, hrs: 8, extraKm: 14, extraHr: 300 },
    "10hr": { fare: 2800, km: 100, hrs: 10, extraKm: 14, extraHr: 300 },
    "12hr": { fare: 3000, km: 120, hrs: 12, extraKm: 14, extraHr: 300 },
  },

  ertiga: {
    "8hr": { fare: 2500, km: 80, hrs: 8, extraKm: 14, extraHr: 300 },
    "10hr": { fare: 2800, km: 100, hrs: 10, extraKm: 14, extraHr: 300 },
    "12hr": { fare: 3000, km: 120, hrs: 12, extraKm: 14, extraHr: 300 },
  },

  crysta: {
    "8hr": { fare: 3500, km: 80, hrs: 8, extraKm: 19, extraHr: 400 },
    "10hr": { fare: 4000, km: 100, hrs: 10, extraKm: 19, extraHr: 400 },
    "12hr": { fare: 4500, km: 120, hrs: 12, extraKm: 19, extraHr: 400 },
  },
};

  const calculateFare = () => {
    if (serviceType === "local") {
  if (!vehicle || !packageType) {
    alert("Select Vehicle & Package");
    return;
  }

  const pkg = localPackages[vehicle][packageType];

  let total = pkg.fare;

  const extraKm = Math.max(
    0,
    Number(actualKm || 0) - pkg.km
  );

  const extraHr = Math.max(
    0,
    Number(actualHours || 0) - pkg.hrs
  );

  total += extraKm * pkg.extraKm;
  total += extraHr * pkg.extraHr;

  setFare(total);
  return;
}

    if (!vehicle || !distance) {
      alert("Select Vehicle & Enter Distance");
      return;
    }

    let total = 0;

    if (serviceType === "oneway") {
  const base = Number(distance) * oneWayRates[vehicle];
  const toll = Number(tollTax || 0);
  const driver = 500;

  setBaseFare(base);
  setTotalToll(toll);
  setDriverAllowance(driver);

  total = base + toll + driver;
}

    if (serviceType === "round") {
  const base = Number(distance) * roundTripRates[vehicle];
  const toll = Number(tollTax || 0);
  const driver = 500;

  setBaseFare(base);
  setTotalToll(toll);
  setDriverAllowance(driver);

  total = base + toll + driver;
}

    setFare(total);
  };

  const vehicleNames = {
  dzire: "Swift Dzire",
  ertiga: "Ertiga",
  rumion: "Toyota Rumion",
  crysta: "Innova Crysta",
  tt13: "Tempo Traveller 13 Seater",
  tt17: "Tempo Traveller 17 Seater",
  urbania: "Force Urbania",
};

const handleWhatsAppBooking = () => {
  console.log(customerName);
  console.log(mobileNumber);

  if (!customerName) {
    alert("Please enter your name");
    return;
  }

  if (!mobileNumber) {
    alert("Please enter mobile number");
    return;
  }

  const whatsappMessage = `Hello RC Tours & Travels,

Name: ${customerName}
Mobile: ${mobileNumber}

Trip Type: ${serviceType}
Vehicle: ${vehicleNames[vehicle as keyof typeof vehicleNames] || vehicle}

Pickup: Nagpur
Drop: ${dropCity}

Distance: ${distance} KM
Journey Date: ${journeyDate}

Estimated Fare: ₹${fare}

Please share booking confirmation.`;

  window.open(
    `https://wa.me/919172271464?text=${encodeURIComponent(
      whatsappMessage
    )}`,
    "_blank"
  );
};

return (
    <div
    className="min-h-screen text-white p-6 bg-cover bg-center bg-fixed"
    style={{
    backgroundImage:
      "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/gallery/travel-bg.jpg')",
    }}
    >
      <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900/60 via-black/40 to-blue-950/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_60px_rgba(59,130,246,0.15)]">

        <h1 className="text-5xl md:text-6xl font-black text-center mb-3 bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
        RC Tours & Travels
      </h1>

      <p className="text-center text-gray-300 mb-8">
      Premium Taxi • Outstation Cabs • Airport Transfers
      </p>

        {vehicle && (
      <div className="flex justify-center mb-8">
      <Image
        src={
          vehicle === "dzire"
          ? "/gallery/dzire.jpg"
          : vehicle === "ertiga"
          ? "/gallery/ertiga.jpg"
          : vehicle === "rumion"
          ? "/gallery/Rumion.jpg"
          : vehicle === "crysta"
          ? "/gallery/innova.jpg"
          : vehicle === "urbania"
          ? "/gallery/Urbania.jpg"
          : "/gallery/traveller.jpg"
      }
      alt={vehicle}
      width={500}
      height={300}
      className="rounded-3xl object-cover border border-blue-500/20 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
    />
  </div>
)}

        <div className="grid grid-cols-3 gap-3 mb-8">

          <button
            onClick={() => setServiceType("local")}
            className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
              serviceType === "local"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg scale-105"
                : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
            }`}
          >
            Local Rental
          </button>

          <button
            onClick={() => setServiceType("round")}
            className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
              serviceType === "round"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg scale-105"
                : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
            }`}
          >
            Round Trip
          </button>

          <button
            onClick={() => setServiceType("oneway")}
            className={`py-4 rounded-2xl font-bold transition-all duration-300 ${
              serviceType === "oneway"
                ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg scale-105"
                : "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10"
            }`}
          >
            One Way
          </button>

        </div>

        {(serviceType === "round" || serviceType === "oneway") && (
          <>
            <h2 className="text-2xl font-bold mb-5 text-cyan-300">
              {serviceType === "round"
                ? "Outstation Round Trip"
                : "Outstation One Way"}
            </h2>

            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
            >
              <option value="">Select Vehicle</option>
              <option value="dzire">Swift Dzire</option>
              <option value="ertiga">Ertiga</option>
              <option value="rumion">Toyota Rumion</option>
              <option value="crysta">Innova Crysta</option>
              <option value="tt13">Tempo Traveller 13</option>
              <option value="tt17">Tempo Traveller 17</option>
              <option value="urbania">Force Urbania</option>
            </select>

            <input
              type="number"
              placeholder="Distance (KM)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
            />

            <input
              type="number"
              placeholder="Toll Tax"
              value={tollTax}
              onChange={(e) => setTollTax(e.target.value)}
              className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
            />
          </>
        )}
{serviceType === "local" && (
  <>
    <h2 className="text-2xl font-bold mb-5 text-cyan-300">
      Local Rental Packages
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

  <button
    onClick={() => setVehicle("dzire")}
    className={`p-3 rounded-2xl border backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${
      vehicle === "dzire"
        ? "border-blue-500 bg-blue-500/20"
        : "border-gray-700"
    }`}
  >
    <Image
  src="/gallery/dzire.jpg"
  alt="Swift Dzire"
  width={200}
  height={120}
  className="mx-auto"
/>
    <p className="mt-2 font-semibold">Swift Dzire</p>
  </button>

  <button
    onClick={() => setVehicle("ertiga")}
    className={`p-3 rounded-2xl border ${
      vehicle === "ertiga"
        ? "border-blue-500 bg-blue-500/20"
        : "border-gray-700"
    }`}
  >
    <Image
  src="/gallery/ertiga.jpg"
  alt="Ertiga"
  width={200}
  height={120}
  className="mx-auto"
/>
    <p className="mt-2 font-semibold">Ertiga</p>
  </button>

  <button
    onClick={() => setVehicle("rumion")}
    className={`p-3 rounded-2xl border backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${
      vehicle === "rumion"
        ? "border-blue-500 bg-blue-500/20"
        : "border-gray-700"
    }`}
  >
    <Image
  src="/gallery/Rumion.jpg"
  alt="Rumion"
  width={200}
  height={120}
  className="mx-auto"
/>
    <p className="mt-2 font-semibold">Toyota Rumion</p>
  </button>

  <button
    onClick={() => setVehicle("crysta")}
    className={`p-3 rounded-2xl border backdrop-blur-lg bg-white/5 hover:bg-white/10 transition-all duration-300 ${
      vehicle === "crysta"
        ? "border-blue-500 bg-blue-500/20"
        : "border-gray-700"
    }`}
  >
    <Image
  src="/gallery/innova.png"
  alt="Innova Crysta"
  width={200}
  height={120}
  className="mx-auto"
/>
    <p className="mt-2 font-semibold">Innova Crysta</p>
  </button>

</div>

    <select
      value={packageType}
      onChange={(e) => setPackageType(e.target.value)}
      className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
    >
      <option value="">Select Package</option>
      <option value="8hr">8Hr / 80KM</option>
      <option value="10hr">10Hr / 100KM</option>
      <option value="12hr">12Hr / 120KM</option>
    </select>

    <input
      type="number"
      placeholder="Actual KM Travelled"
      value={actualKm}
      onChange={(e) => setActualKm(e.target.value)}
      className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
    />

    <input
      type="number"
      placeholder="Actual Hours Used"
      value={actualHours}
      onChange={(e) => setActualHours(e.target.value)}
      className="w-full p-4 rounded-xl bg-gray-800 border border-gray-600 mb-4"
    />
  </>
)}

        <button
          onClick={calculateFare}
          className="w-full mt-4 bg-blue-600 py-4 rounded-xl text-xl font-bold"
        >
          Calculate Fare
        </button>

        {fare !== null && (
  <div className="mt-8 bg-gradient-to-br from-slate-900/90 via-blue-950/80 to-slate-900/90 border border-cyan-500/20 p-8 rounded-3xl text-center shadow-[0_0_40px_rgba(6,182,212,0.25)] backdrop-blur-xl">

    <h2 className="text-2xl font-bold mb-6 text-blue-300 uppercase tracking-wider">
  Estimated Fare
</h2>

<p className="text-7xl font-black tracking-tight text-white drop-shadow-lg">
  ₹{fare}
</p>

<p className="text-green-300 mt-2">
  Inclusive of Driver Charges & Taxes
</p>

{serviceType !== "local" && (
  <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-5 text-left max-w-md mx-auto backdrop-blur-md">
    <div className="flex justify-between mb-2">
      <span>Base Fare</span>
      <span>₹{baseFare}</span>
    </div>

    <div className="flex justify-between mb-2">
      <span>Toll Tax</span>
      <span>₹{totalToll}</span>
    </div>

    <div className="flex justify-between mb-2">
      <span>Driver Allowance</span>
      <span>₹{driverAllowance}</span>
    </div>

    <hr className="my-3 border-white/20" />

    <div className="flex justify-between font-bold text-lg">
      <span>Total Fare</span>
      <span>₹{fare}</span>
    </div>
  </div>
)}

<div className="mt-6 space-y-4 max-w-md mx-auto">


  <input
    type="text"
    placeholder="Customer Name"
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600"
  />

  <input
    type="tel"
    placeholder="Mobile Number"
    value={mobileNumber}
    onChange={(e) => setMobileNumber(e.target.value)}
    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600"
  />

  <input
  type="text"
  value="Nagpur"
  readOnly
  className="w-full p-3 rounded-xl bg-gray-700 border border-gray-600"
/>

  <input
    type="text"
    placeholder="Drop City"
    value={dropCity}
    onChange={(e) => setDropCity(e.target.value)}
    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600"
  />

  <input
    type="date"
    value={journeyDate}
    onChange={(e) => setJourneyDate(e.target.value)}
    className="w-full p-3 rounded-xl bg-gray-800 border border-gray-600"
  />

</div>

    <button
  onClick={handleWhatsAppBooking}
  className="inline-block mt-6 bg-white text-green-700 px-6 py-3 rounded-xl font-bold"
>
  Book on WhatsApp
</button>

<a
  href="tel:+919172271464"
  className="block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold text-center"
>
  📞 Call Now
</a>

  </div>
)}

      </div>
    </div>
  );
}