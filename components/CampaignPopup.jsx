"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CampaignPopup() {
  const [campaigns, setCampaigns] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [closed, setClosed] = useState(false);

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

        if (response.ok && data.success) {
          setCampaigns(data.campaigns || []);
        }
      } catch (error) {
        console.error("Campaign Popup Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCampaigns();
  }, []);

  // ========================================
  // LOADING / NO CAMPAIGN / CLOSED
  // ========================================

  if (
    loading ||
    closed ||
    !campaigns.length ||
    !campaigns[currentIndex]
  ) {
    return null;
  }

  const campaign = campaigns[currentIndex];

  // ========================================
  // CLOSE POPUP
  // ========================================

  const handleClose = () => {
    setClosed(true);
  };

  // ========================================
  // NEXT CAMPAIGN
  // ========================================

  const handleNext = () => {
    if (currentIndex < campaigns.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setClosed(true);
    }
  };

  // ========================================
  // PREVIOUS CAMPAIGN
  // ========================================

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* POPUP BOX */}

      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* CLOSE BUTTON */}

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close campaign"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-2xl text-white shadow-lg transition hover:bg-black"
        >
          ×
        </button>

        {/* POSTER IMAGE */}

        {campaign.image && (
          <div className="w-full bg-gray-100">
            <img
              src={campaign.image}
              alt={campaign.title || "Campaign Poster"}
              className="h-auto max-h-[65vh] w-full object-contain"
            />
          </div>
        )}

        {/* CONTENT */}

        <div className="p-5 sm:p-6">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {campaign.title}
          </h2>

          {campaign.description && (
            <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
              {campaign.description}
            </p>
          )}

          {/* ACTION BUTTONS */}

          <div className="mt-5 flex items-center gap-3">
            {/* PREVIOUS BUTTON */}

            {campaigns.length > 1 && currentIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                Previous
              </button>
            )}

            {/* CAMPAIGN BUTTON */}

            <Link
              href={campaign.buttonLink || "/book-cab"}
              onClick={handleClose}
              className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              {campaign.buttonText || "Book Now"}
            </Link>

            {/* NEXT BUTTON */}

            {campaigns.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                {currentIndex < campaigns.length - 1
                  ? "Next"
                  : "Close"}
              </button>
            )}
          </div>

          {/* CAMPAIGN COUNT */}

          {campaigns.length > 1 && (
            <p className="mt-4 text-center text-xs text-gray-400">
              {currentIndex + 1} of {campaigns.length}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}