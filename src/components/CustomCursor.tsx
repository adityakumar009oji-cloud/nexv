import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target or any parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor');
        setCursorText(text || '');
        setIsHovered(true);
      } else {
        // Also check if hovering standard interactive elements
        const isClickable = target?.closest('button, a, input, select, textarea, [role="button"]');
        if (isClickable) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out ${
          isHovered
            ? cursorText
              ? 'w-16 h-16 bg-white text-black font-semibold text-[10px] tracking-widest shadow-xl scale-100'
              : 'w-10 h-10 bg-amber-500/25 border border-amber-400 backdrop-blur-xs scale-100'
            : 'w-3 h-3 bg-white scale-100'
        }`}
      >
        {cursorText && (
          <span className="uppercase tracking-widest select-none animate-fade-in font-display">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
