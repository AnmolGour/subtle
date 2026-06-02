import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from './ui/Marquee.jsx';

gsap.registerPlugin(ScrollTrigger);

const AUDIENCE = [
  {
    tag: 'Founders',
    line: 'Operators who would rather be in the work than on stage.',
    meta: 'seed → series C',
  },
  {
    tag: 'Brands',
    line: 'Teams who want a presence that reads more newsroom than billboard.',
    meta: 'b2b · ent.',
  },
  {
    tag: 'Agencies',
    line: 'Studios who want a LinkedIn arm without building one in-house.',
    meta: 'white-label',
  },
  {
    tag: 'PE / VC backed',
    line: 'Portfolio brands that need quiet, defensible narrative work.',
    meta: 'portfolio',
  },
];

const MARQUEE_TOP = [
  'platform-native thinking',
  'enterprise-grade execution',
  'feels real, reads considered',
  'small moves, repeated',
  'built to be remembered',
  'editorial, not advertorial',
];

const MARQUEE_BOTTOM = [
  'a creativefuel studio',
  'linkedin-first',
  'ghost-written',
  'dedicated pods',
  'monthly tuning',
  'organic by design',
];

const TESTIMONIALS = [
  {
    quote:
      '“We hired Subtle to fix our LinkedIn — they ended up rebuilding how we sound everywhere. Inbound tripled in a quarter, and none of it feels marketed.”',
    author: 'Operator-in-residence',
    org: 'Series-B SaaS · founder voice',
  },
  {
    quote:
      '“Quiet, considered, completely on brand. The team treats every post like a paragraph in a longer book.”',
    author: 'Head of Brand',
    org: 'PE-backed marketplace',
  },
  {
    quote:
      '“The opposite of agency content. Half the volume, three times the signal.”',
    author: 'Founding partner',
    org: 'Early-stage VC',
  },
];

export default function SocialProof() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const quotesRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, rotate: i % 2 === 0 ? -1.2 : 1.2 },
          {
            y: 0,
            opacity: 1,
            rotate: i % 2 === 0 ? -0.6 : 0.6,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      quotesRef.current.forEach((q) => {
        if (!q) return;
        gsap.fromTo(
          q,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: q,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="audience"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28"
    >
      {/* Marquee top */}
      <div className="border-y border-bone-300/10 bg-ink-950/50 py-5 sm:py-7 md:py-9">
        <Marquee
          items={MARQUEE_TOP}
          speed={50}
          className="font-display tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
        />
      </div>

      <div className="container-x relative z-10 mt-20 sm:mt-24 md:mt-28">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span className="h-px w-8 bg-bone-300/55" />
              <span className="eyebrow">who it’s for</span>
            </div>
            <h2 className="display-lg max-w-[16ch] text-bone-50">
              Built for the ones who&apos;d rather <em className="not-italic font-display italic text-azure-500">not be loud.</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 sm:gap-5 md:gap-6">
          {AUDIENCE.map((a, i) => (
            <article
              key={a.tag}
              ref={(el) => (cardsRef.current[i] = el)}
              data-cursor="hover"
              className={`group relative col-span-12 overflow-hidden rounded-2xl border border-bone-100/8 bg-gradient-to-br from-ink-800/70 to-ink-900/80 p-6 transition-all duration-500 hover:-translate-y-2 hover:border-bone-100/20 sm:col-span-6 sm:rounded-3xl sm:p-7 lg:col-span-3 ${
                i % 2 === 0 ? '-rotate-[0.6deg]' : 'rotate-[0.6deg]'
              }`}
              style={{ animation: `floatSlow ${7 + i * 0.6}s ease-in-out infinite` }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-azure-500/10 blur-3xl opacity-50 transition-opacity duration-700 group-hover:opacity-100"
              />
              <div className="relative flex h-full flex-col justify-between gap-4">
                <header className="flex items-start justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300/55">
                    {a.meta}
                  </span>
                </header>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-2xl text-bone-50 sm:text-3xl md:text-4xl">{a.tag}</h3>
                  <p className="text-[14px] sm:text-[15px] text-bone-200 leading-relaxed">{a.line}</p>
                </div>
                <div className="ink-divider" />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
                    {a.meta}
                  </span>
                  {/* <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-bone-100/15 transition-all group-hover:border-azure-400 group-hover:bg-azure-500/10">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M1 5h8M5 1l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span> */}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Testimonials */}
        {/* <div className="mt-28 grid grid-cols-12 gap-5 md:mt-40 md:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={i}
              ref={(el) => (quotesRef.current[i] = el)}
              data-cursor="hover"
              className={`relative col-span-12 flex flex-col gap-6 rounded-3xl border border-bone-100/8 bg-ink-900/40 p-8 md:col-span-4 md:p-10 ${
                i === 1 ? 'md:translate-y-8' : ''
              }`}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-azure-500">
                <path
                  d="M9 21V12c0-3.3 2.2-6 6-6v3c-1.7 0-3 1.3-3 3v3h3v6H9zm12 0V12c0-3.3 2.2-6 6-6v3c-1.7 0-3 1.3-3 3v3h3v6h-6z"
                  fill="currentColor"
                />
              </svg>
              <blockquote className="font-display text-xl leading-snug text-bone-50 md:text-2xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3 border-t border-bone-300/10 pt-5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone-100/15 bg-bone-50/[0.04] font-display italic text-bone-100">
                  {t.author[0]}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm text-bone-100">{t.author}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-bone-300/60">
                    {t.org}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div> */}
      </div>

      {/* Marquee bottom */}
      <div className="mt-20 sm:mt-24 md:mt-28 border-y border-bone-300/10 bg-ink-950/50 py-5 sm:py-7 md:py-9">
        <Marquee
          items={MARQUEE_BOTTOM}
          speed={55}
          reverse
          className="font-display tracking-tight"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
          separator="/"
        />
      </div>
    </section>
  );
}
