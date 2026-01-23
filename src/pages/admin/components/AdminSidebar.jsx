import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Globe, 
  Image as ImageIcon, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Users, 
  Settings, 
  Award, 
  Users2, 
  LogOut,
  ChevronRight,
  ExternalLink,
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
      title: 'CONTENT',
      items: [
        { path: '/admin/slides', icon: ImageIcon, label: 'Hero Slides' },
        { path: '/admin/services', icon: Briefcase, label: 'Services' },
        { path: '/admin/projects', icon: FileText, label: 'Projects' },
        { path: '/admin/blogs', icon: MessageSquare, label: 'Blog Posts' },
        { path: '/admin/team', icon: Users2, label: 'Team Members' },
      ]
    },
    {
      title: 'REPUTATION',
      items: [
        { path: '/admin/testimonials', icon: Quote, label: 'Reviews' },
        { path: '/admin/clients', icon: Users, label: 'Clients' },
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { path: '/admin/workingProcess', icon: Settings, label: 'Process' },
        { path: '/admin/achievements', icon: Award, label: 'Milestones' },
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
      className={`fixed lg:sticky left-0 top-0 z-50 h-screen bg-[#1A1C2E] border-r border-slate-800/30 flex flex-col transition-all duration-500 ease-in-out shrink-0 ${
        isOpen ? 'w-64 opacity-100 visible' : 'w-0 lg:w-0 opacity-0 invisible -translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Brand Logo */}
      <div className="h-20 px-6 flex items-center justify-between flex-shrink-0">
        <Link to="/admin/dashboard" className="flex items-center gap-2 group">
          <span className="text-2xl font-bold text-white tracking-tight italic">gratafy<span className="text-[10px] align-top ml-0.5">TM</span></span>
        </Link>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-white/5 rounded-lg transition-all lg:hidden text-slate-500 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar space-y-6">
        {menuItems.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <div className="px-4 mb-2">
              <span className="text-[9px]  text-slate-500 uppercase tracking-[0.2em]">{section.title}</span>
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
                    className={`flex items-center gap-3 p-2 text-xs font-thin rounded-xl transition-all duration-200 group relative ${
                      isActive 
                      ? 'bg-[#FF1F8B] text-white' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300 transition-colors'}`} />
                    <span className="text-sm">{item.label}</span>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="activeIndicator"
                        className="absolute right-0 w-1 h-4 bg-white rounded-l-full"
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

      {/* Logout */}
      <div className="p-4 border-t border-slate-800/30">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 hover:text-red-500 transition-all border border-transparent"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.2);
        }
      `}</style>
    </aside>
  );
};

export default AdminSidebar;
