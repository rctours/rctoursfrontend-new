import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";

import {
  Phone,
  MapPin,
  Plane,
  Car,
  Route,
  Bus,
  Building2,
  Train,
  Navigation,
  ArrowRight,
  Clock3,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "Contact RC Tours & Travels Nagpur | Best Taxi & Outstation Cab Booking",
  description:
    "Get in touch with RC Tours & Travels Nagpur for 24/7 airport taxi, local cab booking, outstation round trips, Tempo Traveller, Urbania rental, and Tadoba/Pench tour packages. Call +91 9172271464.",
  keywords: [
    "RC Tours and Travels Nagpur",
    "Nagpur taxi service contact",
    "Outstation cab booking Nagpur",
    "Airport taxi Nagpur contact number",
    "Tempo traveller rental Nagpur",
  ],
};

const services = [
  {
    icon: Plane,
    title: "Airport Taxi",
    description: "Hassle-free airport pickup and drop service in Nagpur",
    image: "/airport-transfer.webp",
  },
  {
    icon: Car,
    title: "Local Taxi",
    description: "Comfortable local cab booking for city travel",
    image: "/blogs/local-taxi-nagpur.webp",
  },
  {
    icon: Route,
    title: "Outstation Cab",
    description: "Reliable one-way and round-trip outstation cabs",
    image: "/outstation-travel.webp",
  },
  {
    icon: Bus,
    title: "Tempo Traveller",
    description: "Spacious group travel and family tour vehicles",
    image: "/gallery/traveller17.webp",
  },
  {
    icon: Car,
    title: "Urbania Rental",
    description: "Premium and comfortable travel experience",
    image: "/urbania.webp",
  },
  {
    icon: MapPin,
    title: "Tour Packages",
    description: "Special wildlife packages to Pench, Tadoba and more",
    image: "/services/tour-packages.webp",
  },
  {
    icon: Building2,
    title: "Corporate Travel",
    description: "Professional business transportation solutions",
    image: "/corporate-travel.webp",
  },
  {
    icon: Train,
    title: "Railway Pickup",
    description: "Prompt railway station pickup and drop services",
    image: "/railway-pickup.webp",
  },
];

const faqs = [
  {
    question: "How can I book a taxi with RC Tours & Travels?",
    answer: "You can book instantly by calling us directly at +91 9172271464 or by clicking the WhatsApp chat button for instant fare details.",
  },
  {
    question: "Do you provide 24/7 cab services in Nagpur?",
    answer: "Yes! Our support team and fleet are available round-the-clock for airport transfers, emergency travel, and outstation bookings.",
  },
  {
    question: "What outstation destinations do you cover from Nagpur?",
    answer: "We cover popular destinations including Pune, Mumbai, Hyderabad, Shirdi, Nashik, Pachmarhi, and wildlife sanctuaries like Tadoba and Pench.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 selection:bg-cyan-500 selection:text-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative overflow-hidden border-b border-cyan-100 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 pb-16 pt-28 sm:pb-20 sm:pt-32 md:pb-24 md:pt-36">
        {/* Decorative Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl md:h-80 md:w-80" />
          <div className="absolute right-[10%] top-12 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl md:h-80 md:w-80" />
          <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-300 backdrop-blur-md shadow-inner">
            <MessageCircle size={15} />
            Connect With Nagpur's Trusted Travel Partner
          </div>

          <h1 className="mx-auto mt-5 max-w-4xl text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
            Contact{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              RC Tours & Travels
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base md:text-lg md:leading-7">
            Your premier choice for safe, comfortable, and affordable local taxis, airport drops, outstation cabs, and luxury group rentals in Nagpur.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
              <Clock3 size={14} className="text-cyan-400" />
              24×7 Active Support
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
              <ShieldCheck size={14} className="text-cyan-400" />
              Verified & Clean Cabs
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm">
              <MapPin size={14} className="text-cyan-400" />
              Based in Nagpur
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CARDS ================= */}
      <section className="relative z-20 mx-auto -mt-8 max-w-7xl px-5 sm:px-6 md:-mt-10">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Call Card */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
              <Phone size={28} />
            </div>
            <h3 className="mt-5 text-xl font-black text-slate-950">Call Us Directly</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Speak instantly with our booking desk for prompt allocations.
            </p>
            <a
              href="tel:+919172271464"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-cyan-50 px-5 py-2.5 text-base font-black text-cyan-700 transition hover:bg-cyan-600 hover:text-white"
            >
              <Phone size={16} />
              +91 9172271464
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
              <FaWhatsapp className="text-[32px]" />
            </div>
            <h3 className="mt-5 text-xl font-black text-slate-950">WhatsApp Booking</h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Get transparent fare estimates and itinerary assistance on chat.
            </p>
            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-50 px-5 py-2.5 text-base font-black text-green-700 transition hover:bg-green-600 hover:text-white"
            >
              <FaWhatsapp className="text-lg" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Address Card */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-xl shadow-slate-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:border-orange-300 hover:shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
              <MapPin size={28} />
            </div>
            <h3 className="mt-5 text-xl font-black text-slate-950">Office Location</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">
              New Narsala Rd, Beldar Nagar, Dighori, Nagpur, Maharashtra - 440034
            </p>
            <a
              href="https://maps.google.com/?q=RC+Tours+%26+Travels+Nagpur"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-orange-50 px-5 py-2.5 text-sm font-black text-orange-700 transition hover:bg-orange-600 hover:text-white"
            >
              <Navigation size={16} />
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT / WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-16 sm:px-6 md:pb-20 md:pt-24">
        <div className="grid items-center gap-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
              <span className="h-px w-6 bg-cyan-500" />
              Reliable Transit Experience
            </div>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Why Book With RC Tours & Travels?
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Headquartered in Nagpur, RC Tours & Travels specializes in delivering premium car rental options tailored for families, business travelers, and tourists alike. From short city commutes to long-distance outstation journeys, our fleet is prepped for optimal comfort.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Transparent pricing with no hidden toll or driver night charges",
                "Sanitized, well-maintained AC Sedans, SUVs, and Tempo Travellers",
                "Experienced, polite, and route-expert local drivers",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-cyan-600" />
                  <span className="text-sm font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a
                href="tel:+919172271464"
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700"
              >
                Book Your Ride Today
                <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-cyan-50 p-6 transition hover:bg-cyan-100/50">
              <Clock3 className="text-cyan-600" size={28} />
              <h3 className="mt-4 text-lg font-black text-slate-950">24×7 Support</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Round-the-clock booking coordination and customer service.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 p-6 transition hover:bg-blue-100/50">
              <Car className="text-blue-600" size={28} />
              <h3 className="mt-4 text-lg font-black text-slate-950">Top Fleets</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Wider selection including Urbania, Tempo Traveller, and SUVs.
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6 transition hover:bg-orange-100/50">
              <MapPin className="text-orange-600" size={28} />
              <h3 className="mt-4 text-lg font-black text-slate-950">Pan-India Tours</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Extensive coverage out of Nagpur to major state destinations.
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6 transition hover:bg-green-100/50">
              <ShieldCheck className="text-green-600" size={28} />
              <h3 className="mt-4 text-lg font-black text-slate-950">Trusted Service</h3>
              <p className="mt-1.5 text-xs leading-5 text-slate-500">
                Countless happy local and outstation customers.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* ================= SERVICES GRID ================= */}
<section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
  <div className="mx-auto mb-12 max-w-3xl text-center">
    <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
      <span className="h-px w-6 bg-cyan-500" />
      Comprehensive Solutions
      <span className="h-px w-6 bg-cyan-500" />
    </div>

    <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
      Our Travel Services
    </h2>

    <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">
      Explore our diverse suite of cab rentals and specialized tour operations
      originating from Nagpur.
    </p>
  </div>

  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
    {services.map((service) => {
      const Icon = service.icon;

      return (
        <div
          key={service.title}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl"
        >
          {/* SERVICE IMAGE - FIXED HEIGHT */}
          <div className="relative h-44 overflow-hidden bg-slate-100">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
          </div>

          {/* SERVICE CONTENT */}
          <div className="p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600 transition group-hover:bg-cyan-600 group-hover:text-white">
              <Icon size={21} />
            </div>

            <h3 className="mt-4 text-base font-black text-slate-950">
              {service.title}
            </h3>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              {service.description}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>

      {/* ================= FAQS ACCORDION / LIST SECTION ================= */}
      <section className="mx-auto max-w-4xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            <HelpCircle size={14} />
            Got Questions?
          </div>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-8 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-200">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= MAP SECTION ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-600">
            <span className="h-px w-6 bg-cyan-500" />
            Find Us on Map
            <span className="h-px w-6 bg-cyan-500" />
          </div>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Our Head Office Location
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Drop by or open live GPS directions to RC Tours & Travels in Nagpur.
          </p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <iframe
            src="https://www.google.com/maps?q=New+Narsala+Road+Beldar+Nagar+Dighori+Nagpur&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            title="RC Tours & Travels Nagpur Location Map"
            className="block w-full"
          />
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://maps.google.com/?q=RC+Tours+%26+Travels+Nagpur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-md"
          >
            <Navigation size={17} />
            Open in Google Maps
          </a>
        </div>
      </section>

      {/* ================= FINAL CTA BANNER ================= */}
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 md:pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-center shadow-2xl sm:px-10 md:px-16 md:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300">
              <Car size={13} />
              Instant Dispatch Available
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl">
              Ready to Book Your Ride?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base md:leading-7">
              Contact our team now for instant cab bookings, customized tour packages, or corporate transportation quotes.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:+919172271464"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-600"
              >
                <Phone size={17} />
                Call +91 9172271464
              </a>

              <a
                href="https://wa.me/919172271464"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5 hover:bg-green-600"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Quick Chat
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* ================= FLOATING QUICK ACTION BUTTONS ================= */}
      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-3">
        {/* Call Icon Button */}
        <a
          href="tel:+919172271464"
          aria-label="Call RC Tours and Travels"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white shadow-2xl transition hover:scale-110 hover:bg-cyan-600 sm:h-16 sm:w-16"
        >
          <Phone size={26} />
        </a>

        {/* WhatsApp Icon Button */}
        <a
          href="https://wa.me/919172271464"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp RC Tours and Travels"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-110 hover:bg-green-600 sm:h-16 sm:w-16"
        >
          <FaWhatsapp className="text-3xl sm:text-4xl" />
        </a>

        {/* Special Offer Pulse Badge */}
        <div className="rounded-xl bg-green-600 px-3 py-1.5 text-white shadow-xl animate-pulse">
          <p className="whitespace-nowrap text-[10px] font-bold text-center sm:text-xs">
            🎁 Special Discount
          </p>
        </div>
      </div>
    </main>
  );
}