"use client";

import Image from "next/image";
import {
  LuBriefcase,
  LuSprayCan,
  LuFuel,
} from "react-icons/lu";

import { MdOutlineSanitizer } from "react-icons/md";

export default function MobileBookingCard({
  vehicle,
  vehicleImage,
  vehicleCategory,
  tripType,
  pickup,
  drop,
  pickupDate,
  pickupTime,
}) {
  return (
    <div className="lg:hidden w-full px-3 py-4">
      <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden">

        {/* Car Image */}
        <div className="px-5 pt-6">
          <Image
            src={vehicleImage}
            alt={vehicle || "Car"}
            width={600}
            height={350}
            priority
            className="w-full h-[250px] object-contain mx-auto scale-110"
          />
        </div>

        {/* Vehicle Category */}
        <div className="px-5 pb-2">
          <div className="bg-[#e4e0ff] text-[#4338ca] rounded-xl py-3 text-center text-lg font-semibold shadow-sm">
        {vehicleCategory || "Sedan"}
          </div>
        </div>

        {/* Vehicle Name */}
        <div className="px-5 mt-3 mb-5 flex justify-between items-start">

          <div>
            <h2 className="text-[30px] leading-none font-extrabold text-gray-900">
              {vehicle}
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Comfortable & Clean Vehicle
            </p>
          </div>

          <div className="flex items-center gap-1 mt-2 whitespace-nowrap">
            <span className="text-yellow-500 text-lg">★</span>

            <span className="text-sm font-medium text-gray-700">
              4.5 Ratings
            </span>
          </div>

        </div>

        {/* Trip Section */}
        <div className="relative px-5 pb-5">

          {/* Trip Badge */}
          <div className="absolute -top-4 left-5 bg-[#d6d0fc] text-[#2d2470] text-xs font-bold px-4 py-1.5 rounded-tr-xl rounded-bl-md shadow-sm [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)]">
            {tripType}
          </div>

          {/* Details Box */}
          <div className="bg-[#f5f4ff] border border-[#ebe8ff] rounded-2xl p-5 pt-7">

            <div className="flex">

              {/* Pickup */}
              <div className="flex-1 pr-4">

                <h3 className="text-[22px] font-bold text-gray-900 mb-2">
                Pickup
                </h3>

                <p className="text-[13px] leading-6 text-gray-600">
                  {pickup}
                </p>

                <div className="mt-4 space-y-2 text-[13px] text-gray-700 font-medium">

                  <p className="flex items-center gap-2">
                    📅
                    <span>{pickupDate}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    🕒
                    <span>{pickupTime}</span>
                  </p>

                </div>

              </div>

              {/* Divider */}
              <div className="w-[2px] bg-gray-300 rounded-full mx-3"></div>

              {/* Drop */}
              <div className="flex-1 pl-3">

                <h3 className="text-[22px] font-bold text-gray-900 mb-2">
                Drop-Off
                </h3>

                <p className="text-[13px] leading-6 text-gray-600">
                  {drop}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Amenities */}

<div className="px-5 pb-6">

  <div className="grid grid-cols-3 gap-2">

    <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-[13px] font-medium text-gray-700 whitespace-nowrap">
      <LuBriefcase className="text-gray-500 text-[16px]" />
      Tissues
    </span>

    <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-[13px] font-medium text-gray-700 whitespace-nowrap">
      <MdOutlineSanitizer className="text-gray-500 text-[16px]" />
      Sanitiser
    </span>

    <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-[13px] font-medium text-gray-700 whitespace-nowrap">
      <LuSprayCan className="text-gray-500 text-[16px]" />
      Car Freshner
    </span>

    <span className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2 text-[13px] font-medium text-gray-700 whitespace-nowrap">
      <LuFuel className="text-gray-500 text-[16px]" />
      Petrol / Diesel / CNG
    </span>

  </div>

</div>

      </div>
    </div>
  );
}