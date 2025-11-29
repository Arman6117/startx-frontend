import React, { useState } from "react";
import { Upload, CheckCircle2, Eye, FileText, Loader2, ArrowRight, XCircle } from 'lucide-react';

const FileUpload = ({ file, setFile, jobDescription, setJobDescription, handleUpload, loading, error, setError }) => {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError("");
      setShowPdfPreview(false);
    } else {
      setError("Please select a valid PDF file.");
      setFile(null);
    }
  };

  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Upload className="w-6 h-6 text-blue-400" /> Upload & Analyze
      </h2>

      <div className="relative group mb-6">
        <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
        <label className="block border-2 border-dashed border-white/20 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-500/50 hover:bg-white/5 cursor-pointer">
          <div className="flex flex-col items-center justify-center space-y-4">
            {file ? (
              <>
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">{file.name}</p>
                  <p className="text-slate-400 text-sm mt-1">Click to change file</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                  <Upload className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">Upload Resume (PDF)</p>
                  <p className="text-slate-400 text-sm mt-1">Drag & drop or click to browse</p>
                </div>
              </>
            )}
          </div>
        </label>
      </div>

      {file && (
        <button onClick={() => setShowPdfPreview(!showPdfPreview)} className="w-full mb-6 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
          <Eye className="w-5 h-5" /> <span>{showPdfPreview ? "Hide Preview" : "Preview PDF"}</span>
        </button>
      )}

      {file && showPdfPreview && (
        <div className="mb-6 border border-white/10 rounded-xl overflow-hidden">
          <object data={URL.createObjectURL(file)} type="application/pdf" width="100%" height="500px" className="w-full">
            <p className="text-slate-400 p-4">Preview not available.</p>
          </object>
        </div>
      )}

      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-semibold text-slate-300 mb-2">
          <FileText className="w-4 h-4 text-purple-400" /> Job Description (Optional)
        </label>
        <textarea
          placeholder="Paste job description..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full p-4 bg-white/5 border border-white/10 text-white rounded-xl focus:outline-none focus:border-blue-500/50 min-h-[150px]"
        />
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl">
          <XCircle className="w-5 h-5" /> <p className="text-sm">{error}</p>
        </div>
      )}

      <button onClick={handleUpload} disabled={loading || !file} className="group relative w-full">
        <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300 ${(loading || !file) && 'opacity-30'}`} />
        <div className="relative w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3">
          {loading ? <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing...</> : <>Generate Analysis <ArrowRight className="w-6 h-6" /></>}
        </div>
      </button>
    </div>
  );
};

export default FileUpload;
