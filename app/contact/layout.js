export const metadata = {
  title:
    "Contact RC Tours & Travels | Taxi Booking & Cab Service in Nagpur",

  description:
    "Contact RC Tours & Travels for taxi booking in Nagpur. Book airport taxi, local cab, outstation taxi, one-way cab, round-trip travel and tempo traveller services.",

  keywords: [
    "Contact RC Tours & Travels",
    "Taxi Booking Nagpur",
    "Cab Booking Nagpur",
    "Taxi Service Contact Nagpur",
    "Nagpur Cab Service",
    "Airport Taxi Booking Nagpur",
    "Local Cab Booking Nagpur",
    "Outstation Taxi Booking Nagpur",
    "Tempo Traveller Booking Nagpur",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/contact",
  },

  openGraph: {
    title:
      "Contact RC Tours & Travels | Taxi Booking & Cab Service in Nagpur",

    description:
      "Contact RC Tours & Travels for airport, local and outstation taxi bookings from Nagpur.",

    url: "https://www.rctoursandtravels.in/contact",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Contact RC Tours & Travels | Taxi Booking Nagpur",

    description:
      "Contact us for airport, local and outstation taxi bookings in Nagpur.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactLayout({ children }) {
  return <>{children}</>;
}