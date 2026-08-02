import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { getDefaultData } from './erpTabData';

const allErpModules = [
  { title: 'Manufacturing ERP', icon: 'Factory', color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { title: 'Healthcare ERP', icon: 'HeartPulse', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { title: 'Trading ERP', icon: 'ShoppingCart', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  { title: 'Construction ERP', icon: 'HardHat', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { title: 'Inventory Management', icon: 'PackageSearch', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { title: 'Purchase Management', icon: 'ShoppingBag', color: 'text-pink-400', bg: 'bg-pink-500/10' },
  { title: 'Production Planning', icon: 'TrendingUp', color: 'text-green-400', bg: 'bg-green-500/10' },
  { title: 'Quality Management', icon: 'ShieldCheck', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { title: 'Finance & Accounts', icon: 'Calculator', color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { title: 'HR & Payroll', icon: 'Users', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10' },
  { title: 'Asset Management', icon: 'BoxSelect', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { title: 'Warehouse Management', icon: 'Warehouse', color: 'text-violet-400', bg: 'bg-violet-500/10' }
];

const ErpModules = ({ activeTab, setActiveTab }) => {
  const data = getDefaultData(activeTab);
  const subModules = data.subModules || [];
  const projects = data.projects || [];
  const overview = data.overview || '';
  const deptDash = data.departmentDashboard || null;

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 text-left">
      
      {/* 1. All ERP Modules Quick Selector */}
      <div className="mb-14">
        <div className="text-center mb-8 flex flex-col items-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white relative inline-block">
            Comprehensive ERP Modules & Department Hubs
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
          </h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 mt-3">Select any ERP module below to view detailed departmental dashboards and operational tools</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {allErpModules.map((item, index) => {
            const isActive = activeTab === item.title;
            const IconComp = Icons[item.icon] || Icons.Cog;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab && setActiveTab(item.title)}
                className={`flex flex-col items-center text-center p-4 rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  isActive 
                    ? 'bg-purple-50 dark:bg-purple-950/60 border-2 border-purple-500 shadow-[0_0_25px_rgba(168,85,247,0.15)] scale-[1.02]' 
                    : 'bg-slate-50 dark:bg-[#050117]/80 border border-slate-200 dark:border-gray-800/70 hover:bg-slate-100 dark:hover:bg-[#0d072c] hover:border-purple-500/40'
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
                <h4 className={`text-[11px] font-bold leading-tight relative z-10 ${isActive ? 'text-purple-600 dark:text-purple-300' : 'text-slate-700 dark:text-gray-200'}`}>
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
          className="mb-12 p-6 rounded-2xl bg-slate-50 dark:bg-gradient-to-r dark:from-[#0d072b] dark:to-[#060218] border border-slate-200 dark:border-purple-900/40 shadow-sm dark:shadow-xl"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <h3 className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Active Module Overview</h3>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3">{activeTab} Solution Details</h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-gray-300 leading-relaxed max-w-4xl">
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
            className="mb-14 p-6 lg:p-8 rounded-2xl bg-slate-50 dark:bg-[#090526]/70 border border-slate-250 dark:border-purple-900/40 shadow-sm dark:shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-200 dark:border-gray-800/80 pb-4">
              <div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest px-2.5 py-1 rounded bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/40">
                  Department Operational Dashboard
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-2">{deptDash.deptName}</h3>
                <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 max-w-2xl">{deptDash.deptRole}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800/40 shrink-0">
                <Icons.Activity size={14} className="animate-pulse" /> Live Telemetry Feed
              </div>
            </div>

            {/* Department KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {deptDash.kpis?.map((kpi, idx) => (
                <div key={idx} className="bg-white dark:bg-[#050117] p-4 rounded-xl border border-slate-200 dark:border-gray-800/80 shadow-sm">
                  <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                  <h4 className={`text-lg font-bold ${kpi.color || 'text-slate-900 dark:text-white'}`}>{kpi.value}</h4>
                </div>
              ))}
            </div>

            {/* Department Dashboard Widgets & Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Widgets Column */}
              <div className="lg:col-span-8 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3">Live Department Widgets</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {deptDash.widgets?.map((widget, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0e0730]/60 p-4 rounded-xl border border-slate-200 dark:border-purple-900/30 hover:border-purple-500/40 transition-colors shadow-sm">
                      <div className="flex items-center gap-2 text-purple-500 mb-2">
                        <Icons.LayoutDashboard size={16} />
                        <h5 className="text-xs font-bold text-slate-900 dark:text-white">{widget.title}</h5>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-gray-400 leading-relaxed">{widget.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Standard Department Reports */}
              <div className="lg:col-span-4 bg-white dark:bg-[#050117] p-4 rounded-xl border border-slate-200 dark:border-gray-800/80 shadow-sm">
                <h4 className="text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icons.FileSpreadsheet size={14} className="text-purple-400" /> Standard Department Reports
                </h4>
                <div className="space-y-2">
                  {deptDash.reports?.map((report, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-750 dark:text-gray-300 bg-slate-50 dark:bg-[#0e0730]/40 px-3 py-2 rounded border border-slate-200 dark:border-gray-800/60">
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

      {/* 4. Active Sub-Modules Grid */}
      {subModules.length > 0 && (
        <div className="mb-14">
          <h3 className="text-xs font-bold text-purple-500 uppercase tracking-widest mb-6">Key Functional Sub-Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subModules.map((sub, idx) => (
              <div key={idx} className="bg-white dark:bg-[#050117] border border-slate-200 dark:border-gray-800/60 p-5 rounded-xl hover:border-purple-500/30 hover:bg-slate-50 dark:hover:bg-[#0c082b]/40 transition-colors shadow-sm dark:shadow-none">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">{sub.name}</h4>
                <p className="text-[11px] text-slate-500 dark:text-gray-400 leading-relaxed">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. ERP Custom Projects Portfolio */}
      {projects.length > 0 && (
        <div>
          <h3 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-6">Featured Solutions & Case Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white dark:bg-[#050117] border border-slate-200 dark:border-gray-800/70 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 shadow-md dark:shadow-xl group">
                <div className="h-44 overflow-hidden relative bg-slate-50 dark:bg-[#090422] flex items-center justify-center p-2">
                  <div className="absolute inset-0 bg-purple-900/5 group-hover:bg-purple-900/0 transition-colors z-10 pointer-events-none"></div>
                  
                  {/* Light Theme Image */}
                  <img 
                    src={proj.imageLight || proj.image || '/assets/images/service/erp_manufacturing_light.png'} 
                    alt={proj.title} 
                    className="block dark:hidden w-full h-full object-cover rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-500 relative z-10" 
                  />

                  {/* Dark Theme Image */}
                  <img 
                    src={proj.imageDark || proj.image || '/assets/images/new-iot-solutions/erp_isometric_dark.png'} 
                    alt={proj.title} 
                    className="hidden dark:block w-full h-full object-contain filter contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-500 relative z-10" 
                  />
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">{proj.title}</h4>
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed mb-4">{proj.results || proj.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tag && (
                      <span className="text-[8px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 px-2 py-0.5 rounded font-mono uppercase font-bold">{proj.tag}</span>
                    )}
                    {proj.client && (
                      <span className="text-[8px] bg-slate-100 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-gray-700 px-2 py-0.5 rounded font-mono uppercase font-bold">{proj.client}</span>
                    )}
                    {proj.tags?.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[8px] bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40 px-2 py-0.5 rounded font-mono uppercase font-bold">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ErpModules;
