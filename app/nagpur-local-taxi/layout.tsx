import type { Metadata } from "next";

const SITE_URL = "https://www.rctoursandtravels.in";

export const metadata: Metadata = {
  title:
    "Local Taxi Service in Nagpur | Hourly Cab & Car Rental",

  description:
    "Book a local taxi service in Nagpur with RC Tours & Travels. Choose 4 Hr / 40 KM, 8 Hr / 80 KM or 12 Hr / 120 KM local cab packages for city travel, shopping, meetings, family trips and multiple stops.",

  keywords: [
    "local taxi service in nagpur",
    "local taxi in nagpur",
    "nagpur local taxi",
    "local cab service in nagpur",
    "hourly taxi nagpur",
    "hourly cab in nagpur",
    "local car rental nagpur",
    "car rental in nagpur",
    "cab booking nagpur",
    "taxi booking nagpur",
    "nagpur taxi service",
  ],

  authors: [
    {
      name: "RC Tours & Travels",
    },
  ],

  creator: "RC Tours & Travels",
  publisher: "RC Tours & Travels",

  alternates: {
    canonical: `${SITE_URL}/nagpur-local-taxi`,
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

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${SITE_URL}/nagpur-local-taxi`,
    siteName: "RC Tours & Travels",

    title:
      "Local Taxi Service in Nagpur | Hourly Cab & Car Rental",

    description:
      "Book local taxi and hourly cab service in Nagpur with flexible local rental packages for city travel, shopping, meetings, family trips and multiple stops.",

    images: [
      {
        url: `${SITE_URL}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: "Local Taxi Service in Nagpur - RC Tours & Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Local Taxi Service in Nagpur | RC Tours & Travels",

    description:
      "Book local taxi and hourly cab service in Nagpur with RC Tours & Travels.",

    images: [`${SITE_URL}/og-image.webp`],
  },

  category: "Travel",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}