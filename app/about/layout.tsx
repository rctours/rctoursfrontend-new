import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RC Tours & Travels | Taxi Service in Nagpur",
  description:
    "Learn about RC Tours & Travels, a trusted taxi service in Nagpur providing airport transfers, local cab service, outstation taxi booking, tempo travellers and tour packages across India.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About RC Tours & Travels | RC Tours & Travels",
    description:
      "Trusted taxi service in Nagpur for airport transfers, local cab service and outstation travel.",
    url: "https://www.rctoursandtravels.in/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}