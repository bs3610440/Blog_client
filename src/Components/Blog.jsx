import React, { useEffect, useState } from "react";
import {
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../Components/services/api.js";
import { FiSearch, FiEdit2, FiTrash2, FiX, FiChevronLeft, FiChevronRight, FiCalendar, FiFolder } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { toast, Toaster } from 'react-hot-toast';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    body: "",
    category: "",
  });

  // FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await getBlogs(page, search);
      setBlogs(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch blogs ❌");
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await deleteBlog(id);
      fetchBlogs();
      toast.success("Blog deleted successfully ✅");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete blog ❌");
    }
  };

  // UPDATE
  const handleUpdate = async () => {
    if (!editForm.title.trim() || !editForm.body.trim()) {
      toast.error("Title and body are required!");
      return;
    }

    try {
      await updateBlog(editId, editForm);
      toast.success("Blog updated successfully ✅");
      fetchBlogs();
      setEditId(null);
      setEditForm({ title: "", body: "", category: "" });
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog ❌");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827] px-6 py-8">
      <Toaster position="top-right" reverseOrder={false} />

      {/* EDIT MODAL */}
      {editId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full p-8 transform transition-all animate-slideUp">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ✏️ Edit Blog
              </h2>
              <button
                onClick={() => setEditId(null)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Blog Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="w-full border-2 border-gray-700 p-3 text-white rounded-xl bg-gray-800/50 focus:border-blue-500 focus:outline-none transition-all"
              />

              <textarea
                placeholder="Blog Content"
                value={editForm.body}
                onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                className="w-full border-2 border-gray-700 p-3 text-white rounded-xl bg-gray-800/50 focus:border-blue-500 focus:outline-none transition-all"
                rows={6}
              />

              <input
                type="text"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="w-full border-2 border-gray-700 text-white p-3 rounded-xl bg-gray-800/50 focus:border-blue-500 focus:outline-none transition-all"
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleUpdate}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  Update Blog
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              📚 Blog Feed
            </h1>
            <p className="text-gray-300 mt-2">Discover amazing stories and insights</p>
          </div>

          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs by title, content..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-12 pr-4 py-3 text-white rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 focus:border-blue-500 focus:outline-none transition-all placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      {!loading && blogs.length > 0 && (
        <div className="max-w-7xl mx-auto mb-6 flex justify-between items-center px-4 py-3 bg-white/5 backdrop-blur-sm rounded-xl">
          <span className="text-gray-300">
            Showing {blogs.length} of {totalPages * blogs.length}+ blogs
          </span>
          <span className="text-gray-300">
            Page {page} of {totalPages}
          </span>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-white mt-4 animate-pulse">Loading amazing content...</p>
          </div>
        </div>
      )}

      {/* EMPTY */}
      {!loading && blogs.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-gray-300 text-lg">No blogs found matching your search</p>
          <button
            onClick={() => setSearch("")}
            className="mt-4 text-blue-400 hover:text-blue-300 underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* BLOGS GRID */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={blog._id}
            className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:transform hover:-translate-y-2 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Gradient Header */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity"></div>
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center gap-2 text-white">
                  <FiFolder size={16} />
                  <span className="text-sm font-medium">{blog.category || "Uncategorized"}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h2>

              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                {blog.body}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <FiCalendar size={14} />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>

              <div className="flex gap-2 items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setEditId(blog._id);
                    setEditForm({
                      title: blog.title,
                      body: blog.body,
                      category: blog.category,
                    });
                  }}
                  className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white px-4 py-2 rounded-lg transition-all"
                >
                  <FiEdit2 size={16} />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white px-4 py-2 rounded-lg transition-all"
                >
                  <FiTrash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <FiChevronLeft size={18} />
            Previous
          </button>

          <div className="flex gap-2">
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={`w-10 h-10 rounded-lg transition-all ${
                    page === pageNum
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Next
            <FiChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}