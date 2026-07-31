import React, { useState } from 'react';
import { 
  Bot, Cpu, Globe2, ShieldCheck, Sparkles, ArrowRight, 
  Layers, CheckCircle2, ChevronRight, Zap, Flame 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const roadmapPhases = [
  {
    id: 1,
    quarter: 'Q3 - Q4 2025',
    phaseName: 'Phase 01',
    title: 'Autonomous AI Agents & Enterprise Co-Pilots',
    category: 'AI & Automation',
    icon: Bot,
    status: 'In Active Development',
    statusColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/40',
    summary: 'Deploying domain-specific autonomous AI agents into ERP, CRM, and cloud systems for zero-touch workflow automation.',
    highlights: [
      'Self-healing code & automated API integrations',
      'Conversational natural language SQL queries for ERP financial ledgers',
      'Automated 3-way invoice matching & intelligent approval routing',
      'AI-driven candidate matching & talent pipeline scoring'
    ],
    kpi: '90% Reduction in Manual Tasks'
  },
  {
    id: 2,
    quarter: 'Q1 - Q2 2026',
    phaseName: 'Phase 02',
    title: '5G Edge IIoT & Industry 5.0 Telemetry',
    category: 'Industrial IoT',
    icon: Cpu,
    status: 'Next Horizon',
    statusColor: 'bg-purple-950 text-purple-300 border-purple-500/40',
    summary: 'Building ultra-low-latency 5G edge computing gateways and computer vision quality inspection for smart manufacturing.',
    highlights: [
      'Sub-10ms machine telemetry streaming via MQTT & OPC-UA',
      'Computer vision thermal defect inspection on active shopfloor lines',
      'Predictive vibration AI algorithms for heavy foundry furnaces',
      'Robotic arm PLC synchronization & automated energy audits'
    ],
    kpi: 'Sub-10ms Real-Time Response'
  },
  {
    id: 3,
    quarter: 'Q3 - Q4 2026',
    phaseName: 'Phase 03',
    title: 'Global R&D Innovation Hubs & Expansion',
    category: 'Global Expansion',
    icon: Globe2,
    status: 'Planned Vision',
    statusColor: 'bg-indigo-950 text-indigo-300 border-indigo-500/40',
    summary: 'Establishing dedicated Co-Creation R&D Centers in Dubai, Frankfurt, and Singapore to accelerate global digital delivery.',
    highlights: [
      'Establishing Middle East & European client co-creation labs',
      'Expanding team to 300+ specialized software architects & data scientists',
      'Forming university research partnerships for applied AI & robotics',
      'Launching 24/7 Global Managed Services & Cyber Defense center'
    ],
    kpi: '300+ Expert Professionals'
  },
  {
    id: 4,
    quarter: '2027 & Beyond',
    phaseName: 'Phase 04',
    title: 'Quantum-Resistant Cloud & Zero-Trust Vaults',
    category: 'Cybersecurity',
    icon: ShieldCheck,
    status: 'Future Scope',
    statusColor: 'bg-blue-950 text-blue-300 border-blue-500/40',
    summary: 'Pioneering post-quantum cryptographic security standards and zero-trust cloud architectures for enterprise clients.',
    highlights: [
      'Post-quantum SSL/TLS encryption for sensitive financial ledgers',
      'Zero-trust identity verification across multi-cloud environments',
      'Autonomous threat detection & automated incident response AI',
      'Decentralized data audit trails for cross-border compliance'
    ],
    kpi: 'Post-Quantum Encrypted'
  }
];

const AboutFutureRoadmap = () => {
  const [activePhase, setActivePhase] = useState(roadmapPhases[0]);

  return (
    <div className="py-16 border-t border-gray-800/50 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EE001C]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/85 border border-[#EE001C]/50 text-red-300 text-xs font-bold uppercase tracking-widest mb-4 shadow-md">
          <Sparkles size={14} className="text-[#EE001C]" />
          <span>Strategic Vision & Horizons</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Future Scope & <span className="about-text-gradient">Innovation Roadmap</span>
        </h2>

        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          Our strategic blueprint for pioneering autonomous AI agents, 5G edge IIoT telemetry, global R&D innovation labs, and quantum-safe enterprise security.
        </p>
      </div>

      {/* Interactive Phase Selector Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 relative z-10">
        {roadmapPhases.map((phase) => {
          const isSelected = activePhase.id === phase.id;
          const IconComp = phase.icon;
          return (
            <button
              key={phase.id}
              onClick={() => setActivePhase(phase)}
              className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between group ${
                isSelected 
                  ? 'bg-[#0e0730] border-[#EE001C] shadow-[0_0_25px_rgba(238,0,28,0.25)] scale-[1.02]' 
                  : 'bg-[#060218] border-gray-800 hover:border-[#EE001C]/40 hover:bg-[#090426]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${phase.statusColor}`}>
                    {phase.quarter}
                  </span>
                  <span className="text-xs font-bold text-[#EE001C]">{phase.phaseName}</span>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-gradient-to-r from-[#EE001C] to-[#7e22ce] text-white' : 'bg-purple-950/60 text-[#EE001C]'} border border-[#EE001C]/30 transition-colors`}>
                    <IconComp size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-white leading-snug line-clamp-2">{phase.title}</h4>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-semibold text-purple-300 mt-4 border-t border-purple-900/30 pt-2">
                <span>{phase.category}</span>
                <ChevronRight size={14} className={`transform transition-transform ${isSelected ? 'text-[#EE001C] translate-x-1' : 'text-gray-500'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Active Phase Showcase Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activePhase.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl bg-gradient-to-br from-[#0c062c] via-[#07031c] to-[#030112] border border-[#EE001C]/40 p-8 sm:p-12 shadow-2xl relative z-10"
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Left Phase Overview */}
            <div className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-[#EE001C] uppercase tracking-widest">{activePhase.phaseName} • {activePhase.quarter}</span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${activePhase.statusColor}`}>
                  {activePhase.status}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                {activePhase.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                {activePhase.summary}
              </p>

              <div className="p-4 rounded-xl bg-[#060218] border border-purple-900/30 flex items-center justify-between">
                <span className="text-xs text-gray-400 font-medium">Target Performance KPI:</span>
                <span className="text-sm font-bold text-emerald-400">{activePhase.kpi}</span>
              </div>
            </div>

            {/* Right Strategic Milestones Grid */}
            <div className="lg:w-1/2 w-full">
              <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap size={14} /> Key Strategic Milestones & Deliverables
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activePhase.highlights.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#080424] border border-gray-800/80 hover:border-purple-500/40 transition-colors flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-gray-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default AboutFutureRoadmap;
