import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Local Taxi Service in Nagpur | Car Rental & Cab Booking | RC Tours & Travels",

  description:
    "Book local taxi service in Nagpur with RC Tours & Travels. Affordable car rental, hourly packages, airport transfer and outstation cab service available 24x7.",

  keywords: [
    "Local Taxi in Nagpur",
    "Nagpur Local Taxi Service",
    "Cab Service in Nagpur",
    "Car Rental Nagpur",
    "Nagpur Car Rental",
    "Taxi Booking Nagpur",
    "Hourly Cab in Nagpur",
    "Local Cab Service",
    "Nagpur Taxi",
    "RC Tours and Travels",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/nagpur-local-taxi",
  },

  openGraph: {
    title:
      "Local Taxi Service in Nagpur | RC Tours & Travels",

    description:
      "Book local taxi and car rental service in Nagpur with experienced drivers and affordable pricing.",

    url: "https://www.rctoursandtravels.in/nagpur-local-taxi",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Local Taxi Service in Nagpur | RC Tours & Travels",

    description:
      "24x7 local taxi and car rental service in Nagpur.",
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