import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles, Briefcase, GraduationCap, Clock, Award } from 'lucide-react';

export const careerFaqs = [
  {
    id: 1,
    question: "What is the recruitment and interview process at Codigix Infotech?",
    answer: "Our hiring process consists of 3 straightforward steps: 1) Initial application review & technical screening, 2) Technical interview & practical coding assessment, and 3) Culture fit discussion with engineering leadership."
  },
  {
    id: 2,
    question: "Does Codigix Infotech offer hybrid or remote work options?",
    answer: "Yes, we support flexible hybrid work policies for engineering, design, and marketing roles based out of our main development center in Pune, India, allowing employees to balance deep focused work and team collaboration."
  },
  {
    id: 3,
    question: "What learning and professional development perks are provided?",
    answer: "We offer sponsored technical certifications (AWS, GCP, Scrum, Kubernetes), annual learning stipends, dedicated weekly R&D hackathons, and structured mentorship programs for fast career advancement."
  },
  {
    id: 4,
    question: "What technologies and tools do Codigix engineers work with daily?",
    answer: "Engineers work with modern tech stacks including React, TypeScript, Node.js, Python, Flutter, TailwindCSS, AWS IoT Core, ESP32, Docker, MongoDB, PostgreSQL, and AI/LLM frameworks."
  },
  {
    id: 5,
    question: "Can freshers or entry-level developers apply for open positions?",
    answer: "Yes, we actively recruit high-potential freshers and junior developers for our associate engineer programs, providing hands-on training and mentorship under senior tech leads."
  }
];

const CareerFaq = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 text-left" aria-labelledby="career-faq-heading">
      <div className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 sm:p-8 shadow-sm dark:shadow-xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-gray-800">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 mb-2">
              <Sparkles size={12} /> Candidate FAQ
            </span>
            <h2 id="career-faq-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Questions About <span className="text-purple-600 dark:text-purple-400">Careers & Hiring</span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm">
            Everything you need to know about our interview process, workplace culture, hybrid work options, and career growth.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {careerFaqs.map((faq, index) => {
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

export default CareerFaq;
