import React from 'react';
import { Settings, BookOpen, Users, Clock, Target } from 'lucide-react';

const reasons = [
  {
    icon: Settings,
    title: "Innovative Work",
    desc: "Work on cutting-edge technologies and real-world challenges"
  },
  {
    icon: BookOpen,
    title: "Growth & Learning",
    desc: "Continuous learning with mentorship and career advancement"
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    desc: "Work with passionate, supportive and diverse teams"
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    desc: "Flexible policies and a people-first work environment"
  },
  {
    icon: Target,
    title: "Make an Impact",
    desc: "Your work directly contributes to client success"
  }
];

const CareerSidebar = () => {
  return (
    <div className="w-full">
      <div className="bg-transparent border border-gray-800/80 rounded-2xl py-6 px-4 shadow-xl">
        <h3 className="text-[12px] font-bold text-white uppercase tracking-widest mb-6 px-2">Why Join Us?</h3>
        
        <div className="flex flex-col gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-4 px-2 group">
              <div className="w-10 h-10 rounded-xl bg-purple-900/20 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:bg-purple-900/40 group-hover:border-purple-500/50 transition-colors">
                <reason.icon size={18} className="text-purple-400" />
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{reason.title}</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerSidebar;
