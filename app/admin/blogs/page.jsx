"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();

      if (data.success) {
        setBlogs(data.blogs || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen p-16 text-center text-slate-400 font-medium">
        Syncing content management systems...
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen p-4 md:p-8 space-y-6">
      
      {/* Premium Header Panel */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Content Matrix
          </span>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 mt-2 tracking-tight">
            📝 Blog & SEO Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Publish articles, optimize organic discovery parameters, and customize marketing copy indexes.
          </p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="bg-slate-900 hover:bg-indigo-650 text-white px-5 py-3 rounded-xl font-bold text-sm transition shadow-sm w-fit whitespace-nowrap"
        >
          + Create New Article
        </Link>
      </div>

      {/* Main Table Interface Card */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
        
        {blogs.length === 0 ? (
          <div className="p-16 text-center text-slate-400 font-medium tracking-wide">
            No marketing or SEO articles recorded in data fields.
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-bold text-[11px]">
                  <th className="p-4 pl-6">Article Information</th>
                  <th className="p-4">Taxonomy / Category</th>
                  <th className="p-4">Index Status</th>
                  <th className="p-4 pr-6">Timestamp Logs</th>
                  <th className="p-4 pr-6">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                {blogs.map((blog) => (
                  <tr
                    key={blog._id}
                    className="hover:bg-slate-50/50 transition duration-150"
                  >
                    <td className="p-4 pl-6 font-semibold text-slate-900 max-w-[320px] truncate">
                      {blog.title}
                    </td>

                    <td className="p-4 text-slate-500 font-medium text-xs">
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg">
                        {blog.category || "Uncategorized"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide inline-block ${
                          blog.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200/40"
                            : "bg-amber-50 text-amber-700 border border-amber-200/40"
                        }`}
                      >
                        {blog.status || "Draft"}
                      </span>
                    </td>

                    <td className="p-4 pr-6 text-slate-400 font-mono text-xs">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="p-4 pr-6">
                    <div className="flex gap-2">

                    <Link
                    href={`/admin/blogs/edit/${blog._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs"
                    >
                    Edit
                    </Link>

                    <button
                    onClick={async () => {
                    const ok = confirm("Delete this blog?");

                    if (!ok) return;

                    const res = await fetch(
                    `/api/blogs/${blog._id}`,
                    {
                    method: "DELETE",
                    }
                    );

                    const data = await res.json();

                    if (data.success) {
                    loadBlogs();
                    } else {
                    alert("Delete failed");
                    }
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs"
                    >
                    Delete
                    </button>

                    </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}