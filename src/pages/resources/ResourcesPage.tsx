import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Plus, Download, FileText, Search, Shield, Filter, Eye } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResourcesPage: React.FC = () => {
  const { resources, downloadResource } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-600" />
            <span>Institutional Knowledge & Resource Library</span>
          </h1>
          <p className="text-xs text-slate-500">
            Version-controlled archives, CAD models, pitch decks, and financial templates preserving knowledge across student batches.
          </p>
        </div>
        <Link
          to="/resources/upload"
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-2xs transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Resource</span>
        </Link>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search documents, CAD models, design assets..."
            className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['All', 'Code & Repo', 'Design & Brand', 'Financial & Budget', 'SOP & Guidelines', 'CFM Documents'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors shrink-0 ${
                categoryFilter === cat ? 'bg-purple-600 text-white font-bold' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(res => (
          <div key={res.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  {res.category}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  v{res.version} • {res.fileSize}
                </span>
              </div>

              <Link to={`/resources/${res.id}`} className="block hover:text-purple-600 transition-colors">
                <h3 className="text-sm font-bold text-slate-900 hover:text-purple-600 leading-snug">{res.title}</h3>
              </Link>
              <p className="text-xs text-slate-600 line-clamp-2">{res.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center justify-between text-[11px]">
                <span>Uploaded by: <strong className="text-slate-800">{res.uploadedByName || res.uploadedBy}</strong></span>
                <span className="text-slate-400">{res.uploadedAt || new Date(res.uploadDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg">
                  {res.downloadCount} Downloads
                </span>

                <button
                  onClick={() => downloadResource(res.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-2xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
