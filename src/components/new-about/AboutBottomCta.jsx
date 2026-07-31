import React from 'react';
import { ArrowRight, Calendar, Users, Rocket, ShieldCheck, Smile, Clock } from 'lucide-react';

const AboutBottomCta = () => {
  return (
    <div className="mt-12 pb-12">
      {/* Banner */}

      {/* Footer Stats Row */}
      <div className="flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-between gap-6 pt-8 border-t border-gray-800/50">

        <div className="flex items-center gap-3">
          <Users size={20} className="text-[#EE001C] opacity-80 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-white mb-0.5">150+</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Team Members</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Rocket size={20} className="text-[#EE001C] opacity-80 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-white mb-0.5">250+</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Projects Delivered</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck size={20} className="text-[#EE001C] opacity-80 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-white mb-0.5">98.5%</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Client Retention</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Smile size={20} className="text-[#EE001C] opacity-80 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-white mb-0.5">500+</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Happy Clients</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock size={20} className="text-[#EE001C] opacity-80 shrink-0" />
          <div>
            <h4 className="text-[13px] font-bold text-white mb-0.5">24/7</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest">Support Available</p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AboutBottomCta;
