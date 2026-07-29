"use client";

import { useState } from "react";

export default function NewTourPackagePage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (value) => {
    setTitle(value);

    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setSlug(generatedSlug);
  };

  const handleSubmit = async () => {
    if (!title || !slug || !description) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const res = await fetch("/api/tour-packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          image,
          description,
          price,
          duration: days,
          location,
          status: "Published",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Tour package created successfully ✅");

        setTitle("");
        setSlug("");
        setImage("");
        setPrice("");
        setDays("");
        setLocation("");
        setDescription("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">

      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">

        <div>
          <h1 className="text-3xl font-black text-slate-900">
            🌍 Create Tour Package
          </h1>

          <p className="text-slate-500 mt-2">
            Add new tour packages for customers.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold"
        >
          Save Package
        </button>

      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm space-y-5">

        <div>
          <label className="font-bold block mb-2">
            Package Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="Nagpur to Tadoba Tour Package"
          />
        </div>

        <div>
          <label className="font-bold block mb-2">
            Slug
          </label>

          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="nagpur-to-tadoba-tour-package"
          />
        </div>

        <div>
          <label className="font-bold block mb-2">
            Image URL
          </label>

          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          <div>
            <label className="font-bold block mb-2">
              Price
            </label>

            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border rounded-xl p-3"
              placeholder="₹4999"
            />
          </div>

          <div>
            <label className="font-bold block mb-2">
              Days
            </label>

            <input
              type="text"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border rounded-xl p-3"
              placeholder="2 Days / 1 Night"
            />
          </div>

          <div>
            <label className="font-bold block mb-2">
              Location
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-xl p-3"
              placeholder="Tadoba"
            />
          </div>

        </div>

        <div>
          <label className="font-bold block mb-2">
            Description
          </label>

          <textarea
            rows={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-3"
            placeholder="Write package details..."
          />
        </div>

      </div>

    </div>
  );
}