import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, Edit2, Trash2, Eye, ChevronLeft, ChevronRight, Briefcase, Plus, Filter } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";
import EditJobModal from "../components/EditJobModal";
import ViewJobModal from "../components/ViewJobModal";

const Myjob = () => {
  const email = localStorage.getItem("email");
  const [jobs, setJobs] = useState([]);
  const [originalJobs, setOriginalJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  const token = localStorage.getItem("token");

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;

  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/myJobs/${email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(response.data);
      setOriginalJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [email]);

  const handleSearch = () => {
    const filteredJobs = originalJobs.filter((job) =>
      job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setJobs(filteredJobs);
    setCurrentPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowEditModal(true);
  };

  const handleView = (job) => {
    setViewingJob(job);
    setShowViewModal(true);
  };

  const handleDelete = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/jobs/delete-job/${jobId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const updatedJobs = jobs.filter((job) => job._id !== jobId);
        setJobs(updatedJobs);
        toast.success("Job deleted successfully");
      } catch (error) {
        console.error("Error deleting job:", error);
        toast.error("Failed to delete job");
      }
    }
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-300">
                  Job Management Dashboard
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-4">
                My Posted Jobs
              </h1>
              <p className="text-xl text-slate-300">
                Manage and track all your job postings
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Total Jobs</p>
                    <p className="text-4xl font-black text-white">{jobs.length}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Briefcase className="w-7 h-7 text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Active Listings</p>
                    <p className="text-4xl font-black text-green-400">{jobs.length}</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-green-400" />
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/post-job')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-white/80 text-sm mb-1">Quick Action</p>
                    <p className="text-2xl font-black text-white">Post New Job</p>
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Plus className="w-7 h-7 text-white" />
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Main Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Search Section */}
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      onChange={(e) => setSearchText(e.target.value)}
                      type="text"
                      onKeyPress={handleKeyPress}
                      placeholder="Search jobs by title..."
                      className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                  <button
                    className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </button>
                </div>
              </div>

              {/* Job Table/Cards */}
              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col justify-center items-center py-20">
                    <ClipLoader size={60} color={"#3B82F6"} loading={loading} />
                    <p className="text-slate-400 mt-4">Loading your jobs...</p>
                  </div>
                ) : currentJobs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                      <Briefcase className="w-16 h-16 text-slate-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-3">No Jobs Posted Yet</h3>
                    <p className="text-slate-400 text-lg mb-8 max-w-md">
                      Start posting jobs to attract talented candidates
                    </p>
                    <button
                      onClick={() => navigate('/post-job')}
                      className="group relative inline-flex items-center gap-2"
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                      <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold flex items-center gap-2">
                        <Plus className="w-5 h-5" />
                        Post Your First Job
                      </div>
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table View */}
                    <div className="hidden lg:block overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-white/10">
                            {["Logo", "Job Title", "Company", "Location", "Salary", "Type", "Actions"].map((header) => (
                              <th key={header} className="px-4 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {currentJobs.map((job, index) => (
                            <motion.tr
                              key={job._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.05 }}
                              className="hover:bg-white/5 transition-colors"
                            >
                              <td className="px-4 py-4">
                                <img
                                  src={job.companyLogo}
                                  alt={`${job.companyName} logo`}
                                  className="w-12 h-12 rounded-xl object-cover shadow-md border border-white/10"
                                />
                              </td>
                              <td className="px-4 py-4">
                                <p className="text-white font-semibold">{job.jobTitle}</p>
                              </td>
                              <td className="px-4 py-4 text-slate-300">{job.companyName}</td>
                              <td className="px-4 py-4 text-slate-300">{job.jobLocation}</td>
                              <td className="px-4 py-4">
                                <span className="text-green-400 font-semibold">
                                  ${job.minPrice} - ${job.maxPrice}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                                  {job.employmentType}
                                </span>
                              </td>
                              <td className="px-4 py-4">
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() => handleView(job)}
                                    className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                    title="View"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleEdit(job)}
                                    className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
                                    title="Edit"
                                  >
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(job._id)}
                                    className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-4">
                      {currentJobs.map((job, index) => (
                        <motion.div
                          key={job._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                        >
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={job.companyLogo}
                              alt={job.companyName}
                              className="w-16 h-16 rounded-xl object-cover border border-white/10"
                            />
                            <div className="flex-grow">
                              <h3 className="text-white font-bold text-lg mb-1">{job.jobTitle}</h3>
                              <p className="text-slate-400 text-sm">{job.companyName}</p>
                            </div>
                          </div>
                          <div className="space-y-2 mb-4">
                            <p className="text-slate-300 text-sm">{job.jobLocation}</p>
                            <p className="text-green-400 font-semibold">${job.minPrice} - ${job.maxPrice}</p>
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                              {job.employmentType}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleView(job)}
                              className="flex-1 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-semibold hover:bg-blue-500/20 transition-colors"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleEdit(job)}
                              className="flex-1 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-semibold hover:bg-yellow-500/20 transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="flex-1 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 font-semibold hover:bg-red-500/20 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Pagination */}
                    {jobs.length > jobsPerPage && (
                      <div className="flex justify-center items-center mt-8 gap-2">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from(
                          { length: Math.ceil(jobs.length / jobsPerPage) },
                          (_, index) => (
                            <button
                              key={index}
                              onClick={() => paginate(index + 1)}
                              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                                currentPage === index + 1
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                              }`}
                            >
                              {index + 1}
                            </button>
                          )
                        )}

                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === Math.ceil(jobs.length / jobsPerPage)}
                          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditJobModal
          job={editingJob}
          onClose={() => setShowEditModal(false)}
          onSave={fetchJobs}
          fetchJobs={fetchJobs}
        />
      )}

      {showViewModal && (
        <ViewJobModal
          job={viewingJob}
          onClose={() => setShowViewModal(false)}
        />
      )}
    </>
  );
};

export default Myjob;
