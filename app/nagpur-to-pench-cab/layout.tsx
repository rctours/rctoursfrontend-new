import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nagpur to Pench Cab Booking | Taxi Service Starting ₹2499 | RC Tours & Travels",

  description:
    "Book Nagpur to Pench cab service with RC Tours & Travels. Affordable taxi fare, clean cars, experienced drivers and 24x7 booking support.",

  keywords: [
    "Nagpur to Pench Cab",
    "Nagpur to Pench Taxi",
    "Nagpur to Pench Cab Booking",
    "Pench Taxi Service",
    "Nagpur to Pench Safari Cab",
    "Taxi from Nagpur to Pench",
    "Nagpur to Pench Taxi Fare",
    "Pench Tour Taxi",
    "Pench Cab Service",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical:
      "https://www.rctoursandtravels.in/nagpur-to-pench-cab",
  },

  openGraph: {
    title:
      "Nagpur to Pench Cab Booking | RC Tours & Travels",

    description:
      "Book affordable and reliable cab service from Nagpur to Pench.",

    url: "https://www.rctoursandtravels.in/nagpur-to-pench-cab",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nagpur to Pench Cab Booking | RC Tours & Travels",

    description:
      "24x7 Nagpur to Pench taxi service with experienced drivers.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}