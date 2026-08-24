"use client";

import { useEffect, useState } from "react";
import {
  X,
  Gift,
  Star,
  Ticket,
  Car,
  Headphones,
} from "lucide-react";
import Link from "next/link";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  campaignType?: string;
};

type Slide =
  | {
      type: "campaign";
      id: string;
      title: string;
      description: string;
      image: string;
      buttonText: string;
      buttonLink: string;
    }
  | {
      type: "default";
      id: string;
      title: string;
      description: string;
      icon: React.ReactNode;
      color: string;
    };

const defaultSlides: Slide[] = [
  {
    type: "default",
    id: "welcome",
    title: "🎉 Welcome to RC Tours & Travels",
    description:
      "Book safe & comfortable taxi rides anywhere in India.",
    icon: <Gift size={40} className="text-white" />,
    color: "from-blue-700 to-cyan-600",
  },
  {
    type: "default",
    id: "loyalty",
    title: "⭐ Loyalty Rewards",
    description:
      "Earn 100 Loyalty Points on every Outstation Trip.",
    icon: <Star size={40} className="text-white" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    type: "default",
    id: "special-fare",
    title: "🎁 Special Fare Benefits",
    description:
      "Enjoy Better Cab Fares & Extra Savings On Every Journey.",
    icon: <Ticket size={40} className="text-white" />,
    color: "from-emerald-600 to-teal-700",
  },
  {
    type: "default",
    id: "easy-booking",
    title: "🚕 Quick & Easy Booking",
    description:
      "Book your cab in just a few simple steps and travel worry-free.",
    icon: <Car size={40} className="text-white" />,
    color: "from-indigo-600 to-blue-700",
  },
  {
    type: "default",
    id: "support",
    title: "📞 24×7 Travel Support",
    description:
      "Our team is always available to help you with your journey.",
    icon: <Headphones size={40} className="text-white" />,
    color: "from-rose-600 to-red-700",
  },
];

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // LOAD ACTIVE POPUP CAMPAIGNS
  // ========================================

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const response = await fetch("/api/campaigns", {
          cache: "no-store",
        });

        const data = await response.json();

        if (
          response.ok &&
          data.success &&
          Array.isArray(data.campaigns)
        ) {
          // ONLY POPUP CAMPAIGNS
          const popupCampaigns = data.campaigns.filter(
            (campaign: Campaign) =>
              String(campaign.campaignType || "")
                .trim()
                .toLowerCase() === "popup"
          );

          const campaignSlides: Slide[] = popupCampaigns.map(
            (campaign: Campaign) => ({
              type: "campaign",
              id: campaign._id,
              title: campaign.title || "",
              description: campaign.description || "",
              image: campaign.image || "",
              buttonText:
                campaign.buttonText || "Book Now",
              buttonLink:
                campaign.buttonLink || "/book-cab",
            })
          );

          // Popup campaigns available
          if (campaignSlides.length > 0) {
            setSlides(campaignSlides);
          } else {
            // No popup campaign → default slides
            setSlides(defaultSlides);
          }
        } else {
          setSlides(defaultSlides);
        }
      } catch (error) {
        console.error(
          "Campaign Popup Error:",
          error
        );

        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // ========================================
  // OPEN POPUP
  // ========================================

  useEffect(() => {
    if (loading || slides.length === 0) return;

    const alreadySeen = sessionStorage.getItem(
      "rc-announcement-popup-seen"
    );

    if (alreadySeen) {
      return;
    }

    const timer = setTimeout(() => {
      setOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, slides.length]);

  // ========================================
  // AUTO SLIDE
  // ========================================

  useEffect(() => {
    if (!open || slides.length <= 1) return;

    const interval = setInterval(() => {
      setActive((prev) => {
        return (prev + 1) % slides.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [open, slides.length]);

  // ========================================
  // CLOSE POPUP
  // ========================================

  const closePopup = () => {
    sessionStorage.setItem(
      "rc-announcement-popup-seen",
      "true"
    );

    setOpen(false);
  };

  // ========================================
  // NEXT SLIDE
  // ========================================

  const nextSlide = () => {
    setActive((prev) =>
      prev === slides.length - 1
        ? 0
        : prev + 1
    );
  };

  // ========================================
  // PREVIOUS SLIDE
  // ========================================

  const previousSlide = () => {
    setActive((prev) =>
      prev === 0
        ? slides.length - 1
        : prev - 1
    );
  };

  if (
    loading ||
    !open ||
    slides.length === 0
  ) {
    return null;
  }

  const slide = slides[active];

  // ========================================
  // ADMIN CAMPAIGN POPUP
  // ========================================

  if (slide.type === "campaign") {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
        <div className="relative w-full max-w-[500px] overflow-hidden rounded-[24px] bg-white shadow-2xl">

          {/* CLOSE BUTTON */}
          <button
            onClick={closePopup}
            className="absolute right-3 top-3 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-all hover:bg-black/80"
            aria-label="Close campaign"
          >
            <X size={20} />
          </button>

          {/* CAMPAIGN IMAGE */}
          {slide.image && (
            <div className="flex w-full justify-center bg-gray-100">
              <img
                src={slide.image}
                alt={slide.title}
                className="max-h-[360px] w-full object-contain"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="px-5 pb-5 pt-4">

            {slide.title && (
              <h2 className="text-xl font-bold text-slate-800">
                {slide.title}
              </h2>
            )}

            {slide.description && (
              <p className="mt-2 text-sm text-gray-600">
                {slide.description}
              </p>
            )}

            {/* ACTION BUTTONS */}
            <div className="mt-5 flex items-center gap-3">

              {slides.length > 1 && (
                <button
                  type="button"
                  onClick={previousSlide}
                  className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Previous
                </button>
              )}

              <Link
                href={slide.buttonLink}
                onClick={closePopup}
                className="flex-1 rounded-xl bg-blue-600 py-3 text-center font-semibold text-white shadow-lg transition hover:bg-blue-700"
              >
                {slide.buttonText}
              </Link>

              {slides.length > 1 ? (
                active === slides.length - 1 ? (
                  <button
                    type="button"
                    onClick={closePopup}
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    Close
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                  >
                    Next
                  </button>
                )
              ) : (
                <button
                  type="button"
                  onClick={closePopup}
                  className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                >
                  Close
                </button>
              )}
            </div>

            {/* SLIDE COUNT */}
            {slides.length > 1 && (
              <div className="mt-4 text-center text-sm text-gray-400">
                {active + 1} of {slides.length}
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // DEFAULT POPUP
  // ========================================

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-[560px] rounded-[28px] bg-gradient-to-br ${slide.color} p-8 text-white shadow-2xl sm:p-10`}
      >
        {/* CLOSE */}
        <button
          onClick={closePopup}
          className="absolute right-5 top-5 rounded-full bg-white/20 p-3 transition hover:bg-white/30"
          aria-label="Close announcement"
        >
          <X size={22} />
        </button>

        {/* ICON */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10">
            {slide.icon}
          </div>
        </div>

        {/* TITLE */}
        <h2 className="text-center text-2xl font-bold sm:text-3xl">
          {slide.title}
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-5 text-center text-base text-white/90 sm:text-lg">
          {slide.description}
        </p>

        {/* CONTINUE */}
        <button
          onClick={closePopup}
          className="mt-8 w-full rounded-2xl bg-white py-4 text-lg font-bold text-slate-800 transition hover:bg-gray-100"
        >
          Continue
        </button>

        {/* DOTS */}
        {slides.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition-all ${
                  active === index
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}