import React from 'react';
import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import Location from './Location';
import Salary from './Salary';
import JobPostingData from './JobPostingData';
import WorkExperience from './WorkExperience';
import EmploymentType from './EmploymentType';

const Sidebar = ({ handleChange, handleClick, isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed lg:sticky top-0 left-0 h-screen lg:h-auto
          w-80 lg:w-full
          bg-slate-900/50 backdrop-blur-xl 
          border-r lg:border-r-0 lg:border border-white/10 
          rounded-none lg:rounded-2xl 
          shadow-2xl
          overflow-y-auto
          z-50 lg:z-0
          transform transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 p-6 flex items-center justify-between">
          <h3 className="text-2xl font-black text-white flex items-center gap-2">
            <Filter className="w-6 h-6 text-blue-400" />
            Filters
          </h3>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="p-6 space-y-8">
          <Location handleChange={handleChange} handleClick={handleClick} />
          
          <div className="border-t border-white/10 pt-6">
            <Salary handleChange={handleChange} handleClick={handleClick} />
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <JobPostingData handleChange={handleChange} />
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <WorkExperience handleChange={handleChange} />
          </div>
          
          <div className="border-t border-white/10 pt-6">
            <EmploymentType handleChange={handleChange} />
          </div>

          {/* Clear Filters Button */}
          <div className="border-t border-white/10 pt-6">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-300 font-semibold hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
