"use client";

import Image from "next/image";
import Script from "next/script";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you provide local taxi service in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RC Tours & Travels provides local taxi service in Nagpur for city travel, meetings, shopping, family trips, events, railway station transfers and other local journeys.",
      },
    },
    {
      "@type": "Question",
      name: "What local taxi packages are available in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RC Tours & Travels offers local rental packages such as 4 hours / 40 km, 8 hours / 80 km and 12 hours / 120 km, subject to vehicle availability and booking requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Which cars are available for local taxi booking?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depending on availability and passenger requirements, customers can book Swift Dzire, Ertiga, Toyota Rumion and Innova Crysta for local travel in Nagpur.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a local taxi in Nagpur on WhatsApp?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Customers can contact RC Tours & Travels through WhatsApp or phone to check availability and book a local taxi in Nagpur.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a taxi for several hours in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Hourly local rental packages are available for customers who need a taxi for meetings, shopping, events, family travel, city visits or multiple stops.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide local taxi service near Dighori and other parts of Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. RC Tours & Travels serves customers across Nagpur and can arrange local taxi services for major areas depending on availability.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "RC Tours & Travels",
  image: "https://www.rctoursandtravels.in/logo.png",
  url: "https://www.rctoursandtravels.in/nagpur-local-taxi",
  telephone: "+919172271464",

  address: {
    "@type": "PostalAddress",
    streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440034",
    addressCountry: "IN",
  },

  areaServed: {
    "@type": "City",
    name: "Nagpur",
  },

  serviceType: [
    "Local Taxi Service",
    "Local Cab Service",
    "Hourly Taxi Rental",
    "City Taxi Service",
  ],

  priceRange: "₹₹",
  openingHours: "Mo-Su 00:00-23:59",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.rctoursandtravels.in/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Nagpur Local Taxi",
      item: "https://www.rctoursandtravels.in/nagpur-local-taxi",
    },
  ],
};

const services = [
  {
    icon: "🏙️",
    title: "City Taxi Service",
    description:
      "Comfortable local cab service for travelling across Nagpur for personal, family and business requirements.",
  },
  {
    icon: "⏱️",
    title: "Hourly Taxi Rental",
    description:
      "Book a taxi for multiple stops, meetings, shopping, appointments, events and city travel.",
  },
  {
    icon: "🚉",
    title: "Railway Station Transfer",
    description:
      "Convenient pickup and drop service for Nagpur railway station and local city travel.",
  },
  {
    icon: "✈️",
    title: "Airport Transfer",
    description:
      "Local taxi support for Nagpur Airport pickup and drop requirements.",
  },
  {
    icon: "💼",
    title: "Business Travel",
    description:
      "Reliable local transportation for meetings, office visits, client travel and business requirements.",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Family & Event Travel",
    description:
      "Comfortable cars for family outings, functions, shopping, weddings and special events.",
  },
];

const packages = [
  {
    title: "4 Hr / 40 KM",
    subtitle: "Short Local Rental",
    description:
      "Suitable for quick city travel, appointments, meetings and limited local usage.",
  },
  {
    title: "8 Hr / 80 KM",
    subtitle: "Popular Local Package",
    description:
      "A practical option for a full working day, shopping, meetings and multiple local stops.",
    popular: true,
  },
  {
    title: "12 Hr / 120 KM",
    subtitle: "Full Day Local Rental",
    description:
      "Suitable for extended city travel, family requirements, events and multiple destinations.",
  },
];

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.webp",
    package: "Ideal for small families",
    description:
      "Comfortable sedan for everyday local taxi requirements in Nagpur.",
  },
  {
    name: "Ertiga",
    image: "/ertiga.webp",
    package: "Ideal for families",
    description:
      "Spacious MPV suitable for family and group local travel.",
  },
  {
    name: "Toyota Rumion",
    image: "/cars/rumion.webp",
    package: "Comfortable family option",
    description:
      "A practical vehicle for longer local trips and family travel.",
  },
  {
    name: "Innova Crysta",
    image: "/cars/crysta.webp",
    package: "Premium comfort",
    description:
      "Premium option for business travel, families and comfortable city journeys.",
  },
];

const areas = [
  "Dighori",
  "Manish Nagar",
  "Wardha Road",
  "Sitabuldi",
  "Dharampeth",
  "Medical Square",
  "Hingna",
  "Sadar",
  "Civil Lines",
  "Trimurti Nagar",
  "Besa",
  "Mihan",
];

const relatedLinks = [
  {
    title: "Taxi Service in Nagpur",
    description:
      "Explore complete taxi and cab services available from Nagpur.",
    href: "/taxi-service-in-nagpur",
  },
  {
    title: "Nagpur Airport Taxi",
    description:
      "Book airport pickup and drop service in Nagpur.",
    href: "/nagpur-airport-taxi",
  },
  {
    title: "Airport Taxi Nagpur",
    description:
      "Explore airport-focused taxi booking options.",
    href: "/airport-taxi-nagpur",
  },
  {
    title: "Complete Fleet",
    description:
      "View available cars, SUVs and traveller options.",
    href: "/fleet",
  },
];

const faqs = [
  {
    question: "Do you provide local taxi service in Nagpur?",
    answer:
      "Yes. RC Tours & Travels provides local taxi service across Nagpur for city travel, meetings, shopping, family trips, events and other local requirements.",
  },
  {
    question: "What local taxi packages are available?",
    answer:
      "Local rental options include 4 Hr / 40 KM, 8 Hr / 80 KM and 12 Hr / 120 KM packages, depending on the vehicle and booking requirement.",
  },
  {
    question: "Which cars can I book for local travel?",
    answer:
      "Swift Dzire, Ertiga, Toyota Rumion and Innova Crysta are among the available options, subject to availability.",
  },
  {
    question: "Can I book a local taxi through WhatsApp?",
    answer:
      "Yes. You can contact RC Tours & Travels on WhatsApp or by phone to check availability and confirm your booking.",
  },
  {
    question: "Can I keep the taxi for several hours?",
    answer:
      "Yes. Hourly rental packages are useful when you need the same taxi for multiple stops, meetings, shopping, appointments or events.",
  },
  {
    question: "Do you provide local taxi service near Dighori?",
    answer:
      "Yes. RC Tours & Travels is based in the Dighori area of Nagpur and serves customers across Nagpur, subject to availability.",
  },
];

export default function NagpurLocalTaxiPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-16 pt-24 text-white">
      {/* ================= SEO SCHEMAS ================= */}

      <Script
        id="nagpur-local-taxi-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="nagpur-local-taxi-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <Script
        id="nagpur-local-taxi-breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* ================= HERO ================= */}

      <section className="mx-auto max-w-7xl px-5">
        <div className="overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/30 px-6 py-10 shadow-2xl md:px-10 md:py-14">
          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-black tracking-wide text-cyan-300">
              🚕 NAGPUR LOCAL TAXI & CAB SERVICE
            </div>

            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">
              Local Taxi Service in Nagpur
            </h1>

            <p className="mx-auto mt-6 max-w-4xl text-base leading-8 text-gray-300 md:text-lg">
              Book a reliable local taxi in Nagpur for city travel, meetings,
              shopping, family trips, railway station transfers, events and
              multiple-stop journeys. RC Tours & Travels provides comfortable
              cars, experienced drivers and convenient local rental packages.
            </p>

            {/* PRIMARY CTA */}

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/book-cab"
                className="rounded-xl bg-yellow-500 px-7 py-3.5 text-sm font-black text-black shadow-lg transition hover:bg-yellow-400 active:scale-95"
              >
                🚕 Book Local Taxi
              </a>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-7 py-3.5 text-sm font-black text-white shadow-lg transition hover:bg-green-500 active:scale-95"
              >
                💬 WhatsApp Booking
              </a>

              <a
                href="tel:+919172271464"
                className="rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/15 active:scale-95"
              >
                📞 Call Now
              </a>
            </div>

            {/* TRUST POINTS */}

            <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">⏱️ Hourly Packages</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  4 Hr, 8 Hr and 12 Hr local rental options.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">🚘 Multiple Vehicles</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Sedan, MPV and premium car options.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-black">📞 Easy Booking</p>
                <p className="mt-1 text-xs leading-5 text-gray-400">
                  Book through online booking, WhatsApp or phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LOCAL SERVICES ================= */}

      <section className="mx-auto mt-16 max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            LOCAL CAB SERVICES
          </span>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Local Taxi Services in Nagpur
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
            Choose a local cab service according to your travel requirement,
            number of stops and duration.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-2xl">
                {service.icon}
              </div>

              <h3 className="mt-5 text-xl font-black">
                {service.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                {service.description}
              </p>

              <a
                href="/book-cab"
                className="mt-5 inline-flex rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-xs font-black text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Check Booking →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PACKAGES ================= */}

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-yellow-400">
            LOCAL RENTAL PACKAGES
          </span>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Nagpur Local Taxi Packages
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-400 md:text-base">
            Flexible local rental options for short city requirements,
            working days, family travel and extended local journeys.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {packages.map((item) => (
            <div
              key={item.title}
              className={`relative rounded-3xl border p-6 ${
                item.popular
                  ? "border-yellow-400/40 bg-yellow-400/5"
                  : "border-slate-800 bg-slate-900"
              }`}
            >
              {item.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-black">
                  Most Popular
                </span>
              )}

              <p className="text-xs font-black uppercase tracking-wider text-cyan-400">
                Local Rental
              </p>

              <h3 className="mt-3 text-2xl font-black">
                {item.title}
              </h3>

              <p className="mt-2 text-sm font-bold text-yellow-400">
                {item.subtitle}
              </p>

              <p className="mt-4 text-sm leading-7 text-gray-400">
                {item.description}
              </p>

              <a
                href="/book-cab"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white/10 px-4 py-3 text-xs font-black transition hover:bg-white/15"
              >
                Check Availability →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-gray-500">
          Package availability and final pricing may vary according to vehicle,
          booking requirement and applicable terms.
        </p>
      </section>

      {/* ================= FLEET ================= */}

      <section className="mx-auto mt-16 max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            LOCAL TAXI FLEET
          </span>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Cars for Local Taxi Booking in Nagpur
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400 md:text-base">
            Select a vehicle according to your passenger count, comfort
            requirement and local travel plan.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {fleet.map((car) => (
            <div
              key={car.name}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >
              <Image
                src={car.image}
                alt={`${car.name} local taxi in Nagpur`}
                width={500}
                height={300}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-black">
                  {car.name}
                </h3>

                <p className="mt-2 text-sm font-bold text-yellow-400">
                  {car.package}
                </p>

                <p className="mt-3 text-xs leading-6 text-gray-400">
                  {car.description}
                </p>

                <a
                  href="/book-cab"
                  className="mt-4 inline-flex rounded-xl bg-white/10 px-4 py-2.5 text-xs font-black transition hover:bg-white/15"
                >
                  Book This Cab →
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href="/fleet"
            className="inline-flex rounded-xl border border-slate-700 bg-slate-900 px-6 py-3 text-sm font-black transition hover:border-cyan-500/40 hover:bg-slate-800"
          >
            View Complete Fleet →
          </a>
        </div>
      </section>

      {/* ================= AREAS ================= */}

      <section className="mx-auto mt-16 max-w-6xl px-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
              NAGPUR LOCAL SERVICE AREA
            </span>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Local Taxi Service Across Nagpur
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-400 md:text-base">
              RC Tours & Travels serves customers across major areas of Nagpur,
              subject to vehicle availability and booking requirements.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {areas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-slate-700 bg-slate-950 px-4 py-2 text-xs font-bold text-gray-300"
              >
                📍 {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEO CONTENT ================= */}

      <section className="mx-auto mt-16 max-w-5xl px-5">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-9">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
              NAGPUR LOCAL CAB GUIDE
            </span>

            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              Reliable Local Taxi and Cab Service in Nagpur
            </h2>
          </div>

          <div className="mt-8 space-y-6 text-sm leading-8 text-gray-300 md:text-base">
            <p>
              RC Tours & Travels provides local taxi service in Nagpur for
              customers who need convenient transportation within the city.
              Whether you are travelling for work, shopping, appointments,
              family requirements, meetings or events, a local cab can make
              travelling between multiple locations easier.
            </p>

            <p>
              Our local taxi service is designed for both short and extended
              city travel. Customers can choose suitable local rental packages
              such as 4 Hr / 40 KM, 8 Hr / 80 KM and 12 Hr / 120 KM according
              to their requirement and vehicle availability.
            </p>

            <p>
              We provide different vehicle options including Swift Dzire,
              Ertiga, Toyota Rumion and Innova Crysta. This allows customers to
              select a practical vehicle for individual travel, families,
              business requirements or groups.
            </p>

            <p>
              Local taxi bookings can be useful for railway station transfers,
              airport transfers, business meetings, shopping trips, family
              outings, weddings, events and multiple-stop city journeys.
              Customers can contact RC Tours & Travels through WhatsApp or
              phone to check availability and booking details.
            </p>

            <p>
              RC Tours & Travels serves major parts of Nagpur including Dighori,
              Manish Nagar, Wardha Road, Sitabuldi, Dharampeth, Medical Square,
              Hingna, Sadar, Civil Lines, Besa, Mihan and surrounding areas,
              subject to availability.
            </p>

            <p>
              If you need a broader taxi service for airport travel or
              outstation journeys, you can also explore our{" "}
              <a
                href="/taxi-service-in-nagpur"
                className="font-bold text-cyan-400 hover:underline"
              >
                taxi service in Nagpur
              </a>
              . For airport-specific travel, visit our{" "}
              <a
                href="/nagpur-airport-taxi"
                className="font-bold text-cyan-400 hover:underline"
              >
                Nagpur airport taxi
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </section>

      {/* ================= RELATED SERVICES ================= */}

      <section className="mx-auto mt-16 max-w-7xl px-5">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            EXPLORE RC TOURS & TRAVELS
          </span>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            More Taxi Services
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {relatedLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-1 hover:border-cyan-500/40"
            >
              <h3 className="text-base font-black text-white">
                {link.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-400">
                {link.description}
              </p>

              <span className="mt-4 inline-flex text-xs font-black text-cyan-400 transition group-hover:translate-x-1">
                Explore →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="mx-auto mt-16 max-w-5xl px-5">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
            LOCAL TAXI FAQ
          </span>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-sm text-gray-400">
            Common questions about local taxi booking in Nagpur.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <h3 className="text-base font-black text-white md:text-lg">
                {faq.question}
              </h3>

              <p className="mt-2 text-sm leading-7 text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL LEAD CTA ================= */}

      <section className="mx-auto mt-16 max-w-5xl px-5 text-center">
        <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-slate-900 to-slate-950 p-8 shadow-2xl md:p-12">
          <div className="text-4xl">🚕</div>

          <h2 className="mt-4 text-3xl font-black md:text-4xl">
            Need a Local Taxi in Nagpur?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-gray-300 md:text-base">
            Get a comfortable cab for city travel, meetings, shopping,
            railway station transfers, events or multiple local stops.
            Contact RC Tours & Travels to check availability.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/book-cab"
              className="rounded-xl bg-yellow-500 px-7 py-3.5 text-sm font-black text-black transition hover:bg-yellow-400 active:scale-95"
            >
              🚕 Book Local Taxi
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 px-7 py-3.5 text-sm font-black text-white transition hover:bg-green-500 active:scale-95"
            >
              💬 WhatsApp Now
            </a>

            <a
              href="tel:+919172271464"
              className="rounded-xl border border-slate-700 bg-white/5 px-7 py-3.5 text-sm font-black text-white transition hover:bg-white/10 active:scale-95"
            >
              📞 Call Now
            </a>
          </div>

          <p className="mt-5 text-xs font-medium text-gray-500">
            Booking support available through phone and WhatsApp.
          </p>
        </div>
      </section>
    </div>
  );
}