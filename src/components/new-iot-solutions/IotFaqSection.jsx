import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Cpu } from 'lucide-react';

export const iotFaqData = [
  {
    question: "What Industrial IoT (IIoT) & smart factory integration services does Codigix provide?",
    answer: "Codigix Infotech delivers end-to-end Industrial IoT solutions, including PLC & SCADA integration, smart sensor network telemetry, overall equipment effectiveness (OEE) dashboards, real-time machine health monitoring, edge gateway computing, and predictive maintenance engines."
  },
  {
    question: "Which industrial PLCs, SCADA systems, and communication protocols do you support?",
    answer: "We support leading industrial hardware and protocols including Siemens S7, Allen-Bradley (Rockwell), Schneider Electric, Omron, Mitsubishi PLCs, Modbus/TCP, Modbus RTU, OPC-UA, MQTT, PROFINET, Ethernet/IP, and BACnet."
  },
  {
    question: "How does Codigix bridge edge IoT devices with enterprise ERP & cloud systems?",
    answer: "We deploy secure industrial edge gateways (Raspberry Pi, ESP32, industrial gateways) that collect, filter, and encrypt telemetry stream data over TLS 1.3 before forwarding it via MQTT/HTTPS to AWS, Azure, or private cloud datalakes connected directly to your ERP/CRM systems."
  },
  {
    question: "How is Overall Equipment Effectiveness (OEE) calculated in the Codigix IoT platform?",
    answer: "Our OEE platform automatically calculates Availability (uptime vs planned production), Performance (actual operating speed vs max rated speed), and Quality (good units produced vs total units) in real time using automated PLC sensor feeds."
  },
  {
    question: "What hardware or sensors do we need to get started with Codigix IIoT?",
    answer: "We can connect to your existing PLC/SCADA hardware directly or deploy non-intrusive wireless retrofitted sensors for temperature, pressure, current, vibration, RFID, and optical barcode scanning without interrupting active production lines."
  }
];

const IotFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 border-t border-slate-200 dark:border-gray-800/60 mt-16 text-left">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-left mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu size={14} />
            <span>Industrial IoT FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Frequently Asked Questions About <span className="iot-text-gradient">Codigix Industrial IoT</span>
          </h2>
          <p className="text-slate-600 dark:text-gray-400 text-sm md:text-base font-normal">
            Explore key answers regarding PLC drivers, Modbus/OPC-UA protocols, edge gateway security, OEE calculation, and cloud ERP sync.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {iotFaqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-rose-50/80 dark:bg-[#0f0a2e]/90 border-rose-300 dark:border-rose-500/50 shadow-sm'
                    : 'bg-white dark:bg-[#0c0828]/60 border-slate-200 dark:border-gray-800/60 hover:border-rose-300 dark:hover:border-rose-900/50'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-rose-500/40 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle size={18} className={isOpen ? "text-rose-600 dark:text-rose-400 shrink-0" : "text-slate-400 dark:text-slate-500 shrink-0"} />
                    <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                    isOpen
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-600 dark:text-rose-300 rotate-180'
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
                      <div className="px-6 pb-5 pt-1 text-slate-650 dark:text-slate-300 text-sm leading-relaxed border-t border-rose-200/60 dark:border-rose-900/20 font-normal">
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

export default IotFaqSection;
