import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiSolutionsData } from '../../data/aiSolutionsData';
import './ai-solutions.css';

const industryLogs = {
  'Manufacturing': '[DIAGNOSTIC] Focused domain: Manufacturing. Yield prediction rate: +22%. Defect threshold: <0.1%',
  'Healthcare': '[DIAGNOSTIC] Focused domain: Healthcare. Imaging classification speed: 12ms. Patient triage queue: Reduced by 35%',
  'Retail & E-commerce': '[DIAGNOSTIC] Focused domain: Retail & E-commerce. Customer conversion lift: +35%. Churn threshold: 12%',
  'Finance & Banking': '[DIAGNOSTIC] Focused domain: Finance. Fraud identification rate: 99.98%. Risk assessment speed: 200ms',
  'Logistics & Supply Chain': '[DIAGNOSTIC] Focused domain: Logistics. Route optimization efficiency: +18%. Inventory accuracy: 99.9%',
  'Education': '[DIAGNOSTIC] Focused domain: Education. Personalized learning adaptive index: 94.2%. Engagement boost: +45%',
  'Travel & Hospitality': '[DIAGNOSTIC] Focused domain: Travel. Booking rate conversion: +15%. Guest response latency: <2s',
  'Telecommunications': '[DIAGNOSTIC] Focused domain: Telecom. Network throughput efficiency: +20%. Outage forecast model: Active',
  'Real Estate': '[DIAGNOSTIC] Focused domain: Real Estate. Lead qualification accuracy: 92.5%. Booking index: +28%',
  'Automotive': '[DIAGNOSTIC] Focused domain: Automotive. Diagnostic accuracy: 98.4%. Predictive failure cycles: Verified',
  'Financial Services': '[DIAGNOSTIC] Focused domain: Finance. Fraud identification rate: 99.98%. Risk assessment speed: 200ms',
  'Insurance': '[DIAGNOSTIC] Focused domain: Insurance. Claim automation: 85%. Underwriting review time: <5 mins',
  'Utilities': '[DIAGNOSTIC] Focused domain: Utilities. Load forecast accuracy: 96.8%. Peak saving efficiency: 14%',
  'IT Operations': '[DIAGNOSTIC] Focused domain: IT. Password reset ticket resolution: 99%. Server deploy latency: 8s',
  'Media & Marketing': '[DIAGNOSTIC] Focused domain: Media. Copy generation speedup: 8x. Audience engagement rate: +40%',
  'Legal & Compliance': '[DIAGNOSTIC] Focused domain: Legal. Clause indexing speed: 300ms. Tampered document identification: 99.8%',
  'Software Development': '[DIAGNOSTIC] Focused domain: Software. Unit test coverage index: 94.2%. Build cycle optimization: +30%',
  'Research & Life Sciences': '[DIAGNOSTIC] Focused domain: Research. Literature review speed: 10x. Target classification: Active',
  'Financial Research': '[DIAGNOSTIC] Focused domain: Finance. Fraud identification rate: 99.98%. Risk assessment speed: 200ms',
  'Higher Education': '[DIAGNOSTIC] Focused domain: Education. Personalized learning adaptive index: 94.2%. Engagement boost: +45%',
  'Accounting & Audit': '[DIAGNOSTIC] Focused domain: Finance. Fraud identification rate: 99.98%. Risk assessment speed: 200ms',
  'Logistics': '[DIAGNOSTIC] Focused domain: Logistics. Route optimization efficiency: +18%. Inventory accuracy: 99.9%',
  'Retail': '[DIAGNOSTIC] Focused domain: Retail & E-commerce. Customer conversion lift: +35%. Churn threshold: 12%',
  'Security & Surveillance': '[DIAGNOSTIC] Focused domain: Security. Threat assessment time: <1s. Camera detection coverage: 99.4%',
  'Smart Cities': '[DIAGNOSTIC] Focused domain: Smart Cities. Congestion delay reduction: -25%. Public transit delay: -18%',
  'Energy & Utilities': '[DIAGNOSTIC] Focused domain: Utilities. Load forecast accuracy: 96.8%. Peak saving efficiency: 14%',
  'Streaming & Media': '[DIAGNOSTIC] Focused domain: Media. Copy generation speedup: 8x. Audience engagement rate: +40%',
  'EdTech': '[DIAGNOSTIC] Focused domain: Education. Personalized learning adaptive index: 94.2%. Engagement boost: +45%',
  'News & Publishing': '[DIAGNOSTIC] Focused domain: Media. Copy generation speedup: 8x. Audience engagement rate: +40%',
  'Food Delivery': '[DIAGNOSTIC] Focused domain: Logistics. Route optimization efficiency: +18%. Inventory accuracy: 99.9%',
  'SaaS Enterprise': '[DIAGNOSTIC] Focused domain: IT. Password reset ticket resolution: 99%. Server deploy latency: 8s'
};

const AiIndustries = ({ activeTab }) => {
  const data = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];
  const industries = data.industries || [];
  
  const [selectedInd, setSelectedInd] = useState(industries[0]?.name || '');

  const logText = industryLogs[selectedInd] || `[DIAGNOSTIC] Select an industry above to parse targeted telemetry insights.`;

  return (
    <section className="py-16 border-t border-purple-200/70 dark:border-gray-800/50">
      <div className="mb-8 text-left">
        <h3 className="text-xs font-extrabold text-purple-700 dark:text-purple-400 uppercase tracking-widest mb-2">Industry Applications</h3>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Where {activeTab} Creates High Impact</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {industries.map((ind, index) => {
          const IndIcon = ind.icon;
          const isSelected = ind.name === selectedInd;
          return (
            <motion.div 
              key={`${activeTab}-${index}`}
              onClick={() => setSelectedInd(ind.name)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex flex-col items-center text-center p-4 rounded-2xl cursor-pointer transition-all duration-300 group relative border shadow-sm ${
                isSelected 
                  ? 'border-purple-500 bg-purple-50/90 dark:bg-[#110c38] shadow-[0_8px_25px_rgba(139,92,246,0.2)]' 
                  : 'border-slate-200/90 dark:border-gray-800/80 bg-white dark:bg-[#090624]/90 hover:border-purple-400 hover:bg-purple-50/30 dark:hover:bg-[#110c38]'
              }`}
            >
              {/* LED Active Beacon */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className={`nh-led-active ${isSelected ? 'bg-purple-500 shadow-[0_0_8px_#a855f7]' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`}></span>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 flex items-center justify-center mb-3 group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                <IndIcon size={22} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="text-[13px] font-extrabold text-slate-900 dark:text-white mb-1 leading-tight">{ind.name}</h4>
              <p className="text-[10px] text-slate-600 dark:text-gray-400 leading-relaxed truncate w-full px-1">{ind.desc}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Live Industry Diagnostic Metrics Logger - High-contrast dark console */}
      <div className="mt-8 border border-purple-900/40 dark:border-gray-800/85 bg-[#0c0828] dark:bg-[#07041a] rounded-xl p-4 shadow-[0_15px_40px_rgba(139,92,246,0.12)] dark:shadow-md font-mono text-[10px] text-left keep-dark">
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-2 mb-2">
          <span className="text-gray-400 font-bold uppercase tracking-wider">industry_diagnostics.log</span>
          <span className="text-[8px] text-rose-400 font-bold">READY</span>
        </div>
        <div className="h-6 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedInd}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="text-purple-300 font-bold leading-normal"
            >
              {logText}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default AiIndustries;
