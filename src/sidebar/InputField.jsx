import React from 'react';

const InputField = ({ handleChange, value, title, name }) => {
  return (
    <label className="flex items-center gap-3 py-2 cursor-pointer group">
      <input
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
      />
      <span className="text-slate-300 text-sm group-hover:text-white transition-colors">
        {title}
      </span>
    </label>
  );
};

export default InputField;
