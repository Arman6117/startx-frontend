import React from "react";
import { motion } from "framer-motion";

const ScoreCard = ({ title, score, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 group hover:border-blue-500/30 transition-all"
  >
    <div className="relative flex items-center justify-between">
      <div>
        <p className="text-slate-400 text-sm mb-2">{title}</p>
        <p className="text-5xl font-black text-white">
          {score} <span className="text-lg text-slate-400 ml-2">/ 100</span>
        </p>
      </div>
      <div className="w-16 h-16 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Icon className="w-8 h-8 text-blue-400" />
      </div>
    </div>
  </motion.div>
);

export default ScoreCard;
