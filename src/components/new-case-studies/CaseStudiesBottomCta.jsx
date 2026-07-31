import React from 'react';
import { ArrowRight, Calendar, Settings, Cpu, ShieldCheck, Clock, CheckCircle2, Headphones, Rocket } from 'lucide-react';

const CaseStudiesBottomCta = () => {
  return (
    <div className="mt-12 pb-12">
      {/* Banner */}


      {/* Footer Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-8 border-t border-gray-800/50">
        <div className="flex items-start gap-3">
          <Settings size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">Industry Expertise</h4>
            <p className="text-[9px] text-gray-500">Deep domain knowledge</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Cpu size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">Customized Solutions</h4>
            <p className="text-[9px] text-gray-500">Tailored for your needs</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Rocket size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">Latest Technologies</h4>
            <p className="text-[9px] text-gray-500">Future-ready approach</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">On-Time Delivery</h4>
            <p className="text-[9px] text-gray-500">Agile & efficient</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CheckCircle2 size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">Quality Assurance</h4>
            <p className="text-[9px] text-gray-500">Tested & proven solutions</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Headphones size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-gray-300">Long-Term Support</h4>
            <p className="text-[9px] text-gray-500">We're with you always</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CaseStudiesBottomCta;
