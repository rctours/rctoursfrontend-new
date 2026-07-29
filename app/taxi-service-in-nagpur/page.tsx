"use client";

import Image from "next/image";
import Script from "next/script";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a taxi in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a taxi through WhatsApp, phone call or our online booking form.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide airport taxi service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide 24×7 airport pickup and drop service in Nagpur.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide outstation cabs?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide one-way and round-trip taxi services across India.",
      },
    },
    {
      "@type": "Question",
      name: "Which vehicles are available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Dzire, Ertiga, Rumion, Innova Crysta, Tempo Traveller and Force Urbania are available.",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",

  name: "RC Tours & Travels",

  image: "https://www.rctoursandtravels.in/logo.png",

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

  areaServed: [
    "Nagpur",
    "Tadoba",
    "Pench",
    "Pune",
    "Mumbai",
    "Shirdi",
    "Hyderabad",
    "Chikhaldara",
  ],

  priceRange: "₹₹",

  openingHours: "Mo-Su 00:00-23:59",
};

const services = [
  "Local Taxi Service in Nagpur",
  "Airport Pickup & Drop",
  "Outstation Cab Booking",
  "One Way Taxi Service",
  "Round Trip Cab Service",
  "Corporate Travel",
];

const fleet = [
  {
    name: "Swift Dzire",
    image: "/cars/dzire.jpg",
    price: "Starting ₹12/KM",
  },
  {
    name: "Ertiga",
    image: "/cars/ertiga.jpg",
    price: "Starting ₹14/KM",
  },
  {
    name: "Rumion",
    image: "/cars/rumion.jpg",
    price: "Starting ₹15/KM",
  },
  {
    name: "Innova Crysta",
    image: "/cars/crysta.jpg",
    price: "Starting ₹19/KM",
  },
];

export default function TaxiServicePage() {
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
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(localBusinessSchema),
      }}
    />

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">
          Best Taxi Service in Nagpur
        </h1>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto">
          RC Tours & Travels provides reliable local taxi, airport transfer,
          one-way cab and outstation taxi service in Nagpur at affordable
          prices.
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

      {/* Services */}

      <section className="max-w-7xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Our Taxi Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl"
            >
              {service}
            </div>
          ))}
        </div>
      </section>

      {/* Fleet */}

      <section className="max-w-7xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Our Fleet
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-8">
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
            {/* Popular Routes */}

      <section className="max-w-7xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Popular Taxi Routes from Nagpur
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {[
            "Nagpur to Tadoba Cab",
            "Nagpur to Pench Taxi",
            "Nagpur to Pune Cab",
            "Nagpur to Mumbai Taxi",
            "Nagpur to Shirdi Cab",
            "Nagpur to Chikhaldara Taxi",
          ].map((route, index) => (
            <div
              key={index}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl"
            >
              🚖 {route}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}

      <section className="max-w-5xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Frequently Asked Questions
        </h2>

        <div className="mt-8 space-y-4">
          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold text-lg">
              How can I book a taxi in Nagpur?
            </h3>

            <p className="text-gray-300 mt-2">
              You can book a taxi through WhatsApp, phone call or our online
              booking form.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold text-lg">
              Do you provide airport taxi service?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide 24×7 airport pickup and drop service in Nagpur.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold text-lg">
              Do you provide outstation cabs?
            </h3>

            <p className="text-gray-300 mt-2">
              Yes, we provide one-way and round-trip taxi services across India.
            </p>
          </div>

          <div className="bg-slate-900 p-5 rounded-2xl">
            <h3 className="font-semibold text-lg">
              Which vehicles are available?
            </h3>

            <p className="text-gray-300 mt-2">
              Dzire, Ertiga, Rumion, Innova Crysta, Tempo Traveller and Force
              Urbania are available.
            </p>
          </div>
        </div>
      </section>
            {/* SEO Content */}

      <section className="max-w-5xl mx-auto px-5 mt-16">
        <h2 className="text-3xl font-bold text-center">
          Trusted Taxi Service in Nagpur
        </h2>

        <div className="mt-8 space-y-6 text-gray-300 leading-8">
          <p>
            RC Tours & Travels is one of the leading taxi service providers in
            Nagpur, offering local taxi service, airport transfers, outstation
            cab booking and corporate travel solutions. We provide clean cars,
            experienced drivers and affordable pricing for all types of
            journeys.
          </p>

          <p>
            Whether you need a cab for Nagpur Airport, a one-way trip, a family
            vacation or a business tour, our fleet includes Swift Dzire,
            Ertiga, Rumion, Innova Crysta, Tempo Traveller and Force Urbania.
            Our taxi services are available 24×7 with instant booking support.
          </p>

          <p>
            We cover all major destinations from Nagpur, including Tadoba,
            Pench, Chikhaldara, Pune, Mumbai, Hyderabad, Shirdi, Wardha,
            Chandrapur and many more cities across India.
          </p>

          <p>
            Our customers choose RC Tours & Travels because of transparent
            pricing, verified drivers, comfortable vehicles and reliable
            service. You can book your taxi online, through WhatsApp or by
            phone in just a few minutes.
          </p>
        </div>
      </section>

      {/* Final CTA */}

      <section className="max-w-5xl mx-auto px-5 mt-16 text-center">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <h2 className="text-3xl font-bold">
            Book Your Taxi in Nagpur Today
          </h2>

          <p className="text-gray-300 mt-4">
            Call now or send a WhatsApp message to get the best taxi rates in
            Nagpur.
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