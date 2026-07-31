import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Play, MonitorPlay, FolderGit, Building2, Globe2, Activity,
  Cpu, Code, Layers, Bot
} from 'lucide-react';

const stats = [
  { value: '50+', label: 'Projects Delivered', icon: FolderGit, color: 'text-rose-500' },
  { value: '20+', label: 'Enterprise Clients', icon: Building2, color: 'text-purple-500' },
  { value: '10+', label: 'Industries Served', icon: Globe2, color: 'text-blue-500' },
  { value: '99.9%', label: 'System Uptime', icon: Activity, color: 'text-cyan-500' }
];

const HeroSection = () => {
  return (
    <section className="relative pt-28 pb-20 lg:pt-32 lg:pb-24 overflow-hidden px-4 sm:px-6 lg:px-12 mx-auto bg-[#050117]">

      {/* Cyber Grid background layer */}
      <div className="absolute inset-0 nh-cyber-grid opacity-[0.15] z-0 pointer-events-none" />

      {/* Full Background Image */}
      <div
        className="absolute inset-1 bg-contain bg-center bg-no-repeat z-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('/assets/images/new-home/hero-bg.png')" }}
      />
      {/* Gradient Overlay to ensure text readability on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#050117] via-[#050117]/85 to-transparent z-0 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5a419d]/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Left side floating code symbols */}
      <div className="absolute left-8 top-1/3 text-gray-500/10 text-xs animate-float select-none hidden md:block font-mono">
        const ai = new CognitiveEngine();
      </div>
      <div className="absolute left-24 bottom-1/4 text-gray-500/15 text-[10px] animate-float-reverse select-none hidden md:block font-mono">
        while(true) {'{'} optimize(); {'}'}
      </div>

      <div className="mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6"
            >
              <div className="inline-flex items-center text-xs md:text-sm text-rose-500 font-semibold tracking-widest uppercase mb-2 gap-2">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
                AI + IoT + Custom Software Experts
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-white">AI-Powered Software.<br />IoT-Driven Automation.<br /></span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-600">Enterprise Transformation.</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed">
                We build intelligent ERP, CRM, AI Automation systems, custom IoT platforms, and enterprise software that streamline operations and accelerate growth.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="nh-btn-primary text-xs flex justify-center items-center shadow-[0_0_20px_rgba(220,38,38,0.25)] hover:shadow-[0_0_30px_rgba(220,38,38,0.45)]"
                >
                  Schedule Free Consultation <ArrowRight size={15} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 bg-transparent border border-gray-700 hover:border-gray-500 hover:bg-white/5 text-white rounded-md font-medium flex items-center justify-center gap-2 transition-all text-xs"
                >
                  <MonitorPlay size={16} className="text-purple-400" /> Book Live Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-2 text-gray-300 hover:text-white font-medium flex items-center justify-center gap-3 transition-colors text-xs"
                >
                  <div className="w-10 h-10 rounded-full border border-rose-500/40 hover:border-rose-500 flex items-center justify-center bg-[#0a0620] transition-colors">
                    <Play size={12} className="text-rose-500 ml-0.5" fill="currentColor" />
                  </div>
                  Watch Success Story
                </motion.button>
              </div>
            </motion.div>

            {/* Metrics block */}
            <div className="mx-auto mt-14 w-full flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-gray-800/60 relative z-10">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className="w-12 h-12 relative flex items-center justify-center shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl blur-sm group-hover:scale-115 transition-transform duration-300"></div>
                      <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border border-gray-800 bg-[#0a0620] group-hover:border-purple-500/30 transition-all duration-300">
                        <IconComponent className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none group-hover:text-purple-300 transition-colors duration-300">{stat.value}</div>
                      <div className="text-[9px] md:text-[10px] text-gray-400 font-bold tracking-widest mt-1 uppercase">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Interactive AI Neural Core Dashboard */}
          <div className="hidden lg:flex relative w-full h-[550px] items-center justify-center overflow-visible">
            
            {/* Ambient Background Glows */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-purple-600/10 to-rose-600/10 rounded-full blur-[100px] pointer-events-none" />
            
            {/* Outer Circular Tracks */}
            <div className="absolute w-[360px] h-[360px] border border-dashed border-purple-500/10 rounded-full animate-spin-slow" />
            <div className="absolute w-[280px] h-[280px] border border-dashed border-rose-500/10 rounded-full animate-spin-slow-reverse" />
            
            {/* Central Glowing AI Core */}
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-600/20 rounded-full animate-pulse-glow" />
              <div className="absolute w-36 h-36 bg-[#0a0620] border border-purple-500/30 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(139,92,246,0.25)]">
                <div className="relative flex flex-col items-center justify-center">
                  <Cpu className="w-10 h-10 text-rose-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-gray-300 mt-2 tracking-widest uppercase">COGNITIVE CORE</span>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="nh-led-active"></span>
                    <span className="text-[8px] font-bold text-green-400 uppercase tracking-widest">ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Tech Badges */}
            {/* Card 1: NLP Agent */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-0 bg-[#0a0620]/90 backdrop-blur-md border border-gray-800 hover:border-rose-500/30 rounded-xl p-3 shadow-xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">NLP Pipeline</div>
                <div className="text-xs font-semibold text-white truncate">Conversational AI</div>
                <div className="text-[9px] text-green-400 flex items-center gap-1 font-medium mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Accuracy: 99.4%
                </div>
              </div>
            </motion.div>

            {/* Card 2: IoT Stream */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 right-4 bg-[#0a0620]/90 backdrop-blur-md border border-gray-800 hover:border-blue-500/30 rounded-xl p-3 shadow-xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">IoT Telemetry</div>
                <div className="text-xs font-semibold text-white truncate">Gateway Stream</div>
                <div className="text-[9px] text-blue-400 font-semibold mt-0.5">
                  Latency: 4.8ms
                </div>
              </div>
            </motion.div>

            {/* Card 3: Cloud Models */}
            <motion.div 
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-24 right-0 bg-[#0a0620]/90 backdrop-blur-md border border-gray-800 hover:border-purple-500/30 rounded-xl p-3 shadow-xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <Layers className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Model Tuning</div>
                <div className="text-xs font-semibold text-white truncate">Loss Rate: 0.012</div>
                <div className="text-[9px] text-purple-400 font-semibold mt-0.5">
                  Epochs: 150/150
                </div>
              </div>
            </motion.div>

            {/* Card 4: Code Engine */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-20 left-4 bg-[#0a0620]/90 backdrop-blur-md border border-gray-800 hover:border-cyan-500/30 rounded-xl p-3 shadow-xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                <Code className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">AI Code Gen</div>
                <div className="text-xs font-semibold text-white truncate">Auto-Refactoring</div>
                <div className="text-[9px] text-cyan-400 font-semibold mt-0.5">
                  Pipelines Active: 8
                </div>
              </div>
            </motion.div>

            {/* Small floating particles in background */}
            <div className="absolute top-1/4 left-1/3 text-purple-500/20 text-xs animate-pulse animate-float select-none">01</div>
            <div className="absolute bottom-1/3 right-1/4 text-rose-500/15 text-[10px] animate-pulse animate-float-reverse select-none">10</div>
            <div className="absolute top-1/2 right-12 text-cyan-500/20 text-sm animate-pulse animate-float select-none">&lt;/&gt;</div>
            <div className="absolute bottom-1/4 left-12 text-purple-500/15 text-xs animate-pulse animate-float-reverse select-none">+</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

