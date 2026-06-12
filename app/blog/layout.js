export const metadata = {
  title: "Travel Blog | RC Tours & Travels Nagpur",
  description:
    "Taxi service, airport transfer, outstation cab fare, tour packages and travel guides from RC Tours & Travels Nagpur.",

  alternates: {
    canonical: "https://www.rctoursandtravels.in/blog",
  },

  openGraph: {
    title: "Travel Blog | RC Tours & Travels Nagpur",
    description:
      "Taxi service, airport transfer, outstation cab fare, tour packages and travel guides from RC Tours & Travels Nagpur.",
    url: "https://www.rctoursandtravels.in/blog",
    siteName: "RC Tours & Travels",
    type: "website",
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}