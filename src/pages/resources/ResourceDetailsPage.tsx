import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Download, ArrowLeft, Clock, User as UserIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ResourceDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { resources } = useApp();
  
  const resource = resources.find(r => r.id === Number(id)) || resources[0];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/resources" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Resources</span>
      </Link>
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">{resource?.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                  {resource?.category}
                </span>
                <span className="text-xs text-slate-500 font-semibold">{resource?.fileSize}</span>
              </div>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Description</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              {resource?.description || 'No description provided for this resource.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Version</span>
              <span className="text-xs font-semibold text-slate-800">{resource?.version}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Downloads</span>
              <span className="text-xs font-semibold text-slate-800">{resource?.downloadCount}</span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Uploaded By</span>
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                <UserIcon className="w-3 h-3 text-slate-400" />
                {resource?.uploadedBy}
              </span>
            </div>
            <div>
              <span className="block text-[10px] font-bold text-slate-400 uppercase">Uploaded On</span>
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {resource?.uploadDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
