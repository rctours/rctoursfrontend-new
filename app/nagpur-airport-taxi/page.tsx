"use client";

import Image from "next/image";
import Script from "next/script";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",
      name: "Do you provide 24x7 Nagpur Airport taxi service?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RC Tours & Travels provides 24x7 airport pickup and drop taxi service in Nagpur.",
      },
    },

    {
      "@type": "Question",
      name: "Can I pre-book a taxi for Nagpur Airport?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can pre-book your airport taxi through WhatsApp or phone call.",
      },
    },

    {
      "@type": "Question",
      name: "Which vehicles are available?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Swift Dzire, Ertiga, Rumion and Innova Crysta are available.",
      },
    },

    {
      "@type": "Question",
      name: "Do you provide airport pickup and drop?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide both airport pickup and airport drop services.",
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

  areaServed: ["Nagpur"],

  openingHours: "Mo-Su 00:00-23:59",
};

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.jpg",
    price: "Affordable Fare",
  },

  {
    name: "Ertiga",
    image: "/cars/ertiga.jpg",
    price: "Family Friendly",
  },

  {
    name: "Rumion",
    image: "/cars/rumion.jpg",
    price: "Comfort Ride",
  },

  {
    name: "Innova Crysta",
    image: "/cars/crysta.jpg",
    price: "Premium Experience",
  },
];

export default function NagpurAirportTaxiPage() {
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

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-5 text-center">

        <h1 className="text-4xl md:text-6xl font-bold">
          Nagpur Airport Taxi Service
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          Book airport pickup and drop taxi service in Nagpur with RC Tours &
          Travels. Clean cars, verified drivers and 24×7 support.
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
          Why Choose RC Tours & Travels?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ 24×7 Airport Service
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ Professional Drivers
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ Clean Vehicles
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            ✔ On-Time Pickup
          </div>

        </div>

      </section>

      {/* SEO Content */}

      <section className="max-w-5xl mx-auto px-5 mt-16">

        <h2 className="text-3xl font-bold text-center">
          Airport Pickup & Drop Service in Nagpur
        </h2>

        <div className="mt-8 space-y-6 text-gray-300 leading-8">

          <p>
            RC Tours & Travels offers reliable Nagpur Airport taxi service for
            airport pickup and drop. We provide comfortable cars for solo
            travellers, families and business trips.
          </p>

          <p>
            Our taxi service is available from Dr. Babasaheb Ambedkar
            International Airport to all major locations in Nagpur including
            Sitabuldi, Dharampeth, Manish Nagar, Wardha Road, Hingna and
            Dighori.
          </p>

          <p>
            Customers choose us because of affordable pricing, professional
            drivers and timely airport transfers.
          </p>

        </div>

      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-5 mt-16">

        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 mt-8">

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold">
              Do you provide airport pickup and drop?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide both airport pickup and drop services.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold">
              Can I pre-book my airport taxi?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, you can pre-book through WhatsApp or phone.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-5 mt-16 text-center">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-3xl font-bold">
            Book Your Airport Taxi Today
          </h2>

          <p className="text-gray-300 mt-4">
            Fast booking and reliable airport transfers.
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