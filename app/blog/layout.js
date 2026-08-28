export const metadata = {
  title:
    "Nagpur Travel & Taxi Blog | Cab Booking, Routes & Travel Guides | RC Tours & Travels",

  description:
    "Read useful travel guides, taxi booking tips, Nagpur cab routes, airport transfer information, outstation travel guides and tour ideas from RC Tours & Travels.",

  keywords: [
    "Nagpur Travel Blog",
    "Taxi Blog Nagpur",
    "Cab Booking Guide",
    "Nagpur Taxi Guide",
    "Airport Taxi Guide Nagpur",
    "Outstation Cab Guide",
    "Nagpur Travel Guide",
    "Taxi Routes from Nagpur",
    "Travel Tips Nagpur",
    "Tour Guide Nagpur",
    "RC Tours & Travels Blog",
  ],

  alternates: {
    canonical: "https://www.rctoursandtravels.in/blog",
  },

  openGraph: {
    title:
      "Nagpur Travel & Taxi Blog | RC Tours & Travels",

    description:
      "Travel guides, taxi booking tips, Nagpur cab routes and useful information for airport and outstation travel.",

    url: "https://www.rctoursandtravels.in/blog",

    siteName: "RC Tours & Travels",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Nagpur Travel & Taxi Blog | RC Tours & Travels",

    description:
      "Read taxi guides, travel tips and route information from Nagpur.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({ children }) {
  return <>{children}</>;
}