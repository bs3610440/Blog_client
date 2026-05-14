import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home.jsx";
import Blog from "./Components/Blog.jsx";
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        ✅ default
        <Route path="/" element={<Home />} />

        {/* pages */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        
        
      </Routes>
    </BrowserRouter>
  );
}