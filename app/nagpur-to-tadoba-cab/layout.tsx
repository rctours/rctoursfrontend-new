import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Nagpur to Tadoba Cab Booking | Taxi Service Starting ₹2999 | RC Tours & Travels",

  description:
    "Book Nagpur to Tadoba cab service with RC Tours & Travels. Affordable taxi fare, clean cars, experienced drivers and 24x7 booking support.",

  keywords: [
    "Nagpur to Tadoba Cab",
    "Nagpur to Tadoba Taxi",
    "Nagpur to Tadoba Cab Booking",
    "Tadoba Taxi Service",
    "Nagpur to Tadoba Safari Cab",
    "Taxi from Nagpur to Tadoba",
    "Nagpur to Tadoba Taxi Fare",
    "Tadoba Tour Taxi",
    "Tadoba Cab Service",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical:
      "https://www.rctoursandtravels.in/nagpur-to-tadoba-cab",
  },

  openGraph: {
    title:
      "Nagpur to Tadoba Cab Booking | RC Tours & Travels",

    description:
      "Book affordable and reliable cab service from Nagpur to Tadoba.",

    url: "https://www.rctoursandtravels.in/nagpur-to-tadoba-cab",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nagpur to Tadoba Cab Booking | RC Tours & Travels",

    description:
      "24x7 Nagpur to Tadoba taxi service with experienced drivers.",
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