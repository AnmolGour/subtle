import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  {
    n: '01',
    text: 'Just keep it subtle.',
    body: 'The phrase founders kept landing on, week after week, after seeing every other brand pull the loud lever. A reflex toward restraint — presence that compounds without ever announcing itself.',
  },
  {
    n: '02',
    text: 'Make it feel organic.',
    body: 'Said by brand leads who wanted posts that read like the team — not the deck. Voice that arrives on the feed without ever showing the hand that wrote it.',
  },
  {
    n: '03',
    text: 'Do not make it look forced.',
    body: 'Repeated by operators after a draft missed by an inch. The line between considered and contrived is one syllable wide — we sit on that line, on purpose.',
  },
];

const REASONS = [
  {
    n: '01',
    title: 'Always-on execution',
    body: 'Daily posting, replies, and sentiment cover. Never a quiet week.',
  },
  {
    n: '02',
    title: 'LinkedIn expert team',
    body: 'Specialists who understand the platform, not generalists adapting later.',
  },
  {
    n: '03',
    title: 'Dedicated service team',
    body: 'Your own strategist, writer, and ORM lead. Not a shared pool.',
  },
  {
    n: '04',
    title: 'Creativefuel support',
    body: 'Backed by a media group built for how the internet actually works.',
  },
];

export default function WhySubtle() {
  const sectionRef = useRef(null);
  const existHeadlineRef = useRef(null);
  const existCloseRef = useRef(null);
  const teamHeadlineRef = useRef(null);
  const teamSubRef = useRef(null);
  const quotesRef = useRef([]);
  const reasonsRef = useRef([]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      // ── Block: Why we exist ──
      if (existHeadlineRef.current) {
        const words = splitWords(existHeadlineRef.current);
        if (words.length) {
          gsap.set(words, { yPercent: 110, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: existHeadlineRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

      quotesRef.current.forEach((q, i) => {
        if (!q) return;
        gsap.fromTo(
          q,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: q,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      if (existCloseRef.current) {
        gsap.fromTo(
          existCloseRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: existCloseRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // ── Block: Why Team Subtle ──
      if (teamHeadlineRef.current) {
        const words = splitWords(teamHeadlineRef.current);
        if (words.length) {
          gsap.set(words, { yPercent: 110, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            stagger: 0.04,
            scrollTrigger: {
              trigger: teamHeadlineRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          });
        }
      }

      if (teamSubRef.current) {
        gsap.fromTo(
          teamSubRef.current,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: teamSubRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      reasonsRef.current.forEach((r) => {
        if (!r) return;
        gsap.fromTo(
          r,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: r,
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
    <>
      {/* ─── Block: Why Team Subtle (id for navbar anchor) ────── */}
      <section
        id="why"
        ref={sectionRef}
        className="relative isolate overflow-hidden bg-ink-950"
      >
        <div className="container-x relative py-20 sm:py-24 md:py-28">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3 md:mb-14">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
            </span>
            <span className="h-px w-8 bg-bone-300/55" />
            <span className="eyebrow">why team subtle</span>
          </div>

          <div className="grid grid-cols-12 gap-y-10 md:gap-x-16">
            <h2
              ref={teamHeadlineRef}
              className="display-lg col-span-12 text-bone-50 md:col-span-12"
            >
              Platform-native thinking.{' '}
              <em className="not-italic font-display italic text-azure-500">
                Enterprise-level execution.
              </em>
            </h2>

            <p
              ref={teamSubRef}
              className="col-span-12 self-end text-[14px] sm:text-[15px] text-bone-200 md:col-span-12"
            >
              We exist for founders, CXOs, and senior leaders who want
              credibility without the noise, backed by Creativefuel&apos;s
              marketing and media infrastructure.
            </p>
          </div>

          {/* Reasons grid */}
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-bone-100/8 bg-bone-100/8 sm:mt-16 sm:grid-cols-2 sm:rounded-3xl lg:grid-cols-4">
            {REASONS.map((r, i) => (
              <article
                key={r.n}
                ref={(el) => (reasonsRef.current[i] = el)}
                data-cursor="hover"
                className="group relative flex h-full flex-col justify-between gap-6 bg-ink-950 p-6 transition-colors duration-500 hover:bg-ink-900 sm:gap-8 sm:p-7 md:p-9"
              >
                {/* hover accent — vertical brand line on the left */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-6 h-0 w-[2px] origin-top bg-azure-500 transition-all duration-500 group-hover:h-[calc(100%-3rem)] sm:top-7 md:top-9"
                />

                <header className="flex items-start justify-between">
                  <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
                    ({r.n})
                  </span>
                </header>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <h3 className="font-display text-2xl leading-tight text-bone-50 md:text-3xl">
                    {r.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-bone-200">
                    {r.body}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="h-px w-10 bg-bone-300/30 transition-all duration-500 group-hover:w-16 group-hover:bg-azure-500" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-bone-300/55 transition-colors duration-500 group-hover:text-azure-500">
                    +
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Block: Why we exist ─────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        <div className="container-x relative py-20 sm:py-24 md:py-28">
          {/* Eyebrow */}
          <div className="mb-8 flex items-center gap-3 md:mb-14">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
            </span>
            <span className="h-px w-8 bg-bone-300/55" />
            <span className="eyebrow">why we exist</span>
          </div>

          <div className="grid grid-cols-12 gap-y-10 md:gap-x-16">
            <h2
              ref={existHeadlineRef}
              className="display-lg col-span-12 text-bone-50 md:col-span-12"
            >
              We didn&apos;t build Subtle{' '}
              <em className="not-italic font-display italic text-azure-500">
                because LinkedIn was trending.
              </em>
            </h2>
            <p
              ref={existCloseRef}
              className="col-span-12 self-end text-[14px] sm:text-[15px] text-bone-200 md:col-span-12"
            >
              We built it because we kept seeing smart brands get it completely
              wrong on a platform that rewards the opposite of what they were doing.
            </p>
          </div>

          {/* Pull quotes — editorial pattern */}
          <div className="relative mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:mt-16 sm:gap-y-12 md:mt-24 md:grid-cols-3 md:gap-y-0">
            {/* connecting horizontal hairline (decorative, desktop only) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-[18px] hidden h-px bg-gradient-to-r from-transparent via-bone-300/30 to-transparent md:block"
            />

            {QUOTES.map((q, i) => (
              <figure
                key={q.n}
                ref={(el) => (quotesRef.current[i] = el)}
                className="relative flex flex-col gap-5"
              >
                {/* numeral chip */}
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone-300/40 bg-ink-900 font-mono text-[12px] tracking-[0.20em] text-bone-300">
                  {q.n}
                </span>

                {/* opening quote glyph */}
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-azure-500"
                  style={{ marginBottom: '-1rem' }}
                >
                  “
                </span>

                {/* italic display quote */}
                <blockquote className="font-display leading-tight">
                  <span
                    className="block font-display text-bone-50"
                    style={{ fontSize: 'clamp(1.625rem, 4vw, 2.25rem)' }}
                  >
                    {q.text}
                  </span>
                </blockquote>

                {/* expanded description (NEW) */}
                <p className="max-w-xs text-[14px] sm:text-[15px] leading-relaxed text-bone-200">
                  {q.body}
                </p>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
