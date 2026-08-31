import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const mainNavLinks = [
  { name: 'Home', path: '/', hasDropdown: false },
  { name: 'Services', path: '/services', hasDropdown: false },
  { name: 'About Us', path: '/about', hasDropdown: false },
  { name: 'Career', path: '/career', hasDropdown: false },
  { name: 'Case Studies', path: '/case-studies', hasDropdown: false },
  { name: 'Blog', path: '/blog', hasDropdown: false }
];

const subNavLinks = [
  {
    name: 'AI Solutions',
    path: '/ai-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'AI Overview', path: '/ai-solutions?tab=AI+Overview' },
      { name: 'AI Chatbots', path: '/ai-solutions?tab=AI+Chatbots' },
      { name: 'AI Voice Agents', path: '/ai-solutions?tab=AI+Voice+Agents' },
      { name: 'AI Business Automation', path: '/ai-solutions?tab=AI+Business+Automation' },
      { name: 'Generative AI', path: '/ai-solutions?tab=Generative+AI' },
      { name: 'Document AI (OCR)', path: '/ai-solutions?tab=Document+AI+%28OCR%29' },
      { name: 'Computer Vision AI', path: '/ai-solutions?tab=Computer+Vision+AI' },
      { name: 'Predictive Analytics', path: '/ai-solutions?tab=Predictive+Analytics' },
      { name: 'AI Recommendation Engine', path: '/ai-solutions?tab=AI+Recommendation+Engine' },
      { name: 'AI Report Generator', path: '/ai-solutions?tab=AI+Report+Generator' },
      { name: 'AI for Manufacturing', path: '/ai-solutions?tab=AI+for+Manufacturing' },
      { name: 'AI for Healthcare', path: '/ai-solutions?tab=AI+for+Healthcare' },
      { name: 'AI API Integration', path: '/ai-solutions?tab=AI+API+Integration' }
    ]
  },
  {
    name: 'IoT Solutions',
    path: '/iot-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Industrial IoT', path: '/iot-solutions?tab=Industrial+IoT' },
      { name: 'Machine Monitoring', path: '/iot-solutions?tab=Machine+Monitoring' },
      { name: 'Production Monitoring', path: '/iot-solutions?tab=Production+Monitoring' },
      { name: 'OEE Dashboard', path: '/iot-solutions?tab=OEE+Dashboard' },
      { name: 'PLC Integration', path: '/iot-solutions?tab=PLC+Integration' },
      { name: 'SCADA Integration', path: '/iot-solutions?tab=SCADA+Integration' },
      { name: 'Sensor Monitoring', path: '/iot-solutions?tab=Sensor+Monitoring' },
      { name: 'RFID Tracking', path: '/iot-solutions?tab=RFID+Tracking' },
      { name: 'Barcode Automation', path: '/iot-solutions?tab=Barcode+Automation' },
      { name: 'Energy Monitoring', path: '/iot-solutions?tab=Energy+Monitoring' },
      { name: 'Predictive Maintenance', path: '/iot-solutions?tab=Predictive+Maintenance' },
      { name: 'Remote Equipment', path: '/iot-solutions?tab=Remote+Equipment+Monitoring' },
      { name: 'Digital Twin', path: '/iot-solutions?tab=Digital+Twin' },
      { name: 'Industry 4.0', path: '/iot-solutions?tab=Industry+4.0' }
    ]
  },
  {
    name: 'ERP Solutions',
    path: '/erp-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Manufacturing ERP', path: '/erp-solutions?tab=Manufacturing+ERP' },
      { name: 'Healthcare ERP', path: '/erp-solutions?tab=Healthcare+ERP' },
      { name: 'Trading ERP', path: '/erp-solutions?tab=Trading+ERP' },
      { name: 'Construction ERP', path: '/erp-solutions?tab=Construction+ERP' },
      { name: 'Inventory Management', path: '/erp-solutions?tab=Inventory+Management' },
      { name: 'Purchase Management', path: '/erp-solutions?tab=Purchase+Management' },
      { name: 'Production Planning', path: '/erp-solutions?tab=Production+Planning' },
      { name: 'Quality Management', path: '/erp-solutions?tab=Quality+Management' },
      { name: 'Finance & Accounts', path: '/erp-solutions?tab=Finance+%26+Accounts' },
      { name: 'HR & Payroll', path: '/erp-solutions?tab=HR+%26+Payroll' },
      { name: 'Asset Management', path: '/erp-solutions?tab=Asset+Management' },
      { name: 'Warehouse Mgmt', path: '/erp-solutions?tab=Warehouse+Management' },
      { name: 'ERP Integrations', path: '/erp-solutions?tab=ERP+Integrations' }
    ]
  },
  {
    name: 'CRM Solutions',
    path: '/crm-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Sales CRM', path: '/crm-solutions?tab=Sales+CRM' },
      { name: 'Lead Management', path: '/crm-solutions?tab=Lead+Management' },
      { name: 'Marketing Automation', path: '/crm-solutions?tab=Marketing+Automation' },
      { name: 'Customer Support', path: '/crm-solutions?tab=Customer+Support' },
      { name: 'Service Management', path: '/crm-solutions?tab=Service+Management' },
      { name: 'Quotation Mgmt', path: '/crm-solutions?tab=Quotation+Management' },
      { name: 'Project Management', path: '/crm-solutions?tab=Project+Management' },
      { name: 'Task Management', path: '/crm-solutions?tab=Task+Management' },
      { name: 'Field Service CRM', path: '/crm-solutions?tab=Field+Service+CRM' },
      { name: 'Helpdesk System', path: '/crm-solutions?tab=Helpdesk' },
      { name: 'Customer Portal', path: '/crm-solutions?tab=Customer+Portal' },
      { name: 'CRM Analytics', path: '/crm-solutions?tab=CRM+Analytics' }
    ]
  },
  {
    name: 'Industries',
    path: '/industries',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Manufacturing', path: '/industries?tab=Manufacturing' },
      { name: 'Healthcare', path: '/industries?tab=Healthcare' },
      { name: 'Retail & E-commerce', path: '/industries?tab=Retail' },
      { name: 'Finance & Banking', path: '/industries?tab=Finance' },
      { name: 'Real Estate', path: '/industries?tab=Real+Estate' }
    ]
  }
];

const NewHomeNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderLinks = (linksArray) => (
    linksArray.map((link, i) => {
      const isActive = location.pathname === link.path;
      const isLargeGrid = link.dropdownItems && link.dropdownItems.length >= 8;

      return (
        <div key={i} className="relative group">
          <Link
            to={link.path}
            className={`text-sm font-medium transition-colors flex items-center gap-1 py-4 relative ${isActive ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white'}`}
          >
            {link.name}
            {link.hasDropdown && <ChevronDown size={14} className={`transition-transform group-hover:rotate-180 ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-400'}`} />}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE001C] to-[#7e22ce] rounded-full" />
            )}
          </Link>

          {/* Grid Format Mega Dropdown */}
          {link.hasDropdown && link.dropdownItems && (
            <div className={`absolute top-full left-0 mt-1 bg-white dark:bg-[#08041d]/95 backdrop-blur-xl border border-gray-200 dark:border-purple-900/40 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50 p-4 ${isLargeGrid ? 'w-[680px]' : 'w-[440px]'}`}>
              <div className={`grid ${isLargeGrid ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                {link.dropdownItems.map((dropItem, idx) => (
                  <Link
                    key={idx}
                    to={dropItem.path}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-purple-900/30 hover:border-slate-200 dark:hover:border-purple-500/30 border border-transparent transition-all group/item"
                  >
                    <span className="truncate">{dropItem.name}</span>
                    <ChevronRight
                      size={14}
                      className="text-purple-600 dark:text-purple-400 group-hover/item:translate-x-1 group-hover/item:text-purple-700 dark:group-hover/item:text-purple-300 transition-all shrink-0 ml-1"
                    />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    })
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-[#0d0b21]/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800' : 'bg-white dark:bg-[#07041a] border-b border-gray-200 dark:border-gray-800'}`}>

      {/* Top Main Nav */}
      <div className={`transition-all duration-300 px-4 sm:px-6 lg:px-12 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 z-50">
            <img src="/assets/images/logos/logo.webp" alt="Codigix" className={`object-contain transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'}`} />
          </Link>

          <div className="hidden lg:flex items-center gap-5 xl:gap-8 ml-8">
            {renderLinks(mainNavLinks)}
          </div>

          <div className="flex-1"></div>

          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(238,0,28,0.25)] hover:shadow-[0_0_25px_rgba(126,34,206,0.45)] flex items-center gap-2 group"
            >
              Let's Talk
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="lg:hidden flex items-center gap-2 z-50">
            <ThemeToggle className="text-slate-800 dark:text-white" />
            <button
              className="text-slate-800 dark:text-white p-1"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Sub Nav (Dropdowns & Contact) */}
      <div className={`hidden lg:flex justify-between items-center px-4 sm:px-6 lg:px-12 border-t border-gray-100 dark:border-gray-800/80 bg-slate-50/50 dark:bg-black/20 transition-all duration-300 overflow-visible ${scrolled ? 'h-0 opacity-0 pointer-events-none border-transparent' : 'h-12 opacity-100'}`}>
        <div className="flex items-center gap-4 xl:gap-8 pl-8">
          {renderLinks(subNavLinks)}
        </div>
        <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 dark:text-gray-400">
          <span className="flex items-center gap-1.5 hover:text-purple-600 transition-colors cursor-pointer"><Mail size={12} /> info@codigixinfotech.com</span>
          <span className="flex items-center gap-1.5 hover:text-purple-600 transition-colors cursor-pointer"><Phone size={12} /> +91 9112706604</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#070320] border-b border-gray-800 shadow-xl py-4 px-4 lg:hidden flex flex-col space-y-4 max-h-[80vh] overflow-y-auto"
          >
            {[...mainNavLinks, ...subNavLinks].map((link, i) => {
              const isActive = location.pathname === link.path;
              return (
                <div key={i} className="flex flex-col border-b border-gray-800/50 last:border-0 pb-2">
                  <Link
                    to={link.path}
                    className={`font-medium px-2 py-2.5 flex items-center justify-between text-sm ${isActive ? 'text-purple-400' : 'text-gray-300 hover:text-white'}`}
                    onClick={(e) => {
                      if (!link.hasDropdown) {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={16} />}
                  </Link>
                  {link.hasDropdown && link.dropdownItems && (
                    <div className="grid grid-cols-2 gap-1.5 pl-3 pt-1">
                      {link.dropdownItems.map((dropItem, idx) => (
                        <Link
                          key={idx}
                          to={dropItem.path}
                          className="flex items-center justify-between p-2 text-xs text-gray-400 hover:text-white hover:bg-purple-900/20 rounded transition-colors group/mitem"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="truncate">{dropItem.name}</span>
                          <ChevronRight size={12} className="text-purple-400 opacity-60 group-hover/mitem:translate-x-0.5 transition-transform" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/contact');
              }}
              className="px-5 py-3 bg-[#7e22ce] text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-4 w-full shadow-[0_0_15px_rgba(126,34,206,0.3)]"
            >
              Let's Talk <ChevronRight size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
};

export default NewHomeNav;
