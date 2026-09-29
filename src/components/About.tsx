import React from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ArrowUpRight } from 'lucide-react';

interface AboutProps {
  onOpenProjectModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenProjectModal }) => {
  const { about } = agencyConfig;

  return (
    <section id="about" className="relative py-28 bg-[#0E0E0E]/75 backdrop-blur-sm border-t border-white/5 overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Editorial Top Headline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
                ABOUT OUR STUDIO
              </p>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight leading-[1.1] text-balance">
              {about.heading}
            </h2>

            <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal">
              {about.mainParagraph}
            </p>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              {about.story}
            </p>

            {/* Mission & Vision Callouts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                  OUR MISSION
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {about.mission}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                  OUR VISION
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {about.vision}
                </p>
              </div>
            </div>

            {/* Founder Spotlight Card */}
            {about.founder && (
              <div className="p-6 rounded-2xl bg-[#121212]/80 border border-amber-500/25 backdrop-blur-md relative overflow-hidden group shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />
                
                <div className="relative flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-200 p-[1.5px] shrink-0 shadow-lg shadow-amber-500/20">
                      <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center text-amber-400 font-display font-black text-lg tracking-wider">
                        AK
                      </div>
                    </div>
                    <div>
                      <div className="text-base font-bold text-white tracking-wide font-display">
                        {about.founder.name}
                      </div>
                      <div className="text-xs text-amber-400 font-mono font-medium">
                        {about.founder.role}
                      </div>
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300 tracking-wider">
                    {about.founder.location || 'JHARKHAND'}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic border-l-2 border-amber-500/50 pl-3 mb-3">
                  "{about.founder.quote}"
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed">
                  {about.founder.bio}
                </p>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={onOpenProjectModal}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 hover:text-white transition-colors group"
              >
                <span>Partner with our collective</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Visual Column Beside Text */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 shadow-2xl bg-neutral-900 aspect-4/3 sm:aspect-16/11">
              <img
                src="/src/assets/images/nexvanta_obsidian_clean_1790694389459.jpg"
                alt="NEXVANTA Creative Studio - Founded by Aditya Kumar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-black/60 backdrop-blur-md border border-amber-500/20">
                <div className="text-xs uppercase tracking-widest text-amber-400 font-mono mb-1">
                  OUR COLLECTIVE MANIFESTO
                </div>
                <p className="text-sm font-medium text-white italic">
                  "No bloated layers. No template recycling. Only pure aesthetic discernment, rigorous engineering, and measurable growth."
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Core Values Grid */}
        <div className="pt-16 border-t border-white/10">
          <div className="mb-10">
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              CORE PHILOSOPHY & VALUES
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {about.values.map((val) => (
              <div
                key={val.number}
                className="p-6 rounded-2xl bg-neutral-900/30 border border-white/5 hover:border-white/20 transition-all duration-300 space-y-3 group"
              >
                <div className="text-xs font-mono font-semibold text-indigo-400">
                  {val.number}
                </div>
                <h4 className="text-xl font-bold text-white font-display group-hover:text-indigo-300 transition-colors">
                  {val.title}
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
