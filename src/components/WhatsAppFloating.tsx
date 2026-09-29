import React, { useState } from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${agencyConfig.brand.whatsappNumber}?text=${encodeURIComponent(
    agencyConfig.brand.whatsappDefaultMessage
  )}`;

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 select-none"
    >
      {/* Tooltip on hover */}
      <div
        className={`px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs font-medium text-white shadow-xl pointer-events-none transition-all duration-200 ${
          isHovered
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-2 pointer-events-none'
        }`}
      >
        Chat With Us
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        data-cursor="CHAT"
        aria-label="Chat with NEXVANTA on WhatsApp"
        className="relative group w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/80 transition-all duration-200 active:scale-95"
      >
        {/* Pulsing Aura */}
        <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

        <MessageCircle className="w-6 h-6 relative z-10 transition-transform group-hover:scale-110" />
      </a>
    </aside>
  );
};
