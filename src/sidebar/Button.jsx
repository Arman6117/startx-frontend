import React from 'react';

const Button = ({ onClickHandler, value, title }) => {
  return (
    <button 
      onClick={onClickHandler} 
      value={value} 
      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-sm font-medium hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
    >
      {title}
    </button>
  );
};

export default Button;
