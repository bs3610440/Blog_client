import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // PASSWORD MATCH CHECK
    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match ❌");
    }

    try {

      // API CALL
      await axios.post("http://localhost:5000/create_user", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Account Created Successfully ✅");

      // FORM CLEAR
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");

    } catch (err) {
      console.log(err.response?.data);

      
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 items-center justify-center relative overflow-hidden">

        {/* Glow Effects */}
        <div className="absolute w-72 h-72 bg-pink-500 opacity-30 rounded-full blur-3xl top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-cyan-400 opacity-30 rounded-full blur-3xl bottom-10 right-10"></div>

        <div className="relative z-10 text-center px-10">

          {/* GIF */}
          <img
            src="https://media.giphy.com/media/f3iwJFOVOwuy7K6FFw/giphy.gif"
            alt="signup"
            className="w-[420px] mx-auto rounded-3xl shadow-2xl"
          />

          <h1 className="text-white text-4xl font-bold mt-8">
            Start Your Learning Journey 📚
          </h1>

          <p className="text-gray-300 mt-4 text-lg">
            Create your account and access premium courses,
            live classes, notes, and coding tutorials.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Create Account 🚀
            </h2>

            <p className="text-gray-500 mt-2">
              Join our online learning platform
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            autoComplete="off"
          >

            {/* NAME */}
            <div>
              <label className="text-gray-700 font-medium">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                value={form.name}
                autoComplete="off"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

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
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Create password"
                required
                value={form.password}
                autoComplete="new-password"
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-gray-700 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                value={form.confirmPassword}
                autoComplete="new-password"
                onChange={(e) =>
                  setForm({
                    ...form,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* TERMS */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" required />
              <p>
                I agree to the Terms & Conditions
              </p>
            </div>

            {/* BUTTON */}
            <button className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-3 rounded-xl font-semibold text-lg hover:scale-105 transition duration-300 shadow-lg">
              Create Account
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-700 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}