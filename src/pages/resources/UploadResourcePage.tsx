import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderGit2, Upload, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResourceCategory } from '../../types';

export const UploadResourcePage: React.FC = () => {
  const navigate = useNavigate();
  const { addResource } = useApp();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ResourceCategory>('SOP & Guidelines');
  const [fileUrl, setFileUrl] = useState('');
  const [fileSize, setFileSize] = useState('4.2 MB');
  const [version, setVersion] = useState('1.0');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addResource({
      title,
      description,
      category,
      fileUrl: fileUrl || 'https://iitm.ac.in/assets/doc.pdf',
      fileType: 'pdf',
      fileSize,
      version
    });
    navigate('/resources');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <FolderGit2 className="w-5 h-5 text-purple-600" />
          <span>Archive Institutional Resource</span>
        </h1>
        <p className="text-xs text-slate-500">
          Upload documents, templates, CAD files, or brand assets with clear versioning.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Shaastra 2026 Sponsorship Pitch Deck & Budget Sheet"
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Description & Version Notes</label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Document overview and version changes..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value as ResourceCategory)}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs bg-white"
            >
              <option value="SOP & Guidelines">SOP & Guidelines</option>
              <option value="Code & Repo">Code & Repo</option>
              <option value="Design & Brand">Design & Brand</option>
              <option value="Financial & Budget">Financial & Budget</option>
              <option value="CFM Documents">CFM Documents</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Version Number</label>
            <input
              type="text"
              value={version}
              onChange={e => setVersion(e.target.value)}
              placeholder="e.g. 1.0 or 2.1"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">File Size</label>
            <input
              type="text"
              value={fileSize}
              onChange={e => setFileSize(e.target.value)}
              placeholder="e.g. 5.1 MB"
              className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">File Storage URL / Link</label>
          <input
            type="url"
            value={fileUrl}
            onChange={e => setFileUrl(e.target.value)}
            placeholder="https://drive.google.com/..."
            className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/resources')}
            className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Resource</span>
          </button>
        </div>
      </form>
    </div>
  );
};
