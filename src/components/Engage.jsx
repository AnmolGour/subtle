import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';

gsap.registerPlugin(ScrollTrigger);

const WAYS = [
  {
    n: '01',
    title: 'Strategy Sprint',
    body: 'A focused 2-week engagement. We audit your current presence, interview your key voices, and deliver a LinkedIn strategy that’s ready to execute — not a deck to revisit in six months.',
    tag: 'For clarity',
  },
  {
    n: '02',
    title: 'Ongoing system',
    body: 'Our most complete offering. A dedicated pod manages your founder’s voice, your brand’s page, and all the engagement in between — every week, without interruption. Your involvement is a monthly review call.',
    tag: 'For execution',
  },
  {
    n: '03',
    title: 'Partner support',
    body: 'We operate as your white-label LinkedIn arm. Your clients see seamless output. We stay in the background — writing, posting, managing, and reporting under your brand umbrella.',
    tag: 'For agencies',
  },
];

export default function Engage() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const closeRef = useRef(null);
  const waysRef = useRef([]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      // Heading word-reveal
      if (headlineRef.current) {
        const words = splitWords(headlineRef.current);
        if (words.length) {
          gsap.set(words, { yPercent: 110, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

      // Ways stagger fade-up
      waysRef.current.forEach((w, i) => {
        if (!w) return;
        gsap.fromTo(
          w,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: w,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // Closing paragraph soft fade-up
      if (closeRef.current) {
        gsap.fromTo(
          closeRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: closeRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="engage"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-900"
    >
      <div className="container-x relative py-20 sm:py-24 md:py-28">
        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-3 md:mb-14">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
          </span>
          <span className="h-px w-8 bg-bone-300/55" />
          <span className="eyebrow">engage</span>
        </div>

        {/* Heading */}
        <h2
          ref={headlineRef}
          className="display-lg max-w-[22ch] text-bone-50"
        >
          How teams work with us.{' '}
          <em className="not-italic font-display italic text-azure-500">
            Three simple ways to start.
          </em>
        </h2>

        {/* Ways grid — editorial pull-quote pattern */}
        <div className="relative mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-16 sm:gap-y-12 md:mt-24 md:grid-cols-3 md:gap-y-0">
          {/* connecting horizontal hairline (decorative, desktop only) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-bone-300/30 to-transparent md:block"
          />

          {WAYS.map((w, i) => (
            <figure
              key={w.n}
              ref={(el) => (waysRef.current[i] = el)}
              className="relative flex flex-col gap-5"
            >
              {/* numeral chip */}
              <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone-300/40 bg-ink-950 font-mono text-[12px] tracking-[0.20em] text-bone-300">
                {w.n}
              </span>

              {/* italic display title */}
              <h3 className="font-display leading-tight text-bone-50">
                <span
                  className="block"
                  style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.25rem)' }}
                >
                  {w.title}
                </span>
              </h3>

              {/* body */}
              <p className="max-w-xs text-[14px] sm:text-[15px] text-bone-200 leading-relaxed">
                {w.body}
              </p>

              {/* caption tag */}
              <figcaption className="font-mono text-[12px] uppercase tracking-[0.20em] text-azure-500">
                {w.tag}
              </figcaption>

              {/* CTA */}
              <a
                href="#cta"
                data-cursor="hover"
                className="group/cta mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-bone-100/15 bg-bone-50/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
                </span>
                <span>Talk to us about partnership</span>
                <span className="transition-transform duration-300 group-hover/cta:translate-x-0.5 text-sm">→</span>
              </a>
            </figure>
          ))}
        </div>

        {/* Closing statement */}
        <p
          ref={closeRef}
          className="mt-12 max-w-3xl text-balance text-[14px] sm:text-[15px] text-bone-200 sm:mt-16 md:mt-24"
        >
          Start with clarity, ongoing execution, or partner support.
        </p>
      </div>
    </section>
  );
}
