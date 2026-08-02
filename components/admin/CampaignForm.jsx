"use client";

import { useState } from "react";

export default function CampaignForm() {
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
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

    setSelectedFile(file);

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      return formData.image;
    }

    try {
      setUploading(true);

      const uploadData = new FormData();
      uploadData.append("file", selectedFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Image upload failed");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter Campaign Title.");
      return;
    }

    if (!selectedFile && !formData.image) {
      alert("Please choose a poster image.");
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
        throw new Error(data.message || "Campaign save failed");
      }

      alert("✅ Campaign Saved Successfully!");

      setFormData({
        title: "",
        description: "",
        image: "",
        buttonText: "Book Now",
        buttonLink: "/book-cab",
        startDate: "",
        endDate: "",
        active: true,
      });

      setSelectedFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");

      const fileInput = document.getElementById(
        "campaign-poster"
      );

      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Campaign Save Error:", error);

      alert(
        `❌ ${error.message || "Something went wrong"}`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 space-y-6"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Create Campaign
          </h2>

          {/* Campaign Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Campaign Title <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base"
              placeholder="Enter campaign title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-950 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all text-sm sm:text-base resize-y"
              rows={4}
              placeholder="Enter campaign description"
            />
          </div>

          {/* Poster Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Campaign Poster
            </label>

            <input
              id="campaign-poster"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
            />

            <p className="text-xs sm:text-sm text-gray-500">
              JPG, PNG, WEBP or AVIF. Maximum size 5 MB.
            </p>
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="bg-gray-50/70 border border-gray-200/80 rounded-xl p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">
                Poster Preview
              </p>

              <div className="w-full max-w-md border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                <img
                  src={preview}
                  alt="Campaign Poster Preview"
                  className="w-full h-auto max-h-[300px] object-contain mx-auto"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (preview) {
                    URL.revokeObjectURL(preview);
                  }

                  setSelectedFile(null);
                  setPreview("");

                  const input = document.getElementById(
                    "campaign-poster"
                  );

                  if (input) {
                    input.value = "";
                  }
                }}
                className="inline-flex items-center text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
              >
                Remove Image
              </button>
            </div>
          )}

          {/* Button */}
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

          {/* Dates */}
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

          {/* Active */}
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

          {/* Save */}
          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || uploading}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-sm transition-all text-center flex items-center justify-center gap-2"
            >
              {(saving || uploading) && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {uploading
                ? "Uploading Poster..."
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