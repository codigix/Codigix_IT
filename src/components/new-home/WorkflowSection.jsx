import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Cog, Cpu, Wifi, Cloud, BrainCircuit,
  Building2, LayoutDashboard, Smartphone, TrendingUp,
  ArrowRight, ArrowUp, Activity, Layers, Tablet, Bell,
  PenTool, Server, Flame, Zap, ClipboardList, Eye
} from 'lucide-react';

const automatedSteps = [
  {
    name: 'Machine',
    icon: Cog,
    iconColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'from-rose-500/20 via-rose-500/10 to-transparent',
    activeGlow: 'border-rose-500 shadow-[0_8px_25px_rgba(244,63,94,0.35)]',
    desc: 'Industrial equipment & assets',
    log: '[TELEMETRY] Connection established with Machine_ID #402. Ingesting raw sensor values... OK'
  },
  {
    name: 'PLC',
    icon: Cpu,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
    activeGlow: 'border-indigo-500 shadow-[0_8px_25px_rgba(99,102,241,0.35)]',
    desc: 'Direct machine sensor control',
    log: '[MODBUS/TCP] Reading 16-bit register inputs. Status: 0x00 (Normal). Telemetry verified.'
  },
  {
    name: 'IoT Gateway',
    icon: Wifi,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500/25 via-purple-500/10 to-transparent',
    activeGlow: 'border-purple-500 shadow-[0_8px_25px_rgba(168,85,247,0.35)]',
    desc: 'Edge processing & encryption',
    log: '[EDGE] Packaging JSON payload. Encrypting with TLS 1.3. Streaming to endpoint...'
  },
  {
    name: 'Cloud',
    icon: Cloud,
    iconColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'from-blue-500/20 via-blue-500/10 to-transparent',
    activeGlow: 'border-blue-500 shadow-[0_8px_25px_rgba(59,130,246,0.35)]',
    desc: 'Centralized datalake storage',
    log: '[DATALAKE] Ingesting stream from gateway. Partitioning raw telemetry. Storing in AWS S3...'
  },
  {
    name: 'AI Analytics',
    icon: BrainCircuit,
    iconColor: 'text-pink-600 dark:text-pink-400',
    bgColor: 'from-pink-500/20 via-pink-500/10 to-transparent',
    activeGlow: 'border-pink-500 shadow-[0_8px_25px_rgba(236,72,153,0.35)]',
    desc: 'Predictive modeling & ML',
    log: '[ML_MODEL] Running anomaly detection. Probability: 0.0042. Decision: Anomaly flag = FALSE'
  },
  {
    name: 'ERP System',
    icon: Building2,
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'from-amber-500/20 via-amber-500/10 to-transparent',
    activeGlow: 'border-amber-500 shadow-[0_8px_25px_rgba(245,158,11,0.35)]',
    desc: 'Operational resource logs',
    log: '[LEDGER] Logging operational output to database. ERP sync state: Success.'
  },
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    activeGlow: 'border-emerald-500 shadow-[0_8px_25px_rgba(16,185,129,0.35)]',
    desc: 'Live monitoring control room',
    log: '[REALTIME] Pushing live state to WebSockets. UI Refresh: 60fps. Latency: 4.2ms.'
  },
  {
    name: 'Mobile App',
    icon: Smartphone,
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
    activeGlow: 'border-cyan-500 shadow-[0_8px_25px_rgba(6,182,212,0.35)]',
    desc: 'Field-level instant alerts',
    log: '[APNS/FCM] Stream health normal. Status OK. Dispatching gateway keep-alive heartbeat.'
  },
  {
    name: 'Management',
    icon: TrendingUp,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500/20 via-purple-500/10 to-transparent',
    activeGlow: 'border-purple-500 shadow-[0_8px_25px_rgba(168,85,247,0.35)]',
    desc: 'Strategic decision making',
    log: '[ANALYTICS] Operations dashboard ready. OEE score updated: 94.2%. Logs cached successfully.'
  }
];

const conventionalSteps = [
  {
    name: 'Legacy Machine',
    icon: Cog,
    iconColor: 'text-gray-600 dark:text-gray-400',
    bgColor: 'from-gray-500/20 via-gray-500/10 to-transparent',
    activeGlow: 'border-gray-500 shadow-[0_8px_25px_rgba(107,114,128,0.35)]',
    desc: 'Legacy mechanical lathe or mill',
    log: '[STATUS] Conventional lathe operational. Mechanical-only controls. Direct telemetry: NONE.'
  },
  {
    name: 'Sensors Retrofit',
    icon: Activity,
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'from-amber-500/20 via-amber-500/10 to-transparent',
    activeGlow: 'border-amber-500 shadow-[0_8px_25px_rgba(245,158,11,0.35)]',
    desc: 'Clamp-on vibration & current sensors',
    log: '[SENSORS] Reading current transformer: 12.4A. Accelerometer vibration: 1.2g. Signal: OK.'
  },
  {
    name: 'Edge ADC Node',
    icon: Cpu,
    iconColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'from-blue-500/20 via-blue-500/10 to-transparent',
    activeGlow: 'border-blue-500 shadow-[0_8px_25px_rgba(59,130,246,0.35)]',
    desc: 'Analog-to-Digital Edge conversion',
    log: '[ADC_EDGE] Converting 4-20mA loop signals. Aggregating telemetry packet. Transmitting via MQTT...'
  },
  {
    name: 'IoT Gateway',
    icon: Wifi,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500/25 via-purple-500/10 to-transparent',
    activeGlow: 'border-purple-500 shadow-[0_8px_25px_rgba(168,85,247,0.35)]',
    desc: 'Unified secure protocol gateway',
    log: '[GATEWAY] MQTT bridge connected. Forwarding legacy telemetry payload to local OPC-UA hub.'
  },
  {
    name: 'OEE Engine',
    icon: Layers,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
    activeGlow: 'border-indigo-500 shadow-[0_8px_25px_rgba(99,102,241,0.35)]',
    desc: 'Power-profile state algorithm',
    log: '[OEE_CALC] State transition: Machine IDLE -> RUNNING based on load signature (threshold > 10A).'
  },
  {
    name: 'Operator HMI',
    icon: Tablet,
    iconColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'from-orange-500/20 via-orange-500/10 to-transparent',
    activeGlow: 'border-orange-500 shadow-[0_8px_25px_rgba(249,115,22,0.35)]',
    desc: 'Manual downtime classification',
    log: '[HMI_INPUT] Operator input: "Material changeover" registered for Downtime event ID #8843.'
  },
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    activeGlow: 'border-emerald-500 shadow-[0_8px_25px_rgba(16,185,129,0.35)]',
    desc: 'Legacy performance tracking',
    log: '[METRICS] OEE: 76.5%. Unplanned downtime: 45m. Setup time: 15m. Dashboard refreshed.'
  },
  {
    name: 'Alerts System',
    icon: Bell,
    iconColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'from-rose-500/20 via-rose-500/10 to-transparent',
    activeGlow: 'border-rose-500 shadow-[0_8px_25px_rgba(244,63,94,0.35)]',
    desc: 'Threshold-based alerts',
    log: '[NOTIFY] Threshold exceeded: Vibration alert on Lathe #04. SMS sent to Maintenance Lead.'
  },
  {
    name: 'Management',
    icon: TrendingUp,
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'from-cyan-500/20 via-cyan-500/10 to-transparent',
    activeGlow: 'border-cyan-500 shadow-[0_8px_25px_rgba(6,182,212,0.35)]',
    desc: 'Retrofit performance & ROI metrics',
    log: '[REPORTS] Capital savings: $85k/machine. Productivity gain: +18.4% since IoT sensor install.'
  }
];

const fabricationSteps = [
  {
    name: 'CAD/CAM Nesting',
    icon: PenTool,
    iconColor: 'text-teal-600 dark:text-teal-400',
    bgColor: 'from-teal-500/20 via-teal-500/10 to-transparent',
    activeGlow: 'border-teal-500 shadow-[0_8px_25px_rgba(20,184,166,0.35)]',
    desc: '3D designs & nested layouts',
    log: '[CAM_NEST] Generated nesting pattern for DXF layout. Material efficiency: 91.2%. Outputting G-Code.'
  },
  {
    name: 'DNC Server',
    icon: Server,
    iconColor: 'text-blue-600 dark:text-blue-400',
    bgColor: 'from-blue-500/20 via-blue-500/10 to-transparent',
    activeGlow: 'border-blue-500 shadow-[0_8px_25px_rgba(59,130,246,0.35)]',
    desc: 'G-Code file push to CNC machine',
    log: '[DNC] Transferring program "WELD_PLATE_A4.nc" to CNC Laser Cutter IP 192.168.10.45... Success.'
  },
  {
    name: 'CNC Processing',
    icon: Flame,
    iconColor: 'text-orange-600 dark:text-orange-400',
    bgColor: 'from-orange-500/20 via-orange-500/10 to-transparent',
    activeGlow: 'border-orange-500 shadow-[0_8px_25px_rgba(249,115,22,0.35)]',
    desc: 'Precision laser & bending execution',
    log: '[CNC_EXEC] Cutter status: RUNNING. N2 gas pressure: 14 bar. Laser power output: 4000W.'
  },
  {
    name: 'Robotic Welding',
    icon: Zap,
    iconColor: 'text-amber-600 dark:text-amber-400',
    bgColor: 'from-amber-500/20 via-amber-500/10 to-transparent',
    activeGlow: 'border-amber-500 shadow-[0_8px_25px_rgba(245,158,11,0.35)]',
    desc: 'Robotic welding & structural assembly',
    log: '[WELD_ROBOT] Welding path active. Shielding gas flow: 15 L/min. Wire feed speed: 8.5 m/min.'
  },
  {
    name: 'Edge Gateway',
    icon: Wifi,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500/25 via-purple-500/10 to-transparent',
    activeGlow: 'border-purple-500 shadow-[0_8px_25px_rgba(168,85,247,0.35)]',
    desc: 'CNC-state signal collection',
    log: '[OPC_UA] Subscribed to controller variables. In-cycle: TRUE. Part count: 142/200. Feed Override: 100%.'
  },
  {
    name: 'MES System',
    icon: ClipboardList,
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'from-indigo-500/20 via-indigo-500/10 to-transparent',
    activeGlow: 'border-indigo-500 shadow-[0_8px_25px_rgba(99,102,241,0.35)]',
    desc: 'Work order & material tracking',
    log: '[MES] Job ID #9094 update: 71% complete. Sheet metal consumption: 14/20 sheets. Scrap rate: 3.1%.'
  },
  {
    name: 'In-line QA',
    icon: Eye,
    iconColor: 'text-rose-600 dark:text-rose-400',
    bgColor: 'from-rose-500/20 via-rose-500/10 to-transparent',
    activeGlow: 'border-rose-500 shadow-[0_8px_25px_rgba(244,63,94,0.35)]',
    desc: 'Real-time seam & cut quality check',
    log: '[VISION_QA] Thermal image profile verified. No porosity detected. Part pass rate: 100%.'
  },
  {
    name: 'Yield Dashboard',
    icon: LayoutDashboard,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'from-emerald-500/20 via-emerald-500/10 to-transparent',
    activeGlow: 'border-emerald-500 shadow-[0_8px_25px_rgba(16,185,129,0.35)]',
    desc: 'Material & yield metrics',
    log: '[STATS] Sheet utilization rate: 91.8%. CNC uptime: 88.4%. Production schedule on-track.'
  },
  {
    name: 'Management',
    icon: TrendingUp,
    iconColor: 'text-purple-600 dark:text-purple-400',
    bgColor: 'from-purple-500/20 via-purple-500/10 to-transparent',
    activeGlow: 'border-purple-500 shadow-[0_8px_25px_rgba(168,85,247,0.35)]',
    desc: 'Supply chain & inventory logistics',
    log: '[ERP] Work order closed. Dispatching shipping request. Decrementing sheet metal inventory by 14.'
  }
];

const workflowThemes = {
  automated: {
    gradientStops: ['#f43f5e', '#3b82f6', '#06b6d4'],
    circleColors: ['#f43f5e', '#3b82f6', '#06b6d4', '#8b5cf6'],
    glowColors: [
      'bg-rose-400 shadow-[0_0_10px_#f43f5e]',
      'bg-blue-400 shadow-[0_0_10px_#3b82f6]',
      'bg-cyan-400 shadow-[0_0_10px_#06b6d4]',
      'bg-cyan-300 shadow-[0_0_10px_#06b6d4]'
    ],
    pillBorder: 'border-blue-400 dark:border-blue-500/40 shadow-[0_4px_15px_rgba(59,130,246,0.15)]',
    pillText: 'Real-time Data Flow'
  },
  conventional: {
    gradientStops: ['#6b7280', '#f59e0b', '#3b82f6'],
    circleColors: ['#6b7280', '#f59e0b', '#3b82f6', '#10b981'],
    glowColors: [
      'bg-gray-400 shadow-[0_0_10px_#6b7280]',
      'bg-amber-400 shadow-[0_0_10px_#f59e0b]',
      'bg-blue-400 shadow-[0_0_10px_#3b82f6]',
      'bg-emerald-400 shadow-[0_0_10px_#10b981]'
    ],
    pillBorder: 'border-amber-400 dark:border-amber-500/40 shadow-[0_4px_15px_rgba(245,158,11,0.15)]',
    pillText: 'Retrofit Sensor telemetry'
  },
  fabrication: {
    gradientStops: ['#14b8a6', '#f97316', '#6366f1'],
    circleColors: ['#14b8a6', '#f97316', '#6366f1', '#ec4899'],
    glowColors: [
      'bg-teal-400 shadow-[0_0_10px_#14b8a6]',
      'bg-orange-400 shadow-[0_0_10px_#f97316]',
      'bg-indigo-400 shadow-[0_0_10px_#6366f1]',
      'bg-pink-400 shadow-[0_0_10px_#ec4899]'
    ],
    pillBorder: 'border-teal-400 dark:border-teal-500/40 shadow-[0_4px_15px_rgba(20,184,166,0.15)]',
    pillText: 'CAD/CAM to Production Stream'
  }
};

const WorkflowSection = () => {
  const [workflowType, setWorkflowType] = useState('automated');
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const steps = workflowType === 'automated'
    ? automatedSteps
    : workflowType === 'conventional'
      ? conventionalSteps
      : fabricationSteps;

  const currentTheme = workflowThemes[workflowType];

  const handleWorkflowChange = (type) => {
    setWorkflowType(type);
    setActiveStep(0);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50/30 via-slate-50 to-white dark:from-[#0d0b21] dark:via-[#0d0b21] dark:to-[#0d0b21] border-y border-purple-100 dark:border-gray-800/50 overflow-hidden relative transition-colors duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-900 dark:text-white">

        <span className="nh-section-subtitle mb-2 block text-rose-600 dark:text-rose-500 font-bold tracking-wider">HOW WE TRANSFORM BUSINESSES</span>
        <h2 className="nh-section-title mb-8 text-slate-900 dark:text-white font-extrabold">Industry 4.0 Workflow</h2>

        {/* Workflow Switcher Tabs */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 bg-purple-500/10 dark:bg-purple-950/30 rounded-full border border-purple-200/50 dark:border-purple-800/30 shadow-[0_4px_20px_rgba(139,92,246,0.05)] relative z-20">
            {[
              { id: 'automated', label: 'Automated' },
              { id: 'conventional', label: 'Conventional' },
              { id: 'fabrication', label: 'Fabrication' }
            ].map((tab) => {
              const isSelected = workflowType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleWorkflowChange(tab.id)}
                  className={`px-6 py-2 rounded-full text-[11px] font-extrabold uppercase tracking-wider transition-all duration-300 relative cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-[0_4px_15px_rgba(139,92,246,0.2)]'
                      : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {/* Active background pill */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-500 dark:to-indigo-500 rounded-full z-[-1]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative w-full mx-auto pb-10">

          {/* Icons and Arrows Row */}
          <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between items-center w-full gap-4 lg:gap-2 relative z-10">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const StepIcon = step.icon;

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
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`flex flex-col items-center group cursor-pointer w-[105px] lg:w-auto relative transition-all duration-300 ${isActive ? 'scale-105' : 'opacity-70 hover:opacity-100'}`}
                  >
                    {/* Floating description tooltip */}
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-slate-900 text-white border border-purple-500/30 text-[10px] px-3 py-2 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-28 text-center z-30 leading-snug">
                      <div className="font-bold text-white mb-0.5">{step.name}</div>
                      <span className="text-gray-300">{step.desc}</span>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 border-r border-b border-purple-500/30 rotate-45" />
                    </div>

                    {/* Icon Card Frame */}
                    <div className={`w-20 h-20 sm:w-24 sm:h-24 mb-3 flex flex-col items-center justify-center rounded-2xl relative border transition-all duration-300 overflow-hidden ${
                      isActive
                        ? `${step.activeGlow} bg-white dark:bg-[#120c38]`
                        : 'border-slate-200/90 dark:border-gray-800/80 bg-white dark:bg-[#0c0828]/60 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:border-purple-400 dark:hover:border-purple-500/40'
                    }`}>
                      {/* Gradient glow backdrop */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.bgColor} transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`} />

                      {/* Crisp Vector Icon with vibrant brand color */}
                      <div className="relative z-10 flex items-center justify-center p-3 rounded-xl bg-slate-50/80 dark:bg-black/30 border border-slate-100 dark:border-white/10 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <StepIcon size={28} className={`${step.iconColor} transition-all duration-300 filter drop-shadow-[0_2px_8px_rgba(168,85,247,0.3)]`} />
                      </div>
                    </div>

                    <span className={`text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-300 ${
                      isActive ? 'text-purple-700 dark:text-purple-400 font-black' : 'text-slate-700 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}>
                      {step.name}
                    </span>
                  </motion.div>

                  {/* Arrow */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
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
                  <stop stopColor={currentTheme.gradientStops[0]} />
                  <stop offset="0.5" stopColor={currentTheme.gradientStops[1]} />
                  <stop offset="1" stopColor={currentTheme.gradientStops[2]} />
                </linearGradient>
              </defs>

              <circle r="4.5" fill={currentTheme.circleColors[0]} filter={`drop-shadow(0 0 3px ${currentTheme.circleColors[0]})`}>
                <animateMotion dur="6s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill={currentTheme.circleColors[1]} filter={`drop-shadow(0 0 3px ${currentTheme.circleColors[1]})`}>
                <animateMotion dur="6s" begin="1.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill={currentTheme.circleColors[2]} filter={`drop-shadow(0 0 3px ${currentTheme.circleColors[2]})`}>
                <animateMotion dur="6s" begin="3s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
              <circle r="4.5" fill={currentTheme.circleColors[3]} filter={`drop-shadow(0 0 3px ${currentTheme.circleColors[3]})`}>
                <animateMotion dur="6s" begin="4.5s" repeatCount="indefinite" path="M 50,0 L 50,30 Q 50,50 70,50 L 930,50 Q 950,50 950,30 L 950,0" />
              </circle>
            </svg>

            {/* Glowing dots on the line */}
            <div className={`absolute bottom-[0px] left-[20%] w-[11px] h-[11px] rounded-full animate-pulse ${currentTheme.glowColors[0]}`}></div>
            <div className={`absolute bottom-[0px] left-[35%] w-[11px] h-[11px] rounded-full animate-pulse ${currentTheme.glowColors[1]}`} style={{ animationDelay: '200ms' }}></div>
            <div className={`absolute bottom-[0px] right-[35%] w-[11px] h-[11px] rounded-full animate-pulse ${currentTheme.glowColors[2]}`} style={{ animationDelay: '400ms' }}></div>
            <div className={`absolute bottom-[0px] right-[20%] w-[11px] h-[11px] rounded-full animate-pulse ${currentTheme.glowColors[3]}`} style={{ animationDelay: '600ms' }}></div>

            {/* Pill in the middle */}
            <div className={`absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 bg-white dark:bg-[#050117] px-6 py-1 border rounded-full flex items-center justify-center pointer-events-auto transition-all duration-300 ${currentTheme.pillBorder}`}>
              <span className="text-[11px] text-slate-800 dark:text-gray-300 font-extrabold tracking-wider uppercase">{currentTheme.pillText}</span>
            </div>

            {/* End Arrows */}
            <ArrowUp size={16} className="absolute top-[-19px] left-[59px]" style={{ color: currentTheme.gradientStops[0] }} />
            <ArrowUp size={16} className="absolute top-[-19px] right-[59px]" style={{ color: currentTheme.gradientStops[2] }} />
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
              <span className="select-none" style={{ color: currentTheme.gradientStops[0] }}>&rarr;</span>
              <span className="text-gray-200">Executing: <span className="text-purple-400">./stream_pipeline_verify --active-node="{steps[activeStep].name.toLowerCase().replace(/\s+/g, '_')}"</span></span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <span className="text-purple-400 select-none">$</span>
              <span className="text-green-400 font-semibold">{steps[activeStep].log}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;
