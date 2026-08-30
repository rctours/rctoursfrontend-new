import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Taxi Booking | RC Tours & Travels Nagpur",

  description:
    "Book your taxi with RC Tours & Travels for airport, local, outstation and one-way travel in Nagpur.",

  keywords: [
    "Taxi Booking Nagpur",
    "Taxi Service Nagpur",
    "Airport Taxi Nagpur",
    "Local Cab Nagpur",
    "Outstation Cab Nagpur",
    "One Way Cab Nagpur",
    "RC Tours & Travels",
  ],

  robots: {
    index: false,
    follow: false,
  },
};

export default function BookCabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}