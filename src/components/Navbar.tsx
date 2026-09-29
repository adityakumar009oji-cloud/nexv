import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface NavbarProps {
  onOpenProjectModal: (preselectedService?: string, preselectedPackage?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display flex items-center gap-2.5 group transition-opacity hover:opacity-95"
            aria-label="Nexvanta Home"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/80 group-hover:scale-125 transition-all duration-200" />
            <span className="tracking-wider font-display uppercase font-extrabold text-white group-hover:text-neutral-100 transition-colors">
              NE<span className="text-amber-400 font-black">X</span>VANTA
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white transition-colors duration-150 relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenProjectModal()}
              data-cursor="START"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-full transition-all duration-200 active:scale-95 shadow-lg shadow-amber-500/25 whitespace-nowrap"
            >
              <span>{agencyConfig.hero.primaryCta}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black/80 backdrop-blur-xl transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-[#0E0E0E] border-l border-white/10 p-8 flex flex-col justify-between transition-transform duration-300 ease-out ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="pt-16 space-y-6">
            <div className="text-xs uppercase tracking-widest text-neutral-500 pb-2 border-b border-white/10">
              Navigation
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-2xl font-bold font-display text-neutral-200 hover:text-white hover:translate-x-2 transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-colors shadow-lg shadow-amber-500/25"
            >
              <span>{agencyConfig.hero.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-neutral-400 text-center">
              {agencyConfig.brand.email} · {agencyConfig.brand.location}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
