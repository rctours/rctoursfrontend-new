"use client";

export default function PremiumHero() {
  return (
    <section className="relative overflow-hidden bg-[#020817] text-white min-h-screen">

      {/* Background */}

      <div className="absolute inset-0">

        {/* Main Gradient */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb_0%,#08162f_45%,#020611_100%)]"></div>

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top Glow */}

        <div className="absolute -top-56 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-blue-500/20 blur-[220px]"></div>

        {/* Left Glow */}

        <div className="absolute -left-56 top-20 w-[500px] h-[500px] rounded-full bg-cyan-500/20 blur-[180px]"></div>

        {/* Right Glow */}

        <div className="absolute -right-56 top-20 w-[500px] h-[500px] rounded-full bg-blue-500/20 blur-[180px]"></div>

        {/* Bottom Glow */}

<div className="absolute bottom-[-220px] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-blue-600/20 blur-[220px] rounded-full"></div>

{/* Top Glow */}

<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

{/* Left Light */}

<div className="absolute -left-40 bottom-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[200px]"></div>

{/* Right Light */}

<div className="absolute -right-40 bottom-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[200px]"></div>

      </div>

      {/* Main Container */}

      <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-10 pt-28 md:pt-24 lg:pt-20 pb-24 md:pb-32">

        {/* Left Curves */}

<div className="absolute -left-[450px] bottom-[-260px] w-[1200px] h-[900px] rounded-full border border-cyan-400/20 rotate-[18deg]"></div>

<div className="absolute -left-[420px] bottom-[-230px] w-[1100px] h-[820px] rounded-full border border-blue-500/20 rotate-[18deg]"></div>

<div className="absolute -left-[390px] bottom-[-200px] w-[1000px] h-[740px] rounded-full border border-cyan-400/15 rotate-[18deg]"></div>

<div className="absolute -left-[360px] bottom-[-170px] w-[900px] h-[660px] rounded-full border border-blue-500/15 rotate-[18deg]"></div>

{/* Right Curves */}

<div className="absolute -right-[450px] bottom-[-260px] w-[1200px] h-[900px] rounded-full border border-cyan-400/20 -rotate-[18deg]"></div>

<div className="absolute -right-[420px] bottom-[-230px] w-[1100px] h-[820px] rounded-full border border-blue-500/20 -rotate-[18deg]"></div>

<div className="absolute -right-[390px] bottom-[-200px] w-[1000px] h-[740px] rounded-full border border-cyan-400/15 -rotate-[18deg]"></div>

<div className="absolute -right-[360px] bottom-[-170px] w-[900px] h-[660px] rounded-full border border-blue-500/15 -rotate-[18deg]"></div>

        <div className="text-center mt-2 md:mt-2">

        {/* Badge */}

        <span className="inline-flex items-center gap-2 md:gap-3 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-xl px-5 md:px-7 py-2 md:py-3 shadow-xl shadow-cyan-500/20 md:mt-4">

        <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span>

        <span className="uppercase tracking-[3px] text-sm font-bold text-cyan-300">
        Trusted Since 2018
        </span>

        </span>

          {/* Heading */}

        <h1 className="mt-6 md:mt-8 max-w-7xl mx-auto
        text-[26px]
        sm:text-[30px]
        md:text-6xl
        lg:text-[68px]
        xl:text-[74px]
        font-black
        leading-tight
        tracking-[-0.03em]
        whitespace-nowrap
        drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]">

  <span className="text-white">
    Trusted Taxi
  </span>{" "}

  <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-600 bg-clip-text text-transparent">
    & Travel Partner
  </span>

</h1>

          {/* Description */}

          <p className="mt-4 md:mt-5
            max-w-3xl
            mx-auto
            text-[17px]
            md:text-xl
            leading-9
            text-slate-300
            font-light
            px-2">

            RC Tours & Travels provides reliable airport transfers,
            local taxi service, outstation cab booking,
            corporate travel and customized tour packages
            across India.
          </p>

          {/* Rating */}

{/* Desktop */}
<div className="mt-6 hidden md:flex flex-wrap justify-center gap-3">

  <div className="rounded-full bg-white/5 border border-white/10 px-6 py-3">
    ⭐ 4.9 Google Rating
  </div>

  <div className="rounded-full bg-white/5 border border-white/10 px-6 py-3">
    🚖 5000+ Trips
  </div>

  <div className="rounded-full bg-white/5 border border-white/10 px-6 py-3">
    😊 1000+ Happy Customers
  </div>

</div>

{/* Mobile */}
<div className="mt-6 flex flex-col items-center gap-3 md:hidden">

  <div className="flex justify-center items-center gap-2 w-full">

    <div className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-sm">
      ⭐ 4.9 Google Rating
    </div>

    <div className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-sm">
      🚖 5000+ Trips
    </div>

  </div>

  <div className="rounded-full bg-white/5 border border-white/10 px-3 py-2 text-sm">
    😊 1000+ Happy Customers
  </div>

</div>

        {/* Buttons */}

          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 md:gap-5">

            <a
            href="tel:9172271464"
            className="group w-full sm:w-auto rounded-2xl bg-blue-600 px-8 py-4 font-bold text-white shadow-2xl shadow-blue-600/40 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-blue-700"
            >
              📞 Call Now →
            </a>

            <a
            href="/book-cab"
            className="group w-full sm:w-auto rounded-2xl bg-orange-500 px-8 py-4 font-bold text-white shadow-2xl shadow-orange-500/40 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:bg-orange-600"
            >
              🚖 Book Online →
            </a>

          </div>

                  </div>

      </div>

      {/* Premium Statistics */}

      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-6 -mt-10 md:-mt-20 pb-10">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">

          <div className="group relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-white p-3 md:p-5 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-500/30">

            <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              7+
            </h3>

            <p className="mt-1 text-xs md:text-base text-gray-500 font-semibold">
              Years Experience
            </p>

          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl border border-white p-4 md:p-5 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-cyan-500/30">

            <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              5000+
            </h3>

            <p className="mt-1 text-xs md:text-base text-gray-600 font-semibold">
              Trips Completed
            </p>

          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl border border-white p-3 md:p-5 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-500/30">

            <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              1000+
            </h3>

            <p className="mt-1 text-xs md:text-base text-gray-600 font-semibold">
              Happy Customers
            </p>

          </div>

          <div className="group relative overflow-hidden rounded-3xl bg-white/95 backdrop-blur-xl border border-white p-4 md:p-5 shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-cyan-500/30">

            <h3 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              24×7
            </h3>

            <p className="mt-1 text-xs md:text-base text-gray-600 font-semibold">
              Customer Support
            </p>

          </div>

        </div>

      </div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020611] via-[#020611]/80 to-transparent"></div>

    </section>
  );
}