import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Play, MonitorPlay, FolderGit, Building2, Globe2, Activity,
  Cpu, Code, Layers, Bot, X
} from 'lucide-react';

const stats = [
  { value: '10+', label: 'Projects Delivered', icon: FolderGit, color: 'text-rose-500' },
  { value: '10+', label: 'Enterprise Clients', icon: Building2, color: 'text-purple-500' },
  { value: '5+', label: 'Industries Served', icon: Globe2, color: 'text-blue-500' },
  { value: '97%', label: 'System Uptime', icon: Activity, color: 'text-cyan-500' }
];

const HeroSection = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-12 mx-auto bg-gradient-to-b from-purple-50/60 via-slate-50 to-white dark:from-[#07041a] dark:via-[#07041a] dark:to-[#07041a] transition-colors duration-300">

      {/* Cyber Grid background layer */}
      <div className="absolute inset-0 nh-cyber-grid opacity-[0.25] dark:opacity-[0.18] z-0 pointer-events-none" />

      {/* Full Background Image */}
      <div
        className="absolute inset-1 bg-cover w-full h-full bg-center bg-no-repeat z-0 pointer-events-none opacity-10 dark:opacity-40 mix-blend-multiply dark:mix-blend-screen transition-all duration-300"
        style={{ backgroundImage: "url('/assets/images/new-home/hero-bg.png')" }}
      />
      {/* Gradient Overlay to ensure text readability on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-slate-50/80 to-transparent dark:from-[#07041a] dark:via-[#07041a]/90 dark:to-transparent z-0 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-400/20 dark:bg-[#7e22ce]/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-rose-400/15 dark:bg-rose-600/15 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Left side floating code symbols */}
      <div className="absolute left-8 top-1/3 text-purple-900/20 dark:text-purple-300/20 text-xs animate-float select-none hidden md:block font-mono">
        const ai = new CognitiveEngine();
      </div>
      <div className="absolute left-24 bottom-1/4 text-rose-900/20 dark:text-rose-300/20 text-[10px] animate-float-reverse select-none hidden md:block font-mono">
        while(true) {'{'} optimize(); {'}'}
      </div>

      <div className="mx-auto w-full relative z-10 pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col space-y-6 text-left"
            >
              <div className="inline-flex items-center text-xs md:text-sm text-rose-600 dark:text-rose-400 font-bold tracking-widest uppercase mb-2 gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_#f43f5e]"></span>
                AI + IoT + Custom Software Experts
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
                <span className="text-slate-900 dark:text-white">AI-Powered Software. IoT-Driven Automation. </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-fuchsia-600 to-purple-600 dark:from-rose-400 dark:via-fuchsia-400 dark:to-purple-400">Enterprise Transformation.</span>
              </h1>
              <p className="text-slate-600 dark:text-gray-300 text-base md:text-md max-w-xl leading-relaxed font-normal">
                We build intelligent ERP, CRM, AI Automation systems, custom IoT platforms, and enterprise software that streamline operations and accelerate growth.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="nh-btn-primary text-xs flex justify-center items-center shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_30px_rgba(220,38,38,0.55)]"
                >
                  Schedule Free Consultation <ArrowRight size={15} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-5 py-3 bg-white dark:bg-[#0c0828] border border-purple-200 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-500/60 hover:bg-purple-50/50 dark:hover:bg-[#150d40] text-slate-800 dark:text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all text-xs shadow-sm"
                >
                  <MonitorPlay size={16} className="text-purple-600 dark:text-purple-400" /> Book Live Demo
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsVideoModalOpen(true)}
                  className="p-2 text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white font-medium flex items-center justify-center gap-3 transition-colors text-xs"
                >
                  <div className="w-10 h-10 rounded-full border border-rose-500/40 hover:border-rose-500 flex items-center justify-center bg-white dark:bg-[#0c0828] shadow-sm transition-colors">
                    <Play size={12} className="text-rose-600 dark:text-rose-400 ml-0.5" fill="currentColor" />
                  </div>
                  Watch Success Story
                </motion.button>
              </div>
            </motion.div>

            {/* Metrics block */}
            <div className="mx-auto mt-5 w-full flex flex-wrap items-center justify-between gap-6 pt-8 border-t border-purple-200/70 dark:border-purple-900/50 relative z-10">
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
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:scale-115 transition-transform duration-300"></div>
                      <div className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-[#0c0828] shadow-sm group-hover:border-purple-400 transition-all duration-300">
                        <IconComponent className={`w-5 h-5 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                    <div>
                      <div className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">{stat.value}</div>
                      <div className="text-[9px] md:text-[10px] text-slate-500 dark:text-gray-400 font-bold tracking-widest mt-1 uppercase">{stat.label}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Interactive AI Neural Core Dashboard */}
          <div className="hidden lg:flex relative w-full h-[550px] items-center justify-center overflow-visible">

            {/* Ambient Background Glows */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/20 to-rose-500/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Outer Circular Tracks */}
            <div className="absolute w-[360px] h-[360px] border border-dashed border-purple-500/30 dark:border-purple-500/20 rounded-full animate-spin-slow" />
            <div className="absolute w-[280px] h-[280px] border border-dashed border-rose-500/30 dark:border-rose-500/20 rounded-full animate-spin-slow-reverse" />

            {/* Central Glowing AI Core */}
            <div className="relative w-44 h-44 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-purple-600/20 rounded-full animate-pulse-glow" />
              <div className="absolute w-36 h-36 bg-white dark:bg-[#0c0828] border border-purple-300 dark:border-purple-500/40 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(139,92,246,0.2)] dark:shadow-[inset_0_0_20px_rgba(139,92,246,0.3)]">
                <div className="relative flex flex-col items-center justify-center">
                  <Cpu className="w-10 h-10 text-rose-600 dark:text-rose-500 animate-pulse" />
                  <span className="text-[9px] font-extrabold text-slate-800 dark:text-gray-200 mt-2 tracking-widest uppercase">COGNITIVE CORE</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="nh-led-active"></span>
                    <span className="text-[8px] font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">ONLINE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orbiting Tech Badges */}
            {/* Card 1: NLP Agent */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 left-0 bg-white/95 dark:bg-[#0c0828]/95 backdrop-blur-md border border-purple-200 dark:border-purple-900/60 hover:border-rose-400 dark:hover:border-rose-500/50 rounded-xl p-3 shadow-md dark:shadow-2xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">NLP Pipeline</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">Conversational AI</div>
                <div className="text-[9px] text-green-600 dark:text-green-400 flex items-center gap-1 font-bold mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Accuracy: 99.4%
                </div>
              </div>
            </motion.div>

            {/* Card 2: IoT Stream */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 right-4 bg-white/95 dark:bg-[#0c0828]/95 backdrop-blur-md border border-purple-200 dark:border-purple-900/60 hover:border-blue-400 dark:hover:border-blue-500/50 rounded-xl p-3 shadow-md dark:shadow-2xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">IoT Telemetry</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">Gateway Stream</div>
                <div className="text-[9px] text-blue-600 dark:text-blue-400 font-bold mt-0.5">
                  Latency: 4.8ms
                </div>
              </div>
            </motion.div>

            {/* Card 3: Cloud Models */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-24 right-0 bg-white/95 dark:bg-[#0c0828]/95 backdrop-blur-md border border-purple-200 dark:border-purple-900/60 hover:border-purple-400 dark:hover:border-purple-500/50 rounded-xl p-3 shadow-md dark:shadow-2xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                <Layers className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">Model Tuning</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">Loss Rate: 0.012</div>
                <div className="text-[9px] text-purple-600 dark:text-purple-400 font-bold mt-0.5">
                  Epochs: 150/150
                </div>
              </div>
            </motion.div>

            {/* Card 4: Code Engine */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-20 left-4 bg-white/95 dark:bg-[#0c0828]/95 backdrop-blur-md border border-purple-200 dark:border-purple-900/60 hover:border-cyan-400 dark:hover:border-cyan-500/50 rounded-xl p-3 shadow-md dark:shadow-2xl flex items-center gap-3 w-48 transition-colors group cursor-pointer z-10 text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 shrink-0">
                <Code className="w-4 h-4 group-hover:rotate-6 transition-transform" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">AI Code Gen</div>
                <div className="text-xs font-extrabold text-slate-900 dark:text-white truncate">Auto-Refactoring</div>
                <div className="text-[9px] text-cyan-600 dark:text-cyan-400 font-bold mt-0.5">
                  Pipelines Active: 8
                </div>
              </div>
            </motion.div>

            {/* Small floating particles in background */}
            <div className="absolute top-1/4 left-1/3 text-purple-500/40 dark:text-purple-400/30 text-xs animate-pulse animate-float select-none">01</div>
            <div className="absolute bottom-1/3 right-1/4 text-rose-500/35 dark:text-rose-400/30 text-[10px] animate-pulse animate-float-reverse select-none">10</div>
            <div className="absolute top-1/2 right-12 text-cyan-500/40 dark:text-cyan-400/30 text-sm animate-pulse animate-float select-none">&lt;/&gt;</div>
            <div className="absolute bottom-1/4 left-12 text-purple-500/35 dark:text-purple-400/30 text-xs animate-pulse animate-float-reverse select-none">+</div>
          </div>
        </div>
      </div>
      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1"
                title="Success Story Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
