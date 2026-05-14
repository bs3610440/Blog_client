import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const menudata = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
  ];

  const authdata = [
    { name: "Sign Up", href: "/signup" },
    { name: "Log In", href: "/login" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 ">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white text-blue-900 font-bold text-xl px-3 py-1 rounded-xl">
            EDU
          </div>

          <div>
            <h1 className="text-blue-900 text-2xl font-bold">
              LearnHub
            </h1>
            <p className="text-blue-900 text-xs">
              Online Learning Platform
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-blue-900 font-medium">
          {menudata.map((item, index) => (
            <li key={index}>
              <Link
                to={item.href}
                className="hover:text-yellow-300 transition duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/signup">
            <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-blue-600 transition duration-300 shadow-md">
              Sign Up
            </button>
          </Link>

          <Link to="/login">
            <button className="bg-blue-600 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-blue-900 transition duration-300">
              Log In
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-indigo-900 px-6 pb-6">
          <ul className="flex flex-col gap-5 text-white font-medium">
            {menudata.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:text-yellow-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-4 mt-6">
            {authdata.map((item, index) => (
              <Link key={index} to={item.href}>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition duration-300 ${
                    item.name === "Sign Up"
                      ? "bg-yellow-400 text-black hover:bg-yellow-300"
                      : "border border-white text-white hover:bg-white hover:text-blue-900"
                  }`}
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}