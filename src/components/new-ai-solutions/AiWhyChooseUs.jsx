import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { aiSolutionsData } from '../../data/aiSolutionsData';

const AiWhyChooseUs = ({ activeTab }) => {
  const data = aiSolutionsData[activeTab] || aiSolutionsData['AI Overview'];
  const reasons = data.whyChooseUs || [];

  return (
    <section className="py-16 border-t border-purple-200/70 dark:border-gray-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch bg-white dark:bg-[#07041a] rounded-2xl border border-slate-200/90 dark:border-gray-800/80 overflow-hidden shadow-md dark:shadow-xl">

        {/* Left Content */}
        <div className="p-8 lg:p-12 flex flex-col justify-center text-left">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6">Why Choose Codigix for {activeTab}?</h2>

          <ul className="space-y-4">
            {reasons.map((reason, index) => (
              <motion.li
                key={`${activeTab}-${index}`}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 size={18} className="text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <span className="text-sm font-medium text-slate-800 dark:text-gray-200">{reason}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Content - Security & SLA Audit Panel (High contrast dark terminal) */}
        <div className="relative h-full min-h-[300px] bg-[#0c0828] dark:bg-[#040114] flex flex-col justify-between p-8 font-mono text-[10px] text-left border-t lg:border-t-0 lg:border-l border-purple-900/40 dark:border-gray-800/60 keep-dark">
          <div className="absolute inset-0 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between border-b border-purple-900/40 pb-2.5 z-10">
            <span className="text-purple-400 font-bold uppercase tracking-wider">compliance_sec_audit.log</span>
            <span className="nh-led-active bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
          </div>

          <div className="space-y-2.5 my-6 z-10 flex-1 flex flex-col justify-center">
            <div className="text-gray-400 text-[8px] uppercase tracking-wider mb-1">// Active Security Controls</div>
            {[
              { rule: 'ISO 27001 Standard Security', val: 'PASSED', color: 'text-green-400 font-bold' },
              { rule: 'SOC 2 Type II Audit Log', val: 'VERIFIED', color: 'text-green-400 font-bold' },
              { rule: 'GDPR / HIPAA Data Privacy', val: 'ENFORCED', color: 'text-cyan-400 font-bold' },
              { rule: 'Private Weight Hosting SLA', val: 'SECURED', color: 'text-purple-400 font-bold' }
            ].map((chk, i) => (
              <div key={i} className="flex justify-between items-center bg-[#130d3a] border border-purple-900/40 p-2.5 rounded-lg">
                <span className="text-gray-200">{chk.rule}</span>
                <span className={`font-bold uppercase tracking-wider ${chk.color}`}>{chk.val}</span>
              </div>
            ))}
          </div>

          <div className="z-10 border-t border-purple-900/40 pt-2.5 flex justify-between items-center text-[8px] text-gray-400">
            <span>AUDIT STATE: OK</span>
            <span className="text-purple-400 font-bold">UPTIME SLA: 99.99%</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AiWhyChooseUs;
