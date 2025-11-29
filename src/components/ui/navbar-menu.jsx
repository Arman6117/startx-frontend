"use client";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({ setActive, active, item, children }) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-slate-200 hover:text-white font-medium text-base transition-colors duration-200"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.5rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const Menu = ({ setActive, children }) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 flex justify-center items-center space-x-6 px-8 py-4 shadow-xl"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({ title, description, href, src }) => {
  return (
    <Link 
      to={href} 
      className="flex space-x-3 p-3 rounded-xl hover:bg-white/5 transition-all duration-300 group"
    >
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-lg shadow-lg border border-white/10 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-lg font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-sm max-w-[10rem] text-slate-400 group-hover:text-slate-300 transition-colors">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, to, ...rest }) => {
  return (
    <Link
      to={to}
      {...rest}
      className="block px-4 py-2 text-slate-300 hover:text-white hover:bg-blue-500/10 rounded-lg transition-all duration-200 font-medium"
    >
      {children}
    </Link>
  );
};

// Bonus: NavButton Component for actions like Login/Signup
export const NavButton = ({ children, to, variant = "primary" }) => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-blue-500/30"
  };

  return (
    <Link to={to}>
      <button className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 ${variants[variant]}`}>
        {children}
      </button>
    </Link>
  );
};
