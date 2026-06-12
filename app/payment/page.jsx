"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  
  const searchParams = useSearchParams();

  const amount = Number(searchParams.get("amount")) || 1500;

  const [bookingData, setBookingData] = useState(null);

  const [loading, setLoading] = useState(false);

    useEffect(() => {
    const data = localStorage.getItem("bookingData");

    if (data) {
    setBookingData(JSON.parse(data));
    }
    }, []);

    const handlePayment = async () => {
      setLoading(true);
    console.log("PAY BUTTON CLICKED");
  try {
    const res = await fetch("/api/razorpay/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: bookingData?.payableAmount || amount,
      }),
    });

    const order = await res.json();
    console.log("ORDER RESPONSE:", order);

    console.log("ORDER FULL:", order);
    console.log("ORDER ID:", order.id);
    console.log("ORDER AMOUNT:", order.amount);
    console.log("ORDER STATUS:", order.status);

    console.log(
  "RAZORPAY KEY:",
  process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
);

if (!window.Razorpay) {

  setLoading(false);

  alert("Razorpay SDK Not Loaded");

  return;
}

const options = {
  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

  amount: order.amount,
  currency: order.currency,

  name: "RC Tours & Travels",
  description: "Cab Booking Payment",

  order_id: order.id,

  handler: async function (response) {

  console.log("PAYMENT SUCCESS", response);

  await fetch("/api/save-payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
  bookingId: bookingData.bookingId,
  paymentId: response.razorpay_payment_id,
  orderId: response.razorpay_order_id,
  amount: bookingData.payableAmount,

  paymentStatus:
    bookingData.paymentType === "partial"
      ? "Advance Paid"
      : "Paid",
}),
  });
  
  setLoading(false);

  window.location.href =
    `/booking-success?bookingId=${bookingData.bookingId}`;
},

  prefill: {
    name: bookingData?.name || "",
    email: bookingData?.email || "",
    contact: bookingData?.mobile || "",
  },

  modal: {
  ondismiss: function () {

    setLoading(false);

    console.log("PAYMENT WINDOW CLOSED");
  },
},
};

console.log("Razorpay Object:", window.Razorpay);

const razorpay = new window.Razorpay(options);

razorpay.on("payment.failed", function (response) {

  setLoading(false);

  console.log(response);

  alert(response.error.description);

});

razorpay.open();



} catch (error) {

  setLoading(false);

  console.log(error);

  alert("Payment Failed");
}
};
  

  return (
  <>
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    <main className="min-h-screen bg-slate-100 pt-24 pb-12 px-4">

      <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-24 border">

        <div className="mb-10">

        <h1 className="text-5xl font-bold">
        Complete Your Booking
        </h1>

        <p className="text-lg text-gray-600 mt-2">
        Review your booking details and complete payment securely.
        </p>

</div>

        <p className="text-gray-500 mb-8">
          Secure payment powered by RC Tours & Travels
        </p>

        <div className="grid xl:grid-cols-[1fr_430px] gap-8">

          {/* LEFT */}
          <div className="space-y-6">

            {/* Booking Summary */}
            <div className="bg-white rounded-3xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-5">
                Booking Summary
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">

            <p className="text-sm text-blue-700 font-semibold">
            Booking ID
            </p>

            <p className="text-2xl font-bold">
            {bookingData?.bookingId}
            </p>

            </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <p className="text-gray-500 text-sm">Pickup</p>
                  <p className="font-semibold">
                {bookingData?.pickup || "Not Available"}
                </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Drop</p>
                  <p className="font-semibold">
                {bookingData?.drop || "Not Available"}
                </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Date</p>
                  <p className="font-semibold">
                  {bookingData?.journeyDate}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Time</p>
                  <p className="font-semibold">
                  {bookingData?.journeyTime}
                  </p>
                </div>

              </div>
            </div>

            

            {/* Customer */}
            <div className="bg-white rounded-3xl shadow-lg p-6">

              <h2 className="text-2xl font-bold mb-5">
                Passenger Details
              </h2>

              <div className="grid md:grid-cols-2 gap-4">

                <div>
                  <p className="text-gray-500 text-sm">
                    Passenger Name
                  </p>

                  <p className="font-semibold">
                {bookingData?.name || "-"}
                </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Mobile Number
                  </p>

                  <p className="font-semibold">
                {bookingData?.mobile || "-"}
                </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Email
                  </p>

                  <p className="font-semibold">
                {bookingData?.email || "-"}
                </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Gender
                  </p>

                  <p className="font-semibold">
                {bookingData?.gender || "-"}
                </p>
                </div>

              </div>

            </div>

            {/* Security */}
            <div className="bg-green-50 border border-green-200 rounded-3xl p-6">

              <h3 className="text-green-700 text-xl font-bold mb-2">
                Secure Booking Guarantee
              </h3>

              <p className="text-green-700">
                Your payment is encrypted and protected.
                Booking confirmation will be sent instantly
                after successful payment.
              </p>

            </div>

          </div>

          {/* RIGHT */}
          <div className="xl:-mt-40">

            <div className="bg-white rounded-3xl shadow-2xl p-8 sticky top-32 border self-start">

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl px-5 py-4">

            <div className="flex items-center justify-between min-h-[70px]">

            <div>
            <p className="text-lg font-bold">
            Free Cancellation
            </p>

            <p className="text-sm text-blue-100">
            Cancel before 1 hour of pickup
            </p>
            </div>

    <div className="text-3xl">
      🛡️
    </div>

  </div>

</div>

              <h2 className="text-2xl font-bold mt-6 mb-5">
                Fare Summary
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-5">

            <p className="font-bold text-blue-700">
            Booking ID
            </p>

            <p className="text-xl font-bold">
            {bookingData?.bookingId}
            </p>

            </div>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Base Fare</span>
                  <span>₹1020</span>
                </div>

                <div className="flex justify-between">
                  <span>Driver Charge</span>
                  <span>₹300</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>₹180</span>
                </div>

              </div>

              <div className="bg-slate-50 rounded-xl p-4">

            <div className="flex justify-between">
            <span>Payment Type</span>

            <span className="font-bold">
            {bookingData?.paymentType === "partial"
            ? "Advance Payment"
            : "Full Payment"}
        </span>
        </div>

    </div>

    <div className="bg-gray-50 rounded-xl p-4 mt-4 space-y-3">

  <div className="flex justify-between">
    <span>Total Fare</span>
    <span className="font-semibold">
      ₹{bookingData?.totalFare}
    </span>
  </div>

  <div className="flex justify-between text-green-600">
    <span>Amount Paying Now</span>
    <span className="font-semibold">
      ₹{bookingData?.advancePaid}
    </span>
  </div>

  <div className="flex justify-between border-t pt-3 font-bold text-red-600">
    <span>Remaining Amount</span>
    <span>
      ₹{bookingData?.remainingAmount}
    </span>
  </div>

</div>

              <hr className="my-6" />

              <div className="flex justify-between items-center">

                <span className="text-2xl font-bold">
                  Total Amount
                </span>

                <span className="text-3xl font-bold text-green-600">
                ₹{bookingData?.payableAmount || amount}
                </span>

              </div>

              {bookingData?.paymentType === "partial" ? (

  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">

    <p className="font-bold text-green-700">
      Advance Payment Selected
    </p>

    <p className="text-sm text-green-600 mt-1">
      Paying ₹{bookingData?.advancePaid} now
    </p>

    <p className="text-sm text-green-600">
      Remaining ₹
      {bookingData?.remainingAmount}
      {" "}payable after trip completion.
    </p>

  </div>

) : (

  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4">

    <p className="font-bold text-blue-700">
      Full Payment Selected
    </p>

    <p className="text-sm text-blue-600 mt-1">
      No pending payment after booking confirmation.
    </p>

  </div>

)}


              
              <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-5 rounded-2xl text-2xl font-bold transition-all hover:scale-[1.02]"
              >
              {loading
              ? "Processing Payment..."
              : bookingData?.paymentType === "partial"
              ? `Pay Advance ₹${bookingData?.payableAmount || 500}`
              : `Pay Full Amount ₹${bookingData?.payableAmount || amount}`}
              </button>

              <div className="mt-5 text-center text-sm text-gray-500">
                🔒 100% Secure Payment
              </div>

              <div className="mt-2 text-center text-sm text-gray-500">
                Razorpay • UPI • Cards • Net Banking
              </div>

              <p className="text-center text-xs text-gray-400 mt-5">
                By proceeding, you agree to RC Tours &
                Travels Terms & Conditions.
              </p>

            </div>

          </div>

        </div>

      </div>

    </main>
  </>
);
}