import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from 'lucide-react';

const ResumeHeader = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
      <Sparkles className="w-4 h-4 text-blue-400" />
      <span className="text-sm font-medium text-blue-300">AI-Powered Analysis & Job Matching</span>
    </div>
    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-4">
      Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI</span>
    </h1>
    <p className="text-xl text-slate-300 max-w-2xl mx-auto">Get instant AI-powered insights and find matching job opportunities</p>
  </motion.div>
);

export default ResumeHeader;
