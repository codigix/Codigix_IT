import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Codigix transformed our manufacturing operations with a powerful ERP solution. Their team understood our processes deeply and delivered beyond expectations.",
    name: "Vikram Patil",
    title: "Director, Sterling Techno Systems",
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    quote: "The CRM solution from Codigix has helped us improve our sales process and customer relationships significantly.",
    name: "Ranjit Deshmukh",
    title: "CEO, Vastra Bhushan",
    image: "https://i.pravatar.cc/150?img=12"
  },
  {
    quote: "Their IIoT implementation gave us real-time visibility into our machines. Downtime is reduced and efficiency is at an all-time high.",
    name: "Sandeep Kulkarni",
    title: "Plant Head, Nobel Casting",
    image: "https://i.pravatar.cc/150?img=13"
  },
  {
    quote: "The custom SCADA integration from Codigix allowed us to track production live. Efficiency went up by 18% in the first quarter alone.",
    name: "Aashish Mehta",
    title: "VP Operations, Premier Pipes",
    image: "https://i.pravatar.cc/150?img=68"
  },
  {
    quote: "Their cloud migration and DevOps setup secured our medical record database flawlessly. Compliance and speed are top-tier.",
    name: "Dr. Anjali Sen",
    title: "IT Head, Apex Healthcare Group",
    image: "https://i.pravatar.cc/150?img=47"
  }
];

const CaseStudiesTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // Adjust active index if screen size changes and index becomes out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  return (
    <div className="py-12 border-t border-gray-800/50 mt-8 relative">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-white">What Our Clients Say</h2>
        <div className="w-12 h-1 bg-[#EE001C] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#EE001C] transition-colors shrink-0"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Testimonials Slider Window */}
        <div className="overflow-hidden flex-1 py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              width: `${(testimonials.length / visibleCount) * 100}%`
            }}
          >
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="px-2 shrink-0"
                style={{ width: `${100 / testimonials.length}%` }}
              >
                <div className="bg-[#050112] border border-gray-800/80 rounded-2xl p-6 sm:p-8 flex flex-col shadow-xl min-h-[220px] h-full hover:border-[#EE001C]/40 transition-colors group">
                  <Quote size={24} className="text-[#EE001C] mb-4 opacity-50" />
                  <p className="text-[12px] text-gray-300 leading-relaxed italic mb-8 flex-1">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
                    <div>
                      <h4 className="text-[13px] font-bold text-white">{test.name}</h4>
                      <p className="text-[10px] text-gray-500">{test.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#EE001C] transition-colors shrink-0"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Dots */}
      <div className="flex justify-center gap-2 mt-8">
         {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
           <button
             key={idx}
             onClick={() => setCurrentIndex(idx)}
             className={`w-2 h-2 rounded-full transition-all duration-300 ${
               currentIndex === idx ? 'bg-[#EE001C] w-4' : 'bg-gray-700 hover:bg-gray-600'
             }`}
             aria-label={`Go to slide ${idx + 1}`}
           />
         ))}
      </div>
    </div>
  );
};

export default CaseStudiesTestimonials;
