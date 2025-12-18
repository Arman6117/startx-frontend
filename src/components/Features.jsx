import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiCode, FiTrello, FiTarget, FiTool, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ContextApp } from "../utils/Context";

// Import your images (ensure paths are correct)
import Jobspic from "../assets/testFiles/test2.gif";
import NewsPic from "../assets/testFiles/newsGraphic.png";
import ChatbotPic from "../assets/testFiles/test11.png";
import ResumeAnalysisPic from "../assets/testFiles/test7.gif";

export const AlternatingFeaturesSection = () => {
  const { isOpen, setIsOpen } = useContext(ContextApp);
  
  const features = [
    {
      icon: FiTarget,
      imgUrl: Jobspic,
      color: "from-cyan-400 to-blue-600",
      accentColor: "cyan",
      subheading: "Precision Job Matching",
      heading: "Tailored Opportunities",
      title: "Smart Job Discovery",
      description: "Leveraging advanced AI algorithms to match your unique skills with precision-targeted job opportunities. Our intelligent platform goes beyond traditional job search, creating a personalized career ecosystem.",
      linkTo: '/search'
    },
    {
      icon: FiTrello,
      imgUrl: NewsPic,
      color: "from-purple-400 to-pink-600",
      accentColor: "purple",
      subheading: "Intelligent Insights",
      heading: "Career Intelligence Hub",
      title: "Real-Time Industry Pulse",
      description: "Transform information into opportunity with our cutting-edge news aggregation and trend analysis. Get predictive insights that keep you ahead of the curve in your professional landscape.",
      linkTo: '/news'
    },
    {
      icon: FiCode,
      imgUrl: ChatbotPic,
      color: "from-green-400 to-emerald-600",
      accentColor: "green",
      subheading: "AI-Powered Guidance",
      heading: "Adaptive Career Companion",
      title: "Intelligent Career Navigator",
      description: "Your personal AI strategist, offering contextual, nuanced career advice. From skill development to interview preparation, receive hyper-personalized guidance that evolves with your career journey.",
      isChat: true
    },
    {
      icon: FiTool,
      imgUrl: ResumeAnalysisPic,
      color: "from-orange-400 to-red-600",
      accentColor: "orange",
      subheading: "Professional Optimization",
      heading: "Resume Transformation Engine",
      title: "Intelligent Resume Crafting",
      description: "Advanced resume analysis powered by machine learning. We decode industry-specific keywords, optimize formatting, and provide strategic recommendations to elevate your professional narrative.",
      linkTo: '/resume'
    }
  ];

  return (
    <div className="bg-transparent py-20">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20 px-4"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-6">
          <FiZap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Powerful Features
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Cutting-edge tools designed to accelerate your career journey
        </p>
      </motion.div>

      {/* Features */}
      {features.map((feature, index) => (
        <FeatureSection 
          key={index} 
          {...feature}
          isReverse={index % 2 !== 0}
          handleChatFeatureClick={() => feature.isChat && setIsOpen(prev => !prev)}
        />
      ))}
    </div>
  );
};

const FeatureSection = ({ 
  icon: Icon,
  imgUrl, 
  color,
  accentColor,
  subheading, 
  heading, 
  title, 
  description, 
  linkTo,
  isReverse,
  handleChatFeatureClick,
  isChat 
}) => {
  const accentColors = {
    cyan: "hover:shadow-cyan-500/20 border-cyan-500/20 from-cyan-500/10 to-blue-500/10",
    purple: "hover:shadow-purple-500/20 border-purple-500/20 from-purple-500/10 to-pink-500/10",
    green: "hover:shadow-green-500/20 border-green-500/20 from-green-500/10 to-emerald-500/10",
    orange: "hover:shadow-orange-500/20 border-orange-500/20 from-orange-500/10 to-red-500/10"
  };

  return (
    <div className="relative flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Content Container */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className={`relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${isReverse ? 'md:grid-flow-dense' : ''}`}
      >
        {/* Image Container */}
        <motion.div 
          initial={{ opacity: 0, x: isReverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className={`relative group ${isReverse ? 'md:col-start-2' : 'md:col-start-1'}`}
        >
          {/* Glow Effect */}
          <div className={`absolute -inset-4 bg-gradient-to-r ${color} opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`} />
          
          {/* Image Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 backdrop-blur-sm shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
            <img 
              src={imgUrl} 
              alt={heading}
              className="w-full h-auto object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          </div>

          {/* Floating Icon Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
            viewport={{ once: true }}
            className={`absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-xl border border-white/20`}
          >
            <Icon className="text-2xl text-white" />
          </motion.div>
        </motion.div>
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: isReverse ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          viewport={{ once: true }}
          className={`space-y-6 ${isReverse ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2'}`}
        >
          {/* Subheading Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`} />
            <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              {subheading}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-4xl lg:text-5xl font-black text-white leading-tight">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-lg text-slate-400 leading-relaxed">
            {description}
          </p>
          
          {/* CTA Button */}
          {isChat ? (
            // <button
            //   onClick={handleChatFeatureClick}
            //   className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${accentColors[accentColor]} border backdrop-blur-sm font-bold text-white shadow-lg ${accentColors[accentColor].split(' ')[0]} transition-all duration-300 hover:scale-105`}
            // >
            //   <span>Open Chat Assistant</span>
            //   <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            // </button>
            null
          ) : (
            <Link to={linkTo}>
              <button className={`group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r ${accentColors[accentColor]} border backdrop-blur-sm font-bold text-white shadow-lg ${accentColors[accentColor].split(' ')[0]} transition-all duration-300 hover:scale-105`}>
                <span>Explore Feature</span>
                <FiArrowUpRight className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </Link>
          )}

          {/* Feature Stats/Pills */}
          <div className="flex flex-wrap gap-3 pt-4">
            {["AI-Powered", "Real-time", "Personalized"].map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 font-medium backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AlternatingFeaturesSection;
