import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';

gsap.registerPlugin(ScrollTrigger);

export function useTextReveal({ delay = 0, stagger = 0.05, duration = 1.0, start = 'top 85%', once = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      const targets = node.querySelectorAll('[data-reveal-line]');
      const lineNodes = targets.length ? Array.from(targets) : [node];
      const allWords = lineNodes.flatMap((line) => splitWords(line));
      if (!allWords.length) return;

      gsap.set(allWords, { yPercent: 110, opacity: 0 });

      gsap.to(allWords, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: 'power3.out',
        stagger,
        delay,
        scrollTrigger: {
          trigger: node,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [delay, stagger, duration, start, once]);

  return ref;
}
