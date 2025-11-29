import React from "react";
import InputField from "../components/InputField";
import { Calendar } from 'lucide-react';

const JobPostingData = ({ handleChange }) => {
  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);
  const SevenDayAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const ThirtyDayAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);

  const twentyFourHoursAgoString = twentyFourHoursAgo.toISOString().slice(0, 10);
  const SevenDayAgoString = SevenDayAgo.toISOString().slice(0, 10);
  const ThirtyDayAgoString = ThirtyDayAgo.toISOString().slice(0, 10);

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        <Calendar className="w-5 h-5 text-purple-400" />
        Date Posted
      </h4>

      <div className="space-y-1 pl-1">
        <label className="flex items-center gap-3 py-2 cursor-pointer group">
          <input
            type="radio"
            name="date"
            value=""
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            All Time
          </span>
        </label>

        <InputField
          handleChange={handleChange}
          value={twentyFourHoursAgoString}
          title="Last 24 Hours"
          name="date"
        />
        <InputField
          handleChange={handleChange}
          value={SevenDayAgoString}
          title="Last 7 Days"   
          name="date"
        />
        <InputField
          handleChange={handleChange}
          value={ThirtyDayAgoString}
          title="Last 30 Days"
          name="date"
        />
      </div>
    </div>
  );
};

export default JobPostingData;
