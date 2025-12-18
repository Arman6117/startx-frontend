import React, { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Briefcase, Building2, MapPin, DollarSign,IndianRupee , Calendar, Tag } from "lucide-react";

const EditJobModal = ({ job, onClose, onSave }) => {
  const [selectedOption, setSelectedOption] = useState(
    job.skills.map((skill) => ({ value: skill, label: skill }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      jobTitle: job.jobTitle || "",
      companyName: job.companyName || "",
      jobLocation: job.jobLocation || "",
      minPrice: job.minPrice || "",
      maxPrice: job.maxPrice || "",
      salaryType: job.salaryType || "",
      postingDate: job.postingDate
        ? new Date(job.postingDate).toISOString().split("T")[0]
        : "",
      experienceLevel: job.experienceLevel || "",
      companyLogo: job.companyLogo || "",
      employmentType: job.employmentType || "",
      description: job.description || "",
      postedBy: job.postedBy || "",
    },
  });

  const onSubmit = async (data) => {
    data.skills = selectedOption.map((option) => option.value);

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/jobs/edit-job/${job._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Job updated successfully!");
      onSave();
      onClose();
    } catch (error) {
      toast.error("Error updating job");
      console.error("Error updating job:", error);
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
      background: 'rgba(15, 23, 42, 0.5)',
      borderColor: state.isFocused ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)',
      borderRadius: '0.75rem',
      padding: '0.25rem',
      boxShadow: 'none',
      '&:hover': { borderColor: 'rgba(59, 130, 246, 0.3)' }
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
      '&:hover': { background: 'rgba(59, 130, 246, 0.2)' }
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

  const InputField = ({ icon: Icon, label, error, children }) => (
    <div>
      <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
        {Icon && <Icon className="w-4 h-4 text-blue-400" />}
        {label}
      </label>
      {children}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1"
        >
          ⚠ {error.message}
        </motion.p>
      )}
    </div>
  );

  return (
    <>
      <Toaster position="top-center" />
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-black text-white">Edit Job Listing</h2>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-white/20 rounded-lg p-2 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Form Container */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
            >
              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <InputField icon={Briefcase} label="Job Title" error={errors.jobTitle}>
                  <input
                    type="text"
                    placeholder="e.g., Senior Software Engineer"
                    {...register("jobTitle", { required: "Job Title is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Company Name */}
                <InputField icon={Building2} label="Company Name" error={errors.companyName}>
                  <input
                    type="text"
                    placeholder="Company name"
                    {...register("companyName", { required: "Company Name is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Location */}
                <InputField icon={MapPin} label="Location" error={errors.jobLocation}>
                  <input
                    type="text"
                    placeholder="e.g., New York, NY"
                    {...register("jobLocation", { required: "Location is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Minimum Salary */}
                <InputField icon={IndianRupee } label="Minimum Salary" error={errors.minPrice}>
                  <input
                    type="text"
                    placeholder="₹50,000"
                    {...register("minPrice", { required: "Minimum Salary is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Maximum Salary */}
                <InputField icon={IndianRupee } label="Maximum Salary" error={errors.maxPrice}>
                  <input
                    type="text"
                    placeholder="₹80,000"
                    {...register("maxPrice", { required: "Maximum Salary is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Salary Type */}
                <InputField label="Salary Type" error={errors.salaryType}>
                  <select
                    {...register("salaryType", { required: "Salary Type is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="" className="bg-slate-900">Choose salary type</option>
                    <option value="Hourly" className="bg-slate-900">Hourly</option>
                    <option value="Monthly" className="bg-slate-900">Monthly</option>
                    <option value="Yearly" className="bg-slate-900">Yearly</option>
                  </select>
                </InputField>

                {/* Posting Date */}
                <InputField icon={Calendar} label="Posting Date" error={errors.postingDate}>
                  <input
                    type="date"
                    {...register("postingDate")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Experience Level */}
                <InputField label="Experience Level">
                  <select
                    {...register("experienceLevel")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="" className="bg-slate-900">Choose Experience</option>
                    <option value="NoExperience" className="bg-slate-900">No Experience</option>
                    <option value="Internship" className="bg-slate-900">Internship</option>
                    <option value="WorkRemotely" className="bg-slate-900">Work Remotely</option>
                  </select>
                </InputField>

                {/* Company Logo URL */}
                <InputField label="Company Logo URL" error={errors.companyLogo}>
                  <input
                    type="url"
                    placeholder="https://example.com/logo.png"
                    {...register("companyLogo", { required: "Company Logo URL is required" })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all"
                  />
                </InputField>

                {/* Employment Type */}
                <InputField label="Employment Type">
                  <select
                    {...register("employmentType")}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500/50 transition-all"
                  >
                    <option value="" className="bg-slate-900">Choose Type</option>
                    <option value="Full-time" className="bg-slate-900">Full-Time</option>
                    <option value="Part-time" className="bg-slate-900">Part-Time</option>
                    <option value="Temporary" className="bg-slate-900">Temporary</option>
                  </select>
                </InputField>
              </div>

              {/* Job Description */}
              <InputField label="Job Description" error={errors.description}>
                <textarea
                  placeholder="Detailed job description..."
                  {...register("description", { required: "Job Description is required" })}
                  rows="6"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 transition-all resize-none"
                />
              </InputField>

              {/* Skills */}
              <InputField icon={Tag} label="Required Skills">
                <CreatableSelect
                  isMulti
                  value={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  placeholder="Select or create skills..."
                  styles={customSelectStyles}
                />
              </InputField>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-slate-300 rounded-xl hover:bg-white/10 transition-all font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default EditJobModal;
