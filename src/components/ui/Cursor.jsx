import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Decide whether to enable on mount (must run *before* refs are used).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
  }, []);

  // Drive the cursor only after the elements are rendered.
  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: mx, y: my });

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e) => {
      const target = e.target instanceof Element
        ? e.target.closest('[data-cursor="hover"], a, button')
        : null;
      setHovering(Boolean(target));
    };

    const tick = () => {
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      gsap.set(dot, { x: dx, y: dy });
      gsap.set(ring, { x: rx, y: ry });
      raf = requestAnimationFrame(tick);
    };

    let raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[100] hidden md:block rounded-full border border-bone-100/40 mix-blend-difference transition-[width,height,opacity] duration-300 ease-out ${
          hovering ? 'w-14 h-14 opacity-100' : 'w-9 h-9 opacity-90'
        }`}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block h-1.5 w-1.5 rounded-full bg-bone-50 mix-blend-difference"
      />
    </>
  );
}
