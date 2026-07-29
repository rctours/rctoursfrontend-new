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
        text: "Yes, RC Tours & Travels provides local taxi service in Nagpur with hourly rental packages and airport transfers.",
      },
    },

    {
      "@type": "Question",
      name: "What local cab packages are available?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "We provide 8-hour and 12-hour local taxi packages in Nagpur.",
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
      name: "Can I book a local taxi through WhatsApp?",

      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can instantly book your local taxi through WhatsApp.",
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
    package: "8 Hr / 80 KM",
  },

  {
    name: "Ertiga",
    image: "/cars/ertiga.jpg",
    package: "8 Hr / 80 KM",
  },

  {
    name: "Rumion",
    image: "/cars/rumion.jpg",
    package: "12 Hr / 120 KM",
  },

  {
    name: "Innova Crysta",
    image: "/cars/crysta.jpg",
    package: "12 Hr / 120 KM",
  },
];

export default function NagpurLocalTaxiPage() {
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
          Local Taxi Service in Nagpur
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          Book local taxi and car rental service in Nagpur with RC Tours &
          Travels. Affordable hourly packages, clean vehicles and experienced
          drivers available 24×7.
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
          Local Rental Vehicles
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
                  {car.package}
                </p>

              </div>

            </div>
          ))}

        </div>

      </section>

      {/* Packages */}

      <section className="max-w-6xl mx-auto px-5 mt-16">

        <h2 className="text-3xl font-bold text-center">
          Popular Local Packages
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">4 Hr / 40 KM</h3>
            <p className="text-gray-300 mt-2">
              Quick city rides and meetings.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">8 Hr / 80 KM</h3>
            <p className="text-gray-300 mt-2">
              Most popular package for local travel.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">12 Hr / 120 KM</h3>
            <p className="text-gray-300 mt-2">
              Best for family trips and events.
            </p>
          </div>

        </div>

      </section>

      {/* SEO Content */}

      <section className="max-w-5xl mx-auto px-5 mt-16">

        <h2 className="text-3xl font-bold text-center">
          Cab Service in Nagpur
        </h2>

        <div className="mt-8 space-y-6 text-gray-300 leading-8">

          <p>
            RC Tours & Travels provides reliable local taxi service in Nagpur
            for families, office travel, weddings, shopping and city tours.
            Our local rental service is available throughout the city.
          </p>

          <p>
            We offer hourly cab packages with clean and comfortable vehicles.
            Customers can choose from Swift Dzire, Ertiga, Rumion and Innova
            Crysta according to their travel needs.
          </p>

          <p>
            Our taxis are available in Dighori, Manish Nagar, Dharampeth,
            Sitabuldi, Wardha Road, Medical Square, Hingna and all major areas
            of Nagpur.
          </p>

          <p>
            Book your local taxi instantly through WhatsApp or phone call and
            enjoy safe and comfortable travel with RC Tours & Travels.
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
              Do you provide local taxi service in Nagpur?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide local taxi service across Nagpur.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold">
              Can I book a taxi for a full day?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide 8-hour and 12-hour packages.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-5xl mx-auto px-5 mt-16 text-center">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">

          <h2 className="text-3xl font-bold">
            Book Your Local Taxi Today
          </h2>

          <p className="text-gray-300 mt-4">
            Fast booking, clean cars and professional drivers.
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