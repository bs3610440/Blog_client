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

  // PAGINATION
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

      console.log("BLOGS => ", res.data);

      setBlogs(res.data.data || []);

      setTotalPages(res.data.totalPages || 1);

    } catch (err) {

      console.log(err);

      alert("Failed to fetch blogs ❌");

    } finally {

      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (!confirmDelete) return;

    try {

      await deleteBlog(id);

      fetchBlogs();

      alert("Blog deleted successfully ✅");

    } catch (err) {

      console.log(err);

      alert("Failed to delete blog ❌");
    }
  };

  // UPDATE
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

  // FETCH ON PAGE CHANGE
  useEffect(() => {

    fetchBlogs();

  }, [page, search]);

  return (
    <div className="min-h-screen bg-[#020617] px-6 py-8">

      {/* EDIT FORM */}
      {editId && (

        <div className="max-w-3xl mx-auto bg-[#111827] p-6 rounded-2xl shadow-lg mb-8">

          <h2 className="text-3xl font-bold mb-6 text-white">
            ✏️ Edit Blog
          </h2>

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
            className="w-full border p-3 text-white rounded-xl mb-4 bg-transparent"
          />

          <textarea
            placeholder="Body"
            value={editForm.body}
            onChange={(e) =>
              setEditForm({
                ...editForm,
                body: e.target.value,
              })
            }
            className="w-full border p-3 text-white rounded-xl mb-4 bg-transparent"
            rows={5}
          />

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
            className="w-full border text-white p-3 rounded-xl mb-4 bg-transparent"
          />

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

        <h1 className="text-4xl font-bold text-white">
          📚 Blog Feed
        </h1>

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border px-4 py-3 text-white rounded-xl w-full md:w-72 bg-transparent"
        />
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-white text-lg">
          Loading blogs...
        </p>
      )}

      {/* EMPTY */}
      {!loading && blogs.length === 0 && (
        <p className="text-center text-gray-400 text-lg">
          No blogs found 😔
        </p>
      )}

      {/* BLOGS */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-6">

        {blogs.map((blog) => (

          <div
            key={blog._id}
            className="bg-gray-800 rounded-2xl shadow-md p-5 flex flex-col justify-between"
          >

            <div>

              <h2 className="text-2xl font-bold text-white mb-3">
                {blog.title}
              </h2>

              <p className="text-white text-sm leading-6 line-clamp-4">
                {blog.body}
              </p>

              <div className="mt-4">

                <span className="bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
            </div>

            <div className="mt-6 flex gap-3 items-center justify-between">

              <span className="text-xs text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()}
              </span>

              <div className="flex gap-2">

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

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-10">

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-700 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-white">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-5 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}