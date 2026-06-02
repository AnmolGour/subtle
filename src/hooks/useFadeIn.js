import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useFadeIn({ y = 32, delay = 0, duration = 1.0, start = 'top 88%', stagger = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      const targets = node.querySelectorAll('[data-fade]');
      const els = targets.length ? Array.from(targets) : [node];
      if (!els.length) return;

      gsap.set(els, { y, opacity: 0 });
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration,
        ease: 'power2.out',
        delay,
        stagger,
        scrollTrigger: {
          trigger: node,
          start,
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [y, delay, duration, start, stagger]);

  return ref;
}
