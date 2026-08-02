import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ArrowRight
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
            color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20'
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
            color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/20'
          });
        });
      }

      // Sort descending (most recent first) and take top 5
      combined.sort((a, b) => b.date - a.date);
      setRecentActivities(combined.slice(0, 5));

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
    {
      label: 'Blogs Posting',
      value: stats.blogs.toString(),
      icon: MessageSquare,
      color: 'text-purple-600 dark:text-purple-400',
      trend: '+14%',
      bg: 'bg-purple-50 dark:bg-purple-950/20',
      border: 'hover:border-purple-500/30',
      path: '/admin/blogs'
    },
    {
      label: 'Job Posting',
      value: stats.jobs.toString(),
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      trend: '+8%',
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      border: 'hover:border-blue-500/30',
      path: '/admin/jobs'
    },
    {
      label: 'Reviews Posting',
      value: stats.testimonials.toString(),
      icon: Quote,
      color: 'text-amber-600 dark:text-amber-400',
      trend: '+12%',
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      border: 'hover:border-amber-500/30',
      path: '/admin/testimonials'
    },
    {
      label: 'Client Add Only',
      value: stats.clients.toString(),
      icon: Users,
      color: 'text-emerald-600 dark:text-emerald-400',
      trend: '+20%',
      bg: 'bg-emerald-50 dark:bg-emerald-950/20',
      border: 'hover:border-emerald-500/30',
      path: '/admin/clients'
    },
    {
      label: 'Collect Resumes',
      value: stats.applications.toString(),
      icon: FileText,
      color: 'text-rose-600 dark:text-rose-400',
      trend: '+24%',
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      border: 'hover:border-rose-500/30',
      path: '/admin/applications'
    },
    {
      label: 'Contact Inquiries',
      value: stats.inquiries.toString(),
      icon: Globe,
      color: 'text-cyan-600 dark:text-cyan-400',
      trend: '+16%',
      bg: 'bg-cyan-50 dark:bg-cyan-950/20',
      border: 'hover:border-cyan-500/30',
      path: '/admin/inquiries'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">

      {/* Welcome Header */}
      <div className="bg-white dark:bg-[#0c0828] p-6 md:p-8 rounded-3xl border border-slate-250 dark:border-purple-900/20 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              Welcome back, Admin <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-gray-400 font-medium mt-1">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold bg-white dark:bg-[#0c0828] border border-slate-200 dark:border-purple-900/30 text-slate-700 dark:text-white rounded-xl hover:bg-slate-50 dark:hover:bg-[#160d3d] hover:shadow-md transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metricCards.map((card, idx) => (
          <motion.div
            key={idx}
            onClick={() => navigate(card.path)}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className={`bg-white dark:bg-[#0c0828] p-6 rounded-2xl border border-slate-200/90 dark:border-purple-900/20 ${card.border} transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_8px_30px_rgba(139,92,246,0.08)] cursor-pointer group relative overflow-hidden`}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center ${card.color} border border-purple-500/10 group-hover:scale-105 transition-transform`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                {card.trend}
              </span>
            </div>

            <div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
                {card.value}
              </h3>
              <div className="flex items-center justify-between mt-3">
                <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-extrabold tracking-wider">{card.label}</p>
                <span className="text-[9px] text-purple-650 dark:text-purple-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Manage &rarr;</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Analytics & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Engagement Analytics Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0c0828] rounded-2xl border border-slate-200/90 dark:border-purple-900/20 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xs text-slate-950 dark:text-white uppercase font-extrabold tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  Traffic Engagement
                </h4>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest">Real-time system telemetry analytics</p>
              </div>
              <span className="px-3 py-1.5 text-[9px] font-extrabold text-purple-655 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-500/10 uppercase tracking-widest">
                Live Monitor
              </span>
            </div>

            <div className="h-[200px] w-full relative">
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {[0, 1, 2, 3].map(i => (
                  <div key={i} className="w-full border-t border-slate-100 dark:border-slate-800/20 flex items-center h-0 relative">
                    <span className="absolute -left-6 text-[8px] text-slate-400">{100 - i * 33}%</span>
                  </div>
                ))}
              </div>

              <div className="relative h-full w-full flex items-end pt-6">
                <svg className="w-full h-full" viewBox="0 0 1000 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,80 C100,70 150,20 250,30 C350,40 450,80 550,70 C650,60 750,10 850,20 C950,30 1000,50 1000,50 V100 H0 Z"
                    fill="url(#chartGradient)"
                  />
                  <path
                    d="M0,80 C100,70 150,20 250,30 C350,40 450,80 550,70 C650,60 750,10 850,20 C950,30 1000,50 1000,50"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div className="flex justify-between mt-6 px-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(m => (
                  <span key={m} className="text-[9px] text-slate-650 dark:text-slate-500 uppercase font-bold tracking-widest">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Database Status & Health */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0c0828] rounded-2xl border border-slate-200/90 dark:border-purple-900/20 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
            <h4 className="text-xs text-slate-950 dark:text-white uppercase font-extrabold tracking-wider mb-6 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              Service Status
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-purple-950/10 border border-slate-100 dark:border-purple-900/10">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-500 shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">MySQL Cloud</p>
                  <p className="text-[8px] text-emerald-600 dark:text-emerald-500 uppercase font-bold tracking-widest mt-0.5">CONNECTED & ACTIVE</p>
                </div>
              </div>
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-purple-950/10 border border-slate-100 dark:border-purple-900/10">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">REST API Gateway</p>
                  <p className="text-[8px] text-slate-500 dark:text-gray-400 uppercase font-bold tracking-widest mt-0.5">ONLINE • PORT 5173/5175</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redesigned Active Activity Stream Table */}
      <div className="bg-white dark:bg-[#0c0828] rounded-2xl border border-slate-200/90 dark:border-purple-900/20 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.02)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-xs text-slate-950 dark:text-white uppercase font-extrabold tracking-wider flex items-center gap-2">
              <Inbox className="w-4 h-4 text-indigo-500" />
              Incoming Activity Stream
            </h4>
            <p className="text-[10px] text-slate-500 dark:text-gray-400 font-bold mt-1 uppercase tracking-widest">Recent contact messages and resume submissions</p>
          </div>
          <span className="text-[10px] text-slate-400 uppercase font-bold">Showing top 5</span>
        </div>

        {recentActivities.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center justify-center gap-3 bg-slate-50 dark:bg-[#130d3a]/15 rounded-xl border border-dashed border-slate-200 dark:border-purple-900/20">
            <Inbox className="w-10 h-10 text-slate-400 dark:text-gray-600 animate-bounce" />
            <p className="text-slate-800 dark:text-slate-350 text-xs font-bold uppercase tracking-wider">No new user activities</p>
            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Inquiries and application resumes will appear here automatically.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-[#130d3a]/40 border-b border-slate-200 dark:border-purple-900/20">
                  <th className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest">Sender Details</th>
                  <th className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest">Type</th>
                  <th className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest">Information / Subject</th>
                  <th className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest">Date Submitted</th>
                  <th className="px-4 py-3 text-[10px] text-slate-500 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-purple-900/10">
                {recentActivities.map((act, index) => (
                  <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-purple-950/10 transition-colors">
                    <td className="px-4 py-4 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">{act.name}</td>
                    <td className="px-4 py-4">
                      <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border ${act.type === 'Inquiry'
                        ? 'bg-cyan-50 text-cyan-600 border-cyan-200/50 dark:bg-cyan-950/30 dark:text-cyan-400 dark:border-cyan-900/30'
                        : 'bg-rose-50 text-rose-600 border-rose-200/50 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/30'
                        } uppercase tracking-widest`}>
                        {act.type}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600 dark:text-gray-405 font-medium truncate max-w-xs">{act.detail}</td>
                    <td className="px-4 py-4 text-[10px] text-slate-500 dark:text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {act.date.toLocaleDateString()} {act.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => navigate(act.type === 'Inquiry' ? '/admin/inquiries' : '/admin/applications')}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-purple-650 dark:text-purple-400 hover:underline uppercase tracking-widest"
                      >
                        Inspect <ArrowRight className="w-3 h-3" />
                      </button>
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

export default AdminDashboard;
