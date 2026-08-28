import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";
import PopularCabRoutes from "@/components/PopularCabRoutes";
import LocalCabPackages from "@/components/LocalCabPackages";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Car,
  CarFront,
  CheckCircle2,
  ChevronRight,
  Clock,
  Clock3,
  Headphones,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Plane,
  ShieldCheck,
  Star,
  Train,
  UserRoundCheck,
  Users,
  WalletCards,
} from "lucide-react";

const SITE_URL = "https://www.rctoursandtravels.in";
const PAGE_URL = `${SITE_URL}/taxi-service-in-nagpur`;
const PHONE = "+919172271464";
const WHATSAPP_URL = "https://wa.me/919172271464";

export const metadata: Metadata = {
  title:
    "Taxi Service in Nagpur | Cab Booking in Nagpur | RC Tours & Travels",

  description:
    "Book a reliable taxi service in Nagpur with RC Tours & Travels. Local taxi, airport cab, railway station pickup, one-way cab and outstation taxi booking with 24×7 support.",

  keywords: [
    "taxi service in nagpur",
    "cab service in nagpur",
    "nagpur taxi service",
    "taxi booking nagpur",
    "cab booking nagpur",
    "local taxi nagpur",
    "local cab nagpur",
    "airport taxi nagpur",
    "nagpur airport taxi",
    "railway station taxi nagpur",
    "one way cab nagpur",
    "outstation taxi nagpur",
    "outstation cab nagpur",
    "car rental nagpur",
    "cab service near me nagpur",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: PAGE_URL,
    siteName: "RC Tours & Travels",
    title:
      "Taxi Service in Nagpur | Cab Booking in Nagpur | RC Tours & Travels",
    description:
      "Book local taxis, airport cabs, railway station transfers, one-way cabs and outstation taxi services from Nagpur.",
    images: [
      {
        url: `${SITE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "RC Tours & Travels Taxi Service in Nagpur",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Taxi Service in Nagpur | Cab Booking in Nagpur | RC Tours & Travels",
    description:
      "Book local, airport and outstation taxis from Nagpur.",
    images: [`${SITE_URL}/og-image.webp`],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const services = [
  {
    icon: Car,
    image: "/services/cab-local.webp",
    title: "Local Taxi Service in Nagpur",
    description:
      "Book comfortable taxis for daily city travel, business meetings, shopping, family trips and local journeys across Nagpur.",
    href: "/nagpur-local-taxi",
  },
  {
    icon: Plane,
    image: "/services/airport-taxi.webp",
    title: "Nagpur Airport Taxi",
    description:
      "Pre-book a taxi for airport pickup and drop with convenient travel support for passengers travelling to and from Nagpur Airport.",
    href: "/nagpur-airport-taxi",
  },
  {
    icon: Train,
    image: "/railway-pickup.webp",
    title: "Railway Station Taxi",
    description:
      "Convenient cab booking for railway station pickup and drop, helping you travel comfortably to your destination.",
    href: "/book-cab",
  },
  {
    icon: Navigation,
    image: "/services/outstation-taxi.webp",
    title: "Outstation Taxi from Nagpur",
    description:
      "Travel from Nagpur to nearby cities, tourist destinations and other locations with comfortable cab options.",
    href: "/book-cab",
  },
  {
    icon: ArrowRight,
    image: "/outstation-travel.webp",
    title: "One Way Cab Booking",
    description:
      "Book a one-way cab when you need a convenient journey without paying for an unnecessary return trip.",
    href: "/book-cab",
  },
  {
    icon: Users,
    image: "/services/corporate-travel.webp",
    title: "Corporate & Group Travel",
    description:
      "Vehicle options for business travel, employee transportation, group journeys and customised travel requirements.",
    href: "/contact",
  },
];

const whyChoose = [
  {
    icon: ShieldCheck,
    title: "Reliable Service",
    text: "Focused on comfortable and dependable taxi booking for your journey.",
  },
  {
    icon: BadgeCheck,
    title: "Suitable Vehicle Options",
    text: "Choose from sedan, SUV and traveller options based on your travel requirements.",
  },
  {
    icon: Clock3,
    title: "Easy Booking",
    text: "Book your cab online, call us directly or connect instantly on WhatsApp.",
  },
  {
    icon: Headphones,
    title: "24×7 Support",
    text: "Get booking assistance whenever you need help with your travel plans.",
  },
];

const faqs = [
  {
    question: "How can I book a taxi in Nagpur?",
    answer:
      "You can book your taxi through our online booking page, call RC Tours & Travels directly, or contact us on WhatsApp.",
  },
  {
    question: "Do you provide airport taxi service in Nagpur?",
    answer:
      "Yes. You can book a taxi for pickup or drop at Nagpur Airport according to your travel schedule.",
  },
  {
    question: "Can I book a taxi for outstation travel from Nagpur?",
    answer:
      "Yes. One-way and round-trip cab options are available for outstation journeys from Nagpur.",
  },
  {
    question: "Do you provide local taxi services in Nagpur?",
    answer:
      "Yes. Local taxi options are available for city travel, business visits, family travel, shopping and other local journeys.",
  },
  {
    question: "Can I book a one-way cab from Nagpur?",
    answer:
      "Yes. You can select the one-way trip option, enter your pickup and drop locations, choose the journey date and continue with the booking process.",
  },
  {
    question: "What types of vehicles are available for taxi booking?",
    answer:
      "Depending on your journey requirements, you can choose from sedan, SUV, premium cab and traveller options.",
  },
];

const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "RC Tours & Travels",
  url: SITE_URL,
  telephone: PHONE,
  priceRange: "₹₹",
  image: `${SITE_URL}/og-image.webp`,
  description:
    "RC Tours & Travels provides taxi service in Nagpur including local taxi, airport transfer, railway station pickup, one-way cab and outstation taxi services.",
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
    addressCountry: "IN",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Nagpur",
    },
    {
      "@type": "AdministrativeArea",
      name: "Maharashtra",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Taxi Service in Nagpur",
      item: PAGE_URL,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default async function TaxiServiceInNagpurPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {

  const resolvedSearchParams = await searchParams;

  const selectedPackageSlug =
    resolvedSearchParams?.package || "4hr-40km";

  const packageMap: Record<string, string> = {
    "4hr-40km": "4 Hr / 40 KM",
    "6hr-60km": "6 Hr / 60 KM",
    "8hr-80km": "8 Hr / 80 KM",
    "12hr-120km": "12 Hr / 120 KM",
  };
  const selectedLocalPackage =
    packageMap[selectedPackageSlug] || "4 Hr / 40 KM";

  return (
  <>
    <main className="min-h-screen bg-white pt-20 text-slate-900">
      <Script
        id="taxi-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(taxiServiceSchema),
        }}
      />

      <Script
        id="taxi-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      <Script
        id="taxi-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* ================= HERO ================= */}
      <section className="relative overflow-visible bg-[#071b45] text-white">
        {/* Background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#07152f] via-[#0a1f46] to-[#06152f]" />

          <div className="absolute left-[62%] top-[18%] h-[380px] w-[600px] -translate-x-1/2 rounded-full bg-[#0d4fc4]/20 blur-[120px]" />

          <div className="absolute right-[-120px] top-[20%] h-[380px] w-[380px] rounded-full bg-blue-600/10 blur-[110px]" />

          <div className="absolute bottom-[-180px] left-[60%] h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-blue-700/15 blur-[120px]" />

          <div className="absolute left-[7%] top-[14%] hidden h-36 w-36 opacity-30 lg:block">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #3b82f6 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>

          <div className="absolute right-[2%] top-[24%] hidden h-52 w-40 opacity-40 lg:block">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #2563eb 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
          </div>
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 pb-0 pt-3 sm:px-6 lg:px-10">
          {/* Breadcrumb */}
          <div className="mb-4 flex items-center gap-2 text-xs text-blue-100/80">
            <Link
              href="/"
              className="inline-flex items-center gap-1 transition hover:text-white"
            >
              <ChevronRight className="h-3.5 w-3.5 rotate-180" />
              Home
            </Link>

            <ChevronRight className="h-3.5 w-3.5 text-blue-300/50" />

            <span className="font-medium text-white/90">
              Taxi Service in Nagpur
            </span>
          </div>

{/* Main Hero */}
<div className="grid items-center gap-1 lg:grid-cols-[0.95fr_1.05fr] lg:gap-3">
  {/* Left */}
  <div className="relative z-10 pt-2 lg:pb-4">
    <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-blue-100 backdrop-blur-sm sm:text-xs">
      <MapPin className="h-3.5 w-3.5 text-cyan-300" />
      NAGPUR • LOCAL • AIRPORT • OUTSTATION
    </div>

    <h1 className="mt-3 max-w-[620px] text-[28px] font-extrabold leading-[1.08] tracking-tight text-white sm:mt-4 sm:text-[36px] lg:text-[42px] xl:text-[46px]">
      Reliable Taxi Service
      <span className="block">in Nagpur</span>
    </h1>

    <p className="mt-3 max-w-[600px] text-[14px] leading-6 text-blue-100/90 sm:mt-4 sm:text-base sm:leading-7">
      Book local taxis, airport cabs, railway station transfers,
      one-way trips and outstation taxi services with RC Tours &
      Travels.
    </p>

    {/* Desktop buttons */}
    <div className="mt-4 hidden flex-col gap-2.5 sm:flex sm:flex-row sm:flex-wrap sm:items-center lg:mt-5">
      <Link
        href="#hero-booking-form"
        className="group inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-white px-5 text-[13px] font-bold text-[#12346f] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
      >
        <CalendarDays className="h-4 w-4" />
        Book Your Taxi
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-emerald-500 px-5 text-[13px] font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-600"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp Now
      </a>

      <a
        href={`tel:${PHONE}`}
        className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/50 bg-white/5 px-5 text-[13px] font-bold text-white shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-white/10"
      >
        <Phone className="h-4 w-4" />
        Call: +91 91722 71464
      </a>
    </div>

{/* Mobile buttons */}
<div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
  <Link
    href="#hero-booking-form"
    className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-white px-2 text-[10px] font-bold text-[#12346f] shadow-lg"
  >
    <CalendarDays className="h-3.5 w-3.5 shrink-0" />
    <span>Book Taxi</span>
  </Link>

  <a 
  href={WHATSAPP_URL} 
  target="_blank" 
  rel="noopener noreferrer" 
  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-2 text-[10px] font-bold text-white shadow-lg transition hover:bg-emerald-600"
  > 
  <FaWhatsapp className="h-4 w-4 shrink-0" /> 
  <span>WhatsApp</span> 
  </a>

  <a
    href={`tel:${PHONE}`}
    className="inline-flex h-11 items-center justify-center gap-1 rounded-lg border border-white/40 bg-white/5 px-2 text-[10px] font-bold text-white"
  >
    <Phone className="h-3.5 w-3.5 shrink-0" />
    <span>Call Now</span>
  </a>
</div>
  </div>

  {/* Right Car - Desktop Only */}
  <div className="relative z-10 mx-auto -mt-1 hidden w-full lg:ml-auto lg:mt-0 lg:block lg:max-w-[680px]">
    <div className="absolute left-[56%] top-1/2 h-[180px] w-[68%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[75px] sm:h-[210px]" />

    <div className="absolute left-[18%] top-[16%] hidden h-[66%] w-[66%] rounded-full border border-blue-400/20 lg:block" />

    <div className="relative mx-auto aspect-[1.9/1] w-[82%] sm:w-[78%] lg:ml-auto">
      <Image
        src="/seo-hero-bg.webp"
        alt="RC Tours and Travels taxi service in Nagpur"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 50vw"
        className="object-contain drop-shadow-[0_18px_25px_rgba(0,0,0,0.42)]"
      />
    </div>
  </div>
</div>

{/* Trust Features */}
<div className="relative z-20 mt-2 grid grid-cols-4 gap-1 py-2 sm:flex sm:flex-wrap sm:items-center sm:justify-start sm:gap-y-4 sm:py-2.5">

  {/* Safe */}
  <div className="flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-2 sm:border-r sm:border-white/15 sm:pr-5 sm:text-left sm:pr-6">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/5 sm:h-9 sm:w-9">
      <ShieldCheck className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
    </div>

    <div>
      <p className="text-[9px] font-bold leading-tight text-white sm:text-[13px]">
        Safe & Secure
      </p>
      <p className="hidden mt-0.5 text-[9px] text-blue-100 sm:block sm:text-[10px]">
        Your safety is our priority
      </p>
    </div>
  </div>

  {/* Support */}
  <div className="flex flex-col items-center justify-center gap-1 text-center sm:ml-5 sm:flex-row sm:gap-2 sm:border-r sm:border-white/15 sm:pr-5 sm:text-left sm:ml-6 sm:pr-6">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/5 sm:h-9 sm:w-9">
      <Headphones className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
    </div>

    <div>
      <p className="text-[9px] font-bold leading-tight text-white sm:text-[13px]">
        24/7 Support
      </p>
      <p className="hidden mt-0.5 text-[9px] text-blue-100 sm:block sm:text-[10px]">
        We are always here
      </p>
    </div>
  </div>

  {/* Pricing */}
  <div className="flex flex-col items-center justify-center gap-1 text-center sm:ml-5 sm:flex-row sm:gap-2 sm:border-r sm:border-white/15 sm:pr-5 sm:text-left sm:ml-6 sm:pr-6">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/5 sm:h-9 sm:w-9">
      <WalletCards className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
    </div>

    <div>
      <p className="text-[9px] font-bold leading-tight text-white sm:text-[13px]">
        Fair Pricing
      </p>
      <p className="hidden mt-0.5 text-[9px] text-blue-100 sm:block sm:text-[10px]">
        Journey-based fare estimate
      </p>
    </div>
  </div>

  {/* Professional */}
  <div className="flex flex-col items-center justify-center gap-1 text-center sm:ml-5 sm:flex-row sm:gap-2 sm:text-left sm:ml-6">
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/5 sm:h-9 sm:w-9">
      <UserRoundCheck className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
    </div>

    <div>
      <p className="text-[9px] font-bold leading-tight text-white sm:text-[13px]">
        Pro Service
      </p>
      <p className="hidden mt-0.5 text-[9px] text-blue-100 sm:block sm:text-[10px]">
        Suitable travel assistance
      </p>
    </div>
  </div>

</div>

{/* Booking Form */}
<div className="relative z-30 mx-auto -mb-[105px] mt-2 w-full max-w-[1500px] px-2 sm:px-5 lg:px-8">
  <form
    id="hero-booking-form"
    action="/book-cab"
    method="GET"
    className="booking-form rounded-2xl bg-white p-2.5 text-slate-900 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:p-4 md:p-5"
  >
    <style>{`
      .booking-form .return-date-field {
        display: none;
      }

      .booking-form:has(input[name="tripType"][value="roundtrip"]:checked)
        .return-date-field {
        display: block;
      }

      @media (min-width: 1280px) {
        .booking-form:has(input[name="tripType"][value="roundtrip"]:checked)
          .booking-fields {
          grid-template-columns: repeat(7, minmax(0, 1fr));
        }
      }
    `}</style>

{/* Trip Types */}
<div className="grid grid-cols-4 gap-1.5 border-b border-slate-100 pb-3 sm:gap-2">
  
  {/* Airport */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="tripType"
      value="airport"
      className="peer sr-only"
    />

    <div className="flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-1 text-[9px] font-bold text-slate-700 transition peer-checked:border-[#1c4488] peer-checked:bg-[#1c4488] peer-checked:text-white peer-checked:shadow-md sm:h-11 sm:gap-2 sm:px-3 sm:text-sm">
      <Plane className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span>Airport</span>
    </div>
  </label>

  {/* One Way */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="tripType"
      value="oneway"
      defaultChecked
      className="peer sr-only"
    />

    <div className="flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-1 text-[9px] font-bold text-slate-700 transition peer-checked:border-[#1c4488] peer-checked:bg-[#1c4488] peer-checked:text-white peer-checked:shadow-md sm:h-11 sm:gap-2 sm:px-3 sm:text-sm">
      <Navigation className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span>One-Way</span>
    </div>
  </label>

  {/* Round Trip */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="tripType"
      value="roundtrip"
      className="peer sr-only"
    />

    <div className="flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-1 text-[9px] font-bold text-slate-700 transition peer-checked:border-[#1c4488] peer-checked:bg-[#1c4488] peer-checked:text-white peer-checked:shadow-md sm:h-11 sm:gap-2 sm:px-3 sm:text-sm">
      <Car className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span>Round-Trip</span>
    </div>
  </label>

  {/* Hourly */}
  <label className="cursor-pointer">
    <input
      type="radio"
      name="tripType"
      value="hourly"
      className="peer sr-only"
    />

    <div className="flex h-9 items-center justify-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-1 text-[9px] font-bold text-slate-700 transition peer-checked:border-[#1c4488] peer-checked:bg-[#1c4488] peer-checked:text-white peer-checked:shadow-md sm:h-11 sm:gap-2 sm:px-3 sm:text-sm">
      <Clock className="h-3 w-3 shrink-0 sm:h-4 sm:w-4" />
      <span>Hourly</span>
    </div>
  </label>

</div>

{/* Fields */}
<div className="booking-fields mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-6">

  {/* 1. Pickup */}
  <div className="min-w-0">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500 sm:h-4 sm:w-4" />
      Pickup
    </label>

    <div className="relative">
      <input
        type="text"
        name="pickup"
        placeholder="Pickup Location"
        required
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 pr-8 text-[11px] font-medium text-slate-700 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:bg-white sm:h-11 sm:px-3 sm:pr-10 sm:text-sm"
      />

      <Navigation className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-blue-600 sm:right-3 sm:h-4 sm:w-4" />
    </div>
  </div>

  {/* 2. Drop */}
  <div className="min-w-0">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <MapPin className="h-3.5 w-3.5 shrink-0 text-rose-500 sm:h-4 sm:w-4" />
      Drop
    </label>

    <div className="relative">
      <input
        type="text"
        name="drop"
        placeholder="Drop Location"
        required
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[11px] font-medium text-slate-700 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-blue-500 focus:bg-white sm:h-11 sm:px-3 sm:text-sm"
      />
    </div>
  </div>

  {/* 3. Date */}
  <div className="min-w-0">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <CalendarCheck className="h-3.5 w-3.5 shrink-0 text-violet-600 sm:h-4 sm:w-4" />
      Date
    </label>

    <input
      id="hero-journey-date"
      type="date"
      name="journeyDate"
      required
      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 text-[10px] font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white sm:h-11 sm:px-3 sm:text-sm"
    />
  </div>

  {/* 4. Time */}
  <div className="min-w-0">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <Clock className="h-3.5 w-3.5 shrink-0 text-orange-500 sm:h-4 sm:w-4" />
      Time
    </label>

    <input
      type="time"
      name="journeyTime"
      required
      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2 text-[11px] font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white sm:h-11 sm:px-3 sm:text-sm"
    />
  </div>

  {/* Return Date - Round Trip only */}
  <div className="return-date-field min-w-0 lg:col-span-1">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <CalendarDays className="h-3.5 w-3.5 shrink-0 text-violet-600 sm:h-4 sm:w-4" />
      Return Date
    </label>

    <input
      id="hero-return-date"
      type="date"
      name="returnDate"
      disabled
      className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-[11px] font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white sm:h-11 sm:px-3 sm:text-sm"
    />
  </div>

  {/* Vehicle */}
  <div className="min-w-0 lg:col-span-1">
    <label className="mb-1 flex items-center gap-1 text-[10px] font-bold text-slate-800 sm:mb-1.5 sm:text-xs">
      <Car className="h-3.5 w-3.5 shrink-0 text-rose-500 sm:h-4 sm:w-4" />
      Vehicle
    </label>

    <select
      name="vehicle"
      defaultValue="Sedan (Dzire / Etios)"
      className="h-10 w-full cursor-pointer rounded-lg border border-slate-200 bg-slate-50 px-3 text-[11px] font-medium text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white sm:h-11 sm:text-sm"
    >
      <option value="Sedan (Dzire / Etios)">
        Sedan (Dzire / Etios)
      </option>
      <option value="SUV (Ertiga)">SUV (Ertiga)</option>
      <option value="Toyota Rumion">Toyota Rumion</option>
      <option value="Innova Crysta">Innova Crysta</option>
      <option value="Tempo Traveller">Tempo Traveller</option>
      <option value="Force Urbania">Force Urbania</option>
    </select>
  </div>

  {/* Book Button */}
  <div className="col-span-2 flex items-end lg:col-span-1">
    <button
      type="submit"
      className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#245ab2] to-[#1747a0] px-3 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:from-[#1d4d9b] hover:to-[#123a85]"
    >
      Book Now
      <ArrowRight className="h-4 w-4" />
    </button>
  </div>

</div>
</form>

            <Script id="hero-booking-form-script" strategy="afterInteractive">
              {`
                (() => {
                  const form = document.getElementById("hero-booking-form");

                  if (!form) return;

                  const pickupInput = form.querySelector('input[name="pickup"]');
                  const dropInput = form.querySelector('input[name="drop"]');
                  const journeyDate = form.querySelector('input[name="journeyDate"]');
                  const journeyTime = form.querySelector('input[name="journeyTime"]');
                  const returnDate = document.getElementById("hero-return-date");
                  const vehicleSelect = form.querySelector('select[name="vehicle"]');
                  const tripTypes = form.querySelectorAll('input[name="tripType"]');

                  let pickupCoords = null;
                  let dropCoords = null;

                  const vehicleRates = {
                    "Sedan (Dzire / Etios)": 11,
                    "SUV (Ertiga)": 13,
                    "Toyota Rumion": 13,
                    "Innova Crysta": 17,
                    "Tempo Traveller": 25,
                    "Force Urbania": 40,
                  };

                  const getSelectedTripType = () => {
                    const selected = form.querySelector(
                      'input[name="tripType"]:checked'
                    );

                    return selected ? selected.value : "oneway";
                  };

                  const syncReturnDate = () => {
                    const tripType = getSelectedTripType();
                    const isRoundTrip = tripType === "roundtrip";

                    if (returnDate) {
                      returnDate.disabled = !isRoundTrip;
                      returnDate.required = isRoundTrip;

                      if (journeyDate && journeyDate.value) {
                        returnDate.min = journeyDate.value;
                      } else {
                        returnDate.removeAttribute("min");
                      }

                      if (!isRoundTrip) {
                        returnDate.value = "";
                      }
                    }
                  };

                  tripTypes.forEach((input) => {
                    input.addEventListener("change", syncReturnDate);
                  });

                  journeyDate?.addEventListener("change", () => {
                    if (returnDate && journeyDate.value) {
                      returnDate.min = journeyDate.value;

                      if (
                        returnDate.value &&
                        returnDate.value < journeyDate.value
                      ) {
                        returnDate.value = journeyDate.value;
                      }
                    }
                  });

                  syncReturnDate();

                  const createSuggestionBox = (input) => {
                    const wrapper = input.parentElement;

                    if (!wrapper) return null;

                    wrapper.style.position = "relative";

                    const existing =
                      wrapper.querySelector(".location-suggestions");

                    if (existing) return existing;

                    const box = document.createElement("div");

                    box.className =
                      "location-suggestions absolute left-0 right-0 top-full z-[100] mt-1 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl";

                    wrapper.appendChild(box);

                    return box;
                  };

                  const clearSuggestions = (input) => {
                    const wrapper = input.parentElement;

                    if (!wrapper) return;

                    const box =
                      wrapper.querySelector(".location-suggestions");

                    if (box) {
                      box.innerHTML = "";
                      box.style.display = "none";
                    }
                  };

                  const setupLocationSearch = (input, locationType) => {
                    if (!input) return;

                    let timeout = null;
                    let controller = null;

                    input.addEventListener("input", () => {
                      if (locationType === "pickup") {
                        pickupCoords = null;
                      } else {
                        dropCoords = null;
                      }

                      const query = input.value.trim();

                      clearSuggestions(input);

                      if (timeout) {
                        clearTimeout(timeout);
                      }

                      if (controller) {
                        controller.abort();
                      }

                      if (!query) return;

                      timeout = setTimeout(async () => {
                        controller = new AbortController();

                        try {
                          const response = await fetch(
                            "/api/location-search?q=" +
                              encodeURIComponent(query),
                            {
                              signal: controller.signal,
                            }
                          );

                          if (!response.ok) {
                            throw new Error("Location search failed");
                          }

                          const data = await response.json();

                          const results = Array.isArray(data)
                            ? data
                            : [];

                          const box = createSuggestionBox(input);

                          if (!box) return;

                          box.innerHTML = "";

                          if (!results.length) {
                            box.style.display = "none";
                            return;
                          }

                          results.slice(0, 6).forEach((location) => {
                            const item =
                              document.createElement("button");

                            item.type = "button";

                            item.className =
                              "block w-full border-b border-slate-100 px-3 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-blue-50";

                            item.innerHTML =
                              '<div class="font-semibold text-slate-800">' +
                              (
                                location.name ||
                                location.display_name ||
                                ""
                              ) +
                              '</div>' +
                              '<div class="mt-0.5 text-xs text-slate-500">' +
                              (
                                location.full_address ||
                                location.display_name ||
                                ""
                              ) +
                              "</div>";

                            item.addEventListener("click", () => {
                              input.value =
                                location.display_name ||
                                location.full_address ||
                                location.name ||
                                "";

                              const coords = {
                                lat: Number(location.lat),
                                lon: Number(location.lon),
                              };

                              if (locationType === "pickup") {
                                pickupCoords = coords;
                              } else {
                                dropCoords = coords;
                              }

                              clearSuggestions(input);
                            });

                            box.appendChild(item);
                          });

                          box.style.display = "block";
                        } catch (error) {
                          if (
                            error &&
                            error.name === "AbortError"
                          ) {
                            return;
                          }

                          console.log(
                            "Location search error:",
                            error
                          );
                        }
                      }, 350);
                    });

                    input.addEventListener("blur", () => {
                      setTimeout(() => {
                        clearSuggestions(input);
                      }, 200);
                    });
                  };

                  setupLocationSearch(
                    pickupInput,
                    "pickup"
                  );

                  setupLocationSearch(
                    dropInput,
                    "drop"
                  );

                  const calculateFare = async () => {
                    const pickup = pickupInput
                      ? pickupInput.value.trim()
                      : "";

                    const drop = dropInput
                      ? dropInput.value.trim()
                      : "";

                    if (!pickup || !drop) {
                      alert(
                        "Please enter Pickup and Drop location."
                      );
                      return null;
                    }

                    const response = await fetch(
                      "/api/distance",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type":
                            "application/json",
                        },
                        body: JSON.stringify({
                          pickup,
                          drop,
                          pickupCoords,
                          dropCoords,
                        }),
                      }
                    );

                    const data = await response.json();

                    if (!data.success) {
                      alert(
                        "Unable to calculate distance. Please select valid locations."
                      );
                      return null;
                    }

                    const distanceKm = Number(
                      data.distance || 0
                    );

                    const tripType =
                      getSelectedTripType();

                    const vehicle =
                      vehicleSelect
                        ? vehicleSelect.value
                        : "Sedan (Dzire / Etios)";

                    const rate =
                      vehicleRates[vehicle] || 11;

                    let totalDistance =
                      distanceKm;

                    let totalFare = 0;

                    let finalTripType =
                      "One Way Trip";

                    if (tripType === "roundtrip") {
                      finalTripType =
                        "Outstation Trip";

                      const startDate =
                        journeyDate?.value
                          ? new Date(
                              journeyDate.value
                            )
                          : null;

                      const endDate =
                        returnDate?.value
                          ? new Date(
                              returnDate.value
                            )
                          : null;

                      let totalDays = 1;

                      if (
                        startDate &&
                        endDate &&
                        endDate >= startDate
                      ) {
                        totalDays =
                          Math.floor(
                            (
                              endDate.getTime() -
                              startDate.getTime()
                            ) /
                              (
                                1000 *
                                60 *
                                60 *
                                24
                              )
                          ) + 1;
                      }

                      if (totalDays > 1) {
                        totalDistance =
                          totalDays * 300;

                        totalFare =
                          totalDistance * rate;
                      } else {
                        totalDistance =
                          distanceKm * 2;

                        totalFare =
                          totalDistance * rate;
                      }
                    } else if (
                      tripType === "oneway"
                    ) {
                      finalTripType =
                        "One Way Trip";

                      totalFare =
                        distanceKm *
                        rate *
                        2;
                    } else if (
                      tripType === "airport"
                    ) {
                      finalTripType =
                        "Airport Pick-Up & Drop";

                      totalFare =
                        distanceKm * rate;
                    } else {
                      finalTripType =
                        "Local Rental";

                      totalFare =
                        distanceKm * rate;
                    }

                    return {
                      distance: Math.round(
                        totalDistance
                      ),
                      fare: Math.round(
                        totalFare
                      ),
                      tripType: finalTripType,
                    };
                  };

                  form.addEventListener(
                    "submit",
                    async (event) => {
                      event.preventDefault();

                      const submitButton =
                        form.querySelector(
                          'button[type="submit"]'
                        );

                      const pickup = pickupInput
                        ? pickupInput.value.trim()
                        : "";

                      const drop = dropInput
                        ? dropInput.value.trim()
                        : "";

                      if (!pickup || !drop) {
                        alert(
                          "Please enter Pickup and Drop location."
                        );
                        return;
                      }

                      if (
                        !journeyDate ||
                        !journeyDate.value
                      ) {
                        alert(
                          "Please select journey date."
                        );
                        return;
                      }

                      if (
                        !journeyTime ||
                        !journeyTime.value
                      ) {
                        alert(
                          "Please select journey time."
                        );
                        return;
                      }

                      if (
                        getSelectedTripType() ===
                          "roundtrip" &&
                        (
                          !returnDate ||
                          !returnDate.value
                        )
                      ) {
                        alert(
                          "Please select return date."
                        );
                        return;
                      }

                      try {
                        if (submitButton) {
                          submitButton.disabled = true;
                          submitButton.innerHTML =
                            "Calculating...";
                        }

                        const result =
                          await calculateFare();

                        if (!result) {
                          return;
                        }

                        const vehicle =
                          vehicleSelect
                            ? vehicleSelect.value
                            : "Sedan (Dzire / Etios)";

                        const pickupLat =
                          pickupCoords?.lat ?? "";

                        const pickupLon =
                          pickupCoords?.lon ?? "";

                        const dropLat =
                          dropCoords?.lat ?? "";

                        const dropLon =
                          dropCoords?.lon ?? "";

                        const bookingUrl =
                          "/book-cab" +
                          "?vehicle=" +
                          encodeURIComponent(vehicle) +
                          "&tripType=" +
                          encodeURIComponent(
                            result.tripType
                          ) +
                          "&pickup=" +
                          encodeURIComponent(
                            pickup
                          ) +
                          "&drop=" +
                          encodeURIComponent(
                            drop
                          ) +
                          "&journeyDate=" +
                          encodeURIComponent(
                            journeyDate.value
                          ) +
                          "&pickupTime=" +
                          encodeURIComponent(
                            journeyTime.value
                          ) +
                          "&returnDate=" +
                          encodeURIComponent(
                            returnDate?.value || ""
                          ) +
                          "&distance=" +
                          encodeURIComponent(
                            result.distance
                          ) +
                          "&fare=" +
                          encodeURIComponent(
                            result.fare
                          ) +
                          "&pickupLat=" +
                          encodeURIComponent(
                            pickupLat
                          ) +
                          "&pickupLon=" +
                          encodeURIComponent(
                            pickupLon
                          ) +
                          "&dropLat=" +
                          encodeURIComponent(
                            dropLat
                          ) +
                          "&dropLon=" +
                          encodeURIComponent(
                            dropLon
                          );

                        window.location.href =
                          bookingUrl;
                      } catch (error) {
                        console.log(
                          "Fare calculation error:",
                          error
                        );

                        alert(
                          "Unable to calculate fare. Please try again."
                        );
                      } finally {
                        if (submitButton) {
                          submitButton.disabled = false;
                          submitButton.innerHTML =
                            'Book Now <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
                        }
                      }
                    }
                  );
                })();
              `}
            </Script>
          </div>
        </div>
      </section>

      {/* Spacer for overlapping form */}
      <section className="relative bg-slate-50 pt-[125px] sm:pt-[135px]" />

{/* ================= TRUST / QUICK INFO ================= */}
<section className="overflow-hidden border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
  <div className="mx-auto max-w-7xl px-2.5 py-4 sm:px-6 sm:py-7 lg:px-8">

    {/* ================= TOP INFO CARDS ================= */}
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-3 sm:overflow-visible lg:grid-cols-4">

      {/* Trip Type */}
      <div className="min-w-[155px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:min-w-0 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
            <MapPin className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
              Trip Type
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-slate-900 sm:text-sm">
              Local & Outstation
            </p>
          </div>
        </div>
      </div>

      {/* Fleet Type */}
      <div className="min-w-[155px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:min-w-0 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
            <Car className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
              Fleet Type
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-slate-900 sm:text-sm">
              Sedan / SUV
            </p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="min-w-[155px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:min-w-0 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
              Availability
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-slate-900 sm:text-sm">
              24 × 7 Support
            </p>
          </div>
        </div>
      </div>

      {/* Advance Booking */}
      <div className="min-w-[155px] flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:min-w-0 sm:px-4 sm:py-3">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 sm:h-9 sm:w-9">
            <CalendarCheck className="h-3.5 w-3.5 text-blue-600 sm:h-4 sm:w-4" />
          </div>

          <div className="min-w-0">
            <p className="text-[10px] font-medium text-slate-500 sm:text-xs">
              Advance Booking
            </p>

            <p className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-slate-900 sm:text-sm">
              Plan Your Journey
            </p>
          </div>
        </div>
      </div>

    </div>


    {/* ================= TRUST BADGES ================= */}
    <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:mt-5 sm:flex-wrap sm:justify-center sm:overflow-visible">

      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm sm:px-3.5 sm:text-xs">
        <BadgeCheck className="h-3.5 w-3.5 text-green-600" />
        Verified Drivers
      </div>

      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm sm:px-3.5 sm:text-xs">
        <Clock3 className="h-3.5 w-3.5 text-blue-600" />
        On-time Pickup
      </div>

      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm sm:px-3.5 sm:text-xs">
        <Star className="h-3.5 w-3.5 text-yellow-500" />
        4.9/5 Rating
      </div>

      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm sm:px-3.5 sm:text-xs">
        <Users className="h-3.5 w-3.5 text-blue-600" />
        10K+ Customers
      </div>

      <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-700 shadow-sm sm:px-3.5 sm:text-xs">
        <Car className="h-3.5 w-3.5 text-slate-700" />
        Nagpur Cab Service
      </div>

    </div>


    {/* ================= SERVICES ================= */}
    <div className="mt-2.5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:mt-3 sm:flex-wrap sm:justify-center sm:overflow-visible">

      <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-[10px] font-semibold text-blue-700 sm:px-3.5 sm:text-xs">
        Taxi Service in Nagpur
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        Local Cab
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        Airport Taxi
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        Railway Pickup
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        Outstation Cab
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        One Way Cab
      </span>

      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-medium text-slate-600 sm:px-3.5 sm:text-xs">
        Round Trip Taxi
      </span>

    </div>

  </div>
</section>

{/* ================= INTRO ================= */}
<section className="mx-auto max-w-7xl px-3 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
  <div className="grid gap-7 sm:gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
    <div>
      <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
        Taxi & Cab Booking in Nagpur
      </span>

      <h2 className="mt-3 text-[26px] font-black leading-tight tracking-tight text-slate-900 sm:mt-5 sm:text-4xl lg:text-5xl lg:leading-[1.15]">
        Reliable Taxi Service in Nagpur for Every Journey
      </h2>

      <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:mt-6 sm:text-base">
        RC Tours & Travels provides convenient taxi and cab booking services
        in Nagpur for local travel, airport transfers, railway station pickup
        and drop, one-way journeys and outstation trips.
      </p>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
        Whether you need a cab for travelling within Nagpur, reaching the
        airport, visiting nearby destinations or planning a longer journey,
        you can choose a suitable vehicle according to your travel
        requirement.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
        {[
          "Local taxi for travel within Nagpur",
          "Nagpur airport pickup and drop",
          "One-way and round trip cab booking",
          "Outstation taxi from Nagpur",
          "Railway station transfer",
          "Family and group travel options",
        ].map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 px-3 py-2.5 transition hover:border-slate-200 hover:bg-slate-50 sm:gap-3 sm:px-4 sm:py-3.5"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 sm:h-5 sm:w-5" />
            <span className="text-[12px] font-semibold text-slate-700 sm:text-sm">
              {item}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:mt-10 sm:flex sm:gap-3.5">
        <Link
          href="#hero-booking-form"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-3 py-2 text-[12px] font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 sm:min-h-[52px] sm:gap-2 sm:px-7 sm:py-3 sm:text-sm"
        >
          <CalendarCheck className="h-4 w-4 sm:h-5 sm:w-5" />
          Book a Cab
        </Link>

        <Link
          href="/book-cab"
          className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-2 text-[12px] font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:min-h-[52px] sm:gap-2 sm:px-7 sm:py-3 sm:text-sm"
        >
          Cab Options
          <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </Link>
      </div>
    </div>

    <div className="relative overflow-hidden rounded-2xl bg-slate-100 shadow-xl ring-1 ring-slate-900/5 sm:rounded-3xl sm:shadow-2xl">
      <div className="relative aspect-[4/3]">
        <Image
          src="/service.webp"
          alt="Taxi service in Nagpur by RC Tours and Travels"
          fill
          sizes="(max-width: 1024px) 100vw, 45vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    </div>
  </div>
</section>

{/* ================= POPULAR CAB ROUTES ================= */}
<PopularCabRoutes />

{/* ================= LOCAL CAB PACKAGES ================= */}
<LocalCabPackages />

{/* ================= SERVICES ================= */}
<section className="bg-slate-50/80 py-9 sm:py-14 lg:py-20">
  <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
        Taxi Services in Nagpur
      </span>

      <h2 className="mt-3 text-[26px] font-black leading-tight text-slate-900 sm:mt-4 sm:text-4xl">
        Cab Services for Every Travel Requirement
      </h2>

      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
        Book a reliable taxi in Nagpur for local travel, airport pickup and
        drop, one-way journeys, round trips, outstation travel, family trips
        and group transportation.
      </p>
    </div>

    <div className="mt-6 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 lg:gap-6">
      {services.map((service) => {
        const Icon = service.icon;

        return (
          <div
            key={service.title}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl"
          >
            <div className="relative h-40 overflow-hidden bg-slate-100 sm:h-52">
              <Image
                src={service.image}
                alt={`${service.title} - RC Tours & Travels Nagpur`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>

            <div className="p-4 sm:p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-12 sm:w-12 sm:rounded-2xl">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <h3 className="mt-3 text-base font-bold text-slate-900 sm:mt-5 sm:text-xl">
                {service.title}
              </h3>

              <p className="mt-2 text-[12px] leading-relaxed text-slate-600 sm:mt-3 sm:text-sm">
                {service.description}
              </p>

              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold text-blue-600 transition hover:text-blue-800 sm:mt-6 sm:gap-2 sm:text-sm"
              >
                View Service Details
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

{/* ================= WHY CHOOSE ================= */}
<section className="mx-auto max-w-7xl px-3 py-9 sm:px-6 sm:py-14 lg:px-8 lg:py-20">
  <div className="mx-auto max-w-3xl text-center">
    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-600 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
      Why Choose RC Tours & Travels
    </span>

    <h2 className="mt-3 text-[26px] font-black leading-tight text-slate-900 sm:mt-4 sm:text-4xl">
      Reliable Cab Booking for Travel in and from Nagpur
    </h2>

    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
      From short local rides to long-distance outstation journeys, choose a
      suitable cab according to your passengers, luggage and travel plans.
    </p>
  </div>

  <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:gap-5 lg:grid-cols-4 lg:gap-6">
    {whyChoose.map((item) => {
      const Icon = item.icon;

      return (
        <div
          key={item.title}
          className="rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:rounded-3xl sm:p-6 lg:p-7"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 sm:h-14 sm:w-14 sm:rounded-2xl">
            <Icon className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>

          <h3 className="mt-3 text-[13px] font-bold leading-snug text-slate-900 sm:mt-5 sm:text-lg">
            {item.title}
          </h3>

          <p className="mt-2 text-[11px] leading-relaxed text-slate-600 sm:mt-3 sm:text-sm">
            {item.text}
          </p>
        </div>
      );
    })}
  </div>

  <div className="mt-6 grid gap-0 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/60 sm:mt-10 sm:grid-cols-3 sm:rounded-3xl">
    <div className="p-4 sm:p-6 lg:p-8">
      <p className="text-lg font-black text-slate-900 sm:text-2xl">
        Local Travel
      </p>
      <p className="mt-1 text-[12px] text-slate-600 sm:text-sm">
        Hourly cab packages for travel within Nagpur.
      </p>
    </div>

    <div className="border-y border-blue-100 p-4 sm:border-x sm:border-y-0 sm:p-6 lg:p-8">
      <p className="text-lg font-black text-slate-900 sm:text-2xl">
        Airport Transfer
      </p>
      <p className="mt-1 text-[12px] text-slate-600 sm:text-sm">
        Convenient pickup and drop for Nagpur Airport.
      </p>
    </div>

    <div className="p-4 sm:p-6 lg:p-8">
      <p className="text-lg font-black text-slate-900 sm:text-2xl">
        Outstation Travel
      </p>
      <p className="mt-1 text-[12px] text-slate-600 sm:text-sm">
        One-way and round-trip cab options from Nagpur.
      </p>
    </div>
  </div>
</section>

{/* ================= AREAS WE SERVE ================= */}
<section className="bg-[#071b45] py-8 text-white sm:py-14 lg:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl">
      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-cyan-300 backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
        Nagpur Service Coverage
      </span>

      <h2 className="mt-2.5 text-2xl font-black leading-tight sm:mt-4 sm:text-4xl">
        Taxi Service Available Across Nagpur
      </h2>

      <p className="mt-2.5 text-xs leading-relaxed text-blue-100 sm:mt-4 sm:text-base">
        RC Tours & Travels provides cab booking options for local travel and
        pickups from different areas of Nagpur. Enter your preferred pickup
        location while booking your cab.
      </p>
    </div>

    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-10 sm:grid-cols-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-4">
      {[
        "Dighori",
        "Narsala",
        "Manish Nagar",
        "Dharampeth",
        "Civil Lines",
        "Pratap Nagar",
        "Bajaj Nagar",
        "Wardhaman Nagar",
        "Sitabuldi",
        "Gokulpeth",
        "Mahal",
        "Sadar",
        "Mankapur",
        "Trimurti Nagar",
        "Hingna",
        "Besa",
      ].map((area) => (
        <div
          key={area}
          className="flex min-w-0 items-center rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-xs font-medium text-blue-50 backdrop-blur-xs transition hover:border-white/20 hover:bg-white/[0.08] sm:rounded-xl sm:px-4 sm:py-3.5 sm:text-sm"
        >
          <MapPin className="mr-2 h-4 w-4 shrink-0 text-cyan-300 sm:mr-2.5 sm:h-4 sm:w-4" />
          <span className="truncate">Taxi in {area}</span>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ================= CAB BOOKING GUIDE ================= */}
<section className="bg-slate-50/70 py-10 sm:py-16 lg:py-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">

      {/* ================= LEFT CONTENT (Sticky on Desktop) ================= */}
      <div className="lg:sticky lg:top-8">
        <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.15em] text-blue-600 sm:text-xs">
          Easy Online Cab Booking
        </span>

        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:mt-4 sm:text-4xl lg:text-5xl">
          How to Book a Taxi in Nagpur Online
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-5 sm:text-base">
          Booking a taxi with RC Tours & Travels is simple. Choose your
          travel destination or city cab, select a suitable vehicle, check
          your fare and enter your journey details to complete your booking
          securely online.
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          You can book local cabs in Nagpur, airport transfers, one-way
          taxis, round trips and outstation journeys. For quick assistance,
          instant booking is also available through WhatsApp or direct phone
          call.
        </p>

        {/* ================= CTA BUTTONS ================= */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3.5">
          <Link
            href="/book-cab"
            className="col-span-2 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-xs font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:bg-blue-700 hover:shadow-blue-600/40 sm:col-span-auto sm:min-h-[52px] sm:px-7 sm:text-sm"
          >
            Book Taxi Online
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>

          <a
            href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-bold text-green-700 transition hover:border-green-300 hover:bg-green-100 sm:min-h-[52px] sm:px-6 sm:text-sm"
          >
            <FaWhatsapp className="h-4 w-4 text-green-600 sm:h-5 sm:w-5" />
            WhatsApp
          </a>

          <a
            href={`tel:${PHONE}`}
            className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:min-h-[52px] sm:px-6 sm:text-sm"
          >
            <Phone className="h-4 w-4 text-slate-500 sm:h-5 sm:w-5" />
            Call Now
          </a>
        </div>

        {/* ================= TRUST TEXT ================= */}
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 sm:mt-6">
          <span className="flex items-center gap-1">✓ Easy Booking</span>
          <span className="flex items-center gap-1">✓ Secure Payment</span>
          <span className="flex items-center gap-1">✓ 24/7 Support</span>
        </div>
      </div>

      {/* ================= BOOKING STEPS ================= */}
      <div className="mt-2 space-y-3 sm:mt-0 sm:space-y-4">
        {[
          {
            step: "01",
            title: "Choose Your Journey",
            text: "Select your destination, local cab requirement, airport transfer or outstation journey from Nagpur.",
          },
          {
            step: "02",
            title: "Select Your Cab",
            text: "Choose a suitable cab based on your passengers, luggage and travel requirements.",
          },
          {
            step: "03",
            title: "Check Fare & Journey Details",
            text: "Review the estimated fare, travel distance and journey information before continuing your booking.",
          },
          {
            step: "04",
            title: "Enter Customer Details",
            text: "Add your name, mobile number, pickup location, journey date and other required booking details.",
          },
          {
            step: "05",
            title: "Pay & Confirm Your Booking",
            text: "Make a secure online payment through Razorpay and receive your booking confirmation instantly.",
          },
        ].map((item) => (
          <div
            key={item.step}
            className="group relative flex gap-3.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition-all duration-300 hover:border-blue-300 hover:shadow-md sm:gap-5 sm:rounded-3xl sm:p-6"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-xs font-black text-white shadow-md shadow-blue-600/20 transition-all group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-2xl sm:text-sm">
              {item.step}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-extrabold leading-tight text-slate-900 sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:mt-1.5 sm:text-sm">
                {item.text}
              </p>
            </div>
          </div>
        ))}

        {/* ================= INSTANT BOOKING BOX ================= */}
        <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50/90 via-emerald-50/40 to-white p-4 shadow-xs sm:rounded-3xl sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-black text-slate-900 sm:text-base">
                Need a cab immediately?
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                Contact RC Tours & Travels directly on WhatsApp or call us for quick assistance.
              </p>
            </div>

            <div className="flex shrink-0 gap-2.5">
              <a
                href={`https://wa.me/${PHONE.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl bg-green-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-green-600/20 transition hover:bg-green-700"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>

              <a
                href={`tel:${PHONE}`}
                className="inline-flex flex-1 sm:flex-none items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs transition hover:border-blue-200 hover:text-blue-600"
              >
                <Phone className="h-4 w-4 text-slate-500" />
                Call Now
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>

{/* ================= POPULAR TAXI ROUTES ================= */}
<section className="bg-slate-50/80 py-7 sm:py-14">
  <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">

    {/* ================= HEADING ================= */}
    <div className="flex flex-col justify-between gap-3 sm:gap-6 lg:flex-row lg:items-end">
      <div className="max-w-3xl">

        <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-blue-600 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
          Popular Cab Routes
        </span>

        <h2 className="mt-2 text-[23px] font-black leading-tight text-slate-900 sm:mt-4 sm:text-4xl">
          Popular Taxi Routes and Airport Services from Nagpur
        </h2>

        <p className="mt-2 text-[12px] leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
          Explore popular taxi routes, airport transfers and dedicated cab
          booking options from Nagpur.
        </p>
      </div>

      <Link
        href="/tour-packages"
        className="inline-flex w-fit items-center gap-1.5 text-[11px] font-bold text-blue-600 transition hover:text-blue-800 sm:gap-2 sm:text-sm"
      >
        Explore Tour Packages
        <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
      </Link>
    </div>

    {/* ================= ROUTE CARDS ================= */}
    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-7 sm:gap-5 lg:grid-cols-4">

      {[
        {
          route: "Nagpur to Pench Cab",
          text: "Cab options for travel from Nagpur to Pench.",
          href: "/nagpur-to-pench-cab",
        },
        {
          route: "Nagpur to Tadoba Cab",
          text: "Plan your cab journey from Nagpur to Tadoba.",
          href: "/nagpur-to-tadoba-cab",
        },
        {
          route: "Nagpur to Chhindwara Cab",
          text: "Book a taxi for travel from Nagpur to Chhindwara.",
          href: "/nagpur-to-chhindwara-cab",
        },
        {
          route: "Nagpur Airport Taxi",
          text: "Airport pickup and drop cab booking options.",
          href: "/nagpur-airport-taxi",
        },
      ].map((route) => (
        <Link
          key={route.route}
          href={route.href}
          className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg sm:min-h-[260px] sm:rounded-3xl sm:p-6 lg:p-7"
        >
          <div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-14 sm:w-14 sm:rounded-2xl">
              <MapPin className="h-4.5 w-4.5 sm:h-7 sm:w-7" />
            </div>

            <h3 className="mt-2.5 text-[12px] font-bold leading-snug text-slate-900 sm:mt-6 sm:text-lg">
              {route.route}
            </h3>

            <p className="mt-1.5 text-[10px] leading-relaxed text-slate-600 sm:mt-2 sm:text-sm">
              {route.text}
            </p>

          </div>

          <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 transition group-hover:text-blue-700 sm:mt-6 sm:gap-1.5 sm:text-sm">
            View Details
            <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1 sm:h-4 sm:w-4" />
          </span>
        </Link>
      ))}
    </div>
  </div>
</section>


{/* ================= FAQ ================= */}
<section className="mx-auto max-w-4xl px-3 py-7 sm:px-6 sm:py-14">

  {/* ================= FAQ HEADING ================= */}
  <div className="text-center">

    <span className="inline-block rounded-full bg-blue-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-blue-600 sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
      Frequently Asked Questions
    </span>

    <h2 className="mt-2 text-[23px] font-black leading-tight text-slate-900 sm:mt-4 sm:text-4xl">
      Taxi Service in Nagpur FAQs
    </h2>

    <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-relaxed text-slate-600 sm:mt-4 sm:text-base">
      Find answers about cab booking in Nagpur, local taxi packages,
      airport transfers and outstation travel.
    </p>
  </div>


  {/* ================= FAQ LIST ================= */}
  <div className="mt-5 space-y-2 sm:mt-10 sm:space-y-4">

    {faqs.map((faq) => (
      <details
        key={faq.question}
        className="group rounded-xl border border-slate-200/80 bg-white px-3.5 py-3 shadow-sm transition-all hover:border-blue-200 hover:shadow-md sm:rounded-2xl sm:px-6 sm:py-5"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[12px] font-bold leading-snug text-slate-900 sm:gap-5 sm:pr-2 sm:text-base">

          {faq.question}

          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-base leading-none text-blue-600 transition group-open:rotate-45 sm:h-7 sm:w-7 sm:text-xl">
            +
          </span>

        </summary>

        <p className="mt-2.5 border-t border-slate-100 pt-2.5 text-[11px] leading-relaxed text-slate-600 sm:mt-4 sm:pt-4 sm:text-sm">
          {faq.answer}
        </p>

      </details>
    ))}

  </div>
</section>


{/* ================= FINAL CTA ================= */}
<section className="mx-auto max-w-7xl px-3 pb-8 sm:px-6 sm:pb-16 lg:px-8 lg:pb-24">

  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071b45] via-[#0b3b91] to-[#1557bf] px-4 py-7 text-center text-white shadow-xl sm:rounded-3xl sm:px-10 sm:py-14 sm:shadow-2xl lg:px-16 lg:py-20">

    {/* Background Effects */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1)_0,transparent_50%)]" />

    <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />


    <div className="relative z-10">

      <span className="inline-block rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.1em] text-cyan-300 backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-xs sm:tracking-[0.18em]">
        Book Your Cab in Nagpur
      </span>


      <h2 className="mx-auto mt-2.5 max-w-4xl text-[25px] font-black leading-tight sm:mt-4 sm:text-4xl lg:text-5xl">
        Looking for a Taxi Service in Nagpur?
      </h2>


      <p className="mx-auto mt-2.5 max-w-2xl text-[12px] leading-relaxed text-blue-100 sm:mt-5 sm:text-base">
        Book a cab for local travel, Nagpur Airport transfer, one-way trips
        or outstation journeys. Choose your travel details and select a
        suitable vehicle.
      </p>


      {/* ================= CTA BUTTONS ================= */}

      <div className="mt-5 grid grid-cols-3 gap-2 sm:mt-9 sm:flex sm:justify-center sm:gap-3.5">

        {/* BOOK CAB */}

        <Link
          href="#hero-booking-form"
          className="inline-flex min-h-[42px] items-center justify-center gap-1 rounded-lg bg-white px-2 py-2 text-[10px] font-bold text-[#092865] shadow-lg transition-all hover:bg-blue-50 sm:min-h-[54px] sm:gap-2 sm:rounded-xl sm:px-7 sm:py-4 sm:text-sm"
        >
          <CalendarCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5" />

          <span className="hidden xs:inline sm:inline">
            Book Your Cab
          </span>

          <span className="sm:hidden">
            Book
          </span>
        </Link>


        {/* WHATSAPP */}

      <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-lg bg-[#20b66b] px-3 py-2 text-[11px] font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#18985a] sm:min-h-[54px] sm:gap-2 sm:rounded-xl sm:px-7 sm:py-4 sm:text-sm"
      >
      <FaWhatsapp className="h-[18px] w-[18px] shrink-0 sm:h-5 sm:w-5" />

      <span className="hidden sm:inline">
        WhatsApp for Booking
      </span>

      <span className="sm:hidden">
        WhatsApp
      </span>
      </a>


        {/* CALL */}

        <a
          href={`tel:${PHONE}`}
          className="inline-flex min-h-[42px] items-center justify-center gap-1 rounded-lg border border-white/20 bg-white/10 px-2 py-2 text-[10px] font-bold text-white backdrop-blur-md transition-all hover:bg-white/20 sm:min-h-[54px] sm:gap-2 sm:rounded-xl sm:px-7 sm:py-4 sm:text-sm"
        >
          <Phone className="h-3.5 w-3.5 sm:h-5 sm:w-5" />

          <span className="hidden sm:inline">
            Call Now
          </span>

          <span className="sm:hidden">
            Call
          </span>
        </a>

      </div>


      <p className="mt-3 text-[9px] font-medium leading-relaxed text-blue-200 sm:mt-6 sm:text-xs">
        Local Cab • Airport Taxi • One Way • Round Trip • Outstation Travel
      </p>

    </div>
  </div>
</section>
      </main>

      <Footer />
    </>
  );
}
