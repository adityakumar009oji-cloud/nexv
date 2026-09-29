import React from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const Process: React.FC = () => {
  return (
    <section id="process" className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              METHODOLOGY
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            HOW WE WORK
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            A disciplined, five-stage sprint framework designed to deliver world-class digital experiences on schedule with zero guesswork.
          </p>
        </div>

        {/* Process Timeline Grid */}
        <div className="relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-indigo-500/30 via-sky-400/30 to-indigo-500/30 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {agencyConfig.process.map((step) => (
              <div
                key={step.step}
                className="group relative p-6 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Step indicator node */}
                  <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-white/10 group-hover:border-indigo-500/60 flex items-center justify-center text-sm font-mono font-bold text-white group-hover:text-indigo-400 transition-colors mb-6 shadow-md">
                    {step.step}
                  </div>

                  {/* Title & Duration */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                      {step.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500 block mb-3">
                    {step.duration}
                  </span>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Deliverables snippet */}
                <div className="pt-4 border-t border-white/5 space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-semibold block">
                    Deliverables:
                  </span>
                  {step.keyDeliverables.slice(0, 2).map((deliv, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                      <CheckCircle2 className="w-3 h-3 text-indigo-400 shrink-0" />
                      <span className="truncate">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
