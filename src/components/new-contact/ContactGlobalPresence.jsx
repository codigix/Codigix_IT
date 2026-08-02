import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const offices = [
  {
    country: "Head Office",
    city: "Office No: 514, 5th Floor, Brahma Sky Uzuri, MIDC, Pimpri-Chinchwad, Maharashtra 411018.",
    phone: "+91 9112706604",
    email: "info@codigixinfotech.com",
    img: "/assets/images/service/ai_brain.webp"
  }
];

const ContactGlobalPresence = () => {
  return (
    <div className="py-8 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Our Office</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-3 rounded-full"></div>
      </div>

      <div className="flex justify-center">
        {offices.map((office, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="w-full max-w-sm bg-white dark:bg-[#050112] border border-slate-200/90 dark:border-gray-800/80 rounded-2xl overflow-hidden shadow-sm dark:shadow-xl group hover:border-purple-400 dark:hover:border-purple-500/40 transition-all text-left"
          >
            {/* Skyline Illustration Area */}
            <div className="h-40 relative bg-slate-900 dark:bg-[#0a051a] flex items-end justify-center overflow-hidden">
               <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
               <img 
                 src={office.img} 
                 alt="Skyline" 
                 className="w-full h-auto object-cover filter contrast-[1.5] brightness-75 sepia hue-rotate-[240deg] opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
               />
               <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-[#050112] to-transparent z-20"></div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-30">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">{office.country}</h3>
              
              <div className="flex items-start gap-2 mb-5">
                 <MapPin size={16} className="text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                 <p className="text-sm text-slate-600 dark:text-gray-400 font-medium leading-relaxed">{office.city}</p>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-gray-800">
                 <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-300 font-medium group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                    <Phone size={16} className="text-purple-600 dark:text-purple-500 shrink-0" />
                    {office.phone}
                 </div>
                 <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-gray-300 font-medium group-hover:text-purple-600 dark:group-hover:text-white transition-colors">
                    <Mail size={16} className="text-purple-600 dark:text-purple-500 shrink-0" />
                    {office.email}
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default ContactGlobalPresence;
