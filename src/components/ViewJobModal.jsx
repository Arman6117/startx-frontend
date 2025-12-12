import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Eye,
  X,
  FileSpreadsheet,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  FileText,
  Mail,
  Phone,
  User
} from "lucide-react";

const ViewJobModal = ({ job, onClose }) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobApply/applicants/${job._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplicants(response.data);
      } catch (error) {
        console.error("Error fetching applicants:", error);
      } finally {
        setLoading(false);
      }
    };

    if (job) {
      fetchApplicants();
    }
  }, [job, token]);

  const createResumeURL = (resumeBinary) => {
    const blob = new Blob([new Uint8Array(resumeBinary.data)], {
      type: "application/pdf",
    });
    return window.URL.createObjectURL(blob);
  };

  const createCoverLetterURL = (coverLetter) => {
    const blob = new Blob([coverLetter], { type: "text/plain" });
    return window.URL.createObjectURL(blob);
  };

  const downloadResume = (application) => {
    const url = createResumeURL(application.resume);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${application.applicantName}_resume.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadCoverLetter = (coverLetter, applicantName) => {
    const url = createCoverLetterURL(coverLetter);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${applicantName}_cover_letter.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const exportToExcel = () => {
    const worksheetData = applicants.map((applicant) => ({
      Name: applicant.applicantName,
      Email: applicant.applicantEmail,
      Phone: applicant.applicantPhone,
      Cover_Letter: applicant.coverLetter ? applicant.coverLetter : "Not Provided",
      Resume: applicant.resume ? "Provided" : "Not Provided",
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");

    XLSX.writeFile(workbook, `${job.jobTitle}_${job.companyName}_Applicants.xlsx`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-400 hover:text-white" />
          </button>

          {/* Job Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center gap-4 mb-4">
              {job.companyLogo && (
                <img
                  src={job.companyLogo}
                  alt={job.companyName}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white/20"
                />
              )}
              <div>
                <h2 className="text-3xl font-black text-white mb-1">{job.jobTitle}</h2>
                <p className="text-white/80">{job.companyName}</p>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Location</p>
                  <p className="text-sm font-semibold text-white">{job.jobLocation}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Salary Range</p>
                  <p className="text-sm font-semibold text-white">
                    ${job.minPrice} - ${job.maxPrice}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Employment Type</p>
                  <p className="text-sm font-semibold text-white">{job.employmentType}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Applicants Section */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Applicants</h3>
                  <p className="text-sm text-slate-400">{applicants.length} total applications</p>
                </div>
              </div>

              {/* <button */}
                {/* onClick={exportToExcel}
                disabled={applicants.length === 0}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                <FileSpreadsheet className="w-5 h-5" />
                Export to Excel
              </button> */}
            </div>

            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <ClipLoader color="#3B82F6" size={50} />
                <p className="text-slate-400 mt-4">Loading applicants...</p>
              </div>
            ) : applicants.length > 0 ? (
              <div className="space-y-4">
                {applicants.map((applicant, index) => (
                  <motion.div
                    key={applicant._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      {/* Name */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                          {applicant.applicantName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Name</p>
                          <p className="text-sm font-semibold text-white">{applicant.applicantName}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Email</p>
                          <p className="text-sm font-medium text-white truncate">{applicant.applicantEmail}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Phone</p>
                          <p className="text-sm font-medium text-white">{applicant.applicantPhone}</p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                      {/* Resume */}
                      <div className="flex gap-2">
                        <a
                          href={createResumeURL(applicant.resume)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-all text-sm font-semibold"
                        >
                          <Eye className="w-4 h-4" />
                          View Resume
                        </a>
                        <button
                          onClick={() => downloadResume(applicant)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 transition-all text-sm font-semibold"
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>

                      {/* Cover Letter */}
                      {applicant.coverLetter ? (
                        <div className="flex gap-2">
                          <a
                            href={createCoverLetterURL(applicant.coverLetter)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/20 transition-all text-sm font-semibold"
                          >
                            <Eye className="w-4 h-4" />
                            View Cover Letter
                          </a>
                          <button
                            onClick={() => downloadCoverLetter(applicant.coverLetter, applicant.applicantName)}
                            className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg hover:bg-green-500/20 transition-all text-sm font-semibold"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        </div>
                      ) : (
                        <span className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 text-slate-500 rounded-lg text-sm">
                          <FileText className="w-4 h-4" />
                          No cover letter
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <Users className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No Applicants Yet</h3>
                <p className="text-slate-400">This position hasn't received any applications.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ViewJobModal;
