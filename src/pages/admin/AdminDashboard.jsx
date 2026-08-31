import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  FileText,
  MessageSquare,
  Quote,
  Users,
  Globe,
  RefreshCw,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  CheckCircle,
  Inbox,
  Clock,
  ArrowRight,
  Activity,
  Server,
  Zap,
  ShieldCheck
} from 'lucide-react';
import config from '../../config';

const API_BASE_URL = config.API_BASE_URL;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    blogs: 0,
    jobs: 0,
    testimonials: 0,
    clients: 0,
    applications: 0,
    inquiries: 0
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch counts
      const entities = ['blogs', 'jobs', 'testimonials', 'clients', 'applications', 'inquiries'];
      const countResults = await Promise.all(
        entities.map(entity =>
          fetch(`${API_BASE_URL}/${entity}/count`)
            .then(res => res.json())
            .catch(() => ({ count: 0 }))
        )
      );

      const newStats = {};
      entities.forEach((entity, index) => {
        newStats[entity] = countResults[index] ? countResults[index].count : 0;
      });
      setStats(newStats);

      // 2. Fetch recent inquiries and applications for timeline
      const [inquiriesRes, applicationsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/inquiries`).then(res => res.json()).catch(() => []),
        fetch(`${API_BASE_URL}/applications`).then(res => res.json()).catch(() => [])
      ]);

      // Combine and sort by date/time
      const combined = [];

      if (Array.isArray(inquiriesRes)) {
        inquiriesRes.forEach(inq => {
          combined.push({
            id: inq.id,
            type: 'Inquiry',
            name: inq.name,
            detail: inq.subject || 'General Inquiry',
            date: inq.submitted_at ? new Date(inq.submitted_at) : new Date(),
            icon: Globe,
            color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
          });
        });
      }

      if (Array.isArray(applicationsRes)) {
        applicationsRes.forEach(app => {
          combined.push({
            id: app.id,
            type: 'Resume',
            name: app.name,
            detail: `Applied for Job #${app.job_id || 'N/A'}`,
            date: app.applied_at ? new Date(app.applied_at) : new Date(),
            icon: FileText,
            color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
          });
        });
      }

      // Sort descending (most recent first) and take top 6
      combined.sort((a, b) => b.date - a.date);
      setRecentActivities(combined.slice(0, 6));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
      clearInterval(clockInterval);
    };
  }, []);

  const metricCards = [
    { label: 'Active Jobs', value: stats.jobs.toString(), icon: Briefcase, color: 'text-blue-500', glow: 'shadow-blue-500/20', bg: 'bg-blue-500/10', path: '/admin/jobs', trend: '+8%' },
    { label: 'Resumes', value: stats.applications.toString(), icon: FileText, color: 'text-rose-500', glow: 'shadow-rose-500/20', bg: 'bg-rose-500/10', path: '/admin/applications', trend: '+24%' },
    { label: 'Inquiries', value: stats.inquiries.toString(), icon: Inbox, color: 'text-cyan-500', glow: 'shadow-cyan-500/20', bg: 'bg-cyan-500/10', path: '/admin/inquiries', trend: '+16%' },
    { label: 'Published Blogs', value: stats.blogs.toString(), icon: MessageSquare, color: 'text-purple-500', glow: 'shadow-purple-500/20', bg: 'bg-purple-500/10', path: '/admin/blogs', trend: '+14%' },
    { label: 'Client Trust', value: stats.clients.toString(), icon: Users, color: 'text-emerald-500', glow: 'shadow-emerald-500/20', bg: 'bg-emerald-500/10', path: '/admin/clients', trend: '+20%' },
    { label: 'Testimonials', value: stats.testimonials.toString(), icon: Quote, color: 'text-amber-500', glow: 'shadow-amber-500/20', bg: 'bg-amber-500/10', path: '/admin/testimonials', trend: '+12%' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12 w-full max-w-[1600px] mx-auto">

      {/* 1. Command Center Header */}
      <div className="relative overflow-hidden bg-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group/header">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover/header:bg-purple-500/30 transition-colors duration-700" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-[1px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2">
              System Command Center
            </h1>
            <p className="text-sm text-slate-400 font-medium mt-1 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 text-sm font-bold bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300 disabled:opacity-50 backdrop-blur-md cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Telemetry
          </button>
        </div>
      </div>

      {/* 2. Core Analytics Hub (Metric Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metricCards.map((card, idx) => (
          <motion.div
            key={idx}
            onClick={() => navigate(card.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group relative overflow-hidden flex flex-col justify-between h-40"
          >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${card.bg} blur-2xl group-hover:scale-150 transition-transform duration-500`} />
            
            <div className="flex items-start justify-between relative z-10">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center ${card.color} shadow-lg ${card.glow} group-hover:scale-110 transition-transform`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 ${card.color} shadow-sm flex items-center gap-1`}>
                <ArrowUpRight className="w-3 h-3" />
                {card.trend}
              </span>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {card.value}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase font-extrabold tracking-widest mt-1 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                {card.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Live Telemetry & Infrastructure */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Engagement Analytics Chart */}
        <div className="xl:col-span-2 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 shadow-sm flex flex-col justify-between overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h4 className="text-sm text-slate-900 dark:text-white uppercase font-black tracking-widest flex items-center gap-2">
                <Activity className="w-5 h-5 text-indigo-500" />
                Live System Telemetry
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Real-time engagement & traffic volume across all nodes</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-200 dark:border-indigo-500/20 text-[10px] font-black tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Monitoring Active
            </div>
          </div>

          {/* Premium CSS-based Chart Visualization */}
          <div className="h-[250px] w-full relative z-10">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-2">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="w-full border-t border-dashed border-slate-200 dark:border-slate-700/50 flex items-center h-0 relative">
                  <span className="absolute -left-6 text-[9px] text-slate-400 dark:text-slate-500 font-bold">{100 - i * 33}%</span>
                </div>
              ))}
            </div>

            {/* Glowing SVG Wave */}
            <div className="relative h-full w-full flex items-end pt-8">
              <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" viewBox="0 0 1000 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,80 C150,70 250,20 350,30 C450,40 550,90 650,60 C750,30 850,20 1000,50 L1000,100 L0,100 Z"
                  fill="url(#premiumGradient)"
                  className="animate-[pulse_4s_ease-in-out_infinite]"
                />
                <path
                  d="M0,80 C150,70 250,20 350,30 C450,40 550,90 650,60 C750,30 850,20 1000,50"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="flex justify-between mt-4 px-4 relative z-10 border-t border-slate-200 dark:border-slate-800 pt-4">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(m => (
                <span key={m} className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Infrastructure Health Monitor */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 shadow-sm flex flex-col">
          <h4 className="text-sm text-slate-900 dark:text-white uppercase font-black tracking-widest mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-500" />
            Infrastructure Health
          </h4>
          
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Database Node */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 shadow-lg shadow-emerald-500/10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">MySQL Cloud</p>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-500 uppercase font-bold tracking-widest mt-1">CONNECTED & SECURE</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full w-[99%]" />
                </div>
              </div>
            </div>

            {/* API Node */}
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-sm hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0 shadow-lg shadow-cyan-500/10">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">REST API Gateway</p>
                  <span className="flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                </div>
                <p className="text-[10px] text-cyan-600 dark:text-cyan-500 uppercase font-bold tracking-widest mt-1">ONLINE • PORT 5173</p>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-cyan-500 h-full rounded-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Activity Stream Ledger */}
      <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 dark:border-slate-800/60 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h4 className="text-sm text-slate-900 dark:text-white uppercase font-black tracking-widest flex items-center gap-2">
              <Inbox className="w-5 h-5 text-pink-500" />
              Incoming Activity Ledger
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Real-time log of customer inquiries and ATS resume submissions</p>
          </div>
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-black uppercase tracking-widest rounded-lg border border-slate-200 dark:border-slate-700">
            Top {recentActivities.length} Records
          </span>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-950 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center animate-pulse">
              <Inbox className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <div>
              <p className="text-slate-800 dark:text-slate-200 text-sm font-black uppercase tracking-wider">No Activity Detected</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-1">Inquiries and application resumes will appear here automatically.</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px] border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Sender Entity</th>
                  <th className="px-4 py-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Type</th>
                  <th className="px-4 py-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Subject Detail</th>
                  <th className="px-4 py-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest">Timestamp</th>
                  <th className="px-4 py-4 text-[10px] text-slate-500 dark:text-slate-400 uppercase font-black tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                <AnimatePresence>
                  {recentActivities.map((act, index) => (
                    <motion.tr 
                      key={`${act.type}-${act.id}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group/row hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${act.color}`}>
                            <act.icon className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{act.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className={`text-[10px] font-black px-3 py-1.5 rounded-md border uppercase tracking-widest shadow-sm ${act.color}`}>
                          {act.type}
                        </span>
                      </td>
                      <td className="px-4 py-5 text-xs text-slate-600 dark:text-slate-400 font-medium truncate max-w-[250px]">{act.detail}</td>
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {act.date.toLocaleDateString()} • {act.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-4 py-5 text-right">
                        <button
                          onClick={() => navigate(act.type === 'Inquiry' ? '/admin/inquiries' : '/admin/applications')}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] font-black text-slate-700 dark:text-slate-300 rounded-lg hover:border-slate-300 dark:hover:border-slate-500 hover:shadow-md transition-all uppercase tracking-widest cursor-pointer group-hover/row:border-purple-500/50 group-hover/row:text-purple-600 dark:group-hover/row:text-purple-400"
                        >
                          Inspect <ArrowRight className="w-3 h-3" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
