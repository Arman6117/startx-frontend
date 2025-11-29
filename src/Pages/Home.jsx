import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ClipLoader from 'react-spinners/ClipLoader';
import { ChevronLeft, ChevronRight, Briefcase, Filter } from 'lucide-react';
import Banner from '../components/Banner';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/jobs/all-jobs`);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const [query, setQuery] = useState('');
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter jobs by title
  const filterJobs = jobs.filter((job) => 
    job.jobTitle.toLowerCase().includes(query.toLowerCase())
  );

  // Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Button-based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  // Calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Next page function
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredJobsLength / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Previous page function
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Main filtering function
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;
    if (query) {
      filteredJobs = filterJobs;
    }

    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ 
        jobLocation, 
        maxPrice, 
        experienceLevel, 
        postingDate, 
        salaryType, 
        employmentType 
      }) => (
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        postingDate >= selected ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      ));
    }

    return filteredJobs;
  };

  const allFilteredJobs = filteredData(jobs, selectedCategory, query);
  const filteredJobsLength = allFilteredJobs.length;
  
  // Slice the data based on the current page
  const { startIndex, endIndex } = calculatePageRange();
  const paginatedJobs = allFilteredJobs.slice(startIndex, endIndex);
  const result = paginatedJobs.map((data, i) => <Card key={i} data={data} />);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      <Banner query={query} handleInputChange={handleInputChange} />
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-slate-800/50 transition-all"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Sidebar - Left */}
          <div className="lg:col-span-3">
            <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
              <Sidebar 
                handleChange={handleChange} 
                handleClick={handleClick}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>

          {/* Job listings - Center */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {isLoading ? 'Loading...' : `${filteredJobsLength} Jobs Found`}
                    </h2>
                    <p className="text-sm text-slate-400">
                      {selectedCategory ? 'Filtered results' : 'Showing all jobs'}
                    </p>
                  </div>
                </div>

                {selectedCategory && (
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPage(1);
                    }}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Job Cards */}
              {isLoading ? (
                <div className="flex flex-col justify-center items-center h-96">
                  <ClipLoader color="#3B82F6" size={50} />
                  <p className="text-slate-400 mt-4">Loading jobs...</p>
                </div>
              ) : result.length > 0 ? (
                <>
                  <Jobs result={result} />
                  
                  {/* Pagination */}
                  {filteredJobsLength > itemsPerPage && (
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                      <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                      </button>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-sm">Page</span>
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-bold">
                          {currentPage}
                        </span>
                        <span className="text-slate-400 text-sm">
                          of {Math.ceil(filteredJobsLength / itemsPerPage)}
                        </span>
                      </div>

                      <button
                        onClick={nextPage}
                        disabled={currentPage === Math.ceil(filteredJobsLength / itemsPerPage)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      >
                        Next
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <Briefcase className="w-10 h-10 text-slate-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Jobs Found</h3>
                  <p className="text-slate-400 mb-6">
                    Try adjusting your search or filters
                  </p>
                  {selectedCategory && (
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setQuery('');
                        setCurrentPage(1);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Clear All Filters
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          {/* Newsletter - Right */}
         
        </div>
      </div>
    </div>
  );
};

export default Home;
