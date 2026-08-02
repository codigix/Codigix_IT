import React from 'react';
import { ArrowRight, Upload, BookOpen, Heart, Home, TrendingUp, Award, Users } from 'lucide-react';

const CareerBottomCta = ({ onApply }) => {
  return (
    <div className="mt-12 pb-12">
      {/* Banner */}


      {/* Footer Features Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-8 border-t border-slate-200 dark:border-gray-800/50">
        <div className="flex items-start gap-3">
          <BookOpen size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Learning & Growth</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Continuous learning and skill development</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Heart size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Health & Wellness</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Health insurance and wellness programs</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Home size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Flexible Work</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Hybrid work and flexible schedules</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <TrendingUp size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Career Advancement</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Promotions and internal growth opportunities</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Award size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Recognition</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Rewards, appreciation and performance bonuses</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users size={20} className="text-purple-500 opacity-80 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-[11px] font-bold text-slate-850 dark:text-gray-300 mb-1">Inclusive Culture</h4>
            <p className="text-[9px] text-slate-500 dark:text-gray-500">Diversity, equality and respect for all</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CareerBottomCta;
