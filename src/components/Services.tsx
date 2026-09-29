import React, { useState } from 'react';
import {
  Code2,
  Sparkles,
  Share2,
  Film,
  TrendingUp,
  Layers,
  Search,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Clock,
  X
} from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface ServicesProps {
  onSelectServiceForInquiry: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForInquiry }) => {
  const [selectedService, setSelectedService] = useState<typeof agencyConfig.services[0] | null>(null);

  // Icon resolver map
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      case 'Film': return <Film className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <Code2 className="w-6 h-6" />;
    }
  };

  return (
    <section id="services" className="relative py-28 bg-[#0A0A0A]/70 backdrop-blur-sm overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              CAPABILITIES & EXPERTISE
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            WHAT WE DO
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
            Everything you need to build, launch and grow a powerful digital brand. We blend strategic clarity with rigorous technical execution.
          </p>
        </div>

        {/* Services 8-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {agencyConfig.services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              data-cursor="VIEW"
              className="group relative p-8 rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-white/5 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer shadow-lg hover:shadow-indigo-500/10"
            >
              {/* Header: Number and Icon */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono font-medium text-neutral-400 tracking-wider">
                    {service.number}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-indigo-600/20 border border-white/10 group-hover:border-indigo-500/40 flex items-center justify-center text-neutral-300 group-hover:text-indigo-400 transition-colors">
                    {getIcon(service.icon)}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-indigo-300 transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>
              </div>

              {/* Bottom Action Indicator */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-indigo-400" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#111111] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close service modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono text-indigo-400">
                SERVICE {selectedService.number}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" />
                Typical Timeline: {selectedService.timeline}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mb-4">
              {selectedService.title}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
              {selectedService.fullDescription}
            </p>

            <div className="space-y-3 mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Key Deliverables
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/10">
              <button
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForInquiry(title);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors shadow-lg shadow-indigo-600/30"
              >
                <span>Inquire About {selectedService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
