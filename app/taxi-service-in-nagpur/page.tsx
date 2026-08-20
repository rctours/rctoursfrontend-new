import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

const SITE_URL = "https://www.rctoursandtravels.in";
const PAGE_URL = `${SITE_URL}/taxi-service-in-nagpur`;
const PHONE = "+919172271464";
const WHATSAPP_URL = "https://wa.me/919172271464";

export const metadata = {
  title:
    "Taxi Service in Nagpur | Cab Booking in Nagpur | RC Tours & Travels",

  description:
    "Looking for a reliable taxi service in Nagpur? Book local taxi, airport cab, one-way and outstation taxi services with RC Tours & Travels. Call or WhatsApp for booking.",

  keywords: [
    "taxi service in nagpur",
    "nagpur taxi service",
    "cab service in nagpur",
    "taxi booking nagpur",
    "cab booking nagpur",
    "taxi in nagpur",
    "taxi services in nagpur",
    "car rental nagpur",
    "outstation taxi service nagpur",
    "airport taxi nagpur",
    "local taxi nagpur",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title:
      "Taxi Service in Nagpur | Cab Booking in Nagpur | RC Tours & Travels",

    description:
      "Book a reliable taxi in Nagpur for local travel, airport transfers, one-way and outstation journeys.",

    url: PAGE_URL,
    siteName: "RC Tours & Travels",
    type: "website",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Taxi Service in Nagpur | RC Tours & Travels",
    description:
      "Local taxi, airport taxi and outstation cab booking in Nagpur.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const taxiServiceSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${PAGE_URL}#taxi-service`,

  name: "RC Tours & Travels",
  url: SITE_URL,
  image: `${SITE_URL}/logo.png`,
  telephone: PHONE,
  priceRange: "₹₹",

  description:
    "Taxi service in Nagpur providing local taxi, airport transfer, one-way and outstation cab services.",

  address: {
    "@type": "PostalAddress",
    streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440034",
    addressCountry: "IN",
  },

  areaServed: [
    {
      "@type": "City",
      name: "Nagpur",
    },
    {
      "@type": "Place",
      name: "Dighori, Nagpur",
    },
    {
      "@type": "Place",
      name: "Maharashtra",
    },
  ],

  serviceType: [
    "Local Taxi Service",
    "Airport Taxi Service",
    "Outstation Taxi Service",
    "One Way Taxi Service",
    "Round Trip Taxi Service",
    "Car Rental With Driver",
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a taxi in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "You can book a taxi in Nagpur through the RC Tours & Travels online booking system, WhatsApp or phone call.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide taxi service throughout Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. RC Tours & Travels provides taxi and cab booking support for local travel across Nagpur and also serves airport, railway station and outstation travel requirements.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide airport taxi service in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. RC Tours & Travels provides airport pickup and drop taxi services in Nagpur.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide outstation taxi service from Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. One-way and round-trip outstation taxi services are available from Nagpur for destinations across Maharashtra and other parts of India.",
      },
    },

    {
      "@type": "Question",
      name: "Which cars are available for taxi booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Depending on availability and passenger requirements, RC Tours & Travels provides cars such as Swift Dzire, Ertiga, Rumion, Innova Crysta and larger vehicles including Tempo Traveller and Force Urbania.",
      },
    },

    {
      "@type": "Question",
      name: "Can I book a taxi from Nagpur for one-way travel?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. One-way taxi booking is available from Nagpur to selected destinations. Fare depends on the route, vehicle and travel requirements.",
      },
    },

    {
      "@type": "Question",
      name: "Is taxi booking support available 24/7?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "RC Tours & Travels provides booking support through phone and WhatsApp throughout the day.",
      },
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

const services = [
  {
    icon: "📍",
    title: "Local Taxi Service in Nagpur",
    description:
      "Book a cab for city travel, meetings, shopping, railway station transfers, family travel and other local journeys in Nagpur.",
    href: "/nagpur-local-taxi",
    button: "Explore Local Taxi",
  },

  {
    icon: "✈️",
    title: "Nagpur Airport Taxi",
    description:
      "Convenient airport pickup and drop taxi service for passengers travelling to and from Nagpur Airport.",
    href: "/nagpur-airport-taxi",
    button: "Airport Taxi",
  },

  {
    icon: "🛣️",
    title: "Outstation Taxi Service",
    description:
      "Travel from Nagpur to nearby cities, tourist destinations and other states with one-way or round-trip cab options.",
    href: "/book-cab",
    button: "Book Outstation Cab",
  },

  {
    icon: "➡️",
    title: "One Way Cab from Nagpur",
    description:
      "Book a convenient one-way taxi from Nagpur when you do not need a return journey.",
    href: "/book-cab",
    button: "Book One Way",
  },

  {
    icon: "🔄",
    title: "Round Trip Taxi",
    description:
      "Choose a round-trip taxi for family holidays, business travel, sightseeing and return journeys.",
    href: "/book-cab",
    button: "Book Round Trip",
  },

  {
    icon: "💼",
    title: "Business & Corporate Travel",
    description:
      "Reliable vehicle options for meetings, airport transfers, employee travel and business journeys.",
    href: "/contact",
    button: "Contact RC Tours",
  },
];

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.jpg",
    description:
      "Comfortable sedan for local and outstation taxi travel.",
  },

  {
    name: "Maruti Ertiga",
    image: "/cars/ertiga.jpg",
    description:
      "Practical family vehicle for comfortable group travel.",
  },

  {
    name: "Toyota Rumion",
    image: "/cars/rumion.jpg",
    description:
      "Spacious vehicle suitable for family and outstation journeys.",
  },

  {
    name: "Innova Crysta",
    image: "/cars/crysta.jpg",
    description:
      "Premium option for comfortable long-distance travel.",
  },
];

const routes = [
  {
    name: "Nagpur to Tadoba Cab",
    description: "Cab service for Tadoba wildlife trips.",
    href: "/nagpur-to-tadoba-cab",
  },

  {
    name: "Nagpur to Pench Cab",
    description: "Book a cab for Pench National Park travel.",
    href: "/nagpur-to-pench-cab",
  },

  {
    name: "Nagpur to Pune Cab",
    description:
      "Outstation taxi option for Nagpur to Pune travel.",
    href: "/book-cab",
  },

  {
    name: "Nagpur to Mumbai Taxi",
    description:
      "Comfortable outstation travel to Mumbai.",
    href: "/book-cab",
  },

  {
    name: "Nagpur to Shirdi Cab",
    description:
      "Taxi booking for Shirdi pilgrimage travel.",
    href: "/book-cab",
  },

  {
    name: "Nagpur to Chikhaldara Taxi",
    description:
      "Cab option for Chikhaldara trips.",
    href: "/book-cab",
  },
];

const faqs = [
  {
    question: "How can I book a taxi in Nagpur?",
    answer:
      "You can book a taxi in Nagpur through our online booking system, WhatsApp or phone call. For a faster response, you can send your pickup, destination, travel date and vehicle requirement on WhatsApp.",
  },

  {
    question: "Do you provide taxi service throughout Nagpur?",
    answer:
      "Yes. RC Tours & Travels provides local taxi booking support across Nagpur for city travel, railway station transfers, airport travel, meetings, shopping and other local requirements.",
  },

  {
    question: "Do you provide airport taxi service in Nagpur?",
    answer:
      "Yes. We provide airport pickup and drop taxi services for passengers travelling to and from Nagpur Airport.",
  },

  {
    question: "Do you provide outstation taxi service from Nagpur?",
    answer:
      "Yes. We provide one-way and round-trip outstation taxi services from Nagpur to destinations across Maharashtra and other parts of India.",
  },

  {
    question: "Which cars are available for taxi booking?",
    answer:
      "Vehicle availability depends on the date and journey. Options include Swift Dzire, Ertiga, Rumion, Innova Crysta and larger group vehicles such as Tempo Traveller and Force Urbania.",
  },

  {
    question: "Can I book a one-way taxi from Nagpur?",
    answer:
      "Yes. One-way taxi booking is available for selected routes. The final fare depends on the destination, vehicle and applicable trip requirements.",
  },

  {
    question: "Is taxi booking support available 24/7?",
    answer:
      "Booking support is available through phone and WhatsApp throughout the day.",
  },
];

export default function TaxiServicePage() {
  return (
    <main className="min-h-screen bg-slate-950 pb-16 pt-20 text-white">

      {/* ================= STRUCTURED DATA ================= */}

      <Script
        id="taxi-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(taxiServiceSchema),
        }}
      />

      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-14 md:py-20">

          <div className="mx-auto max-w-5xl text-center">

            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-[11px] font-black tracking-wider text-cyan-300">
              🚖 RC TOURS & TRAVELS · NAGPUR TAXI SERVICE
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Taxi Service in Nagpur
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-slate-300 md:text-lg">
              Looking for a reliable taxi service in Nagpur? RC Tours &
              Travels provides local taxi, airport taxi, one-way and
              outstation cab services with convenient booking through
              online booking, phone and WhatsApp.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                href="/book-cab"
                className="rounded-2xl bg-yellow-400 px-7 py-4 text-sm font-black text-black shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-300 active:scale-95"
              >
                🚖 Book a Taxi
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-green-600 px-7 py-4 text-sm font-black text-white shadow-lg shadow-green-600/10 transition hover:bg-green-500 active:scale-95"
              >
                💬 WhatsApp Booking
              </a>

              <a
                href={`tel:${PHONE}`}
                className="rounded-2xl border border-slate-700 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10 active:scale-95"
              >
                📞 Call Now
              </a>

            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">

              <Link
                href="/nagpur-local-taxi"
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-cyan-500/40"
              >
                <p className="font-black text-white">
                  📍 Local Taxi
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  City taxi booking across Nagpur.
                </p>
              </Link>

              <Link
                href="/nagpur-airport-taxi"
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-cyan-500/40"
              >
                <p className="font-black text-white">
                  ✈️ Airport Taxi
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Airport pickup and drop service.
                </p>
              </Link>

              <Link
                href="/book-cab"
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-cyan-500/40"
              >
                <p className="font-black text-white">
                  🛣️ Outstation Cab
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  One-way and round-trip travel.
                </p>
              </Link>

            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}

      <section className="mx-auto max-w-7xl px-5 py-8">

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <div className="text-2xl font-black text-cyan-400">
              7+
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
              Years Experience
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <div className="text-2xl font-black text-cyan-400">
              4.9★
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
              Google Rating
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <div className="text-2xl font-black text-cyan-400">
              10K+
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
              Happy Customers
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 text-center">
            <div className="text-2xl font-black text-cyan-400">
              24×7
            </div>

            <p className="mt-1 text-xs font-bold text-slate-400">
              Booking Support
            </p>
          </div>

        </div>
      </section>

      {/* ================= SERVICES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            TAXI & CAB SERVICES
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Taxi & Cab Services in Nagpur
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
            Choose a taxi service according to your journey, destination,
            passenger count and travel requirements.
          </p>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
                {service.icon}
              </div>

              <h3 className="mt-5 text-xl font-black text-white">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {service.description}
              </p>

              <Link
                href={service.href}
                className="mt-5 inline-flex rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-black text-cyan-300 transition group-hover:bg-cyan-500/20"
              >
                {service.button} →
              </Link>

            </div>
          ))}

        </div>
      </section>

      {/* ================= WHY RC ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="grid gap-6 lg:grid-cols-2">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-9">

            <span className="text-xs font-black uppercase tracking-widest text-yellow-400">
              WHY CHOOSE US
            </span>

            <h2 className="mt-3 text-3xl font-black">
              A Better Way to Book a Taxi in Nagpur
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              We focus on making taxi booking simple, convenient and
              transparent for local and outstation travellers.
            </p>

            <div className="mt-7 space-y-4">

              {[
                "Local Nagpur taxi booking",
                "Airport pickup and drop",
                "One-way and round-trip outstation travel",
                "Multiple car and group vehicle options",
                "Phone and WhatsApp booking support",
                "Online cab booking available",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 text-emerald-400">
                    ✓
                  </span>

                  <span className="text-sm font-bold text-slate-200">
                    {item}
                  </span>
                </div>
              ))}

            </div>
          </div>

          <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-900 p-7 md:p-9">

            <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
              EASY BOOKING
            </span>

            <h2 className="mt-3 text-3xl font-black">
              Need a Cab Today?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-300">
              Share your pickup location, destination, travel date and
              vehicle requirement. Our team can help you with the right
              taxi option.
            </p>

            <div className="mt-7 space-y-3">

              <Link
                href="/book-cab"
                className="flex items-center justify-center rounded-2xl bg-yellow-400 px-6 py-4 text-sm font-black text-black transition hover:bg-yellow-300"
              >
                🚖 Start Online Booking
              </Link>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-2xl bg-green-600 px-6 py-4 text-sm font-black text-white transition hover:bg-green-500"
              >
                💬 Send Trip Details on WhatsApp
              </a>

              <a
                href={`tel:${PHONE}`}
                className="flex items-center justify-center rounded-2xl border border-slate-700 bg-white/5 px-6 py-4 text-sm font-black text-white transition hover:bg-white/10"
              >
                📞 Speak to RC Tours & Travels
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* ================= FLEET ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            OUR FLEET
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Cars Available for Taxi Booking
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Select a vehicle according to your passenger count and
            journey requirements. Vehicle availability may vary by date.
          </p>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

          {fleet.map((car) => (
            <div
              key={car.name}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >

              <Image
                src={car.image}
                alt={`${car.name} taxi cab available in Nagpur`}
                width={600}
                height={360}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-xl font-black">
                  {car.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {car.description}
                </p>

                <Link
                  href="/book-cab"
                  className="mt-5 inline-flex rounded-xl bg-white/10 px-4 py-2.5 text-xs font-black text-white transition hover:bg-white/15"
                >
                  Book This Vehicle →
                </Link>

              </div>
            </div>
          ))}

        </div>

        <div className="mt-8 text-center">

          <Link
            href="/fleet"
            className="inline-flex rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-black text-white transition hover:border-cyan-500/40"
          >
            View Complete Fleet →
          </Link>

        </div>

      </section>

      {/* ================= LOCAL + AIRPORT LINKS ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-7 md:p-10">

          <div className="mx-auto max-w-3xl text-center">

            <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
              NAGPUR TAXI SERVICES
            </span>

            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              Local, Airport & Outstation Cab Booking
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base">
              RC Tours & Travels connects Nagpur travellers with local
              taxi, airport transfer and outstation cab options.
            </p>

          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">

            <Link
              href="/nagpur-local-taxi"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40"
            >
              <div className="text-2xl">📍</div>

              <h3 className="mt-3 font-black">
                Nagpur Local Taxi
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                Explore local taxi booking options for travel within Nagpur.
              </p>
            </Link>

            <Link
              href="/nagpur-airport-taxi"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40"
            >
              <div className="text-2xl">✈️</div>

              <h3 className="mt-3 font-black">
                Nagpur Airport Taxi
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                Airport pickup and drop service for Nagpur travellers.
              </p>
            </Link>

            <Link
              href="/airport-taxi-nagpur"
              className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-500/40"
            >
              <div className="text-2xl">🚕</div>

              <h3 className="mt-3 font-black">
                Airport Taxi Nagpur
              </h3>

              <p className="mt-2 text-xs leading-6 text-slate-400">
                Explore airport-focused taxi booking information.
              </p>
            </Link>

          </div>

        </div>
      </section>

      {/* ================= POPULAR ROUTES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10">

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            OUTSTATION TAXI
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Popular Taxi Routes from Nagpur
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Popular destinations for customers looking for taxi and cab
            services from Nagpur.
          </p>

        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >

              <div className="flex items-center justify-between gap-3">

                <h3 className="text-sm font-black text-white">
                  🚖 {route.name}
                </h3>

                <span className="text-cyan-400 transition group-hover:translate-x-1">
                  →
                </span>

              </div>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {route.description}
              </p>

            </Link>
          ))}

        </div>

      </section>

      {/* ================= SEO CONTENT ================= */}

      <section className="mx-auto max-w-5xl px-5 py-10">

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-7 md:p-10">

          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            ABOUT OUR SERVICE
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Reliable Taxi Service in Nagpur for Local & Outstation Travel
          </h2>

          <div className="mt-8 space-y-6 text-sm leading-8 text-slate-300 md:text-base">

            <p>
              RC Tours & Travels provides taxi service in Nagpur for
              customers who need convenient transportation for local travel,
              airport transfers, railway station journeys, business trips,
              family travel and outstation journeys. Our goal is to make
              cab booking simple through online booking, phone and WhatsApp.
            </p>

            <p>
              Customers searching for{" "}
              <strong className="text-white">
                taxi service in Nagpur
              </strong>
              ,{" "}
              <strong className="text-white">
                Nagpur taxi service
              </strong>{" "}
              or{" "}
              <strong className="text-white">
                cab service in Nagpur
              </strong>{" "}
              can choose from local taxi, airport taxi, one-way and
              round-trip travel options according to their journey.
            </p>

            <p>
              For local travel, our{" "}
              <Link
                href="/nagpur-local-taxi"
                className="font-bold text-cyan-400 hover:underline"
              >
                Nagpur local taxi service
              </Link>{" "}
              is designed for city journeys, meetings, shopping, railway
              station transfers and other daily travel requirements.
            </p>

            <p>
              For airport transportation, customers can use our{" "}
              <Link
                href="/nagpur-airport-taxi"
                className="font-bold text-cyan-400 hover:underline"
              >
                Nagpur airport taxi service
              </Link>{" "}
              for airport pickup and drop requirements.
            </p>

            <p>
              RC Tours & Travels also provides outstation taxi options from
              Nagpur. Popular travel requirements include trips towards
              Tadoba, Pench, Chikhaldara, Pune, Mumbai, Hyderabad, Shirdi,
              Wardha, Chandrapur and other destinations. Depending on the
              route, customers can choose one-way or round-trip travel.
            </p>

            <p>
              Our vehicle options include comfortable sedans, family
              vehicles and larger group vehicles. The suitable vehicle
              depends on passenger count, luggage, route and availability on
              the requested travel date.
            </p>

            <p>
              If you need a taxi in Nagpur, you can{" "}
              <Link
                href="/book-cab"
                className="font-bold text-cyan-400 hover:underline"
              >
                start your online cab booking
              </Link>{" "}
              or contact RC Tours & Travels directly through phone or
              WhatsApp.
            </p>

          </div>
        </article>
      </section>

      {/* ================= FAQ ================= */}

      <section className="mx-auto max-w-5xl px-5 py-10">

        <div className="text-center">

          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            FAQ
          </span>

          <h2 className="mt-3 text-3xl font-black md:text-4xl">
            Taxi Service in Nagpur FAQs
          </h2>

          <p className="mt-4 text-sm text-slate-400">
            Answers to common questions about taxi and cab booking.
          </p>

        </div>

        <div className="mt-8 space-y-4">

          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >

              <summary className="cursor-pointer list-none pr-8 text-base font-black text-white">
                {faq.question}
              </summary>

              <p className="mt-4 text-sm leading-7 text-slate-400">
                {faq.answer}
              </p>

            </details>
          ))}

        </div>

      </section>

      {/* ================= FINAL LEAD CTA ================= */}

      <section className="mx-auto max-w-5xl px-5 py-10">

        <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-slate-950 p-8 text-center md:p-12">

          <div className="text-5xl">
            🚖
          </div>

          <h2 className="mt-5 text-3xl font-black md:text-4xl">
            Need a Taxi in Nagpur?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            Book a local taxi, airport cab, one-way taxi or outstation
            vehicle from Nagpur. Start your booking online or contact us
            directly.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

            <Link
              href="/book-cab"
              className="rounded-2xl bg-yellow-400 px-7 py-4 text-sm font-black text-black transition hover:bg-yellow-300 active:scale-95"
            >
              🚖 Book Your Cab
            </Link>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl bg-green-600 px-7 py-4 text-sm font-black text-white transition hover:bg-green-500 active:scale-95"
            >
              💬 WhatsApp Now
            </a>

            <a
              href={`tel:${PHONE}`}
              className="rounded-2xl border border-slate-700 bg-white/5 px-7 py-4 text-sm font-black text-white transition hover:bg-white/10 active:scale-95"
            >
              📞 Call Now
            </a>

          </div>

          <p className="mt-5 text-xs font-medium text-slate-500">
            RC Tours & Travels · Taxi & Cab Booking in Nagpur
          </p>

        </div>

      </section>

    </main>
  );
}