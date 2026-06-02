import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitChars } from '../lib/splitText.js';
import MagneticButton from './ui/MagneticButton.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current?.querySelectorAll('[data-cta-line]');
      const allChars = Array.from(lines || []).flatMap((l) => splitChars(l));

      if (allChars.length) {
        gsap.set(allChars, { yPercent: 110, opacity: 0, rotate: 6 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      if (allChars.length) {
        tl.to(allChars, {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.018,
        });
      }
      if (subRef.current) {
        tl.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
          '-=0.5'
        );
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.15,
          opacity: 0.9,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink-900 py-20 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={glowRef}
          className="absolute left-1/2 top-1/2 h-[100vmin] w-[100vmin] md:h-[80vmin] md:w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#0B66C373,#0B66C30D_60%,transparent_75%)] blur-2xl"
          style={{ opacity: 0.6 }}
        />
        <div className="scene-vignette absolute inset-0" />
      </div>

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <div className="flex items-center gap-3 mb-6 md:mb-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
          </span>
          <span className="h-px w-8 bg-bone-300/55" />
          <span className="eyebrow">your move</span>
        </div>
        <h2 ref={headlineRef} className="display-xl text-bone-50">
          <span data-cta-line className="block">
            Just keep
          </span>
          <span data-cta-line className="block">
            <span className="bg-gradient-to-br from-azure-400 via-azure-500 to-azure-600 bg-clip-text font-display italic text-azure-500 glow-blue">
              it subtle.
            </span>
          </span>
        </h2>

        <p ref={subRef} className="mt-8 max-w-xl text-balance text-[14px] sm:text-[15px] text-bone-200 sm:mt-10">
          A short call. We&apos;ll listen, ask the awkward questions, and tell you whether we&apos;re the right team. No deck.
        </p>

        <div ref={ctaRef} className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-12 sm:gap-4">
          <MagneticButton href="mailto:content@subtle.company" variant="primary">
            Book a discovery call
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </MagneticButton>
          <MagneticButton href="mailto:content@subtle.company" variant="ghost">
            content@subtle.company
          </MagneticButton>
        </div>

        <div className="mt-12 flex items-center gap-3 text-bone-300/50 sm:mt-20 sm:gap-6">
          <span className="h-px w-6 bg-bone-300/20 sm:w-10" />
          <span className="font-mono text-[11px] sm:text-[12px] text-bone-300 uppercase tracking-[0.20em] text-balance">no decks · just a conversation</span>
          <span className="h-px w-6 bg-bone-300/20 sm:w-10" />
        </div>
      </div>
    </section>
  );
}
