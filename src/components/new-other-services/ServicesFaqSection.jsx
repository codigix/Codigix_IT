import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const servicesFaqData = [
  {
    question: "What digital software engineering services does Codigix Infotech provide?",
    answer: "Codigix Infotech provides full-cycle digital engineering services including Custom Web Application Development (React, Next.js, Node.js), Native & Cross-Platform Mobile Apps (iOS, Android, React Native, Flutter), UI/UX Design Systems, Cloud Architecture (AWS, Azure, GCP), and DevOps CI/CD Automation."
  },
  {
    question: "What technology stack does Codigix use for custom web and mobile app development?",
    answer: "For web development, we leverage React.js, Next.js, TypeScript, TailwindCSS, Node.js, Python, and PostgreSQL/MongoDB. For mobile development, we specialize in React Native, Flutter, Swift, and Kotlin. Our cloud solutions are built on AWS, Microsoft Azure, and Docker/Kubernetes container orchestration."
  },
  {
    question: "How does Codigix handle UI/UX design and prototyping before software coding?",
    answer: "We follow an atomic design methodology in Figma. Our UI/UX team conducts user research, creates interactive wireframes, builds design tokens, and conducts usability testing before any code is written, ensuring seamless design-to-code handoff."
  },
  {
    question: "What cloud migration and DevOps automation services do you offer?",
    answer: "We deliver end-to-end cloud migrations to AWS/Azure with zero downtime, serverless architecture (AWS Lambda), Infrastructure as Code (Terraform), Docker containerization, Kubernetes cluster management, automated CI/CD pipelines, and 24/7 telemetry monitoring (Prometheus, Grafana)."
  },
  {
    question: "How do we request a project quote or schedule a technical consultation?",
    answer: "Simply navigate to our Contact page or click 'Book Consultation'. Our engineering lead will discuss your project scope, provide an estimated timeline (typically 4–12 weeks), and deliver a comprehensive proposal within 24 hours."
  }
];

const ServicesFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-12 text-left">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-purple-500" />
          <span>Engineering FAQ</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-normal">
          Learn more about our web app engineering, mobile development, cloud migration, and DevOps automation practices.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {servicesFaqData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-purple-50/70 dark:bg-[#0f0a2e]/90 border-purple-400 dark:border-purple-500/50 shadow-md dark:shadow-[0_4px_25px_rgba(139,92,246,0.15)]'
                  : 'bg-white dark:bg-[#0c0828]/60 border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800/50'
              }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none rounded-xl cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className={isOpen ? "text-purple-600 dark:text-purple-400 shrink-0" : "text-slate-400 dark:text-slate-500 shrink-0"} />
                  <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {faq.question}
                  </h3>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                  isOpen
                    ? 'bg-purple-600/20 border-purple-500/50 text-purple-600 dark:text-purple-300 rotate-180'
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

export default ServicesFaqSection;
