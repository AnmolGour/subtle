import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initSmoothScroll() {
  if (lenisInstance) return lenisInstance;
  if (typeof window === 'undefined') return null;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  lenisInstance = new Lenis({
    duration: reduce ? 0 : 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: !reduce,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    lerp: 0.1,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getLenis() {
  return lenisInstance;
}
