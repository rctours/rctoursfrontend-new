export const metadata = {
  title:
    "Taxi & Cab Fleet in Nagpur | Sedan, SUV & Tempo Traveller | RC Tours & Travels",

  description:
    "Explore RC Tours & Travels fleet in Nagpur. Choose from sedan cars, SUVs, Innova, Ertiga, Rumion, Tempo Travellers and comfortable vehicles for local, airport and outstation travel.",

  keywords: [
    "Taxi Fleet Nagpur",
    "Cab Fleet Nagpur",
    "Cars for Rent in Nagpur",
    "Sedan Taxi Nagpur",
    "SUV Taxi Nagpur",
    "Innova Crysta Nagpur",
    "Ertiga Cab Nagpur",
    "Rumion Cab Nagpur",
    "Tempo Traveller Nagpur",
    "Luxury Cab Nagpur",
    "Outstation Cab Nagpur",
    "RC Tours & Travels Fleet",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/fleet",
  },

  openGraph: {
    title:
      "Taxi & Cab Fleet in Nagpur | RC Tours & Travels",

    description:
      "Explore our sedan, SUV, Innova and Tempo Traveller fleet for taxi booking in Nagpur.",

    url: "https://www.rctoursandtravels.in/fleet",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Taxi & Cab Fleet in Nagpur | RC Tours & Travels",

    description:
      "Choose from sedans, SUVs and Tempo Travellers for travel from Nagpur.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FleetLayout({ children }) {
  return <>{children}</>;
}