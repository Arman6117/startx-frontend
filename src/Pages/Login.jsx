import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { AtSign, Lock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const initialRole = location.state?.defaultRole || "student";
  const [viewMode, setViewMode] = useState(initialRole); 
  
  const from = location.state?.from?.pathname || '/search';

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/search');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`, {
        email,
        password,
      });
  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('userName', response.data.name);
      
      if (response.data.role) {
        localStorage.setItem('userRole', response.data.role);
      }
  
      const expiresIn = response.data.expiresIn;
      let expirationTime = new Date().getTime() + 1 * 60 * 60 * 1000; 
      if (expiresIn && expiresIn.includes('h')) {
         const hours = parseInt(expiresIn.replace('h', ''), 10);
         expirationTime = new Date().getTime() + hours * 60 * 60 * 1000;
      }
      localStorage.setItem('expirationTime', expirationTime.toString());
  
      navigate(from, { replace: true });

    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const theme = {
    student: {
      color: "blue",
      gradient: "from-blue-600 to-cyan-500",
      bg: "from-slate-950 via-blue-950 to-slate-900",
      welcomeText: "Welcome Back, Student",
      subText: "Ready to find your next big opportunity?"
    },
    recruiter: {
      color: "pink",
      gradient: "from-pink-600 to-rose-500",
      bg: "from-slate-950 via-purple-950 to-slate-900",
      welcomeText: "Welcome Back, Recruiter",
      subText: "Ready to hire the next big talent?"
    }
  };

  const currentTheme = theme[viewMode];

  return (
    <div className={`min-h-screen relative bg-gradient-to-br ${currentTheme.bg} flex items-center justify-center p-4 overflow-hidden transition-colors duration-700`}>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20 bg-${currentTheme.color}-500`} />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl relative z-10"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
          
          <div className="hidden md:flex relative p-12 flex-col justify-between bg-slate-900/40">
            <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-10`} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-2xl font-bold text-white mb-12">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentTheme.gradient} flex items-center justify-center`}>S</div>
                STARTX
              </div>
              
              <motion.div key={viewMode} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-4xl font-black text-white mb-4 leading-tight">
                  {currentTheme.welcomeText}
                </h1>
                <p className="text-slate-300 text-lg">
                  {currentTheme.subText}
                </p>
              </motion.div>
            </div>

            <div className="relative z-10 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
              <p className="text-sm text-slate-400 mb-3">Not a {viewMode}? Switch view:</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setViewMode('student')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'student' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                  Student
                </button>
                <button 
                  onClick={() => setViewMode('recruiter')}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${viewMode === 'recruiter' ? 'bg-pink-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                >
                  Recruiter
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
              <p className="text-slate-400 mb-8">Enter your credentials to access your account.</p>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 mb-6 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-slate-300">Password</label>
                    <button type="button" className="text-xs text-slate-400 hover:text-white transition-colors">
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="group relative w-full mt-6"
                  disabled={loading}
                >
                  <div className={`absolute -inset-1 bg-gradient-to-r ${currentTheme.gradient} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`} />
                  <div className={`relative w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r ${currentTheme.gradient} text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all`}>
                    {loading ? (
                      <ClipLoader size={20} color={"#fff"} loading={loading} />
                    ) : (
                      <>
                        Login to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>
              
              <div className="text-center mt-8">
                <p className="text-sm text-slate-400">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => navigate("/signup")} 
                    className={`text-${currentTheme.color}-400 font-semibold hover:underline`}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
