import React from 'react';
import { ArrowRight, Linkedin, Mail, Twitter, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const team = [
  {
    name: "Ashwini Khedekar",
    role: "Founder & CEO",
    roleColor: "text-purple-400",
    desc: "Visionary leader with 10+ years of experience in delivering technology solutions that transform businesses.",
    image: "https://i.pravatar.cc/300?img=47"
  },
  {
    name: "Sushant Khedekar",
    role: "COO",
    roleColor: "text-purple-400",
    desc: "Operations strategist focused on building strong processes, teams, and client relationships.",
    image: "https://i.pravatar.cc/300?img=11"
  },
  {
    name: "Pratik Kamble",
    role: "CTO",
    roleColor: "text-purple-400",
    desc: "Technology enthusiast leading innovation, architecture, and the delivery of scalable solutions.",
    image: "https://i.pravatar.cc/300?img=12"
  },
  {
    name: "Pooja Jadhav",
    role: "Head - Delivery",
    roleColor: "text-purple-400",
    desc: "Delivery expert ensuring quality execution, on-time delivery, and exceptional client satisfaction.",
    image: "https://i.pravatar.cc/300?img=44"
  }
];

const AboutLeadership = () => {
  return (
    <div className="py-12 relative mb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4 text-left">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white relative">
          Meet Our Leadership
          <div className="absolute -bottom-2 left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0 w-12 h-1 bg-purple-500 rounded-full"></div>
        </h2>
        <div className="text-purple-650 dark:text-purple-400 text-[12px] font-medium flex items-center gap-1 cursor-pointer hover:text-purple-500 transition-colors">
          View All Team <ArrowRight size={14} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button className="w-10 h-10 rounded-full bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-purple-500 transition-colors shrink-0 shadow-sm hidden sm:flex">
          <ChevronLeft size={20} />
        </button>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex-1">
          {team.map((member, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl group hover:border-purple-500/50 transition-all text-left"
            >
              <div className="h-48 overflow-hidden bg-slate-100 dark:bg-gray-900 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#050112] to-transparent z-10"></div>
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                />
              </div>
              
              <div className="p-6 relative z-20 -mt-8 bg-white dark:bg-transparent">
                <h3 className="text-[16px] font-bold text-slate-900 dark:text-white mb-1">{member.name}</h3>
                <p className="text-[12px] font-medium text-purple-655 dark:text-purple-400 mb-4">{member.role}</p>
                <p className="text-[11px] text-slate-550 dark:text-gray-400 leading-relaxed mb-6 h-16">
                  {member.desc}
                </p>
                
                <div className="flex items-center gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-800/50 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-white hover:bg-purple-600 transition-colors">
                    <Linkedin size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-800/50 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-white hover:bg-purple-600 transition-colors">
                    <Mail size={14} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-gray-800/50 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-white hover:bg-purple-600 transition-colors">
                    <Twitter size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Arrow */}
        <button className="w-10 h-10 rounded-full bg-[#050112] border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-purple-500 transition-colors shrink-0 shadow-lg hidden sm:flex">
          <ChevronRight size={20} />
        </button>
      </div>

    </div>
  );
};

export default AboutLeadership;
