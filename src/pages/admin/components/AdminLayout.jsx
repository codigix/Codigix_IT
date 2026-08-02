import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from './AdminSidebar';
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  ChevronRight,
  Maximize,
  LayoutGrid
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const getTitle = () => {
    const path = location.pathname;
    if (path.includes('dashboard')) return 'Dashboard Overview';
    if (path.includes('case-studies')) return 'Case Studies';
    if (path.includes('blogs')) return '';
    if (path.includes('testimonials')) return 'Reviews Posting';
    if (path.includes('clients')) return 'Client Add Only';
    if (path.includes('jobs')) return 'Job Posting';
    if (path.includes('applications')) return 'Collect Resumes';
    if (path.includes('inquiries')) return 'Contact Inquiries';
    return 'Administration';
  };

  return (
    <div className=" flex w-full min-h-screen bg-slate-50 dark:bg-[#07041a] text-slate-800 dark:text-slate-300 font-admin selection:bg-purple-650/30 transition-colors duration-300">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header */}
        <header className="h-16 bg-white/70 dark:bg-[#0c0828]/70 backdrop-blur-xl border-b border-slate-200 dark:border-purple-900/30 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <Menu className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-slate-100 dark:bg-[#1A1C2E]/40 border border-slate-200 dark:border-purple-900/30 rounded-lg px-3 py-1.5 w-64 focus-within:w-80 focus-within:border-purple-500 transition-all duration-300 group">
              <Search className="w-4 h-4 text-slate-500 group-focus-within:text-purple-500 transition-colors" />
              <input
                type="text"
                placeholder="SEARCH..."
                className="bg-transparent border-none outline-none text-[10px] font-bold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 ml-2 w-full uppercase tracking-widest"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg transition-all relative">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-purple-650 rounded-full animate-pulse"></span>
              </button>
            </div>

            <div className="h-8 w-[1px] bg-slate-250 dark:bg-purple-900/30 mx-1"></div>

            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] text-slate-900 dark:text-white leading-none uppercase tracking-widest font-extrabold">Administrator</span>
                <span className="text-[8px] text-purple-600 dark:text-purple-400 uppercase tracking-widest font-bold mt-1">Superuser</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-purple-900/30 flex items-center justify-center text-slate-700 dark:text-white">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className=" p-4 flex-1 flex flex-col relative overflow-hidden">

          {/* Breadcrumb / Page Title */}
          <div className="relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[9px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                <span>PORTAL</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-purple-650 dark:text-purple-450 font-extrabold">{getTitle().split(' ')[0]}</span>
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">{getTitle()}</h1>
            </div>
          </div>

          {/* Main Viewport */}
          <main className="flex-1 relative z-10">
            <div className="">
              <Outlet />
            </div>
          </main>

          {/* Footer */}
          <footer className="h-14 border-t border-slate-200 dark:border-purple-900/30 flex items-center justify-between px-6 text-[9px] text-slate-500 bg-white/50 dark:bg-[#1A1C2E]/50 relative z-10">
            <div className="uppercase tracking-[0.2em] opacity-60">
              © {new Date().getFullYear()} <span className="text-slate-400">GRATAFY</span>
            </div>
          </footer>
        </div>
      </div>


      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminLayout;
