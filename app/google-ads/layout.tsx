import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Taxi in Nagpur | RC Tours & Travels",
  description:
    "Book taxi, airport cab, outstation taxi and car rental in Nagpur. Get quick quotes and reliable cab service from RC Tours & Travels.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-image-preview": "none",
      "max-snippet": 0,
      "max-video-preview": 0,
    },
  },
};

export default function GoogleAdsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}