import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import config from '../../config';

const CaseStudiesTestimonials = () => {
  const [fetchedTestimonials, setFetchedTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/projects`);
        if (response.ok) {
          const data = await response.json();
          const tests = data
            .map(project => {
              let t = project.testimonial;
              if (typeof t === 'string') {
                try { t = JSON.parse(t); } catch(e) { t = null; }
              }
              return t && t.quote ? { ...t, company: t.company || project.client || project.clientName } : null;
            })
            .filter(Boolean)
            .map(t => ({
              quote: t.quote,
              author: t.author || 'Client Executive',
              title: t.title || 'Director',
              company: t.company || 'Partner Enterprise',
              avatar: t.avatar || ''
            }));
          setFetchedTestimonials(tests);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      }
    };
    fetchTestimonials();
  }, []);
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

  const maxIndex = Math.max(0, fetchedTestimonials.length - visibleCount);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <div className="py-12 border-t border-slate-200 dark:border-gray-800/50 mt-8 relative text-left">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Client Reviews & Project Testimonials</h2>
        <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 font-normal max-w-lg mx-auto">
          Direct feedback from project executives on our custom ERP, CRM, and IIoT engineering solutions.
        </p>
        <div className="w-12 h-1 bg-[#EE001C] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="flex items-center gap-4">
        {/* Left Arrow */}
        {fetchedTestimonials.length > visibleCount && (
          <button 
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-[#EE001C] bg-white dark:bg-[#080420] shadow-sm shrink-0 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Testimonials Window */}
        <div className="overflow-hidden flex-1 py-4">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {fetchedTestimonials.map((test, idx) => (
              <div 
                key={idx}
                className="flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] bg-white dark:bg-[#080420] border border-slate-200 dark:border-gray-800/90 rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Quote Icon 99 */}
                  <div className="mb-4 text-[#ef4444] opacity-90">
                    <span className="text-4xl font-serif font-black leading-none select-none">“</span>
                  </div>

                  {/* Quote Statement */}
                  <p className="text-xs sm:text-[13px] text-slate-700 dark:text-gray-200 italic leading-relaxed mb-6 font-normal">
                    "{test.quote}"
                  </p>
                </div>

                {/* Author Metadata Row */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-gray-800/60 mt-auto">
                  <img 
                    src={test.avatar} 
                    alt={test.author}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-gray-700 shrink-0"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(test.author || 'User')}&background=random&color=fff&size=150`;
                    }}
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{test.author}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 font-normal mt-0.5">{test.title}, {test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {fetchedTestimonials.length > visibleCount && (
          <button 
            onClick={handleNext}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full border border-slate-200 dark:border-gray-700 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-[#EE001C] bg-white dark:bg-[#080420] shadow-sm shrink-0 transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default CaseStudiesTestimonials;
