import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const crmFaqData = [
  {
    question: "What custom CRM software development services does Codigix Infotech provide?",
    answer: "Codigix Infotech builds custom Customer Relationship Management (CRM) platforms tailored for sales pipeline management, lead scoring automation, customer support ticketing, multi-channel marketing automation, AI-driven deal forecasting, and executive analytics dashboards."
  },
  {
    question: "Can Codigix CRM integrate with third-party apps like WhatsApp, Email, ERP, and VoIP?",
    answer: "Yes, our custom CRM solutions feature pre-built REST, GraphQL, and webhook connectors for WhatsApp Business API, Gmail, Outlook, Twilio VoIP, Tally/QuickBooks ERP, and payment gateways (Stripe, Razorpay)."
  },
  {
    question: "How does Codigix integrate Generative AI and AI chatbots into custom CRM platforms?",
    answer: "We deploy custom AI agents, automated email drafting models, lead scoring algorithms, RAG-powered knowledge base chatbots, and automated voice transcription models directly into your CRM workflow to boost sales rep productivity."
  },
  {
    question: "What is the typical timeline for building and deploying a custom CRM system?",
    answer: "A modular custom CRM implementation takes 4 to 8 weeks. Phase 1 discovery and pipeline modeling takes 2 weeks, followed by iterative sprint development, data migration from legacy CRMs (Salesforce, HubSpot, Zoho), user role training, and cloud launch."
  },
  {
    question: "How does Codigix handle CRM data security, role-based access, and SLA support?",
    answer: "We implement strict Role-Based Access Control (RBAC), end-to-end TLS 1.3/AES-256 database encryption, audit logs, GDPR compliance, and offer 24/7 SLA infrastructure maintenance support with 99.9% uptime guarantees."
  }
];

const CrmFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-12 text-left">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-indigo-500" />
          <span>CRM Solution Insights</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 dark:from-purple-400 dark:to-indigo-400">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-normal">
          Explore key insights regarding custom CRM architecture, sales automation pipelines, AI lead scoring, and third-party integrations.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {crmFaqData.map((faq, index) => {
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

export default CrmFaqSection;
