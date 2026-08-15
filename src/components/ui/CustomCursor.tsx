"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Immediate move for the dot
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0,
      });

      // Delayed smooth move for the follower
      gsap.to(follower, {
        x: mouseX,
        y: mouseY,
        duration: 0.8,
        ease: 'power3.out'
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 0, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1.5, 
        backgroundColor: 'rgba(163, 128, 74, 0.1)', // accent color with opacity
        borderColor: '#A3804A',
        duration: 0.3 
      });
    };

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.2 });
      gsap.to(follower, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'rgba(35, 48, 74, 0.3)', // primary dark with opacity
        duration: 0.3 
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add event listeners to all links and buttons
    const attachListeners = () => {
      const interactables = document.querySelectorAll('a, button, input, textarea, [data-cursor-interactive]');
      interactables.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    attachListeners();

    // Re-attach if DOM changes (simple approach, could use MutationObserver for robust app)
    setTimeout(attachListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      const interactables = document.querySelectorAll('a, button, input, textarea, [data-cursor-interactive]');
      interactables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary-dark rounded-full pointer-events-none z-[9999] hidden lg:block -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      ></div>
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary-dark/30 rounded-full pointer-events-none z-[9998] hidden lg:block -translate-x-1/2 -translate-y-1/2 transition-colors"
      ></div>
    </>
  );
}
