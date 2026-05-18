import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});

// BLOGS
export const getBlogs = (page = 1, search = "") =>
  API.get(`/blogs?page=${page}&limit=2&search=${search}`);

export const createBlog = (data) =>
  API.post("/blog_user", data);

export const updateBlog = (id, data) =>
  API.put(`/update_blog/${id}`, data);

export const deleteBlog = (id) =>
  API.delete(`/delete_blog/${id}`);

// AUTH
export const loginUser = (data) =>
  API.post("/login", data);

export const signupUser = (data) =>
  API.post("/create_user", data);