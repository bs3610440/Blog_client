import React, { useState } from "react";
import { loginUser } from "../Components/services/api.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
   const res = await axios.post(
  "http://localhost:5000/login",
  form
);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userid", res.data.user._id);

      alert("Login Successful ✅");

      // FORM CLEAR
      setForm({
        email: "",
        password: "",
      });

      navigate("/blog");

    } catch (err) {
      console.log(err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 items-center justify-center relative overflow-hidden">

        {/* Background Glow */}
        <div className="absolute w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-blue-400 opacity-30 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-center px-10">

          {/* GIF */}
          <img
            src="https://media.giphy.com/media/L8K62iTDkzGX6/giphy.gif"
            alt="online class"
            className="w-[400px] mx-auto rounded-3xl shadow-2xl"
          />

          <h1 className="text-white text-4xl font-bold mt-8">
            Learn Anytime, Anywhere 🚀
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            Join thousands of students learning coding,
            development, and technology online.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome Back 👋
            </h2>

            <p className="text-gray-500 mt-2">
              Login to continue your learning journey
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            autoComplete="off"
          >

            {/* EMAIL */}
            <div>
              <label className="text-gray-700 font-medium">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={form.email}
                autoComplete="off"
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-gray-700 font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={form.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right">
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* BUTTON */}
            <button className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-3 rounded-xl font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg">
              Login
            </button>
          </form>

          {/* SIGNUP */}
          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-700 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}