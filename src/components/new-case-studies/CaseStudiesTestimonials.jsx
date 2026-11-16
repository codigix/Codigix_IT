import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import config from '../../config';
import { parseJSONField, caseStudyClient } from '../../utils/caseStudies';

// Client quotes saved with each case study (admin → Case Studies → testimonial)
const CaseStudiesTestimonials = ({ studies = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const fetchedTestimonials = studies
    .map((study) => {
      const t = parseJSONField(study.testimonial, null);
      return t && t.quote
        ? {
            quote: t.quote,
            author: (t.author || '').trim() || 'Client',
            title: t.title || '',
            company: t.company || caseStudyClient(study),
            // Only uploaded photos; stock placeholders would show the wrong face
            avatar: /\/uploads\//.test(t.avatar || '') ? config.getImageUrl(t.avatar) : ''
          }
        : null;
    })
    .filter(Boolean);
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
                  {test.avatar ? (
                    <img
                      src={test.avatar}
                      alt={test.author}
                      loading="lazy"
                      className="w-11 h-11 rounded-full object-cover border border-slate-200 dark:border-gray-700 shrink-0"
                    />
                  ) : (
                    <span aria-hidden="true" className="w-11 h-11 rounded-full shrink-0 flex items-center justify-center bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 text-sm font-bold">
                      {test.author.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{test.author}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 font-normal mt-0.5">{[test.title, test.company].filter(Boolean).join(', ')}</p>
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
