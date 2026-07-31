import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp } from 'lucide-react';

const steps = [
  { 
    name: 'Machine', 
    image: '/assets/images/workflow/wf_machine.png', 
    desc: 'Industrial equipment & assets',
    log: '[TELEMETRY] Connection established with Machine_ID #402. Ingesting raw sensor values... OK'
  },
  { 
    name: 'PLC', 
    image: '/assets/images/workflow/wf_plc.png', 
    desc: 'Direct machine sensor control',
    log: '[MODBUS/TCP] Reading 16-bit register inputs. Status: 0x00 (Normal). Telemetry verified.'
  },
  { 
    name: 'IoT Gateway', 
    image: '/assets/images/workflow/wf_iot.png', 
    desc: 'Edge processing & encryption',
    log: '[EDGE] Packaging JSON payload. Encrypting with TLS 1.3. Streaming to endpoint...'
  },
  { 
    name: 'Cloud', 
    image: '/assets/images/workflow/wf_cloud.png', 
    desc: 'Centralized datalake storage',
    log: '[DATALAKE] Ingesting stream from gateway. Partitioning raw telemetry. Storing in AWS S3...'
  },
  { 
    name: 'AI Analytics', 
    image: '/assets/images/workflow/wf_ai.png', 
    desc: 'Predictive modeling & ML',
    log: '[ML_MODEL] Running anomaly detection. Probability: 0.0042. Decision: Anomaly flag = FALSE'
  },
  { 
    name: 'ERP System', 
    image: '/assets/images/workflow/wf_erp.png', 
    desc: 'Operational resource logs',
    log: '[LEDGER] Logging operational output to database. ERP sync state: Success.'
  },
  { 
    name: 'Dashboard', 
    image: '/assets/images/service/crm_dash.png', 
    desc: 'Live monitoring control room',
    log: '[REALTIME] Pushing live state to WebSockets. UI Refresh: 60fps. Latency: 4.2ms.'
  },
  { 
    name: 'Mobile App', 
    image: '/assets/images/service/mobile_app.png', 
    desc: 'Field-level instant alerts',
    log: '[APNS/FCM] Stream health normal. Status OK. Dispatching gateway keep-alive heartbeat.'
  },
  { 
    name: 'Management', 
    image: '/assets/images/about/ai_human_handshake.webp', 
    desc: 'Strategic decision making',
    log: '[ANALYTICS] Operations dashboard ready. OEE score updated: 94.2%. Logs cached successfully.'
  },
];

const WorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-24 bg-[#050117] border-y border-gray-800/50 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <span className="nh-section-subtitle mb-2 block">HOW WE TRANSFORM BUSINESSES</span>
        <h2 className="nh-section-title mb-20">Industry 4.0 Workflow</h2>

        <div className="relative w-full mx-auto pb-10">

          {/* Icons and Arrows Row */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center w-full gap-4 lg:gap-2 relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <React.Fragment key={idx}>
                  <motion.div
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPaused(true);
                      // Resume auto rotation after 12 seconds
                      const timer = setTimeout(() => setIsPaused(false), 12000);
                      return () => clearTimeout(timer);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`flex flex-col items-center group cursor-pointer w-[105px] lg:w-auto relative transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-60 hover:opacity-100'}`}
                  >
                    {/* Floating description tooltip */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-[#0a0620] border border-purple-500/30 text-gray-300 text-[10px] px-3 py-2 rounded-lg shadow-[0_10px_35px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-28 text-center z-30 leading-snug">
                      <div className="font-bold text-white mb-0.5">{step.name}</div>
                      {step.desc}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#0a0620] border-r border-b border-purple-500/30 rotate-45" />
                    </div>

                    <div className={`w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center rounded-2xl relative border transition-all duration-300 ${isActive ? 'border-purple-500/40 bg-purple-500/10 shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'border-transparent bg-transparent'}`}>
                      <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-md group-hover:bg-purple-500/10 transition-colors" />
                      <img
                        src={step.image}
                        alt={step.name}
                        className="w-full h-full object-contain group-hover:-translate-y-2 transition-all duration-300 drop-shadow-[0_0_12px_rgba(59,130,246,0.2)] group-hover:drop-shadow-[0_0_18px_rgba(139,92,246,0.4)] relative z-10"
                      />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-purple-400' : 'text-gray-400 group-hover:text-white'}`}>{step.name}</span>
                  </motion.div>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="hidden lg:block text-gray-700 px-1"
                    >
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Bottom SVG Curved Path (Desktop Only) */}
          <div className="hidden lg:block absolute bottom-[-20px] left-0 w-full h-[30px] pointer-events-none">
            <style>
              {`
                @keyframes dashFlow {
                  from {
                    stroke-dashoffset: 32;
                  }
                  to {
                    stroke-dashoffset: 0;
                  }
                }
                .animate-data-flow {
                  animation: dashFlow 1s linear infinite;
                }
              `}
            </style>
            <svg width="100%" height="100%" viewBox="0 0 1000 60" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path
                id="workflow-track"
                d="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0"
                stroke="url(#wf-gradient)"
                strokeWidth="2"
                strokeDasharray="8 8"
                vectorEffect="non-scaling-stroke"
                className="animate-data-flow"
              />
              <defs>
                <linearGradient id="wf-gradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f43f5e" /> {/* Rose */}
                  <stop offset="0.5" stopColor="#3b82f6" /> {/* Blue */}
                  <stop offset="1" stopColor="#06b6d4" /> {/* Cyan */}
                </linearGradient>
              </defs>

              {/* Native Staggered Animated Data Packets along the Path */}
              <circle r="4" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4" fill="#3b82f6" filter="drop-shadow(0 0 3px #3b82f6)">
                <animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4" fill="#06b6d4" filter="drop-shadow(0 0 3px #06b6d4)">
                <animateMotion dur="6s" begin="3s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4" fill="#8b5cf6" filter="drop-shadow(0 0 3px #8b5cf6)">
                <animateMotion dur="6s" begin="4.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
            </svg>

            {/* Glowing dots on the line */}
            <div className="absolute bottom-[0px] left-[20%] w-[11px] h-[11px] rounded-full bg-rose-400 shadow-[0_0_10px_#f43f5e] animate-pulse"></div>
            <div className="absolute bottom-[0px] left-[35%] w-[11px] h-[11px] rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6] animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="absolute bottom-[0px] right-[35%] w-[11px] h-[11px] rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" style={{ animationDelay: '400ms' }}></div>
            <div className="absolute bottom-[0px] right-[20%] w-[11px] h-[11px] rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-pulse" style={{ animationDelay: '600ms' }}></div>

            {/* Pill in the middle */}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-[#050117] px-6 py-1 border border-blue-500/40 rounded-full flex items-center justify-center pointer-events-auto shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <span className="text-[11px] text-gray-300 font-semibold tracking-wider uppercase">Real-time Data Flow</span>
            </div>

            {/* End Arrows */}
            <ArrowUp size={16} className="absolute top-[-19px] left-[59px] text-rose-500" />
            <ArrowUp size={16} className="absolute top-[-19px] right-[59px] text-cyan-500" />
          </div>
        </div>

        {/* Live Pipeline Terminal Console */}
        <div className="mt-14 max-w-3xl mx-auto border border-gray-800/80 rounded-xl overflow-hidden bg-[#07041a] text-left shadow-[0_15px_45px_rgba(0,0,0,0.5)]">
          {/* Terminal Header */}
          <div className="bg-[#0b0724] px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span className="text-[10px] font-mono text-gray-500 ml-2">pipeline_monitor.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="nh-led-active"></span>
              <span className="text-[8px] font-mono text-green-400 font-bold uppercase tracking-wider">LIVE TELEMETRY STREAM</span>
            </div>
          </div>
          
          {/* Terminal Body */}
          <div className="p-4 font-mono text-xs text-gray-400 min-h-[110px] flex flex-col justify-center space-y-1">
            <div className="text-[9px] text-gray-600">-- SESSION STARTED: {new Date().toLocaleDateString()} --</div>
            <div className="flex items-start gap-2">
              <span className="text-rose-500 select-none">&rarr;</span>
              <span className="text-gray-200">Executing: <span className="text-purple-400">./stream_pipeline_verify --active-node="{steps[activeStep].name.toLowerCase()}"</span></span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <span className="text-green-500 select-none">$</span>
              <span className="text-green-400/90 font-semibold">{steps[activeStep].log}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;
