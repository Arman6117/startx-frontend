import React from 'react';
import InputField from '../components/InputField';
import { Clock } from 'lucide-react';

const EmploymentType = ({ handleChange }) => {
  return (
    <div className="space-y-3">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        <Clock className="w-5 h-5 text-cyan-400" />
        Employment Type
      </h4>

      <div className="space-y-1 pl-1">
        <label className="flex items-center gap-3 py-2 cursor-pointer group">
          <input
            type="radio"
            name="employment"
            value=""
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            All Types
          </span>
        </label>

        <InputField
          handleChange={handleChange}
          value="full-time"
          title="Full-Time"
          name="employment"
        />
        <InputField
          handleChange={handleChange}
          value="part-time"
          title="Part-Time"
          name="employment"
        />
        <InputField
          handleChange={handleChange}
          value="temporary"
          title="Temporary"
          name="employment"
        />
        <InputField
          handleChange={handleChange}
          value="contract"
          title="Contract"
          name="employment"
        />
      </div>
    </div>
  );
};

export default EmploymentType;
