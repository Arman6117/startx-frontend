import React, { useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { Award, Target, Briefcase, Loader2, FileText } from 'lucide-react';
import { useResumeAnalysis } from "../hooks/useResumeAnalysis";


import JobApplicationModal from "../components/Modal"; 
import ResumeHeader from "../components/ResumeHeader";
import FileUpload from "../components/FileUpload";
import ScoreCard from "../components/ScoreCard";
import AnalysisSection from "../components/AnalysisSection";
import JobMatchCard from "../components/JobMatchCard";

const ResumeAnalyzer = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    file, setFile, jobDescription, setJobDescription, analysis,
    loading, error, setError, matchedJobs, loadingJobs,
    showJobMatches, jobMatchSummary, handleUpload
  } = useResumeAnalysis();

  const openApplicationModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeApplicationModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden pt-20">
      {isModalOpen && selectedJob && (
        <JobApplicationModal job={selectedJob} onClose={closeApplicationModal} />
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <ResumeHeader />

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="space-y-6">
              <FileUpload 
                file={file} setFile={setFile} 
                jobDescription={jobDescription} setJobDescription={setJobDescription} 
                handleUpload={handleUpload} loading={loading} error={error} setError={setError} 
              />
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {analysis ? (
                <>
                  <div className="grid gap-6">
                    <ScoreCard title="Overall Score" score={analysis.score || 0} icon={Award} />
                    {jobDescription.trim() && (
                      <ScoreCard title="Skill Match Score" score={analysis.skill_match_score || 0} icon={Target} />
                    )}
                  </div>
                  <AnalysisSection analysis={analysis} />
                </>
              ) : (
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-12 flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <FileText className="w-12 h-12 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No Analysis Yet</h3>
                    <p className="text-slate-400">Upload your resume to get AI-powered insights.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Matched Jobs Section */}
          <AnimatePresence>
            {showJobMatches && (
              <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="mt-12">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">Matched Jobs</h3>
                        <p className="text-sm text-slate-400">{matchedJobs.length} jobs match your profile</p>
                      </div>
                    </div>
                    
                    {/* Summary Stats */}
                    {jobMatchSummary && (
                      <div className="hidden md:flex gap-3">
                        {jobMatchSummary.excellent > 0 && <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold">{jobMatchSummary.excellent} Excellent</div>}
                        {jobMatchSummary.good > 0 && <div className="px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">{jobMatchSummary.good} Good</div>}
                      </div>
                    )}
                  </div>

                  {loadingJobs ? (
                    <div className="flex flex-col justify-center items-center py-12">
                      <Loader2 className="w-12 h-12 text-blue-400 animate-spin mb-4" />
                      <p className="text-slate-400">Finding matching jobs...</p>
                    </div>
                  ) : matchedJobs.length > 0 ? (
                    <div className="grid gap-6">
                      {matchedJobs.map((job, index) => (
                        <JobMatchCard key={job._id} job={job} index={index} openApplicationModal={openApplicationModal} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Briefcase className="w-10 h-10 text-slate-500" /></div>
                      <h4 className="text-xl font-bold text-white mb-2">No Matching Jobs Found</h4>
                      <p className="text-slate-400 mb-2">We couldn't find jobs matching your skills.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
