"use client";

import Script from "next/script";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import PremiumHero from "@/components/about/PremiumHero";
import Footer from "@/components/Footer";

import {
  Sparkles,
  Star,
  Snowflake,
  MapPin,
  ShieldCheck,
  BadgeCheck,
  Headphones,
  IndianRupee,
  Car,
  Plane,
  Building2,
  Route,
  Target,
  Rocket,
  Phone,
  MessageCircle,
  ArrowRight,
  Users,
  Clock3,
  CheckCircle2,
} from "lucide-react";

const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.rctoursandtravels.in/about/#webpage",
      url: "https://www.rctoursandtravels.in/about",
      name: "About RC Tours & Travels | Trusted Taxi Service in Nagpur",
      description:
        "Learn about RC Tours & Travels, a trusted Nagpur taxi service providing airport transfers, local cab booking, outstation taxis, tempo travellers and tour packages.",
      mainEntity: {
        "@id": "https://www.rctoursandtravels.in/#taxi-service",
      },
    },

    {
      "@type": "TaxiService",
      "@id": "https://www.rctoursandtravels.in/#taxi-service",
      name: "RC Tours & Travels",
      url: "https://www.rctoursandtravels.in",
      description:
        "RC Tours & Travels is a trusted taxi service in Nagpur offering airport transfers, local taxi services, outstation cab booking, corporate travel, tempo travellers and tour packages.",
      telephone: "+919172271464",
      priceRange: "₹₹",
      image: "https://www.rctoursandtravels.in/logo.png",

      address: {
        "@type": "PostalAddress",
        streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
        addressLocality: "Nagpur",
        addressRegion: "Maharashtra",
        postalCode: "440034",
        addressCountry: "IN",
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: "21.1458",
        longitude: "79.0882",
      },

      areaServed: [
        {
          "@type": "City",
          name: "Nagpur",
        },
        {
          "@type": "State",
          name: "Maharashtra",
        },
        {
          "@type": "Country",
          name: "India",
        },
      ],

      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },

      sameAs: [
        "https://www.facebook.com/",
        "https://www.instagram.com/",
      ],

      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Taxi and Travel Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Nagpur Airport Taxi Service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Outstation Taxi Service from Nagpur",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Local Cab Service in Nagpur",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Corporate Travel Service",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tempo Traveller Booking",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tour Packages from Nagpur",
            },
          },
        ],
      },
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a taxi in Nagpur with RC Tours & Travels?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a taxi with RC Tours & Travels online through our website, by calling +91 9172271464, or by contacting us on WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide Nagpur Airport taxi service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RC Tours & Travels provides reliable airport pickup and drop taxi services in Nagpur with comfortable vehicles and professional drivers.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide outstation taxi service from Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide outstation taxi services from Nagpur to destinations including Pench, Tadoba, Pune, Mumbai, Hyderabad and other locations across India.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a taxi from Nagpur to Tadoba or Pench?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RC Tours & Travels provides taxi services from Nagpur to Tadoba, Pench and other popular tourist destinations.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide local taxi service in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide local cab services in Nagpur for city travel, business meetings, family trips and other travel requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Is Tempo Traveller available for group travel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RC Tours & Travels provides Tempo Traveller options for family trips, group tours, corporate travel and outstation journeys.",
      },
    },
  ],
};

export default function AboutPage() {

const [showAllRoutes, setShowAllRoutes] = useState(false);

  const [trips, setTrips] = useState(0);
const [customers, setCustomers] = useState(0);

useEffect(() => {
  const tripsInterval = setInterval(() => {
    setTrips((prev) => {
      if (prev >= 5000) {
        clearInterval(tripsInterval);
        return 5000;
      }
      return prev + 50;
    });
  }, 20);

  const customerInterval = setInterval(() => {
    setCustomers((prev) => {
      if (prev >= 1000) {
        clearInterval(customerInterval);
        return 1000;
      }
      return prev + 10;
    });
  }, 20);

  return () => {
    clearInterval(tripsInterval);
    clearInterval(customerInterval);
  };
}, []);

  return (
  <div className="bg-white min-h-screen">

    {/* SEO Structured Data */}
    <Script
      id="about-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(aboutSchema),
      }}
    />

    <Script
      id="about-faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />

      <Script
      id="about-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
      __html: JSON.stringify(aboutSchema),
      }}
      />
      <PremiumHero />

{/* Our Journey */}

<section className="py-7 md:py-10 bg-gradient-to-b from-white via-slate-50 to-white">
  <div className="max-w-6xl mx-auto px-4 md:px-8">

    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">

      <div>
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-8">
          Our Journey
        </h2>

        <p className="text-slate-600 text-lg leading-9 mb-6">
          RC Tours & Travels started with a simple vision — to provide safe,
          comfortable and reliable taxi services from Nagpur to destinations
          across India.
        </p>

        <p className="text-slate-600 text-lg leading-9 mb-6">
          Over the years, we have successfully completed thousands of trips
          for families, tourists, corporate clients and groups. Our focus has
          always been customer satisfaction, transparent pricing and professional service.
        </p>

        <p className="text-slate-600 text-base md:text-lg leading-8 md:leading-9">
          Today, RC Tours & Travels is a trusted name for airport transfers,
          local taxi services, outstation cab booking and tour packages from Nagpur.
        </p>
      </div>

      <div className="relative overflow-hidden bg-white/90 backdrop-blur-xl border border-white rounded-[32px] p-8 md:p-10 shadow-2xl">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"></div>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
          Why Customers Trust Us
        </h3>

        <ul className="space-y-4 text-slate-600 text-lg">
          <li>✅ Professional Drivers</li>
          <li>✅ Clean & Sanitized Vehicles</li>
          <li>✅ Transparent Pricing</li>
          <li>✅ 24×7 Customer Support</li>
          <li>✅ GPS Enabled Fleet</li>
          <li>✅ On-Time Pickup & Drop</li>
        </ul>
      </div>

    </div>

  </div>
</section>


<section className="py-3 md:py-5 bg-gradient-to-r from-blue-600 to-cyan-500">
  <div className="max-w-4xl mx-auto px-4 md:px-8 text-center text-white">

    <h2 className="text-xl md:text-3xl font-black leading-tight">
      Trusted By Thousands Of Travelers Across India
    </h2>

    <p className="mt-2 text-xs md:text-lg leading-6">
      Airport Transfers • Corporate Travel • Outstation Tours • Family Trips
    </p>

  </div>
</section>

{/* Services Section */}
<section className="relative py-6 md:py-9 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">

  {/* Background Glow */}
  <div className="absolute top-10 left-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-7xl mx-auto px-4 md:px-8">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">

      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide border border-blue-200/70 shadow-sm">
        <Sparkles size={15} />
        OUR SERVICES
      </span>

      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-5 md:mt-6 leading-tight">
        Premium Taxi & Travel Services
      </h2>

      <p className="text-slate-600 text-sm md:text-lg mt-4 max-w-2xl mx-auto leading-7 md:leading-8">
        Comfortable, reliable and professional travel solutions for airport
        transfers, corporate travel and outstation journeys from Nagpur.
      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-5 md:gap-8">

      {/* Airport Transfer */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        <div className="relative h-48 md:h-64 overflow-hidden">

          <Image
            src="/airport-transfer.webp"
            alt="Nagpur Airport Taxi Pickup and Drop Service"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">

            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              ✈️ Airport Service
            </span>

          </div>

        </div>

        <div className="p-5 md:p-7">

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Airport Transfers
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-7">
            Reliable Nagpur airport pickup and drop taxi service with
            professional drivers, comfortable vehicles and on-time service.
          </p>

          <a
            href="/book-cab"
            className="inline-flex items-center gap-2 mt-5 text-blue-600 font-bold text-sm hover:text-blue-800 transition"
          >
            Book Airport Cab
            <span>→</span>
          </a>

        </div>

      </div>


      {/* Corporate Travel */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        <div className="relative h-48 md:h-64 overflow-hidden">

          <Image
            src="/corporate-travel.webp"
            alt="Corporate Taxi and Business Travel Service in Nagpur"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">

            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              💼 Corporate Travel
            </span>

          </div>

        </div>

        <div className="p-5 md:p-7">

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Corporate Travel
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-7">
            Premium transportation solutions for executives, business meetings,
            corporate events and professional travel requirements.
          </p>

          <a
            href="/book-cab"
            className="inline-flex items-center gap-2 mt-5 text-blue-600 font-bold text-sm hover:text-blue-800 transition"
          >
            Book Corporate Cab
            <span>→</span>
          </a>

        </div>

      </div>


      {/* Outstation Travel */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">

        <div className="relative h-48 md:h-64 overflow-hidden">

          <Image
            src="/outstation-travel.webp"
            alt="Outstation Taxi Service From Nagpur"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

          <div className="absolute bottom-4 left-4">

            <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              🚖 Outstation Trips
            </span>

          </div>

        </div>

        <div className="p-5 md:p-7">

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
            Outstation Journeys
          </h3>

          <p className="text-sm md:text-base text-slate-600 leading-7">
            Comfortable long-distance taxi services from Nagpur to destinations
            across India for families, tourists, groups and business travelers.
          </p>

          <a
            href="/book-cab"
            className="inline-flex items-center gap-2 mt-5 text-blue-600 font-bold text-sm hover:text-blue-800 transition"
          >
            Book Outstation Cab
            <span>→</span>
          </a>

        </div>

      </div>

    </div>

  </div>

</section>

{/* Fleet Section */}
<section className="relative pt-6 md:pt-8 pb-10 md:pb-12 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">

  {/* Background Glow Decorations */}
  <div className="absolute top-10 left-5 w-64 h-64 md:w-96 md:h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-5 w-64 h-64 md:w-96 md:h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-7 md:mb-10">
      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wide border border-blue-200/60 shadow-sm mb-4">
        <Sparkles size={15} />
        PREMIUM VEHICLES
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        Our Luxury Fleet Collection
      </h2>

      <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-4 leading-relaxed">
        Choose from our professionally maintained fleet for airport transfers,
        outstation trips, family vacations, and corporate travel.
      </p>
    </div>

    {/* Fleet Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">

      {/* 1. Swift Dzire */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between">

        <div>
          <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
            <Image
              src="/swift-dzire.webp"
              alt="Swift Dzire"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-slate-800">
                4+1 Seater Sedan
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                Swift Dzire
              </h3>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 text-blue-600 font-extrabold text-lg">
              Starting ₹12/KM
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">

              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Snowflake size={13} />
                AC
              </span>

              <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200/60 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <MapPin size={13} />
                GPS
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Sparkles size={13} />
                Sanitized
              </span>

            </div>

            <p className="text-slate-500 text-xs sm:text-sm mt-3 font-medium">
              Comfortable & Safe Journey
            </p>

          </div>
        </div>

        <div className="p-5 sm:p-6 pt-0 flex gap-2.5">

          <a
            href="/book-cab"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            Book Cab
          </a>

          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            WhatsApp
          </a>

        </div>
      </div>

      {/* 2. Ertiga */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between">

        <div>
          <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
            <Image
              src="/ertiga.webp"
              alt="Ertiga"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-slate-800">
                6+1 Seater MPV
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                Ertiga
              </h3>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 text-blue-600 font-extrabold text-lg">
              Starting ₹14/KM
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">

              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Snowflake size={13} />
                AC
              </span>

              <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200/60 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <MapPin size={13} />
                GPS
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Sparkles size={13} />
                Sanitized
              </span>

            </div>

            <p className="text-slate-500 text-xs sm:text-sm mt-3 font-medium">
              Comfortable & Safe Journey
            </p>

          </div>
        </div>

        <div className="p-5 sm:p-6 pt-0 flex gap-2.5">

          <a
            href="/book-cab"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            Book Cab
          </a>

          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            WhatsApp
          </a>

        </div>
      </div>

      {/* 3. Innova Crysta */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between">

        <div>
          <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
            <Image
              src="/innova-crysta.webp"
              alt="Innova Crysta"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-slate-800">
                7 Seater Luxury MPV
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                Innova Crysta
              </h3>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 text-blue-600 font-extrabold text-lg">
              Starting ₹18/KM
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">

              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Snowflake size={13} />
                AC
              </span>

              <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200/60 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <MapPin size={13} />
                GPS
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Sparkles size={13} />
                Sanitized
              </span>

            </div>

            <p className="text-slate-500 text-xs sm:text-sm mt-3 font-medium">
              Comfortable & Safe Journey
            </p>

          </div>
        </div>

        <div className="p-5 sm:p-6 pt-0 flex gap-2.5">

          <a
            href="/book-cab"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            Book Cab
          </a>

          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            WhatsApp
          </a>

        </div>
      </div>

      {/* 4. Tempo Traveller */}
      <div className="group bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-200/80 flex flex-col justify-between">

        <div>
          <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-100">
            <Image
              src="/traveller17.webp"
              alt="Tempo Traveller"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
              <span className="text-xs font-bold text-slate-800">
                13 / 17 Seater
              </span>
            </div>
          </div>

          <div className="p-5 sm:p-6">

            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-bold text-slate-900">
                Tempo Traveller
              </h3>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill="currentColor"
                    strokeWidth={1.5}
                  />
                ))}
              </div>
            </div>

            <div className="mt-2 text-blue-600 font-extrabold text-lg">
              Starting ₹25/KM
            </div>

            <div className="flex flex-wrap gap-1.5 mt-3">

              <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200/60 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Snowflake size={13} />
                AC
              </span>

              <span className="inline-flex items-center gap-1 bg-sky-50 border border-sky-200/60 text-sky-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <MapPin size={13} />
                GPS
              </span>

              <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200/60 text-amber-700 px-2.5 py-1 rounded-lg text-xs font-medium">
                <Sparkles size={13} />
                Sanitized
              </span>

            </div>

            <p className="text-slate-500 text-xs sm:text-sm mt-3 font-medium">
              Comfortable & Safe Journey
            </p>

          </div>
        </div>

        <div className="p-5 sm:p-6 pt-0 flex gap-2.5">

          <a
            href="/book-cab"
            className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            Book Cab
          </a>

          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-emerald-500 text-white py-2.5 rounded-xl font-semibold hover:bg-emerald-600 active:scale-95 transition-all text-center text-xs sm:text-sm shadow-sm"
          >
            WhatsApp
          </a>

        </div>
      </div>

    </div>
  </div>
</section>

{/* Premium Gallery */}

<section className="py-6 md:py-9 bg-slate-50">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    <h2 className="text-3xl md:text-5xl font-black text-slate-900 text-center mb-3 md:mb-4">
      Our Travel Gallery
    </h2>

    <p className="text-center text-gray-500 text-sm md:text-base mb-5 md:mb-7">
      Real Moments From RC Tours & Travels
    </p>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/tour.webp" alt="Swift Dzire" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/airport.avif" alt="Ertiga" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image
        src="/gallery/traveller.webp"
        alt="Innova Crysta"
        fill
        className="object-cover hover:scale-110 transition duration-700"
        />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/rumion.webp" alt="Tempo Traveller" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/traveller17.webp" alt="Airport Pickup" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

      <div className="relative h-32 md:h-52 rounded-2xl md:rounded-3xl overflow-hidden">
        <Image src="/gallery/friend-tour.webp" alt="Tour Package" fill className="object-cover hover:scale-110 transition duration-700" />
      </div>

    </div>

  </div>
</section>

{/* Popular Routes */}

<section className="relative py-7 md:py-10 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100">

  {/* Background Glow */}
  <div className="absolute top-10 left-5 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-10 right-5 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-7xl mx-auto px-4 md:px-8">

    {/* Heading */}
    <div className="text-center mb-6 md:mb-8">

      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-600 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide border border-blue-200/70 shadow-sm">
        📍 POPULAR DESTINATIONS
      </span>

      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-4 md:mt-5 leading-tight">
        🚖 Popular Routes From Nagpur
      </h2>

      <p className="text-slate-600 text-sm md:text-lg mt-3 md:mt-4 max-w-3xl mx-auto leading-7 md:leading-8">
        Explore our most popular tourist, pilgrimage and outstation taxi routes
        with comfortable vehicles and professional drivers.
      </p>

    </div>

    {/* Routes Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">

      {[
        "Nagpur → Pench",
        "Nagpur → Tadoba",
        "Nagpur → Chikhaldara",
        "Nagpur → Ramtek",
        "Nagpur → Wardha",
        "Nagpur → Amravati",
        "Nagpur → Akola",
        "Nagpur → Yavatmal",
        "Nagpur → Chandrapur",
        "Nagpur → Gadchiroli",
        "Nagpur → Bhandara",
        "Nagpur → Gondia",
        "Nagpur → Seoni",
        "Nagpur → Jabalpur",
        "Nagpur → Bhopal",
        "Nagpur → Indore",
        "Nagpur → Hyderabad",
        "Nagpur → Pune",
        "Nagpur → Mumbai",
        "Nagpur → Nashik",
        "Nagpur → Aurangabad",
        "Nagpur → Shirdi",
        "Nagpur → Goa",
        "Nagpur → Raipur",
        "Nagpur → Bilaspur",
        "Nagpur → Prayagraj",
        "Nagpur → Ayodhya",
        "Nagpur → Varanasi",
        "Nagpur → Ujjain",
        "Nagpur → Omkareshwar",
        "Nagpur → Khajuraho",
        "Nagpur → Kanha National Park",
        "Nagpur → Pachmarhi",
        "Nagpur → Bhilai",
        "Nagpur → Nanded",
        "Nagpur → Lonavala",
        "Nagpur → Mahabaleshwar",
        "Nagpur → Srisailam",
        "Nagpur → Hampi",
      ]
        .slice(0, showAllRoutes ? 39 : 12)
        .map((route) => (
          <a
            key={route}
            href="/book-cab"
            className="group relative bg-white border border-slate-200/80 rounded-2xl px-3 py-3.5 md:px-4 md:py-4 text-center shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >

            {/* Hover Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex items-center justify-center gap-1.5">
              <span className="text-blue-600 group-hover:text-white transition-colors duration-300">
                📍
              </span>

              <span className="text-slate-700 group-hover:text-white text-[11px] sm:text-sm md:text-base font-semibold whitespace-nowrap transition-colors duration-300">
                {route}
              </span>
            </div>

          </a>
        ))}

    </div>

    {/* Show More / Show Less */}
    <div className="text-center mt-7 md:mt-8">

      <button
        onClick={() => setShowAllRoutes(!showAllRoutes)}
        className="inline-flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-600 hover:text-blue-700 px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-xs md:text-sm shadow-sm hover:shadow-md transition-all duration-300"
      >
        {showAllRoutes
          ? "Show Less Routes ⬆️"
          : "View All Routes (39) ⬇️"}
      </button>

    </div>

    {/* Bottom CTA */}
    <div className="mt-8 md:mt-10 text-center">

      <a
        href="/book-cab"
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold text-sm md:text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
      >
        🚖 Book Your Outstation Cab
      </a>

    </div>

  </div>

</section>

{/* Service Areas */}

<section className="py-7 md:py-10 bg-gradient-to-b from-slate-50 to-white">

  <div className="max-w-7xl mx-auto px-8">

    <div className="text-center mb-8 md:mb-10">

      <span className="bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
        WE SERVE ACROSS INDIA
      </span>

      <h2 className="text-3xl md:text-6xl font-black text-slate-900 mt-5 md:mt-6 leading-tight">
        🌍 Our Service Areas
      </h2>

      <p className="text-gray-500 text-base md:text-lg mt-4 max-w-3xl mx-auto leading-8">
        Reliable taxi services across Maharashtra, Madhya Pradesh,
        Telangana and Chhattisgarh with professional drivers and
        well-maintained vehicles.
      </p>

    </div>

    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">

      {[
        "Nagpur",
        "Pune",
        "Mumbai",
        "Nashik",
        "Aurangabad",
        "Hyderabad",
        "Bhopal",
        "Indore",
        "Raipur",
        "Jabalpur",
      ].map((city) => (
        <div
          key={city}
          className="bg-white border border-gray-200 rounded-2xl p-4 md:p-5 min-h-[72px] flex items-center justify-center text-center text-sm md:text-base font-semibold text-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
        >
          📍 {city}
        </div>
      ))}

    </div>

    <div className="mt-10 md:mt-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-6 md:p-10 text-center text-white shadow-2xl">

      <h3 className="text-2xl md:text-3xl font-black mb-4">
        Need Taxi Service In Another City?
      </h3>

      <p className="text-lg text-white/90 mb-6">
        We provide outstation taxi services from Nagpur to destinations across India.
      </p>

      <a
        href="tel:9172271464"
        className="inline-block bg-white text-blue-700 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
      >
        📞 Call Now
      </a>

    </div>

  </div>

</section>

{/* Testimonials */}
<section className="relative py-7 md:py-10 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">

  {/* Background Glow */}
  <div className="absolute top-10 left-0 w-72 h-72 bg-amber-300/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">

      <span className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide border border-amber-200/80 shadow-sm">
        ⭐ CUSTOMER REVIEWS
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-4 md:mt-5 tracking-tight leading-tight">
        What Our Customers Say
      </h2>

      <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 max-w-2xl mx-auto leading-relaxed">
        Trusted by travelers for airport transfers, outstation journeys
        and comfortable travel experiences.
      </p>

    </div>

    {/* Testimonial Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">

      {/* Review 1 */}
      <div className="group relative bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400" />

        <div>

          <div className="flex items-center justify-between mb-4">

            <div className="flex gap-1 text-amber-400 text-base">
              ⭐⭐⭐⭐⭐
            </div>

            <span className="text-4xl text-slate-100 font-black">
              “
            </span>

          </div>

          <p className="text-slate-700 text-sm md:text-base leading-7">
            Excellent service. Clean vehicle, polite driver and perfectly
            on-time pickup. Our Tadoba trip was smooth and comfortable.
          </p>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>

            <h4 className="font-bold text-slate-900 text-sm md:text-base">
              Amit Sharma
            </h4>

            <p className="text-xs text-blue-600 font-medium mt-0.5">
              Nagpur → Tadoba
            </p>

          </div>

        </div>

      </div>

      {/* Review 2 */}
      <div className="group relative bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />

        <div>

          <div className="flex items-center justify-between mb-4">

            <div className="flex gap-1 text-amber-400 text-base">
              ⭐⭐⭐⭐⭐
            </div>

            <span className="text-4xl text-slate-100 font-black">
              “
            </span>

          </div>

          <p className="text-slate-700 text-sm md:text-base leading-7">
            Best airport taxi service in Nagpur. The driver arrived before
            time and the complete booking process was simple and easy.
          </p>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 text-white flex items-center justify-center font-bold">
            P
          </div>

          <div>

            <h4 className="font-bold text-slate-900 text-sm md:text-base">
              Priya Verma
            </h4>

            <p className="text-xs text-blue-600 font-medium mt-0.5">
              Nagpur Airport Transfer
            </p>

          </div>

        </div>

      </div>

      {/* Review 3 */}
      <div className="group relative bg-white rounded-3xl p-6 md:p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col justify-between">

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

        <div>

          <div className="flex items-center justify-between mb-4">

            <div className="flex gap-1 text-amber-400 text-base">
              ⭐⭐⭐⭐⭐
            </div>

            <span className="text-4xl text-slate-100 font-black">
              “
            </span>

          </div>

          <p className="text-slate-700 text-sm md:text-base leading-7">
            Transparent pricing and a very comfortable vehicle. Highly
            recommended for family and long-distance outstation trips.
          </p>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-400 text-white flex items-center justify-center font-bold">
            R
          </div>

          <div>

            <h4 className="font-bold text-slate-900 text-sm md:text-base">
              Rahul Patel
            </h4>

            <p className="text-xs text-blue-600 font-medium mt-0.5">
              Nagpur → Pune
            </p>

          </div>

        </div>

      </div>

    </div>

    {/* Rating Badge */}
    <div className="mt-8 md:mt-10 flex justify-center">

      <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 bg-white px-5 md:px-6 py-3.5 rounded-2xl border border-slate-200 shadow-md">

        <div className="flex text-amber-400 text-lg tracking-tight">
          ⭐⭐⭐⭐⭐
        </div>

        <div className="hidden sm:block h-6 w-px bg-slate-200" />

        <span className="text-slate-800 font-bold text-sm md:text-base">
          4.9/5 Average Customer Rating
        </span>

      </div>

    </div>

  </div>

</section>



{/* Why Choose RC Tours & Travels */}
<section className="relative py-8 md:py-12 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 border-t border-slate-100">

  {/* Background Decoration */}
  <div className="absolute top-10 right-0 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


    {/* Heading */}
    <div className="text-center max-w-4xl mx-auto">

      <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm font-bold tracking-wide border border-blue-200/70 shadow-sm">
        🏆 WHY CHOOSE US
      </span>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-4 md:mt-5 leading-tight tracking-tight">
        Why We Are The Best Taxi Service In Nagpur
      </h2>

      <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto mt-4">
        RC Tours & Travels provides reliable airport transfers, local cab
        services, outstation taxi booking and comfortable travel experiences
        across India.
      </p>

    </div>


    {/* Features Grid */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5 mt-6 md:mt-8">


      {/* Feature 1 */}
      <div className="group bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 text-center border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">

        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
          🚖
        </div>

        <h3 className="text-slate-900 font-bold text-sm md:text-lg">
          Professional Drivers
        </h3>

        <p className="hidden md:block text-slate-500 text-sm mt-2 leading-6">
          Experienced and courteous drivers for a smooth journey.
        </p>

      </div>


      {/* Feature 2 */}
      <div className="group bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 text-center border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">

        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
          💰
        </div>

        <h3 className="text-slate-900 font-bold text-sm md:text-lg">
          Transparent Pricing
        </h3>

        <p className="hidden md:block text-slate-500 text-sm mt-2 leading-6">
          Clear pricing with no unnecessary surprises.
        </p>

      </div>


      {/* Feature 3 */}
      <div className="group bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 text-center border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">

        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
          🛡️
        </div>

        <h3 className="text-slate-900 font-bold text-sm md:text-lg">
          Safe Journey
        </h3>

        <p className="hidden md:block text-slate-500 text-sm mt-2 leading-6">
          Clean, maintained vehicles focused on passenger comfort.
        </p>

      </div>


      {/* Feature 4 */}
      <div className="group bg-white rounded-2xl md:rounded-3xl p-5 md:p-7 text-center border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">

        <div className="w-12 h-12 md:w-16 md:h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
          📞
        </div>

        <h3 className="text-slate-900 font-bold text-sm md:text-lg">
          24×7 Support
        </h3>

        <p className="hidden md:block text-slate-500 text-sm mt-2 leading-6">
          Support whenever you need assistance with your journey.
        </p>

      </div>

    </div>


    {/* Bottom Trust Line */}
    <div className="mt-6 md:mt-8 flex justify-center">

      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold text-blue-700">
        ✓ Trusted Service
        <span className="text-blue-300">•</span>
        ✓ Comfortable Vehicles
        <span className="text-blue-300">•</span>
        ✓ Easy Booking
      </div>

    </div>

  </div>

</section>

{/* Premium CTA Section */}

<section className="relative py-6 md:py-10 overflow-hidden bg-white">

  {/* Soft Background Glow */}
  <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-300/15 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300/15 rounded-full blur-3xl pointer-events-none" />

  <div className="relative max-w-5xl mx-auto px-4 md:px-6 text-center">

    {/* Indigo Premium Card */}
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-900 rounded-3xl md:rounded-[2rem] px-5 py-8 md:px-10 md:py-11 shadow-xl">

      {/* Card Glow */}
      <div className="absolute -top-24 -left-24 w-60 h-60 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative">

        {/* Badge */}
        <span className="inline-flex items-center bg-white/15 border border-white/20 text-indigo-100 px-4 py-1.5 rounded-full text-[11px] md:text-xs font-bold tracking-wide backdrop-blur-sm">
          🚖 BOOK YOUR CAB TODAY
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-black text-white mt-4 md:mt-5 leading-tight">
          Ready For Your
          <span className="text-cyan-300"> Next Journey?</span>
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base text-indigo-100 mt-4 max-w-2xl mx-auto leading-6 md:leading-7">
          Airport Transfers • Outstation Taxi • Corporate Travel • Tour Packages •
          Family Trips • Tempo Traveller Booking
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 md:mt-8">

          {/* Call */}
          <a
            href="tel:9172271464"
            className="bg-white hover:bg-slate-100 text-indigo-800 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            📞 Call Now
          </a>


          {/* WhatsApp */}
          <a
            href="https://wa.me/919172271464"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-bold text-sm text-white shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            💬 WhatsApp Booking
          </a>


          {/* Book Online */}
          <a
            href="/book-cab"
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-bold text-sm shadow-lg hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            🚖 Book Online
          </a>

        </div>


        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-7 md:mt-9">

          {/* Stat 1 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 md:p-4 hover:bg-white/15 transition-all duration-300">

            <h3 className="text-cyan-300 text-lg md:text-3xl font-black">
              5000+
            </h3>

            <p className="text-indigo-100 mt-1 text-[9px] sm:text-[11px] md:text-sm">
              Trips Completed
            </p>

          </div>


          {/* Stat 2 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 md:p-4 hover:bg-white/15 transition-all duration-300">

            <h3 className="text-cyan-300 text-lg md:text-3xl font-black">
              1000+
            </h3>

            <p className="text-indigo-100 mt-1 text-[9px] sm:text-[11px] md:text-sm">
              Happy Customers
            </p>

          </div>


          {/* Stat 3 */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3 md:p-4 hover:bg-white/15 transition-all duration-300">

            <h3 className="text-cyan-300 text-lg md:text-3xl font-black">
              24×7
            </h3>

            <p className="text-indigo-100 mt-1 text-[9px] sm:text-[11px] md:text-sm">
              Customer Support
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

<Footer />

{/* Floating Buttons */}

<div className="fixed bottom-4 md:bottom-6 right-2 md:right-0 z-50 flex flex-col items-center gap-1">

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-2xl flex items-center justify-center text-lg md:text-2xl"
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
  <div className="bg-green-500 text-white px-2 md:px-3 py-1.5 md:py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[9px] md:text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

</div>

);
}