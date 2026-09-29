import React from 'react';

interface MarqueeProps {
  items?: string[];
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items = [
    'STRATEGY',
    'DESIGN',
    'DEVELOPMENT',
    'BRANDING',
    'VIDEO & MOTION',
    'PERFORMANCE MARKETING',
    'UI/UX SYSTEMS',
    'AI WORKFLOWS'
  ],
  reverse = false
}) => {
  // Duplicate array to guarantee smooth seamless infinite loop
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative py-6 bg-neutral-950 border-y border-white/5 overflow-hidden select-none">
      {/* Side gradient scrims for smooth vanishing edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0A0A0A] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0A0A0A] to-transparent z-10 pointer-events-none" />

      <div
        className={`flex whitespace-nowrap animate-marquee ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center mx-6 sm:mx-8">
            <span className="text-sm sm:text-base font-bold tracking-[0.25em] text-neutral-300 font-display">
              {item}
            </span>
            <span className="ml-6 sm:ml-8 text-indigo-400 text-xs select-none">
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
