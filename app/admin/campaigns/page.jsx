"use client";

import { useEffect, useState } from "react";
import CampaignForm from "@/components/admin/CampaignForm";
import CampaignTable from "@/components/admin/CampaignTable";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========================================
  // LOAD ALL CAMPAIGNS
  // ========================================

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/campaigns", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setCampaigns(data.campaigns || []);
      } else {
        console.error(
          "Failed to load campaigns:",
          data.message
        );
      }
    } catch (error) {
      console.error("Load Campaigns Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Campaign Management
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Create and manage promotional banners and homepage popup campaigns.
        </p>
      </div>

      {/* CREATE CAMPAIGN FORM */}

      <CampaignForm
        onCampaignSaved={loadCampaigns}
      />

      {/* CAMPAIGN LIST */}

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              All Campaigns
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Total Campaigns: {campaigns.length}
            </p>
          </div>

          <button
            type="button"
            onClick={loadCampaigns}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-10 text-center">
            <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />

            <p className="text-gray-500">
              Loading Campaigns...
            </p>
          </div>
        ) : (
          <CampaignTable
            campaigns={campaigns}
            onDeleted={loadCampaigns}
          />
        )}
      </div>
    </div>
  );
}