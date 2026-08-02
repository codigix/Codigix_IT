import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube, FileText } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Industries', path: '/industries' },
  { name: 'Case Studies', path: '/case-studies' },
  { name: 'Careers', path: '/career' },
  { name: 'Blog', path: '/blog' }
];

const solutionsLinks = [
  { name: 'AI Solutions', path: '/ai-solutions' },
  { name: 'IoT Solutions', path: '/iot-solutions' },
  { name: 'ERP Solutions', path: '/erp-solutions' },
  { name: 'CRM Solutions', path: '/crm-solutions' },
  { name: 'Custom Software', path: '/services?tab=Custom+Software' },
  { name: 'Mobile App Development', path: '/services?tab=Mobile+Apps' }
];

const industriesLinks = [
  { name: 'Manufacturing', path: '/industries?tab=Manufacturing' },
  { name: 'Healthcare', path: '/industries?tab=Healthcare' },
  { name: 'Automobile', path: '/industries?tab=Automotive' },
  { name: 'Retail', path: '/industries?tab=Retail' },
  { name: 'Construction', path: '/industries?tab=Infrastructure' },
  { name: 'Education', path: '/industries?tab=Education' }
];

const supportLinks = [
  { name: 'Contact Us', path: '/contact' },
  { name: 'Privacy Policy', path: '/contact' },
  { name: 'Terms & Conditions', path: '/contact' },
  { name: 'Sitemap', path: '/sitemap.xml', external: true }
];

const CtaFooterSection = () => {
  const navigate = useNavigate();

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* CTA Banner Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto -mb-12 md:-mb-16 z-20">
        <div className="bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 dark:from-[#100b2e] dark:via-[#1b082d] dark:to-[#2c081e] border border-purple-500/30 dark:border-gray-700/50 rounded-2xl flex flex-col lg:flex-row items-center justify-between p-8 md:p-10 shadow-[0_20px_50px_rgba(126,34,206,0.25)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
             {/* Background glows */}
             <div className="absolute -left-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-white/5 dark:bg-blue-600/10 blur-[80px]"></div>
             <div className="absolute -right-[10%] top-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-500/10 dark:bg-red-600/10 blur-[80px]"></div>
          </div>

          <div className="relative z-10 space-y-3 mb-6 lg:mb-0 text-center lg:text-left flex-1">
            <h2 className="text-2xl md:text-[28px] font-bold text-white tracking-wide">Ready to Build Your Intelligent Business?</h2>
            <p className="text-purple-100 dark:text-gray-300 text-sm md:text-[15px]">Let's automate your operations and accelerate your growth with AI, IoT, ERP, CRM and Custom Software.</p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              onClick={() => {
                navigate('/contact');
                handleLinkClick();
              }}
              className="px-6 py-3 bg-[#e11d48] hover:bg-[#be123c] text-white text-sm rounded-md font-medium flex items-center justify-center gap-2 transition-colors shadow-lg shadow-rose-600/30 cursor-pointer"
            >
              Book Free Consultation &rarr;
            </button>
            <button
              onClick={() => {
                navigate('/contact');
                handleLinkClick();
              }}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white/50 text-white text-sm rounded-md font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileText size={16} /> Get Proposal
            </button>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-50 dark:bg-[#050212] pt-32 pb-8 border-t border-slate-200 dark:border-red-900/30 transition-colors duration-300 text-left">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">

            {/* Branding Column */}
            <div className="lg:col-span-1 pr-4">
              <Link to="/" onClick={handleLinkClick} className="inline-block mb-6">
                <img src="/assets/images/logos/logo.png" alt="Codigix Infotech Logo" className="h-8 object-contain" />
              </Link>
              <p className="text-[12px] text-slate-500 dark:text-gray-400 mb-8 leading-relaxed">
                We build future-ready AI, IoT and software solutions that transform businesses and drive real results.
              </p>
              <div className="flex space-x-2">
                <a href="https://www.linkedin.com/company/135144609/admin/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="w-7 h-7 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Linkedin size={14} fill="currentColor" />
                </a>
                <a href="https://www.facebook.com/codigix.infotech" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile" className="w-7 h-7 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Facebook size={14} fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://x.com/CodigixI2994" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="w-7 h-7 rounded-full bg-[#1da1f2] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Twitter size={14} fill="currentColor" strokeWidth={0} />
                </a>
                <a href="https://www.instagram.com/codigixerp_crm?igsh=MWIxazRrNmVucmN6dg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Instagram size={14} />
                </a>
                <a href="https://www.youtube.com/@codigixinfotech" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="w-7 h-7 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:opacity-80 transition-opacity">
                  <Youtube size={14} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className="text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-6">Solutions</h4>
              <ul className="space-y-3">
                {solutionsLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className="text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-6">Industries</h4>
              <ul className="space-y-3">
                {industriesLinks.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={handleLinkClick}
                      className="text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {supportLinks.map(link => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={handleLinkClick}
                        className="text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h4 className="text-slate-900 dark:text-white text-sm font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li>
                  <a href="tel:+919112706604" className="flex items-start gap-2 text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    <Phone size={14} className="text-purple-500 shrink-0 mt-0.5" />
                    <span>+91 9112706604</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:info@codigixinfotech.com" className="flex items-start gap-2 text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    <Mail size={14} className="text-purple-500 shrink-0 mt-0.5" />
                    <span>info@codigixinfotech.com</span>
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/?q=Office+No:+514,+5th+Floor,+Brahma+Sky+Uzuri,+MIDC,+Pimpri-Chinchwad,+Maharashtra+411018" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-[12px] text-slate-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
                    <MapPin size={14} className="text-purple-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">Office No: 514, 5th Floor, Brahma Sky Uzuri, MIDC, Pimpri-Chinchwad, Maharashtra 411018.</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-200 dark:border-gray-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-gray-500">
              © {new Date().getFullYear()} Codigix Infotech Pvt. Ltd. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-xs text-slate-500 dark:text-gray-500">
              <Link to="/contact" onClick={handleLinkClick} className="hover:text-purple-600 dark:hover:text-gray-300">Privacy Policy</Link>
              <Link to="/contact" onClick={handleLinkClick} className="hover:text-purple-600 dark:hover:text-gray-300">Terms & Conditions</Link>
              <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 dark:hover:text-gray-300">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CtaFooterSection;
