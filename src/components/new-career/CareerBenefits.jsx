import React from 'react';
import { TrendingUp, BookOpen, Users, Gift, Home, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: TrendingUp,
    title: "Career Growth",
    desc: "Clear career paths, promotions and leadership opportunities."
  },
  {
    icon: BookOpen,
    title: "Learning & Development",
    desc: "Training, certifications, and workshops to help you stay ahead."
  },
  {
    icon: Users,
    title: "Great Culture",
    desc: "Open communication, collaboration, and a culture of respect."
  },
  {
    icon: Gift,
    title: "Competitive Benefits",
    desc: "Health insurance, paid time off, and performance rewards."
  },
  {
    icon: Home,
    title: "Work Flexibility",
    desc: "Flexible working hours and hybrid/remote work options."
  },
  {
    icon: Smile,
    title: "Fun & Engagement",
    desc: "Team outings, celebrations and engaging workplace activities."
  }
];

const CareerBenefits = () => {
  return (
    <div className="py-8 border-t border-gray-800/50 mt-4 mb-8">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-white">Why Build Your Career With Us</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {benefits.map((benefit, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#050112] border border-gray-800/80 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl hover:border-purple-500/30 transition-colors group"
          >
            <benefit.icon size={32} strokeWidth={1.5} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
            <h4 className="text-[13px] font-bold text-white mb-2">{benefit.title}</h4>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              {benefit.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerBenefits;
