"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Travel");
  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    fetchBlog();
  }, []);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateBlog = async () => {
    try {
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
        alert("Update failed ❌");
      }
    } catch (error) {
      console.log(error);

      alert("Server Error ❌");
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">

      <h1 className="text-3xl font-bold">
        ✏️ Edit Blog
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

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />

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
        className="bg-green-600 text-white px-6 py-3 rounded-xl"
      >
        Update Blog
      </button>

    </div>
  );
}