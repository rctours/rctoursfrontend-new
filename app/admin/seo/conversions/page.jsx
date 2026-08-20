"use client";

import Link from "next/link";

const conversionTypes = [
  {
    icon: "🚕",
    title: "Website Booking",
    key: "booking",
    status: "TRACKING REQUIRED",
    description:
      "Track customers who complete a cab booking through the RC Tours & Travels website.",
    value:
      "This is the most important conversion because it represents an actual booking opportunity.",
  },
  {
    icon: "💬",
    title: "WhatsApp Enquiry",
    key: "whatsapp",
    status: "TRACKING REQUIRED",
    description:
      "Track clicks on the website WhatsApp buttons and links.",
    value:
      "Useful for customers who prefer to ask fare, availability or vehicle questions on WhatsApp.",
  },
  {
    icon: "📞",
    title: "Phone Call",
    key: "phone",
    status: "TRACKING REQUIRED",
    description:
      "Track clicks on phone-number links from mobile and desktop visitors.",
    value:
      "Important because taxi customers often prefer calling before booking.",
  },
  {
    icon: "📋",
    title: "Booking Form Start",
    key: "form-start",
    status: "PLANNED",
    description:
      "Track visitors who start entering booking information.",
    value:
      "Helps identify visitors who show booking intent but do not complete the booking.",
  },
];

const funnelSteps = [
  {
    number: "01",
    title: "Google Search",
    description: "Customer searches for a taxi, cab, airport or travel service.",
    icon: "🔎",
  },
  {
    number: "02",
    title: "Ad / Organic Result",
    description: "Customer discovers RC Tours & Travels through paid or organic search.",
    icon: "📈",
  },
  {
    number: "03",
    title: "Website Visit",
    description: "Customer lands on the relevant RC Tours & Travels page.",
    icon: "🌐",
  },
  {
    number: "04",
    title: "Conversion",
    description: "Customer books, calls or starts a WhatsApp enquiry.",
    icon: "🎯",
  },
];

const recommendedEvents = [
  {
    event: "booking_completed",
    source: "Website",
    priority: "HIGH",
    purpose: "Successful cab booking",
  },
  {
    event: "whatsapp_click",
    source: "Website",
    priority: "HIGH",
    purpose: "WhatsApp enquiry",
  },
  {
    event: "phone_click",
    source: "Website",
    priority: "HIGH",
    purpose: "Phone enquiry",
  },
  {
    event: "booking_start",
    source: "Website",
    priority: "MEDIUM",
    purpose: "Booking intent",
  },
  {
    event: "fare_calculator_use",
    source: "Website",
    priority: "MEDIUM",
    purpose: "Pricing interest",
  },
];

const conversionRules = [
  {
    title: "Do not count every page view as a lead",
    description:
      "Website visits are useful traffic metrics, but a lead should represent a meaningful customer action.",
  },
  {
    title: "Track real customer actions",
    description:
      "Booking completion, WhatsApp clicks and phone clicks are much more useful for evaluating advertising performance.",
  },
  {
    title: "Use conversion data for Ads",
    description:
      "Google Ads should eventually optimise toward meaningful conversions instead of simply maximising clicks.",
  },
  {
    title: "Compare paid and organic",
    description:
      "Once tracking is active, compare which channel generates more qualified enquiries and bookings.",
  },
  {
    title: "Measure revenue",
    description:
      "The long-term goal is not simply more leads. It is profitable bookings and revenue from those leads.",
  },
];

function priorityClass(priority) {
  if (priority === "HIGH") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function statusClass(status) {
  if (status === "CONNECTED") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "PLANNED") {
    return "border-violet-200 bg-violet-50 text-violet-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function SEOConversionsPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-3">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-black tracking-wider text-cyan-700">
                    SEO & GROWTH SYSTEM
                  </span>

                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-black tracking-wider text-emerald-700">
                    CONVERSION TRACKING
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Conversion Tracking
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Track the customer actions that matter for RC Tours &
                  Travels — bookings, WhatsApp enquiries and phone calls.
                </p>

              </div>

              <Link
                href="/admin/seo"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                ← SEO Dashboard
              </Link>

            </div>

          </div>

        </div>

        {/* CURRENT STATUS */}

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              ⚠️
            </div>

            <div>

              <h2 className="text-lg font-black text-amber-950">
                Conversion Tracking Status
              </h2>

              <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-amber-900">
                Google Search Console organic search data is connected, but
                website booking, WhatsApp and phone conversion events are not
                yet connected to this module. This dashboard currently shows
                the tracking plan and measurement structure.
              </p>

            </div>

          </div>

        </div>

        {/* OVERVIEW */}

        <div>

          <div className="mb-4">

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              📊 Conversion Overview
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              The most important customer actions to measure.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border border-rose-200 bg-rose-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-rose-600">
                Booking
              </span>

              <div className="mt-3 text-2xl font-black text-rose-950">
                Required
              </div>

              <p className="mt-2 text-xs font-medium text-rose-800">
                Most valuable website conversion.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                WhatsApp
              </span>

              <div className="mt-3 text-2xl font-black text-emerald-950">
                Required
              </div>

              <p className="mt-2 text-xs font-medium text-emerald-800">
                Direct enquiry signal.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Phone
              </span>

              <div className="mt-3 text-2xl font-black text-blue-950">
                Required
              </div>

              <p className="mt-2 text-xs font-medium text-blue-800">
                Important for taxi customers.
              </p>
            </div>

            <div className="rounded-3xl border border-violet-200 bg-violet-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-violet-600">
                Analytics
              </span>

              <div className="mt-3 text-2xl font-black text-violet-950">
                Planned
              </div>

              <p className="mt-2 text-xs font-medium text-violet-800">
                Connect events to analytics and Ads.
              </p>
            </div>

          </div>

        </div>

        {/* CONVERSION TYPES */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🎯 Conversion Types
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Customer actions that should eventually be measured.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">

            {conversionTypes.map((item) => (
              <div
                key={item.key}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex min-w-0 items-start gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                      {item.icon}
                    </div>

                    <div>

                      <h3 className="text-sm font-black text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {item.description}
                      </p>

                    </div>

                  </div>

                  <span
                    className={`shrink-0 rounded-lg border px-2.5 py-1 text-[10px] font-black ${statusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="mt-4 rounded-xl border border-white bg-white p-3">

                  <p className="text-xs font-semibold leading-relaxed text-slate-600">
                    💡 {item.value}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* FUNNEL */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🔄 Organic + Ads Conversion Funnel
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Customer journey from Google search to a potential booking.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

            {funnelSteps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
              >

                <div className="flex items-center justify-between">

                  <span className="text-xs font-black text-slate-400">
                    {step.number}
                  </span>

                  <span className="text-xl">
                    {step.icon}
                  </span>

                </div>

                <h3 className="mt-5 text-sm font-black text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {step.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* EVENTS */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🧩 Recommended Analytics Events
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Suggested event names for future website analytics and Google
              Ads conversion integration.
            </p>

          </div>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full min-w-[700px] border-collapse">

              <thead>

                <tr className="border-b border-slate-200 text-left">

                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Event
                  </th>

                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Source
                  </th>

                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Priority
                  </th>

                  <th className="px-4 py-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Purpose
                  </th>

                </tr>

              </thead>

              <tbody>

                {recommendedEvents.map((item) => (
                  <tr
                    key={item.event}
                    className="border-b border-slate-100 last:border-0"
                  >

                    <td className="px-4 py-4">

                      <code className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {item.event}
                      </code>

                    </td>

                    <td className="px-4 py-4 text-xs font-semibold text-slate-600">
                      {item.source}
                    </td>

                    <td className="px-4 py-4">

                      <span
                        className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${priorityClass(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>

                    </td>

                    <td className="px-4 py-4 text-xs font-semibold text-slate-600">
                      {item.purpose}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* ADS MEASUREMENT */}

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              📈
            </div>

            <div>

              <h2 className="text-lg font-black text-blue-950">
                Google Ads ko conversion tracking ki zarurat kyun hai?
              </h2>

              <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-blue-900">
                Agar Ads se 100 clicks aaye aur ek bhi customer booking,
                WhatsApp ya call na kare, to sirf click count ko success nahi
                maana ja sakta. Conversion tracking se pata chalega ki paid
                traffic actually business ke liye useful hai ya nahi.
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                <div className="rounded-2xl border border-blue-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                    Metric
                  </p>

                  <p className="mt-2 text-sm font-black text-blue-950">
                    Cost Per Lead
                  </p>

                </div>

                <div className="rounded-2xl border border-blue-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                    Metric
                  </p>

                  <p className="mt-2 text-sm font-black text-blue-950">
                    Cost Per Booking
                  </p>

                </div>

                <div className="rounded-2xl border border-blue-100 bg-white p-4">

                  <p className="text-[10px] font-black uppercase tracking-wider text-blue-500">
                    Metric
                  </p>

                  <p className="mt-2 text-sm font-black text-blue-950">
                    Return On Ad Spend
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RULES */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              ⚠️ Conversion Tracking Rules
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Measurement system banate waqt ye principles follow karenge.
            </p>

          </div>

          <div className="mt-6 space-y-3">

            {conversionRules.map((rule, index) => (
              <div
                key={rule.title}
                className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
              >

                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                  {index + 1}
                </div>

                <div>

                  <h3 className="text-sm font-black text-slate-900">
                    {rule.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    {rule.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* NEXT STEP */}

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                NEXT IMPLEMENTATION
              </span>

              <h2 className="mt-4 text-xl font-black text-emerald-950">
                Website Conversion Events
              </h2>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-emerald-900">
                Next implementation phase mein actual website buttons aur
                booking success actions ko measurable events ke saath connect
                kiya ja sakta hai. Uske baad Google Analytics aur Google Ads
                conversions ke saath integration ki ja sakti hai.
              </p>

            </div>

            <Link
              href="/admin/seo/ads"
              className="shrink-0 rounded-2xl bg-emerald-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-emerald-800"
            >
              Open Google Ads Strategy →
            </Link>

          </div>

        </div>

        {/* FOOTER */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">

          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            CONVERSION TRACKING
          </p>

          <h2 className="mt-2 text-lg font-black text-slate-900">
            🚀 Measurement System Ready
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-500">
            This page defines the conversion measurement structure. Actual
            analytics event implementation is intentionally kept separate so
            existing booking, WhatsApp and phone functionality is not changed
            accidentally.
          </p>

        </div>

      </div>
    </div>
  );
}