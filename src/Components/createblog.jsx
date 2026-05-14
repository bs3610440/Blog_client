import React, { useEffect, useState } from "react";
import { getBlogs, deleteBlog } from "./services/api";
import { useNavigate } from "react-router-dom";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id);

      alert("Blog Deleted ✅");

      fetchBlogs();
    } catch (err) {
      alert("Delete Failed ❌");
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">All Blogs</h1>

      <div className="grid gap-5">
        {blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded shadow">

            <h2 className="text-2xl font-bold">{blog.title}</h2>

            <p>{blog.body}</p>

            <p className="text-blue-500">
              {blog.category}
            </p>

            <div className="flex gap-3 mt-3">

              {/* Update Button */}
              <button
                onClick={() => handleUpdate(blog._id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(blog._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}