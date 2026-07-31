import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactMap = () => {
  return (
    <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-gray-800/80 mb-12 shadow-xl">
      
      {/* Map Background (Using Unsplash placeholder for map view) */}
      <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1600&q=80" 
        alt="Map Location" 
        className="w-full h-full object-cover filter brightness-[0.25] contrast-150 grayscale sepia hue-rotate-[200deg]"
      />
      
      {/* Fake Map Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* Map Pin Center */}
      <div className="absolute top-1/2 left-1/2 md:left-1/3 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(147,51,234,0.6)] animate-bounce">
          <MapPin size={24} className="text-white" />
        </div>
        <div className="w-4 h-1 bg-black/50 blur-sm rounded-full mt-2"></div>
      </div>

      {/* Visit Us Card */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-30 bg-[#050112]/90 backdrop-blur-md border border-gray-700 rounded-2xl p-6 w-[85%] md:w-[320px] shadow-2xl"
      >
        <h3 className="text-[16px] font-bold text-white mb-3">Visit Us</h3>
        <p className="text-[12px] text-gray-300 leading-relaxed mb-6">
          We'd love to meet you in person. Schedule a meeting with our experts and let's discuss how we can help your business grow.
        </p>
        <button className="w-full px-4 py-2.5 bg-[#7e22ce] hover:bg-[#9333ea] text-white text-[11px] font-medium rounded-md transition-all flex items-center justify-center gap-2">
          Schedule a Meeting <Calendar size={14} />
        </button>
      </motion.div>

    </div>
  );
};

export default ContactMap;
