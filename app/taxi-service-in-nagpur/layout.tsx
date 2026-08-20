import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Taxi Service in Nagpur | Nagpur Taxi Booking | RC Tours & Travels",

  description:
    "Book a reliable taxi service in Nagpur with RC Tours & Travels. Local taxi, airport transfer, outstation cab, one-way and round-trip taxi booking with 24/7 support.",

  keywords: [
    "Taxi Service in Nagpur",
    "Nagpur Taxi Service",
    "Cab Service in Nagpur",
    "Nagpur Cab Booking",
    "Local Taxi Nagpur",
    "Outstation Cab Nagpur",
    "Airport Taxi Nagpur",
    "One Way Cab Nagpur",
    "Round Trip Taxi Nagpur",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical:
      "https://www.rctoursandtravels.in/taxi-service-in-nagpur",
  },

  openGraph: {
    title:
      "Taxi Service in Nagpur | Nagpur Taxi Booking | RC Tours & Travels",

    description:
      "Book local, airport and outstation taxi services in Nagpur with RC Tours & Travels. 24/7 booking support via call and WhatsApp.",

    url:
      "https://www.rctoursandtravels.in/taxi-service-in-nagpur",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Taxi Service in Nagpur | RC Tours & Travels",

    description:
      "Book a taxi in Nagpur for local, airport and outstation travel with RC Tours & Travels.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function TaxiServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}