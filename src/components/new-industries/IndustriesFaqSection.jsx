import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const industriesFaqData = [
  {
    question: "What industry-specific software solutions does Codigix Infotech develop?",
    answer: "Codigix Infotech engineers custom software tailored for key industry verticals: Manufacturing (IoT & OEE ERPs), Healthcare (EHR & HIPAA compliance platforms), Retail & E-Commerce (POS & inventory optimization), Finance & Banking (fintech & fraud detection), and Construction & Real Estate."
  },
  {
    question: "How does Codigix tailor custom ERP and IoT solutions for Manufacturing companies?",
    answer: "We integrate smart sensor hardware with custom ERP dashboards to provide real-time Overall Equipment Effectiveness (OEE) tracking, predictive maintenance alerts, Bill of Materials (BOM) management, and automated shop floor scheduling."
  },
  {
    question: "What compliance and security standards does Codigix follow for Healthcare and Fintech software?",
    answer: "Our healthcare solutions comply with HIPAA and HL7/FHIR standards for secure patient record transmission. Our financial software enforces PCI-DSS, SOC 2, and ISO 27001 standards, featuring AES-256 database encryption and automated audit logs."
  },
  {
    question: "Can Codigix integrate AI and machine learning into our industry's legacy software stack?",
    answer: "Yes, we build custom AI microservices (predictive maintenance algorithms, automated document processing, computer vision quality control, and demand forecasting AI) that connect directly to your legacy databases via REST or gRPC APIs."
  },
  {
    question: "How do we request an industry-specific technical proposal from Codigix?",
    answer: "Simply click 'Book Consultation' or reach out through our Contact page. Our domain architects will conduct an initial discovery session, evaluate your operational workflow, and deliver a tailored roadmap and cost estimate within 24 hours."
  }
];

const IndustriesFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-12 text-left">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-rose-500" />
          <span>Industry Solutions FAQ</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-600 dark:from-rose-400 dark:to-purple-400">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-normal">
          Learn how our custom domain-specific software, IoT sensor networks, and AI automation accelerate enterprise performance.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {industriesFaqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-rose-50/70 dark:bg-[#0f0a2e]/90 border-rose-400 dark:border-purple-500/50 shadow-md dark:shadow-[0_4px_25px_rgba(139,92,246,0.15)]'
                  : 'bg-white dark:bg-[#0c0828]/60 border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800/50'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className={isOpen ? "text-rose-600 dark:text-rose-400 shrink-0" : "text-slate-400 dark:text-slate-500 shrink-0"} />
                  <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                  isOpen
                    ? 'bg-rose-600/20 border-rose-500/50 text-rose-600 dark:text-rose-300 rotate-180'
                    : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-400'
                }`}>
                  <ChevronDown size={14} />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-slate-650 dark:text-slate-300 text-xs md:text-sm leading-relaxed border-t border-slate-200/80 dark:border-purple-900/20 font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustriesFaqSection;
