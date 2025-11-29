import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AtSign, Lock, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Briefcase, GraduationCap } from "lucide-react"; 
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // Default state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      navigate('/search');
    }
  }, [navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        email,
        password,
        role 
      });
      
      toast.success(`Successfully signed up as a ${role}! Redirecting...`, {
        style: {
          background: role === 'recruiter' ? '#EC4899' : '#3B82F6',
          color: '#fff',
        },
      });
      
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data.error || 'User already exists.');
      } else {
        setError('Error during signup. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Dynamic Content based on Role
  const roleContent = {
    student: {
      title: "Start Your Career",
      subtitle: "Join millions of students finding their dream jobs.",
      features: [
        "AI-Powered Resume Analysis",
        "Smart Job Recommendations",
        "One-Click Applications",
        "Career Mentorship Resources"
      ],
      color: "blue",
      gradient: "from-blue-600 to-cyan-500",
      bgGradient: "from-slate-950 via-blue-950 to-slate-900",
      icon: GraduationCap
    },
    recruiter: {
      title: "Hire Top Talent",
      subtitle: "Connect with the best candidates for your company.",
      features: [
        "Post Unlimited Jobs",
        "AI Candidate Matching",
        "Advanced Application Tracking",
        "Company Branding Tools"
      ],
      color: "pink",
      gradient: "from-pink-600 to-rose-500",
      bgGradient: "from-slate-950 via-purple-950 to-slate-900",
      icon: Briefcase
    }
  };

  const currentContent = roleContent[role];

  return (
    <div className={`min-h-screen relative bg-gradient-to-br ${currentContent.bgGradient} flex items-center justify-center p-4 overflow-hidden transition-colors duration-700`}>
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20 bg-${currentContent.color}-500`} />
        <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000 opacity-20 bg-${role === 'student' ? 'purple' : 'blue'}-500`} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <motion.div 
        key={role} // Triggers animation on role switch
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full mt-10 max-w-6xl relative z-10"
      >
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side - Dynamic Features */}
          <div className={`hidden lg:flex flex-col justify-center p-12 relative overflow-hidden bg-gradient-to-br ${role === 'student' ? 'from-blue-900/40 to-slate-900/40' : 'from-pink-900/40 to-slate-900/40'}`}>
            <div className="relative z-10 space-y-8">
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm mb-6 bg-${currentContent.color}-500/10 border-${currentContent.color}-500/20`}>
                  <Sparkles className={`w-4 h-4 text-${currentContent.color}-400`} />
                  <span className={`text-sm font-medium text-${currentContent.color}-300 capitalize`}>
                    For {role}s
                  </span>
                </div>
                
                <h1 className="text-5xl font-black text-white mb-4 leading-tight">
                  {currentContent.title}
                </h1>
                <p className="text-xl text-slate-300">
                  {currentContent.subtitle}
                </p>
              </motion.div>
              
              <div className="space-y-4">
                {currentContent.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors bg-${currentContent.color}-500/10 border border-${currentContent.color}-500/20 group-hover:bg-${currentContent.color}-500/20`}>
                      <CheckCircle2 className={`w-5 h-5 text-${currentContent.color}-400`} />
                    </div>
                    <span className="text-lg text-slate-300 group-hover:text-white transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-8 border-t border-white/10">
                <ShieldCheck className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-white font-semibold">Secure & Private</p>
                  <p className="text-sm text-slate-400">Your data is encrypted</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form & Toggle */}
          <div className="p-8 md:p-12 flex flex-col justify-center relative">
            
            {/* Role Toggle Switch */}
            <div className="absolute top-8 right-8 bg-slate-800/50 p-1 rounded-xl border border-white/10 flex">
              <button
                onClick={() => setRole('student')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${role === 'student' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <GraduationCap size={16} /> Student
              </button>
              <button
                onClick={() => setRole('recruiter')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${role === 'recruiter' ? 'bg-pink-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
              >
                <Briefcase size={16} /> Recruiter
              </button>
            </div>

            <div className="w-full max-w-md mx-auto mt-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-slate-400 mb-8">Sign up as a <span className={`text-${currentContent.color}-400 font-bold capitalize`}>{role}</span></p>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 mb-6 rounded-xl text-sm text-center">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSignUp} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <AtSign className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-slate-300">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <div className={`absolute -inset-1 bg-gradient-to-r ${currentContent.gradient} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`} />
                  <div className={`relative w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r ${currentContent.gradient} text-white rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all`}>
                    {loading ? (
                      <ClipLoader size={20} color={"#fff"} loading={loading} />
                    ) : (
                      <>
                        Create {role === 'student' ? 'Student' : 'Recruiter'} Account
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </form>
              
              <div className="text-center mt-6">
                <p className="text-sm text-slate-400">
                  Already have an account?{" "}
                  <button onClick={() => navigate("/login")} className={`text-${currentContent.color}-400 font-semibold hover:underline`}>
                    Login
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

export default SignUp;
