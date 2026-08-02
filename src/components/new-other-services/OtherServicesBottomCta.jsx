import React from 'react';
import { ArrowRight, Calendar, CheckSquare, Users, Building, Smile, Clock } from 'lucide-react';

const OtherServicesBottomCta = () => {
  return (
    <div className="mt-12">
      {/* Banner */}


      {/* Footer Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10 pb-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-purple-400">
            <CheckSquare size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">150+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Successful Projects</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-pink-400">
            <Users size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">50+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Happy Clients</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-blue-400">
            <Building size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">10+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Industries Served</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-fuchsia-400">
            <Smile size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">99.9%</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Client Satisfaction</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-teal-400">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-slate-900 dark:text-white">24/7</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500 uppercase tracking-wide">Support Available</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OtherServicesBottomCta;
