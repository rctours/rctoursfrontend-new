"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBlogPage() {
  const router = useRouter();

  // Basic Details
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Travel");
  const [status, setStatus] = useState("Draft");

  // Strong SEO Tags
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState("");

  // Auto-generate slug from title
  const handleTitleChange = (value) => {
    setTitle(value);
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/-+/g, "-"); // Collapse dashes
    setSlug(generatedSlug);
    if (!metaTitle) {
    setMetaTitle(value);
  }
  };

  const handleSubmit = async () => {
    if (!title || !slug || !content) {
      alert("Title, Slug, and Content are required!");
      return;
    }

    try {
      const res = await fetch("/api/admin/blogs", {
        method: "POST",
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
          metaTitle: metaTitle || title, // fallback to title if empty
          metaDescription: metaDescription || excerpt, // fallback to excerpt if empty
          keywords,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Blog created successfully with SEO tags!");
        router.push("/admin/blogs");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Error while saving blog");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Content Editor
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            ✍️ Compose New SEO Article
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Write high-retention content optimized for search engines and organic discoverability.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-slate-900 hover:bg-indigo-650 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-sm w-fit whitespace-nowrap"
        >
          Publish Article Log
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Content Editor */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-black text-slate-900 border-b border-slate-50 pb-2">
            📄 Article Content Structure
          </h2>
          
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Blog Title Heading</label>
            <input
              type="text"
              placeholder="e.g., Best Taxi Service in Nagpur for Outstation Trips"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">URL Slug Reference (Auto-generated)</label>
            <input
              type="text"
              placeholder="best-taxi-service-in-nagpur"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-mono font-semibold text-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Featured Media / Image URL</label>
            <input
              type="text"
              placeholder="https://example.com/images/nagpur-cab.jpg"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Short Card Excerpt / Snippet</label>
            <textarea
            placeholder="Write a brief intro..."
            value={excerpt}
            onChange={(e) => {
            setExcerpt(e.target.value);

            if (!metaDescription) {
            setMetaDescription(e.target.value);
            }
            }}
              rows="3"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Main Article Body Payload</label>
            <textarea
              placeholder="Start drafting rich text operations copy records here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="10"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white transition font-sans"
            />
          </div>
        </div>

        {/* Right Side: SEO & Settings */}
        <div className="space-y-6">
          
          {/* Classification Settings Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-slate-900 border-b border-slate-50 pb-2">
              ⚙️ System Classification
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Taxonomy Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none bg-white focus:border-indigo-500 transition"
              >
                <option value="Travel">Travel / Tourism</option>
                <option value="Taxi">Taxi Routing</option>
                <option value="Tour">Special Tour Packs</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Indexation Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none bg-white focus:border-indigo-500 transition"
              >
                <option value="Draft">Draft / Restrained</option>
                <option value="Published">Published / Live</option>
              </select>
            </div>
          </div>

          {/* Google SEO Card */}
          <div className="bg-white border-t-4 border-t-indigo-500 border-x border-b border-slate-100 rounded-3xl p-6 shadow-sm space-y-4">
            <h2 className="text-base font-black text-indigo-950 border-b border-slate-50 pb-2">
              🔍 Google Engine Optimization
            </h2>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                Meta Crawler Title <span className="text-slate-300 font-normal">(Opt 60 Chars)</span>
              </label>
              <input
                type="text"
                placeholder="Google Search Result Heading"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                Meta Description Tag <span className="text-slate-300 font-normal">(Opt 160 Chars)</span>
              </label>
              <textarea
                placeholder="Write a highly targeted organic search snippet summary..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                rows="3"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">
                Target Keyword Strings <span className="text-slate-300 font-normal">(Comma Splitted)</span>
              </label>
              <input
                type="text"
                placeholder="nagpur taxi, outstation cab service, etc."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-medium outline-none focus:border-indigo-500 focus:bg-white transition text-slate-600"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}