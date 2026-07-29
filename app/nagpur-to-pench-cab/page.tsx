"use client";

import Image from "next/image";
import Script from "next/script";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "What is the fare from Nagpur to Pench?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Nagpur to Pench cab fare starts from ₹2499 depending on the vehicle type and travel plan.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide round trip taxi service to Pench?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide one-way and round-trip taxi service from Nagpur to Pench.",
      },
    },

    {
      "@type": "Question",
      name: "Which cars are available for Pench trip?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Swift Dzire, Ertiga, Rumion, Innova Crysta and Tempo Traveller are available.",
      },
    },

    {
      "@type": "Question",
      name: "Can I book through WhatsApp?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can instantly book your cab through WhatsApp.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",

  "@type": "TaxiService",

  name: "RC Tours & Travels",

  url: "https://www.rctoursandtravels.in",

  telephone: "+919172271464",

  areaServed: ["Nagpur", "Pench"],

  openingHours: "Mo-Su 00:00-23:59",
};

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.jpg",
    price: "Starting ₹2499",
  },

  {
    name: "Ertiga",
    image: "/cars/ertiga.jpg",
    price: "Starting ₹3499",
  },

  {
    name: "Rumion",
    image: "/cars/rumion.jpg",
    price: "Starting ₹3799",
  },

  {
    name: "Innova Crysta",
    image: "/cars/crysta.jpg",
    price: "Starting ₹4999",
  },
];

export default function PenchPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-16">
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <Script
        id="business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Nagpur to Pench Cab Booking
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          Book Nagpur to Pench taxi service with RC Tours & Travels. Safe
          drivers, clean vehicles and 24×7 booking support.
        </p>

        <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
          <a
            href="https://wa.me/919172271464"
            className="bg-green-600 px-6 py-3 rounded-xl font-semibold"
          >
            WhatsApp Booking
          </a>

        </div>
      </section>

      {/* Vehicles */}

      <section className="max-w-7xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Available Vehicles
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {fleet.map((car, index) => (
            <div
              key={index}
              className="bg-slate-900 rounded-2xl overflow-hidden"
            >
              <Image
                src={car.image}
                alt={car.name}
                width={500}
                height={300}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h3 className="text-xl font-semibold">
                  {car.name}
                </h3>

                <p className="text-yellow-400 mt-2">
                  {car.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose */}

      <section className="max-w-5xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ Professional Drivers
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ Clean & Sanitized Cars
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ Affordable Pricing
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ 24×7 Support
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          FAQ
        </h2>

        <div className="space-y-4 mt-8">
          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold">
              What is the fare from Nagpur to Pench?
            </h3>

            <p className="text-gray-300 mt-2">
              Fare starts from ₹2499.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold">
              Do you provide round-trip taxi service?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide one-way and round-trip taxis.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}

      <section className="max-w-5xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Nagpur to Pench Taxi Service
        </h2>

        <div className="mt-8 space-y-6 text-gray-300 leading-8">
          <p>
            RC Tours & Travels provides reliable Nagpur to Pench cab booking
            service for tourists, families and wildlife lovers. We offer
            comfortable taxi service from Nagpur Airport, railway station and
            all areas of Nagpur to Pench National Park.
          </p>

          <p>
            Our Nagpur to Pench taxi service is available 24×7 with trained
            drivers and well-maintained vehicles. Whether you need a one-way
            taxi, round-trip cab or family tour package, we have multiple
            vehicle options including Swift Dzire, Ertiga, Rumion, Innova
            Crysta and Tempo Traveller.
          </p>

          <p>
            The distance from Nagpur to Pench is approximately 130 km and the
            journey takes around 3–4 hours. We provide taxi service to Turia
            Gate, Karmajhiri Gate, Jamtara Gate, Khursapar Gate and Sillari
            Gate.
          </p>

          <p>
            Customers choose RC Tours & Travels because of affordable pricing,
            clean cars, verified drivers and instant booking support through
            WhatsApp and phone call.
          </p>
        </div>
      </section>

      {/* Safari Gates */}

      <section className="max-w-6xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Pench Safari Gates Covered
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {[
            "Turia Gate",
            "Karmajhiri Gate",
            "Jamtara Gate",
            "Khursapar Gate",
            "Sillari Gate",
            "Rukhad Gate",
          ].map((gate, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl"
            >
              🐅 {gate}
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}

      <section className="max-w-5xl mx-auto px-5 mt-16 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <h2 className="text-3xl font-bold">
            Book Nagpur to Pench Cab Today
          </h2>

          <p className="text-gray-300 mt-4">
            Contact us now for instant booking and best taxi fare.
          </p>

          <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
            <a
              href="https://wa.me/919172271464"
              className="bg-green-600 px-6 py-3 rounded-xl font-semibold"
            >
              WhatsApp Booking
            </a>

            <a
              href="tel:+919172271464"
              className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}