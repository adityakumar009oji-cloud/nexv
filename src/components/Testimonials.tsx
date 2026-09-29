import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonials = agencyConfig.testimonials;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
                VERIFIED PARTNERSHIPS
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              WHAT OUR CLIENTS SAY
            </h2>
            <p className="text-base text-neutral-400">
              Direct feedback from founders and marketing executives who partnered with our team to elevate their market presence.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-neutral-900 border border-white/10 text-neutral-300 hover:text-white hover:border-white/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="p-8 sm:p-14 rounded-3xl bg-neutral-900/40 border border-white/10 shadow-2xl relative">
            <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 pointer-events-none" />

            {/* Star Rating */}
            <div className="flex items-center gap-1.5 mb-8">
              {Array.from({ length: current.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
              <span className="text-xs font-mono text-neutral-400 ml-2">
                5.0 RATED PARTNERSHIP
              </span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-xl sm:text-2xl md:text-3xl text-neutral-100 font-display font-medium leading-relaxed mb-10">
              "{current.quote}"
            </blockquote>

            {/* Client Attribution */}
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <div className="text-base sm:text-lg font-bold text-white font-display">
                  {current.name}
                </div>
                <div className="text-xs sm:text-sm text-neutral-400">
                  {current.role} · <span className="text-neutral-300">{current.company}</span>
                </div>
              </div>

              <div className="text-xs text-neutral-400 font-mono hidden sm:block">
                {current.location}
              </div>
            </div>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-indigo-500' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
