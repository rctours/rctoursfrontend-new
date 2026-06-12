"use client";

import Link from "next/link";
import { useState } from "react";

const blogs = [
  {
  slug: "cab-service-in-nagpur",
  title: "Cab Service in Nagpur",
  category: "Taxi Service",
  image: "/blogs/cab-service.jpg",
},

{
  slug: "taxi-fare-per-km-in-nagpur",
  title: "Taxi Fare Per KM in Nagpur",
  category: "Taxi Fare",
  image: "/blogs/taxi-fare.jpg",
},

{
  slug: "nagpur-cab-booking",
  title: "Nagpur Cab Booking",
  category: "Cab Booking",
  image: "/blogs/cab-booking.jpeg",
},

{
  slug: "nagpur-to-pune-taxi-fare",
  title: "Nagpur to Pune Taxi Fare",
  category: "Outstation Taxi",
  image: "/blogs/pune11.jpeg",
},

{
  slug: "nagpur-to-hyderabad-taxi-fare",
  title: "Nagpur to Hyderabad Taxi Fare",
  category: "Outstation Taxi",
  image: "/blogs/hyderabad.jpeg",
},

{
  slug: "nagpur-to-mumbai-taxi-fare",
  title: "Nagpur to Mumbai Taxi Fare",
  category: "Outstation Taxi",
  image: "/blogs/mumbai.jpeg",
},

{
  slug: "airport-cab-nagpur",
  title: "Airport Cab Nagpur",
  category: "Airport Taxi",
  image: "/blogs/airport-cab-nagpur.jpeg",
},

{
  slug: "cab-booking-in-nagpur",
  title: "Cab Booking in Nagpur",
  category: "Cab Booking",
  image: "/blogs/cab-booking-nagpur.jpeg",
},

{
  slug: "local-taxi-service-in-nagpur",
  title: "Local Taxi Service in Nagpur",
  category: "Local Taxi",
  image: "/blogs/local-taxi-nagpur.jpeg",
},

{
  slug: "24-hours-taxi-service-in-nagpur",
  title: "24 Hours Taxi Service in Nagpur",
  category: "24x7 Taxi",
  image: "/blogs/24-hours-taxi.jpg",
},

{
  slug: "nagpur-airport-taxi-service",
  title: "Nagpur Airport Taxi Service",
  category: "Airport Taxi",
  image: "/blogs/nagpur-airport-taxi.jpeg",
},

{
  slug: "airport-taxi-nagpur",
  title: "Airport Taxi Nagpur",
  category: "Airport Taxi",
  image: "/blogs/airport-taxi-nagpur.jpeg",
},

{
  slug: "one-way-taxi-service-in-nagpur",
  title: "One Way Taxi Service in Nagpur",
  category: "One Way Taxi",
  image: "/blogs/one-way-taxi-nagpur.jpg",
},

];

export default function BlogPage() {
  const [search, setSearch] = useState("");

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Hero */}
      <section className="pt-40 pb-24 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl md:text-7xl font-black mb-6">
            RC Tours & Travels Blog
          </h1>

          <p className="text-xl md:text-2xl max-w-4xl mx-auto text-white/90">
            Taxi Services, Travel Guides, Tour Packages, Fare Information
            and Local Travel Tips from Nagpur.
          </p>

        </div>
      </section>

      {/* Search */}
      <section className="max-w-4xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-4">
          <input
            type="text"
            placeholder="Search Blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-lg outline-none"
          />
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">

          <img
            src="/blogs/featured.jpeg"
            alt="Featured Blog"
            className="w-full h-[400px] object-cover"
          />

          <div className="p-8">

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              Featured Blog
            </span>

            <h2 className="text-4xl font-black mt-4 mb-4">
              Best Taxi Service in Nagpur – Complete Guide
            </h2>

            <p className="text-slate-600 text-lg mb-6">
              Looking for reliable taxi service in Nagpur?
              Learn about fares, booking process, outstation trips,
              airport transfers and more.
            </p>

            <Link
              href="/blog/best-taxi-service-in-nagpur"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Read Article
            </Link>

          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-5xl font-black text-center mb-12">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredBlogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <span className="text-blue-600 font-semibold">
                  {blog.category}
                </span>

                <h3 className="text-2xl font-bold mt-2 mb-4">
                  {blog.title}
                </h3>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-blue-600 font-bold"
                >
                  Read More →
                </Link>

              </div>

            </div>
          ))}

        </div>

      </section>

    </div>
  );
}