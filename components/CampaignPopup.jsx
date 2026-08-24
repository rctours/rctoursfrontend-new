"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  PawPrint,
  Landmark,
  MapPin,
  Car,
  Headphones,
  Mountain,
  Map,
  IndianRupee,
  Palmtree,
  Plane,
  Route,
  Trees,
  HeartHandshake,
  BriefcaseBusiness,
  Hotel,
} from "lucide-react";

export default function CampaignPopup() {
  const campaigns = [
    {
      id: 1,
      titleWhite: "Pench,",
      titleRed: " Tadoba & More",
      description:
        "Comfortable rides to forests, holy places & your favorite destinations.",
      buttonText: "Book Your Ride Now",
      image: "/services/tour-packages.webp",
      features: [
        {
          icon: PawPrint,
          title: "Wildlife Safaris",
          subtitle: "Pench & Tadoba",
        },
        {
          icon: Landmark,
          title: "Pilgrimage Tours",
          subtitle: "Ayodhya & More",
        },
        {
          icon: MapPin,
          title: "Outstation Cabs",
          subtitle: "All Over India",
        },
      ],
    },

    {
      id: 2,
      titleWhite: "Tours,",
      titleRed: " Cabs & Holidays",
      description:
        "From wildlife adventures to family trips, travel comfortably with RC Tours & Travels.",
      buttonText: "Explore Tours",
      image: "/services/tempo-traveller.webp",
      features: [
        {
          icon: Palmtree,
          title: "Tour Packages",
          subtitle: "Explore More",
        },
        {
          icon: Car,
          title: "Premium Fleet",
          subtitle: "Travel Comfortably",
        },
        {
          icon: Headphones,
          title: "24×7 Support",
          subtitle: "Always Available",
        },
      ],
    },

    {
      id: 3,
      titleWhite: "One Way",
      titleRed: " & Round Trips",
      description:
        "Travel anywhere with comfortable cars, flexible plans and transparent pricing.",
      buttonText: "Book Cab Now",
      image: "/blogs/featured.webp",
      features: [
        {
          icon: Car,
          title: "Comfortable Cars",
          subtitle: "Multiple Options",
        },
        {
          icon: Map,
          title: "Flexible Trips",
          subtitle: "Your Route, Your Choice",
        },
        {
          icon: IndianRupee,
          title: "Fair Pricing",
          subtitle: "Transparent Rates",
        },
      ],
    },

    {
      id: 4,
      titleWhite: "Airport",
      titleRed: " Pick-Up & Drop",
      description:
        "Reliable airport transfers with comfortable rides, trained drivers and timely service.",
      buttonText: "Book Airport Cab",
      image: "/airport-transfer.webp",
      features: [
        {
          icon: Plane,
          title: "Airport Transfer",
          subtitle: "On Time Service",
        },
        {
          icon: Headphones,
          title: "Professional Drivers",
          subtitle: "Safe & Verified",
        },
        {
          icon: IndianRupee,
          title: "Best Price",
          subtitle: "No Hidden Charges",
        },
      ],
    },

    {
      id: 5,
      titleWhite: "Discover",
      titleRed: " Incredible India",
      description:
        "From spiritual journeys to scenic road trips, explore India with RC Tours & Travels.",
      buttonText: "Start Your Journey",
      image: "/incredible india.webp",
      features: [
        {
          icon: Map,
          title: "India Tours",
          subtitle: "Travel Everywhere",
        },
        {
          icon: Landmark,
          title: "Pilgrimage",
          subtitle: "Holy Destinations",
        },
        {
          icon: Route,
          title: "Custom Trips",
          subtitle: "Your Own Plan",
        },
      ],
    },

    {
      id: 6,
      titleWhite: "Weekend",
      titleRed: " Getaways",
      description:
        "Escape the city and enjoy memorable weekends with comfortable travel.",
      buttonText: "Plan Your Trip",
      image: "/services/outstation-taxi.webp",
      features: [
        {
          icon: Mountain,
          title: "Hill Stations",
          subtitle: "Nature & Peace",
        },
        {
          icon: Trees,
          title: "Nature Trips",
          subtitle: "Fresh Adventures",
        },
        {
          icon: Car,
          title: "Comfortable Ride",
          subtitle: "Travel Relaxed",
        },
      ],
    },

    {
      id: 7,
      titleWhite: "Family",
      titleRed: " Trips Made Easy",
      description:
        "Travel together comfortably with spacious vehicles and reliable service.",
      buttonText: "Book Family Trip",
      image: "/gallery/friend-tour.webp",
      features: [
        {
          icon: HeartHandshake,
          title: "Family Friendly",
          subtitle: "Travel Together",
        },
        {
          icon: Car,
          title: "Premium Cars",
          subtitle: "Comfort First",
        },
        {
          icon: Hotel,
          title: "Complete Travel",
          subtitle: "Plan With Us",
        },
      ],
    },

    {
      id: 8,
      titleWhite: "Business",
      titleRed: " Travel & More",
      description:
        "Professional, reliable and comfortable travel solutions for every journey.",
      buttonText: "Book Your Cab",
      image: "/corporate-travel.webp",
      features: [
        {
          icon: BriefcaseBusiness,
          title: "Business Travel",
          subtitle: "Professional Service",
        },
        {
          icon: Route,
          title: "Flexible Routes",
          subtitle: "Travel Anywhere",
        },
        {
          icon: Headphones,
          title: "24×7 Support",
          subtitle: "Always Available",
        },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const campaign = campaigns[currentIndex];

  return (
    <section className="relative w-full bg-white py-3 sm:py-4 md:py-5">
      <div className="mx-auto w-full max-w-[1300px] px-3 sm:px-4 md:px-6">

        {/* MAIN BANNER CONTAINER */}
        <div className="relative overflow-hidden rounded-[16px] bg-[#14263f] shadow-xl sm:rounded-[20px]">

          <div className="relative flex h-[190px] w-full flex-row sm:h-[220px] md:h-[250px] lg:h-[275px]">

            {/* LEFT CONTENT */}
            <div className="relative z-20 flex w-[55%] flex-col justify-center px-3 py-3 sm:w-[52%] sm:px-6 sm:py-4 md:w-[46%] md:px-8 lg:px-10">

              {/* TITLE */}
              <h2 className="break-words text-[16px] font-extrabold leading-[1.12] tracking-tight sm:text-[26px] md:text-[34px] lg:text-[40px]">
                <span className="text-white">
                  {campaign.titleWhite}
                </span>

                <span className="text-red-500">
                  {campaign.titleRed}
                </span>
              </h2>

              {/* LINES */}
              <div className="mt-1.5 flex items-center gap-1.5 sm:mt-2.5">
                <span className="h-[2px] w-5 bg-slate-300 sm:w-7" />
                <span className="h-[2px] w-6 bg-red-500 sm:w-8" />
              </div>

              {/* DESCRIPTION */}
              <p className="mt-2 max-w-[480px] text-[8px] leading-snug text-slate-200 sm:mt-2.5 sm:text-[12px] md:text-[14px]">
                {campaign.description}
              </p>

              {/* FEATURES */}
              <div className="mt-3 flex w-full items-start justify-between sm:mt-3.5 md:mt-4">

                {campaign.features.map((feature, index) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex min-w-0 flex-1 items-center justify-center"
                    >
                      <div className="min-w-0 px-0.5 text-center sm:px-1">

                        {/* WHITE CIRCLE */}
                        <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md sm:h-9 sm:w-9 md:h-11 md:w-11">
                          <Icon
                            size={14}
                            strokeWidth={2.2}
                            className="text-red-600 sm:hidden"
                          />

                          <Icon
                            size={18}
                            strokeWidth={2.2}
                            className="hidden text-red-600 sm:block md:hidden"
                          />

                          <Icon
                            size={22}
                            strokeWidth={2.2}
                            className="hidden text-red-600 md:block"
                          />
                        </div>

                        {/* FEATURE TITLE - MOBILE FIX */}
                        <p className="mt-1 min-h-[16px] break-words px-0.5 text-center text-[6px] font-bold leading-tight text-white sm:min-h-[24px] sm:text-[10px] md:text-[11px]">
                          {feature.title}
                        </p>

                        {/* FEATURE SUBTITLE - MOBILE FIX */}
                        <p className="min-h-[12px] break-words px-0.5 text-center text-[5px] leading-tight text-slate-300 sm:min-h-[18px] sm:text-[8px] md:text-[9px]">
                          {feature.subtitle}
                        </p>
                      </div>

                      {index !== campaign.features.length - 1 && (
                        <div className="mx-0.5 h-9 w-px shrink-0 bg-slate-500/60 sm:mx-1.5 sm:h-10 md:h-12" />
                      )}
                    </div>
                  );
                })}

              </div>

              {/* BUTTON */}
              <Link
                href="/book-cab"
                className="mt-2.5 inline-flex w-fit items-center gap-1 whitespace-nowrap rounded-lg bg-gradient-to-r from-red-700 to-red-500 px-2 py-1.5 text-[8px] font-bold text-white shadow-md transition hover:scale-[1.02] sm:mt-3.5 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-[12px] md:px-5 md:py-2.5 md:text-[14px]"
              >
                {campaign.buttonText}

                <span className="text-sm leading-none sm:text-lg">
                  ›
                </span>
              </Link>
            </div>

            {/* RIGHT SINGLE IMAGE */}
            <div className="relative w-[45%] overflow-hidden sm:w-[48%] md:w-[54%]">
              <img
                src={campaign.image}
                alt={campaign.titleWhite + campaign.titleRed}
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading={currentIndex === 0 ? "eager" : "lazy"}
              />

              {/* DARK GRADIENT */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#14263f] via-[#14263f]/40 to-transparent" />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </div>

          {/* RED BOTTOM LINE */}
          <div className="relative z-30 h-[3px] w-full bg-red-600 sm:h-[4px]" />
        </div>

        {/* DOTS */}
        <div className="mt-2.5 flex justify-center gap-1.5 sm:mt-3">
          {campaigns.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "h-2 w-5 bg-red-600 sm:h-2.5 sm:w-6"
                  : "h-2 w-2 bg-slate-300 hover:bg-slate-400 sm:h-2.5 sm:w-2.5"
              }`}
              aria-label={`Go to campaign ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}