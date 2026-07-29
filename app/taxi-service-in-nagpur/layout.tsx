import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Taxi Service in Nagpur | Local & Outstation Cab Booking | RC Tours & Travels",

  description:
    "Book the best taxi service in Nagpur with RC Tours & Travels. Local taxi, outstation cab, airport transfer, one-way and round-trip services at affordable prices.",

  keywords: [
    "Taxi Service in Nagpur",
    "Cab Service in Nagpur",
    "Best Taxi Service Nagpur",
    "Nagpur Cab Booking",
    "Local Taxi Nagpur",
    "Outstation Cab Nagpur",
    "Airport Taxi Nagpur",
    "One Way Cab Nagpur",
    "Round Trip Taxi Nagpur",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/taxi-service-in-nagpur",
  },

  openGraph: {
    title: "Taxi Service in Nagpur | RC Tours & Travels",
    description:
      "Affordable local, airport and outstation taxi service in Nagpur with professional drivers.",
    url: "https://www.rctoursandtravels.in/taxi-service-in-nagpur",
    siteName: "RC Tours & Travels",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Taxi Service in Nagpur | RC Tours & Travels",
    description:
      "Book trusted taxi service in Nagpur for local, airport and outstation trips.",
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