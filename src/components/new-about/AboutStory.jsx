import React from 'react';
import { ArrowRight, Flag, Rocket, Cpu, Globe2, Target } from 'lucide-react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: 'July 2023',
    title: 'The Foundation',
    desc: 'Codigix Infotech was launched with a mission to deliver cutting-edge IT solutions.',
    icon: Flag
  },
  {
    year: 'Late 2023',
    title: 'Enterprise Solutions',
    desc: 'Rolled out specialized ERP, CRM, and cloud software engineering practice.',
    icon: Rocket
  },
  {
    year: 'Early 2024',
    title: 'AI & IIoT Practice',
    desc: 'Launched Industrial IoT telemetry and AI predictive analytics platforms.',
    icon: Cpu
  },
  {
    year: 'Late 2024',
    title: 'Global Footprint',
    desc: 'Expanded client base across manufacturing, healthcare, and retail sectors globally.',
    icon: Globe2
  },
  {
    year: '2025+',
    title: 'Future Scaling',
    desc: 'Continuous innovation in AI automation and next-gen enterprise technologies.',
    icon: Target
  }
];

const AboutStory = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 py-12 items-center">
      
      {/* Left: Text */}
      <div className="lg:w-1/3">
        <h3 className="text-[#EE001C] font-bold uppercase tracking-widest text-[11px] mb-4">
          Our Story
        </h3>
        <h2 className="text-3xl font-bold text-white leading-tight mb-6">
          A Journey of Passion,<br/>
          Purpose & Progress
        </h2>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-6">
          Founded in July 2023 with a vision to bridge the gap between complex business challenges and technology, Codigix has rapidly grown into a trusted partner for organizations across industries.
        </p>
        <p className="text-[12px] text-gray-400 leading-relaxed mb-8">
          From a visionary team of tech innovators to a full-fledged digital solutions provider, our journey is built on trust, innovation, and a relentless commitment to excellence.
        </p>
        
        <button className="px-5 py-2.5 bg-transparent border border-[#EE001C]/40 hover:border-[#EE001C] hover:bg-[#EE001C]/10 text-white text-[12px] font-medium rounded-lg transition-all flex items-center gap-2">
          Know More About Us <ArrowRight size={14} />
        </button>
      </div>

      {/* Right: Timeline */}
      <div className="lg:w-2/3 relative w-full pt-8 pb-4 overflow-x-auto hide-scrollbar">
        
        {/* Dashed Line Background */}
        <div className="absolute top-[45px] left-8 right-8 h-[1px] border-t-2 border-dashed border-gray-700 z-0 hidden sm:block"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 sm:gap-4 relative z-10 min-w-[600px] px-4">
          {timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center w-32 group"
            >
              {/* Icon Circle */}
              <div className="w-14 h-14 rounded-full bg-[#050112] border border-gray-700 flex items-center justify-center mb-6 relative group-hover:border-[#EE001C] group-hover:shadow-[0_0_20px_rgba(238,0,28,0.3)] transition-all z-10 timeline-dot">
                <item.icon size={20} className="text-[#7e22ce] group-hover:text-[#EE001C] transition-colors" />
                
                {/* Mobile Dashed Line */}
                {idx < timeline.length - 1 && (
                  <div className="absolute top-[55px] left-1/2 -translate-x-1/2 h-8 border-l-2 border-dashed border-gray-700 z-0 sm:hidden"></div>
                )}
              </div>
              
              <div className="text-[#EE001C] font-bold text-[12px] mb-2 whitespace-nowrap">{item.year}</div>
              <h4 className="text-white font-bold text-[12px] mb-2 leading-tight">{item.title}</h4>
              <p className="text-[10px] text-gray-500 leading-snug">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AboutStory;
