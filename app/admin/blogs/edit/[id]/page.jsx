"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Travel");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    if (params?.id) {
      fetchBlog();
    }
  }, [params?.id]);

  const fetchBlog = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();

      if (data.success) {
        const blog = data.blogs.find(
          (b) => b._id === params.id
        );

        if (blog) {
          setTitle(blog.title || "");
          setSlug(blog.slug || "");
          setImage(blog.image || "");
          setExcerpt(blog.excerpt || "");
          setContent(blog.content || "");
          setCategory(blog.category || "Travel");
          setStatus(blog.status || "Draft");
        }
      }
    } catch (error) {
      console.error("Blog fetch error:", error);
      alert("Failed to load blog");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.imageUrl) {
        setImage(data.imageUrl);
        alert("Image uploaded successfully ✅");
      } else {
        alert(data.message || "Image upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const updateBlog = async () => {
    try {
      setUpdating(true);

      const res = await fetch(
        `/api/blogs/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            slug,
            image,
            excerpt,
            content,
            category,
            status,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Blog updated successfully ✅");
        router.push("/admin/blogs");
      } else {
        alert(data.message || "Update failed");
      }
    } catch (error) {
      console.error("Blog update error:", error);
      alert("Something went wrong while updating");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading blog...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-5">
      <h1 className="text-2xl md:text-3xl font-bold">
        Edit Blog
      </h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />

      <input
        type="text"
        placeholder="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />

      {/* IMAGE UPLOAD */}
      <div className="border rounded-xl p-4 space-y-3">
        <label className="block font-semibold">
          Blog Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="w-full border p-3 rounded-xl"
        />

        {uploading && (
          <p className="text-sm text-blue-600">
            Uploading image...
          </p>
        )}

        {image && (
          <div className="space-y-2">
            <p className="text-sm text-gray-500">
              Current Image
            </p>

            <img
              src={image}
              alt="Blog preview"
              className="w-full max-w-md h-56 object-cover rounded-xl border"
            />

            <input
              type="text"
              placeholder="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full border p-3 rounded-xl text-sm"
            />
          </div>
        )}
      </div>

      <textarea
        rows={3}
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />

      <textarea
        rows={12}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-3 rounded-xl"
      >
        <option>Travel</option>
        <option>Taxi</option>
        <option>Tour</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border p-3 rounded-xl"
      >
        <option>Draft</option>
        <option>Published</option>
      </select>

      <button
        onClick={updateBlog}
        disabled={updating || uploading}
        className="bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold"
      >
        {updating
          ? "Updating..."
          : uploading
          ? "Please wait..."
          : "Update Blog"}
      </button>
    </div>
  );
}