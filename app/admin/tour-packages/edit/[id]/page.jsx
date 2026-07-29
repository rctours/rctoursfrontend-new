"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTourPackagePage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    fetchPackage();
  }, []);

  const fetchPackage = async () => {
  try {

    console.log("ID:", params.id);

    const res = await fetch(`/api/tour-packages/${params.id}`);

    const data = await res.json();

    console.log("API DATA:", data);

    if (data.success) {
      const pkg = data.package;

      setTitle(pkg.title || "");
      setSlug(pkg.slug || "");
      setImage(pkg.image || "");
      setPrice(pkg.price || "");
      setDuration(pkg.duration || "");
      setLocation(pkg.location || "");
      setDescription(pkg.description || "");
      setStatus(pkg.status || "Draft");
    }

  } catch (error) {
    console.log(error);
    alert("Package load failed");
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/tour-packages/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          image,
          price,
          duration,
          location,
          description,
          status,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Package updated successfully");
        router.push("/admin/tour-packages");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        Loading package...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8">

        <h1 className="text-3xl font-black text-slate-900 mb-8">
          ✏️ Edit Tour Package
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Package Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border rounded-xl p-3"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-xl p-3"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-xl p-3"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>

        </div>

        <textarea
          placeholder="Package Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={8}
          className="border rounded-xl p-3 w-full mt-5"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
        >
          Update Package
        </button>

      </div>
    </div>
  );
}