"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const maharashtraPackages = [
  // Wildlife Safari

  {
    title: "Tadoba Safari",
    duration: "1 Day",
    image: "/tours/tadoba1.jpg",
    features: ["🐅 Tiger Reserve", "🚖 Pickup & Drop", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Pench Safari",
    duration: "1 Day",
    image: "/tours/pench1.jpg",
    features: ["🐅 Jungle Safari", "🚖 Pickup & Drop", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Hill Stations

  {
    title: "Chikhaldara Tour",
    duration: "2 Days",
    image: "/tours/chikhaldara1.jpg",
    features: ["🏞️ Hill Station", "📸 Scenic Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Mahabaleshwar Tour",
    duration: "4 Days",
    image: "/tours/mahabaleshwar.jpg",
    features: ["🏞️ Hill Station", "📸 Scenic Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Lonavala Tour",
    duration: "3 Days",
    image: "/tours/lonavala.jpg",
    features: ["🏞️ Hill Station", "🌧️ Nature Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  // Religious Tours

  {
    title: "Shirdi Darshan",
    duration: "2 Days",
    image: "/tours/shirdi.jpeg",
    features: ["🙏 Sai Baba Darshan", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Shani Shingnapur",
    duration: "2 Days",
    image: "/tours/shani-shingnapur.jpg",
    features: ["🙏 Shanidev Temple", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Nashik Tour",
    duration: "3 Days",
    image: "/tours/nashik1.jpg",
    features: ["🙏 Trimbakeshwar", "🍇 Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Grishneshwar",
    duration: "2 Days",
    image: "/tours/grishneshwar.jpg",
    features: ["🙏 Jyotirling Darshan", "🏛️ Temple Visit", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Mahurgad Darshan",
    duration: "1 Day",
    image: "/tours/mahurgad.jpeg",
    features: ["🙏 Renuka Mata", "⛰️ Hill Temple", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Tuljapur Darshan",
    duration: "2 Days",
    image: "/tours/tuljapur.jpg",
    features: ["🙏 Tulja Bhavani", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Akkalkot Darshan",
    duration: "2 Days",
    image: "/tours/akkalkot.jpg",
    features: ["🙏 Swami Samarth", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Pandharpur Darshan",
    duration: "2 Days",
    image: "/tours/pandharpur.jpg",
    features: ["🙏 Vitthal Rukmini", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  {
    title: "Kolhapur Mahalaxmi",
    duration: "3 Days",
    image: "/tours/kolhapur.jpg",
    features: ["🙏 Mahalaxmi Temple", "🏛️ Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ashtavinayak Yatra",
    duration: "3 Days",
    image: "/tours/ashtavinayak.png",
    features: ["🐘 8 Ganpati Temples", "🙏 Religious Tour", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Shegaon Darshan",
    duration: "2 Days",
    image: "/tours/shegaon.jpg",
    features: ["🙏 Gajanan Maharaj", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Konkan & Beach Tours

  {
    title: "Konkan Tour",
    duration: "5 Days",
    image: "/tours/konkan.jpg",
    features: ["🏖️ Beaches", "🌊 Sea Views", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ganpatipule Tour",
    duration: "4 Days",
    image: "/tours/ganpatipule.jpg",
    features: ["🙏 Ganpati Temple", "🏖️ Beach", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Alibaug Tour",
    duration: "3 Days",
    image: "/tours/alibaug.jpg",
    features: ["🏖️ Beach Destination", "🚖 Comfortable Travel", "👨‍✈️ Experienced Drivers", "📞 24×7 Support"],
  },

  // Heritage

  {
    title: "Ajanta Ellora",
    duration: "2 Days",
    image: "/tours/ajanta.jpg",
    features: ["🏛️ UNESCO Heritage", "📸 Historic Caves", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },

  {
    title: "Ch. Sambhajinagar Tour",
    duration: "2 Days",
    image: "/tours/sambhajinagar.jpg",
    features: ["🏛️ Historic City", "📸 Local Sightseeing", "🚖 Comfortable Travel", "📞 24×7 Support"],
  },
];

const mpPackages = [
  {
    title: "Kanha Safari",
    duration: "2 Days",
    image: "/tours/kanha.jpg",
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
    image: "/tours/satpura.jpg",
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
    image: "/tours/pachmarhi.jpg",
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
    image: "/tours/ujjain.jpg",
    features: [
      "🙏 Mahakal Darshan",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Omkareshwar",
    duration: "2 Days",
    image: "/tours/omkareshwar.jpg",
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
    image: "/tours/ayodhya.jpg",
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
    image: "/tours/varanasi.jpg",
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
    image: "/tours/prayagraj.jpg",
    features: [
      "🙏 Triveni Sangam",
      "🚖 Comfortable Travel",
      "📞 24×7 Support",
    ],
  },

  {
    title: "Mathura Vrindavan",
    duration: "3 Days",
    image: "/tours/mathura.jpg",
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
    image: "/tours/jaipur.jpg",
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
    image: "/tours/udaipur.jpg",
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
    image: "/tours/jodhpur.jpg",
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
    image: "/tours/jaisalmer.jpg",
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
    image: "/tours/khatu-shyam.jpg",
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
    image: "/tours/salasar-balaji.jpg",
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
    image: "/tours/tirupati.jpg",
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
    image: "/tours/srisailam.jpg",
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
    image: "/tours/rameshwaram.jpg",
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
    image: "/tours/madurai.png",
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
    image: "/tours/kanyakumari.jpg",
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
    image: "/tours/goa1.jpg",
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
    image: "/tours/coorg.jpg",
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
    image: "/tours/munnar.jpg",
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
    image: "/tours/alleppey.jpg",
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
    image: "/tours/statue-of-unity.jpg",
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
    image: "/tours/somnath.jpg",
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
    image: "/tours/gir.jpg",
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
    image: "/tours/ahmedabad.jpg",
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

  const filteredPackages = maharashtraPackages.filter((pkg) =>
  pkg.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Explore Popular Travel Destinations from Nagpur
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-8">
          Premium Cab Rental Service from Nagpur for Family Trips,
          Religious Tours, Wildlife Safaris and Outstation Travel.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9172271464"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold"
            >
              💬 WhatsApp Quote
            </a>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <input
            type="text"
            placeholder="Search Tour Packages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-lg outline-none"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-black text-blue-600">1000+</h3>
            <p>Trips Completed</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-black text-blue-600">500+</h3>
            <p>Happy Customers</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-black text-blue-600">24×7</h3>
            <p>Support</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-black text-blue-600">50+</h3>
            <p>Destinations</p>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-14">
          <h2 className="text-5xl font-black text-slate-900 mb-4">
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
            className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
            >
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.title}</h3>

                <p className="text-gray-600 mb-4">{pkg.duration}</p>

                <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">
  <div className="mb-10">
    <h2 className="text-4xl md:text-5xl font-black text-slate-900">
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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">

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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">

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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">

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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">

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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
<section className="max-w-7xl mx-auto px-6 py-12">

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
        className="min-w-[320px] max-w-[320px] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 snap-start flex-shrink-0"
      >
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-60 object-cover"
        />

        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">
            {pkg.title}
          </h3>

          <p className="text-gray-600 mb-4">
            {pkg.duration}
          </p>

          <div className="space-y-2 mb-5">
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
      <section className="py-20 bg-gradient-to-r from-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black mb-6">
            Can't Find Your Destination?
          </h2>

          <p className="text-2xl mb-10">
          Need a Cab for Your Next Trip? Contact RC Tours & Travels
          for Comfortable and Reliable Outstation Travel.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:9172271464"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
            >
              📞 Call Now
            </a>

            <a
              href="https://wa.me/919172271464"
              target="_blank"
              className="bg-green-500 px-8 py-4 rounded-xl font-bold"
            >
              💬 WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* Tour Booking Process */}
<section className="py-24 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-black text-slate-900 mb-4">
        Easy Booking Process
      </h2>

      <p className="text-slate-600 text-xl">
        Book Your Trip in Just 4 Simple Steps
      </p>
    </div>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-black mb-5">
          1
        </div>
        <h3 className="text-2xl font-bold mb-3">
          Contact Us
        </h3>
        <p className="text-slate-600">
          Call or WhatsApp us with your travel requirements.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-black mb-5">
          2
        </div>
        <h3 className="text-2xl font-bold mb-3">
          Get Quote
        </h3>
        <p className="text-slate-600">
          Receive a customized trip quotation.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-black mb-5">
          3
        </div>
        <h3 className="text-2xl font-bold mb-3">
          Confirm Booking
        </h3>
        <p className="text-slate-600">
          Confirm your vehicle and travel dates.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-black mb-5">
          4
        </div>
        <h3 className="text-2xl font-bold mb-3">
          Enjoy Your Trip
        </h3>
        <p className="text-slate-600">
          Relax and travel comfortably with RC Tours & Travels.
        </p>
      </div>

    </div>

  </div>
</section>

{/* We Travel Across India */}
<section className="py-24 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-black text-slate-900 mb-4">
        We Travel Across India
      </h2>

      <p className="text-slate-600 text-xl">
        Comfortable Cab Services for Religious Tours, Wildlife Safaris,
        Hill Stations and Family Trips Across India.
      </p>
    </div>

    <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🏛️</div>
        <h3 className="font-bold text-lg">Maharashtra</h3>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🐅</div>
        <h3 className="font-bold text-lg">Madhya Pradesh</h3>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🙏</div>
        <h3 className="font-bold text-lg">Uttar Pradesh</h3>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🏰</div>
        <h3 className="font-bold text-lg">Rajasthan</h3>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🌊</div>
        <h3 className="font-bold text-lg">Gujarat</h3>
      </div>

      <div className="bg-slate-50 rounded-3xl p-6 text-center shadow-lg">
        <div className="text-5xl mb-3">🛕</div>
        <h3 className="font-bold text-lg">South India</h3>
      </div>

    </div>

    <div className="mt-14 bg-blue-50 rounded-3xl p-8 text-center border border-blue-100">
      <h3 className="text-3xl font-bold text-blue-900 mb-4">
        50+ Popular Destinations Covered
      </h3>

      <p className="text-slate-700 text-lg">
        Shirdi • Mahurgad • Tuljapur • Pandharpur • Tadoba • Pench • Kanha • Pachmarhi •
        Ujjain • Omkareshwar • Ayodhya • Varanasi • Jaipur • Udaipur • Khatu Shyam •
        Tirupati • Srisailam • Dwarka • Somnath • Statue of Unity and many more.
      </p>
    </div>

  </div>
</section>

    {/* Why Choose RC Tours & Travels */}
<section className="bg-white py-20">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
        Why Choose RC Tours & Travels?
      </h2>

      <p className="text-slate-600 text-lg">
        Trusted Cab Rental Service from Nagpur for Comfortable and Hassle-Free Travel
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚖</div>
        <h3 className="text-2xl font-bold mb-3">
          Clean Vehicles
        </h3>
        <p className="text-slate-600">
          Well-maintained and comfortable vehicles for every journey.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">👨‍✈️</div>
        <h3 className="text-2xl font-bold mb-3">
          Experienced Drivers
        </h3>
        <p className="text-slate-600">
          Professional drivers with excellent route knowledge.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">📞</div>
        <h3 className="text-2xl font-bold mb-3">
          24×7 Support
        </h3>
        <p className="text-slate-600">
          Quick assistance before, during and after your trip.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">⏰</div>
        <h3 className="text-2xl font-bold mb-3">
          On-Time Pickup
        </h3>
        <p className="text-slate-600">
          Punctual pickup and reliable travel experience.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🛣️</div>
        <h3 className="text-2xl font-bold mb-3">
          All India Tours
        </h3>
        <p className="text-slate-600">
          Travel comfortably to destinations across India.
        </p>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">💰</div>
        <h3 className="text-2xl font-bold mb-3">
          Best Pricing
        </h3>
        <p className="text-slate-600">
          Transparent pricing with no hidden charges.
        </p>
      </div>

    </div>

  </div>
</section>

{/* Our Premium Fleet */}
<section className="py-20 bg-slate-50">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
        Our Premium Fleet
      </h2>

      <p className="text-slate-600 text-lg">
        Comfortable Vehicles for Family Trips, Religious Tours and Outstation Travel
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚗</div>
        <h3 className="text-2xl font-bold mb-2">Swift Dzire</h3>
        <p className="text-slate-600">
          Comfortable sedan for small family trips and outstation travel.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚙</div>
        <h3 className="text-2xl font-bold mb-2">Maruti Ertiga</h3>
        <p className="text-slate-600">
          Spacious vehicle ideal for family tours and airport transfers.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚘</div>
        <h3 className="text-2xl font-bold mb-2">Toyota Innova</h3>
        <p className="text-slate-600">
          Premium comfort for long-distance journeys.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">✨</div>
        <h3 className="text-2xl font-bold mb-2">Innova Crysta</h3>
        <p className="text-slate-600">
          Luxury travel experience with extra comfort.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚌</div>
        <h3 className="text-2xl font-bold mb-2">Tempo Traveller</h3>
        <p className="text-slate-600">
          Best option for group tours and corporate travel.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
        <div className="text-5xl mb-4">🚐</div>
        <h3 className="text-2xl font-bold mb-2">Force Urbania</h3>
        <p className="text-slate-600">
          Premium luxury van for large families and groups.
        </p>
      </div>

    </div>

  </div>
</section>

{/* Customer Reviews */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
        What Our Customers Say
      </h2>

      <p className="text-slate-600 text-lg">
        Trusted by Hundreds of Happy Travelers
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-500 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-slate-700 mb-4">
          Excellent service for our Shirdi trip. Vehicle was clean and driver was very professional.
        </p>

        <h4 className="font-bold text-lg">
          Rajesh P.
        </h4>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-500 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-slate-700 mb-4">
          Booked Innova for family tour. Comfortable journey and timely pickup.
        </p>

        <h4 className="font-bold text-lg">
          Amit K.
        </h4>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 shadow-lg">
        <div className="text-yellow-500 text-2xl mb-4">
          ⭐⭐⭐⭐⭐
        </div>

        <p className="text-slate-700 mb-4">
          Best cab service from Nagpur. Highly recommended for outstation travel.
        </p>

        <h4 className="font-bold text-lg">
          Priya S.
        </h4>
      </div>

    </div>

  </div>
</section>

{/* FAQ Section */}
<section className="py-24 bg-white">
  <div className="max-w-5xl mx-auto px-6">

    <div className="text-center mb-16">
      <h2 className="text-5xl font-black text-slate-900 mb-4">
        Frequently Asked Questions
      </h2>

      <p className="text-slate-600 text-lg">
        Everything You Need To Know Before Booking
      </p>
    </div>

    <div className="space-y-6">

      <div className="bg-slate-50 rounded-2xl p-6 shadow">
        <h3 className="font-bold text-xl mb-2">
          Do you provide only cab service?
        </h3>
        <p className="text-slate-600">
          Yes. RC Tours & Travels provides cab rental services for tours,
          outstation trips, airport transfers and religious travel.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow">
        <h3 className="font-bold text-xl mb-2">
          Are hotel bookings included?
        </h3>
        <p className="text-slate-600">
          No. We provide transportation services only.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow">
        <h3 className="font-bold text-xl mb-2">
          Can I customize my travel plan?
        </h3>
        <p className="text-slate-600">
          Yes. We can arrange travel according to your preferred destinations
          and schedule.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow">
        <h3 className="font-bold text-xl mb-2">
          Which vehicles are available?
        </h3>
        <p className="text-slate-600">
          Swift Dzire, Ertiga, Innova, Innova Crysta, Tempo Traveller and
          Force Urbania.
        </p>
      </div>

      <div className="bg-slate-50 rounded-2xl p-6 shadow">
        <h3 className="font-bold text-xl mb-2">
          How can I book a trip?
        </h3>
        <p className="text-slate-600">
          Simply call us or send a WhatsApp message and our team will assist
          you with booking.
        </p>
      </div>

    </div>

  </div>
</section>

{/* Footer */}
<footer
  className="border-t border-white/10 py-10 relative overflow-hidden"
>

  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  >
    <source src="/footer-video.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/50"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

    <div className="grid md:grid-cols-4 gap-10">

      {/* Company */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          RC Tours & Travels
        </h3>

        <p className="text-gray-200">
          Premium Taxi Service In Nagpur For Airport Transfers,
          Local Rentals, Outstation Trips And Tour Packages.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Quick Links
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li><a href="/">Home</a></li>
          <li><a href="/fleet">Fleet</a></li>
          <li><a href="/tour-packages">Tour Packages</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </div>

      {/* Services */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Services
        </h3>

        <ul className="space-y-2 text-gray-200">
          <li>Airport Transfer</li>
          <li>Local Rental</li>
          <li>Outstation Taxi</li>
          <li>Corporate Cab</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="text-2xl font-bold mb-4 text-cyan-400 drop-shadow-[0_0_15px_#06b6d4]">
          Contact Us
        </h3>

        <ul className="space-y-3 text-gray-200">
          <li>📞 +91 9172271464</li>
          <li>📍 Nagpur, Maharashtra</li>
          <li>✉️ info@rctoursandtravels.in</li>
        </ul>
      </div>

    </div>

    <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-200">
      © 2026 RC Tours & Travels. All Rights Reserved.
      Designed by Rupesh Chavhan
    </div>

  </div>

</footer>

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