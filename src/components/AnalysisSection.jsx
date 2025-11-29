import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import { FileText, TrendingUp, Sparkles } from 'lucide-react';

const AnalysisSection = ({ analysis }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.5, delay: 0.2 }} 
    className="space-y-6"
  >
    <SectionBox 
      title="Summary" 
      icon={FileText} 
      iconColor="text-blue-400" 
      content={analysis?.description} 
    />
    <SectionBox 
      title="Matching Analysis" 
      icon={TrendingUp} 
      iconColor="text-purple-400" 
      content={analysis?.matching_analysis} 
    />
    <SectionBox 
      title="Recommendations" 
      icon={Sparkles} 
      iconColor="text-green-400" 
      content={analysis?.recommendation} 
      isList 
    />
  </motion.div>
);

const SectionBox = ({ title, icon: Icon, iconColor, content, isList }) => {
  
  // 🛡️ CRASH FIX: Ensure content is ALWAYS a string
  const safeContent = useMemo(() => {
    if (!content) return "No data available.";

    // 1. If Array: Convert to bullet points
    if (Array.isArray(content)) {
      return content.map(item => `- ${item}`).join('\n');
    }

    // 2. If Object: Stringify it
    if (typeof content === 'object') {
      return JSON.stringify(content);
    }

    // 3. If String with CSV-style lists (AI quirk): Force newlines
    if (typeof content === 'string') {
      if (isList && content.includes(',') && !content.includes('\n') && !content.includes('- ')) {
        // Heuristic: split by comma if it looks like a list
        return content.split(',').map(item => `- ${item.trim()}`).join('\n');
      }
      return content;
    }

    return String(content);
  }, [content, isList]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Icon className={`w-5 h-5 ${iconColor}`} /> {title}
      </h3>
      <div className="prose prose-invert prose-sm max-w-none text-slate-300">
        <ReactMarkdown 
          components={isList ? {
            li: ({children}) => (
              <li className="flex items-start gap-2 mb-2">
                <span className="text-green-400 mt-1 flex-shrink-0">•</span>
                <span>{children}</span>
              </li>
            ),
            ul: ({children}) => <ul className="list-none p-0 m-0 space-y-2">{children}</ul>
          } : {}}
        >
          {safeContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default AnalysisSection;
