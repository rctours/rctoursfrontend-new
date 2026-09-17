import type { Metadata } from "next";

const PAGE_URL =
  "https://www.rctoursandtravels.in/nagpur-airport-taxi";

export const metadata: Metadata = {
  title:
    "Nagpur Airport Taxi | Airport Cab Service in Nagpur | RC Tours & Travels",

  description:
    "Book a reliable Nagpur Airport Taxi for airport pickup and drop, airport transfers, local travel and outstation trips. RC Tours & Travels offers comfortable cars, professional drivers and easy online booking in Nagpur.",

  keywords: [
    "Nagpur Airport Taxi",
    "Airport Taxi Nagpur",
    "Nagpur Airport Cab",
    "Nagpur Airport Taxi Service",
    "Airport Cab Service in Nagpur",
    "Airport Pickup Nagpur",
    "Airport Drop Nagpur",
    "Nagpur Airport Transfer",
    "Taxi to Nagpur Airport",
    "Taxi from Nagpur Airport",
    "Cab from Nagpur Airport",
    "Taxi Near Nagpur Airport",
    "Nagpur Cab Service",
    "Nagpur Local Taxi",
    "RC Tours & Travels",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    title:
      "Nagpur Airport Taxi | Airport Cab Service in Nagpur",

    description:
      "Reliable Nagpur Airport Taxi for pickup, drop, airport transfers, local travel and outstation trips. Book RC Tours & Travels online.",

    url: PAGE_URL,

    siteName: "RC Tours & Travels",

    type: "website",

    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nagpur Airport Taxi | Airport Cab Service in Nagpur",

    description:
      "Book a reliable Nagpur Airport Taxi for pickup, drop and airport transfers with RC Tours & Travels.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function AirportTaxiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}