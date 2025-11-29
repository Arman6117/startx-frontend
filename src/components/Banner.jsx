import React from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, TrendingUp, MapPin, Sparkles } from 'lucide-react';

const Banner = ({ query, handleInputChange }) => {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Simple Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            10,000+ Jobs Available
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
        >
          Find Your Dream{' '}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Job
          </span>
          {' '}Today
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto"
        >
          Explore thousands of opportunities in Computer Science, Engineering, and Technology
        </motion.p>

        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="flex items-center bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-blue-500/30 transition-all">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full bg-transparent py-4 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none text-lg"
                  placeholder="Search for job titles, companies..."
                  onChange={handleInputChange}
                  value={query}
                />
              </div>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl px-8 py-4 hover:shadow-xl transition-all md:w-auto w-full flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Jobs
            </button>
          </div>
        </motion.form>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { icon: Briefcase, value: "10K+", label: "Active Jobs" },
            { icon: TrendingUp, value: "5K+", label: "Companies" },
            { icon: MapPin, value: "50+", label: "Locations" },
            { icon: Sparkles, value: "AI", label: "Powered" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
            >
              <stat.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Popular Searches */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12"
        >
          <p className="text-slate-400 text-sm mb-4">Popular Searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps"].map((term, index) => (
              <button
                key={index}
                onClick={() => handleInputChange({ target: { value: term } })}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition-all"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
