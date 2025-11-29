import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, Calendar, Download, FileText, Building2, Clock } from "lucide-react";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userEmail = localStorage.getItem("email");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/jobApply/my-applications/${userEmail}`
                );

                if (response.data && response.data.applications) {
                    setApplications(response.data.applications);
                } else {
                    setApplications([]);
                }
            } catch (error) {
                console.error("Error fetching applications", error);
                setApplications([]);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [userEmail]);

    const handleDownloadResume = (resumeBinary) => {
        const blob = new Blob([new Uint8Array(resumeBinary.data)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="relative z-10 mx-auto p-8 max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 py-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
                        <Briefcase className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">
                            Application Tracker
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-4">
                        My Applications
                    </h1>
                    <p className="text-xl text-slate-300">
                        Track and manage all your job applications
                    </p>
                </motion.div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex flex-col justify-center items-center min-h-[50vh]">
                        <ClipLoader color={"#3B82F6"} size={60} />
                        <p className="text-slate-400 mt-4">Loading your applications...</p>
                    </div>
                ) : applications.length === 0 ? (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center min-h-[50vh] text-center"
                    >
                        <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                            <FileText className="w-16 h-16 text-slate-500" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3">No Applications Yet</h3>
                        <p className="text-slate-400 text-lg mb-8 max-w-md">
                            You haven't applied for any jobs yet. Start exploring opportunities now!
                        </p>
                        <a
                            href="/search"
                            className="group relative inline-flex items-center gap-2"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold flex items-center gap-2">
                                <Briefcase className="w-5 h-5" />
                                Browse Jobs
                            </div>
                        </a>
                    </motion.div>
                ) : (
                    /* Applications Grid */
                    <>
                        {/* Stats Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                        <FileText className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm">Total Applications</p>
                                        <p className="text-3xl font-black text-white">{applications.length}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-sm">Last Applied</p>
                                    <p className="text-white font-semibold">
                                        {new Date(applications[0]?.appliedAt).toLocaleDateString('en-US', { 
                                            month: 'short', 
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Applications Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {applications.map((application, index) => (
                                <motion.div
                                    key={application._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className="group bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                                >
                                    {/* Card Header with Gradient */}
                                    <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600" />
                                    
                                    <div className="p-6 space-y-4">
                                        {/* Job Title */}
                                        <div>
                                            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {application.jobId?.jobTitle}
                                            </h2>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Building2 className="w-4 h-4" />
                                                <span className="text-sm">{application.jobId?.companyName}</span>
                                            </div>
                                        </div>

                                        {/* Job Details */}
                                        <div className="space-y-3">
                                            {/* Salary */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                                                    <DollarSign className="w-4 h-4 text-green-400" />
                                                </div>
                                                <span className="text-slate-300">
                                                    {application.jobId?.minPrice} - {application.jobId?.maxPrice}
                                                </span>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                                                    <MapPin className="w-4 h-4 text-blue-400" />
                                                </div>
                                                <span className="text-slate-300">{application.jobId?.jobLocation}</span>
                                            </div>

                                            {/* Applied Date */}
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                    <Calendar className="w-4 h-4 text-purple-400" />
                                                </div>
                                                <span className="text-slate-300">
                                                    Applied {new Date(application.appliedAt).toLocaleDateString('en-US', { 
                                                        month: 'short', 
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {application.jobId?.description && (
                                            <p className="text-sm text-slate-400 line-clamp-2 pt-2 border-t border-white/5">
                                                {application.jobId?.description}
                                            </p>
                                        )}

                                        {/* Download Button */}
                                        <button
                                            onClick={() => handleDownloadResume(application.resume)}
                                            className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-blue-500/30 transition-all group/btn"
                                        >
                                            <Download className="w-5 h-5 group-hover/btn:animate-bounce" />
                                            Download Resume
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MyApplications;
