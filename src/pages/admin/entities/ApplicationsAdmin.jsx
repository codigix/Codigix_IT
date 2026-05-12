import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  RefreshCw, 
  Search,
  ExternalLink,
  Mail,
  Phone,
  Calendar,
  User
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
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-[#252841]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/30 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D1FF]/10 flex items-center justify-center text-[#00D1FF] border border-[#00D1FF]/20">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl text-white tracking-tight uppercase">Job Applications</h2>
            <p className="text-slate-500 text-[9px] uppercase tracking-[0.2em] mt-1">{applications.length} Total Applications</p>
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-[#00D1FF] transition-colors" />
          <input 
            type="text" 
            placeholder="SEARCH APPLICATIONS..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 bg-[#1A1C2E] border border-slate-800/30 rounded-xl pl-10 pr-4 py-2 text-[10px] font-bold text-white uppercase tracking-widest focus:outline-none focus:border-[#00D1FF]/40 transition-all"
          />
        </div>
      </div>

      <div className="bg-[#252841]/40 backdrop-blur-md border border-slate-800/30 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-24 text-center">
            <RefreshCw className="w-10 h-10 animate-spin text-[#00D1FF] mx-auto mb-4" />
            <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em]">Loading Applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="p-24 text-center flex flex-col items-center gap-4">
            <FileText className="w-16 h-16 text-slate-700 mb-2" />
            <p className="text-white text-lg uppercase">No applications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-[#1A1C2E]/50 border-b border-slate-800/30">
                  <th className="pl-8 pr-6 py-5 text-[9px] text-slate-500 uppercase tracking-[0.2em]">Candidate</th>
                  <th className="px-6 py-5 text-[9px] text-slate-500 uppercase tracking-[0.2em]">Contact info</th>
                  <th className="px-6 py-5 text-[9px] text-slate-500 uppercase tracking-[0.2em]">Applied For</th>
                  <th className="px-6 py-5 text-[9px] text-slate-500 uppercase tracking-[0.2em]">Date</th>
                  <th className="pl-6 pr-8 py-5 text-[9px] text-slate-500 uppercase tracking-[0.2em] text-right">Resume</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/20">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-white/5 transition-all group/row">
                    <td className="pl-8 pr-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00D1FF] to-[#00D1FF]/30 flex items-center justify-center text-white font-bold text-lg">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm uppercase">{app.name}</p>
                          <p className="text-slate-500 text-[10px] tracking-wider">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Mail className="w-3 h-3" />
                          <span className="text-[10px]">{app.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Phone className="w-3 h-3" />
                          <span className="text-[10px]">{app.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="px-3 py-1 rounded-full bg-[#FF1F8B]/10 text-[#FF1F8B] text-[10px] uppercase font-bold border border-[#FF1F8B]/20">
                        Job ID: {app.job_id}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Calendar className="w-3 h-3" />
                        <span className="text-[10px]">{new Date(app.applied_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="pl-6 pr-8 py-6 text-right">
                      <a 
                        href={`${config.API_BASE_URL.replace('/api', '')}${app.resume_url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#00D1FF] hover:bg-[#00D1FF]/80 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#00D1FF]/20"
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
