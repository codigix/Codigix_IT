import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckSquare, Users, Building, Smile, Clock } from 'lucide-react';

const IndustriesBottomCta = ({ activeIndustry = 'Manufacturing' }) => {
  return (
    <div className="mt-12 text-left">
      {/* Banner */}
      <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-purple-700 via-purple-800 to-indigo-800 dark:from-purple-950/80 dark:via-[#09042a] dark:to-indigo-950/80 border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
        <div className="space-y-2 z-10 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-purple-200 uppercase tracking-wider">
            <Sparkles size={13} className="text-amber-300 animate-pulse" />
            <span>Ready for {activeIndustry} Digital Transformation?</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
            Accelerate Your Operations with Custom Software
          </h3>
          <p className="text-xs sm:text-sm text-purple-100/90 leading-relaxed font-normal">
            Talk to our domain architects to evaluate your technical workflow and get a tailored roadmap and cost estimate within 24 hours.
          </p>
        </div>

        <div className="z-10 shrink-0">
          <Link
            to="/contact"
            className="px-6 py-3.5 bg-white text-purple-900 hover:bg-purple-50 text-xs font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            <span>Talk to {activeIndustry} Experts</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Footer Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10 pb-8">
        <div className="flex flex-col items-center text-center gap-2 p-3 bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl">
          <div className="text-purple-500">
            <CheckSquare size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">150+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Successful Projects</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl">
          <div className="text-pink-500">
            <Users size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">50+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Happy Clients</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl">
          <div className="text-blue-500">
            <Building size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">10+</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Industries Served</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl">
          <div className="text-fuchsia-500">
            <Smile size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">98.5%</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Client Satisfaction</p>
          </div>
        </div>

        <div className="flex flex-col items-center text-center gap-2 p-3 bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-xl">
          <div className="text-teal-500">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">24/7</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-400 uppercase tracking-wide font-semibold">Support Available</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustriesBottomCta;
