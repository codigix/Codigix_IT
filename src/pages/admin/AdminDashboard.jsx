import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Quote, 
  TrendingUp, 
  Users, 
  User,
  Calendar,
  MoreVertical,
  RefreshCw,
  Send,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    slides: 0,
    services: 0,
    projects: 0,
    blogs: 0,
    testimonials: 0,
    clients: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const entities = ['slides', 'services', 'projects', 'blogs', 'testimonials', 'clients'];
      const results = await Promise.all(
        entities.map(entity => fetch(`${API_BASE_URL}/${entity}`).then(res => res.json()))
      );
      
      const newStats = {};
      entities.forEach((entity, index) => {
        newStats[entity] = Array.isArray(results[index]) ? results[index].length : 0;
      });
      setStats(newStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Auto-refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const uboldStats = [
    { label: 'Services', value: stats.services.toString(), icon: Briefcase, color: 'text-blue-400', trend: '+12%', isPositive: true, bg: 'bg-blue-400/10' },
    { label: 'Projects', value: stats.projects.toString(), icon: FileText, color: 'text-emerald-400', trend: '+5%', isPositive: true, bg: 'bg-emerald-400/10' },
    { label: 'Articles', value: stats.blogs.toString(), icon: MessageSquare, color: 'text-pink-400', trend: '+8%', isPositive: true, bg: 'bg-pink-400/10' },
    { label: 'Reviews', value: stats.testimonials.toString(), icon: Quote, color: 'text-amber-400', trend: '-2%', isPositive: false, bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {uboldStats.map((stat, idx) => (
          <div key={idx} className="bg-[#252841]/60 backdrop-blur-md p-2 rounded-2xl border border-slate-800/30 hover:border-[#FF1F8B]/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} transition-transform group-hover:scale-110`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[9px]  px-2 py-0.5 rounded-full ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div>
              <h3 className="text-3xl  text-white leading-none tracking-tighter">{stat.value}</h3>
              <p className="text-[9px]  text-slate-500 uppercase tracking-[0.2em] mt-3">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Overview Chart */}
        <div className="lg:col-span-2 bg-[#252841]/60 backdrop-blur-md rounded-2xl border border-slate-800/30 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-[10px]  text-white uppercase tracking-[0.2em]">Traffic Analysis</h4>
              <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase tracking-widest">Real-time engagement metrics</p>
            </div>
            <div className="flex items-center gap-1 bg-[#1A1C2E]/50 p-1 rounded-xl border border-slate-800/30">
              <button className="px-3 py-1.5 text-[9px]  text-slate-500 hover:text-white transition-all uppercase tracking-widest">Day</button>
              <button className="px-3 py-1.5 text-[9px]  text-white bg-[#FF1F8B] rounded-lg shadow-lg shadow-[#FF1F8B]/20 uppercase tracking-widest">Week</button>
            </div>
          </div>
          
          <div className="h-[280px] w-full relative group/chart">
            <div className="absolute inset-0 flex flex-col justify-between py-1">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full border-t border-slate-800/20 flex items-center h-0 relative">
                  <span className="absolute -left-6 text-[8px]  text-slate-700">{100 - i * 33}%</span>
                </div>
              ))}
            </div>
            
            <div className="relative h-full w-full flex items-end pt-6">
               <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                 <defs>
                   <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#FF1F8B" stopOpacity="0.2" />
                     <stop offset="100%" stopColor="#FF1F8B" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 <path 
                   d="M0,80 C100,70 150,20 250,30 C350,40 450,80 550,70 C650,60 750,10 850,20 C950,30 1000,50 1000,50 V100 H0 Z" 
                   fill="url(#chartGradient)" 
                 />
                 <path 
                   d="M0,80 C100,70 150,20 250,30 C350,40 450,80 550,70 C650,60 750,10 850,20 C950,30 1000,50 1000,50" 
                   fill="none" 
                   stroke="#FF1F8B" 
                   strokeWidth="3" 
                   strokeLinecap="round"
                 />
               </svg>
            </div>
            
            <div className="flex justify-between mt-4 px-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(m => (
                <span key={m} className="text-[9px]  text-slate-600 uppercase tracking-widest">{m}</span>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-8 mt-6 pt-6 border-t border-slate-800/20">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF1F8B]"></div>
              <div>
                <span className="text-[9px]  text-slate-500 uppercase tracking-[0.2em] block">Visitors</span>
                <span className="text-sm  text-white">12,402</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-600"></div>
              <div>
                <span className="text-[9px]  text-slate-500 uppercase tracking-[0.2em] block">Sessions</span>
                <span className="text-sm  text-white">8,145</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          {/* Projects Status */}
          <div className="bg-[#252841]/60 backdrop-blur-md rounded-2xl border border-slate-800/30 p-5">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-[10px]  text-white uppercase tracking-[0.2em]">Active Tasks</h4>
              <button onClick={fetchStats} className="p-2 hover:bg-white/5 rounded-lg text-slate-500 transition-all">
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-5">
              {[
                { name: 'UI/UX REDESIGN', val: 75, color: 'bg-[#FF1F8B]' },
                { name: 'API INTEGRATION', val: 45, color: 'bg-blue-500' },
                { name: 'CLOUD MIGRATION', val: 90, color: 'bg-emerald-500' }
              ].map((proj, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]  text-slate-300 uppercase tracking-widest">{proj.name}</span>
                    <span className="text-[9px]  text-slate-500">{proj.val}%</span>
                  </div>
                  <div className="w-full bg-[#1A1C2E] h-1.5 rounded-full overflow-hidden">
                    <div className={`${proj.color} h-full rounded-full transition-all duration-1000 shadow-lg`} style={{ width: `${proj.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-[#252841]/60 backdrop-blur-md rounded-2xl border border-slate-800/30 p-5">
            <h4 className="text-[10px]  text-white uppercase tracking-[0.2em] mb-6">System Health</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1C2E]/50 border border-slate-800/20">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px]  text-white uppercase tracking-wider">Server Nodes</p>
                  <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Operational</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#1A1C2E]/50 border border-slate-800/20">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px]  text-white uppercase tracking-wider">Backup Status</p>
                  <p className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">Last sync 12m ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity / Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#252841]/60 backdrop-blur-md rounded-2xl border border-slate-800/30 overflow-hidden flex flex-col h-[380px]">
          <div className="p-4 border-b border-slate-800/30 flex items-center justify-between bg-[#1A1C2E]/30">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF1F8B] animate-pulse"></div>
              <h4 className="text-[10px]  text-white uppercase tracking-[0.2em]">Support Console</h4>
            </div>
            <MoreVertical className="w-4 h-4 text-slate-500 cursor-pointer" />
          </div>
          <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 shrink-0">
                <Users className="w-4 h-4" />
              </div>
              <div className="bg-[#1A1C2E]/50 border border-slate-800/20 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                <p className="text-[11px] font-bold text-slate-300 leading-relaxed uppercase tracking-wide">Incoming request from node-742. Connection secured.</p>
                <span className="text-[8px] text-slate-600  block mt-2 uppercase tracking-[0.2em]">08:55 AM • SYSTEM</span>
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-slate-800/20 flex items-center justify-center text-slate-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-[#FF1F8B]/5 border border-[#FF1F8B]/10 p-4 rounded-2xl rounded-tr-none max-w-[85%]">
                <p className="text-[11px] font-bold text-white leading-relaxed uppercase tracking-wide">Acknowledged. Monitoring traffic spikes now.</p>
                <span className="text-[8px] text-[#FF1F8B]/70  block mt-2 uppercase tracking-[0.2em]">08:57 AM • ADMIN</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-800/30 bg-[#1A1C2E]/30 flex gap-3">
            <input 
              type="text" 
              placeholder="COMMAND..." 
              className="flex-1 bg-[#1A1C2E] border border-slate-800/30 text-[10px]  rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF1F8B]/40 transition-all placeholder:text-slate-700 uppercase tracking-widest" 
            />
            <button className="bg-[#FF1F8B] text-white p-3 rounded-xl hover:bg-[#FF1F8B]/90 transition-all shadow-lg shadow-[#FF1F8B]/20">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-[#252841]/60 backdrop-blur-md rounded-2xl border border-slate-800/30 p-6">
          <h4 className="text-[10px]  text-white uppercase tracking-[0.2em] mb-6">Database Distribution</h4>
          <div className="flex items-center justify-center h-[240px]">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="8" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FF1F8B" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="62.8" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#00D1FF" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset="188.4" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl  text-white leading-none tracking-tighter">84%</span>
                <span className="text-[8px] text-slate-500  uppercase tracking-widest mt-1">Optimized</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#FF1F8B]"></div>
              <span className="text-[9px]  text-slate-400 uppercase tracking-widest">Media Files</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00D1FF]"></div>
              <span className="text-[9px]  text-slate-400 uppercase tracking-widest">Records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
