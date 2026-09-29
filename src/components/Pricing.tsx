import React, { useState } from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPackage }) => {
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  return (
    <section id="pricing" className="relative py-28 bg-[#0A0A0A]/70 backdrop-blur-sm overflow-hidden z-10">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header & Currency Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
                TRANSPARENT ENGAGEMENTS
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
              SIMPLE PACKAGES. POWERFUL RESULTS.
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed">
              Clear scope, transparent deliverables, and no hidden retainer surprises. Choose the engagement velocity tailored to your ambitions.
            </p>
          </div>

          {/* Currency Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-white/10 rounded-xl self-start md:self-end">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                currency === 'INR'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                currency === 'USD'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {agencyConfig.pricing.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                pkg.recommended
                  ? 'bg-[#121212] border-2 border-amber-500/80 shadow-2xl shadow-amber-500/15 -translate-y-2'
                  : 'bg-neutral-900/40 border border-white/5 hover:border-white/20'
              }`}
            >
              {/* Recommended Marquee Tag */}
              {pkg.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-amber-500/25">
                  <Sparkles className="w-3.5 h-3.5 fill-black" />
                  <span>MOST POPULAR CHOICE</span>
                </div>
              )}

              <div>
                {/* Tier Title & Tagline */}
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
                    {pkg.tier}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed min-h-[36px]">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-8 pb-6 border-b border-white/10">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className={`text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-extrabold font-display tabular-nums tracking-tight ${
                      pkg.recommended ? 'text-amber-300' : 'text-white'
                    }`}>
                      {currency === 'INR' ? pkg.priceInr : pkg.priceUsd}
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">
                      / {pkg.period}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 block mt-1 font-mono">
                    *Starting baseline, customizable to scope
                  </span>
                </div>

                {/* Inclusions List */}
                <div className="space-y-3 mb-8">
                  <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    What's Included:
                  </div>
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${
                        pkg.recommended ? 'text-amber-400' : 'text-neutral-400'
                      }`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPackage(pkg.tier)}
                className={`w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-md ${
                  pkg.recommended
                    ? 'bg-amber-500 hover:bg-amber-400 text-black font-bold shadow-lg shadow-amber-500/25'
                    : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                }`}
              >
                <span>{pkg.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
