import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useMouseParallax({ strength = 30 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = Array.from(node.querySelectorAll('[data-parallax]')).filter(Boolean);
    if (!layers.length) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) / rect.width;
      target.y = (e.clientY - cy) / rect.height;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      layers.forEach((el) => {
        const depth = parseFloat(el.dataset.parallax) || 1;
        gsap.set(el, {
          x: current.x * strength * depth,
          y: current.y * strength * depth,
        });
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  return ref;
}
