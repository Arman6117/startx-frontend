import React from "react";
import InputField from "../components/InputField";
import { Briefcase } from 'lucide-react';

const WorkExperience = ({ handleChange }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        <Briefcase className="w-5 h-5 text-orange-400" />
        Experience Level
      </h4>

      <div className="space-y-1 pl-1">
        <label className="flex items-center gap-3 py-2 cursor-pointer group">
          <input
            type="radio"
            name="experience"
            value=""
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            Any Experience
          </span>
        </label>

        <InputField
          handleChange={handleChange}
          value="Internship"
          title="Internship"
          name="experience"
        />
        <InputField
          handleChange={handleChange}
          value="Work remotely"
          title="Remote Work"
          name="experience"
        />
        <InputField
          handleChange={handleChange}
          value="NoExperience"
          title="No Experience"
          name="experience"
        />
      </div>
    </div>
  );
};

export default WorkExperience;
