import React from 'react';
import { ArrowRight, MonitorSmartphone, Factory, ShieldCheck, Clock, ThumbsUp, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IotBottomCta = ({ activeTab }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-12">
      {/* Banner */}


      {/* Footer Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pb-8 border-t border-slate-200 dark:border-gray-800/50 pt-8">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-rose-500">
            <MonitorSmartphone size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">150+</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide">Connected Devices</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-rose-500">
            <Factory size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">50+</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide">Factories Powered</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-rose-500">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">99.9%</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide">System Uptime</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-rose-500">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">24/7</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide">Live Monitoring</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <div className="text-rose-500">
            <ThumbsUp size={20} />
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-900 dark:text-white">100%</h4>
            <p className="text-[9px] text-gray-500 uppercase tracking-wide">Customer Satisfaction</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IotBottomCta;
