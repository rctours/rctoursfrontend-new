"use client";

import Link from "next/link";

const campaignPlans = [
  {
    name: "Nagpur Taxi Service",
    intent: "High Commercial",
    keywords: [
      "taxi service in nagpur",
      "cab service in nagpur",
      "taxi in nagpur",
      "nagpur taxi service",
    ],
    goal: "Generate direct booking enquiries from people actively looking for a taxi in Nagpur.",
    priority: "HIGH",
  },
  {
    name: "Nagpur Airport Taxi",
    intent: "High Transactional",
    keywords: [
      "nagpur airport taxi",
      "airport taxi nagpur",
      "nagpur airport taxi service",
    ],
    goal: "Capture customers who need immediate airport pickup or drop service.",
    priority: "HIGH",
  },
  {
    name: "Outstation Cab",
    intent: "High Commercial",
    keywords: [
      "outstation taxi service",
      "outstation cab nagpur",
      "one way taxi nagpur",
      "round trip taxi nagpur",
    ],
    goal: "Generate high-value outstation booking leads.",
    priority: "HIGH",
  },
  {
    name: "Tempo Traveller Nagpur",
    intent: "Commercial",
    keywords: [
      "tempo traveller in nagpur",
      "tempo traveller nagpur",
      "tempo traveller on rent in nagpur",
    ],
    goal: "Target group travel and large-family/tour bookings.",
    priority: "MEDIUM",
  },
];

const organicSignals = [
  {
    keyword: "taxi service in nagpur",
    position: "11.1",
    action: "Keep Ads active while improving organic page toward Page 1.",
  },
  {
    keyword: "nagpur taxi service",
    position: "12.9",
    action: "Use Ads for immediate visibility and improve existing SEO page.",
  },
  {
    keyword: "cab service in nagpur",
    position: "8.1",
    action: "Organic Page 1 is already visible. Monitor Ads cost carefully.",
  },
  {
    keyword: "car rental nagpur",
    position: "9.9",
    action: "Organic Page 1 opportunity. Reduce paid dependency when organic improves.",
  },
  {
    keyword: "tempo traveller in nagpur",
    position: "17.5",
    action: "Ads can provide leads while the keyword moves toward Page 1.",
  },
];

const benefits = [
  {
    icon: "🚕",
    title: "Immediate Website Traffic",
    description:
      "SEO ranking banne mein time lag sakta hai. Google Ads se high-intent customers ko immediately website par laaya ja sakta hai.",
  },
  {
    icon: "📞",
    title: "More Booking Enquiries",
    description:
      "Taxi, airport aur outstation jaise commercial keywords par paid traffic direct booking, call aur WhatsApp enquiries generate kar sakta hai.",
  },
  {
    icon: "🎯",
    title: "Test High-Value Keywords",
    description:
      "Ads se pata chal sakta hai ki kaunse search terms customers ke liye useful hain. Baad mein un keywords ko SEO content mein strengthen kiya ja sakta hai.",
  },
  {
    icon: "📈",
    title: "Support SEO Growth",
    description:
      "Ads organic ranking ko directly boost nahi karta, lekin useful keyword, landing-page aur conversion data se SEO strategy improve karne mein help karta hai.",
  },
  {
    icon: "💰",
    title: "Temporary Paid Strategy",
    description:
      "Jab important keywords organically strong ho jaayen, paid campaigns ko reduce ya pause karke advertising dependency kam ki ja sakti hai.",
  },
  {
    icon: "🔄",
    title: "Paid → Organic Transition",
    description:
      "Goal ye hona chahiye ki high-value searches par website ki organic visibility gradually strong ho aur paid traffic sirf strategic keywords ke liye use ho.",
  },
];

const rules = [
  {
    title: "Don't advertise every keyword",
    text: "Sirf high commercial ya transactional intent wale keywords par budget focus karo.",
  },
  {
    title: "Don't send traffic to unrelated pages",
    text: "Ad keyword aur landing page ka search intent match hona chahiye.",
  },
  {
    title: "Track conversions",
    text: "Sirf clicks ko success mat samjho. Booking, WhatsApp aur phone enquiries ko eventually track karna important hai.",
  },
  {
    title: "Review search terms",
    text: "Google Ads ke actual search terms ko regularly review karke irrelevant searches ko negative keywords mein add karo.",
  },
  {
    title: "Protect organic winners",
    text: "Jab koi keyword strong organic position mein aa jaye, us keyword par paid spend ko performance ke basis par review karo.",
  },
];

function priorityClass(priority) {
  if (priority === "HIGH") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default function GoogleAdsSEOPage() {
  return (
    <div className="min-h-screen bg-slate-50/60 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* HEADER */}

        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-3">

                <div className="flex flex-wrap items-center gap-2">

                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[11px] font-black tracking-wider text-blue-700">
                    SEO & GROWTH SYSTEM
                  </span>

                  <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[11px] font-black tracking-wider text-violet-700">
                    GOOGLE ADS
                  </span>

                </div>

                <h1 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
                  Google Ads Growth Strategy
                </h1>

                <p className="max-w-3xl text-sm font-medium leading-relaxed text-slate-600 md:text-base">
                  Use Google Ads as a temporary paid-growth system while
                  RC Tours & Travels builds strong organic search visibility.
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

        {/* IMPORTANT MESSAGE */}

        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
              💡
            </div>

            <div>

              <h2 className="text-lg font-black text-blue-950">
                Ads ka main purpose kya hai?
              </h2>

              <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-blue-900">
                Google Ads ko RC Tours & Travels ke liye permanent replacement
                nahi, balki <strong>temporary growth engine</strong> ki tarah
                use kiya ja sakta hai. Jab tak important keywords organically
                strong nahi hote, Ads se high-intent customers website tak
                pahunch sakte hain.
              </p>

            </div>

          </div>

        </div>

        {/* OVERVIEW */}

        <div>

          <div className="mb-4">

            <h2 className="text-2xl font-black tracking-tight text-slate-900">
              📊 Google Ads Strategy Overview
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Recommended role of paid search in the current SEO growth phase.
            </p>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-3xl border border-blue-200 bg-blue-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600">
                Current Role
              </span>

              <div className="mt-3 text-2xl font-black text-blue-950">
                Temporary
              </div>

              <p className="mt-2 text-xs font-medium text-blue-800">
                Paid traffic while organic SEO grows.
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
                Main Goal
              </span>

              <div className="mt-3 text-2xl font-black text-emerald-950">
                Leads
              </div>

              <p className="mt-2 text-xs font-medium text-emerald-800">
                Bookings, WhatsApp and phone enquiries.
              </p>
            </div>

            <div className="rounded-3xl border border-violet-200 bg-violet-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-violet-600">
                Focus
              </span>

              <div className="mt-3 text-2xl font-black text-violet-950">
                High Intent
              </div>

              <p className="mt-2 text-xs font-medium text-violet-800">
                Taxi, cab, airport and outstation searches.
              </p>
            </div>

            <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm">
              <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                Long-Term Goal
              </span>

              <div className="mt-3 text-2xl font-black text-amber-950">
                Organic
              </div>

              <p className="mt-2 text-xs font-medium text-amber-800">
                Reduce paid dependency as SEO becomes stronger.
              </p>
            </div>

          </div>

        </div>

        {/* BENEFITS */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🚀 Website ko Google Ads se kya fayda hoga?
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Paid search ka practical benefit RC Tours & Travels ke current
              growth stage mein.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

            {benefits.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5 transition hover:border-blue-200 hover:bg-blue-50/30"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-sm font-black text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* CAMPAIGNS */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🎯 Recommended Google Ads Campaigns
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Start with high commercial-intent searches instead of spreading
              budget across every keyword.
            </p>

          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

            {campaignPlans.map((campaign) => (
              <div
                key={campaign.name}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-6"
              >

                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div>

                    <h3 className="text-base font-black text-slate-900">
                      {campaign.name}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      {campaign.intent}
                    </p>

                  </div>

                  <span
                    className={`rounded-lg border px-2.5 py-1 text-[10px] font-black ${priorityClass(
                      campaign.priority
                    )}`}
                  >
                    {campaign.priority}
                  </span>

                </div>

                <div className="mt-5">

                  <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
                    Suggested Keywords
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {campaign.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700"
                      >
                        {keyword}
                      </span>
                    ))}

                  </div>

                </div>

                <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">

                  <p className="text-xs font-bold leading-relaxed text-blue-900">
                    🎯 {campaign.goal}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* ORGANIC + ADS */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              🔄 Ads + Organic SEO Strategy
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Current Google Search Console signals ke according paid and
              organic strategy ko saath mein kaise use karna hai.
            </p>

          </div>

          <div className="mt-6 space-y-4">

            {organicSignals.map((item) => (
              <div
                key={item.keyword}
                className="rounded-2xl border border-slate-100 bg-slate-50/60 p-5"
              >

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h3 className="text-sm font-black text-slate-900">
                      {item.keyword}
                    </h3>

                    <p className="mt-1 text-xs font-semibold text-slate-500">
                      Current organic position: {item.position}
                    </p>

                  </div>

                  <span className="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700">
                    Monitor
                  </span>

                </div>

                <div className="mt-4 rounded-xl border border-white bg-white p-3">

                  <p className="text-xs font-semibold leading-relaxed text-slate-600">
                    {item.action}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* TEMPORARY STRATEGY */}

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm md:p-8">

          <div className="flex items-start gap-4">

            <div className="text-3xl">
              🟢
            </div>

            <div>

              <h2 className="text-lg font-black text-emerald-950">
                Paid Traffic → Organic Traffic Transition
              </h2>

              <p className="mt-2 max-w-4xl text-sm font-medium leading-relaxed text-emerald-900">
                Strategy simple hai: shuru mein Ads se customers aur useful
                search data lao. Saath mein SEO pages ko improve karo. Jab
                important keywords consistently strong organic positions par
                aa jaayen, tab un keywords ke paid campaigns ko performance,
                conversion aur cost ke basis par reduce ya pause kiya ja sakta
                hai.
              </p>

            </div>

          </div>

        </div>

        {/* RULES */}

        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm md:p-8">

          <div>

            <h2 className="text-xl font-black text-slate-900">
              ⚠️ Google Ads Rules
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Campaign run karte waqt in points ko follow karna important hai.
            </p>

          </div>

          <div className="mt-6 space-y-3">

            {rules.map((rule, index) => (
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
                    {rule.text}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* CURRENT SEO SIGNAL */}

        <div className="rounded-3xl border border-violet-200 bg-violet-50 p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wider text-violet-700">
                SEO + ADS
              </span>

              <h2 className="mt-4 text-xl font-black text-violet-950">
                Current Website Strategy
              </h2>

              <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-violet-900">
                RC Tours & Travels ke paas already Google Search Console se
                real organic search data aa raha hai. Isliye Ads ko blindly
                chalane ke bajay organic data ke saath use karna better
                strategy hai.
              </p>

            </div>

            <Link
              href="/admin/seo/content"
              className="shrink-0 rounded-2xl bg-violet-700 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-violet-800"
            >
              Open Content Opportunities →
            </Link>

          </div>

        </div>

        {/* FOOTER */}

        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">

          <p className="text-xs font-black uppercase tracking-wider text-slate-400">
            GOOGLE ADS STRATEGY
          </p>

          <h2 className="mt-2 text-lg font-black text-slate-900">
            🚀 Paid Growth System Ready
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs font-medium leading-relaxed text-slate-500">
            This dashboard is a planning layer. Actual Google Ads spend,
            clicks, conversions and campaign performance should be connected
            through Google Ads data before showing live advertising metrics.
          </p>

        </div>

      </div>
    </div>
  );
}