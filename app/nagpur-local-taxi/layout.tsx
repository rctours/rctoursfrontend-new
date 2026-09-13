import type { Metadata } from "next";

const SITE_URL = "https://www.rctoursandtravels.in";

export const metadata: Metadata = {
  title: "Local Taxi Service in Nagpur | Cab Booking & Hourly Rental",

  description:
    "Book a reliable local taxi in Nagpur with RC Tours & Travels. Get local cab booking, hourly taxi rental, airport transfers and comfortable cars for city travel, meetings, shopping and family trips.",

  metadataBase: new URL(SITE_URL),

  authors: [
    {
      name: "RC Tours & Travels",
    },
  ],

  creator: "RC Tours & Travels",
  publisher: "RC Tours & Travels",

  alternates: {
    canonical: "/nagpur-local-taxi",
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
      "Local Taxi Service in Nagpur | Cab Booking & Hourly Rental",

    description:
      "Book a reliable local taxi in Nagpur with RC Tours & Travels. Local cab booking, hourly taxi rental, airport transfers and comfortable cars for city travel.",

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
      "Book a reliable local taxi in Nagpur with RC Tours & Travels for local cab booking, hourly rental and airport transfers.",

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