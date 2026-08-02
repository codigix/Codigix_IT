import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Sparkles, Building2, Cog, BrainCircuit,
  Wifi, Zap, Clock, Rocket, Plus, Minus, ArrowRight
} from 'lucide-react';

export const faqData = [
  {
    id: 1,
    icon: Sparkles,
    question: "What services does Codigix provide?",
    answer: "We provide AI-powered software development, Industrial IoT solutions, ERP systems, CRM platforms, mobile applications, cloud solutions, and enterprise automation tailored to your business needs."
  },
  {
    id: 2,
    icon: Building2,
    question: "Which industries do you serve?",
    answer: "We serve manufacturing, healthcare, retail & e-commerce, logistics & supply chain, finance & banking, automotive, real estate, education, and telecommunications sectors with specialized digital transformation solutions."
  },
  {
    id: 3,
    icon: Cog,
    question: "Do you develop customized ERP software?",
    answer: "Yes, we build fully tailored ERP systems including inventory management, production planning, procurement, quality assurance, financial accounting, asset management, and HR modules."
  },
  {
    id: 4,
    icon: BrainCircuit,
    question: "Can you integrate AI into our existing systems?",
    answer: "Yes, we engineer custom AI models, RAG pipelines, chatbots, voice agents, and computer vision tools that integrate seamlessly via REST APIs or gRPC with your existing software stack."
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-10 px-4 sm:px-6 lg:px-12 bg-[#faf8ff] dark:bg-[#050212] transition-colors duration-300 border-t border-purple-200/60 dark:border-purple-900/30 overflow-hidden">

      {/* Light Mode Full Background Image */}
      <div
        className="block dark:hidden absolute inset-0 bg-contain bg-left lg:bg-top bg-no-repeat pointer-events-none z-0 opacity-95 transition-opacity duration-300"
        style={{ backgroundImage: "url('/assets/images/new-home/faq_light_bg.png')" }}
      />

      {/* Dark Mode Full Background Image */}
      <div
        className="hidden dark:block absolute inset-0 bg-contain bg-left lg:bg-top bg-no-repeat pointer-events-none z-0 opacity-95 mix-blend-screen transition-opacity duration-300"
        style={{ backgroundImage: "url('/assets/images/new-home/faq_dark_bg.png')" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">

          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#120836]/90 border border-purple-300/80 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-md">
            <MessageSquare size={14} className="text-purple-600 dark:text-purple-400" />
            <span>FAQ</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 dark:from-purple-400 dark:via-fuchsia-400 dark:to-indigo-400">Questions</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Find answers to the most common questions about our services, process, and solutions.
          </p>

          {/* Decorative Gradient Divider */}
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-500 rounded-full mt-6 opacity-90 shadow-sm" />
        </div>

        {/* Two Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: 3D Graphic Spacer (Light/Dark BG Provides Graphic) + "Can't find your answer?" Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">

            {/* Visual Spacer to allow the background 3D Question Mark to shine */}
            <div className="min-h-[220px] lg:min-h-[280px] w-full" />

            {/* "Can't find your answer?" Card */}
            <div className="w-full p-6 sm:p-8 rounded-3xl bg-white/90 dark:bg-[#090422]/90 border border-purple-200/90 dark:border-purple-500/40 backdrop-blur-xl shadow-xl dark:shadow-[0_10px_35px_rgba(0,0,0,0.6)] text-left transition-colors duration-300">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mb-2">
                Can't find your answer?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 leading-relaxed mb-6 font-normal">
                Our team is ready to help you with any specific questions.
              </p>
              <Link
                to="/contact"
                aria-label="Contact Codigix Experts for specific inquiries"
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 flex items-center justify-center gap-2 group transition-all duration-300 cursor-pointer"
              >
                <span>Contact Our Experts</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

          {/* Right Column: Accordion Questions List */}
          <div className="lg:col-span-7 space-y-3.5">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              const ItemIcon = faq.icon;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden backdrop-blur-md ${isOpen
                    ? 'bg-gradient-to-r from-purple-50/95 via-indigo-50/80 to-white dark:from-[#0d072b]/95 dark:via-[#130b3a]/90 dark:to-[#0d072b]/95 border-purple-400 dark:border-purple-500/70 shadow-lg shadow-purple-500/10 dark:shadow-[0_4px_25px_rgba(168,85,247,0.25)]'
                    : 'bg-white/90 dark:bg-[#07031e]/80 border-slate-200/90 dark:border-purple-900/40 hover:border-purple-300 dark:hover:border-purple-700/60 shadow-sm hover:shadow-md'
                    }`}
                >
                  {/* Accordion Header Button */}
                  <button
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-purple-500/40 rounded-2xl cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Left Icon Container */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen
                        ? 'bg-purple-500/20 border border-purple-400 text-purple-600 dark:text-purple-300 shadow-sm'
                        : 'bg-purple-50/80 dark:bg-[#130b3a] border border-purple-200/70 dark:border-purple-900/40 text-purple-600 dark:text-purple-400'
                        }`}>
                        <ItemIcon size={18} />
                      </div>

                      {/* Question Text */}
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug truncate sm:whitespace-normal">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Right Toggle Plus/Minus Button */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${isOpen
                      ? 'bg-purple-600/30 border border-purple-400 text-purple-600 dark:text-purple-300'
                      : 'bg-slate-100 dark:bg-[#150d40] border-slate-200 dark:border-purple-900/50 text-slate-500 dark:text-purple-300'
                      }`}>
                      {isOpen ? <Minus size={15} strokeWidth={2.5} /> : <Plus size={15} strokeWidth={2.5} />}
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 pt-2 text-slate-650 dark:text-gray-300 text-xs sm:text-sm leading-relaxed border-t border-purple-200/60 dark:border-purple-900/30 font-normal text-left">
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

      </div>
    </section>
  );
};

export default FaqSection;
