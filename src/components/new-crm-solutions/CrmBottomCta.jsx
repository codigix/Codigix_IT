import React from 'react';
import { ArrowRight, Calendar, ShieldCheck, Cloud, Clock, RefreshCw, Award } from 'lucide-react';

const CrmBottomCta = () => {
  return (
    <div className="mt-12">
      {/* Banner */}

      {/* Footer Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10 pb-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-purple-400">
            <Award size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">Trusted by 25K+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Businesses Worldwide</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-pink-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">Secure & Compliant</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Enterprise-Grade Security</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-blue-400">
            <Cloud size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">Cloud or On-Premise</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Flexible Deployment</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-fuchsia-400">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">24/7 Support</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Always Here to Help</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-teal-400">
            <RefreshCw size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">Continuous Updates</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Latest Features & Technology</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CrmBottomCta;
