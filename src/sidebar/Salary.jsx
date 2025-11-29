import React from "react";
import Button from "./Button";
import InputField from "../components/InputField";
import { DollarSign } from 'lucide-react';

const Salary = ({ handleClick, handleChange }) => {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-bold text-white flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-green-400" />
        Salary Range
      </h4>
      
      {/* Salary Type Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button onClickHandler={handleClick} value="" title="Hourly" />
        <Button onClickHandler={handleClick} value="Monthly" title="Monthly" />
        <Button onClickHandler={handleClick} value="Yearly" title="Yearly" />
      </div>

      {/* Salary Range Options */}
      <div className="space-y-1 pl-1">
        <label className="flex items-center gap-3 py-2 cursor-pointer group">
          <input
            type="radio"
            name="salary"
            value=""
            onChange={handleChange}
            className="w-4 h-4 accent-blue-500 cursor-pointer"
          />
          <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
            All Salaries
          </span>
        </label>

        <InputField
          handleChange={handleChange}
          value={30}
          title="< $30,000"
          name="salary"
        />
        <InputField
          handleChange={handleChange}
          value={50}
          title="< $50,000"
          name="salary"
        />
        <InputField
          handleChange={handleChange}
          value={80}
          title="< $80,000"
          name="salary"
        />
        <InputField
          handleChange={handleChange}
          value={100}
          title="< $100,000"
          name="salary"
        />
      </div>
    </div>
  );
};

export default Salary;
