import React, { useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "How quickly will you respond to my inquiry?",
    answer: "We strive to respond to all inquiries within 24 hours during normal business hours."
  },
  {
    question: "What is your project development process?",
    answer: "Our process includes Discovery, Design, Development, Testing, Deployment, and ongoing Support. We ensure clear communication at every stage."
  },
  {
    question: "Do you offer customized solutions?",
    answer: "Yes, we specialize in building tailor-made digital solutions that fit your specific business requirements and goals."
  },
  {
    question: "Do you provide post-launch support?",
    answer: "Absolutely. We offer various maintenance and support packages to ensure your solution runs smoothly after launch."
  },
  {
    question: "What technologies do you work with?",
    answer: "We work with a modern tech stack including React, Node.js, Python, AWS, Azure, and various other leading technologies."
  },
  {
    question: "How do I get started with my project?",
    answer: "Simply fill out the contact form above or schedule a meeting with us. We'll set up an initial consultation to discuss your needs."
  }
];

const ContactFaq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-8 mb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
        <div className="text-purple-400 text-[11px] font-medium flex items-center gap-1 cursor-pointer hover:text-purple-300 transition-colors">
          View All FAQs <ArrowRight size={14} />
        </div>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border border-gray-800/80 rounded-xl bg-[#050112] overflow-hidden transition-all duration-300 ${openIndex === idx ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' : 'hover:border-gray-600'}`}
          >
            <button 
              onClick={() => toggleFaq(idx)}
              className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
              <span className={`text-[12px] font-medium transition-colors ${openIndex === idx ? 'text-white' : 'text-gray-300'}`}>
                {faq.question}
              </span>
              <ChevronDown 
                size={16} 
                className={`text-purple-400 transition-transform duration-300 shrink-0 ml-4 ${openIndex === idx ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4"
                >
                  <p className="text-[11px] text-gray-500 leading-relaxed border-t border-gray-800 pt-4">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ContactFaq;
