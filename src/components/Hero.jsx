"use client";
import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Briefcase, FileText, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative flex flex-col gap-8 items-center justify-center min-h-screen px-4 py-20 overflow-hidden">
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm"
      >
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-blue-300">
          AI-Powered Job Matching Platform
        </span>
      </motion.div>

      {/* Main Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="max-w-5xl"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 text-center leading-[1.1] mb-6 tracking-tight">
          Step into a World of{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Opportunities
            </span>
            <motion.span
              className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm"
              animate={{
                scaleX: [0.8, 1, 0.8],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 text-center font-normal mb-10 max-w-3xl mx-auto leading-relaxed">
          Discover your potential and connect with the career you've been{" "}
          <span className="text-blue-400 font-semibold">waiting for</span>
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="flex flex-col sm:flex-row gap-4 items-center"
      >
        {/* Primary Button - Explore Jobs */}
        <Link to="/search" className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
          <button className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center gap-2 transform transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl group-hover:shadow-blue-500/50">
            <Briefcase className="w-5 h-5" />
            Explore Jobs
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>

        {/* Secondary Button - ResumeAI */}
        <Link to="/resume" className="group relative">
          <button className="relative px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-bold text-lg flex items-center gap-2 border-2 border-white/20 transform transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/30 shadow-lg hover:shadow-xl">
            <FileText className="w-5 h-5" />
            ResumeAI
            <motion.span
              className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-blue-900 bg-blue-400 rounded-full ml-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.span>
          </button>
        </Link>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.9,
          duration: 0.8,
          ease: "easeOut",
        }}
        className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
      >
        {[
          { value: "10K+", label: "Active Jobs" },
          { value: "5K+", label: "Companies" },
          { value: "50K+", label: "Job Seekers" },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-1">
              {stat.value}
            </div>
            <div className="text-sm md:text-base text-slate-400 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
