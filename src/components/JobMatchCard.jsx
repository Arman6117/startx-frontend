import React from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, DollarSign, Clock, Briefcase, Tag, Send } from 'lucide-react';

const JobMatchCard = ({ job, index, openApplicationModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <img 
          src={job.companyLogo} 
          alt={job.companyName} 
          className="w-12 h-12 rounded-lg object-cover border border-white/10"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/48?text=Company'; }}
        />
        <div>
          <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.jobTitle}</h4>
          <p className="text-sm text-slate-400 flex items-center gap-1"><Building2 className="w-3 h-3" /> {job.companyName}</p>
        </div>
      </div>
      <div className="text-right">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
          job.matchPercentage >= 70 ? 'bg-green-500/20 text-green-400' :
          job.matchPercentage >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-blue-500/20 text-blue-400'
        }`}>
          {job.matchPercentage}% Match
        </div>
        <p className="text-xs text-slate-500 mt-1">{job.totalSkillsMatched}/{job.totalSkillsRequired} skills</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3 mb-4">
      <div className="flex items-center gap-2 text-sm text-slate-300"><MapPin className="w-4 h-4 text-blue-400" /> {job.jobLocation}</div>
      <div className="flex items-center gap-2 text-sm text-slate-300"><DollarSign className="w-4 h-4 text-green-400" /> ₹{job.minPrice} - ₹{job.maxPrice}</div>
      <div className="flex items-center gap-2 text-sm text-slate-300"><Clock className="w-4 h-4 text-purple-400" /> {job.employmentType}</div>
      <div className="flex items-center gap-2 text-sm text-slate-300"><Briefcase className="w-4 h-4 text-orange-400" /> {job.experienceLevel}</div>
    </div>

    {job.matchedSkills && (
      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1"><Tag className="w-3 h-3" /> Matched Skills:</p>
        <div className="flex flex-wrap gap-2">
          {job.matchedSkills.slice(0, 6).map((skill, idx) => (
            <span key={idx} className="px-2 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs capitalize">{skill}</span>
          ))}
        </div>
      </div>
    )}

    <button onClick={() => openApplicationModal(job)} className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold text-sm">
      Apply Now <Send className="w-4 h-4" />
    </button>
  </motion.div>
);

export default JobMatchCard;
