"use client";

import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  ArrowRight,
  BadgeCheck,
  BusFront,
  CalendarDays,
  Car,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  Headphones,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  Star,
  Users,
  WalletCards,
  X,
} from "lucide-react";

type ServiceType =
  | "taxi"
  | "airport"
  | "outstation"
  | "car-rental"
  | "tempo-traveller"
  | "jungle-safari";

type TripType =
  | "One Way"
  | "Round Trip"
  | "Local Rental"
  | "Airport Transfer";

type FormState = {
  name: string;
  mobile: string;
  pickup: string;
  destination: string;
  returnTo: string;
  date: string;
  returnDate: string;
  tripType: TripType;
  passengers: string;
  vehicle: string;
  safariDestination: string;
  safariGate: string;
};

type ServiceData = {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  cta: string;
};

const SERVICES: Record<ServiceType, ServiceData> = {
  taxi: {
    badge: "Trusted Taxi Service in Nagpur",
    title: "Nagpur Taxi",
    highlight: "For Every Journey",
    description:
      "Local taxi, airport transfer and outstation cab service with comfortable vehicles and direct booking support.",
    image: "/services/cab-local.webp",
    cta: "Get Best Fare",
  },

  airport: {
    badge: "24×7 Nagpur Airport Taxi",
    title: "Airport Pickup.",
    highlight: "Without The Hassle.",
    description:
      "Reliable airport pickup and drop from Nagpur with comfortable cars and advance booking support.",
    image: "/services/airport-taxi.webp",
    cta: "Get Airport Fare",
  },

  outstation: {
    badge: "Nagpur Outstation Taxi",
    title: "Nagpur To Anywhere.",
    highlight: "Travel Comfortably.",
    description:
      "One-way and round-trip taxi service for family trips, business travel, holidays and long-distance journeys.",
    image: "/services/outstation-taxi.webp",
    cta: "Get Outstation Fare",
  },

  "car-rental": {
    badge: "Car Rental With Driver",
    title: "Choose Your Car.",
    highlight: "We Handle The Drive.",
    description:
      "Sedan, Ertiga, Rumion, Innova, Crysta and premium vehicles available with driver.",
    image: "/car-hero.webp",
    cta: "Check Car Availability",
  },

  "tempo-traveller": {
    badge: "10–17 Seater Available",
    title: "Travel Together.",
    highlight: "Travel Comfortably.",
    description:
      "Tempo Traveller and Urbania options for family tours, group trips, weddings, corporate travel and pilgrimages.",
    image: "/services/tempo-traveller.webp",
    cta: "Check Traveller",
  },

  "jungle-safari": {
    badge: "Nagpur Jungle Safari Cab",
    title: "Nagpur To Jungle Safari.",
    highlight: "Your Safari Starts Here.",
    description:
      "Cab service from Nagpur for Tadoba, Pench, Kanha, Satpura and popular safari gates.",
    image: "/tours/tadoba1.webp",
    cta: "Get Safari Fare",
  },
};

const JUNGLES = [
  {
    name: "Tadoba",
    sub: "Tiger Safari",
    gates: ["Moharli Gate", "Navegaon Gate", "Kolsa Gate"],
    image: "/tours/tadoba1.webp",
  },
  {
    name: "Pench",
    sub: "Wildlife Safari",
    gates: ["Turia Gate", "Karmajhiri Gate", "Teliya"],
    image: "/tours/pench1.webp",
  },
  {
    name: "Kanha",
    sub: "National Park",
    gates: ["Khatia Gate", "Mukki Gate", "Sarhi Gate"],
    image: "/tours/kanha.webp",
  },
  {
    name: "Satpura",
    sub: "Safari & Nature",
    gates: ["Matkuli", "Madhai"],
    image: "/tours/satpura.webp",
  },
];

const FLEET = [
  [
    "Swift Dzire",
    "Sedan",
    "4+1",
    "/swift-dzire.webp",
  ],
  [
    "Maruti Ertiga",
    "Family MUV",
    "6+1",
    "/ertiga.webp",
  ],
  [
    "Toyota Rumion",
    "Comfort MUV",
    "6+1",
    "/rumion.webp",
  ],
  [
    "Innova",
    "Premium MUV",
    "6+1",
    "/gallery/innova.webp",
  ],
  [
    "Innova Crysta",
    "Premium",
    "6+1",
    "/innova-crysta.webp",
  ],
  [
    "Tempo Traveller",
    "Group Travel",
    "10–17",
    "/traveller17.webp",
  ],
  [
    "Force Urbania",
    "Premium Group",
    "10–17",
    "/urbania.webp",
  ],
];

const ROUTES = [
  "Nagpur → Tadoba",
  "Nagpur → Pench",
  "Nagpur → Kanha",
  "Nagpur → Satpura",
  "Nagpur → Matkuli",
  "Nagpur → Amravati",
  "Nagpur → Chhindwara",
  "Nagpur → Jabalpur",
  "Nagpur → Pune",
  "Nagpur → Mumbai",
  "Nagpur → Hyderabad",
  "Nagpur → Shirdi",
];

const FAQS = [
  [
    "Do you provide Nagpur to Tadoba taxi?",
    "Yes. Cab service is available from Nagpur to Tadoba and nearby safari locations subject to vehicle availability.",
  ],
  [
    "Can I book a round-trip taxi?",
    "Yes. Select Round Trip and enter your destination, return location, journey date and return date. We will confirm the fare and vehicle.",
  ],
  [
    "Can I book a taxi to Pench, Kanha or Satpura?",
    "Yes. Enquiries can be made for Pench, Kanha, Satpura, Matkuli and other popular wildlife routes from Nagpur.",
  ],
  [
    "Do you provide airport pickup and drop?",
    "Yes. Nagpur Airport pickup and drop can be booked in advance.",
  ],
  [
    "Do you provide Tempo Traveller?",
    "Yes. 10 to 17 seater Tempo Traveller options are available depending on availability and trip requirement.",
  ],
];

export default function GoogleAdsPage() {
  const [service, setService] = useState<ServiceType>("taxi");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    pickup: "",
    destination: "",
    returnTo: "",
    date: "",
    returnDate: "",
    tripType: "One Way",
    passengers: "2 passengers",
    vehicle: "Any Suitable Vehicle",
    safariDestination: "",
    safariGate: "",
  });

  const phoneNumber = "9172271464";
  const phoneUrl = `tel:+${phoneNumber}`;

  const content = SERVICES[service];

  const serviceName = useMemo(
    () =>
      ({
        taxi: "Taxi Service in Nagpur",
        airport: "Nagpur Airport Taxi",
        outstation: "Nagpur Outstation Taxi",
        "car-rental": "Car Rental in Nagpur",
        "tempo-traveller": "Tempo Traveller in Nagpur",
        "jungle-safari": "Nagpur Jungle Safari Cab",
      })[service],
    [service]
  );

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    `Hello RC Tours & Travels,

I want to enquire about ${serviceName}.

Please share fare and availability.`
  )}`;

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("service");

    const valid: ServiceType[] = [
      "taxi",
      "airport",
      "outstation",
      "car-rental",
      "tempo-traveller",
      "jungle-safari",
    ];

    if (value && valid.includes(value as ServiceType)) {
      setService(value as ServiceType);
    }
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll(".ads-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ads-visible");
          }
        });
      },
      {
        threshold: 0.08,
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [service]);

  const track = (event: string) => {
    if (
      typeof window !== "undefined" &&
      typeof (window as any).gtag === "function"
    ) {
      (window as any).gtag("event", event, {
        service,
        landing_page: "google_ads",
      });
    }
  };

  const updateForm = <K extends keyof FormState>(
    key: K,
    value: FormState[K]
  ) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const changeService = (nextService: ServiceType) => {
    setService(nextService);

    const url = new URL(window.location.href);

    url.searchParams.set("service", nextService);

    window.history.replaceState({}, "", url.toString());

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const chooseSafari = (name: string, gate: string) => {
    updateForm("safariDestination", name);
    updateForm("safariGate", gate);
    updateForm("destination", `${name} - ${gate}`);
    updateForm("tripType", "Round Trip");

    changeService("jungle-safari");

    setShowForm(true);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      alert("Please enter your name.");
      return;
    }

    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!form.pickup.trim() || !form.destination.trim()) {
      alert("Please enter Pickup and Destination.");
      return;
    }

    if (!form.date) {
      alert("Please select Journey Date.");
      return;
    }

    if (form.tripType === "Round Trip" && !form.returnDate) {
      alert("Please select Return Date for Round Trip.");
      return;
    }

    const returnLocation = form.returnTo.trim() || form.pickup;

    const returnBlock =
      form.tripType === "Round Trip"
        ? `

RETURN JOURNEY
Return To: ${returnLocation}
Return Date: ${form.returnDate}`
        : "";

    const safariBlock =
      service === "jungle-safari"
        ? `

SAFARI
Destination: ${form.safariDestination || form.destination}
Gate: ${form.safariGate || "Not specified"}`
        : "";

    const message = encodeURIComponent(
      `Hello RC Tours & Travels,

I want to enquire about ${serviceName}.

CUSTOMER
Name: ${form.name}
Mobile: ${form.mobile}

TRIP
Trip Type: ${form.tripType}
Pickup: ${form.pickup}
Destination: ${form.destination}
Journey Date: ${form.date}
Passengers: ${form.passengers}
Vehicle: ${form.vehicle}${returnBlock}${safariBlock}

Please share the best fare and vehicle availability.`
    );

    track("ads_lead_form_submit");

    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );

    setShowForm(false);
  };

  return (
    <main className="google-ads-page min-h-screen overflow-x-hidden bg-white text-slate-900">

      {/* TOP TRUST BAR */}

      <div className="bg-[#071426] px-3 py-2 text-center text-[11px] font-bold text-white">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
          Trusted Taxi Service in Nagpur
          <span className="text-white/40">•</span>
          24×7 Booking Support
        </div>
      </div>

      {/* HERO */}

      <section className="relative min-h-[570px] overflow-hidden bg-[#061226] text-white sm:min-h-[650px]">

        <img
          src={content.image}
          alt={serviceName}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,25,.76)_0%,rgba(3,10,25,.48)_38%,rgba(3,10,25,.96)_100%)]" />

        <div className="relative z-10 mx-auto flex min-h-[570px] max-w-7xl flex-col px-4 pb-5 pt-4 sm:min-h-[650px] sm:px-6 lg:px-8">

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-md">

            <div>
              <div className="text-[14px] font-black tracking-wide">
                RC TOURS & TRAVELS
              </div>

              <div className="text-[9px] text-blue-100">
                Your Journey, Our Responsibility
              </div>
            </div>

            <a
              href={phoneUrl}
              onClick={() => track("ads_phone_click")}
              className="flex h-9 items-center gap-1.5 rounded-full bg-white/10 px-3 text-xs font-black"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>

          </div>

          <div className="mt-auto max-w-3xl pb-1">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-[10px] font-black backdrop-blur-md">

              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
                <Check className="h-3 w-3" />
              </span>

              {content.badge}

            </div>

            <h1 className="mt-3 text-[38px] font-black leading-[.97] tracking-[-1.4px] sm:text-6xl">

              {content.title}

              <span className="mt-1 block text-yellow-400">
                {content.highlight}
              </span>

            </h1>

            <p className="mt-3 max-w-xl text-[13px] leading-5 text-slate-100 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">

              <span className="flex items-center gap-1 text-xs font-black text-yellow-300">
                ★★★★★
              </span>

              <span className="text-xs font-bold">
                4.9 Google Rating
              </span>

              <span className="text-white/40">•</span>

              <span className="text-xs">
                10K+ Happy Customers
              </span>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:max-w-md">

              <button
                type="button"
                onClick={() => {
                  setShowForm(true);
                  track("ads_form_open");
                }}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 text-sm font-black text-slate-950"
              >
                {content.cta}
                <ArrowRight className="h-5 w-5" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("ads_whatsapp_click")}
                className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-black text-white"
              >
                <FaWhatsapp className="h-5 w-5" />
                WhatsApp
              </a>

            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">

              <MiniTrust
                icon={<ShieldCheck className="h-4 w-4" />}
                title="Trusted"
                text="Service"
              />

              <MiniTrust
                icon={<Car className="h-4 w-4" />}
                title="Multiple"
                text="Vehicles"
              />

              <MiniTrust
                icon={<Clock3 className="h-4 w-4" />}
                title="24×7"
                text="Support"
              />

            </div>

          </div>

        </div>

      </section>

      {/* TRUST STATS */}

      <section className="border-b border-slate-100 bg-white px-4 py-4">

        <div className="mx-auto grid max-w-2xl grid-cols-4 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">

          <TrustStat
            number="4.9★"
            label="Google Rating"
            icon={<Star className="h-4 w-4" />}
          />

          <TrustStat
            number="10K+"
            label="Customers"
            icon={<Users className="h-4 w-4" />}
          />

          <TrustStat
            number="7+"
            label="Years"
            icon={<BadgeCheck className="h-4 w-4" />}
          />

          <TrustStat
            number="24×7"
            label="Support"
            icon={<Headphones className="h-4 w-4" />}
          />

        </div>

      </section>

      {/* QUICK BOOKING */}

      <section
        id="booking"
        className="ads-reveal px-4 py-7 sm:py-10"
      >

        <div className="mx-auto max-w-2xl rounded-[26px] border border-slate-200 bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,.09)] sm:p-6">

          <div className="flex items-start justify-between gap-3">

            <div>

              <p className="text-[10px] font-black tracking-[.18em] text-blue-700">
                QUICK BOOKING
              </p>

              <h2 className="mt-1 text-2xl font-black leading-tight">
                Tell Us Your Route.
              </h2>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Get fare, vehicle availability and booking assistance.
              </p>

            </div>

            <div className="rounded-xl bg-blue-50 p-2 text-blue-700">
              <Route className="h-5 w-5" />
            </div>

          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">

            {(
              [
                ["taxi", "Taxi"],
                ["airport", "Airport"],
                ["outstation", "Outstation"],
                ["car-rental", "Car Rental"],
                ["tempo-traveller", "Traveller"],
                ["jungle-safari", "Safari"],
              ] as [ServiceType, string][]
            ).map(([key, label]) => (
              <QuickService
                key={key}
                active={service === key}
                text={label}
                onClick={() => changeService(key)}
              />
            ))}

          </div>

          <button
            type="button"
            onClick={() => {
              setShowForm(true);
              track("ads_form_open");
            }}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-700 text-sm font-black text-white"
          >
            <Navigation className="h-5 w-5" />
            Start Booking Enquiry
          </button>

        </div>

      </section>

      {/* JUNGLE SAFARI */}

      <section className="ads-reveal bg-slate-50 px-4 py-7">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="JUNGLE SAFARI"
            title="Nagpur To Jungle Safari Cab"
            text="Tadoba, Pench, Kanha, Satpura and popular safari gates — select your destination and start your enquiry."
          />

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">

            {JUNGLES.map((jungle) => (
              <button
                key={jungle.name}
                type="button"
                onClick={() =>
                  chooseSafari(
                    jungle.name,
                    jungle.gates[0]
                  )
                }
                className="w-[250px] shrink-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white text-left shadow-sm"
              >

                <div className="relative h-36">

                  <img
                    src={jungle.image}
                    alt={jungle.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-3 left-3 text-white">

                    <p className="text-lg font-black">
                      Nagpur → {jungle.name}
                    </p>

                    <p className="text-[10px] text-slate-200">
                      {jungle.sub}
                    </p>

                  </div>

                </div>

                <div className="p-3">

                  <p className="text-[10px] font-black text-blue-700">
                    POPULAR GATES
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-slate-600">
                    {jungle.gates.join(" • ")}
                  </p>

                </div>

              </button>
            ))}

          </div>

        </div>

      </section>

      {/* SERVICES */}

      <section className="ads-reveal px-4 py-7">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="OUR SERVICES"
            title="One Travel Partner For Every Trip"
            text="Book a car, airport transfer, outstation taxi, group vehicle or jungle safari cab from Nagpur."
          />

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">

            {(
              [
                ["taxi", "Taxi Service", "Local & Outstation"],
                ["airport", "Airport Taxi", "Pickup & Drop"],
                ["outstation", "Outstation", "One Way & Round Trip"],
                ["car-rental", "Car Rental", "With Driver"],
                ["tempo-traveller", "Tempo Traveller", "10–17 Seater"],
                ["jungle-safari", "Jungle Safari", "Tadoba • Pench • Kanha"],
              ] as [ServiceType, string, string][]
            ).map(([key, title, text]) => (
              <ServiceCard
                key={key}
                title={title}
                text={text}
                image={SERVICES[key].image}
                active={service === key}
                onClick={() => changeService(key)}
              />
            ))}

          </div>

        </div>

      </section>

      {/* WHY US */}

      <section className="ads-reveal bg-[#071426] px-4 py-8 text-white">

        <div className="mx-auto max-w-5xl">

          <div className="grid gap-5 md:grid-cols-2 md:items-center">

            <div>

              <p className="text-[10px] font-black tracking-[.18em] text-yellow-400">
                WHY RC TOURS & TRAVELS
              </p>

              <h2 className="mt-2 text-3xl font-black leading-tight">
                A Professional Ride.
                <span className="block text-blue-300">
                  From Booking To Drop.
                </span>
              </h2>

              <p className="mt-3 text-xs leading-5 text-blue-100">
                Clear communication, suitable vehicles and direct booking
                support for local and outstation travel.
              </p>

            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">

              <TrustPoint
                title="Professional Drivers"
                text="Driver-assisted travel for comfortable journeys."
              />

              <TrustPoint
                title="Multiple Vehicles"
                text="Sedan, MUV, Crysta, Traveller and Urbania options."
              />

              <TrustPoint
                title="24×7 Support"
                text="Call or WhatsApp for booking assistance."
              />

              <TrustPoint
                title="Clear Fare Confirmation"
                text="Share your route and receive fare details before booking."
              />

            </div>

          </div>

        </div>

      </section>

      {/* FLEET */}

      <section className="ads-reveal px-4 py-7">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="OUR FLEET"
            title="Choose The Right Vehicle"
            text="Vehicle selection depends on passenger count, route and availability."
          />

          <div className="mt-5 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">

            {FLEET.map(
              ([name, category, seats, image]) => (
                <div
                  key={name}
                  className="w-[220px] shrink-0 overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm"
                >

                  <img
                    src={image}
                    alt={name}
                    className="h-32 w-full object-cover"
                    loading="lazy"
                  />

                  <div className="p-3">

                    <p className="font-black">
                      {name}
                    </p>

                    <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">

                      <span>{category}</span>

                      <span className="rounded-full bg-blue-50 px-2 py-1 font-bold text-blue-700">
                        {seats}
                      </span>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </section>

      {/* TEMPO */}

      <section className="ads-reveal bg-slate-50 px-4 py-7">

        <div className="mx-auto max-w-7xl">

          <div className="rounded-[26px] bg-gradient-to-br from-blue-700 to-blue-950 p-5 text-white sm:p-8">

            <div className="grid gap-5 md:grid-cols-2 md:items-center">

              <div>

                <p className="text-[10px] font-black tracking-[.18em] text-yellow-300">
                  GROUP TRAVEL
                </p>

                <h2 className="mt-2 text-3xl font-black">
                  Tempo Traveller & Urbania
                </h2>

                <p className="mt-2 text-xs leading-5 text-blue-100">
                  10–17 seater options for family tours, weddings,
                  corporate travel, pilgrimages and group trips.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    changeService("tempo-traveller");
                    setShowForm(true);
                  }}
                  className="mt-4 rounded-xl bg-yellow-400 px-4 py-3 text-xs font-black text-slate-950"
                >
                  Check Availability
                </button>

              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">

                <div className="grid grid-cols-2 gap-2 text-xs">

                  <MiniTrust
                    icon={<BusFront className="h-4 w-4" />}
                    title="10–17"
                    text="Seats"
                  />

                  <MiniTrust
                    icon={<Users className="h-4 w-4" />}
                    title="Group"
                    text="Travel"
                  />

                  <MiniTrust
                    icon={<ShieldCheck className="h-4 w-4" />}
                    title="Driver"
                    text="Included"
                  />

                  <MiniTrust
                    icon={<Clock3 className="h-4 w-4" />}
                    title="24×7"
                    text="Support"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* POPULAR ROUTES */}

      <section className="ads-reveal px-4 py-7">

        <div className="mx-auto max-w-7xl">

          <SectionHeading
            eyebrow="POPULAR ROUTES"
            title="Travel From Nagpur With Confidence"
            text="Popular taxi routes for leisure, business, family and wildlife travel."
          />

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">

            {ROUTES.map((route) => (
              <button
                key={route}
                type="button"
                onClick={() => {
                  const parts = route.split(" → ");

                  updateForm("pickup", parts[0]);
                  updateForm("destination", parts[1]);

                  setShowForm(true);
                }}
                className="flex min-h-16 items-center justify-between rounded-xl border border-slate-200 bg-white px-3 text-left shadow-sm"
              >

                <span className="text-xs font-black">
                  {route}
                </span>

                <ArrowRight className="h-4 w-4 shrink-0 text-blue-700" />

              </button>
            ))}

          </div>

        </div>

      </section>

      {/* PAYMENT */}

      <section className="ads-reveal bg-slate-50 px-4 py-7">

        <div className="mx-auto max-w-3xl">

          <SectionHeading
            eyebrow="PAYMENT & BOOKING"
            title="Simple, Secure Booking Process"
            text="Discuss your route, vehicle and fare with our team before confirming the trip."
          />

          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">

            <PaymentBox
              icon={<WalletCards className="h-5 w-5" />}
              title="UPI"
            />

            <PaymentBox
              icon={<CreditCard className="h-5 w-5" />}
              title="Cards"
            />

            <PaymentBox
              icon={<Route className="h-5 w-5" />}
              title="Fare Details"
            />

            <PaymentBox
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Secure"
            />

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="ads-reveal px-4 py-7">

        <div className="mx-auto max-w-3xl">

          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            text="Quick answers before you book."
          />

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">

            {FAQS.map(([question, answer], index) => (
              <div
                key={question}
                className="border-b border-slate-100 last:border-0"
              >

                <button
                  type="button"
                  onClick={() =>
                    setFaqOpen(
                      faqOpen === index ? null : index
                    )
                  }
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-xs font-black"
                >

                  <span>{question}</span>

                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      faqOpen === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>

                {faqOpen === index && (
                  <p className="px-4 pb-4 text-xs leading-5 text-slate-600">
                    {answer}
                  </p>
                )}

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="bg-gradient-to-br from-blue-700 to-blue-950 px-4 py-9 text-center text-white">

        <div className="mx-auto max-w-2xl">

          <p className="text-[10px] font-black tracking-[.18em] text-yellow-300">
            READY TO TRAVEL?
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Tell Us Your Route.
            <span className="block text-blue-200">
              We’ll Handle The Rest.
            </span>
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-blue-100">
            Call or WhatsApp for fare, vehicle availability and booking
            assistance.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-2.5">

            <a
              href={phoneUrl}
              onClick={() => track("ads_phone_click")}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-yellow-400 text-sm font-black text-slate-950"
            >
              <Phone className="h-5 w-5" />
              Call Now
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("ads_whatsapp_click")}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-sm font-black text-white"
            >
              <FaWhatsapp className="h-5 w-5" />
              WhatsApp
            </a>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="bg-slate-950 px-4 pb-24 pt-8 text-slate-300">

        <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-4">

          <div>

            <p className="text-lg font-black text-white">
              RC TOURS & TRAVELS
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-400">
              Trusted taxi and travel service in Nagpur for local,
              airport, outstation, jungle safari and group travel.
            </p>

            <div className="mt-3 flex items-center gap-2">

              <span className="text-yellow-400">
                ★★★★★
              </span>

              <span className="text-[10px] font-bold text-white">
                4.9 Google Rating
              </span>

            </div>

          </div>

          <div>

            <p className="text-xs font-black text-white">
              Services
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-400">
              <p>Taxi Service</p>
              <p>Airport Taxi</p>
              <p>Outstation Taxi</p>
              <p>Car Rental</p>
              <p>Tempo Traveller</p>
              <p>Jungle Safari Cab</p>
            </div>

          </div>

          <div>

            <p className="text-xs font-black text-white">
              Popular Travel
            </p>

            <div className="mt-3 space-y-1.5 text-xs text-slate-400">
              <p>Nagpur to Tadoba</p>
              <p>Nagpur to Pench</p>
              <p>Nagpur to Kanha</p>
              <p>Nagpur to Satpura</p>
              <p>Nagpur to Matkuli</p>
              <p>Nagpur to Amravati</p>
            </div>

          </div>

          <div>

            <p className="text-xs font-black text-white">
              Contact
            </p>

            <div className="mt-3 space-y-3 text-xs">

              <a
                href={phoneUrl}
                className="flex gap-2"
              >
                <Phone className="h-4 w-4 text-yellow-400" />

                <span>
                  <b className="block text-white">
                    +91 91722 71464
                  </b>
                  Call for booking
                </span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2"
              >
                <FaWhatsapp className="h-4 w-4 text-emerald-400" />

                <span>
                  <b className="block text-white">
                    WhatsApp
                  </b>
                  Quick enquiry
                </span>
              </a>

              <div className="flex gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span>Nagpur, Maharashtra</span>
              </div>

            </div>

          </div>

        </div>

        <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-5 text-center text-[10px] text-slate-500">
          © {new Date().getFullYear()} RC Tours & Travels. All rights reserved.
        </div>

      </footer>

      {/* MOBILE STICKY CTA */}

      <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200 bg-white/95 p-2 shadow-[0_-8px_30px_rgba(0,0,0,.15)] backdrop-blur-xl">

        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">

          <a
            href={phoneUrl}
            onClick={() => track("ads_phone_click")}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-black text-white"
          >
            <Phone className="h-5 w-5" />
            Call Now
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("ads_whatsapp_click")}
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-black text-white"
          >
            <FaWhatsapp className="h-5 w-5" />
            WhatsApp
          </a>

        </div>

      </div>

      {/* BOOKING MODAL */}

      {showForm && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-4">

          <div className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:rounded-[28px]">

            <div className="sticky top-0 z-10 flex items-center justify-between bg-blue-700 p-4 text-white">

              <div>

                <p className="text-[10px] font-black tracking-[.18em] text-blue-200">
                  QUICK BOOKING
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Get Your Best Fare
                </h3>

              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>

            </div>

            <form
              onSubmit={submitForm}
              className="space-y-4 p-4"
            >

              {/* 1 TRIP TYPE */}

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-3">

                <p className="text-xs font-black text-blue-900">
                  1. Select Trip Type
                </p>

                <div className="mt-2 grid grid-cols-2 gap-2">

                  {(
                    [
                      "One Way",
                      "Round Trip",
                      "Local Rental",
                      "Airport Transfer",
                    ] as TripType[]
                  ).map((type) => (

                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        updateForm("tripType", type)
                      }
                      className={`h-11 rounded-xl border text-xs font-black ${
                        form.tripType === type
                          ? "border-blue-700 bg-blue-700 text-white"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {type}
                    </button>

                  ))}

                </div>

              </div>

              {/* 2 ROUTE */}

              <div>

                <p className="mb-2 text-xs font-black text-slate-800">
                  2. Your Route
                </p>

                <div className="space-y-3">

                  <LocationField
                    label="FROM • Pickup"
                    placeholder="e.g. Nagpur"
                    value={form.pickup}
                    onChange={(v) =>
                      updateForm("pickup", v)
                    }
                    icon={
                      <MapPin className="h-4 w-4" />
                    }
                  />

                  <LocationField
                    label="TO • Destination"
                    placeholder="e.g. Amravati / Tadoba"
                    value={form.destination}
                    onChange={(v) =>
                      updateForm("destination", v)
                    }
                    icon={
                      <Navigation className="h-4 w-4" />
                    }
                  />

                </div>

                {/* ROUND TRIP */}

                {form.tripType === "Round Trip" && (
                  <div className="mt-3 rounded-2xl border-2 border-blue-100 bg-blue-50 p-3">

                    <div className="flex items-center gap-2 text-xs font-black text-blue-900">
                      <Route className="h-4 w-4" />
                      ROUND TRIP • GO + RETURN
                    </div>

                    <div className="mt-2 rounded-xl bg-white p-3 text-center text-sm font-black text-slate-800">

                      {form.pickup || "Nagpur"}

                      <span className="px-1 text-blue-700">
                        →
                      </span>

                      {form.destination || "Destination"}

                      <span className="px-1 text-blue-700">
                        →
                      </span>

                      {form.returnTo ||
                        form.pickup ||
                        "Nagpur"}

                    </div>

                    <div className="mt-3">

                      <LocationField
                        label="RETURN TO"
                        placeholder="Usually same as Pickup, e.g. Nagpur"
                        value={form.returnTo}
                        onChange={(v) =>
                          updateForm(
                            "returnTo",
                            v
                          )
                        }
                        icon={
                          <MapPin className="h-4 w-4" />
                        }
                      />

                    </div>

                    <div className="mt-3">

                      <label className="mb-1 block text-[11px] font-black text-slate-700">
                        RETURN DATE
                      </label>

                      <input
                        type="date"
                        min={
                          form.date ||
                          undefined
                        }
                        value={form.returnDate}
                        onChange={(e) =>
                          updateForm(
                            "returnDate",
                            e.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-blue-100 bg-white px-3 text-sm"
                      />

                    </div>

                  </div>
                )}

              </div>

              {/* 3 JOURNEY */}

              <div>

                <p className="mb-2 text-xs font-black text-slate-800">
                  3. Journey Details
                </p>

                <div className="grid grid-cols-2 gap-3">

                  <div>

                    <label className="mb-1 block text-[11px] font-black text-slate-700">
                      JOURNEY DATE
                    </label>

                    <div className="relative">

                      <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-700" />

                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) =>
                          updateForm(
                            "date",
                            e.target.value
                          )
                        }
                        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-2 text-sm"
                      />

                    </div>

                  </div>

                  <div>

                    <label className="mb-1 block text-[11px] font-black text-slate-700">
                      PASSENGERS
                    </label>

                    <select
                      value={form.passengers}
                      onChange={(e) =>
                        updateForm(
                          "passengers",
                          e.target.value
                        )
                      }
                      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                    >

                      {[
                        "1 passenger",
                        "2 passengers",
                        "3 passengers",
                        "4 passengers",
                        "5 passengers",
                        "6 passengers",
                        "7 passengers",
                        "8 passengers",
                        "9+ passengers",
                      ].map((value) => (
                        <option key={value}>
                          {value}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

                <div className="mt-3">

                  <label className="mb-1 block text-[11px] font-black text-slate-700">
                    VEHICLE PREFERENCE
                  </label>

                  <select
                    value={form.vehicle}
                    onChange={(e) =>
                      updateForm(
                        "vehicle",
                        e.target.value
                      )
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  >

                    <option>
                      Any Suitable Vehicle
                    </option>

                    <option>
                      Swift Dzire
                    </option>

                    <option>
                      Ertiga
                    </option>

                    <option>
                      Toyota Rumion
                    </option>

                    <option>
                      Innova
                    </option>

                    <option>
                      Innova Crysta
                    </option>

                    <option>
                      Tempo Traveller 10–17 Seater
                    </option>

                    <option>
                      Force Urbania
                    </option>

                  </select>

                </div>

              </div>

              {/* 4 CONTACT */}

              <div>

                <p className="mb-2 text-xs font-black text-slate-800">
                  4. Your Contact
                </p>

                <div className="grid grid-cols-2 gap-3">

                  <Field
                    label="NAME"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(v) =>
                      updateForm(
                        "name",
                        v
                      )
                    }
                  />

                  <Field
                    label="MOBILE"
                    placeholder="10-digit number"
                    type="tel"
                    value={form.mobile}
                    onChange={(v) =>
                      updateForm(
                        "mobile",
                        v
                          .replace(/\D/g, "")
                          .slice(0, 10)
                      )
                    }
                  />

                </div>

              </div>

              {/* SUMMARY */}

              <div className="rounded-xl bg-slate-50 p-3 text-[10px] leading-4 text-slate-500">

                <b className="text-slate-700">
                  Your enquiry:
                </b>{" "}

                {form.tripType}

                {form.pickup
                  ? ` • ${form.pickup}`
                  : ""}

                {form.destination
                  ? ` → ${form.destination}`
                  : ""}

                {form.tripType === "Round Trip"
                  ? ` → ${
                      form.returnTo ||
                      form.pickup ||
                      "Return"
                    }`
                  : ""}

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-black text-white shadow-lg"
              >

                <FaWhatsapp className="h-5 w-5" />

                Get Fare on WhatsApp

              </button>

            </form>

          </div>

        </div>
      )}

      {/* PAGE CSS */}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
        }

        /* Hide only the main website navigation
           while Google Ads landing page is active. */
        body:has(.google-ads-page) header,
        body:has(.google-ads-page) nav {
          display: none !important;
        }

        body:has(.google-ads-page) {
          padding-top: 0 !important;
        }

        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .ads-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease,
            transform 0.6s cubic-bezier(.22,1,.36,1);
        }

        .ads-reveal.ads-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 640px) {
          input,
          select,
          button {
            font-size: 16px;
          }

          * {
            -webkit-tap-highlight-color: transparent;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .ads-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

    </main>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function MiniTrust({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 px-2 py-2.5 text-center backdrop-blur">

      <div className="mx-auto flex w-fit text-yellow-400">
        {icon}
      </div>

      <p className="mt-1 text-[10px] font-black">
        {title}
      </p>

      <p className="text-[9px] text-blue-100">
        {text}
      </p>

    </div>
  );
}

function TrustStat({
  number,
  label,
  icon,
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center border-r border-slate-100 px-1 py-3 text-center last:border-r-0">

      <div className="text-blue-700">
        {icon}
      </div>

      <p className="mt-0.5 text-base font-black">
        {number}
      </p>

      <p className="text-[9px] text-slate-500">
        {label}
      </p>

    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div>

      <p className="text-[10px] font-black tracking-[.18em] text-blue-700">
        {eyebrow}
      </p>

      <h2 className="mt-1.5 text-2xl font-black leading-tight tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600 sm:text-sm">
        {text}
      </p>

    </div>
  );
}

function QuickService({
  active,
  text,
  onClick,
}: {
  active: boolean;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-2 text-[10px] font-black ${
        active
          ? "border-blue-700 bg-blue-700 text-white"
          : "border-slate-200 bg-slate-50 text-slate-600"
      }`}
    >
      {text}
    </button>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="mb-1 block text-[11px] font-black text-slate-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      />

    </div>
  );
}

function LocationField({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-1 block text-[11px] font-black text-slate-700">
        {label}
      </label>

      <div className="relative">

        <div className="pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 text-blue-700">
          {icon}
        </div>

        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
        />

      </div>

    </div>
  );
}

function ServiceCard({
  title,
  text,
  image,
  active,
  onClick,
}: {
  title: string;
  text: string;
  image: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-[235px] shrink-0 overflow-hidden rounded-[22px] border text-left shadow-sm ${
        active
          ? "border-blue-600 ring-2 ring-blue-100"
          : "border-slate-200"
      }`}
    >

      <div className="relative h-32 overflow-hidden">

        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />

        <p className="absolute bottom-3 left-3 text-sm font-black text-white">
          {title}
        </p>

      </div>

      <div className="flex items-center justify-between bg-white p-3">

        <span className="text-[10px] text-slate-500">
          {text}
        </span>

        <ArrowRight className="h-4 w-4 text-blue-700" />

      </div>

    </button>
  );
}

function TrustPoint({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-3">

      <div className="flex items-center gap-2">

        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500">
          <Check className="h-3.5 w-3.5" />
        </div>

        <p className="text-xs font-black">
          {title}
        </p>

      </div>

      <p className="mt-1 pl-8 text-[10px] leading-4 text-blue-200">
        {text}
      </p>

    </div>
  );
}

function PaymentBox({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">

      <div className="text-blue-700">
        {icon}
      </div>

      <span className="text-xs font-black">
        {title}
      </span>

    </div>
  );
}