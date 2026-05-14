import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {

  const [search, setSearch] = useState("");

  const courses = [
    {
      title: "Web Development",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      students: "12K+ Students",
    },
    {
      title: "Cyber Security",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      students: "8K+ Students",
    },
    {
      title: "Data Science",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      students: "10K+ Students",
    },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#111827]" />

        {/* GLOW */}
        <div className="absolute top-[-150px] left-[-120px] w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[140px]" />

        <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[140px]" />

        {/* GRID */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-xl px-5 py-3 rounded-full">

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-slate-300 text-sm tracking-wide">
                Trusted By 15,000+ Students
              </span>

            </div>

            <h1 className="mt-10 text-6xl md:text-8xl font-black leading-[0.95]">

              Learn <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Modern
              </span>

              <br />

              Skills Online

            </h1>

            <p className="mt-8 text-lg text-slate-400 leading-8 max-w-2xl">

              Master coding, cybersecurity, AI,
              development, and trending technologies
              with premium live classes, projects,
              certifications, and mentorship.

            </p>

            {/* SEARCH */}
            <div className="mt-10 relative max-w-2xl">

              <input
                type="text"
                placeholder="Search courses, technologies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/10 backdrop-blur-xl px-7 py-5 rounded-2xl outline-none text-lg placeholder:text-slate-400 focus:border-cyan-400 transition-all duration-300"
              />

              <button className="absolute right-3 top-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl">

                Search

              </button>

            </div>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">

              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-[0_10px_40px_rgba(6,182,212,0.4)]">

                Explore Courses

              </button>

              <button className="border border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 rounded-2xl font-semibold hover:bg-white/10 transition-all duration-300">

                Watch Demo

              </button>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-10 mt-16">

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  15K+
                </h2>

                <p className="text-slate-400 mt-2">
                  Students
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  250+
                </h2>

                <p className="text-slate-400 mt-2">
                  Courses
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black text-cyan-400">
                  98%
                </h2>

                <p className="text-slate-400 mt-2">
                  Success
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">

            {/* RINGS */}
            <div className="absolute w-[550px] h-[550px] border border-cyan-500/20 rounded-full"></div>

            <div className="absolute w-[430px] h-[430px] border border-blue-500/20 rounded-full"></div>

            {/* CARD */}
            <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[40px] overflow-hidden shadow-[0_20px_100px_rgba(0,0,0,0.7)] max-w-xl">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
                alt="student"
                className="w-full h-[700px] object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* FLOATING */}
              <div className="absolute top-8 left-8 bg-white/10 backdrop-blur-xl border border-white/10 px-5 py-4 rounded-2xl">

                <p className="text-slate-300 text-sm">
                  Live Classes
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  120+
                </h2>

              </div>

              <div className="absolute top-8 right-8 bg-cyan-400 text-black font-bold px-5 py-4 rounded-2xl shadow-2xl">

                ⭐ 4.9 Rating

              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8">

                <div className="bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6">

                  <p className="text-cyan-400 text-sm uppercase tracking-[4px] font-semibold">
                    Featured Program
                  </p>

                  <h2 className="text-4xl font-black mt-3">

                    Full Stack <br />
                    Development

                  </h2>

                  <p className="text-slate-300 mt-4 leading-7">

                    Learn React, Node.js, MongoDB,
                    APIs, authentication, and build
                    production-ready projects.

                  </p>

                  {/* FEATURES */}
                  <div className="grid grid-cols-2 gap-4 mt-6">

                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                      💻 Live Projects
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                      🎯 Job Ready
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                      📜 Certification
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-2xl p-4">
                      🚀 Career Support
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* COURSES */}
      <section className="py-28 px-6 bg-[#020617]">

        <div className="max-w-7xl mx-auto">

          <div className="text-center">

            <p className="text-cyan-400 uppercase tracking-[4px] text-sm">
              Popular Programs
            </p>

            <h2 className="text-5xl md:text-6xl font-black mt-5">

              Explore Top <br />
              Online Courses

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-10 mt-20">

            {courses.map((course, index) => (

              <div
                key={index}
                className="group bg-white/5 border border-white/10 rounded-[32px] overflow-hidden backdrop-blur-xl hover:-translate-y-4 transition-all duration-500 shadow-2xl"
              >

                {/* IMAGE */}
                <div className="overflow-hidden">

                  <img
                    src={course.image}
                    alt={course.title}
                    className="h-72 w-full object-cover group-hover:scale-110 transition-all duration-700"
                  />

                </div>

                {/* CONTENT */}
                <div className="p-8">

                  <div className="flex items-center justify-between">

                    <span className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-full text-sm">
                      Bestseller
                    </span>

                    <span className="text-slate-400 text-sm">
                      {course.students}
                    </span>

                  </div>

                  <h3 className="text-3xl font-bold mt-6">

                    {course.title}

                  </h3>

                  <p className="text-slate-400 mt-5 leading-7">

                    Learn from beginner to advanced level
                    with practical projects and mentorship.

                  </p>

                  <button className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">

                    Enroll Now

                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-28 px-6 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          <h2 className="text-5xl md:text-7xl font-black leading-tight">

            Ready To Start <br />
            Your Journey?

          </h2>

          <p className="text-slate-400 text-lg mt-8 leading-8">

            Join thousands of students learning modern skills
            and building successful careers online.

          </p>

          <Link to="/signup">

            <button className="mt-10 bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-5 rounded-2xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-[0_10px_50px_rgba(6,182,212,0.4)]">

              Join Now 🚀

            </button>

          </Link>

        </div>

      </section>

    </div>
  );
}