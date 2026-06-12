import "./globals.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";


export const metadata: Metadata = {
  metadataBase: new URL("https://www.rctoursandtravels.in"),

  title: "Taxi Service in Nagpur | RC Tours & Travels",

  description:
    "Book taxi service in Nagpur for airport transfer, local rental, outstation cabs, tour packages and corporate travel. Affordable fares and professional drivers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}