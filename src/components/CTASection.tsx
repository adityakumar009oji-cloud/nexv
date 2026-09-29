import React from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

interface CTASectionProps {
  onOpenProjectModal: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenProjectModal }) => {
  const whatsappUrl = `https://wa.me/${agencyConfig.brand.whatsappNumber}?text=${encodeURIComponent(
    agencyConfig.brand.whatsappDefaultMessage
  )}`;

  return (
    <section className="relative py-28 bg-[#0A0A0A]/70 backdrop-blur-sm overflow-hidden z-10">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-radial from-indigo-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 text-center space-y-8">
        
        {/* Subtle Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-400">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>CURRENTLY ACCEPTING NEW CLIENT PARTNERSHIPS</span>
        </div>

        {/* Large Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white font-display tracking-tight text-balance leading-[1.08] max-w-4xl mx-auto">
          LET'S BUILD SOMETHING GREAT.
        </h2>

        {/* Supporting text */}
        <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Have an idea, a business or a brand that deserves more attention? Let's turn it into something people remember.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenProjectModal}
            data-cursor="START"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all duration-200 active:scale-95 shadow-xl shadow-indigo-600/30"
          >
            <span>Start Your Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CHAT"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-neutral-800 border border-white/10 rounded-full transition-all duration-200 active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Talk on WhatsApp</span>
          </a>
        </div>

        {/* Quiet footnote */}
        <div className="text-xs text-neutral-400 pt-6">
          Response within 24 hours · Transparent pricing · Dedicated sprint teams
        </div>

      </div>
    </section>
  );
};
