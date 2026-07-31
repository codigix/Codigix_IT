import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getDefaultData } from './crmTabData';

const allCrmModules = [
  { title: 'Sales CRM', icon: 'TrendingUp', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Lead Management', icon: 'Filter', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'Marketing Automation', icon: 'Share2', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'Customer Support', icon: 'MessageSquare', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'Service Management', icon: 'FileCheck', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'Quotation Management', icon: 'FileText', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'Project Management', icon: 'Grid', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { title: 'Task Management', icon: 'CheckSquare', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { title: 'Field Service CRM', icon: 'MapPin', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { title: 'Helpdesk', icon: 'Smile', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  { title: 'Customer Portal', icon: 'Globe', color: 'text-violet-400', bg: 'bg-violet-500/10' },
  { title: 'CRM Analytics', icon: 'PieChart', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' }
];

const CrmModules = ({ activeTab, setActiveTab }) => {
  const data = getDefaultData(activeTab);
  const subModules = data.subModules || [];
  const projects = data.projects || [];
  const overview = data.overview || '';
  const deptDash = data.departmentDashboard || null;

  return (
    <div className="py-12 border-t border-gray-800/50 mt-8 text-left">
      
      {/* 1. All CRM Modules Quick Selector */}
      <div className="mb-14">
        <div className="text-center mb-8 flex flex-col items-center">
          <h3 className="text-xl font-bold text-white relative inline-block">
            Comprehensive CRM Modules & Department Hubs
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </h3>
          <p className="text-xs text-gray-400 mt-3">Select any CRM module below to view detailed departmental dashboards and operational tools</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {allCrmModules.map((item, index) => {
            const isActive = activeTab === item.title;
            const IconComp = Icons[item.icon] || Icons.TrendingUp;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab && setActiveTab(item.title)}
                className={`flex flex-col items-center text-center p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-purple-950/60 border-2 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-[1.02]' 
                    : 'bg-[#050117]/80 border border-gray-800/70 hover:bg-[#0d072c] hover:border-purple-500/40'
                }`}
              >
                {/* Spotlight background hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.06)_0%,transparent_70%)] opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

                {/* LED Active Beacon */}
                <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-60">
                  <span className={`nh-led-active ${isActive ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`}></span>
                </div>

                <div className={`p-2.5 rounded-full ${item.bg} ${item.color} mb-3 border border-purple-500/20 relative z-10`}>
                  <IconComp size={20} className="relative z-10" />
                </div>
                <h4 className={`text-[11px] font-bold leading-tight relative z-10 ${isActive ? 'text-purple-300' : 'text-gray-200'}`}>
                  {item.title}
                </h4>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Detailed Overview Block */}
      {overview && (
        <motion.div 
          key={`overview-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#0d072b] to-[#060218] border border-purple-900/40 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest">Active Module Overview</h3>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{activeTab} Solution Details</h2>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-4xl">
            {overview}
          </p>
        </motion.div>
      )}

      {/* 3. Department Operational Dashboard Preview */}
      {deptDash && (
        <AnimatePresence mode="wait">
          <motion.div
            key={`dept-${activeTab}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mb-14 p-6 lg:p-8 rounded-2xl bg-[#090526]/70 border border-purple-900/40 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-gray-800/80 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest px-2.5 py-1 rounded bg-purple-950/60 border border-purple-800/40">
                  Department Operational Dashboard
                </span>
                <h3 className="text-xl font-bold text-white mt-2">{deptDash.deptName}</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-2xl">{deptDash.deptRole}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/40 shrink-0">
                <Icons.Activity size={14} className="animate-pulse" /> Live Telemetry Feed
              </div>
            </div>

            {/* Department KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {deptDash.kpis?.map((kpi, idx) => (
                <div key={idx} className="bg-[#050117] p-4 rounded-xl border border-gray-800/80">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                  <h4 className={`text-lg font-bold ${kpi.color || 'text-white'}`}>{kpi.value}</h4>
                </div>
              ))}
            </div>

            {/* Department Dashboard Widgets & Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Widgets Column */}
              <div className="lg:col-span-8 space-y-3">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3">Live Department Widgets</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {deptDash.widgets?.map((widget, idx) => (
                    <div key={idx} className="bg-[#0e0730]/60 p-4 rounded-xl border border-purple-900/30 hover:border-purple-500/40 transition-colors">
                      <div className="flex items-center gap-2 text-purple-400 mb-2">
                        <Icons.LayoutDashboard size={16} />
                        <h5 className="text-xs font-bold text-white">{widget.title}</h5>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-relaxed">{widget.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Department Reports */}
              <div className="lg:col-span-4 bg-[#050117] p-4 rounded-xl border border-gray-800/80">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icons.FileSpreadsheet size={14} className="text-purple-400" /> Standard Department Reports
                </h4>
                <div className="space-y-2">
                  {deptDash.reports?.map((report, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300 bg-[#0e0730]/40 px-3 py-2 rounded border border-gray-800/60">
                      <Icons.CheckCircle2 size={12} className="text-purple-500 shrink-0" />
                      <span className="truncate">{report}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>
      )}

      {/* 4. Sub-Modules / Core Capabilities Header */}
      <div className="text-center mb-10 flex flex-col items-center">
        <h3 className="text-xl font-bold text-white relative inline-block">
          Core Capabilities in {activeTab}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
        </h3>
        <p className="text-xs text-gray-400 mt-4 max-w-xl">
          Designed to boost revenue conversion, streamline customer management, and automate workflows.
        </p>
      </div>

      {/* Sub-Modules Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`submodules-${activeTab}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {subModules.map((item, index) => {
            const IconComponent = Icons[item.icon] || Icons.TrendingUp;
            return (
              <div
                key={index}
                className="flex flex-col justify-between p-6 rounded-xl bg-[#08041e]/80 border border-gray-800/80 hover:border-purple-500/40 hover:bg-[#0d072c] transition-all group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${item.bg} ${item.color} border border-purple-500/20 group-hover:scale-110 transition-transform`}>
                      <IconComponent size={22} />
                    </div>
                    {item.metric && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300">
                        {item.metric}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{item.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* 5. Real-World Projects & Case Studies */}
      {projects.length > 0 && (
        <div className="mt-16 pt-12 border-t border-gray-800/50">
          <div className="mb-8">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-1">Success Stories</h4>
            <h3 className="text-xl md:text-2xl font-bold text-white">{activeTab} Implementation Projects</h3>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`projects-${activeTab}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-xl bg-[#090526]/60 border border-purple-900/30 flex flex-col justify-between hover:border-purple-500/50 transition-colors shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 px-2 py-0.5 rounded bg-purple-950/50 border border-purple-800/30">
                        {proj.tag}
                      </span>
                      <span className="text-[10px] text-gray-500 font-medium">{proj.client}</span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-2 leading-snug">{proj.title}</h4>
                    <p className="text-xs text-gray-300 leading-relaxed bg-[#030112]/60 p-3 rounded-lg border border-gray-800/60">
                      {proj.results}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

    </div>
  );
};

export default CrmModules;
