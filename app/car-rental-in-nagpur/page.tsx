import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Car Rental in Nagpur | Car on Rent, Local & Outstation Cab",
  description:
    "Looking for car rental in Nagpur? RC Tours & Travels offers cars on rent for local travel, airport transfer, outstation trips, family travel and business travel. Book Swift Dzire, Ertiga, Rumion, Innova Crysta, Urbania and Tempo Traveller in Nagpur.",
  keywords: [
    "car rental in nagpur",
    "car rental nagpur",
    "car rent in nagpur",
    "car rent nagpur",
    "car on rent in nagpur",
    "car on rent nagpur",
    "rent a car nagpur",
    "rent a car in nagpur",
    "rent car nagpur",
    "rental car in nagpur",
    "rental car nagpur",
    "rental cars in nagpur",
    "nagpur car rental",
    "nagpur rental car",
    "car rental service nagpur",
    "car rental service in nagpur",
    "car for rent in nagpur",
    "car hire nagpur",
    "private car rental",
    "nagpur car rental service",
    "best car rental in nagpur",
  ],

  alternates: {
    canonical: "/car-rental-in-nagpur",
  },

  openGraph: {
    title: "Car Rental in Nagpur | RC Tours & Travels",
    description:
      "Book reliable cars on rent in Nagpur for local travel, airport pickup and drop, outstation trips and family travel.",
    url: "https://www.rctoursandtravels.in/car-rental-in-nagpur",
    type: "website",
  },
};

const faqData = [
  {
    question: "Which cars are available for rent in Nagpur?",
    answer:
      "RC Tours & Travels offers multiple vehicle options including Swift Dzire, Hyundai Aura, Toyota Rumion, Maruti Ertiga, Innova Crysta, Toyota Hycross, Force Urbania and Tempo Travellers, depending on availability and travel requirements.",
  },
  {
    question: "Can I book a car for local travel in Nagpur?",
    answer:
      "Yes. You can book a car for local travel in Nagpur for personal travel, business meetings, family trips, city travel and other transportation requirements.",
  },
  {
    question: "Do you provide cars for airport pickup and drop in Nagpur?",
    answer:
      "Yes. We provide airport pickup and drop services for travel to and from Dr. Babasaheb Ambedkar International Airport, Nagpur.",
  },
  {
    question: "Can I book a car from Nagpur for an outstation trip?",
    answer:
      "Yes. We provide outstation car rental and cab services from Nagpur to destinations such as Pune, Mumbai, Hyderabad, Shirdi, Tadoba, Pench, Chikhaldara and other locations.",
  },
  {
    question: "How can I book a rental car in Nagpur?",
    answer:
      "You can book through our website booking form, call RC Tours & Travels, or contact us on WhatsApp to discuss your travel requirements.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Car Rental in Nagpur",
  serviceType: "Car Rental Service",
  provider: {
    "@type": "TaxiService",
    name: "RC Tours & Travels",
    url: "https://www.rctoursandtravels.in",
    telephone: "+919172271464",
    address: {
      "@type": "PostalAddress",
      streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
      addressLocality: "Nagpur",
      addressRegion: "Maharashtra",
      postalCode: "440034",
      addressCountry: "IN",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Nagpur",
  },
  url: "https://www.rctoursandtravels.in/car-rental-in-nagpur",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function CarRentalInNagpurPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="bg-white text-gray-900">
        {/* HERO */}
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-4xl">
              <p className="text-cyan-300 font-semibold uppercase tracking-[3px] text-sm mb-4">
                RC Tours & Travels
              </p>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                Car Rental in Nagpur
              </h1>

              <p className="mt-6 text-base sm:text-lg md:text-xl text-blue-100 leading-8 max-w-3xl">
                Looking for a reliable car rental in Nagpur? RC Tours & Travels
                provides comfortable cars on rent for local travel, airport
                pickup and drop, outstation journeys, family trips, corporate
                travel and group transportation.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href="/book-cab"
                  className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950 hover:bg-cyan-300 transition"
                >
                  Book a Car
                </Link>

                <a
                  href="tel:+919172271464"
                  className="inline-flex items-center justify-center rounded-xl border border-white/40 px-6 py-3 font-bold text-white hover:bg-white/10 transition"
                >
                  Call Now: +91 9172271464
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-4xl">
            <p className="text-cyan-700 font-semibold uppercase tracking-[3px] text-sm mb-3">
              Reliable Car Rental Service
            </p>

            <h2 className="text-3xl md:text-5xl font-black">
              Rent a Car in Nagpur for Every Travel Requirement
            </h2>

            <p className="mt-6 text-gray-700 leading-8 text-base md:text-lg">
              Whether you need a car for a short city journey or a long-distance
              trip, choosing the right vehicle can make your travel more
              comfortable. RC Tours & Travels provides car rental services in
              Nagpur for individuals, families, business travelers and groups.
            </p>

            <p className="mt-4 text-gray-700 leading-8 text-base md:text-lg">
              Our vehicle options are suitable for local travel, airport
              transfers, one-way journeys, round trips, sightseeing, family
              functions and corporate transportation. You can choose a suitable
              vehicle according to the number of passengers and your travel
              destination.
            </p>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-5xl font-black">
                Car Rental Services in Nagpur
              </h2>

              <p className="mt-4 text-gray-700 leading-7 md:text-lg">
                Choose a rental car according to your travel plan. We provide
                transportation options for different types of journeys.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🏙️</div>
                <h3 className="text-xl font-bold">Local Car Rental</h3>
                <p className="mt-3 text-gray-600 leading-7">
                  Book a car for city travel, meetings, shopping, personal work
                  and other local transportation needs in Nagpur.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">✈️</div>
                <h3 className="text-xl font-bold">Airport Transfer</h3>
                <p className="mt-3 text-gray-600 leading-7">
                  Convenient airport pickup and drop service for individual,
                  family and business travelers.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">🛣️</div>
                <h3 className="text-xl font-bold">Outstation Car Rental</h3>
                <p className="mt-3 text-gray-600 leading-7">
                  Travel from Nagpur to nearby cities, pilgrimage destinations,
                  wildlife tours and other outstation locations.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-xl font-bold">Family & Group Travel</h3>
                <p className="mt-3 text-gray-600 leading-7">
                  Larger vehicles are available for family journeys, group
                  tours, functions and comfortable long-distance travel.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLES */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-cyan-700 font-semibold uppercase tracking-[3px] text-sm">
              Choose Your Vehicle
            </p>

            <h2 className="mt-3 text-3xl md:text-5xl font-black">
              Cars Available for Rent in Nagpur
            </h2>

            <p className="mt-4 text-gray-700 leading-7 md:text-lg">
              Select a vehicle according to passenger capacity, comfort and
              travel requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {[
              {
                name: "Swift Dzire",
                text: "Comfortable sedan for local and outstation travel.",
              },
              {
                name: "Hyundai Aura",
                text: "Suitable for comfortable city and intercity journeys.",
              },
              {
                name: "Toyota Rumion",
                text: "Spacious option for families and small groups.",
              },
              {
                name: "Maruti Ertiga",
                text: "Popular choice for family and 7-seater travel.",
              },
              {
                name: "Innova Crysta",
                text: "Premium and comfortable option for long journeys.",
              },
              {
                name: "Toyota Hycross",
                text: "Spacious premium travel for families and groups.",
              },
              {
                name: "Force Urbania",
                text: "Premium group travel and comfortable long-distance trips.",
              },
              {
                name: "Tempo Traveller",
                text: "Suitable for group tours and larger travel requirements.",
              },
            ].map((vehicle) => (
              <div
                key={vehicle.name}
                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold">{vehicle.name}</h3>
                <p className="mt-3 text-gray-600 leading-7">
                  {vehicle.text}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/fleet"
              className="inline-flex rounded-xl bg-slate-900 text-white px-6 py-3 font-bold hover:bg-slate-700 transition"
            >
              View Our Fleet
            </Link>
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="bg-slate-950 text-white py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-black">
                Why Choose RC Tours & Travels for Car Rental in Nagpur?
              </h2>

              <p className="mt-5 text-slate-300 leading-8 md:text-lg">
                We focus on making travel convenient by offering suitable
                vehicles for different travel requirements and destinations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {[
                "Multiple vehicle options",
                "Local and outstation travel",
                "Airport pickup and drop",
                "Family and group travel options",
                "Professional travel support",
                "Easy booking assistance",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="font-bold text-lg">✓ {item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-black">
              Car Rental from Nagpur for Outstation Travel
            </h2>

            <p className="mt-6 text-gray-700 leading-8 md:text-lg">
              If you are planning an outstation trip from Nagpur, you can book
              a suitable cab for one-way or round-trip travel. Popular travel
              routes include Pune, Mumbai, Hyderabad, Shirdi, Nashik, Tadoba,
              Pench, Chikhaldara and other destinations.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/nagpur-to-tadoba-cab"
                className="rounded-full border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 transition"
              >
                Nagpur to Tadoba Cab
              </Link>

              <Link
                href="/nagpur-to-pench-cab"
                className="rounded-full border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 transition"
              >
                Nagpur to Pench Cab
              </Link>

              <Link
                href="/taxi-service-in-nagpur"
                className="rounded-full border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 transition"
              >
                Taxi Service in Nagpur
              </Link>

              <Link
                href="/airport-taxi-nagpur"
                className="rounded-full border border-gray-300 px-5 py-3 font-semibold hover:bg-gray-100 transition"
              >
                Airport Taxi Nagpur
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-4xl mx-auto px-5 sm:px-6">
            <h2 className="text-3xl md:text-5xl font-black text-center">
              Car Rental in Nagpur – Frequently Asked Questions
            </h2>

            <div className="mt-10 space-y-4">
              {faqData.map((faq) => (
                <details
                  key={faq.question}
                  className="bg-white border border-gray-200 rounded-xl p-5 group"
                >
                  <summary className="cursor-pointer list-none font-bold text-lg flex justify-between gap-5">
                    <span>{faq.question}</span>
                    <span className="text-cyan-600 group-open:rotate-45 transition">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 text-gray-600 leading-7">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-cyan-500 py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-5 sm:px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-slate-950">
              Looking for a Car on Rent in Nagpur?
            </h2>

            <p className="mt-5 text-slate-800 text-base md:text-xl leading-8">
              Share your pickup location, destination, travel date and number
              of passengers to find a suitable vehicle for your journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/book-cab"
                className="rounded-xl bg-slate-950 text-white px-7 py-4 font-bold hover:bg-slate-800 transition"
              >
                Book Your Car
              </Link>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-2 border-slate-950 text-slate-950 px-7 py-4 font-bold hover:bg-cyan-400 transition"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}