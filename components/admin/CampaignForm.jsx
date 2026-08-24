"use client";

import { useState } from "react";

export default function CampaignForm({ onCampaignSaved }) {
  const [formData, setFormData] = useState({
    image: "",
    campaignType: "popup",
    startDate: "",
    endDate: "",
    active: true,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imageSize, setImageSize] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ========================================
  // CAMPAIGN IMAGE REQUIREMENTS
  // ========================================

  const getImageRequirement = () => {
    if (formData.campaignType === "popup") {
      return {
        label: "Homepage Popup",
        width: 1080,
        height: 1350,
        ratioText: "4:5",
      };
    }

    return {
      label: "Homepage Banner",
      width: 1920,
      height: 350,
      ratioText: "192:35",
    };
  };

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
  // CAMPAIGN TYPE CHANGE
  // ========================================

  const handleCampaignTypeChange = (type) => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(null);
    setPreview("");
    setImageSize("");

    setFormData((prev) => ({
      ...prev,
      campaignType: type,
      image: "",
    }));

    const input = document.getElementById("campaign-poster");

    if (input) {
      input.value = "";
    }
  };

  // ========================================
  // IMAGE CHANGE
  // ANY IMAGE SIZE IS ALLOWED
  // BACKEND WILL AUTO CONVERT THE IMAGE
  // ========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      e.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be smaller than 10 MB.");
      e.target.value = "";
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    const img = new Image();

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      // ANY SIZE IMAGE ACCEPTED
      setSelectedFile(file);
      setPreview(objectUrl);
      setImageSize(`${width} × ${height}px`);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      alert("Unable to read this image file.");

      e.target.value = "";
    };

    img.src = objectUrl;
  };

  // ========================================
  // UPLOAD IMAGE
  // ========================================

  const uploadImage = async () => {
    if (!selectedFile) {
      return formData.image;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();

      uploadData.append("file", selectedFile);

      // IMPORTANT:
      // Backend will use this to automatically
      // convert image to correct campaign size.
      uploadData.append(
        "campaignType",
        formData.campaignType
      );

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

      return data.imageUrl;
    } finally {
      setUploading(false);
    }
  };

  // ========================================
  // SUBMIT CAMPAIGN
  // ========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile && !formData.image) {
      alert("Please choose a campaign image.");
      return;
    }

    try {
      setSaving(true);

      const imageUrl = await uploadImage();

      if (!imageUrl) {
        alert("Image upload failed.");
        return;
      }

      const campaignData = {
        ...formData,
        image: imageUrl,

        // OLD DATABASE FIELDS
        // API compatibility ke liye
        title: "",
        description: "",
        buttonText: "",
        buttonLink: "",
      };

      const response = await fetch("/api/admin/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Campaign save failed"
        );
      }

      alert("✅ Campaign Saved Successfully!");

      if (onCampaignSaved) {
        onCampaignSaved();
      }

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setFormData({
        image: "",
        campaignType: "popup",
        startDate: "",
        endDate: "",
        active: true,
      });

      setSelectedFile(null);
      setPreview("");
      setImageSize("");

      const fileInput =
        document.getElementById("campaign-poster");

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Campaign Save Error:", error);

      alert(
        `❌ ${
          error.message || "Something went wrong"
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // REMOVE IMAGE
  // ========================================

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(null);
    setPreview("");
    setImageSize("");

    setFormData((prev) => ({
      ...prev,
      image: "",
    }));

    const input =
      document.getElementById("campaign-poster");

    if (input) {
      input.value = "";
    }
  };

  const requirement = getImageRequirement();

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 space-y-6"
        >
          {/* HEADER */}

          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
              Create Campaign
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Choose where the campaign image should appear
              on the website.
            </p>
          </div>

          {/* CAMPAIGN DISPLAY LOCATION */}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Campaign Display Location
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* POPUP */}

              <label
                className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                  formData.campaignType === "popup"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="campaignType"
                    value="popup"
                    checked={
                      formData.campaignType === "popup"
                    }
                    onChange={() =>
                      handleCampaignTypeChange("popup")
                    }
                    className="mt-1 w-4 h-4 accent-blue-600"
                  />

                  <div>
                    <p className="font-bold text-gray-900">
                      Homepage Popup
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Website open hote hi campaign popup
                      ke form me dikhega.
                    </p>

                    <p className="text-xs font-semibold text-blue-700 mt-3">
                      Final Size: 1080 × 1350 px
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Any image size can be uploaded.
                      It will be converted automatically.
                    </p>
                  </div>
                </div>
              </label>

              {/* BANNER */}

              <label
                className={`cursor-pointer rounded-2xl border-2 p-5 transition ${
                  formData.campaignType === "banner"
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="campaignType"
                    value="banner"
                    checked={
                      formData.campaignType === "banner"
                    }
                    onChange={() =>
                      handleCampaignTypeChange("banner")
                    }
                    className="mt-1 w-4 h-4 accent-blue-600"
                  />

                  <div>
                    <p className="font-bold text-gray-900">
                      Homepage Banner
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Homepage ke andar horizontal banner
                      ke form me campaign dikhega.
                    </p>

                    <p className="text-xs font-semibold text-blue-700 mt-3">
                      Final Size: 1920 × 350 px
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Any image size can be uploaded.
                      It will be converted automatically.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* CAMPAIGN IMAGE */}

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Campaign Image
              </label>

              <p className="text-xs text-gray-500 mt-1">
                You can upload any image size. It will be
                automatically converted to the correct campaign size.
              </p>
            </div>

            <input
              id="campaign-poster"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleImageChange}
              disabled={uploading || saving}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            />

            <div className="rounded-xl bg-blue-50 border border-blue-100 p-4">
              <p className="text-sm font-semibold text-blue-800">
                {requirement.label}
              </p>

              <p className="text-xs sm:text-sm text-blue-700 mt-2">
                Final image size:{" "}
                <strong>
                  {requirement.width} × {requirement.height} px
                </strong>
              </p>

              <p className="text-xs text-blue-600 mt-2">
                Any image size is accepted. JPG, PNG, WEBP
                or AVIF. Maximum original size 10 MB.
              </p>
            </div>

            {uploading && (
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                Converting and uploading image...
              </div>
            )}
          </div>

          {/* IMAGE PREVIEW */}

          {preview && (
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-700">
                    Image Preview
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Original image: {imageSize}
                  </p>
                </div>

                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
                  {formData.campaignType === "popup"
                    ? "Will convert to 1080 × 1350"
                    : "Will convert to 1920 × 350"}
                </span>
              </div>

              <div
                className={`w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm ${
                  formData.campaignType === "popup"
                    ? "max-w-sm mx-auto"
                    : ""
                }`}
              >
                {formData.campaignType === "popup" ? (
                  <div className="aspect-[4/5]">
                    <img
                      src={preview}
                      alt="Campaign Preview"
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                ) : (
                  <div className="aspect-[192/35]">
                    <img
                      src={preview}
                      alt="Campaign Preview"
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleRemoveImage}
                disabled={uploading || saving}
                className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
              >
                Remove Image
              </button>
            </div>
          )}

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

          {/* ACTIVE CAMPAIGN */}

          <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50 px-4 py-4">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Active Campaign
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Enable this campaign image to display it
                  on the website.
                </p>
              </div>
            </label>
          </div>

          <hr className="border-gray-100 my-4" />

          {/* SAVE */}

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-sm transition-all text-center flex items-center justify-center gap-2"
            >
              {(saving || uploading) && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}

              {uploading
                ? "Converting Image..."
                : saving
                ? "Saving Campaign..."
                : "Save Campaign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}