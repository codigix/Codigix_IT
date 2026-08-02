import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const caseStudyFaqs = [
  {
    id: 1,
    question: "How does Codigix Infotech measure ROI in its client case studies?",
    answer: "We establish key performance metrics prior to project execution—such as Overall Equipment Effectiveness (OEE), machine downtime reduction, lead conversion rates, and page load speeds. All results are verified through real-time telemetry and post-deployment analytics."
  },
  {
    id: 2,
    question: "Can Codigix integrate Industrial IoT with existing legacy ERP systems?",
    answer: "Yes, our engineering team specializes in bridging modern IIoT edge devices (MQTT, OPC UA, Modbus) with legacy on-premise or cloud ERP database systems (MySQL, PostgreSQL, SAP, Oracle) using custom REST/gRPC middleware."
  },
  {
    id: 3,
    question: "Which industries are featured in Codigix IT case studies?",
    answer: "Our case studies span Smart Manufacturing, Healthcare & Tele-Medicine, Wholesale & Retail Fashion, Industrial Metallurgy, E-Commerce, and Technology Services, delivering tailored enterprise digital transformation solutions."
  },
  {
    id: 4,
    question: "How long does a typical custom software or AI implementation project take?",
    answer: "Timeline depends on scope: streamlined sales CRMs or web applications take 2 to 3 months, while complex multi-module ERP systems with IIoT edge integration or AI predictive engines take 4 to 6 months."
  },
  {
    id: 5,
    question: "Can I request a custom case study or consultation for my business?",
    answer: "Absolutely. Our technology consultants provide direct architecture reviews and tailored case study presentations based on your specific industry, legacy infrastructure, and business objectives."
  }
];

const CaseStudiesFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 text-left" aria-labelledby="faq-heading">
      <div className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-gray-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 mb-2">
              <Sparkles size={12} /> Frequently Asked Questions
            </span>
            <h2 id="faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Questions About Our <span className="text-purple-600 dark:text-purple-400">Case Studies & Outcomes</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm">
            Learn more about how our engineering teams deliver verifiable ROI, system integration, and rapid project deployment.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {caseStudyFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 ${
                  isOpen
                    ? 'border-purple-500/50 bg-purple-50/50 dark:bg-purple-950/20 shadow-sm'
                    : 'border-slate-200 dark:border-gray-800/80 bg-slate-50/50 dark:bg-[#07041f] hover:border-slate-300 dark:hover:border-gray-700'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500/50 rounded-xl"
                >
                  <span className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800/40 shrink-0">
                      <HelpCircle size={16} />
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </span>
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-purple-600 dark:text-purple-400 shrink-0 transform transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed border-t border-purple-200/40 dark:border-purple-900/30 mt-1">
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
    </section>
  );
};

export default CaseStudiesFaq;
