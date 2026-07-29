import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import { headers } from "next/headers";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.rctoursandtravels.in"),

  title: {
    default:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",
    template: "%s | RC Tours & Travels",
  },

  description:
    "RC Tours & Travels offers taxi service in Nagpur including airport taxi, local cab rental, one way taxi, round trip cab, outstation taxi, tempo traveller rental, corporate travel and tour packages across Maharashtra, Madhya Pradesh, Chhattisgarh and all over India. Call +91 9172271464.",

  keywords: [
    "Taxi Service Nagpur",
    "Cab Service Nagpur",
    "Nagpur Airport Taxi",
    "Nagpur Airport Cab",
    "Airport Transfer Nagpur",
    "Outstation Taxi Nagpur",
    "One Way Cab Nagpur",
    "Round Trip Cab Nagpur",
    "Local Cab Nagpur",
    "Local Rental Nagpur",
    "Tempo Traveller Nagpur",
    "Urbania Rental Nagpur",
    "Innova Crysta Nagpur",
    "Nagpur to Pune Cab",
    "Nagpur to Mumbai Cab",
    "Nagpur to Hyderabad Cab",
    "Nagpur to Shirdi Cab",
    "Nagpur to Nashik Cab",
    "Nagpur to Tadoba Taxi",
    "Nagpur to Pench Taxi",
    "Nagpur Tour Package",
    "Taxi Booking Nagpur",
    "Best Taxi Service Nagpur",
    "RC Tours & Travels",
  ],

  applicationName: "RC Tours & Travels",

  authors: [
    {
      name: "RC Tours & Travels",
      url: "https://www.rctoursandtravels.in",
    },
  ],

  creator: "RC Tours & Travels",
  publisher: "RC Tours & Travels",

  alternates: {
    canonical: "/",
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
    url: "https://www.rctoursandtravels.in",
    siteName: "RC Tours & Travels",
    title:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",
    description:
      "Book reliable airport, local and outstation taxi services in Nagpur. 24x7 cab booking, one-way cabs, round trips, tempo travellers and tour packages.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RC Tours & Travels",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",
    description:
      "Reliable taxi service in Nagpur for airport transfers, local rides, outstation trips and tour packages.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/manifest.webmanifest",

  category: "Travel",

  verification: {
    google: "AIzaSyDbqBsTNGjSft7hvkjagft-kqWNtBHxMpA",
  },
};

// ✅ Local Business Schema
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  name: "RC Tours & Travels",
  url: "https://www.rctoursandtravels.in",
  telephone: "+919172271464",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440034",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 00:00-23:59",

areaServed: [
  {
    "@type": "City",
    name: "Nagpur",
  },
  {
    "@type": "State",
    name: "Maharashtra",
  },
  {
    "@type": "State",
    name: "Madhya Pradesh",
  },
  {
    "@type": "State",
    name: "Chhattisgarh",
  },
  {
    "@type": "Country",
    name: "India",
  },
],

paymentAccepted: [
  "Cash",
  "UPI",
  "Credit Card",
  "Debit Card",
  "Net Banking",
],

currenciesAccepted: "INR",

serviceType: [
  "Airport Taxi Service",
  "Local Taxi Service",
  "Outstation Taxi Service",
  "One Way Taxi",
  "Round Trip Taxi",
  "Corporate Cab Service",
  "Tempo Traveller Rental",
  "Tour Packages",
],

hasOfferCatalog: {
  "@type": "OfferCatalog",
  name: "Taxi Services",
  itemListElement: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Airport Taxi",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Local Cab Rental",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Outstation Cab",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "One Way Taxi",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Round Trip Taxi",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Tempo Traveller Rental",
      },
    },
  ],
},
};

// ✅ FAQ Schema (SEO optimized)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Which is the best taxi service in Nagpur for airport and outstation travel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RC Tours & Travels is one of the best taxi services in Nagpur offering airport, local and outstation cab services at affordable prices.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide 24x7 airport taxi service in Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide 24x7 airport taxi service in Nagpur with doorstep pickup and drop.",
      },
    },
    {
      "@type": "Question",
      name: "Can I book one-way cab from Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we provide one-way cab service from Nagpur to all major cities in India.",
      },
    },
    {
      "@type": "Question",
      name: "Do you offer outstation taxi service from Nagpur?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we offer outstation taxi service from Nagpur to Pune, Mumbai, Hyderabad, Shirdi, Nashik and more.",
      },
    },
  ],
};

// ✅ Organization Schema
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "RC Tours & Travels",
  url: "https://www.rctoursandtravels.in",
  logo: "https://www.rctoursandtravels.in/logo.png",
  image: "https://www.rctoursandtravels.in/logo.png",
  telephone: "+919172271464",
  email: "info@rctoursandtravels.in",
  address: {
    "@type": "PostalAddress",
    streetAddress: "New Narsala Rd, Beldar Nagar, Dighori",
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440034",
    addressCountry: "IN",
  },
};

// ✅ Website Schema
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "RC Tours & Travels",
  url: "https://www.rctoursandtravels.in",
  publisher: {
    "@type": "Organization",
    name: "RC Tours & Travels",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();

  const pathname =
    headersList.get("x-pathname") ||
    headersList.get("next-url") ||
    "";

  const isAdminPage = pathname.startsWith("/admin");
  return (
    <html lang="en">
      <body>

        {/* ✅ SEO SCHEMA START */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />

        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationSchema),
  }}
/>

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(websiteSchema),
  }}
/>

        {/* ✅ SEO SCHEMA END */}

    {!isAdminPage && <Navbar />}

    <main>{children}</main>

      </body>
    </html>
  );
}