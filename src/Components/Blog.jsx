import React, { useEffect, useState } from "react";

import {
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../Components/services/api.js";

export default function Blog() {

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(
    { title: "", body: "", category: "", });

  const fetchBlogs = async () => {

    try {

      const res = await getBlogs();

      console.log("BLOGS => ", res.data);

      setBlogs(res.data.data || []);

    } catch (err) {

      console.log(err);

      alert("Failed to fetch blogs ❌");

    } finally {

      setLoading(false);
    }
  };

  const handleDelete = async (id) => {

    try {
      await deleteBlog(id);
      setBlogs(
        blogs.filter((b) => b._id !== id)
      );

      alert("Blog deleted successfully ✅");

    } catch (err) {

      console.log(err);

      alert("Failed to delete blog ❌");
    }
  };

  // UPDATE BLOG
  const handleUpdate = async () => {

    try {

      await updateBlog(editId, editForm);

      alert("Blog updated successfully ✅");

      fetchBlogs();

      setEditId(null);

      setEditForm({
        title: "",
        body: "",
        category: "",
      });

    } catch (err) {

      console.log(err);

      alert("Failed to update blog ❌");
    }
  };

  // USE EFFECT
  useEffect(() => {
    fetchBlogs();
  }, []);

  // SEARCH FILTER
  const filteredBlogs = blogs.filter((blog) =>
    blog.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      {/* EDIT FORM */}
      {editId && (

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg mb-8">

          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            ✏️ Edit Blog
          </h2>

          {/* TITLE */}
          <input
            type="text"
            placeholder="Title"
            value={editForm.title}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                title: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BODY */}
          <textarea
            placeholder="Body"
            value={editForm.body}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                body: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
          />

          {/* CATEGORY */}
          <input
            type="text"
            placeholder="Category"
            value={editForm.category}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                category: e.target.value,
              })
            }
            className="w-full border border-gray-300 p-3 rounded-xl mb-4 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* BUTTONS */}
          <div className="flex gap-4">

            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl"
            >
              Update
            </button>

            <button
              onClick={() => setEditId(null)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">

        <h1 className="text-4xl font-bold text-gray-800">
          📚 Blog Feed
        </h1>

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-4 py-3 rounded-xl w-full md:w-72 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-lg font-medium">
          Loading blogs...
        </p>
      )}

      {/* EMPTY */}
      {!loading && filteredBlogs.length === 0 && (
        <p className="text-center text-gray-500 text-lg">
          No blogs found 😔
        </p>
      )}

      {/* BLOGS */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {filteredBlogs.map((blog) => (

          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 p-5 flex flex-col justify-between"
          >

            {/* TOP */}
            <div>

              {/* TITLE */}
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                {blog.title}
              </h2>

              {/* BODY */}
              <p className="text-gray-600 text-sm leading-6 line-clamp-4">
                {blog.body}
              </p>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 mt-4">

                {Array.isArray(blog.tags) &&
                  blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
              </div>

              {/* CATEGORY */}
              <div className="mt-4">

                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="mt-6 flex gap-3 items-center justify-between">

              <span className="text-xs text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>

              <div className="flex gap-2">

                {/* EDIT BUTTON */}
                <button
                  onClick={() => {

                    setEditId(blog._id);

                    setEditForm({
                      title: blog.title,
                      body: blog.body,
                      category: blog.category,
                    });
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}