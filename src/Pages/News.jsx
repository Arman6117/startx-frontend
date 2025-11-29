import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import axios from "axios";
import newsImg from "../assets/news.png";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Search, TrendingUp, Clock, ExternalLink } from "lucide-react";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("business");
  const [loading, setLoading] = useState(false);
  const articlesPerPage = 9;
  const placeholderImage = newsImg;

  // Fetch news from the backend
  const fetchNews = async (query, category) => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/news/news`, {
        params: { query, category },
      });
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching the news data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("", selectedCategory);
  }, [selectedCategory]);

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchNews(query, selectedCategory);
    setCurrentPage(1);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  const nextPage = () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const categories = [
    { name: "business", icon: "💼" },
    { name: "entertainment", icon: "🎬" },
    { name: "general", icon: "📰" },
    { name: "health", icon: "🏥" },
    { name: "science", icon: "🔬" },
    { name: "sports", icon: "⚽" },
    { name: "technology", icon: "💻" }
  ];

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 py-8 px-4 md:px-8 lg:px-16 xl:px-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12 space-y-6 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-4">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium text-blue-300">
            Real-Time News Updates
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200">
          BulletinBuzz
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto">
          Your shortcut to today's most important stories
        </p>
      </motion.header>

      {/* Search and Category Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-5xl mx-auto space-y-8 relative z-10 mb-16"
      >
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:border-blue-500/30 transition-all">
            <div className="absolute left-6 pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for news articles..."
              className="flex-grow pl-14 pr-6 py-4 bg-transparent text-white placeholder-slate-400 focus:outline-none text-lg"
            />
            <button
              type="submit"
              className="m-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </div>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => selectCategory(cat.name)}
              className={`group relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                selectedCategory === cat.name
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105 shadow-lg shadow-blue-500/25"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Loader */}
      {loading ? (
        <div className="flex flex-col justify-center items-center min-h-[50vh] relative z-10">
          <ClipLoader color={"#3B82F6"} loading={loading} size={60} />
          <p className="text-slate-400 mt-4">Loading latest news...</p>
        </div>
      ) : (
        <>
          {/* News Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 my-12 relative z-10"
          >
            {currentArticles.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-4">
                  <Search className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
                <p className="text-slate-400">Try adjusting your search or category</p>
              </div>
            ) : (
              currentArticles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex justify-center"
                >
                  <CardContainer className="w-full">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full group"
                    >
                      <CardBody className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/30">
                        {/* Image */}
                        <CardItem translateZ={50} className="w-full h-48 overflow-hidden">
                          <img
                            src={article.urlToImage || placeholderImage}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = placeholderImage;
                            }}
                            loading="lazy"
                          />
                        </CardItem>

                        <div className="p-6 flex flex-col flex-grow">
                          {/* Source Badge */}
                          {article.source && (
                            <CardItem translateZ={30} className="mb-3">
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-300">
                                <Clock className="w-3 h-3" />
                                {article.source.name}
                              </span>
                            </CardItem>
                          )}

                          {/* Title */}
                          <CardItem
                            translateZ={60}
                            className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors"
                          >
                            {article.title}
                          </CardItem>

                          {/* Description */}
                          <CardItem
                            as="p"
                            translateZ={40}
                            className="text-slate-400 text-sm flex-grow line-clamp-3 mb-4"
                          >
                            {article.description}
                          </CardItem>

                          {/* Read More Button */}
                          <CardItem translateZ={70} className="mt-auto">
                            <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                              Read Full Article
                              <ExternalLink className="w-4 h-4" />
                            </div>
                          </CardItem>
                        </div>
                      </CardBody>
                    </a>
                  </CardContainer>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* Pagination */}
          {articles.length > articlesPerPage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center items-center gap-4 py-12 relative z-10"
            >
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl disabled:opacity-30 hover:bg-white/10 hover:border-blue-500/30 transition-all disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="px-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 text-white rounded-xl font-semibold">
                Page {currentPage} of {Math.ceil(articles.length / articlesPerPage)}
              </div>
              <button
                onClick={nextPage}
                disabled={currentPage === Math.ceil(articles.length / articlesPerPage)}
                className="px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-xl disabled:opacity-30 hover:bg-white/10 hover:border-blue-500/30 transition-all disabled:cursor-not-allowed"
              >
                Next
              </button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
