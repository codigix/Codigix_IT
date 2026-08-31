import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const teamTestimonials = [
  {
    quote: "Codigix gives me the platform to work on exciting technologies and grow every day.",
    name: "Rohit Patil",
    title: "Full Stack Developer",
    image: "https://i.pravatar.cc/150?img=14"
  },
  {
    quote: "The supportive culture and great leadership make Codigix a wonderful place to work.",
    name: "Sneha Kulkarni",
    title: "UI/UX Designer",
    image: "https://i.pravatar.cc/150?img=20"
  },
  {
    quote: "I love the freedom to share ideas and the opportunities to learn new things.",
    name: "Vikram Joshi",
    title: "Business Analyst",
    image: "https://i.pravatar.cc/150?img=33"
  },
  {
    quote: "Codigix values people and empowers us to deliver the best for our clients.",
    name: "Priya Sharma",
    title: "Marketing Executive",
    image: "https://i.pravatar.cc/150?img=42"
  }
];

const CareerTestimonials = () => {
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

  const maxIndex = Math.max(0, teamTestimonials.length - visibleCount);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  // Adjust current index if screen size changes and index becomes out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 relative">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Our Team Says</h2>
        <div className="w-12 h-1 bg-[#EE001C] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-[#EE001C] dark:hover:border-[#EE001C] bg-white dark:bg-transparent shadow-sm shrink-0 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Testimonials Slider Window */}
        <div className="overflow-hidden flex-1 py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              width: `${(teamTestimonials.length / visibleCount) * 100}%`
            }}
          >
            {teamTestimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="px-2 shrink-0"
                style={{ width: `${100 / teamTestimonials.length}%` }}
              >
                <div className="bg-white dark:bg-[#050112] border border-slate-200 dark:border-gray-800/80 rounded-2xl p-6 flex flex-col shadow-sm dark:shadow-xl min-h-[220px] h-full hover:border-[#EE001C]/40 transition-colors group">
                  <Quote size={20} className="text-[#EE001C] mb-4 opacity-50" />
                  <p className="text-[11px] text-slate-650 dark:text-gray-300 leading-relaxed italic mb-8 flex-1">
                    "{test.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={test.image} 
                      alt={test.name} 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-gray-700 shrink-0" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.name || 'User')}&background=random&color=fff&size=150`;
                      }}
                    />
                    <div>
                      <h4 className="text-[12px] font-bold text-slate-900 dark:text-white">{test.name}</h4>
                      <p className="text-[9px] text-slate-550 dark:text-gray-500">{test.title}</p>
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
          className="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-[#EE001C] dark:hover:border-[#EE001C] bg-white dark:bg-transparent shadow-sm shrink-0 transition-colors"
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

export default CareerTestimonials;
