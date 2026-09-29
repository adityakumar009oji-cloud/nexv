import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import { agencyConfig } from '../data/agencyConfig';

interface HeroProps {
  onOpenProjectModal?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  life: number;
  maxLife: number;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal: _onOpenProjectModal }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFlared, setIsFlared] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto-play the video-like reveal loop (cycles every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlared((prev) => !prev);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Parallax tilt effect on container
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
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

  const triggerReveal = () => {
    setIsFlared(true);
    setTimeout(() => {
      setIsFlared(false);
    }, 4000);
  };

  // Spark burst and ember particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: Particle[] = [];

    // Continuous floating embers
    const spawnEmber = () => {
      if (particles.length > 90) return;
      particles.push({
        x: Math.random() * width,
        y: height * 0.4 + Math.random() * (height * 0.6),
        vx: (Math.random() - 0.5) * 0.8,
        vy: -0.4 - Math.random() * 0.9,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? '#F59E0B' : '#FDE68A',
        life: 0,
        maxLife: 200 + Math.random() * 150
      });
    };

    // Burst spark explosion (triggered when isFlared becomes true)
    const spawnBurst = () => {
      const cx = width / 2;
      const cy = height * 0.42;
      const count = 45;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.5;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.8 + 1.2,
          alpha: 1,
          color: Math.random() > 0.3 ? '#F59E0B' : '#FFFFFF',
          life: 0,
          maxLife: 50 + Math.random() * 40
        });
      }
    };

    if (isFlared) {
      spawnBurst();
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Randomly spawn background embers
      if (Math.random() < 0.4) {
        spawnEmber();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const progress = p.life / p.maxLife;
        const currentAlpha = p.alpha * (1 - progress);

        if (p.life >= p.maxLife || p.x < 0 || p.x > width || p.y < 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isFlared]);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen pt-32 pb-12 flex flex-col justify-between overflow-hidden bg-[#050505] z-10"
    >
      {/* 3D NEXVANTA Video Reveal Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        
        {/* Layer 1: Base Monogram Frame (Clean Obsidian Studio) */}
        <img
          src="/src/assets/images/nexvanta_obsidian_clean_1790694389459.jpg"
          alt="NEXVANTA 3D metallic monogram base"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isFlared ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)`,
          }}
        />

        {/* Layer 2: Animated Climax Reveal Frame (Spark Explosion & Lens Flare) */}
        <img
          src="/src/assets/images/nexvanta_spark_burst_1790694402350.jpg"
          alt="NEXVANTA 3D metallic monogram spark burst reveal"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
            isFlared ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{
            transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 0)`,
          }}
        />

        {/* Interactive Canvas Particle Spark Layer */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
        />

        {/* Dynamic Anamorphic Center Light Flare & Starburst */}
        <div
          className={`absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-out z-20 ${
            isFlared ? 'opacity-95 scale-125' : 'opacity-25 scale-75'
          }`}
        >
          {/* Horizontal Flare Ray */}
          <div className="w-[85vw] max-w-[1200px] h-[3px] bg-gradient-to-r from-transparent via-amber-200 via-amber-400 to-transparent blur-xs filter" />
          {/* Starburst Glow Halo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-radial from-white via-amber-300 to-transparent filter blur-md opacity-85" />
        </div>

        {/* Subtle Bottom vignette blend for smooth transition to next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20" />
        
        {/* Warm Golden Backlight Glow Halo */}
        <div
          className={`absolute top-1/3 right-1/4 w-[550px] h-[550px] rounded-full filter blur-[150px] pointer-events-none transition-all duration-700 ${
            isFlared ? 'opacity-40 scale-110' : 'opacity-20 scale-95'
          }`}
          style={{
            background: 'radial-gradient(circle, #F59E0B 0%, #D97706 45%, transparent 70%)',
            transform: `translate(${mousePos.x * 35}px, ${mousePos.y * 35}px)`,
          }}
        />
      </div>

      {/* Top spacer to preserve layout */}
      <div className="flex-1" />

      {/* Bottom Scroll Indicator & Agency Controls */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 w-full flex justify-between items-end pt-8 border-t border-amber-500/10">
        <button
          onClick={() => scrollToSection('trust')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 hover:text-amber-400 transition-colors duration-200 py-2 group cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span>{agencyConfig.hero.scrollText}</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 text-amber-400 transition-transform" />
        </button>

        <div className="flex items-center gap-4">
          <button
            onClick={triggerReveal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-[11px] font-mono font-semibold text-amber-400 hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-lg"
          >
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>{isFlared ? 'FLARE ACTIVE' : 'LIVE REVEAL'}</span>
          </button>

          <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-mono">
            <span>HIGH-CONVERSION WEBSITES</span>
            <span className="text-amber-500">✦</span>
            <span>STRATEGIC BRANDING</span>
            <span className="text-amber-500">✦</span>
            <span>CREATIVE MOTION</span>
          </div>
        </div>
      </div>
    </section>
  );
};

