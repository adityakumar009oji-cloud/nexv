import React from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { Check, ShieldCheck, Zap, MessageSquare, Target, Users, HeartHandshake } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'creative': return <Zap className="w-5 h-5 text-indigo-400" />;
      case 'tech': return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'comm': return <MessageSquare className="w-5 h-5 text-emerald-400" />;
      case 'business': return <Target className="w-5 h-5 text-amber-400" />;
      case 'collab': return <Users className="w-5 h-5 text-violet-400" />;
      case 'partner': return <HeartHandshake className="w-5 h-5 text-pink-400" />;
      default: return <Check className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <section className="relative py-28 bg-[#0E0E0E] border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              THE STUDIO ADVANTAGE
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            WHY WORK WITH US?
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            We operate differently than bloated legacy agencies. No account manager layers, no templates, and no vanity metrics.
          </p>
        </div>

        {/* 6 Feature Cards Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agencyConfig.whyChooseUs.map((feature) => (
            <div
              key={feature.id}
              className="p-8 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 hover:border-white/20 transition-all duration-300 space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(feature.id)}
                </div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                  {feature.badge}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                {feature.title}
              </h3>

              <p className="text-sm text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
