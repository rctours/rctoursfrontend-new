"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "@/components/Footer";

const maharashtraPackages = [
  // Wildlife Safari

  {
    title: "Tadoba Safari",
    duration: "1 Day",
    image: "/tours/tadoba1.webp",
    features: ["🐅 Tiger Reserve", "🚖 Pickup & Drop", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Pench Safari",
    duration: "1 Day",
    image: "/tours/pench1.webp",
    features: ["🐅 Jungle Safari", "🚖 Pickup & Drop", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Hill Stations

  {
    title: "Chikhaldara Tour",
    duration: "2 Days",
    image: "/tours/chikhaldara1.webp",
    features: ["🏞️ Hill Station", "📸 Scenic Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Mahabaleshwar Tour",
    duration: "4 Days",
    image: "/tours/mahabaleshwar.webp",
    features: ["🏞️ Hill Station", "📸 Scenic Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Lonavala Tour",
    duration: "3 Days",
    image: "/tours/lonavala.webp",
    features: ["🏞️ Hill Station", "🌧️ Nature Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  // Religious Tours

  {
    title: "Shirdi Darshan",
    duration: "2 Days",
    image: "/tours/shirdi.webp",
    features: ["🙏 Sai Baba Darshan", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Shani Shingnapur",
    duration: "2 Days",
    image: "/tours/shani-shingnapur.webp",
    features: ["🙏 Shanidev Temple", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Nashik Tour",
    duration: "3 Days",
    image: "/tours/nashik1.webp",
    features: ["🙏 Trimbakeshwar", "🍇 Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Grishneshwar",
    duration: "2 Days",
    image: "/tours/grishneshwar.webp",
    features: ["🙏 Jyotirling Darshan", "🏛️ Temple Visit", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Mahurgad Darshan",
    duration: "1 Day",
    image: "/tours/mahurgad.webp",
    features: ["🙏 Renuka Mata", "⛰️ Hill Temple", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Tuljapur Darshan",
    duration: "2 Days",
    image: "/tours/tuljapur.webp",
    features: ["🙏 Tulja Bhavani", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Akkalkot Darshan",
    duration: "2 Days",
    image: "/tours/akkalkot.webp",
    features: ["🙏 Swami Samarth", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Pandharpur Darshan",
    duration: "2 Days",
    image: "/tours/pandharpur.webp",
    features: ["🙏 Vitthal Rukmini", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Kolhapur Mahalaxmi",
    duration: "3 Days",
    image: "/tours/kolhapur.webp",
    features: ["🙏 Mahalaxmi Temple", "🏛️ Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ashtavinayak Yatra",
    duration: "3 Days",
    image: "/tours/ashtavinayak.webp",
    features: ["🐘 8 Ganpati Temples", "🙏 Religious Tour", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Shegaon Darshan",
    duration: "2 Days",
    image: "/tours/shegaon.webp",
    features: ["🙏 Gajanan Maharaj", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Konkan & Beach Tours

  {
    title: "Konkan Tour",
    duration: "5 Days",
    image: "/tours/konkan.webp",
    features: ["🏖️ Beaches", "🌊 Sea Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ganpatipule Tour",
    duration: "4 Days",
    image: "/tours/ganpatipule.webp",
    features: ["🙏 Ganpati Temple", "🏖️ Beach", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Alibaug Tour",
    duration: "3 Days",
    image: "/tours/alibaug.webp",
    features: ["🏖️ Beach Destination", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Heritage

  {
    title: "Ajanta Ellora",
    duration: "2 Days",
    image: "/tours/ajanta.webp",
    features: ["🏛️ UNESCO Heritage", "📸 Historic Caves", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ch. Sambhajinagar Tour",
    duration: "2 Days",
    image: "/tours/sambhajinagar.webp",
    features: ["🏛️ Historic City", "📸 Local Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },
];

const mpPackages = [
  {
    title: "Kanha Safari",
    duration: "2 Days",
    image: "/tours/kanha.webp",
    features: [
      "🐅 Tiger Reserve",
      "🌳 Forest Experience",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Satpura Safari",
    duration: "2 Days",
    image: "/tours/satpura.webp",
    features: [
      "🦌 Wildlife Safari",
      "🌳 Nature Experience",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Pachmarhi Tour",
    duration: "3 Days",
    image: "/tours/pachmarhi.webp",
    features: [
      "🏞️ Hill Station",
      "🌳 Nature Views",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Ujjain Mahakal",
    duration: "2 Days",
    image: "/tours/ujjain.webp",
    features: [
      "🙏 Mahakal Darshan",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Omkareshwar",
    duration: "2 Days",
    image: "/tours/omkareshwar.webp",
    features: [
      "🙏 Jyotirling Darshan",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },
];

const upPackages = [
  {
    title: "Ayodhya Ram Mandir",
    duration: "3 Days",
    image: "/tours/ayodhya.webp",
    features: [
      "🙏 Ram Mandir Darshan",
      "🏛️ Religious Tour",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Kashi Vishwanath",
    duration: "3 Days",
    image: "/tours/varanasi.webp",
    features: [
      "🙏 Kashi Vishwanath",
      "🌊 Ganga Aarti",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Prayagraj Sangam",
    duration: "3 Days",
    image: "/tours/prayagraj.webp",
    features: [
      "🙏 Triveni Sangam",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Mathura Vrindavan",
    duration: "3 Days",
    image: "/tours/mathura.webp",
    features: [
      "🙏 Krishna Janmabhoomi",
      "🦚 Vrindavan Temples",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },
];

const rajasthanPackages = [
  {
    title: "Jaipur Tour",
    duration: "3 Days",
    image: "/tours/jaipur.webp",
    features: [
      "🏰 Pink City",
      "📸 Amer Fort",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Udaipur Tour",
    duration: "4 Days",
    image: "/tours/udaipur.webp",
    features: [
      "🏞️ City of Lakes",
      "🏰 Royal Palaces",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Jodhpur Tour",
    duration: "4 Days",
    image: "/tours/jodhpur.webp",
    features: [
      "🏰 Mehrangarh Fort",
      "📸 Blue City",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Jaisalmer Tour",
    duration: "5 Days",
    image: "/tours/jaisalmer.webp",
    features: [
      "🐪 Desert Safari",
      "🏰 Golden Fort",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Khatu Shyam Darshan",
    duration: "3 Days",
    image: "/tours/khatu-shyam.webp",
    features: [
      "🙏 Khatu Shyam Ji",
      "🚖 Comfortable Travel",
      "👨‍✈️ Experienced Drivers",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Salasar Balaji",
    duration: "3 Days",
    image: "/tours/salasar-balaji.webp",
    features: [
      "🙏 Balaji Darshan",
      "🚖 Comfortable Travel",
      "👨‍✈️ Experienced Drivers",
      "📞 24×7 Support",
    ],
  },
];

const southIndiaPackages = [
  {
    title: "Tirupati Balaji",
    duration: "4 Days",
    image: "/tours/tirupati.webp",
    features: [
      "🙏 Balaji Darshan",
      "🚖 Comfortable Travel",
      "👨‍✈️ Experienced Drivers",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Srisailam Tour",
    duration: "3 Days",
    image: "/tours/srisailam.webp",
    features: [
      "🙏 Jyotirling Darshan",
      "🏞️ Scenic Route",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Rameshwaram Tour",
    duration: "5 Days",
    image: "/tours/rameshwaram.webp",
    features: [
      "🙏 Jyotirling Darshan",
      "🌊 Sea Bridge",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Madurai Tour",
    duration: "5 Days",
    image: "/tours/madurai.webp",
    features: [
      "🙏 Meenakshi Temple",
      "🏛️ Heritage City",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Kanyakumari Tour",
    duration: "6 Days",
    image: "/tours/kanyakumari.webp",
    features: [
      "🌅 Sunrise Point",
      "🌊 Three Sea Meeting Point",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },
];

const premiumPackages = [
  {
    title: "Goa Tour",
    duration: "5 Days",
    image: "/tours/goa1.webp",
    features: [
      "🏖️ Famous Beaches",
      "🌅 Sunset Views",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Coorg Tour",
    duration: "4 Days",
    image: "/tours/coorg.webp",
    features: [
      "☕ Coffee Estates",
      "🌳 Nature Views",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Mysore Tour",
    duration: "4 Days",
    image: "/tours/mysore.webp",
    features: [
      "🏰 Mysore Palace",
      "📸 Sightseeing",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Ooty Tour",
    duration: "5 Days",
    image: "/tours/ooty.webp",
    features: [
      "🏞️ Hill Station",
      "🚂 Toy Train",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Munnar Tour",
    duration: "5 Days",
    image: "/tours/munnar.webp",
    features: [
      "🍃 Tea Gardens",
      "🏞️ Hill Station",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Alleppey Tour",
    duration: "5 Days",
    image: "/tours/alleppey.webp",
    features: [
      "🚤 Backwaters",
      "🌴 Kerala Beauty",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },
];

const gujaratPackages = [
  {
    title: "Statue of Unity",
    duration: "4 Days",
    image: "/tours/statue-of-unity.webp",
    features: [
      "🗽 World's Tallest Statue",
      "📸 Valley of Flowers",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Somnath Darshan",
    duration: "4 Days",
    image: "/tours/somnath.webp",
    features: [
      "🙏 Jyotirling Darshan",
      "🌊 Sea Temple View",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Dwarka Darshan",
    duration: "5 Days",
    image: "/tours/dwarka.webp",
    features: [
      "🙏 Dwarkadhish Temple",
      "🛕 Religious Tour",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Gir National Park",
    duration: "4 Days",
    image: "/tours/gir.webp",
    features: [
      "🦁 Asiatic Lions",
      "🌳 Wildlife Experience",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Ahmedabad Tour",
    duration: "3 Days",
    image: "/tours/ahmedabad.webp",
    features: [
      "🏛️ Heritage City",
      "📸 Sightseeing",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },
];

export default function TourPackagesPage() {
  const [search, setSearch] = useState("");

    const [dynamicPackages, setDynamicPackages] = useState([]);
  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res = await fetch("/api/public/tour-packages");

        const data = await res.json();
        if (data.success) {
          setDynamicPackages(data.packages || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    loadPackages();
  }, []);

  const filteredPackages = dynamicPackages.filter((pkg) =>
  pkg.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
{/* Hero */}
<section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 pb-12 pt-28 text-white md:pb-14 md:pt-32">
  
  {/* Background Glow Effect */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-500/15 blur-3xl md:h-80 md:w-80" />
  </div>

  <div className="relative z-10 mx-auto max-w-5xl px-5 text-center sm:px-6">

    {/* Badge */}
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue-300 backdrop-blur-md shadow-inner sm:text-xs">
      <span>✨</span>
      RC Tours & Travels Nagpur
    </div>

    {/* Heading */}
    <h1 className="mx-auto mt-4 max-w-5xl text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
      Explore Popular Travel{" "}
      <span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
        Destinations from Nagpur
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
      Premium Cab Rental Service from Nagpur for Family Trips,
      Religious Tours, Wildlife Safaris, and Outstation Travel.
    </p>

    {/* Buttons */}
    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

      <a
        href="tel:9172271464"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition hover:-translate-y-0.5 hover:bg-cyan-600"
      >
        📞 Call Now: +91 9172271464
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/25 transition hover:-translate-y-0.5 hover:bg-green-600"
      >
        💬 WhatsApp Quote
      </a>

    </div>
  </div>
</section>


{/* Search */}
<section className="relative z-20 mx-auto -mt-6 max-w-2xl px-5 sm:px-6">
  <div className="rounded-xl border border-slate-200/80 bg-white p-2.5 shadow-xl shadow-slate-900/10">

    <div className="relative flex items-center">
      <span className="absolute left-4 text-sm text-slate-400">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search tour packages (e.g., Tadoba, Pench, Shirdi)..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:bg-white focus:ring-2 focus:ring-cyan-500/20 md:text-base"
      />
    </div>

  </div>
</section>


{/* Stats */}
<section className="mx-auto max-w-7xl px-5 py-6 sm:px-6 md:py-8">

  <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">

    {/* Trips */}
    <div className="group rounded-xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-lg md:px-4 md:py-4">

      <div className="text-xl leading-none md:text-2xl">
        🚖
      </div>

      <h3 className="mt-1.5 text-2xl font-black leading-none tracking-tight text-slate-950 md:text-3xl">
        1000+
      </h3>

      <p className="mt-1 text-[10px] font-bold text-slate-500 md:text-xs">
        Trips Completed
      </p>

    </div>


    {/* Customers */}
    <div className="group rounded-xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg md:px-4 md:py-4">

      <div className="text-xl leading-none md:text-2xl">
        😊
      </div>

      <h3 className="mt-1.5 text-2xl font-black leading-none tracking-tight text-slate-950 md:text-3xl">
        500+
      </h3>

      <p className="mt-1 text-[10px] font-bold text-slate-500 md:text-xs">
        Happy Customers
      </p>

    </div>


    {/* Support */}
    <div className="group rounded-xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg md:px-4 md:py-4">

      <div className="text-xl leading-none md:text-2xl">
        🕒
      </div>

      <h3 className="mt-1.5 text-2xl font-black leading-none tracking-tight text-slate-950 md:text-3xl">
        24×7
      </h3>

      <p className="mt-1 text-[10px] font-bold text-slate-500 md:text-xs">
        Customer Support
      </p>

    </div>


    {/* Destinations */}
    <div className="group rounded-xl border border-slate-200 bg-white px-3 py-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg md:px-4 md:py-4">

      <div className="text-xl leading-none md:text-2xl">
        📍
      </div>

      <h3 className="mt-1.5 text-2xl font-black leading-none tracking-tight text-slate-950 md:text-3xl">
        50+
      </h3>

      <p className="mt-1 text-[10px] font-bold text-slate-500 md:text-xs">
        Destinations
      </p>

    </div>

  </div>

</section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
            Explore Our Tour Packages
          </h2>

          <div className="flex justify-end mb-6">
          <p className="text-sm text-slate-500">
          ← Swipe to Explore →
          </p>
          </div>

          <p className="text-slate-600 text-xl">
            Best Price Guaranteed • Customized Packages Available
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {filteredPackages.map((pkg, index) => (
            <div
            key={index}
            className="min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-48 sm:h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>

                <p className="text-gray-600 mb-4">{pkg.duration}</p>

                <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
                <p>✅ Best Price Guaranteed</p>
                <p>✅ Clean & Comfortable Vehicles</p>
                <p>✅ Experienced Drivers</p>
                <p>✅ 24×7 Customer Support</p>
                <p>✅ Customized Travel Plan</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="tel:9172271464"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold"
                  >
                    📞 Call
                  </a>

                  <a
                    href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
                    target="_blank"
                    className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Madhya Pradesh Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">
  <div className="mb-10">
    <h2 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight">
      Explore Madhya Pradesh
    </h2>

    <p className="text-slate-600 mt-2">
      Wildlife Safaris • Jyotirling Darshan • Hill Stations
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
    {mpPackages.map((pkg, index) => (
      <div
        key={index}
        className="min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            <p>✅ Best Price Guaranteed</p>
            <p>✅ Clean & Comfortable Vehicles</p>
            <p>✅ Experienced Drivers</p>
            <p>✅ 24×7 Customer Support</p>
            <p>✅ Customized Travel Plan</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

{/* Uttar Pradesh Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">

  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
      Spiritual Journeys Across Uttar Pradesh
    </h2>

    <p className="text-slate-600 mt-2">
      Ayodhya • Varanasi • Prayagraj • Mathura Vrindavan
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">

    {upPackages.map((pkg, index) => (
      <div
        key={index}
        className="min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            <p>✅ Best Price Guaranteed</p>
            <p>✅ Clean & Comfortable Vehicles</p>
            <p>✅ Experienced Drivers</p>
            <p>✅ 24×7 Customer Support</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}

  </div>
</section>

{/* Rajasthan Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">

  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
      Discover Royal Rajasthan
    </h2>

    <p className="text-slate-600 mt-2">
      Jaipur • Udaipur • Jodhpur • Jaisalmer • Khatu Shyam • Salasar Balaji
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
    {rajasthanPackages.map((pkg, index) => (
      <div
        key={index}
        className="mmin-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            {pkg.features.map((feature, i) => (
              <p key={i}>{feature}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>

</section>

{/* South India Spiritual Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">

  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
      South India Spiritual Tours
    </h2>

    <p className="text-slate-600 mt-2">
      Tirupati • Srisailam • Rameshwaram • Madurai • Kanyakumari
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
    {southIndiaPackages.map((pkg, index) => (
      <div
        key={index}
        className="mmin-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            {pkg.features.map((feature, i) => (
              <p key={i}>{feature}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>

</section>

{/* Goa Karnataka Kerala Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">

  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
      Goa, Karnataka & Kerala Escapes
    </h2>

    <p className="text-slate-600 mt-2">
      Goa • Coorg • Mysore • Ooty • Munnar • Alleppey
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
    {premiumPackages.map((pkg, index) => (
      <div
        key={index}
        className="mmin-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            {pkg.features.map((feature, i) => (
              <p key={i}>{feature}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>

</section>

{/* Gujarat Tours */}
<section className="max-w-7xl mx-auto px-6 py-8 md:py-12">

  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
      Explore Vibrant Gujarat
    </h2>

    <p className="text-slate-600 mt-2">
      Statue of Unity • Somnath • Dwarka • Gir • Ahmedabad
    </p>
  </div>

  <div className="flex justify-end mb-6">
    <p className="text-sm text-slate-500">
      ← Swipe to Explore →
    </p>
  </div>

  <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
    {gujaratPackages.map((pkg, index) => (
      <div
        key={index}
        className="min-w-[260px] sm:min-w-[300px] max-w-[300px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-48 sm:h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-5">
            {pkg.features.map((feature, i) => (
              <p key={i}>{feature}</p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:9172271464"
              className="bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl font-bold"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/919172271464?text=Hello RC Tours & Travels, I want details about ${pkg.title}`}
              target="_blank"
              className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-bold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>

</section>

      {/* CTA */}
<section className="py-20 md:py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
  <div className="max-w-7xl mx-auto px-6 text-center">

    <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
      Can't Find Your Destination?
    </h2>

    <p className="text-base md:text-2xl mb-10">
      Need a Cab for Your Next Trip? Contact RC Tours & Travels
      for Comfortable and Reliable Outstation Travel.
    </p>

    <div className="flex flex-col sm:flex-row justify-center gap-4">

      <a
        href="tel:9172271464"
        className="bg-white text-blue-700 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold w-full sm:w-auto text-center"
      >
        📞 Call Now
      </a>

      <a
        href="https://wa.me/919172271464"
        target="_blank"
        className="bg-green-500 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold w-full sm:w-auto text-center"
      >
        💬 WhatsApp Now
      </a>

    </div>

  </div>
</section>

{/* ================= TOUR BOOKING PROCESS ================= */}
<section className="bg-slate-50 py-10 md:py-14">
  <div className="mx-auto max-w-7xl px-5 sm:px-6">

    {/* Heading */}
    <div className="mb-8 text-center md:mb-10">
      <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
        <span className="h-px w-6 bg-cyan-500" />
        How It Works
        <span className="h-px w-6 bg-cyan-500" />
      </div>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        Easy Booking Process
      </h2>

      <p className="mt-2 text-sm text-slate-600 md:text-base">
        Book your journey with RC Tours & Travels in 6 simple steps.
      </p>
    </div>

    {/* Booking Steps */}
    <div className="relative">

      {/* Desktop Connecting Line */}
      <div className="absolute left-[8%] right-[8%] top-7 hidden h-px bg-gradient-to-r from-cyan-200 via-cyan-400 to-cyan-200 lg:block" />

      <div className="relative grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">

        {[
          {
            num: "01",
            icon: "📞",
            title: "Contact Us",
            desc: "Call or WhatsApp",
          },
          {
            num: "02",
            icon: "📍",
            title: "Share Route",
            desc: "Pickup & destination",
          },
          {
            num: "03",
            icon: "💰",
            title: "Get Quote",
            desc: "Best fare instantly",
          },
          {
            num: "04",
            icon: "🚗",
            title: "Choose Cab",
            desc: "Select your vehicle",
          },
          {
            num: "05",
            icon: "✅",
            title: "Confirm",
            desc: "Confirm your booking",
          },
          {
            num: "06",
            icon: "🎉",
            title: "Enjoy Trip",
            desc: "Travel comfortably",
          },
        ].map((step) => (
          <div
            key={step.num}
            className="group relative flex flex-col items-center text-center"
          >
            {/* Step Circle */}
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-slate-50 bg-white text-2xl shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-cyan-600">
              <span className="transition-transform duration-300 group-hover:scale-110">
                {step.icon}
              </span>

              {/* Small Number */}
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-600 text-[8px] font-black text-white shadow">
                {step.num}
              </span>
            </div>

            {/* Content */}
            <div className="mt-3">
              <h3 className="text-sm font-black text-slate-950 transition-colors group-hover:text-cyan-600">
                {step.title}
              </h3>

              <p className="mt-1 text-[11px] leading-4 text-slate-500">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
</section>

{/* We Travel Across India */}
<section className="py-8 md:py-16 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
        We Travel Across India
      </h2>

      <p className="text-slate-600 text-base md:text-xl">
        Comfortable Cab Services for Religious Tours, Wildlife Safaris,
        Hill Stations and Family Trips Across India.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">

      {[
        ["🏛️", "Maharashtra"],
        ["🐅", "Madhya Pradesh"],
        ["🙏", "Uttar Pradesh"],
        ["🏰", "Rajasthan"],
        ["🌊", "Gujarat"],
        ["🛕", "South India"],
      ].map((item, i) => (
        <div key={i} className="bg-slate-50 rounded-3xl p-4 md:p-6 text-center shadow-lg">

          <div className="text-3xl md:text-5xl mb-3">{item[0]}</div>

          <h3 className="font-bold text-base md:text-lg">
            {item[1]}
          </h3>

        </div>
      ))}

    </div>

    <div className="mt-10 md:mt-14 bg-blue-50 rounded-3xl p-6 md:p-8 text-center border border-blue-100">

      <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
        50+ Popular Destinations Covered
      </h3>

      <p className="text-slate-700 text-sm md:text-lg">
        Shirdi • Mahurgad • Tuljapur • Pandharpur • Tadoba • Pench • Kanha • Pachmarhi •
        Ujjain • Omkareshwar • Ayodhya • Varanasi • Jaipur • Udaipur • Khatu Shyam •
        Tirupati • Srisailam • Dwarka • Somnath • Statue of Unity and many more.
      </p>

    </div>

  </div>
</section>

   {/* Why Choose RC Tours & Travels */}
<section className="bg-white py-6 md:py-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">

    {/* Heading */}
    <div className="text-center mb-10 md:mb-14">

      <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
        Why Choose RC Tours & Travels?
      </h2>

      <p className="text-slate-600 text-base md:text-lg">
        Trusted Cab Rental Service from Nagpur for Comfortable and Hassle-Free Travel
      </p>

    </div>

    {/* Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">

      {/* Card 1 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">🚖</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          Clean Vehicles
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Well-maintained and comfortable vehicles for every journey.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">👨‍✈️</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          Experienced Drivers
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Professional drivers with excellent route knowledge.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">📞</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          24×7 Support
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Quick assistance before, during and after your trip.
        </p>
      </div>

      {/* Card 4 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">⏰</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          On-Time Pickup
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Punctual pickup and reliable travel experience.
        </p>
      </div>

      {/* Card 5 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">🛣️</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          All India Tours
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Travel comfortably to destinations across India.
        </p>
      </div>

      {/* Card 6 */}
      <div className="bg-slate-50 rounded-3xl p-4 md:p-8 shadow-lg text-center hover:shadow-2xl transition">
        <div className="text-3xl md:text-5xl mb-3">💰</div>
        <h3 className="text-base md:text-2xl font-bold mb-2">
          Best Pricing
        </h3>
        <p className="text-slate-600 text-xs md:text-base">
          Transparent pricing with no hidden charges.
        </p>
      </div>

    </div>

  </div>
</section>

{/* ================= OUR PREMIUM FLEET ================= */}
<section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white py-6 md:py-8">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">

    {/* Heading */}
    <div className="mx-auto mb-5 max-w-2xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-500" />
        Travel With Comfort
      </div>

      <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        Our Premium Fleet
      </h2>

      <p className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">
        Explore our well-maintained, comfortable vehicles designed for family
        trips, religious tours, and outstation travel.
      </p>
    </div>

    {/* Fleet Grid */}
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5 md:gap-5">

      {[
        {
          name: "Swift Dzire",
          tag: "Comfortable",
          seats: "4+1 Seater",
          image: "/swift-dzire.webp",
        },
        {
          name: "Ertiga",
          tag: "Family SUV",
          seats: "6+1 Seater",
          image: "/ertiga.webp",
        },
        {
          name: "Innova Crysta",
          tag: "Luxury Travel",
          seats: "7+1 Seater",
          image: "/innova-crysta.webp",
        },
        {
          name: "Tempo Traveller",
          tag: "Group Travel",
          seats: "12-20 Seater",
          image: "/tempo traveller.webp",
        },
        {
          name: "Force Urbania",
          tag: "Ultra Luxury",
          seats: "13-17 Seater",
          image: "/urbania.webp",
        },
      ].map((car) => (
        <div
          key={car.name}
          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:shadow-xl"
        >
          {/* Vehicle Image */}
          <div className="relative h-32 overflow-hidden rounded-xl bg-slate-100 sm:h-36 md:h-40">
            <img
              src={car.image}
              alt={car.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />

            {/* Seating Badge */}
            <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/80 px-2.5 py-1 text-[9px] font-bold text-white backdrop-blur-md">
              {car.seats}
            </span>
          </div>

          {/* Content */}
          <div className="px-2 pb-2.5 pt-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-cyan-600">
              {car.tag}
            </p>

            <h3 className="mt-1 text-sm font-black tracking-tight text-slate-950 md:text-base">
              {car.name}
            </h3>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-slate-100 py-2.5 text-[10px] font-bold text-slate-800 transition-all duration-300 group-hover:bg-cyan-600 group-hover:text-white"
            >
              Book Cab ➜
            </a>
          </div>
        </div>
      ))}

    </div>

  </div>
</section>

{/* ================= CUSTOMER REVIEWS ================= */}
<section className="bg-white py-8 md:py-12">
  <div className="mx-auto max-w-7xl px-4 sm:px-6">

    {/* Heading */}
    <div className="mx-auto mb-7 max-w-2xl text-center md:mb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-600">
        <span className="text-sm">★</span>
        Customer Reviews
      </div>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        What Our Customers Say
      </h2>

      <p className="mt-2 text-sm text-slate-600 md:text-base">
        Trusted by happy travelers for comfortable and reliable journeys.
      </p>
    </div>

    {/* Reviews Grid */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">

      {/* Review 1 */}
      <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-white hover:shadow-xl">
        
        <div className="flex items-center justify-between">
          <div className="flex text-base tracking-wide">
            ⭐⭐⭐⭐⭐
          </div>

          <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-green-600">
            Verified
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Excellent service for our Shirdi trip. The vehicle was clean,
          comfortable and the driver was very professional.
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100 text-sm font-black text-cyan-700">
            R
          </div>

          <div>
            <h4 className="text-sm font-black text-slate-900">
              Rajesh P.
            </h4>
            <p className="text-[10px] font-medium text-slate-500">
              Shirdi Trip
            </p>
          </div>
        </div>
      </div>

      {/* Review 2 */}
      <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-white hover:shadow-xl">
        
        <div className="flex items-center justify-between">
          <div className="flex text-base tracking-wide">
            ⭐⭐⭐⭐⭐
          </div>

          <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-green-600">
            Verified
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Booked an Innova for our family tour. Comfortable journey,
          timely pickup and excellent service throughout the trip.
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-black text-blue-700">
            A
          </div>

          <div>
            <h4 className="text-sm font-black text-slate-900">
              Amit K.
            </h4>
            <p className="text-[10px] font-medium text-slate-500">
              Family Tour
            </p>
          </div>
        </div>
      </div>

      {/* Review 3 */}
      <div className="group rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-white hover:shadow-xl">
        
        <div className="flex items-center justify-between">
          <div className="flex text-base tracking-wide">
            ⭐⭐⭐⭐⭐
          </div>

          <span className="rounded-full bg-green-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-green-600">
            Verified
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-600">
          Best cab service from Nagpur. Highly recommended for
          comfortable and reliable outstation travel.
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-sm font-black text-purple-700">
            P
          </div>

          <div>
            <h4 className="text-sm font-black text-slate-900">
              Priya S.
            </h4>
            <p className="text-[10px] font-medium text-slate-500">
              Outstation Travel
            </p>
          </div>
        </div>
      </div>

    </div>

  </div>
</section>


{/* ================= FAQ SECTION ================= */}
<section className="bg-slate-50 py-8 md:py-12">
  <div className="mx-auto max-w-5xl px-4 sm:px-6">

    {/* Heading */}
    <div className="mx-auto mb-7 max-w-2xl text-center md:mb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
        <span>💬</span>
        Help Center
      </div>

      <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
        Frequently Asked Questions
      </h2>

      <p className="mt-2 text-sm text-slate-600 md:text-base">
        Everything you need to know before booking your trip.
      </p>
    </div>

    {/* FAQ List */}
    <div className="space-y-3">

      {/* FAQ 1 */}
      <details className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-black text-slate-900 md:text-base">
          Do you provide only cab service?

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-cyan-500 group-open:text-white">
            +
          </span>
        </summary>

        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
          RC Tours & Travels provides cab rental services for tours,
          outstation trips, airport transfers, local travel and religious journeys.
        </div>
      </details>


      {/* FAQ 2 */}
      <details className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-black text-slate-900 md:text-base">
          Are hotel bookings included?

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-cyan-500 group-open:text-white">
            +
          </span>
        </summary>

        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
          No. We currently provide transportation and cab rental services.
          Hotel bookings are not included unless specifically mentioned in a package.
        </div>
      </details>


      {/* FAQ 3 */}
      <details className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-black text-slate-900 md:text-base">
          Can I customize my travel plan?

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-cyan-500 group-open:text-white">
            +
          </span>
        </summary>

        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
          Yes. You can customize your destinations, travel dates,
          vehicle requirements and travel schedule according to your needs.
        </div>
      </details>


      {/* FAQ 4 */}
      <details className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-black text-slate-900 md:text-base">
          Which vehicles are available?

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-cyan-500 group-open:text-white">
            +
          </span>
        </summary>

        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
          We offer Swift Dzire, Ertiga, Innova Crysta,
          Tempo Traveller and Force Urbania depending on your travel requirements.
        </div>
      </details>


      {/* FAQ 5 */}
      <details className="group rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-cyan-300 hover:shadow-md">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-black text-slate-900 md:text-base">
          How can I book a trip?

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-cyan-500 group-open:text-white">
            +
          </span>
        </summary>

        <div className="border-t border-slate-100 px-5 py-4 text-sm leading-6 text-slate-600">
          Simply call us or send us a WhatsApp message with your travel details.
          Our team will assist you with the vehicle, quotation and booking process.
        </div>
      </details>

    </div>

  </div>
</section>

<Footer />

{/* Floating Call Button */}
<div className="fixed bottom-6 right-0 z-50 flex flex-col items-center gap-1">

  {/* Call */}
  <a
    href="tel:+919172271464"
    className="bg-cyan-500 hover:bg-cyan-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl"
  >
    📞
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919172271464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-4xl"
  >
    <FaWhatsapp />
  </a>

  {/* Discount Badge */}
  <div className="bg-green-500 text-white px-3 py-2 rounded-xl shadow-xl animate-pulse">
    <p className="text-[11px] font-bold text-center whitespace-nowrap">
      🎁 Get Discount
    </p>
  </div>

</div>

    </div>
  );
}