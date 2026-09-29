import React, { useState } from 'react';
import { ArrowRight, Quote, CheckCircle2, X } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface CaseStudyProps {
  onOpenInquiry: (subject: string) => void;
}

export const CaseStudy: React.FC<CaseStudyProps> = ({ onOpenInquiry }) => {
  const [showFullStudy, setShowFullStudy] = useState(false);
  const cs = agencyConfig.caseStudy;

  return (
    <section className="relative py-28 bg-[#0A0A0A]/70 backdrop-blur-sm overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              {cs.kicker}
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            {cs.heading}
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            A comprehensive look at how an integrated digital strategy drove triple-digit growth for {cs.clientName}.
          </p>
        </div>

        {/* Featured Case Study Hero Showcase Box */}
        <div className="rounded-3xl overflow-hidden bg-neutral-900/30 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Column */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[500px] overflow-hidden bg-neutral-950">
              <img
                src={cs.image}
                alt={`${cs.clientName} Brand Transformation Case Study`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent lg:hidden" />
              
              {/* Floating Client Pill */}
              <div className="absolute top-6 left-6 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                <span className="text-white font-bold font-display">{cs.clientName}</span>
                <span className="block text-neutral-400 text-[11px]">{cs.clientTagline}</span>
              </div>
            </div>

            {/* Narrative & Metrics Column */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between space-y-8 bg-[#0E0E0E]">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-indigo-400 font-mono mb-2">
                    THE CHALLENGE
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <h3 className="text-xs uppercase tracking-widest text-indigo-400 font-mono mb-2">
                    THE SOLUTION
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {cs.solution}
                  </p>
                </div>
              </div>

              {/* Quantified Metrics (3-Row Layout with Tabular Numerals) */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                {cs.results.map((res) => (
                  <div key={res.metric} className="space-y-1">
                    <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums tracking-tight">
                      {res.value}
                    </div>
                    <div className="text-xs font-semibold text-neutral-300">
                      {res.metric}
                    </div>
                    <div className="text-[10px] text-neutral-400 hidden sm:block">
                      {res.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonial Quote */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
                <p className="text-xs italic text-neutral-300 flex items-start gap-2">
                  <Quote className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span>"{cs.testimonialQuote}"</span>
                </p>
                <div className="text-[11px] text-neutral-400 font-medium pl-5">
                  {cs.testimonialAuthor} · {cs.testimonialRole}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setShowFullStudy(true)}
                data-cursor="EXPLORE"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold tracking-wider uppercase text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-200 shadow-lg shadow-indigo-600/30"
              >
                <span>View Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>

      {/* Case Study Full Breakdown Modal */}
      {showFullStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl text-left space-y-6">
            <button
              onClick={() => setShowFullStudy(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-mono">
                DEEP DIVE · {cs.clientName}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
                From Idea to Impact: The Execution Roadmap
              </h3>
            </div>

            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
              <p>
                Prior to partnering with NEXVANTA, Nova Coffee had built an exceptional roasting program but struggled with an inconsistent digital footprint that failed to convey their artisan craftsmanship. Their digital sales were less than 12% of total business volume.
              </p>
              <p>
                Over an intensive 8-week collaborative sprint, we redesigned every customer touchpoint: from unboxing tactile matte pouches with custom foil stamp typography, to building an ultra-fast headless store with sub-second page transitions, to rolling out short-form documentary films detailing their single-origin farm relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-xl bg-white/5 border border-white/5">
              {cs.results.map((res) => (
                <div key={res.metric}>
                  <div className="text-2xl font-bold text-white font-display tabular-nums text-indigo-400">
                    {res.value}
                  </div>
                  <div className="text-xs font-medium text-neutral-200 mt-1">
                    {res.metric}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">
                    {res.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">
                Interested in achieving similar results for your business?
              </span>
              <button
                onClick={() => {
                  setShowFullStudy(false);
                  onOpenInquiry(`Case Study Inquiry: ${cs.clientName}`);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors shadow-lg"
              >
                <span>Discuss Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
