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
    if (path.includes('slides')) return 'Hero Slides Management';
    if (path.includes('services')) return 'Services Configuration';
    if (path.includes('projects')) return 'Project Portfolio';
    if (path.includes('blogs')) return 'Content & Blogs';
    if (path.includes('testimonials')) return 'Client Feedback';
    if (path.includes('clients')) return 'Partner Clients';
    if (path.includes('workingProcess')) return 'Operational Workflow';
    if (path.includes('achievements')) return 'Company Milestones';
    if (path.includes('team')) return 'Team Directory';
    return 'Administration';
  };

  return (
    <div className="flex w-full min-h-screen bg-[#1A1C2E] text-slate-300 font-admin selection:bg-[#FF1F8B]/30">
      {/* Sidebar */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0">
        {/* Header */}
        <header className="h-16 bg-[#252841]/50 backdrop-blur-xl border-b border-slate-800/30 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-all text-slate-400 hover:text-white"
            >
              <Menu className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? '' : 'rotate-180'}`} />
            </button>
            
            {/* Search Bar */}
            <div className="hidden md:flex items-center bg-[#1A1C2E]/40 border border-slate-800/30 rounded-lg px-3 py-1.5 w-64 focus-within:w-80 focus-within:border-[#FF1F8B]/40 transition-all duration-300 group">
              <Search className="w-4 h-4 text-slate-500 group-focus-within:text-[#FF1F8B] transition-colors" />
              <input 
                type="text" 
                placeholder="SEARCH..." 
                className="bg-transparent border-none outline-none text-[10px] font-bold text-white placeholder:text-slate-600 ml-2 w-full uppercase tracking-widest"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all relative">
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FF1F8B] rounded-full"></span>
              </button>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-800/30 mx-1"></div>
            
            <div className="flex items-center gap-3 pl-1">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px]  text-white leading-none uppercase tracking-widest">Administrator</span>
                <span className="text-[8px] text-[#FF1F8B]  uppercase tracking-tighter mt-1">Superuser</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/5 border border-slate-800/30 flex items-center justify-center text-white">
                 <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             <div className="absolute top-[10%] left-[-5%] w-[40%] h-[80%] bg-[#252841] -rotate-[35deg] rounded-[4rem] opacity-30 shadow-[0_0_100px_rgba(255,31,139,0.05)]"></div>
             <div className="absolute bottom-[0%] right-[-10%] w-[30%] h-[60%] bg-[#252841] -rotate-[35deg] rounded-[4rem] opacity-30 shadow-[0_0_100px_rgba(0,209,255,0.05)]"></div>
             
             {/* Glow Spots */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF1F8B] opacity-[0.03] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00D1FF] opacity-[0.03] blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
          </div>

          {/* Breadcrumb / Page Title */}
          <div className="px-6 py-6 lg:px-10 lg:py-8 relative z-10">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[9px]  text-slate-500 uppercase tracking-[0.2em]">
                <span>PORTAL</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#FF1F8B]">{getTitle().split(' ')[0]}</span>
              </div>
              <h1 className="text-xl  text-white">{getTitle()}</h1>
            </div>
          </div>

          {/* Main Viewport */}
          <main className="flex-1 px-6 pb-12 lg:px-10 relative z-10">
            <div className="max-w-[1600px]">
              <Outlet />
            </div>
          </main>
          
          {/* Footer */}
          <footer className="h-14 border-t border-slate-800/30 flex items-center justify-between px-6 text-[9px]  text-slate-500 bg-[#1A1C2E]/50 relative z-10">
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
