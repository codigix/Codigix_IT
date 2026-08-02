import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const erpFaqData = [
  {
    question: "What custom ERP software development services does Codigix Infotech provide?",
    answer: "Codigix Infotech specializes in building fully customized Enterprise Resource Planning (ERP) software tailored for manufacturing, healthcare, construction, retail, trading, and logistics sectors. Our solutions cover Bill of Materials (BOM), production planning, automated inventory control, financial accounting, procurement pipelines, HR/payroll, asset management, and real-time executive BI dashboards."
  },
  {
    question: "How long does a custom ERP software implementation take?",
    answer: "A standard modular ERP deployment ranges from 6 to 12 weeks. Phase 1 discovery and prototype setup takes 2 to 3 weeks, followed by iterative sprint development, legacy data migration, automated QA testing, employee training, and seamless enterprise deployment."
  },
  {
    question: "Can Codigix ERP software integrate with existing legacy systems, CRMs, and IoT hardware?",
    answer: "Yes, our custom ERP platforms feature robust REST, GraphQL, and gRPC APIs that seamlessly connect with third-party CRM systems (Salesforce, HubSpot), accounting platforms (Tally, QuickBooks, SAP), e-commerce portals (Shopify, WooCommerce), and Industrial IoT PLC hardware sensors."
  },
  {
    question: "How does Codigix ensure enterprise data security and compliance in ERP solutions?",
    answer: "We enforce bank-grade security protocols including TLS 1.3 in-transit encryption, AES-256 at-rest database encryption, Granular Role-Based Access Control (RBAC), multi-factor authentication (MFA), automated audit logs, and compliance with ISO 27001, HIPAA, and GDPR standards."
  },
  {
    question: "Does Codigix provide post-implementation ERP maintenance and 24/7 technical support?",
    answer: "Yes, we offer comprehensive SLA-backed post-launch support including 24/7 infrastructure monitoring, automatic security patches, cloud server scaling, performance optimization, feature upgrades, and dedicated technical helpdesk support."
  }
];

const ErpFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-12 text-left">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-purple-500" />
          <span>ERP Solution Insights</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 dark:from-purple-400 dark:to-rose-400">Questions</span>
        </h2>
        <p className="text-slate-600 dark:text-gray-400 text-xs md:text-sm max-w-xl mx-auto font-normal">
          Explore key details about our custom ERP architecture, modules, multi-tenant cloud scalability, and integration options.
        </p>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {erpFaqData.map((faq, index) => {
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

export default ErpFaqSection;
