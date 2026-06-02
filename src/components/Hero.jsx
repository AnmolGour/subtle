import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';
import { useMouseParallax } from '../hooks/useMouseParallax.js';
import MagneticButton from './ui/MagneticButton.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useMouseParallax({ strength: 22 });
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const tickerRef = useRef(null);
  const indexRef = useRef(null);
  const aroundRef = useRef(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const ctx = gsap.context(() => {
      const lines = headlineRef.current.querySelectorAll('[data-line]');
      const allWords = Array.from(lines).flatMap((l) => splitWords(l));
      const subWords = subRef.current ? splitWords(subRef.current) : [];
      const uiTargets = [ctaRef.current, tickerRef.current, indexRef.current].filter(Boolean);

      if (allWords.length) gsap.set(allWords, { yPercent: 110, opacity: 0 });
      if (subWords.length) gsap.set(subWords, { yPercent: 100, opacity: 0 });
      if (uiTargets.length) gsap.set(uiTargets, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.2 });
      if (allWords.length) {
        tl.to(allWords, {
          yPercent: 0,
          opacity: 1,
          duration: 1.15,
          ease: 'power3.out',
          stagger: 0.04,
        });
      }
      if (subWords.length) {
        tl.to(
          subWords,
          { yPercent: 0, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.015 },
          '-=0.7'
        );
      }
      if (uiTargets.length) {
        tl.to(
          uiTargets,
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.08 },
          '-=0.5'
        );
      }

      if (aroundRef.current && sectionRef.current) {
        gsap.to(aroundRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [sectionRef]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="grain-bg relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pt-28 sm:pt-32 md:pt-40"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          ref={aroundRef}
          data-parallax="0.4"
          className="absolute -top-40 left-1/2 h-[60vh] w-[60vh] md:h-[80vh] md:w-[80vh] -translate-x-1/2 rounded-full bg-azure-500/10 blur-[100px] md:blur-[140px]"
        />
        <div
          data-parallax="0.7"
          className="absolute -bottom-32 -left-32 h-[40vh] w-[40vh] md:h-[60vh] md:w-[60vh] rounded-full bg-moss-500/10 blur-[90px] md:blur-[120px]"
        />
        <div
          data-parallax="0.5"
          className="absolute -right-24 top-1/3 h-[40vh] w-[40vh] md:h-[55vh] md:w-[55vh] rounded-full bg-azure-500/8 blur-[90px] md:blur-[120px]"
        />

        {/* Faint grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern id="hero-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Vignette (theme-aware) */}
        <div className="scene-vignette absolute inset-0" />
      </div>

      <div className="container-x relative z-10 grid w-full grid-cols-12 gap-y-6 pb-10 sm:gap-y-10 md:pb-20">
        {/* Eyebrow ticker */}
        <div ref={tickerRef} className="col-span-12 flex items-center gap-3 md:col-span-6">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
          </span>
          <span className="eyebrow">We heard it in every room. Every brief. Every call.</span>
        </div>

        {/* <div ref={indexRef} className="col-span-12 hidden items-center justify-end gap-3 md:col-span-6 md:flex">
          <span className="eyebrow text-bone-300/60">[ 01 ]</span>
          <span className="h-px w-12 bg-bone-300/20" />
          <span className="eyebrow text-bone-300/60">arrival</span>
        </div> */}

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="col-span-12 mt-2 display-xl text-bone-50"
          aria-label="Just keep it subtle. so we did."
        >
          <span data-line className="block">
            Just keep it subtle.
          </span>
          <span data-line className="block">
            so{' '}
            <em className="not-italic font-display italic text-azure-500">
              we did.
            </em>
          </span>
        </h1>

        {/* Sub copy */}
        <div className="col-span-12 mt-4 grid grid-cols-12 gap-6 sm:mt-6 md:mt-2">
          <p
            ref={subRef}
            className="text-[14px] sm:text-[15px] text-bone-200 col-span-12 max-w-xl md:col-span-6 md:col-start-1"
          >
            From founders who had built real things. From brands tired of sounding like everyone else. From agencies who knew their clients deserved better on LinkedIn. It stopped being a brief. It became a gap. So we filled it.
          </p>

          <div
            ref={ctaRef}
            className="col-span-12 flex flex-wrap items-center gap-3 sm:gap-4 md:col-span-6 md:justify-end"
          >
            <MagneticButton href="#cta" variant="primary">
              Book a discovery call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MagneticButton>
            <MagneticButton href="#services" variant="ghost">
              See what we do
            </MagneticButton>
          </div>
        </div>

        {/* Bottom rail */}
        {/* <div className="col-span-12 mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-bone-300/10 pt-6 md:mt-24">
          <div className="flex flex-col gap-1">
            <span className="eyebrow text-bone-300/55">Filed under</span>
            <span className="font-display text-2xl text-bone-100">Organic by design</span>
          </div>
          <div className="flex items-center gap-8">
            <Stat label="Voices placed" value="120+" />
            <Stat label="Avg. inbound lift" value="3.4×" />
            <Stat label="Retention" value="14 mo" />
          </div>
          <a
            href="#story"
            data-cursor="hover"
            className="group inline-flex items-center gap-3 text-sm text-bone-200/80 hover:text-bone-50"
            aria-label="Scroll to read"
          >
            <span className="relative h-10 w-[1px] overflow-hidden bg-bone-300/20">
              <span className="absolute left-0 top-0 h-1/2 w-full -translate-y-full animate-[scrollDown_2.4s_ease-in-out_infinite] bg-bone-50" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.20em]">Scroll to read</span>
          </a>
        </div> */}
      </div>

      <style>{`
        @keyframes scrollDown {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-3xl leading-none text-bone-50 md:text-4xl">{value}</span>
      <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.20em] text-bone-300/60">{label}</span>
    </div>
  );
}
