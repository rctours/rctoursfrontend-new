export const metadata = {
  title:
    "Taxi Services in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",

  description:
    "Explore taxi services in Nagpur with RC Tours & Travels including airport transfers, local cab rental, outstation taxis, one-way cabs, round trips and tempo traveller services.",

  keywords: [
    "Taxi Services Nagpur",
    "Taxi Service in Nagpur",
    "Nagpur Cab Service",
    "Airport Taxi Nagpur",
    "Local Cab Service Nagpur",
    "Outstation Taxi Nagpur",
    "One Way Cab Nagpur",
    "Round Trip Taxi Nagpur",
    "Tempo Traveller Nagpur",
    "Car Rental Nagpur",
    "RC Tours & Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/services",
  },

  openGraph: {
    title:
      "Taxi Services in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",

    description:
      "Explore airport taxi, local cab, outstation taxi, one-way, round-trip and tempo traveller services from Nagpur.",

    url: "https://www.rctoursandtravels.in/services",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Taxi Services in Nagpur | RC Tours & Travels",

    description:
      "Airport, local and outstation taxi services in Nagpur.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}