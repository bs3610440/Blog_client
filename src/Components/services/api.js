import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export const getBlogs = () => API.get("/blogs");
export const createBlog = (data) => API.post("/blog_user", data);
export const updateBlog = (id, data) => API.put(`/update_blog/${id}`, data);
export const deleteBlog = (id) => API.delete(`/delete_blog/${id}`);
export const loginUser = (data) => API.post("/login", data);
export const signupUser = (data) => API.post("/create_user", data);