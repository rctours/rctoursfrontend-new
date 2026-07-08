import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Cab Online | RC Tours & Travels Nagpur",
  description:
    "Book your taxi online with RC Tours & Travels. Reserve airport taxi, local cab, outstation taxi, one-way cab and round-trip taxi in Nagpur at affordable prices.",
  keywords: [
    "Book Cab Nagpur",
    "Online Taxi Booking Nagpur",
    "Airport Taxi Booking",
    "Local Cab Booking",
    "Outstation Cab Booking",
    "One Way Cab Nagpur",
    "Round Trip Taxi",
    "RC Tours & Travels",
  ],
};

export default function BookCabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}