"use client";

import { useEffect, useState } from "react";
import CampaignForm from "@/components/admin/CampaignForm";
import CampaignTable from "@/components/admin/CampaignTable";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);

  const loadCampaigns = async () => {
    try {
      const res = await fetch("/api/admin/campaigns");
      const data = await res.json();

      if (data.success) {
        setCampaigns(data.campaigns);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Campaign Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage promotional banners and homepage popup campaigns.
          </p>
        </div>
      </div>

      {/* Form */}
      <CampaignForm />

      {/* Table */}
      <CampaignTable campaigns={campaigns} />
    </div>
  );
}