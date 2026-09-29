import React from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ArrowUpRight } from 'lucide-react';

export const Industries: React.FC = () => {
  return (
    <section className="relative py-28 bg-[#0E0E0E] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              SECTOR DEPTH
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            BUILT FOR AMBITIOUS BUSINESSES
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            We adapt our creative rigor and technical capabilities to high-growth categories across consumer and enterprise markets.
          </p>
        </div>

        {/* 12-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {agencyConfig.industries.map((ind, idx) => (
            <div
              key={ind.id}
              className="p-6 rounded-xl bg-neutral-900/30 hover:bg-neutral-900/80 border border-white/5 hover:border-white/20 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-neutral-400">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-base font-bold text-white font-display mb-1.5 group-hover:text-indigo-300 transition-colors">
                  {ind.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {ind.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
