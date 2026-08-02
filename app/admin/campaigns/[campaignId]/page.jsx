"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditCampaignPage() {
  const params = useParams();
  const router = useRouter();

  const campaignId = params.campaignId;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    buttonText: "Book Now",
    buttonLink: "/book-cab",
    startDate: "",
    endDate: "",
    active: true,
  });

  // ========================================
  // LOAD EXISTING CAMPAIGN
  // ========================================

  useEffect(() => {
    const loadCampaign = async () => {
      try {
        const response = await fetch(
          `/api/admin/campaigns/${campaignId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          alert("Campaign not found.");
          router.push("/admin/campaigns");
          return;
        }

        const campaign = data.campaign;

        setFormData({
          title: campaign.title || "",
          description: campaign.description || "",
          image: campaign.image || "",
          buttonText: campaign.buttonText || "Book Now",
          buttonLink: campaign.buttonLink || "/book-cab",
          startDate: campaign.startDate || "",
          endDate: campaign.endDate || "",
          active: campaign.active ?? true,
        });

        setPreview(campaign.image || "");
      } catch (error) {
        console.error("Load Campaign Error:", error);
        alert("Failed to load campaign.");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      loadCampaign();
    }
  }, [campaignId, router]);

  // ========================================
  // NORMAL INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // POSTER IMAGE UPLOAD
  // ========================================

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    // Local preview immediately
    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Image upload failed"
        );
      }

      setFormData((prev) => ({
        ...prev,
        image: data.imageUrl,
      }));

      setPreview(data.imageUrl);
    } catch (error) {
      console.error("Image Upload Error:", error);

      alert(
        error.message || "Failed to upload poster image."
      );

      setPreview(formData.image || "");
    } finally {
      setUploading(false);
    }
  };

  // ========================================
  // REMOVE POSTER
  // ========================================

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    setPreview("");
  };

  // ========================================
  // UPDATE CAMPAIGN
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (uploading) {
      alert("Please wait for poster upload to finish.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `/api/admin/campaigns/${campaignId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update campaign"
        );
      }

      alert("Campaign Updated Successfully!");

      router.push("/admin/campaigns");
      router.refresh();
    } catch (error) {
      console.error("Update Campaign Error:", error);

      alert(
        error.message || "Failed to update campaign"
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center max-w-sm w-full">
          <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-medium">Loading Campaign...</p>
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <button
            type="button"
            onClick={() => router.push("/admin/campaigns")}
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 mb-4 transition-colors group"
          >
            <span className="transform transition-transform group-hover:-translate-x-1 mr-1">←</span> Back to Campaigns
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">
            Edit Campaign
          </h1>

          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Update promotional campaign details and poster.
          </p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 space-y-6"
        >
          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Campaign Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Summer Special Discount"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write a short description about the campaign..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base resize-y"
            />
          </div>

          {/* POSTER UPLOAD */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Campaign Poster
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                onChange={handleImageChange}
                disabled={uploading}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 disabled:opacity-60 cursor-pointer"
              />
            </div>

            <p className="text-xs sm:text-sm text-gray-500">
              JPG, PNG, WEBP or AVIF. Maximum size 5 MB.
            </p>

            {uploading && (
              <div className="flex items-center gap-2 text-sm text-blue-600 font-medium pt-1">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                Uploading poster...
              </div>
            )}
          </div>

          {/* POSTER PREVIEW */}
          {preview && (
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">
                Poster Preview
              </p>

              <div className="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <img
                  src={preview}
                  alt={formData.title || "Campaign Poster"}
                  className="w-full h-auto max-h-[300px] object-contain mx-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              <button
                type="button"
                onClick={handleRemoveImage}
                className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                Remove Image
              </button>
            </div>
          )}

          {/* BUTTON FIELDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Text
              </label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Button Link
              </label>
              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base"
              />
            </div>
          </div>

          {/* DATES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base bg-white"
              />
            </div>
          </div>

          {/* ACTIVE CHECKBOX */}
          <div className="flex items-center pt-2">
            <label className="relative flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-sm sm:text-base font-semibold text-gray-800">
                Active Campaign
              </span>
            </label>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* ACTIONS */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/admin/campaigns")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-colors text-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-sm transition-all text-center flex items-center justify-center gap-2"
            >
              {saving && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {saving
                ? "Updating..."
                : uploading
                ? "Uploading Poster..."
                : "Update Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}