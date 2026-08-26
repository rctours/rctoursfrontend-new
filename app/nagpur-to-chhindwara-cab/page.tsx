import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nagpur to Chhindwara Cab | One Way Taxi & Round Trip Cab",
  description:
    "Book a Nagpur to Chhindwara cab with RC Tours & Travels. One way taxi, round trip cab, sedan, SUV, Innova and Tempo Traveller options with professional drivers and 24x7 booking support.",
  keywords: [
    "Nagpur to Chhindwara cab",
    "Nagpur to Chhindwara taxi",
    "Nagpur Chhindwara cab",
    "Nagpur to Chhindwara one way cab",
    "Nagpur to Chhindwara taxi service",
    "Chhindwara to Nagpur cab",
    "outstation taxi from Nagpur",
    "cab booking Nagpur",
    "Nagpur taxi service",
  ],
  alternates: {
    canonical: "/nagpur-to-chhindwara-cab",
  },
  openGraph: {
    title: "Nagpur to Chhindwara Cab | RC Tours & Travels",
    description:
      "Book a reliable Nagpur to Chhindwara taxi for one way or round trip travel with RC Tours & Travels.",
    url: "https://www.rctoursandtravels.in/nagpur-to-chhindwara-cab",
    type: "website",
  },
};

const routeSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Nagpur to Chhindwara Cab Service",
  description:
    "One way and round trip taxi service from Nagpur to Chhindwara.",
  serviceType: "Outstation Taxi Service",
  provider: {
    "@type": "TaxiService",
    name: "RC Tours & Travels",
    url: "https://www.rctoursandtravels.in",
    telephone: "+919172271464",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Nagpur",
    },
    {
      "@type": "City",
      name: "Chhindwara",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How can I book a Nagpur to Chhindwara cab?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can book a Nagpur to Chhindwara cab through RC Tours & Travels by contacting us or using the online cab booking option on our website.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide one-way taxi from Nagpur to Chhindwara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RC Tours & Travels provides one-way taxi service from Nagpur to Chhindwara according to your travel requirements.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book a round trip cab from Nagpur to Chhindwara?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, round trip cab booking is available for Nagpur to Chhindwara and return travel.",
      },
    },
    {
      "@type": "Question",
      name: "Which cars are available for Nagpur to Chhindwara travel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Vehicle options may include sedan, SUV, Innova, Tempo Traveller and other suitable vehicles depending on availability and passenger requirements.",
      },
    },
  ],
};

export default function NagpurToChhindwaraCabPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(routeSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="bg-white">
        {/* HERO */}
        <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
            <p className="text-cyan-300 font-semibold mb-4">
              RC Tours & Travels
            </p>

            <h1 className="text-4xl md:text-6xl font-black leading-tight">
              Nagpur to Chhindwara Cab
            </h1>

            <p className="mt-6 max-w-3xl text-lg md:text-xl text-blue-100 leading-8">
              Looking for a reliable Nagpur to Chhindwara cab? RC Tours &
              Travels provides convenient one-way and round-trip taxi booking
              for families, business travellers, groups and individual
              passengers. Choose a suitable vehicle and enjoy a comfortable
              outstation journey from Nagpur to Chhindwara.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                href="/book-cab"
                className="bg-cyan-400 text-black px-7 py-3 rounded-xl font-bold hover:bg-cyan-300 transition"
              >
                Book Your Cab
              </Link>

              <Link
                href="/fare-calculator"
                className="border border-white/40 px-7 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Check Fare
              </Link>

              <a
                href="tel:+919172271464"
                className="border border-white/40 px-7 py-3 rounded-xl font-bold hover:bg-white hover:text-black transition"
              >
                Call +91 9172271464
              </a>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            Reliable Taxi Service from Nagpur to Chhindwara
          </h2>

          <div className="mt-6 max-w-4xl text-gray-700 text-base md:text-lg leading-8 space-y-5">
            <p>
              RC Tours & Travels offers Nagpur to Chhindwara taxi service for
              travellers looking for a comfortable and convenient outstation
              journey. Whether you are travelling for family visits, business,
              work, tourism or any personal requirement, you can book a
              suitable cab according to your travel plan.
            </p>

            <p>
              Our Nagpur to Chhindwara cab booking options include one-way taxi
              and round-trip travel. Depending on the number of passengers and
              luggage requirements, suitable sedan, SUV, Innova, Tempo
              Traveller or other available vehicle options can be selected.
            </p>

            <p>
              You can use our online booking system to plan your journey, check
              available cab options and book your Nagpur to Chhindwara taxi with
              RC Tours & Travels.
            </p>
          </div>
        </section>

        {/* TAXI OPTIONS */}
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10">
              Nagpur to Chhindwara Taxi Options
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  One Way Cab
                </h3>

                <p className="text-gray-600 leading-7">
                  Book a one-way taxi from Nagpur to Chhindwara according to
                  your travel schedule and destination requirements.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Round Trip Cab
                </h3>

                <p className="text-gray-600 leading-7">
                  Planning to return to Nagpur? Book a round-trip cab for your
                  complete onward and return journey.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Family & Group Travel
                </h3>

                <p className="text-gray-600 leading-7">
                  Choose a suitable sedan, SUV, Innova, Tempo Traveller or
                  larger vehicle based on passenger and luggage requirements.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* VEHICLES */}
        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            Vehicles for Nagpur to Chhindwara Travel
          </h2>

          <p className="mt-5 text-gray-700 text-lg max-w-4xl leading-8">
            Different vehicle categories may be available depending on your
            travel requirements, number of passengers and booking availability.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {[
              "Swift Dzire",
              "Hyundai Aura",
              "Toyota Rumion",
              "Maruti Ertiga",
              "Toyota Innova Crysta",
              "Toyota Hycross",
              "Tempo Traveller",
              "Force Urbania",
            ].map((vehicle) => (
              <div
                key={vehicle}
                className="border border-gray-200 rounded-2xl p-5 font-bold text-gray-900 bg-white hover:shadow-lg transition"
              >
                {vehicle}
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE */}
        <section className="bg-slate-950 text-white py-14 md:py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black">
              Why Choose RC Tours & Travels?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              {[
                {
                  title: "Easy Cab Booking",
                  text: "Book your Nagpur to Chhindwara taxi through our online booking options or by contacting our team.",
                },
                {
                  title: "Professional Drivers",
                  text: "Travel with experienced and professional drivers focused on a comfortable journey.",
                },
                {
                  title: "Multiple Vehicle Options",
                  text: "Choose a suitable sedan, SUV or larger vehicle based on your travel requirements.",
                },
                {
                  title: "24x7 Booking Support",
                  text: "Contact RC Tours & Travels for cab booking assistance and travel requirements.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border border-white/15 rounded-2xl p-6 bg-white/5"
                >
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-slate-300 leading-7">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED DESTINATIONS */}
        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900">
            Popular Cab Destinations from Nagpur
          </h2>

          <p className="mt-5 text-gray-700 max-w-4xl text-lg leading-8">
            RC Tours & Travels provides cab services from Nagpur to popular
            destinations across Maharashtra, Madhya Pradesh and other parts of
            India.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            {[
              "Amravati",
              "Wardha",
              "Bhandara",
              "Gondia",
              "Yavatmal",
              "Akola",
              "Shegaon",
              "Chandrapur",
              "Balaghat",
              "Seoni",
              "Jabalpur",
              "Ramtek",
              "Pench",
              "Tadoba",
              "Pune",
              "Mumbai",
              "Shirdi",
              "Hyderabad",
              "Nashik",
              "Chikhaldara",
              "Tuljapur",
              "Pandharpur",
              "Kolhapur",
              "Goa",
            ].map((city) => (
              <span
                key={city}
                className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-xl font-semibold text-gray-700"
              >
                Nagpur to {city} Cab
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-gray-50 py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-10">
              Nagpur to Chhindwara Cab FAQs
            </h2>

            <div className="space-y-5">
              {[
                {
                  q: "How can I book a Nagpur to Chhindwara cab?",
                  a: "You can contact RC Tours & Travels or use the online cab booking option available on our website.",
                },
                {
                  q: "Do you provide one-way taxi from Nagpur to Chhindwara?",
                  a: "Yes, one-way taxi booking is available according to your travel requirements and booking availability.",
                },
                {
                  q: "Can I book a round trip cab?",
                  a: "Yes, you can book a round-trip cab for Nagpur to Chhindwara and return travel.",
                },
                {
                  q: "Which cars are available for this route?",
                  a: "Depending on availability and passenger requirements, sedan, SUV, Innova, Tempo Traveller and other suitable vehicle options may be available.",
                },
                {
                  q: "Can I check the cab fare before booking?",
                  a: "Yes, you can use the fare calculator on our website or contact RC Tours & Travels for booking assistance.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white border border-gray-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-gray-900">
                    {faq.q}
                  </h3>

                  <p className="mt-3 text-gray-600 leading-7">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
            Explore More RC Tours & Travels Services
          </h2>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/car-rental-in-nagpur"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Car Rental in Nagpur
            </Link>

            <Link
              href="/nagpur-to-pench-cab"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Nagpur to Pench Cab
            </Link>

            <Link
              href="/nagpur-to-tadoba-cab"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Nagpur to Tadoba Cab
            </Link>

            <Link
              href="/taxi-service-in-nagpur"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Taxi Service in Nagpur
            </Link>

            <Link
              href="/nagpur-airport-taxi"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Nagpur Airport Taxi
            </Link>

            <Link
              href="/fare-calculator"
              className="border bg-white px-5 py-3 rounded-xl font-semibold hover:shadow-md transition"
            >
              Taxi Fare Calculator
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-cyan-500 py-14 md:py-20">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-black text-black">
              Book Your Nagpur to Chhindwara Cab
            </h2>

            <p className="mt-5 text-lg text-slate-900">
              Book a one-way or round-trip taxi from Nagpur to Chhindwara with
              RC Tours & Travels.
            </p>

            <div className="flex justify-center flex-wrap gap-4 mt-8">
              <Link
                href="/book-cab"
                className="bg-black text-white px-7 py-3 rounded-xl font-bold hover:scale-105 transition"
              >
                Book Now
              </Link>

              <a
                href="tel:+919172271464"
                className="border-2 border-black px-7 py-3 rounded-xl font-bold text-black"
              >
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}