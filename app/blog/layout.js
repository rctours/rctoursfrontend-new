export const metadata = {
  title: "Travel Blog | RC Tours & Travels Nagpur",

  description:
    "Taxi service, airport transfer, outstation cab fare, tour packages and travel guides from RC Tours & Travels Nagpur.",

  keywords: [
    "Travel Blog Nagpur",
    "Taxi Service Nagpur",
    "Cab Service Nagpur",
    "Airport Taxi Nagpur",
    "Airport Transfer",
    "Outstation Taxi",
    "One Way Cab",
    "Round Trip Cab",
    "Cab Booking Guide",
    "Travel Tips",
    "Tour Packages Nagpur",
    "RC Tours & Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/blog",
  },

  openGraph: {
    title: "Travel Blog | RC Tours & Travels Nagpur",
    description:
      "Taxi service, airport transfer, outstation cab fare, tour packages and travel guides from RC Tours & Travels Nagpur.",
    url: "https://www.rctoursandtravels.in/blog",
    siteName: "RC Tours & Travels",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Travel Blog | RC Tours & Travels Nagpur",
    description:
      "Taxi service, airport transfer, outstation cab fare, tour packages and travel guides from RC Tours & Travels Nagpur.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}