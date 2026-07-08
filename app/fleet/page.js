import FleetClient from "./FleetClient";

export const metadata = {
  title: "Cab Fleet in Nagpur | Sedan, SUV, Innova & Tempo Traveller | RC Tours & Travels",

  description:
    "Explore RC Tours & Travels fleet including Swift Dzire, Hyundai Aura, Toyota Glanza, Ertiga, Innova Crysta, Toyota Hycross, Tempo Traveller and Force Urbania. Available for airport, local and outstation taxi service in Nagpur.",

  keywords: [
    "Cab Fleet Nagpur",
    "Taxi Fleet Nagpur",
    "Sedan Taxi Nagpur",
    "SUV Taxi Nagpur",
    "Innova Crysta Nagpur",
    "Tempo Traveller Nagpur",
    "Force Urbania Nagpur",
    "Cab Rental Nagpur",
    "Taxi Service Nagpur",
    "RC Tours & Travels",
  ],

  alternates: {
    canonical: "/fleet",
  },

  openGraph: {
    title:
      "Cab Fleet in Nagpur | RC Tours & Travels",
    description:
      "Choose from Sedan, SUV, Premium Cars and Tempo Travellers for airport, local and outstation travel.",
    url: "https://www.rctoursandtravels.in/fleet",
    type: "website",
  },
};

export default function FleetPage() {
  return <FleetClient />;
}