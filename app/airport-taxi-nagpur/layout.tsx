import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nagpur Airport Taxi | 24x7 Airport Cab Service | RC Tours & Travels",

  description:
    "Book 24x7 Nagpur Airport Taxi with RC Tours & Travels. Reliable airport pickup and drop, local and outstation cabs at affordable fares.",

  keywords: [
    "Nagpur Airport Taxi",
    "Nagpur Airport Cab",
    "Airport Pickup Nagpur",
    "Airport Drop Nagpur",
    "24x7 Airport Taxi",
    "Cab from Nagpur Airport",
    "Taxi to Nagpur Airport",
    "Airport Transfer Nagpur",
    "RC Tours & Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/airport-taxi-nagpur",
  },

  openGraph: {
    title: "Nagpur Airport Taxi | RC Tours & Travels",
    description:
      "24x7 airport taxi service in Nagpur with reliable pickup and drop.",
    url: "https://www.rctoursandtravels.in/airport-taxi-nagpur",
    siteName: "RC Tours & Travels",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nagpur Airport Taxi | RC Tours & Travels",
    description:
      "Book reliable airport taxi service in Nagpur for pickup and drop.",
  },

  robots: {
  index: false,
  follow: false,
  },
};

export default function AirportTaxiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}