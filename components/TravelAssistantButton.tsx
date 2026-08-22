"use client";

import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function TravelAssistantButton() {
  return (
    <div
      className="
        fixed
        left-3
        bottom-3
        z-[60]
        sm:left-6
        sm:bottom-8
      "
    >
      <Link
        href="/travel-assistant"
        aria-label="Open RC Travel Assistant"
        title="Ask RC Travel Assistant"
        className="
          group
          relative
          flex
          items-center
          gap-2

          rounded-full
          border
          border-white/25

          bg-gradient-to-r
          from-blue-900
          via-blue-800
          to-cyan-700

          px-2
          py-2

          text-white

          shadow-[0_8px_25px_rgba(14,116,144,0.35)]

          transition-all
          duration-300

          hover:-translate-y-1

          sm:gap-3.5
          sm:px-5
          sm:py-3
          sm:shadow-[0_10px_35px_rgba(14,116,144,0.35)]
        "
      >
        {/* =========================================
            RC TOURS ORIGINAL LOGO
        ========================================= */}
        <div
          className="
            relative
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center

            rounded-full
            border-2
            border-white
            bg-white
            shadow-sm

            sm:h-12
            sm:w-12
          "
        >
          <Image
            src="/logo.webp"
            alt="RC Tours & Travels"
            width={48}
            height={48}
            className="
              h-full
              w-full
              rounded-full
              object-contain
              p-0.5

              sm:p-1
            "
          />

          {/* AI SPARKLE */}
          <div
            className="
              absolute
              -right-1
              -top-1

              flex
              h-4
              w-4
              items-center
              justify-center

              rounded-full
              bg-amber-400
              shadow

              ring-1
              ring-blue-950

              sm:h-5
              sm:w-5
              sm:ring-2
            "
          >
            <Sparkles
              className="
                h-2.5
                w-2.5
                text-blue-950

                sm:h-3
                sm:w-3
              "
            />
          </div>

          {/* ONLINE INDICATOR */}
          <span
            className="
              absolute
              bottom-0
              right-0

              flex
              h-2.5
              w-2.5

              sm:h-3
              sm:w-3
            "
          >
            <span
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-emerald-400
                opacity-75
              "
            />

            <span
              className="
                relative
                inline-flex
                h-2.5
                w-2.5
                rounded-full
                border
                border-white
                bg-emerald-500

                sm:h-3
                sm:w-3
                sm:border-2
              "
            />
          </span>
        </div>

        {/* =========================================
            MOBILE TEXT
        ========================================= */}
        <div className="pr-1 sm:hidden">
          <p className="text-[9px] font-medium leading-[11px] text-cyan-200">
            RC Assistant
          </p>

          <p className="whitespace-nowrap text-[11px] font-extrabold leading-[13px] text-white">
            Ask AI
          </p>
        </div>

        {/* =========================================
            DESKTOP TEXT
        ========================================= */}
        <div className="hidden pr-2 sm:block">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-medium tracking-wide text-cyan-200">
              Need help?
            </span>

            <Sparkles className="h-3 w-3 animate-pulse text-amber-300" />
          </div>

          <p className="whitespace-nowrap text-sm font-extrabold tracking-tight text-white">
            RC Travel Assistant
          </p>
        </div>
      </Link>
    </div>
  );
}