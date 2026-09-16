import type { Metadata } from "next";

const PAGE_URL =
  "https://www.rctoursandtravels.in/car-rental-in-nagpur";

const SITE_NAME = "RC Tours & Travels";

const TITLE =
  "Car Rental in Nagpur with Driver | Local & Outstation Cab";

const DESCRIPTION =
  "Book car rental in Nagpur with driver for local travel, airport transfers, hourly rentals and outstation trips. Choose Sedan, SUV, Innova Crysta, Tempo Traveller or Urbania.";

export const metadata: Metadata = {
  title: TITLE,

  description: DESCRIPTION,

  keywords: [
    "car rental in Nagpur",
    "car rental Nagpur",
    "car rent in Nagpur",
    "car on rent in Nagpur",
    "rent a car in Nagpur",
    "car rental service in Nagpur",
    "car hire in Nagpur",
    "car rental with driver in Nagpur",
    "chauffeur driven car rental Nagpur",
    "local car rental Nagpur",
    "hourly car rental Nagpur",
    "airport car rental Nagpur",
    "outstation car rental Nagpur",
    "Nagpur local car rental",
    "Nagpur cab rental",
  ],

  alternates: {
    canonical: PAGE_URL,
  },

  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",

    title:
      "Car Rental in Nagpur with Driver | RC Tours & Travels",

    description:
      "Reliable chauffeur-driven car rental in Nagpur for local travel, airport transfers, hourly rentals and outstation trips. Choose from Sedan, SUV, Innova Crysta, Tempo Traveller and Urbania.",

  },

  twitter: {
    card: "summary_large_image",

    title:
      "Car Rental in Nagpur with Driver | RC Tours & Travels",

    description:
      "Book a chauffeur-driven car rental in Nagpur for local, airport, hourly and outstation travel. Multiple vehicle options available.",
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

export default function CarRentalInNagpurLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}