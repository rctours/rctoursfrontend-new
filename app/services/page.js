import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";

import {
  Plane,
  MapPin,
  Building2,
  Bus,
  ShieldCheck,
  IndianRupee,
  Headphones,
  Car,
  Phone,
  MessageCircle,
  Navigation,
} from "lucide-react";

export const metadata = {
  title:
    "Taxi Services In Nagpur | Airport Taxi, Outstation Cab | RC Tours & Travels",

  description:
    "Book airport taxi, local cab booking, outstation taxi, Tempo Traveller rental and corporate travel services in Nagpur. Call RC Tours & Travels at +91 9172271464.",

  keywords:
    "Taxi Service Nagpur, Airport Taxi Nagpur, Cab Booking Nagpur, Outstation Taxi Nagpur, Tempo Traveller Nagpur, Nagpur To Pune Taxi, Nagpur To Hyderabad Taxi, RC Tours And Travels",
};

const services = [
  {
    title: "Airport Taxi Service",
    description:
      "Reliable airport pickup and drop taxi service in Nagpur with professional drivers and clean vehicles.",
    image: "/services/airport-taxi.webp",
    alt: "Airport Taxi Service Nagpur",
    icon: Plane,
  },
  {
    title: "Local Cab Booking",
    description:
      "Affordable local taxi services for city travel, shopping, meetings and daily transportation.",
    image: "/services/cab-local.webp",
    alt: "Local Cab Booking Nagpur",
    icon: MapPin,
  },
  {
    title: "Outstation Taxi",
    description:
      "Comfortable outstation taxi service from Nagpur to Pune, Mumbai, Hyderabad, Indore and more cities.",
    image: "/services/outstation-taxi.webp",
    alt: "Outstation Taxi Nagpur",
    icon: Navigation,
  },
  {
    title: "Corporate Travel",
    description:
      "Professional transportation solutions for companies, business meetings and corporate events.",
    image: "/services/corporate-travel.webp",
    alt: "Corporate Travel Nagpur",
    icon: Building2,
  },
  {
    title: "Tempo Traveller Rental",
    description:
      "Comfortable Tempo Traveller rental for family tours, group travel and pilgrimage trips.",
    image: "/services/tempo-traveller.webp",
    alt: "Tempo Traveller Rental Nagpur",
    icon: Bus,
  },
  {
    title: "Tour Packages",
    description:
      "Customized tour packages for Pench, Tadoba, Chikhaldara, Shirdi, Goa and more.",
    image: "/services/tour-packages.webp",
    alt: "Tour Packages Nagpur",
    icon: MapPin,
  },
];

const routes = [
  "Nagpur → Pench",
  "Nagpur → Tadoba",
  "Nagpur → Chikhaldara",
  "Nagpur → Shirdi",
  "Nagpur → Hyderabad",
  "Nagpur → Pune",
  "Nagpur → Mumbai",
  "Nagpur → Goa",
  "Nagpur → Bhopal",
  "Nagpur → Indore",
  "Nagpur → Raipur",
  "Nagpur → Jabalpur",
];

const areas = [
  "Nagpur City",
  "Sitabuldi",
  "Dharampeth",
  "Ramdaspeth",
  "Sadar",
  "Civil Lines",
  "Wardha Road",
  "Airport Area",
  "Manish Nagar",
  "Pratap Nagar",
  "Trimurti Nagar",
  "Laxmi Nagar",
  "Bajaj Nagar",
  "Hingna",
  "MIDC Hingna",
  "MIHAN",
  "Besa",
  "Manewada",
  "Dighori",
  "Narsala",
  "Hudkeshwar",
  "Kamptee",
  "Koradi",
  "Katol Road",
  "Amravati Road",
  "Wadi",
  "Friends Colony",
  "Jaripatka",
  "Pardi",
  "Kalamna",
  "Nandanvan",
  "Medical Square",
  "Mahal",
  "Itwari",
  "Gittikhadan",
  "Zingabai Takli",
  "Pachpaoli",
  "Mankapur",
  "Omkar Nagar",
  "Narendra Nagar",
  "Wardhaman Nagar",
  "Ajni",
  "Chhatrapati Square",
  "Shankar Nagar",
  "Beltarodi",
  "Pipla",
  "Butibori",
  "Umred Road",
  "Ramtek",
  "Savner",
  "Kuhi",
  "Bhandara Road",
];

export default function ServicesPage() {
  return (
    <main className="bg-white text-slate-900">

      {/* Hero Section */}
      <section className="pt-24 pb-10 md:pt-28 md:pb-14">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">

          <span className="inline-flex bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-xs md:text-sm font-semibold">
            RC TOURS & TRAVELS NAGPUR
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mt-4 md:mt-6 leading-tight">
            Taxi Services In Nagpur
          </h1>

          <p className="max-w-4xl mx-auto text-sm sm:text-base md:text-xl text-gray-600 mt-4 md:mt-6 leading-7 md:leading-9">
            Airport Taxi, Local Cab Booking, Outstation Taxi, Corporate Travel,
            Tempo Traveller Rental and Tour Packages from Nagpur.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6 md:mt-8">

            <a
              href="tel:+919172271464"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition"
            >
              <Phone size={18} />
              Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl font-bold text-sm md:text-base transition"
            >
              <MessageCircle size={18} />
              WhatsApp Booking
            </a>

          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-slate-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-7 md:mb-10">
            Our Taxi Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="bg-white shadow-lg hover:shadow-xl rounded-2xl overflow-hidden border border-slate-200 transition duration-300"
                >
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-40 md:h-48 object-cover"
                    />

                    <div className="absolute top-3 right-3 bg-white/95 p-2 rounded-xl shadow">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>

                  <div className="p-4 md:p-6">
                    <h3 className="text-lg md:text-xl font-bold mb-2">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base leading-6 md:leading-7">
                      {service.description}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

{/* Vehicles */}
<section className="border-t border-slate-200 py-7 md:py-9">
  <div className="max-w-7xl mx-auto px-4 md:px-8">

    {/* Heading */}
    <div className="text-center mb-6 md:mb-8">
      <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold tracking-wide">
        <Car className="w-3.5 h-3.5" />
        RC TOURS & TRAVELS FLEET
      </span>

      <h2 className="text-2xl md:text-4xl font-black text-slate-900 mt-3">
        Vehicles Available
      </h2>

      <p className="text-xs md:text-sm text-gray-600 mt-2">
        Choose the perfect vehicle for your journey
      </p>
    </div>

    {/* Vehicle Cards */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

      {[
        {
          name: "Swift Dzire",
          image: "/swift-dzire.webp",
          type: "Sedan",
        },
        {
          name: "Maruti Ertiga",
          image: "/ertiga.webp",
          type: "SUV",
        },
        {
          name: "Innova Crysta",
          image: "/innova-crysta.webp",
          type: "Premium",
        },
        {
          name: "Tempo Traveller",
          image: "/tempo traveller.webp",
          type: "Group Travel",
        },
      ].map((car) => (
        <div
          key={car.name}
          className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          {/* Vehicle Image */}
          <div className="relative overflow-hidden bg-slate-100">
            <img
              src={car.image}
              alt={`${car.name} taxi service in Nagpur`}
              className="w-full h-28 sm:h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Vehicle Type */}
            <span className="absolute top-2 left-2 bg-white/95 text-blue-700 border border-blue-100 px-2 py-1 rounded-lg text-[8px] sm:text-[9px] md:text-xs font-bold shadow-sm">
              {car.type}
            </span>
          </div>

          {/* Vehicle Details */}
          <div className="p-3 md:p-4 text-center">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-slate-900">
              {car.name}
            </h3>

            <div className="flex items-center justify-center gap-1 text-[10px] md:text-xs text-green-600 mt-1.5 font-medium">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Available for Booking
            </div>
          </div>
        </div>
      ))}

    </div>

    {/* Bottom CTA */}
    <div className="flex justify-center mt-5 md:mt-7">
      <a
        href="/fleet"
        className="inline-flex items-center gap-2 bg-slate-900 hover:bg-blue-700 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 hover:-translate-y-0.5"
      >
        <Car className="w-4 h-4" />
        View Complete Fleet
      </a>
    </div>

  </div>
</section>

      {/* Why Choose Us */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-7 md:mb-10">
            Why Choose RC Tours & Travels
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

            <div className="bg-white p-4 md:p-6 rounded-2xl text-center border shadow-sm">
              <Car className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm md:text-lg">
                Professional Drivers
              </h3>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl text-center border shadow-sm">
              <IndianRupee className="w-8 h-8 md:w-10 md:h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm md:text-lg">
                Transparent Pricing
              </h3>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl text-center border shadow-sm">
              <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-blue-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm md:text-lg">
                Safe Journey
              </h3>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-2xl text-center border shadow-sm">
              <Headphones className="w-8 h-8 md:w-10 md:h-10 text-purple-600 mx-auto mb-3" />
              <h3 className="font-bold text-sm md:text-lg">
                24×7 Support
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-7 md:mb-10">
            Popular Routes From Nagpur
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            {routes.map((route) => (
              <div
                key={route}
                className="bg-slate-50 rounded-xl p-3 md:p-4 text-center border border-slate-200 text-xs md:text-base font-medium hover:shadow-md transition"
              >
                {route}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-3 md:mb-4">
            Taxi Service Available Across Nagpur & Nearby Areas
          </h2>

          <p className="text-center text-gray-600 max-w-4xl mx-auto mb-6 md:mb-8 text-sm md:text-base leading-7">
            RC Tours & Travels provides airport taxi, local cab booking,
            outstation taxi and Tempo Traveller services across Nagpur city,
            MIHAN, Hingna, Wardha Road, Besa, Manewada, Dighori, Narsala,
            Kamptee, Wadi, Butibori, Ramtek and nearby locations.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 md:gap-3">

            {areas.map((area) => (
              <div
                key={area}
                className="bg-slate-50 rounded-xl p-2.5 md:p-3 text-center border border-slate-200 text-xs md:text-sm hover:shadow-md transition"
              >
                {area}
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-5xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-7 md:mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-3">

            {[
              {
                q: "What is the taxi fare from Nagpur Airport?",
                a: "Taxi fare depends on pickup and drop location. Contact RC Tours & Travels for an instant fare quote.",
              },
              {
                q: "Do you provide outstation taxi service from Nagpur?",
                a: "Yes, we provide outstation taxi service from Nagpur to Pune, Mumbai, Hyderabad, Indore, Bhopal, Shirdi and many more destinations.",
              },
              {
                q: "Is Tempo Traveller available in Nagpur?",
                a: "Yes, we provide Tempo Traveller rental for family trips, corporate tours, pilgrimages and group travel.",
              },
              {
                q: "Do you offer one-way taxi service?",
                a: "Yes, one-way and round-trip taxi services are available for local and outstation routes.",
              },
              {
                q: "How can I book a taxi in Nagpur?",
                a: "You can call us directly at +91 9172271464 or book your taxi through WhatsApp.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="bg-slate-50 border border-slate-200 p-4 md:p-5 rounded-2xl"
              >
                <h3 className="font-bold text-sm md:text-lg mb-2">
                  {faq.q}
                </h3>

                <p className="text-gray-600 text-sm md:text-base leading-6">
                  {faq.a}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-3">
            Contact RC Tours & Travels
          </h2>

          <p className="text-center text-gray-600 text-sm md:text-base max-w-3xl mx-auto mb-6 md:mb-8 leading-7">
            Looking for Airport Taxi, Local Cab, Outstation Taxi or Tempo
            Traveller in Nagpur? Contact our team today for instant booking
            and fare details.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">

            <div className="bg-white border shadow-sm rounded-2xl p-5 md:p-6 text-center">
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />

              <h3 className="text-lg font-bold mb-2">
                Call Us
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                Quick booking and fare information.
              </p>

              <a
                href="tel:+919172271464"
                className="text-blue-600 font-bold text-sm md:text-base"
              >
                +91 9172271464
              </a>
            </div>

            <div className="bg-white border shadow-sm rounded-2xl p-5 md:p-6 text-center">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />

              <h3 className="text-lg font-bold mb-2">
                WhatsApp Booking
              </h3>

              <p className="text-gray-600 text-sm mb-3">
                Instant response for taxi booking.
              </p>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 font-bold text-sm md:text-base"
              >
                Chat On WhatsApp
              </a>
            </div>

            <div className="bg-white border shadow-sm rounded-2xl p-5 md:p-6 text-center">
              <MapPin className="w-8 h-8 text-red-500 mx-auto mb-3" />

              <h3 className="text-lg font-bold mb-2">
                Our Location
              </h3>

              <p className="text-gray-600 text-sm leading-6">
                New Narsala Rd, Beldar Nagar,
                <br />
                Dighori, Nagpur,
                <br />
                Maharashtra 440034
              </p>
            </div>

          </div>

          <div className="mt-5 md:mt-7 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-4 md:p-6 text-center shadow-lg">

            <p className="text-xs md:text-base leading-6">
              Airport Pickup & Drop • Local Cab Service • Outstation Taxi •
              Tempo Traveller • Corporate Travel • Tour Packages
            </p>

          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="border-t border-slate-200 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8">

          <h2 className="text-2xl md:text-4xl font-black text-center mb-7 md:mb-8">
            Best Taxi Service In Nagpur
          </h2>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 md:p-8">

            <p className="text-sm md:text-base text-gray-600 leading-7 mb-4">
              RC Tours & Travels is a trusted taxi service provider in Nagpur
              offering airport taxi, local cab booking, outstation taxi,
              corporate travel and Tempo Traveller rental services.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-7 mb-4">
              We provide transportation services from Nagpur to Pench,
              Tadoba, Chikhaldara, Wardha, Amravati, Pune, Mumbai,
              Hyderabad, Indore, Bhopal, Shirdi and many other destinations.
            </p>

            <p className="text-sm md:text-base text-gray-600 leading-7">
              Our focus is on customer satisfaction, clean vehicles,
              experienced drivers, transparent pricing and safe travel.
              Whether you need a local cab or an outstation taxi,
              RC Tours & Travels is ready to serve you.
            </p>

          </div>
        </div>
      </section>

      {/* Compact CTA */}
      <section className="border-t border-slate-200 py-7 md:py-9">
        <div className="max-w-4xl mx-auto px-4 md:px-8">

          <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-800 rounded-2xl px-5 py-7 md:px-10 md:py-9 text-center shadow-xl">

            <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
              Need A Taxi In Nagpur?
              <br />
              <span className="text-cyan-300">
                Book RC Tours & Travels Now
              </span>
            </h2>

            <p className="text-sm md:text-base text-slate-200 mt-3">
              24×7 Airport Taxi • Outstation Cab • Tempo Traveller Booking
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">

              <a
                href="tel:+919172271464"
                className="inline-flex items-center justify-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm md:text-base transition"
              >
                <Phone size={18} />
                Call Now
              </a>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm md:text-base transition"
              >
                <MessageCircle size={18} />
                WhatsApp Booking
              </a>

            </div>

          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-4 right-3 md:bottom-6 md:right-5 z-50 flex flex-col items-center gap-2">

        <a
          href="tel:+919172271464"
          aria-label="Call RC Tours and Travels"
          className="bg-cyan-500 hover:bg-cyan-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition"
        >
          <Phone className="w-5 h-5 md:w-6 md:h-6" />
        </a>

        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp RC Tours and Travels"
          className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition"
        >
          <FaWhatsapp className="text-2xl md:text-3xl" />
        </a>

        <div className="bg-green-500 text-white px-2.5 py-1 rounded-lg shadow-lg animate-pulse">
          <p className="text-[9px] md:text-[10px] font-bold text-center whitespace-nowrap">
            🎁 Get Discount
          </p>
        </div>

      </div>

    </main>
  );
}