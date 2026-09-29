import React, { useEffect, useRef, useState } from 'react';

export const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Throttle resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      hue: number;
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.min(48, Math.floor(width / 32));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.6 + 0.8,
        baseAlpha: Math.random() * 0.4 + 0.2,
        hue: Math.random() > 0.4 ? 42 : 36, // Warm Amber Gold embers
      }));
    };

    initParticles();

    // Mouse movement tracker
    let targetMouse = { x: -1000, y: -1000, active: false };

    const handlePointerMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX;
      targetMouse.y = e.clientY;
      targetMouse.active = true;
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handlePointerLeave = () => {
      targetMouse.active = false;
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Animation Loop
    let lastTime = performance.now();

    const render = (time: number) => {
      // Pause if tab is backgrounded
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Move particle
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Wrap around boundaries smoothly
        if (p1.x < -10) p1.x = width + 10;
        if (p1.x > width + 10) p1.x = -10;
        if (p1.y < -10) p1.y = height + 10;
        if (p1.y > height + 10) p1.y = -10;

        // Mouse gentle repulsion / illumination
        let extraAlpha = 0;
        if (targetMouse.active) {
          const mdx = p1.x - targetMouse.x;
          const mdy = p1.y - targetMouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 160) {
            extraAlpha = (1 - mDist / 160) * 0.5;
            // subtle displacement
            p1.x += (mdx / mDist) * 0.5;
            p1.y += (mdy / mDist) * 0.5;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p1.hue}, 95%, 60%, ${Math.min(1, p1.baseAlpha + extraAlpha)})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 135) * 0.15;
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#050505]">
      {/* 1. Subtle Dark Tech Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-40" />

      {/* 2. Top-Right Floating Amber Gold Aurora Orb */}
      <div
        className="absolute -top-[15%] -right-[10%] w-[680px] h-[680px] rounded-full filter blur-[140px] opacity-20 animate-float-slow pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.8) 0%, rgba(217, 119, 6, 0.35) 45%, transparent 70%)',
        }}
      />

      {/* 3. Mid-Left Floating Warm Gold Aurora Orb */}
      <div
        className="absolute top-[38%] -left-[12%] w-[620px] h-[620px] rounded-full filter blur-[150px] opacity-15 animate-float-reverse pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(234, 179, 8, 0.75) 0%, rgba(180, 83, 9, 0.3) 50%, transparent 75%)',
        }}
      />

      {/* 4. Bottom-Center Warm Obsidian Pulsing Glow */}
      <div
        className="absolute -bottom-[10%] left-[25%] w-[750px] h-[550px] rounded-full filter blur-[160px] animate-pulse-glow pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(217, 119, 6, 0.15) 0%, rgba(245, 158, 11, 0.05) 55%, transparent 75%)',
        }}
      />

      {/* 5. Interactive Cursor Glow Spotlight (Follows mouse on desktop) */}
      <div
        className="absolute w-[450px] h-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[90px] transition-opacity duration-300"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovering ? 0.12 : 0,
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.85) 0%, rgba(217, 119, 6, 0.45) 40%, transparent 70%)',
        }}
      />

      {/* 6. Dynamic Constellation & Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      {/* 7. Soft Vignette to keep viewport perimeter refined obsidian */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/40 to-[#050505]/95 pointer-events-none" />
    </div>
  );
};
