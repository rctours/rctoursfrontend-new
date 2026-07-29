"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { generateInvoicePDF } from "@/lib/invoice";

export default function InvoicePage() {
  const { bookingId } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const downloadInvoice = async () => {
      try {
        const res = await fetch(`/api/invoice/${bookingId}`);

        const data = await res.json();

        console.log("Invoice API Response :", data);

        if (data.success) {
          console.log("Invoice Booking :", data.booking);

          await generateInvoicePDF(data.booking);

          alert("Invoice downloaded successfully.");
        } else {
          alert("Invoice not found");
        }
      } catch (error) {
        console.log("Invoice Error :", error);
        alert("Something went wrong");
      }

      setLoading(false);
    };

    if (bookingId) {
      downloadInvoice();
    }
  }, [bookingId]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          Invoice Download Ho Raha Hai...
        </h1>

        {!loading && (
          <p className="mt-4 text-gray-500">
            Download complete. Aap is page ko close kar sakte hain.
          </p>
        )}
      </div>
    </div>
  );
}