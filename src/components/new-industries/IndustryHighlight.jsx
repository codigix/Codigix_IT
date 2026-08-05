import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, Zap, Award, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const industryData = {
  'Manufacturing': {
    title: 'Empowering Manufacturing Excellence',
    tagline: 'Smart Factory, IIoT Sensors & Production ERP',
    desc: 'From shop floor to top floor, we help discrete and process manufacturers digitize operations, eliminate machine downtime, automate multi-level BOMs, and maximize OEE with smart ERP, IoT, and AI-driven predictive analytics.',
    metrics: [
      { label: 'OEE Increase', val: '+28%' },
      { label: 'Downtime Reduced', val: '65%' },
      { label: 'BOM Accuracy', val: '99.8%' }
    ],
    features: [
      'Production Planning & Control (PPC)', 'IoT Machine Telemetry & OEE',
      'Inventory & Warehouse (WMS)', 'Predictive Maintenance Alerts',
      'Inline Quality Control & CAPA', 'Real-time Executive Dashboards',
      'Supply Chain & Procurement', 'Shopfloor Workforce & Payroll'
    ],
    techStack: ['Industrial IoT / MQTT', 'Custom ERP Core', 'Python ML / Telemetry', 'React & Node.js', 'PostgreSQL / Redis'],
    image: '/assets/images/service/erp_dashboard.webp',
    btnText: 'Request Manufacturing Solution Demo'
  },
  'Healthcare': {
    title: 'Transforming Patient Care & Medical Workflows',
    tagline: 'HIPAA-Compliant EHR, Telemedicine & Hospital ERP',
    desc: 'We empower hospitals, specialty clinics, and diagnostic labs with secure, HIPAA-compliant, and intuitive systems to streamline clinical management, EHR/EMR patient records, and pharmacy inventory.',
    metrics: [
      { label: 'Discharge Speed', val: '3x Faster' },
      { label: 'Claim Approval', val: '98.6%' },
      { label: 'Compliance', val: 'HIPAA & HL7' }
    ],
    features: [
      'Hospital Management System (HMS)', 'Telemedicine & Virtual Care',
      'Electronic Health Records (EHR)', 'Patient Scheduling & Portals',
      'Medical Billing & Insurance Claims', 'Pharmacy & Store Inventory',
      'LIMS Diagnostic Lab Sync', 'HIPAA & HL7/FHIR Security'
    ],
    techStack: ['HIPAA Compliant Cloud', 'HL7 / FHIR APIs', 'React Native Telemedicine', 'Node.js Microservices', 'AES-256 Encryption'],
    image: '/assets/images/service/ai_brain.webp',
    btnText: 'Request Healthcare Consultation'
  },
  'Retail': {
    title: 'Revolutionizing Omnichannel Retail & E-Commerce',
    tagline: 'Cloud POS, Unified Inventory & Customer CRM',
    desc: 'Deliver seamless omnichannel shopping experiences with our intelligent retail solutions, bridging physical stores with high-concurrency e-commerce platforms and automated inventory fulfillment.',
    metrics: [
      { label: 'Order Processing', val: '< 2 Mins' },
      { label: 'Stock Turnover', val: '4.2x' },
      { label: 'Cart Conversion', val: '+35%' }
    ],
    features: [
      'Custom E-Commerce Storefronts', 'Omnichannel POS & Inventory',
      'Multi-Store Warehouse Sync', 'AI Customer Loyalty Engines',
      'Automated Order Fulfillment', 'Personalized Product Recommendations',
      'Vendor & Supplier Portals', 'Retail Analytics & Insights'
    ],
    techStack: ['Next.js / React E-Commerce', 'GraphQL Search API', 'Redis Cart Cache', 'Stripe / Razorpay Gateways', 'Cloud WMS'],
    image: '/assets/images/service/ecommerce_dashboard.webp',
    btnText: 'Request Retail Solution Proposal'
  },
  'Finance': {
    title: 'Secure & Scalable FinTech Solutions',
    tagline: 'Bank-Grade Core Portals, CPQ Engines & Audit Ledgers',
    desc: 'Navigate the complex financial landscape with robust software that ensures bank-grade security, automated ledger reconciliation, instant pricing quotation CPQ, and AI fraud detection.',
    metrics: [
      { label: 'Reconciliation', val: 'Instant' },
      { label: 'Fraud Rate', val: '< 0.02%' },
      { label: 'Audit Compliance', val: '100% Passed' }
    ],
    features: [
      'Core Banking & Account Portals', 'Secure Multi-Currency Gateways',
      'Automated Ledger Reconciliation', 'AI Fraud Detection & Alerts',
      'Quotation CPQ & E-Signatures', 'Regulatory Compliance Audit Logs',
      'Wealth & Investment Portals', 'Real-time Financial BI Analytics'
    ],
    techStack: ['PCI-DSS Secure Cloud', 'Java / Spring Microservices', 'PostgreSQL Audit Ledger', 'Python Anomaly Detection', 'React Dashboard'],
    image: '/assets/images/service/crm_dashboard.webp',
    btnText: 'Request FinTech Architecture Consult'
  },
  'Real Estate': {
    title: 'Digitizing the Real Estate Lifecycle',
    tagline: 'Property CRM, Tenant Portals & Construction ERP',
    desc: 'Streamline property management, enhance broker lead efficiency, track construction site budgets, and deliver interactive 3D virtual tour experiences with our property tech platforms.',
    metrics: [
      { label: 'Lead Conversion', val: '+40%' },
      { label: 'Lease Processing', val: 'Same Day' },
      { label: 'Tenant Retention', val: '94%' }
    ],
    features: [
      'Property Management Systems', 'Real Estate Lead Management CRM',
      '3D Virtual Property Tours', 'Tenant & Landlord Self-Portals',
      'Site Construction DPR Tracking', 'Contract & Lease Automation',
      'Smart Building IoT Sensors', 'Real Estate Market Analytics'
    ],
    techStack: ['React / Three.js 3D', 'Node.js API Suite', 'PostgreSQL DB', 'AWS S3 Asset Vault', 'Twilio SMS / WhatsApp API'],
    image: '/assets/images/service/ui_ux_designing_dashboard.webp',
    btnText: 'Request Real Estate Tech Proposal'
  }
};

const getIndustryKey = (name) => {
  if (!name) return 'Manufacturing';
  if (name.toLowerCase().includes('manufactur')) return 'Manufacturing';
  if (name.toLowerCase().includes('health')) return 'Healthcare';
  if (name.toLowerCase().includes('retail')) return 'Retail';
  if (name.toLowerCase().includes('financ')) return 'Finance';
  if (name.toLowerCase().includes('real')) return 'Real Estate';
  return 'Manufacturing';
};

const IndustryHighlight = ({ activeIndustry = 'Manufacturing' }) => {
  const navigate = useNavigate();
  const key = getIndustryKey(activeIndustry);
  const data = industryData[key] || industryData['Manufacturing'];

  return (
    <div id="industry-highlight" className="py-12 scroll-mt-24 text-left">
      <div className="bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl flex flex-col lg:flex-row relative">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full flex flex-col lg:flex-row"
          >
            {/* Image Side */}
            <div className="lg:w-2/5 relative p-4 flex flex-col justify-center">
               <div className="w-full h-full rounded-xl overflow-hidden relative min-h-[300px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-50 dark:to-[#050112] z-10 lg:block hidden"></div>
                  <img 
                    src={data.image} 
                    alt={data.title} 
                    className="w-full h-full object-cover filter contrast-110 brightness-90 dark:mix-blend-screen"
                  />
               </div>

               {/* Metrics Badge Row under image */}
               <div className="grid grid-cols-3 gap-2 mt-3 z-20">
                  {data.metrics.map((m, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#090422] p-2 rounded-lg border border-slate-200 dark:border-gray-800 text-center shadow-xs">
                      <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{m.val}</div>
                      <div className="text-[9px] text-slate-500 dark:text-gray-400 truncate">{m.label}</div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Content Side */}
            <div className="lg:w-3/5 p-6 lg:p-10 z-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                <Award size={14} />
                <span>{activeIndustry} Focus</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {data.title}
              </h2>

              <p className="text-xs font-semibold text-purple-600 dark:text-purple-300 mb-4">
                {data.tagline}
              </p>

              <p className="text-[12px] text-slate-600 dark:text-gray-300 leading-relaxed mb-6">
                {data.desc}
              </p>

              {/* 8 Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4 mb-6">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-white dark:bg-[#07031c] p-2 border border-slate-200 dark:border-gray-800/80 rounded-lg shadow-xs">
                    <CheckCircle2 size={14} className="text-purple-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-200 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="mb-6">
                <span className="text-[10px] font-extrabold text-slate-400 dark:text-gray-500 uppercase tracking-wider block mb-2">
                  Engineered Tech Stack:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {data.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 text-[10px] font-bold text-purple-700 dark:text-purple-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => navigate('/contact')}
                className="self-start px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                {data.btnText} <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default IndustryHighlight;
