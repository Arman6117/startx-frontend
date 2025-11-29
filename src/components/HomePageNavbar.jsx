import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../libs/utils"; // Assuming you have this util
import { 
  LogOut, 
  Briefcase, 
  GraduationCap, 
  ChevronDown,
  LayoutDashboard
} from "lucide-react";

export default function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userRole = localStorage.getItem("userRole"); // Get role

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const emailInitial = email ? email.charAt(0).toUpperCase() : "";

  // Helper to get Role Badge Styling
  const getRoleBadge = () => {
    if (userRole === 'recruiter') {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-bold border border-pink-500/30">
          <Briefcase size={10} /> Recruiter
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-500/30">
        <GraduationCap size={10} /> Student
      </span>
    );
  };

  return (
    <div className={cn("fixed top-6 inset-x-0 max-w-7xl mx-auto z-50 px-4", className)}>
      <div className="flex justify-between items-center bg-black/40 border border-white/10 shadow-2xl px-6 py-3 rounded-full backdrop-blur-xl w-full transition-all hover:bg-black/50 hover:border-white/20">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-105 transition-transform">
            S
          </div>
          <span className="text-xl font-bold text-white tracking-tight">STARTX</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-1">
          {[
            { name: "Home", path: "/" },
            { name: "Find Job", path: "/search" },
            { name: "BulletinBuzz", path: "/news" },
            { name: "ResumeAI", path: "/resume" },
            // Conditionally render 'Post A Job' only for Recruiters
            ...(userRole === 'recruiter' ? [{ name: "Post A Job", path: "/post-job" }] : [])
          ].map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Section (Auth/Profile) */}
        <div className="flex items-center space-x-4">
          {token ? (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner ${userRole === 'recruiter' ? 'bg-gradient-to-r from-pink-600 to-rose-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'}`}>
                  {emailInitial}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-xs font-bold text-white leading-none mb-0.5">
                    {email.split('@')[0]}
                  </span>
                  {getRoleBadge()}
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-56 bg-slate-900/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
                  >
                    <div className="p-2 space-y-1">
                      <a 
                        href={userRole === 'recruiter' ? "/my-job" : "/my-applications"}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        {userRole === 'recruiter' ? "Recruiter Dashboard" : "Student Dashboard"}
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <a href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Login
              </a>
              <a href="/signup" className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:scale-105 transition-all">
                Sign Up
              </a>
            </div>
          )}

          {/* Mobile Toggle */}
          <button onClick={handleMenuToggler} className="lg:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors">
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-24 left-4 right-4 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden lg:hidden"
          >
            <div className="p-4 space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "Find Job", path: "/search" },
                { name: "BulletinBuzz", path: "/news" },
                { name: "ResumeAI", path: "/resume" },
                ...(userRole === 'recruiter' ? [{ name: "Post A Job", path: "/post-job" }] : [])
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="block px-4 py-3 text-center text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                >
                  {link.name}
                </a>
              ))}
              
              {!token && (
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
                  <a href="/login" className="px-4 py-3 text-center text-gray-300 bg-white/5 rounded-xl hover:bg-white/10">Login</a>
                  <a href="/signup" className="px-4 py-3 text-center font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700">Sign Up</a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
