import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PhoneCall, FileText, LineChart, Users, PackageSearch, Settings, FileBarChart, Network, Mail, ArrowRight } from 'lucide-react';

// Custom SVG Icons
const IconChatbots = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
    <path d="M9 9h.01M15 9h.01M9 13h6" />
    <path d="M19 3l2 -2" opacity="0.5" />
    <path d="M22 6l1 -1" opacity="0.5" />
  </svg>
);

const IconVoiceCalling = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    <path d="M15 3h6v6" opacity="0.6" />
    <path d="M14 10l7-7" opacity="0.6" />
  </svg>
);

const IconDocumentOCR = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M4 7V4h3M17 4h3v3M4 17v3h3M17 20h3v-3" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 12h6" />
    <circle cx="12" cy="12" r="1" opacity="0.5" />
  </svg>
);

const IconPredictiveAnalytics = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
    <path d="M6 12l4-4 4 4 4-6" />
    <circle cx="18" cy="6" r="1.5" />
  </svg>
);

const IconSalesAssistant = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <circle cx="12" cy="8" r="5" />
    <path d="M20 21a8 8 0 10-16 0" />
    <circle cx="12" cy="8" r="1" opacity="0.5" />
    <path d="M19 5l3-3M16 2l3 3" opacity="0.6" />
  </svg>
);

const IconInventoryForecasting = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8M16 17H8M10 9H8" opacity="0.6" />
    <rect x="12" y="14" width="4" height="4" rx="1" />
  </svg>
);

const IconQualityInspection = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    <path d="M10 12l1.5 1.5L14 10" stroke="#3b82f6" />
  </svg>
);

const IconReportGenerator = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <path d="M14 2v6h6" />
    <path d="M8 18h8M8 14h4M8 10h2" opacity="0.6" />
    <path d="M18 12l2-2M16 10l2-2" opacity="0.5" />
  </svg>
);

const IconWorkflowAutomation = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <rect x="8" y="3" width="8" height="8" rx="2" />
    <path d="M12 11v4" />
    <path d="M8 15h8" />
    <rect x="4" y="15" width="6" height="6" rx="1" />
    <rect x="14" y="15" width="6" height="6" rx="1" />
    <path d="M10 7a2 2 0 104 0" opacity="0.5" />
  </svg>
);

const IconEmailAutomation = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: 'url(#ai-gradient)' }}>
    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    <path d="M21 3l-3 3M18 3l3 3" opacity="0.6" />
  </svg>
);

const aiCapabilities = [
  { name: 'AI Chatbots', icon: IconChatbots },
  { name: 'AI Voice Calling', icon: IconVoiceCalling },
  { name: 'AI Document OCR', icon: IconDocumentOCR },
  { name: 'Predictive Analytics', icon: IconPredictiveAnalytics },
  { name: 'AI Sales Assistant', icon: IconSalesAssistant },
  { name: 'AI Inventory Forecasting', icon: IconInventoryForecasting },
  { name: 'AI Quality Inspection', icon: IconQualityInspection },
  { name: 'AI Report Generator', icon: IconReportGenerator },
  { name: 'AI Workflow Automation', icon: IconWorkflowAutomation },
  { name: 'AI Email Automation', icon: IconEmailAutomation },
];

const aiQueries = [
  { prompt: "Predict machinery replacement interval on asset 12", tag: "PREDICTIVE_MAINTENANCE", conf: "0.992", lat: "14.2ms" },
  { prompt: "Generate sales quotation from pipeline lead records", tag: "ERP_CRM_AUTOMATION", conf: "0.981", lat: "22.8ms" },
  { prompt: "OCR extract line items from supplier invoice #809", tag: "DOCUMENT_AI_OCR", conf: "0.997", lat: "35.1ms" },
  { prompt: "Detect crack defects on metal surface camera feed", tag: "COMPUTER_VISION_AI", conf: "0.989", lat: "8.4ms" }
];

const AiSolutionsGrid = () => {
  const [queryIndex, setQueryIndex] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setQueryIndex((prev) => (prev + 1) % aiQueries.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentQuery = aiQueries[queryIndex];

  return (
    <section className="py-24 bg-[#050117] relative overflow-hidden">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" /> {/* Rose */}
            <stop offset="50%" stopColor="#8b5cf6" /> {/* Purple */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* Blue */}
          </linearGradient>
        </defs>
      </svg>
      <div className="max-w-[1400px] mx-auto ">

        {/* Top Stats Banner */}
        <div className="w-full mb-20">
          <div className="border border-gray-700/50 rounded-2xl bg-[#090624] p-8 lg:p-10 shadow-[0_0_30px_rgba(59,130,246,0.05)] relative overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>

            <div className="text-center mb-8">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">POWERING DIGITAL TRANSFORMATION</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-gray-800/60">
              {[
                { val: '50+', label: 'Successful Projects' },
                { val: '20+', label: 'Enterprise Clients' },
                { val: '10+', label: 'Industries Served' },
                { val: '99.9%', label: 'System Uptime' },
                { val: '24x7', label: 'Expert Support' },
                { val: '100%', label: 'Custom Solutions' }
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center py-2 lg:py-0">
                  <span className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.val}</span>
                  <span className="text-[11px] lg:text-xs text-gray-400 font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* Left Side: AI API Playground Simulator */}
          <div className="lg:col-span-4 relative z-10 flex flex-col justify-center text-left">
            <div className="w-full h-full border border-gray-800/80 bg-[#07041a] rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.5)] font-mono text-[11px] flex flex-col">
              {/* Header */}
              <div className="bg-[#0b0724] px-4 py-3 border-b border-gray-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">codigix_ai_sdk.js</span>
              </div>
              
              {/* Terminal Code Body */}
              <div className="p-4 space-y-4 text-gray-400 flex-1 flex flex-col justify-between min-h-[260px]">
                <div>
                  <div className="text-gray-600">// Initialize client</div>
                  <div className="text-gray-300"><span className="text-purple-400">const</span> client = <span className="text-purple-400">new</span> CodigixAI();</div>
                  
                  <div className="text-gray-600 mt-4">// Stream query classification</div>
                  <div className="text-gray-300"><span className="text-purple-400">const</span> response = <span className="text-purple-400">await</span> client.classify({'{'}</div>
                  <div className="pl-4 text-green-400">text: "{currentQuery.prompt}"</div>
                  <div className="text-gray-300">{'}'});</div>
                </div>

                <div className="border-t border-gray-800/80 pt-3">
                  <div className="text-gray-600">// Output Response Payload</div>
                  <div className="text-cyan-400 font-bold">classification: "{currentQuery.tag}"</div>
                  <div className="text-cyan-500 mt-0.5">confidence: {currentQuery.conf}</div>
                  <div className="text-gray-500 text-[9px] mt-1.5 flex items-center gap-1.5">
                    <span className="nh-led-active"></span>
                    Execution latency: {currentQuery.lat}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Content */}
          <div className="space-y-6 lg:col-span-3 flex flex-col justify-center">
            <span className="text-purple-500 font-semibold tracking-wider text-xs sm:text-sm uppercase">AI SOLUTIONS THAT THINK AHEAD</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Integrate AI. Automate Smarter.</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              From AI chatbots to intelligent document processing, we build AI solutions that understand, learn and evolve with your business.
            </p>

            <div>
              <button className="nh-btn-primary mt-2">
                Explore AI Solutions <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Side: Capabilities Grid */}
          <div className="lg:col-span-5 flex items-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
              {aiCapabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="nh-ai-badge group bg-[#090624]/95 border border-gray-800/80 hover:bg-[#110c38] hover:border-purple-500/40 transition-all duration-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer shadow-sm hover:shadow-[0_10px_25px_rgba(139,92,246,0.12)] aspect-square lg:aspect-[4/5] w-full relative overflow-hidden"
                >
                  {/* Status Indicator */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="nh-led-active"></span>
                    <span className="text-[7px] text-green-400 font-bold tracking-widest uppercase hidden group-hover:inline-block">API</span>
                  </div>

                  <div className="mb-4">
                    <cap.icon className="w-10 h-10 transition-transform duration-300 group-hover:rotate-[8deg] drop-shadow-[0_0_10px_rgba(59,130,246,0.2)]" />
                  </div>
                  <span className="text-[10px] lg:text-[11px] text-center text-gray-400 group-hover:text-white font-bold leading-tight px-0.5 uppercase tracking-wider transition-colors duration-300">
                    {cap.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AiSolutionsGrid;
