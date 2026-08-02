import React from 'react';
import { Mail, Phone, MapPin, Send, Headphones, ShieldCheck, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactHero = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-12 items-center mb-12">
      
      {/* Left: Text Content */}
      <div className="xl:w-1/2 z-10 flex flex-col justify-center text-left">
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-purple-600 dark:text-purple-400 font-extrabold uppercase tracking-widest text-xs mb-3"
        >
          Contact Us
        </motion.h3>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-slate-900 dark:text-white leading-[1.15] mb-6 tracking-tight"
        >
          Let's Build Something<br/>Amazing <span className="contact-text-gradient">Together!</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm md:text-base text-slate-600 dark:text-gray-300 leading-relaxed mb-10 max-w-lg font-normal"
        >
          Have a question, idea, or enterprise project in mind? We're here to help. Reach out to us and our solution team will get back to you shortly.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 rounded-2xl border border-slate-200/90 dark:border-gray-800/80 bg-white dark:bg-[#050112] shadow-sm dark:shadow-xl"
        >
          <div className="flex items-start gap-3">
             <Headphones size={24} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
             <div>
               <h4 className="text-[12px] font-extrabold text-slate-900 dark:text-white mb-0.5">Quick Response</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">We reply within 24 hours</p>
             </div>
          </div>
          <div className="w-[1px] h-10 bg-slate-200 dark:bg-gray-800 hidden sm:block"></div>
          <div className="flex items-start gap-3">
             <ShieldCheck size={24} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
             <div>
               <h4 className="text-[12px] font-extrabold text-slate-900 dark:text-white mb-0.5">Secure & Confidential</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Your information is safe</p>
             </div>
          </div>
          <div className="w-[1px] h-10 bg-slate-200 dark:bg-gray-800 hidden sm:block"></div>
          <div className="flex items-start gap-3">
             <Users size={24} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
             <div>
               <h4 className="text-[12px] font-extrabold text-slate-900 dark:text-white mb-0.5">Expert Support</h4>
               <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Talk to solution experts</p>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Right: Graphic */}
      <div className="xl:w-1/2 relative flex justify-center items-center min-h-[380px] w-full">
         <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
         
         {/* Center Glowing Envelope */}
         <div className="relative z-10 w-64 h-64 rounded-full border-2 border-purple-300 dark:border-purple-500/30 flex items-center justify-center bg-purple-50/50 dark:bg-black/40 backdrop-blur-sm shadow-[0_10px_40px_rgba(139,92,246,0.15)] dark:shadow-[0_0_60px_rgba(168,85,247,0.2)]">
            <div className="w-48 h-48 rounded-full border border-purple-400 dark:border-purple-500/50 flex items-center justify-center">
               <Mail size={80} strokeWidth={1.2} className="text-purple-600 dark:text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </div>
         </div>

         {/* Floating Icons */}
         <div className="absolute top-12 left-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#050112] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center animate-float shadow-md">
           <Phone size={20} className="text-purple-600 dark:text-purple-400" />
         </div>

         <div className="absolute top-8 right-24 z-20 w-14 h-14 rounded-full bg-white dark:bg-[#050112] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center animate-float-delayed shadow-md">
           <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
           </svg>
         </div>

         <div className="absolute bottom-16 left-24 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#050112] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center animate-float-fast shadow-md">
           <Send size={16} className="text-purple-600 dark:text-purple-400" />
         </div>

         <div className="absolute bottom-20 right-16 z-20 w-12 h-12 rounded-full bg-white dark:bg-[#050112] border border-purple-200 dark:border-purple-500/30 flex items-center justify-center animate-float shadow-md">
           <MapPin size={20} className="text-purple-600 dark:text-purple-400" />
         </div>

      </div>

    </div>
  );
};

export default ContactHero;
