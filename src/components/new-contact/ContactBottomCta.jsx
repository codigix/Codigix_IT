import React from 'react';
import { ArrowRight, PhoneCall } from 'lucide-react';

const ContactBottomCta = () => {
  return (
    <div className="mt-8 pb-12">
      {/* Banner */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#110930] border border-purple-900/40 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between shadow-[0_10px_40px_rgba(0,0,0,0.5)]">

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute left-1/4 top-0 w-1/2 h-full bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 lg:w-3/5 text-center md:text-left mb-8 md:mb-0">
          <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide mb-3 leading-snug">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-400 text-[13px]">
            Let's turn your ideas into powerful digital solutions.
          </p>
        </div>

        <div className="relative z-10 lg:w-2/5 flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 pr-0 lg:pr-8">
          <button className="px-6 py-3 bg-[#7e22ce] hover:bg-[#9333ea] text-white text-[12px] font-medium rounded-md shadow-[0_0_20px_rgba(126,34,206,0.4)] transition-all flex items-center gap-2 whitespace-nowrap">
            Get Free Consultation <ArrowRight size={14} />
          </button>
          <button className="px-6 py-3 bg-transparent border border-gray-600 hover:border-gray-400 text-white text-[12px] font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap">
            Call Us Now <PhoneCall size={14} />
          </button>
        </div>

        {/* Graphic Side */}
        <div className="absolute right-0 bottom-0 z-10 hidden lg:block opacity-80 mix-blend-screen pointer-events-none">
          <img
            src="/assets/images/service/ai_brain.png"
            alt="Start Project"
            className="h-32 object-contain filter contrast-125 hue-rotate-[240deg]"
            style={{ transform: 'translateX(20%)' }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactBottomCta;
