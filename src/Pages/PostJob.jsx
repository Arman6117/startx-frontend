import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Building2, 
  DollarSign, 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  Tag,
  Image as ImageIcon,
  FileText,
  Send
} from "lucide-react";

const PostJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const email = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    if (!selectedOption || selectedOption.length === 0) {
      toast.error("Please select at least one skill.");
      setLoading(false);
      return;
    }

    data.skills = selectedOption.map(option => option.value);
    data.postedBy = email;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/post-job`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.data) {
        toast.success("Job posted successfully!", {
          style: {
            background: '#10B981',
            color: '#fff',
          },
        });
        reset();
        setSelectedOption(null);
      }
    } catch (error) {
      toast.error("Error posting job: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDB", label: "MongoDB" },
    { value: "Redux", label: "Redux" },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      padding: '0.25rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgba(59, 130, 246, 0.3)'
      }
    }),
    menu: (base) => ({
      ...base,
      background: 'rgb(15, 23, 42)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? 'rgba(59, 130, 246, 0.2)' : 'transparent',
      color: '#fff',
      '&:hover': {
        background: 'rgba(59, 130, 246, 0.2)'
      }
    }),
    multiValue: (base) => ({
      ...base,
      background: 'rgba(59, 130, 246, 0.2)',
      borderRadius: '0.5rem',
      border: '1px solid rgba(59, 130, 246, 0.3)',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#93C5FD',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#93C5FD',
      '&:hover': {
        background: 'rgba(239, 68, 68, 0.2)',
        color: '#FCA5A5'
      }
    }),
    input: (base) => ({
      ...base,
      color: '#fff'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#94a3b8'
    })
  };

  const InputWrapper = ({ icon: Icon, label, error, children }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
        <Icon className="w-4 h-4 text-blue-400" />
        {label}
      </label>
      {children}
      {error && (
        <motion.span 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1 flex items-center gap-1"
        >
          ⚠ {error.message}
        </motion.span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 relative overflow-hidden">
      <Toaster position="top-center" duration={4000} reverseOrder={false} />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
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
              Recruit Top Talent
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 mb-4">
            Post a New Job
          </h1>
          <p className="text-xl text-slate-300">
            Share your opportunity with thousands of qualified candidates
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-10 space-y-8">
            {/* Job Title & Company Name */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputWrapper icon={Briefcase} label="Job Title" error={errors.jobTitle}>
                <input
                  type="text"
                  {...register("jobTitle", { required: "Job Title is required." })}
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>

              <InputWrapper icon={Building2} label="Company Name" error={errors.companyName}>
                <input
                  type="text"
                  {...register("companyName", { required: "Company Name is required." })}
                  placeholder="e.g., Tech Corp"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>
            </div>

            {/* Salary Details */}
            <div className="grid md:grid-cols-3 gap-6">
              <InputWrapper icon={DollarSign} label="Minimum Salary" error={errors.minPrice}>
                <input
                  type="text"
                  {...register("minPrice", { required: "Minimum Salary is required." })}
                  placeholder="$50,000"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>

              <InputWrapper icon={DollarSign} label="Maximum Salary" error={errors.maxPrice}>
                <input
                  type="text"
                  {...register("maxPrice", { required: "Maximum Salary is required." })}
                  placeholder="$80,000"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>

              <InputWrapper icon={Clock} label="Salary Type" error={errors.salaryType}>
                <select
                  {...register("salaryType", { required: "Salary Type is required." })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                >
                  <option value="" className="bg-slate-900">Select Type</option>
                  <option value="Hourly" className="bg-slate-900">Hourly</option>
                  <option value="Monthly" className="bg-slate-900">Monthly</option>
                  <option value="Yearly" className="bg-slate-900">Yearly</option>
                </select>
              </InputWrapper>
            </div>

            {/* Job Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputWrapper icon={MapPin} label="Job Location" error={errors.jobLocation}>
                <input
                  type="text"
                  {...register("jobLocation", { required: "Job Location is required." })}
                  placeholder="e.g., New York, NY"
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>

              <InputWrapper icon={Calendar} label="Posting Date" error={errors.postingDate}>
                <input
                  type="date"
                  {...register("postingDate", { required: "Job Posting Date is required." })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                />
              </InputWrapper>
            </div>

            {/* Experience & Employment Type */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputWrapper icon={Users} label="Experience Level" error={errors.experienceLevel}>
                <select
                  {...register("experienceLevel", { required: "Experience Level is required." })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                >
                  <option value="" className="bg-slate-900">Select Experience</option>
                  <option value="NoExperience" className="bg-slate-900">No Experience</option>
                  <option value="Internship" className="bg-slate-900">Internship</option>
                  <option value="Work remotely" className="bg-slate-900">Work Remotely</option>
                </select>
              </InputWrapper>

              <InputWrapper icon={Briefcase} label="Employment Type" error={errors.employmentType}>
                <select
                  {...register("employmentType", { required: "Employment Type is required." })}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                >
                  <option value="" className="bg-slate-900">Select Type</option>
                  <option value="Full-time" className="bg-slate-900">Full-Time</option>
                  <option value="Part-Time" className="bg-slate-900">Part-Time</option>
                  <option value="Temporary" className="bg-slate-900">Temporary</option>
                </select>
              </InputWrapper>
            </div>

            {/* Required Skills */}
            <InputWrapper icon={Tag} label="Required Skills">
              <CreatableSelect
                className="basic-multi-select"
                classNamePrefix="select"
                value={selectedOption}
                onChange={setSelectedOption}
                options={options}
                isMulti
                placeholder="Select or create skills..."
                styles={customSelectStyles}
              />
              {selectedOption?.length === 0 && (
                <motion.span 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm mt-1 flex items-center gap-1"
                >
                  ⚠ At least one skill is required.
                </motion.span>
              )}
            </InputWrapper>

            {/* Company Logo */}
            <InputWrapper icon={ImageIcon} label="Company Logo URL" error={errors.companyLogo}>
              <input
                type="url"
                {...register("companyLogo", {
                  required: "Company Logo URL is required.",
                  pattern: {
                    value: /^https?:\/\/.*\.(?:png|jpg|jpeg|svg|gif)$/,
                    message: "Please enter a valid image URL.",
                  },
                })}
                placeholder="https://example.com/logo.png"
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </InputWrapper>

            {/* Job Description */}
            <InputWrapper icon={FileText} label="Job Description" error={errors.description}>
              <textarea
                {...register("description", {
                  required: "Job Description is required.",
                  minLength: {
                    value: 20,
                    message: "Description should be at least 20 characters long.",
                  },
                })}
                rows={8}
                placeholder="Provide a detailed job description, responsibilities, qualifications, and benefits..."
                className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all resize-none"
              />
            </InputWrapper>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="group relative inline-flex items-center gap-2"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
                <div className="relative px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? (
                    <>
                      <ClipLoader size={20} color={"#fff"} loading={loading} />
                      Posting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Post Job
                    </>
                  )}
                </div>
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostJob;
