import React, { useState, useEffect } from 'react';
import {
  FileText,
  Download,
  RefreshCw,
  Search,
  Mail,
  Phone,
  Calendar,
  Inbox
} from 'lucide-react';
import config from '../../../config';

const API_BASE_URL = config.API_BASE_URL;

const ApplicationsAdmin = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/applications`);
      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
    setLoading(false);
  };

  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header Actions Container */}
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-white dark:bg-[#0c0828]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-200 dark:border-purple-900/30 gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl text-slate-900 dark:text-white font-extrabold tracking-tight uppercase">Job Applications</h2>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest mt-1">{applications.length} Total Applications</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-455 group-focus-within:text-purple-500 transition-colors" />
            <input
              type="text"
              placeholder="SEARCH APPLICATIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-80 bg-slate-50 dark:bg-[#1A1C2E] border border-slate-200 dark:border-purple-900/30 rounded-xl pl-10 pr-4 py-2.5 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-purple-650 transition-all placeholder:text-slate-400"
            />
          </div>
          <button
            onClick={fetchApplications}
            disabled={loading}
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-purple-900/20 border border-slate-200 dark:border-purple-900/30 rounded-xl text-slate-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all flex items-center justify-center disabled:opacity-50"
            title="Reload Applications"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#0c0828]/40 backdrop-blur-md border border-slate-200 dark:border-purple-900/30 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-650 rounded-full animate-spin mx-auto mb-5"></div>
            <p className="text-slate-500 dark:text-gray-400 text-[10px] uppercase font-bold tracking-widest">Loading Applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-[#1A1C2E] flex items-center justify-center text-slate-400 text-3xl border border-slate-200 dark:border-purple-900/30 rotate-3">
              <Inbox className="w-15 h-15" />
            </div>
            <div className="max-w-xs mx-auto">
              <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight uppercase">No applications found</p>
              <p className="text-slate-500 dark:text-gray-450 text-[10px] mt-2 font-bold uppercase tracking-wider leading-relaxed">Incoming job applications and resume uploads will appear here dynamically.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px] border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#1A1C2E]/50 border-b border-slate-200 dark:border-purple-900/30">
                  <th className="pl-8 pr-6 py-5 text-[10px] text-slate-550 dark:text-gray-400 uppercase tracking-widest font-bold">Candidate</th>
                  <th className="px-6 py-5 text-[10px] text-slate-550 dark:text-gray-400 uppercase tracking-widest font-bold">Contact info</th>
                  <th className="px-6 py-5 text-[10px] text-slate-550 dark:text-gray-400 uppercase tracking-widest font-bold">Applied For</th>
                  <th className="px-6 py-5 text-[10px] text-slate-550 dark:text-gray-400 uppercase tracking-widest font-bold">Date</th>
                  <th className="pl-6 pr-8 py-5 text-[10px] text-slate-550 dark:text-gray-400 uppercase tracking-widest font-bold text-right">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/10">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/15 transition-all group/row">
                    <td className="pl-8 pr-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm uppercase shrink-0">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wide group-hover/row:text-purple-650 transition-colors">{app.name}</p>
                          <p className="text-slate-500 text-[10px] tracking-wider font-semibold mt-0.5">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-gray-300 font-medium">
                          <Mail className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-gray-300 font-medium">
                          <Phone className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                          <span className="text-xs">{app.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3.5 py-1.5 rounded-full bg-purple-50 text-purple-600 border border-purple-200/50 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900/30 text-[10px] uppercase font-extrabold tracking-widest">
                        Job ID: #{app.job_id}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-slate-550 dark:text-gray-400 text-xs font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{new Date(app.applied_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    </td>
                    <td className="pl-6 pr-8 py-6 text-right">
                      <a
                        href={`${config.API_BASE_URL.replace('/api', '')}${app.resume_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-purple-600 dark:bg-purple-800 hover:bg-purple-750 dark:hover:bg-purple-900 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-purple-600/25 active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default ApplicationsAdmin;
