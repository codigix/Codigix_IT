import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Bot } from 'lucide-react';

export const aiFaqData = [
  {
    question: "What custom AI & Large Language Model (LLM) services does Codigix provide?",
    answer: "Codigix Infotech engineers custom Generative AI agents, fine-tuned LLM implementations (GPT-4o, Claude 3.5, Llama 3), retrieval-augmented generation (RAG) architecture, AI chatbots, computer vision inspection systems, voice AI agents, and predictive analytics platforms."
  },
  {
    question: "How does Codigix ensure enterprise data privacy and security with AI models?",
    answer: "Data security is our highest priority. We implement zero-data retention APIs, private VPC cloud deployments, on-premise model hosting, SOC2 & GDPR-compliant encryption, and role-based access control (RBAC) so your proprietary company data is never used to train public LLM models."
  },
  {
    question: "Can Codigix integrate AI capabilities into our existing software & ERP/CRM systems?",
    answer: "Yes, we build custom RESTful and gRPC API integrations to seamlessly embed AI capabilities into your existing software ecosystem, including custom ERPs, CRMs, mobile applications, databases, and Industrial IoT hardware."
  },
  {
    question: "What is the typical development timeline for an enterprise AI project?",
    answer: "Proof of Concept (PoC) or rapid AI prototype development typically takes 2 to 4 weeks. Full enterprise AI solution design, model training/fine-tuning, security testing, and production deployment generally take 6 to 12 weeks."
  },
  {
    question: "What AI frameworks, libraries, and cloud infrastructure do you use?",
    answer: "We utilize leading enterprise AI frameworks including PyTorch, TensorFlow, LangChain, LlamaIndex, Hugging Face, OpenCV, Pinecone vector databases, CUDA, OpenAI API, AWS Bedrock, Google Cloud Vertex AI, and Microsoft Azure AI."
  }
];

const AiFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 border-t border-slate-200 dark:border-gray-800/60 mt-16">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Bot size={14} />
            <span>AI Solutions FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Frequently Asked Questions About <span className="ai-text-gradient">Codigix AI Engineering</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base font-normal">
            Get quick answers regarding custom AI model development, data security standards, tech stacks, and integration timelines.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {aiFaqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-purple-50/80 dark:bg-[#0f0a2e]/90 border-purple-300 dark:border-purple-500/50 shadow-sm'
                    : 'bg-white dark:bg-[#0c0828]/60 border-slate-200 dark:border-purple-900/30 hover:border-purple-300 dark:hover:border-purple-800/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className={isOpen ? "text-purple-600 dark:text-purple-400 shrink-0" : "text-slate-400 dark:text-slate-500 shrink-0"} />
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-purple-500/20 border-purple-500/50 text-purple-600 dark:text-purple-300 rotate-180'
                      : 'bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/50 text-slate-500 dark:text-slate-400'
                  }`}>
                    <ChevronDown size={15} />
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
                      <div className="px-6 pb-5 pt-1 text-slate-650 dark:text-slate-300 text-sm leading-relaxed border-t border-purple-200/60 dark:border-purple-900/20 font-normal">
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

export default AiFaqSection;
