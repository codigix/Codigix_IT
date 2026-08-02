import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Globe,
  Briefcase,
  FileText,
  MessageSquare,
  Users,
  LogOut,
  X,
  Quote
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'ANALYTICS',
      items: [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      ]
    },
    {
      title: 'CONTENT MANAGEMENT',
      items: [
        { path: '/admin/case-studies', icon: Briefcase, label: 'Case Studies' },
        { path: '/admin/blogs', icon: MessageSquare, label: 'Blogs Posting' },
        { path: '/admin/jobs', icon: Briefcase, label: 'Job Posting' },
        { path: '/admin/testimonials', icon: Quote, label: 'Reviews Posting' },
        { path: '/admin/clients', icon: Users, label: 'Client Add Only' },
      ]
    },
    {
      title: 'USER REQUESTS',
      items: [
        { path: '/admin/applications', icon: FileText, label: 'Collect Resumes' },
        { path: '/admin/inquiries', icon: Globe, label: 'Inquiries (Contact)' },
      ]
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/admin/login';
  };

  return (
    <aside
      className={`fixed lg:sticky left-0 top-0 z-50 h-screen bg-white dark:bg-[#0c0828] border-r border-slate-200 dark:border-purple-900/30 flex flex-col transition-all duration-500 ease-in-out shrink-0 ${isOpen ? 'w-64 opacity-100 visible' : 'w-0 lg:w-0 opacity-0 invisible -translate-x-full lg:translate-x-0'
        }`}
    >
      {/* Brand Logo Header Card */}
      <div className="h-20 px-6 flex items-center justify-between flex-shrink-0 border-b border-slate-100 dark:border-purple-900/10">
        <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="relative">
            <img src="/assets/images/logos/logo.webp" alt="Codigix Logo" className="h-9 w-auto object-contain" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#0c0828]" />
          </div>
          <span className="text-[10px] font-extrabold uppercase bg-gradient-to-r from-purple-600 to-rose-600 bg-clip-text text-transparent tracking-widest hidden sm:inline-block">Console</span>
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all lg:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Redesigned Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar space-y-7">
        {menuItems.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <div className="px-3">
              <span className="text-[9px] text-slate-400 dark:text-gray-500 uppercase tracking-[0.2em] font-extrabold block mb-1">{section.title}</span>
            </div>

            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 1024) setIsOpen(false); }}
                    className={`flex items-center gap-3.5 px-3 py-3 text-xs font-bold rounded-xl transition-all duration-300 group relative ${isActive
                      ? 'bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20 text-purple-700 dark:text-purple-400 border border-purple-200/50 dark:border-purple-900/30'
                      : 'text-slate-650 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent'
                      }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-purple-600 dark:text-purple-400' : 'text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-355'}`} />
                    <span className="text-[13px] tracking-wide font-semibold">{item.label}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activeLeftIndicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-purple-650 to-indigo-650 dark:from-purple-500 dark:to-indigo-500 rounded-r-lg"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Redesigned Profile & Logout Bottom Card */}
      <div className="p-4 border-t border-slate-200 dark:border-purple-900/30 bg-slate-50/50 dark:bg-purple-950/5">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-xl bg-purple-600/10 border border-purple-500/25 flex items-center justify-center text-purple-600 dark:text-purple-400 font-extrabold text-sm shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-extrabold text-slate-900 dark:text-white truncate uppercase tracking-wider">Administrator</div>
            <div className="text-[8px] text-slate-500 dark:text-gray-400 truncate uppercase tracking-tighter mt-0.5">Superuser Account</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 font-extrabold text-[10px] uppercase tracking-[0.2em] hover:bg-rose-100 dark:hover:bg-rose-950/30 hover:text-rose-700 transition-all border border-rose-200/20"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.25);
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;
