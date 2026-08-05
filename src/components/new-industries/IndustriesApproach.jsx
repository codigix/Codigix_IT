import React from 'react';
import { Search, PenTool, Code2, Rocket, LineChart, Hexagon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const approachSteps = [
  { name: 'Discover', icon: Search, desc: 'Analyze domain workflows & target KPIs' },
  { name: 'Architect', icon: PenTool, desc: 'Design scalable, compliant data models' },
  { name: 'Engineering', icon: Code2, desc: 'Develop secure microservices & IoT/UI' },
  { name: 'Deployment', icon: Rocket, desc: 'Zero-downtime release with migration' },
  { name: 'Optimization', icon: LineChart, desc: '24/7 telemetry & automated tuning' },
];

const industryReasons = {
  'Manufacturing': [
    'Deep Shopfloor & IIoT Expertise', 'Cost-Effective Custom ERP Core',
    'Zero Plant Interruption Deployment', 'End-to-End ISO Audit Trails',
    'Industrial Sensor Telemetry', 'Future-Ready Smart Factory',
    'Proven Track Record in Automotive & CNC', 'High ROI & OEE Optimization'
  ],
  'Healthcare': [
    'HIPAA & HL7/FHIR Compliance', 'Patient Care Continuity Assurance',
    'Clinician-Approved Telemedicine UI', 'End-to-End EHR Data Protection',
    'LIMS Laboratory Machine Sync', 'Future-Ready Medical Cloud',
    'Proven Hospital & Pharmacy Results', 'High ROI & Reduced Discharge Time'
  ],
  'Retail': [
    'High-Concurrency Cloud POS', 'Sub-Second E-Commerce Checkout',
    'Omnichannel WMS Data Sync', 'Automated Loyalty & Customer CRM',
    'Multi-Warehouse Logistics', 'Future-Ready Retail Architecture',
    'Proven FMCG & Retail Results', 'High Conversion & Inventory Turnover'
  ],
  'Finance': [
    'Bank-Grade Encryption & Audit', 'PCI-DSS & SOC 2 Standards',
    'Instant Automated Reconciliation', 'AI Real-Time Fraud Prevention',
    'Quotation CPQ & E-Signatures', 'Future-Ready FinTech Infrastructure',
    'Proven Banking & Wealth Results', 'High Security & Zero Audit Breach'
  ],
  'Real Estate': [
    'Property Tech & Virtual 3D Tours', 'Automated Lead Assignment Engine',
    'Tenant & Landlord Self-Portals', 'Construction Site DPR Tracking',
    'Lease & Contract Automation', 'Future-Ready PropTech Architecture',
    'Proven Developer & Broker Results', 'High Lead Conversion & Occupancy'
  ]
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

const IndustriesApproach = ({ activeIndustry = 'Manufacturing' }) => {
  const key = getIndustryKey(activeIndustry);
  const reasons = industryReasons[key] || industryReasons['Manufacturing'];

  return (
    <div className="py-12 flex flex-col xl:flex-row gap-6 text-left">
      
      {/* Our Approach */}
      <div className="xl:w-3/5 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-5 sm:p-7 shadow-sm dark:shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-purple-500" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 dark:text-purple-400">
            {activeIndustry} Execution Framework
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Our 5-Step Digital Transformation Framework</h3>
        
        <div className="approach-line-container grid grid-cols-5 gap-1.5 sm:gap-3 items-start mt-6 relative z-10 px-1">
          {/* Background Live Data Flow Path (Desktop Only) */}
          <div className="hidden sm:block absolute top-[24px] left-[10%] w-[80%] h-[2px] pointer-events-none z-0">
            <svg width="100%" height="2" viewBox="0 0 100 2" fill="none" preserveAspectRatio="none" className="w-full">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(168,85,247,0.25)" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="1" r="1.5" fill="#a855f7" filter="drop-shadow(0 0 3px #a855f7)">
                <animate attributeName="cx" values="0;100" dur="4s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {approachSteps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center w-full relative bg-transparent group z-10"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white dark:bg-[#0a0520] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center mb-3 text-purple-600 dark:text-purple-400 group-hover:bg-purple-900/40 group-hover:scale-110 transition-all z-10 relative shadow-[0_0_15px_rgba(168,85,247,0.05)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                <step.icon size={18} className="sm:w-5 sm:h-5" />
              </div>
              <h4 className="text-[11px] sm:text-[12px] font-bold text-slate-900 dark:text-white mb-1 leading-tight text-center">{step.name}</h4>
              <p className="text-[9px] sm:text-[9.5px] text-slate-500 dark:text-gray-400 leading-tight text-center font-normal px-0.5">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Businesses Choose Codigix */}
      <div className="xl:w-2/5 bg-slate-50 dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-5 sm:p-7 shadow-sm dark:shadow-xl">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6">Why {activeIndustry} Leaders Choose Codigix</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-2.5">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-white dark:bg-[#050117] p-2.5 border border-slate-200 dark:border-gray-800/80 rounded-xl hover:border-purple-500/30 transition-colors relative group overflow-hidden shadow-xs">
              <Hexagon size={14} className="text-purple-500 shrink-0 mt-0.5 fill-purple-900/30 relative z-10" />
              <span className="text-[11px] font-semibold text-slate-700 dark:text-gray-300 leading-tight relative z-10">{reason}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default IndustriesApproach;
