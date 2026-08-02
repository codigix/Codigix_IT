import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const aboutFaqs = [
  {
    id: 1,
    question: "When was Codigix Infotech founded and where is it headquartered?",
    answer: "Codigix Infotech was founded in July 2023. Our primary engineering and global delivery center is headquartered in Pune, Maharashtra, India, serving clients across North America, Europe, Asia, and the Middle East."
  },
  {
    id: 2,
    question: "What are the core technical domains and services of Codigix Infotech?",
    answer: "We specialize in Artificial Intelligence (Generative AI, Computer Vision, Predictive Analytics), Industrial IoT Automation, Custom ERP & CRM Engineering, Cross-Platform Mobile Applications, and Enterprise Cloud Solutions."
  },
  {
    id: 3,
    question: "What security standards and quality methodologies does Codigix follow?",
    answer: "We strictly adhere to ISO/IEC 27001 data security practices, HIPAA compliance for healthcare applications, Agile/Scrum engineering workflows, and automated CI/CD security code scanning."
  },
  {
    id: 4,
    question: "How does Codigix ensure on-time delivery for complex enterprise projects?",
    answer: "Every engagement is led by dedicated Solution Architects and Scrum Masters utilizing milestone-based sprints, transparent client dashboards, automated regression testing, and weekly SLA progress reviews."
  },
  {
    id: 5,
    question: "How can enterprise clients or partners initiate a consultation with leadership?",
    answer: "You can schedule a direct strategy session with our executive tech team via our contact portal or by emailing contact@codigixinfotech.com for technical architecture reviews and project estimations."
  }
];

const AboutFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 text-left" aria-labelledby="about-faq-heading">
      <div className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-gray-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 mb-2">
              <Sparkles size={12} /> Company FAQ
            </span>
            <h2 id="about-faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Learn More About <span className="text-purple-600 dark:text-purple-400">Codigix Infotech</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm">
            Discover our company background, technical standards, global delivery model, and commitment to engineering excellence.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {aboutFaqs.map((faq, index) => {
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

export default AboutFaq;
