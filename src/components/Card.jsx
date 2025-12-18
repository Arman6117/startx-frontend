import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar, 
  Briefcase,
  Building2,
  Tag,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import JobApplicationModal from './Modal';

const Card = ({ data }) => {
  const {
    _id,
    companyName,
    companyLogo,
    maxPrice,
    salaryType,
    jobLocation,
    employmentType,
    postingDate,
    experienceLevel,
    description,
    jobTitle,
    minPrice,
    skills,
  } = data;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300 group'
      >
        <div className='flex gap-6 flex-col sm:flex-row'>
          {/* Company Logo */}
          <div className='flex-shrink-0'>
            <img 
              src={companyLogo} 
              alt={companyName} 
              className='w-20 h-20 object-cover rounded-xl border border-white/10 group-hover:scale-105 transition-transform duration-300' 
            />
          </div>

          {/* Job Details */}
          <div className='flex-1 space-y-4'>
            {/* Header */}
            <div>
              <div className='flex items-center gap-2 mb-2'>
                <Building2 className='w-4 h-4 text-slate-400' />
                <h4 className='text-slate-300 text-sm font-medium'>{companyName}</h4>
              </div>
              <h3 className='text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors'>
                {jobTitle}
              </h3>
            </div>

            {/* Info Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div className='flex items-center gap-2 text-sm'>
                <div className='w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0'>
                  <MapPin className='w-4 h-4 text-blue-400' />
                </div>
                <span className='text-slate-300'>{jobLocation}</span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <div className='w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0'>
                  <Clock className='w-4 h-4 text-purple-400' />
                </div>
                <span className='text-slate-300'>{employmentType}</span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <div className='w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0'>
                  <DollarSign className='w-4 h-4 text-green-400' />
                </div>
                <span className='text-slate-300'>
                  ₹{minPrice}-₹{maxPrice} {salaryType}
                </span>
              </div>

              <div className='flex items-center gap-2 text-sm'>
                <div className='w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0'>
                  <Briefcase className='w-4 h-4 text-orange-400' />
                </div>
                <span className='text-slate-300'>{experienceLevel}</span>
              </div>
            </div>

            {/* Description */}
            <p className='text-slate-400 text-sm leading-relaxed line-clamp-2'>
              {description}
            </p>

            {/* Skills */}
            {skills && skills.length > 0 && (
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <Tag className='w-4 h-4 text-cyan-400' />
                  <h5 className='text-sm font-semibold text-white'>Required Skills</h5>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {skills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-medium'
                    >
                      {skill}
                    </span>
                  ))}
                  {skills.length > 5 && (
                    <span className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-medium'>
                      +{skills.length - 5} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className='flex items-center justify-between pt-4 border-t border-white/10'>
              <div className='flex items-center gap-2 text-sm text-slate-400'>
                <Calendar className='w-4 h-4' />
                <span>Posted {formatDate(postingDate)}</span>
              </div>

              <button
                onClick={openModal}
                className='group/btn flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all'
              >
                Apply Now
                <ArrowRight className='w-4 h-4 group-hover/btn:translate-x-1 transition-transform' />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Job Application Modal */}
      {isModalOpen && (
        <JobApplicationModal
          job={data} 
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Card;
