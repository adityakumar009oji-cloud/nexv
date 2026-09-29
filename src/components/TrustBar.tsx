import React from 'react';
import { agencyConfig } from '../data/agencyConfig';

export const TrustBar: React.FC = () => {
  return (
    <section id="trust" className="relative py-16 bg-[#0E0E0E]/75 backdrop-blur-sm border-y border-white/5 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Subtle Section Kicker */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
            TRUSTED BY AMBITIOUS BRANDS
          </p>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8 items-center justify-items-center mb-16 opacity-75">
          {agencyConfig.clients.map((client) => (
            <div
              key={client.name}
              className="flex flex-col items-center justify-center p-3 w-full group cursor-default transition-all duration-200"
            >
              <span className="text-sm sm:text-base font-bold tracking-widest text-neutral-400 group-hover:text-white transition-colors font-display text-center">
                {client.name}
              </span>
              <span className="text-[10px] text-neutral-600 group-hover:text-neutral-400 transition-colors uppercase tracking-wider mt-1">
                {client.sector}
              </span>
            </div>
          ))}
        </div>

        {/* Statistics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-10 border-t border-white/10">
          {agencyConfig.stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left space-y-1 group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white group-hover:text-amber-400 font-display tabular-nums tracking-tight transition-colors duration-200">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-neutral-200">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-400">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
