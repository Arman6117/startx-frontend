import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { 
  LogOut, 
  Briefcase, 
  GraduationCap, 
  ChevronDown,
  LayoutDashboard
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const navigate = useNavigate();
  
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  const userInitial = userName ? userName.charAt(0).toUpperCase() : (email ? email.charAt(0).toUpperCase() : "");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/search", title: "Find Job" },
    { path: "/news", title: "BulletinBuzz" },
    { path: "/resume", title: "ResumeAI" },
  ];

  if (token && userRole === 'recruiter') {
    navItems.push({ path: "/post-job", title: "Post a Job" });
    navItems.push({ path: "/my-job", title: "My Jobs" });
  } else if (token && userRole === 'student') {
    navItems.push({ path: "/my-applications", title: "My Applications" });
  }

  const getRoleBadge = () => {
    if (userRole === 'recruiter') {
      return (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-500 text-xs font-bold border border-pink-500/20">
          <Briefcase size={12} /> Recruiter
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20">
        <GraduationCap size={12} /> Student
      </span>
    );
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 xl:px-24 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <nav className="flex justify-between items-center py-4">
        
        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-slate-800">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white text-lg">
            S
          </div>
          <span>STARTX</span>
        </Link>

        <ul className="hidden lg:flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-bold"
                    : "text-gray-600 font-medium hover:text-blue-600 transition-colors"
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <>
              <Link to="/login" className="text-gray-600 font-medium hover:text-black">Log in</Link>
              <Link to="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition-all">Sign up</Link>
            </>
          ) : (
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1 pr-3 rounded-full border border-gray-200 hover:bg-gray-50 transition-all"
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${userRole === 'recruiter' ? 'bg-gradient-to-r from-pink-500 to-rose-500' : 'bg-gradient-to-r from-blue-500 to-cyan-500'}`}>
                  {userInitial}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-gray-500 font-medium leading-none mb-0.5">Welcome</span>
                  <span className={`text-sm font-bold leading-none ${userRole === 'recruiter' ? 'text-pink-600' : 'text-blue-600'}`}>
                    {userName}
                  </span>
                </div>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                      <p className="text-sm font-bold text-gray-800 mb-1">{userName}</p>
                      <p className="text-xs text-gray-500 truncate">{email}</p>
                      <div className="mt-2">
                        {getRoleBadge()}
                      </div>
                    </div>

                    <div className="p-2">
                      <Link 
                        to={userRole === 'recruiter' ? "/my-job" : "/my-applications"}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 text-gray-700 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LayoutDashboard size={18} className="text-gray-400" />
                        <span className="font-medium">
                          {userRole === 'recruiter' ? "Recruiter Dashboard" : "Student Dashboard"}
                        </span>
                      </Link>

                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 transition-colors text-left"
                      >
                        <LogOut size={18} />
                        <span className="font-medium">Log out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-slate-800">
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <ul className="p-4 space-y-2">
              {token && (
                <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${userRole === 'recruiter' ? 'bg-pink-500' : 'bg-blue-500'}`}>
                      {userInitial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">{userName}</p>
                      <p className="text-xs text-gray-500">{email}</p>
                      {getRoleBadge()}
                    </div>
                  </div>
                </div>
              )}

              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl font-medium ${
                        isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                      }`
                    }
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}

              {!token ? (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link to="/login" className="flex justify-center px-4 py-3 border border-gray-200 rounded-xl font-medium">Login</Link>
                  <Link to="/signup" className="flex justify-center px-4 py-3 bg-blue-600 text-white rounded-xl font-medium">Sign up</Link>
                </div>
              ) : (
                <button 
                  onClick={handleLogout}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-xl font-medium"
                >
                  <LogOut size={18} /> Log out
                </button>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
