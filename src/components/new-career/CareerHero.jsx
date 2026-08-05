import React, { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Sparkles, Users, Globe, ShieldCheck, Rocket, Award, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const openRoles = [
  { title: 'AI Research Engineer', applicants: 18, status: 'Interview Stage', code: 'role_ai_res' },
  { title: 'Senior IoT Architect', applicants: 12, status: 'Technical Review', code: 'role_iot_arch' },
  { title: 'Full Stack Dev (React/Go)', applicants: 34, status: 'Resume Screening', code: 'role_fs_dev' }
];

const recruiterLogs = [
  '[BOT] Resume matching index: 94.2%. Passing to human review.',
  '[HR] Interview invitation dispatched for candidate #204.',
  '[RECRUITER] Reviewing GitHub portfolio submission... Status: Strong Pass.',
  '[BOT] Auto-generated codegix_challenge_react.git environment created.'
];

const CareerHero = ({ onApply }) => {
  const [logIdx, setLogIdx] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogIdx(i => (i + 1) % recruiterLogs.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-col xl:flex-row gap-8 mb-12 h-full items-center">
        
        {/* Text Content */}
        <div className="xl:w-1/2 z-10 flex flex-col justify-center text-left">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[#EE001C] font-bold uppercase tracking-widest text-[11px] mb-4"
          >
            Careers
          </motion.h3>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[44px] font-bold text-slate-900 dark:text-white leading-[1.15] mb-6"
          >
            Build the Future.<br/>
            Grow With <span className="career-text-gradient">Codigix.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[13px] text-slate-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md"
          >
            At Codigix, we believe great people build great solutions. Join our team of innovators, problem solvers, and dreamers who are transforming businesses through technology.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button 
              onClick={() => onApply && onApply()}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#EE001C] to-[#7e22ce] hover:from-[#d30018] hover:to-[#6b1fb0] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              View Open Positions <ArrowRight size={14} />
            </button>
            <button 
              onClick={() => setIsVideoOpen(true)}
              className="w-full sm:w-auto px-6 py-3 bg-transparent border border-slate-350 dark:border-gray-700 hover:border-purple-500 text-slate-800 dark:text-white text-[12px] font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-500/10 group"
            >
              <span>Life at Codigix</span>
              <PlayCircle size={15} className="text-[#EE001C] group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Interactive AI Hiring & Application Stream Widget */}
        <div className="xl:w-1/2 relative w-full border border-slate-200 dark:border-gray-800 bg-white dark:bg-[#07041a] rounded-2xl overflow-hidden shadow-sm dark:shadow-2xl p-6 flex flex-col justify-between min-h-[350px] font-mono text-[10px] text-left">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
              <span className="text-slate-400 dark:text-gray-400 font-bold uppercase tracking-wider">hiring_console_rx</span>
            </div>
            <span className="text-[8px] text-slate-500 dark:text-gray-500">active_vacancies: 3</span>
          </div>

          {/* Roles Grid */}
          <div className="space-y-2.5 my-4">
            <div className="text-slate-450 dark:text-gray-500 text-[8px] uppercase tracking-wider">// Current Open Positions</div>
            {openRoles.map((role, i) => (
              <div key={i} className="flex justify-between items-center bg-slate-50 dark:bg-[#050117] border border-slate-200 dark:border-gray-800/80 p-2.5 rounded-xl">
                <div>
                  <span className="text-slate-900 dark:text-white font-bold block">{role.title}</span>
                  <span className="text-[8px] text-slate-500 dark:text-gray-500">{role.code}</span>
                </div>
                <div className="text-right">
                  <span className="text-purple-600 dark:text-purple-400 font-bold block">{role.applicants} applicants</span>
                  <span className="text-[8px] text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">{role.status}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Telemetry Stream */}
          <div className="border-t border-slate-200 dark:border-gray-800/80 pt-3">
            <div className="flex items-center justify-between text-[8px] text-slate-400 dark:text-gray-500 mb-1">
              <span>LIVE_RECRUITMENT_STREAM</span>
              <span className="text-rose-500 font-bold">STREAMING</span>
            </div>
            <div className="bg-slate-50 dark:bg-[#050117] p-2 rounded-lg text-rose-500 font-bold truncate">
              {recruiterLogs[logIdx]}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setIsVideoOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-purple-500/40"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-black/70 hover:bg-rose-600 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close Video"
              >
                <X size={20} />
              </button>

              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&rel=0"
                title="Life at Codigix - Team & Workplace Culture"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerHero;
