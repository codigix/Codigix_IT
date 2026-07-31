import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
  { name: 'Home', path: '/new-home', hasDropdown: false },
  {
    name: 'AI Solutions',
    path: '/new-ai-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'AI Overview', path: '/new-ai-solutions?tab=AI+Overview' },
      { name: 'AI Chatbots', path: '/new-ai-solutions?tab=AI+Chatbots' },
      { name: 'AI Voice Agents', path: '/new-ai-solutions?tab=AI+Voice+Agents' },
      { name: 'AI Business Automation', path: '/new-ai-solutions?tab=AI+Business+Automation' },
      { name: 'Generative AI', path: '/new-ai-solutions?tab=Generative+AI' },
      { name: 'Document AI (OCR)', path: '/new-ai-solutions?tab=Document+AI+%28OCR%29' },
      { name: 'Computer Vision AI', path: '/new-ai-solutions?tab=Computer+Vision+AI' },
      { name: 'Predictive Analytics', path: '/new-ai-solutions?tab=Predictive+Analytics' },
      { name: 'AI Recommendation Engine', path: '/new-ai-solutions?tab=AI+Recommendation+Engine' },
      { name: 'AI Report Generator', path: '/new-ai-solutions?tab=AI+Report+Generator' },
      { name: 'AI for Manufacturing', path: '/new-ai-solutions?tab=AI+for+Manufacturing' },
      { name: 'AI for Healthcare', path: '/new-ai-solutions?tab=AI+for+Healthcare' },
      { name: 'AI API Integration', path: '/new-ai-solutions?tab=AI+API+Integration' }
    ]
  },
  {
    name: 'IoT Solutions',
    path: '/new-iot-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Industrial IoT', path: '/new-iot-solutions?tab=Industrial+IoT' },
      { name: 'Machine Monitoring', path: '/new-iot-solutions?tab=Machine+Monitoring' },
      { name: 'Production Monitoring', path: '/new-iot-solutions?tab=Production+Monitoring' },
      { name: 'OEE Dashboard', path: '/new-iot-solutions?tab=OEE+Dashboard' },
      { name: 'PLC Integration', path: '/new-iot-solutions?tab=PLC+Integration' },
      { name: 'SCADA Integration', path: '/new-iot-solutions?tab=SCADA+Integration' },
      { name: 'Sensor Monitoring', path: '/new-iot-solutions?tab=Sensor+Monitoring' },
      { name: 'RFID Tracking', path: '/new-iot-solutions?tab=RFID+Tracking' },
      { name: 'Barcode Automation', path: '/new-iot-solutions?tab=Barcode+Automation' },
      { name: 'Energy Monitoring', path: '/new-iot-solutions?tab=Energy+Monitoring' },
      { name: 'Predictive Maintenance', path: '/new-iot-solutions?tab=Predictive+Maintenance' },
      { name: 'Remote Equipment', path: '/new-iot-solutions?tab=Remote+Equipment+Monitoring' },
      { name: 'Digital Twin', path: '/new-iot-solutions?tab=Digital+Twin' },
      { name: 'Industry 4.0', path: '/new-iot-solutions?tab=Industry+4.0' }
    ]
  },
  {
    name: 'ERP Solutions',
    path: '/new-erp-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Manufacturing ERP', path: '/new-erp-solutions?tab=Manufacturing+ERP' },
      { name: 'Healthcare ERP', path: '/new-erp-solutions?tab=Healthcare+ERP' },
      { name: 'Trading ERP', path: '/new-erp-solutions?tab=Trading+ERP' },
      { name: 'Construction ERP', path: '/new-erp-solutions?tab=Construction+ERP' },
      { name: 'Inventory Management', path: '/new-erp-solutions?tab=Inventory+Management' },
      { name: 'Purchase Management', path: '/new-erp-solutions?tab=Purchase+Management' },
      { name: 'Production Planning', path: '/new-erp-solutions?tab=Production+Planning' },
      { name: 'Quality Management', path: '/new-erp-solutions?tab=Quality+Management' },
      { name: 'Finance & Accounts', path: '/new-erp-solutions?tab=Finance+%26+Accounts' },
      { name: 'HR & Payroll', path: '/new-erp-solutions?tab=HR+%26+Payroll' },
      { name: 'Asset Management', path: '/new-erp-solutions?tab=Asset+Management' },
      { name: 'Warehouse Mgmt', path: '/new-erp-solutions?tab=Warehouse+Management' },
      { name: 'ERP Integrations', path: '/new-erp-solutions?tab=ERP+Integrations' }
    ]
  },
  {
    name: 'CRM Solutions',
    path: '/new-crm-solutions',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Sales CRM', path: '/new-crm-solutions?tab=Sales+CRM' },
      { name: 'Lead Management', path: '/new-crm-solutions?tab=Lead+Management' },
      { name: 'Marketing Automation', path: '/new-crm-solutions?tab=Marketing+Automation' },
      { name: 'Customer Support', path: '/new-crm-solutions?tab=Customer+Support' },
      { name: 'Service Management', path: '/new-crm-solutions?tab=Service+Management' },
      { name: 'Quotation Mgmt', path: '/new-crm-solutions?tab=Quotation+Management' },
      { name: 'Project Management', path: '/new-crm-solutions?tab=Project+Management' },
      { name: 'Task Management', path: '/new-crm-solutions?tab=Task+Management' },
      { name: 'Field Service CRM', path: '/new-crm-solutions?tab=Field+Service+CRM' },
      { name: 'Helpdesk System', path: '/new-crm-solutions?tab=Helpdesk' },
      { name: 'Customer Portal', path: '/new-crm-solutions?tab=Customer+Portal' },
      { name: 'CRM Analytics', path: '/new-crm-solutions?tab=CRM+Analytics' }
    ]
  },
  {
    name: 'Services',
    path: '/new-other-services',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Web Development', path: '/new-other-services?tab=Web+Development' },
      { name: 'Mobile Apps', path: '/new-other-services?tab=Mobile+Apps' },
      { name: 'UI/UX Design', path: '/new-other-services?tab=UI/UX+Design' },
      { name: 'Cloud Solutions', path: '/new-other-services?tab=Cloud+Solutions' },
      { name: 'DevOps Services', path: '/new-other-services?tab=DevOps' }
    ]
  },
  {
    name: 'Industries',
    path: '/new-industries',
    hasDropdown: true,
    dropdownItems: [
      { name: 'Manufacturing', path: '/new-industries?tab=Manufacturing' },
      { name: 'Healthcare', path: '/new-industries?tab=Healthcare' },
      { name: 'Retail & E-commerce', path: '/new-industries?tab=Retail' },
      { name: 'Finance & Banking', path: '/new-industries?tab=Finance' },
      { name: 'Real Estate', path: '/new-industries?tab=Real+Estate' }
    ]
  },
  { name: 'Case Studies', path: '/new-case-studies', hasDropdown: false },
  { name: 'Career', path: '/new-career', hasDropdown: false },
  { name: 'About Us', path: '/new-about', hasDropdown: false },
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#050117]/95 backdrop-blur-md shadow-lg shadow-purple-900/20 py-3 border-b border-gray-800' : 'bg-transparent py-5'}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/new-home" className="flex items-center gap-2.5 z-50">
            <img src="/assets/images/logos/logo.png" alt="Codigix" className="w-full h-15 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link, i) => {
              const isActive = location.pathname === link.path;
              const isLargeGrid = link.dropdownItems && link.dropdownItems.length >= 8;

              return (
                <div key={i} className="relative group">
                  <Link
                    to={link.path}
                    className={`text-sm font-medium transition-colors flex items-center gap-1 py-4 relative ${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className={`transition-transform group-hover:rotate-180 ${isActive ? 'text-white' : 'text-gray-400'}`} />}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EE001C] to-[#7e22ce] rounded-full" />
                    )}
                  </Link>

                  {/* Grid Format Mega Dropdown */}
                  {link.hasDropdown && link.dropdownItems && (
                    <div className={`absolute top-full ${i > 4 ? 'right-0' : 'left-0'} mt-1 bg-[#08041d]/95 backdrop-blur-xl border border-purple-900/40 rounded-xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0 z-50 p-4 ${isLargeGrid ? 'w-[680px]' : 'w-[440px]'
                      }`}>
                      <div className={`grid ${isLargeGrid ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
                        {link.dropdownItems.map((dropItem, idx) => (
                          <Link
                            key={idx}
                            to={dropItem.path}
                            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-purple-900/30 hover:border-purple-500/30 border border-transparent transition-all group/item"
                          >
                            <span className="truncate">{dropItem.name}</span>
                            <ChevronRight
                              size={14}
                              className="text-purple-400/70 group-hover/item:text-purple-300 group-hover/item:translate-x-1 transition-all shrink-0 ml-1"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Let's Talk Button */}
          <div className="hidden lg:flex items-center ml-2">
            <button
              onClick={() => navigate('/new-contact')}
              className="bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:opacity-90 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(238,0,28,0.25)] hover:shadow-[0_0_25px_rgba(126,34,206,0.45)] flex items-center gap-2 group"
            >
              Let's Talk
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
            {navLinks.map((link, i) => {
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
                navigate('/new-contact');
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
    </nav>
  );
};

export default NewHomeNav;
