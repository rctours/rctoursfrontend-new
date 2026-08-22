"use client";

import Image from "next/image";

const features = [
  "24x7 Airport Service",
  "Affordable Pricing",
  "Clean & Sanitized Cars",
  "Professional Drivers",
];

const routes = [
  "Nagpur Airport → City",
  "Nagpur Airport → Railway Station",
  "Nagpur Airport → Hotels",
  "Nagpur Airport → MIDC",
  "Nagpur Airport → Anywhere in Nagpur",
];

const fleet = [
  { name: "New Dzire Taxi", img: "/cars/dzire.webp" },
  { name: "New Ertiga Taxi", img: "/ertiga.webp" },
  { name: "Innova Crysta Taxi", img: "/cars/crysta.webp" },
  { name: "Tempo Traveller", img: "/cars/traveller17.webp" },
];

const testimonials = [
  {
    name: "Amit Sharma",
    text: "Very punctual service. Driver was polite and car was clean.",
    rating: 5,
    time: "2 days ago",
  },
  {
    name: "Priya Deshmukh",
    text: "Best airport taxi in Nagpur. Highly recommended!",
    rating: 5,
    time: "1 week ago",
  },
  {
    name: "Rohit Patil",
    text: "Affordable and professional service.",
    rating: 4,
    time: "3 weeks ago",
  },
];

export default function Page() {
  return (
    <div className="page">

      {/* HERO */}
      <div className="hero">
        <h1>Nagpur Airport Taxi Service</h1>
        <p>24x7 Pickup & Drop | Safe | Affordable | On-Time Guarantee</p>

        <div className="cta">
          <a href="https://wa.me/9172271464?text=Hi%20I%20want%20Airport%20Taxi">
            🚖 WhatsApp Book
          </a>
          <a href="tel:+919172271464">
            📞 Call Now
          </a>
        </div>
      </div>

      {/* FEATURES */}
      <div className="section">
        <div className="grid">
          {features.map((f, i) => (
            <div key={i} className="card">✔ {f}</div>
          ))}
        </div>
      </div>

      {/* PRICING */}
      <div className="section">
        <h2>Airport Taxi Pricing</h2>
        <div className="grid">
          <div className="card">Dzire - ₹11/km</div>
          <div className="card">Ertiga - ₹14/km</div>
          <div className="card">Innova Crysta - ₹18/km</div>
          <div className="card">Tempo Traveller - ₹25/km</div>
        </div>
      </div>

      {/* FLEET */}
      <div className="section">
        <h2>Our Premium Fleet</h2>
        <div className="grid">
          {fleet.map((car, i) => (
            <div key={i} className="card">
              <Image
                src={car.img}
                alt={car.name}
                width={600}
                height={400}
                className="img"
              />
              <p className="title">{car.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ROUTES */}
      <div className="section">
        <h2>Routes Covered</h2>
        <ul className="list">
          {routes.map((r, i) => (
            <li key={i}>✔ {r}</li>
          ))}
        </ul>
      </div>

      {/* REVIEWS */}
      <div className="section">
        <h2>⭐ Customer Reviews</h2>
        <div className="grid">
          {testimonials.map((t, i) => (
            <div key={i} className="card">
              <div className="stars">{"⭐".repeat(t.rating)}</div>
              <p>"{t.text}"</p>
              <strong>- {t.name}</strong>
              <p className="time">{t.time}</p>
              <span className="verified">✔ Verified Customer</span>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="final">
        <h2>Book Your Taxi in 2 Minutes</h2>
        <a href="https://wa.me/9172271464">🚖 Book on WhatsApp</a>
      </div>

      {/* STYLE */}
      <style jsx>{`
        .page {
          background: #f6f7fb;
          min-height: 100vh;
          padding-top: 90px; /* navbar fix */
          padding-bottom: 120px;
        }

        .hero {
          background: linear-gradient(to right, #0f172a, #1e3a8a);
          color: white;
          text-align: center;
          padding: 80px 20px 60px;
        }

        .hero h1 {
          font-size: 42px;
          font-weight: 900;
        }

        .hero p {
          opacity: 0.9;
          margin-top: 10px;
        }

        .cta {
          margin-top: 20px;
        }

        .cta a {
          display: inline-block;
          margin: 10px;
          padding: 12px 22px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          color: white;
        }

        .cta a:first-child { background: #25d366; }
        .cta a:last-child { background: #ff3b30; }

        .section {
          max-width: 1100px;
          margin: auto;
          padding: 20px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 15px;
        }

        .card {
          background: white;
          padding: 15px;
          border-radius: 14px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }

        .img {
          width: 100%;
          border-radius: 10px;
        }

        .title {
          text-align: center;
          font-weight: 600;
          margin-top: 10px;
        }

        .list {
          padding-left: 10px;
        }

        .stars { color: #facc15; }
        .time { font-size: 12px; color: gray; }
        .verified { font-size: 12px; color: green; font-weight: 600; }

        .final {
          text-align: center;
          padding: 50px 20px;
        }

        .final a {
          background: #25d366;
          padding: 15px 25px;
          color: white;
          border-radius: 30px;
          text-decoration: none;
          display: inline-block;
          margin-top: 10px;
        }

        .floating {
          position: fixed;
          bottom: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 9999;
        }

        .floating a {
          background: #111;
          color: white;
          padding: 12px 16px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: bold;
          font-size: 14px;
        }

        .floating a:first-child { background: #ff3b30; }
        .floating a:last-child { background: #25d366; }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 26px;
          }

          .cta a {
            display: block;
            width: 90%;
            margin: 8px auto;
          }
        }
      `}</style>
    </div>
  );
}