import { useState, useCallback } from 'react';
import axios from 'axios';

const AUTH_SECRET = import.meta.env.VITE_AUTH_SECRET;
const API_ENDPOINT_RESUME_ANALYZER = `${import.meta.env.VITE_TALX_API}/upload-resume`;
const API_ENDPOINT_MATCH_JOBS = `${import.meta.env.VITE_BACKEND_URL}/api/job-match/match-jobs`;

const SKILL_PATTERNS = [
  // ... (Keep your existing large list of patterns here) ...
  // I am keeping the list concise for brevity, but paste your FULL list back here.
  { pattern: /\b(?:javascript|js|ecmascript|es6)\b/gi, skill: 'JavaScript' },
  { pattern: /\b(?:react|reactjs|react\.js)\b/gi, skill: 'React' },
  { pattern: /\b(?:node\.js|nodejs|node)\b/gi, skill: 'Node.js' },
  { pattern: /\b(?:python|py)\b/gi, skill: 'Python' },
  // ... paste the rest of your patterns ...
];

export const useResumeAnalysis = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [showJobMatches, setShowJobMatches] = useState(false);
  const [jobMatchSummary, setJobMatchSummary] = useState(null);

  // Helper: Robust Skill Extraction
  const extractSkills = useCallback((analysisData) => {
    const text = (analysisData.description || '') + ' ' + 
                 (analysisData.matching_analysis || '') + ' ' + 
                 (analysisData.recommendation || '');
    
    const foundSkills = new Set();
    
    // 1. Regex Search
    SKILL_PATTERNS.forEach(({ pattern, skill }) => {
      if (pattern.test(text)) foundSkills.add(skill);
    });

    // 2. Fallback Keyword Search (If regex missed simple terms)
    if (foundSkills.size === 0) {
        const commonTech = ['React', 'Node', 'JavaScript', 'TypeScript', 'Python', 'Java', 'HTML', 'CSS', 'SQL', 'MongoDB', 'AWS'];
        commonTech.forEach(tech => {
            if (text.toLowerCase().includes(tech.toLowerCase())) {
                foundSkills.add(tech);
            }
        });
    }
    
    const skillsArray = Array.from(foundSkills);
    console.log("🔍 Extracted Skills:", skillsArray);
    return skillsArray;
  }, []);

  const fetchMatchingJobs = useCallback(async (analysisData) => {
    setLoadingJobs(true);
    try {
      const skills = extractSkills(analysisData);
      
      if (skills.length === 0) {
        console.warn("⚠️ No skills found. Cannot match jobs.");
        setMatchedJobs([]);
        setShowJobMatches(true);
        return;
      }

      // Lowered threshold to 10% to ensure matches appear
      const response = await axios.post(API_ENDPOINT_MATCH_JOBS, {
        skills,
        experienceLevel: analysisData.experienceLevel || null,
        minMatchPercentage: 10 
      });

      console.log("✅ Matched Jobs:", response.data.jobs?.length);

      setMatchedJobs(response.data.jobs || []);
      setJobMatchSummary(response.data.summary || null);
      setShowJobMatches(true);
    } catch (error) {
      console.error('❌ Error matched jobs:', error);
      setMatchedJobs([]);
      setShowJobMatches(true); // Show section anyway so UI doesn't look broken
    } finally {
      setLoadingJobs(false);
    }
  }, [extractSkills]);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    if (jobDescription.trim()) formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setError("");
      setMatchedJobs([]);
      setShowJobMatches(false);

      const response = await fetch(API_ENDPOINT_RESUME_ANALYZER, {
        method: "POST",
        headers: { Authorization: AUTH_SECRET },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Analysis failed.");
      } else {
        setAnalysis(data.summary);
        await fetchMatchingJobs(data.summary);
      }
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    file, setFile, jobDescription, setJobDescription, analysis,
    loading, error, setError, matchedJobs, loadingJobs,
    showJobMatches, jobMatchSummary, handleUpload
  };
};
