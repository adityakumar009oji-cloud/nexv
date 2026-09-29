import React, { useState } from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="relative py-28 bg-[#0E0E0E] border-t border-white/5 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-medium">
              CLARITY FIRST
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight text-balance">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base text-neutral-400">
            Have questions before starting? Here is everything you need to know about our workflow, billing, and timelines.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {agencyConfig.faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-neutral-900/30 border border-white/5 overflow-hidden transition-colors hover:border-white/15"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white font-display">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full bg-white/5 text-neutral-300 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-indigo-600 text-white' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
