import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const offices = [
  {
    country: "India - Head Office",
    city: "Pune, Maharashtra",
    phone: "+91 12345 67890",
    email: "info@codigixinfotech.com",
    img: "/assets/images/service/ai_brain.png" // Placeholder for skyline
  },
  {
    country: "USA Office",
    city: "New Jersey, USA",
    phone: "+1 (732) 123-4567",
    email: "usa@codigixinfotech.com",
    img: "/assets/images/service/hero_erp.png" // Placeholder for skyline
  },
  {
    country: "UK Office",
    city: "London, United Kingdom",
    phone: "+44 20 1234 5678",
    email: "uk@codigixinfotech.com",
    img: "/assets/images/service/ai_brain.png" // Placeholder for skyline
  },
  {
    country: "UAE Office",
    city: "Dubai, UAE",
    phone: "+971 50 123 4567",
    email: "uae@codigixinfotech.com",
    img: "/assets/images/service/hero_erp.png" // Placeholder for skyline
  }
];

const ContactGlobalPresence = () => {
  return (
    <div className="py-8 mb-12">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-white">Our Global Presence</h2>
        <div className="w-12 h-1 bg-purple-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {offices.map((office, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#050112] border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl group hover:border-purple-500/40 transition-all"
          >
            {/* Skyline Illustration Area */}
            <div className="h-28 relative bg-[#0a051a] flex items-end justify-center overflow-hidden">
               <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay z-10"></div>
               {/* Using placeholder images with CSS filters to look like glowing skylines */}
               <img 
                 src={office.img} 
                 alt="Skyline" 
                 className="w-full h-auto object-cover filter contrast-[1.5] brightness-75 sepia hue-rotate-[240deg] opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
               />
               <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050112] to-transparent z-20"></div>
            </div>

            {/* Content */}
            <div className="p-6 relative z-30">
              <h3 className="text-[13px] font-bold text-white mb-1">{office.country}</h3>
              
              <div className="flex items-center gap-2 mb-4">
                 <MapPin size={12} className="text-purple-400" />
                 <p className="text-[10px] text-gray-400">{office.city}</p>
              </div>

              <div className="flex flex-col gap-2">
                 <div className="flex items-center gap-2 text-[10px] text-gray-300 group-hover:text-white transition-colors">
                    <Phone size={12} className="text-purple-500" />
                    {office.phone}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] text-gray-300 group-hover:text-white transition-colors">
                    <Mail size={12} className="text-purple-500" />
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
