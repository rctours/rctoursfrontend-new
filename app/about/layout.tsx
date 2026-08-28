import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RC Tours & Travels | Trusted Taxi Service in Nagpur",

  description:
    "Learn about RC Tours & Travels, a trusted taxi service in Nagpur offering airport transfers, local cab service, outstation taxis, tempo travellers and tour packages.",

  alternates: {
    canonical: "https://www.rctoursandtravels.in/about",
  },

  openGraph: {
    title: "About RC Tours & Travels | Trusted Taxi Service in Nagpur",
    description:
      "Learn about RC Tours & Travels and our taxi, airport transfer, local cab and outstation travel services from Nagpur.",
    url: "https://www.rctoursandtravels.in/about",
    siteName: "RC Tours & Travels",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About RC Tours & Travels",
    description:
      "Trusted taxi service in Nagpur for airport, local and outstation travel.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}