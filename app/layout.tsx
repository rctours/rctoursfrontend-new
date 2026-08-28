import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import GoogleAnalytics from "./components/GoogleAnalytics";

const siteUrl = "https://www.rctoursandtravels.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",
    template: "%s | RC Tours & Travels",
  },

  description:
    "RC Tours & Travels offers reliable taxi service in Nagpur including airport taxi, local cab rental, one way taxi, round trip cab, outstation taxi, tempo traveller rental, corporate travel and tour packages across India. Call +91 9172271464.",

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
    "RC Tours & Travels",
  ],

  applicationName: "RC Tours & Travels",

  authors: [
    {
      name: "RC Tours & Travels",
      url: siteUrl,
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
    url: siteUrl,
    siteName: "RC Tours & Travels",

    title:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",

    description:
      "Book reliable airport, local and outstation taxi services in Nagpur. 24x7 cab booking, one-way cabs, round trips, tempo travellers and tour packages.",

    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "RC Tours & Travels Taxi Service in Nagpur",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Taxi Service in Nagpur | Airport, Local & Outstation Cabs | RC Tours & Travels",

    description:
      "Reliable taxi service in Nagpur for airport transfers, local rides, outstation trips and tour packages.",

    images: ["/og-image.webp"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.webp",
  },

  manifest: "/manifest.webmanifest",

  category: "Travel",

  verification: {
    google: "AIzaSyDbqBsTNGjSft7hvkjagft-kqWNtBHxMpA",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,

  name: "RC Tours & Travels",
  url: siteUrl,

  logo: `${siteUrl}/logo.webp`,
  image: `${siteUrl}/logo.webp`,

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

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "@id": `${siteUrl}/#taxi-service`,

  name: "RC Tours & Travels",
  url: siteUrl,

  image: `${siteUrl}/logo.webp`,
  logo: `${siteUrl}/logo.webp`,

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

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],

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
    name: "Taxi and Travel Services",

    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Airport Taxi Service",
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
          name: "Outstation Cab Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "One Way Cab Service",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Round Trip Cab Service",
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

  parentOrganization: {
    "@id": `${siteUrl}/#organization`,
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,

  name: "RC Tours & Travels",
  url: siteUrl,

  publisher: {
    "@id": `${siteUrl}/#organization`,
  },

  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body>
        <GoogleAnalytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}