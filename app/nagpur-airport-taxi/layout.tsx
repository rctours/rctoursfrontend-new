import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nagpur Airport Taxi Service | Airport Pickup & Drop | RC Tours & Travels",

  description:
    "Book Nagpur Airport taxi service with RC Tours & Travels. 24x7 airport pickup and drop, clean cars, professional drivers and affordable fares.",

  keywords: [
    "Nagpur Airport Taxi",
    "Nagpur Airport Cab",
    "Nagpur Airport Pickup",
    "Nagpur Airport Drop",
    "Airport Taxi Nagpur",
    "Nagpur Airport Transfer",
    "Dr Babasaheb Ambedkar Airport Taxi",
    "Nagpur Taxi Service",
    "Cab Service in Nagpur",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/nagpur-airport-taxi",
  },

  openGraph: {
    title: "Nagpur Airport Taxi Service | RC Tours & Travels",

    description:
      "24x7 Nagpur Airport pickup and drop taxi service at affordable prices.",

    url: "https://www.rctoursandtravels.in/nagpur-airport-taxi",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "Nagpur Airport Taxi Service | RC Tours & Travels",

    description:
      "Reliable airport pickup and drop taxi service in Nagpur.",
  },

  robots: {
  index: false,
  follow: false,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}