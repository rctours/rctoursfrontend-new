"use client";

import { useEffect, useState } from "react";
import { X, Gift, Star, Ticket } from "lucide-react";
import Link from "next/link";

type Campaign = {
  _id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
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
    icon: <Gift size={40} className="text-white drop-shadow-md" />,
    color: "from-blue-700 to-cyan-600",
  },
  {
    type: "default",
    id: "loyalty",
    title: "⭐ Loyalty Rewards",
    description:
      "Earn 100 Loyalty Points on every Outstation Trip.",
    icon: <Star size={40} className="text-white drop-shadow-md" />,
    color: "from-amber-500 to-orange-600",
  },
  {
    type: "default",
    id: "coupon",
    title: "🎁 ₹300 Coupon Reward",
    description:
      "Collect 300 Points & Unlock ₹300 OFF Coupon Automatically.",
    icon: <Ticket size={40} className="text-white drop-shadow-md" />,
    color: "from-emerald-600 to-teal-700",
  },
];

export default function AnnouncementPopup() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(defaultSlides);
  const [loading, setLoading] = useState(true);

  // ========================================
  // LOAD ACTIVE CAMPAIGNS
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
          const campaignSlides: Slide[] = data.campaigns.map(
            (campaign: Campaign) => ({
              type: "campaign",
              id: campaign._id,
              title: campaign.title,
              description: campaign.description,
              image: campaign.image,
              buttonText: campaign.buttonText || "Book Now",
              buttonLink: campaign.buttonLink || "/book-cab",
            })
          );

          // Admin campaigns FIRST
          setSlides([
            ...campaignSlides,
            ...defaultSlides,
          ]);
        }
      } catch (error) {
        console.error("Campaign Popup Error:", error);

        // API fail ho tab bhi default slides dikhenge
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
  if (loading) return;

  const alreadySeen = sessionStorage.getItem(
    "rc-announcement-popup-seen"
  );

  if (alreadySeen) {
    return;
  }

  const timer = setTimeout(() => {
    setOpen(true);
  }, 700);

  return () => clearTimeout(timer);
  }, [loading]);

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
  // CLOSE
  // ========================================

  const closePopup = () => {
  sessionStorage.setItem(
    "rc-announcement-popup-seen",
    "true"
  );

  setOpen(false);
  };

  if (!open || slides.length === 0) {
    return null;
  }

  const slide = slides[active];

  // ========================================
  // ADMIN CAMPAIGN POSTER
  // ========================================

  if (slide.type === "campaign") {
    return (
      <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
        <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">

          {/* CLOSE */}
          <button
            onClick={closePopup}
            className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-all backdrop-blur-sm"
            aria-label="Close campaign"
          >
            <X size={18} />
          </button>

          {/* POSTER */}
          {slide.image && (
            <div className="w-full bg-gray-50 relative flex-shrink-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-64 sm:h-72 object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          )}

          {/* CONTENT */}
          <div className="p-6 flex flex-col justify-between flex-grow overflow-y-auto">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center leading-snug">
                {slide.title}
              </h2>

              {slide.description && (
                <p className="mt-2.5 text-sm sm:text-base text-center text-gray-600 leading-relaxed">
                  {slide.description}
                </p>
              )}
            </div>

            <div className="pt-6 mt-auto">
              <Link
                href={slide.buttonLink}
                onClick={closePopup}
                className="flex items-center justify-center w-full rounded-xl bg-blue-600 hover:bg-blue-700 py-3 text-white font-semibold shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02] text-sm sm:text-base"
              >
                {slide.buttonText}
              </Link>

              {/* DOTS */}
              <div className="mt-5 flex justify-center items-center gap-1.5">
                {slides.map((item, index) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActive(index)}
                    aria-label={`Show announcement ${index + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      active === index
                        ? "w-6 bg-blue-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // DEFAULT LOYALTY SLIDES
  // ========================================

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className={`relative w-full max-w-sm sm:max-w-md rounded-3xl bg-gradient-to-br ${slide.color} p-6 sm:p-8 shadow-2xl text-white overflow-hidden border border-white/10`}
      >
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-all backdrop-blur-sm"
          aria-label="Close announcement"
        >
          <X size={18} />
        </button>

        <div className="flex justify-center mb-4 mt-2">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
            {slide.icon}
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-center tracking-tight">
          {slide.title}
        </h2>

        <p className="mt-3 text-sm sm:text-base text-center leading-relaxed text-white/90">
          {slide.description}
        </p>

        <button
          onClick={closePopup}
          className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-slate-900 shadow-lg transition-all hover:bg-gray-100 hover:scale-[1.02] text-sm sm:text-base"
        >
          Continue
        </button>

        <div className="mt-5 flex justify-center items-center gap-1.5">
          {slides.map((item, index) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActive(index)}
              aria-label={`Show announcement ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                active === index
                  ? "w-6 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}