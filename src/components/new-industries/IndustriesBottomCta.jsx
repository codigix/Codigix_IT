import React from 'react';
import { ArrowRight, Calendar, Rocket, Building2, Clock, Users, CheckCircle2 } from 'lucide-react';

const IndustriesBottomCta = () => {
  return (
    <div className="mt-12">
      {/* Banner */}


      {/* Footer Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10 pb-8">
        <div className="flex items-center gap-4">
          <Rocket size={24} className="text-purple-500 opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">150+</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Projects Delivered</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Building2 size={24} className="text-purple-500 opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">50+</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Industries Served</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Clock size={24} className="text-purple-500 opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">July 2023</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Company Founded</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Users size={24} className="text-purple-500 opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">250+</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Expert Professionals</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <CheckCircle2 size={24} className="text-purple-500 opacity-80" />
          <div>
            <h4 className="text-sm font-bold text-white">98.5%</h4>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Client Satisfaction</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default IndustriesBottomCta;
