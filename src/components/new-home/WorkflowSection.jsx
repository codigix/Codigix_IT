import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUp, LayoutDashboard, Smartphone, BrainCircuit } from 'lucide-react';

const steps = [
  {
    name: 'Machine',
    imageLight: '/assets/images/workflow/wf_machine.png',
    imageDark: '/assets/images/workflow/wf_machine.png',
    desc: 'Industrial equipment & assets',
    log: '[TELEMETRY] Connection established with Machine_ID #402. Ingesting raw sensor values... OK',
    needsInvert: true
  },
  {
    name: 'PLC',
    imageLight: '/assets/images/workflow/wf_plc.png',
    imageDark: '/assets/images/workflow/wf_plc.png',
    desc: 'Direct machine sensor control',
    log: '[MODBUS/TCP] Reading 16-bit register inputs. Status: 0x00 (Normal). Telemetry verified.',
    needsInvert: true
  },
  {
    name: 'IoT Gateway',
    imageLight: '/assets/images/workflow/wf_iot.png',
    imageDark: '/assets/images/workflow/wf_iot.png',
    desc: 'Edge processing & encryption',
    log: '[EDGE] Packaging JSON payload. Encrypting with TLS 1.3. Streaming to endpoint...',
    needsInvert: true
  },
  {
    name: 'Cloud',
    imageLight: '/assets/images/workflow/wf_cloud.png',
    imageDark: '/assets/images/workflow/wf_cloud.png',
    desc: 'Centralized datalake storage',
    log: '[DATALAKE] Ingesting stream from gateway. Partitioning raw telemetry. Storing in AWS S3...',
    needsInvert: true
  },
  {
    name: 'AI Analytics',
    imageLight: '/assets/images/workflow/wf_ai.png',
    imageDark: '/assets/images/workflow/wf_ai.png',
    desc: 'Predictive modeling & ML',
    log: '[ML_MODEL] Running anomaly detection. Probability: 0.0042. Decision: Anomaly flag = FALSE',
    needsInvert: true
  },
  {
    name: 'ERP System',
    imageLight: '/assets/images/workflow/wf_erp.png',
    imageDark: '/assets/images/workflow/wf_erp.png',
    desc: 'Operational resource logs',
    log: '[LEDGER] Logging operational output to database. ERP sync state: Success.',
    needsInvert: true
  },
  {
    name: 'Dashboard',
    imageLight: '/assets/images/workflow/wf_dashboard_3d.png',
    imageDark: '/assets/images/workflow/wf_dashboard_3d.png',
    desc: 'Live monitoring control room',
    log: '[REALTIME] Pushing live state to WebSockets. UI Refresh: 60fps. Latency: 4.2ms.',
    needsInvert: true
  },
  {
    name: 'Mobile App',
    imageLight: '/assets/images/workflow/wf_mobile_3d.png',
    imageDark: '/assets/images/workflow/wf_mobile_3d.png',
    desc: 'Field-level instant alerts',
    log: '[APNS/FCM] Stream health normal. Status OK. Dispatching gateway keep-alive heartbeat.',
    needsInvert: true
  },
  {
    name: 'Management',
    imageLight: '/assets/images/workflow/wf_management_3d.png',
    imageDark: '/assets/images/workflow/wf_management_3d.png',
    desc: 'Strategic decision making',
    log: '[ANALYTICS] Operations dashboard ready. OEE score updated: 94.2%. Logs cached successfully.',
    needsInvert: true
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
    <section className="py-24 bg-gradient-to-b from-purple-50/30 via-slate-50 to-white dark:from-[#0d0b21] dark:via-[#0d0b21] dark:to-[#0d0b21] border-y border-purple-100 dark:border-gray-800/50 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <span className="nh-section-subtitle mb-2 block text-rose-600 dark:text-rose-500 font-bold tracking-wider">HOW WE TRANSFORM BUSINESSES</span>
        <h2 className="nh-section-title mb-20 text-slate-900 dark:text-white font-extrabold">Industry 4.0 Workflow</h2>

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
                      const timer = setTimeout(() => setIsPaused(false), 12000);
                      return () => clearTimeout(timer);
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`flex flex-col items-center group cursor-pointer w-[105px] lg:w-auto relative transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {/* Floating description tooltip */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white border border-purple-500/30 text-[10px] px-3 py-2 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-28 text-center z-30 leading-snug">
                      <div className="font-bold text-white mb-0.5">{step.name}</div>
                      <span className="text-gray-300">{step.desc}</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 border-r border-b border-purple-500/30 rotate-45" />
                    </div>

                    {/* Icon Card Frame - Expanded with soft pastel circular glow backdrops */}
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 mb-3 flex items-center justify-center rounded-2xl relative border transition-all duration-300 ${isActive
                      ? 'border-purple-600 dark:border-purple-500 bg-purple-100/90 dark:bg-purple-950/40 shadow-[0_8px_30px_rgba(139,92,246,0.35)] dark:shadow-[0_8px_30px_rgba(139,92,246,0.25)]'
                      : 'border-slate-200/90 dark:border-gray-800/80 bg-slate-50 dark:bg-[#0c0828]/40 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:border-purple-400 dark:hover:border-purple-500/40'
                      }`}>
                      {/* Interactive inner colorful glow backdrop */}
                      <div className={`absolute inset-1.5 rounded-xl transition-all duration-300 ${isActive
                        ? 'bg-gradient-to-tr from-purple-500/15 to-indigo-500/15'
                        : 'bg-gradient-to-tr from-slate-100/40 to-slate-200/40 dark:from-purple-950/10 dark:to-indigo-950/10 group-hover:from-purple-500/5 group-hover:to-indigo-500/5'
                        }`} />

                      {/* Light Theme Bold Icon - Increased to w-14 h-14 */}
                      <img
                        src={step.imageLight}
                        alt={`${step.name} Light`}
                        className={`block dark:hidden w-20 h-20 object-contain group-hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_4px_8px_rgba(139,92,246,0.25)] relative z-10 ${step.needsInvert ? 'invert contrast-135 brightness-75 saturate-125' : 'contrast-110 saturate-110'
                          }`}
                      />

                      {/* Dark Theme Bold Icon - Increased to w-14 h-14 */}
                      <img
                        src={step.imageDark}
                        alt={`${step.name} Dark`}
                        className="hidden dark:block w-14 h-14 object-contain group-hover:-translate-y-1 transition-all duration-300 drop-shadow-[0_0_15px_rgba(139,92,246,0.4)] group-hover:drop-shadow-[0_8px_20px_rgba(139,92,246,0.5)] relative z-10 contrast-110 brightness-110 saturate-110"
                      />
                    </div>
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-purple-700 dark:text-purple-400' : 'text-slate-700 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white'}`}>{step.name}</span>
                  </motion.div>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="hidden lg:block text-slate-400 dark:text-gray-700 px-1"
                    >
                      <ArrowRight size={18} strokeWidth={2} />
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
                strokeWidth="2.5"
                strokeDasharray="8 8"
                vectorEffect="non-scaling-stroke"
                className="animate-data-flow"
              />
              <defs>
                <linearGradient id="wf-gradient" x1="0" y1="0" x2="1000" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f43f5e" />
                  <stop offset="0.5" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              <circle r="4.5" fill="#f43f5e" filter="drop-shadow(0 0 3px #f43f5e)">
                <animateMotion dur="6s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill="#3b82f6" filter="drop-shadow(0 0 3px #3b82f6)">
                <animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill="#06b6d4" filter="drop-shadow(0 0 3px #06b6d4)">
                <animateMotion dur="6s" begin="3s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill="#8b5cf6" filter="drop-shadow(0 0 3px #8b5cf6)">
                <animateMotion dur="6s" begin="4.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
            </svg>

            {/* Glowing dots on the line */}
            <div className="absolute bottom-[0px] left-[20%] w-[11px] h-[11px] rounded-full bg-rose-400 shadow-[0_0_10px_#f43f5e] animate-pulse"></div>
            <div className="absolute bottom-[0px] left-[35%] w-[11px] h-[11px] rounded-full bg-blue-400 shadow-[0_0_10px_#3b82f6] animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="absolute bottom-[0px] right-[35%] w-[11px] h-[11px] rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-pulse" style={{ animationDelay: '400ms' }}></div>
            <div className="absolute bottom-[0px] right-[20%] w-[11px] h-[11px] rounded-full bg-cyan-300 shadow-[0_0_10px_#06b6d4] animate-pulse" style={{ animationDelay: '600ms' }}></div>

            {/* Pill in the middle */}
            <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#050117] px-6 py-1 border border-blue-400 dark:border-blue-500/40 rounded-full flex items-center justify-center pointer-events-auto shadow-[0_4px_15px_rgba(59,130,246,0.15)]">
              <span className="text-[11px] text-slate-800 dark:text-gray-300 font-extrabold tracking-wider uppercase">Real-time Data Flow</span>
            </div>

            {/* End Arrows */}
            <ArrowUp size={16} className="absolute top-[-19px] left-[59px] text-rose-500" />
            <ArrowUp size={16} className="absolute top-[-19px] right-[59px] text-cyan-500" />
          </div>
        </div>

        {/* Live Pipeline Terminal Console */}
        <div className="mt-14 max-w-3xl mx-auto border border-purple-900/40 dark:border-gray-800/80 rounded-xl overflow-hidden bg-[#0c0828] dark:bg-[#07041a] text-left shadow-[0_15px_40px_rgba(139,92,246,0.15)] dark:shadow-[0_15px_45px_rgba(0,0,0,0.5)] keep-dark">
          <div className="bg-[#130d3a] dark:bg-[#0b0724] px-4 py-2.5 border-b border-purple-900/40 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
              <span className="text-[10px] font-mono text-gray-400 ml-2">pipeline_monitor.sh</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="nh-led-active"></span>
              <span className="text-[8px] font-mono text-green-400 font-bold uppercase tracking-wider">LIVE TELEMETRY STREAM</span>
            </div>
          </div>

          <div className="p-4 font-mono text-xs text-gray-300 min-h-[110px] flex flex-col justify-center space-y-1">
            <div className="text-[9px] text-gray-500">-- SESSION STARTED: {new Date().toLocaleDateString()} --</div>
            <div className="flex items-start gap-2">
              <span className="text-rose-500 select-none">&rarr;</span>
              <span className="text-gray-200">Executing: <span className="text-purple-400">./stream_pipeline_verify --active-node="{steps[activeStep].name.toLowerCase()}"</span></span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <span className="text-green-500 select-none">$</span>
              <span className="text-green-400 font-semibold">{steps[activeStep].log}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;
