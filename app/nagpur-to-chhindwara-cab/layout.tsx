import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nagpur to Chhindwara Cab | RC Tours & Travels",

  robots: {
    index: false,
    follow: false,
  },
};

export default function NagpurToChhindwaraCabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}