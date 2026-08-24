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
    image: "",
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
          `/api/admin/campaigns/${campaignId}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
          alert("Campaign not found.");
          router.push("/admin/campaigns");
          return;
        }

        const campaign = data.campaign;

        setFormData({
          image: campaign.image || "",
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
  // INPUT CHANGE
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

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Poster image must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    const oldPreview = preview;

    // Immediate local preview
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
          data.message || "Poster upload failed."
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
        error.message || "Failed to upload poster."
      );

      setPreview(oldPreview);
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

    if (!formData.image) {
      alert("Please upload a campaign poster.");
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
          body: JSON.stringify({
            ...formData,

            // Old database fields safe values
            title: "",
            description: "",
            buttonText: "",
            buttonLink: "",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to update campaign."
        );
      }

      alert("Campaign Poster Updated Successfully!");

      router.push("/admin/campaigns");
      router.refresh();
    } catch (error) {
      console.error("Update Campaign Error:", error);

      alert(
        error.message || "Failed to update campaign."
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
      <div className="flex min-h-[60vh] items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="font-medium text-gray-600">
            Loading Campaign...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // PAGE
  // ========================================
  return (
    <div className="min-h-screen bg-gray-50/50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* HEADER */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/admin/campaigns")}
            className="mb-4 inline-flex items-center text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            ← Back to Campaigns
          </button>

          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Edit Campaign Poster
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Upload and manage your campaign banner.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8"
        >

          {/* POSTER UPLOAD */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Campaign Poster
              </label>

              <p className="mt-1 text-xs text-gray-500">
                Recommended banner size: 1920 × 350 px
              </p>
            </div>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageChange}
              disabled={uploading}
              className="w-full cursor-pointer rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="text-xs text-gray-500">
              JPG, PNG, WEBP or AVIF · Maximum 5 MB
            </p>

            {uploading && (
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                Uploading poster...
              </div>
            )}
          </div>

          {/* POSTER PREVIEW */}
          {preview && (
            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-gray-800">
                    Poster Preview
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Recommended display ratio: 1920 × 350
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveImage}
                  disabled={uploading}
                  className="shrink-0 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>

              {/* 1920 × 350 BANNER PREVIEW */}
              <div className="relative w-full overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="aspect-[192/35] w-full">
                  <img
                    src={preview}
                    alt="Campaign Poster Preview"
                    className="h-full w-full object-cover object-center"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* DATE SECTION */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Start Date
              </label>

              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-950 transition-all focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

          </div>

          {/* ACTIVE */}
          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="h-5 w-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Active Campaign
                </p>

                <p className="text-xs text-gray-500">
                  Enable this poster to display it on the website.
                </p>
              </div>
            </label>
          </div>

          <hr className="border-gray-100" />

          {/* ACTION BUTTONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center">

            <button
              type="button"
              onClick={() => router.push("/admin/campaigns")}
              className="rounded-xl bg-gray-100 px-6 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving || uploading}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {saving && (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              )}

              {saving
                ? "Updating..."
                : uploading
                ? "Uploading Poster..."
                : "Update Campaign Poster"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}