import React, { useState } from 'react';
import { agencyConfig } from '../data/agencyConfig';
import { ArrowUpRight, X, Database } from 'lucide-react';
import { SupabaseStatusModal } from './SupabaseStatusModal';
import { SUPABASE_PROJECT_ID } from '../lib/supabase';

interface FooterProps {
  onOpenProjectModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProjectModal }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const [dbModalOpen, setDbModalOpen] = useState(false);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-[#060606] text-neutral-400 border-t border-white/10 pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand Info (Col 1-5) */}
          <div className="lg:col-span-5 space-y-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-2xl font-bold tracking-tighter text-white font-display flex items-center gap-2 inline-block"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>{agencyConfig.brand.wordmark}</span>
            </a>

            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              Building brands, websites and digital experiences for ambitious businesses. We turn high-potential ideas into category leaders.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenProjectModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors shadow-lg shadow-indigo-600/25"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Mirror (Col 6-7) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs uppercase tracking-widest text-white font-semibold">
              Navigation
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); scrollTo('#services'); }}
                  className="hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); scrollTo('#work'); }}
                  className="hover:text-white transition-colors"
                >
                  Selected Work
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); scrollTo('#about'); }}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => { e.preventDefault(); scrollTo('#process'); }}
                  className="hover:text-white transition-colors"
                >
                  Our Process
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); scrollTo('#pricing'); }}
                  className="hover:text-white transition-colors"
                >
                  Packages & Pricing
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
                  className="hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Core Services (Col 8-10) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs uppercase tracking-widest text-white font-semibold">
              Core Services
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="text-neutral-300">Website Development</span>
              </li>
              <li>
                <span className="text-neutral-300">Branding & Graphic Design</span>
              </li>
              <li>
                <span className="text-neutral-300">Social Media Management</span>
              </li>
              <li>
                <span className="text-neutral-300">Video Editing & Motion</span>
              </li>
              <li>
                <span className="text-neutral-300">Performance Digital Marketing</span>
              </li>
              <li>
                <span className="text-neutral-300">UI/UX Interface Systems</span>
              </li>
            </ul>
          </div>

          {/* Social & Contact (Col 11-12) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs uppercase tracking-widest text-white font-semibold">
              Connect
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={agencyConfig.brand.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={agencyConfig.brand.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={agencyConfig.brand.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>YouTube</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
              <li>
                <a
                  href={agencyConfig.brand.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Twitter / X</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                </a>
              </li>
            </ul>

            <div className="pt-4 border-t border-white/5 text-xs text-neutral-400 space-y-1 font-mono">
              <div className="text-amber-400 font-semibold">Founder: Aditya Kumar</div>
              <div>{agencyConfig.brand.location}</div>
              <div>{agencyConfig.brand.email}</div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} {agencyConfig.brand.name}. Founded & Directed by <span className="text-neutral-300 font-medium">Aditya Kumar</span>. All Rights Reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => setDbModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Database: Supabase</span>
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-neutral-300 transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-neutral-300 transition-colors"
            >
              Terms & Conditions
            </button>
          </div>
        </div>

      </div>

      <SupabaseStatusModal
        isOpen={dbModalOpen}
        onClose={() => setDbModalOpen(false)}
      />

      {/* Legal Information Modal */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#121212] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl text-left space-y-4">
            <button
              onClick={() => setLegalModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10"
              aria-label="Close legal modal"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white font-display">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>

            <div className="text-xs sm:text-sm text-neutral-300 space-y-3 max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    At {agencyConfig.brand.name}, we value your privacy. Information submitted through our project enquiry forms is strictly utilized for direct project scoping, communication, and client service delivery.
                  </p>
                  <p>
                    We never sell, rent, or lease prospective or current client data to third-party brokers or advertisers. All client assets and proprietary intellectual property remain strictly confidential under mutual NDA upon formal project initiation.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    All project estimates, milestone schedules, and deliverables are confirmed through signed Master Services Agreements (MSA) and Statements of Work (SOW).
                  </p>
                  <p>
                    Full intellectual property rights for custom code, brand marks, and digital assets transfer to the client upon full payment of agreed project milestones.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 text-right">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
