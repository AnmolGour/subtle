import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      // headline word reveal
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

      // body, cta, panel staggered fade-up
      [bodyRef.current, ctaRef.current, panelRef.current].forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power2.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: el,
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
      id="about"
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
          <span className="eyebrow">from creativefuel</span>
        </div>

        {/* Two-column layout: content left, logo panel right */}
        <div className="grid grid-cols-12 items-center gap-y-12 md:gap-x-16">
          {/* ─── Content side (cols 1-7) ─── */}
          <div className="col-span-12 flex flex-col gap-8 md:col-span-7">
            <h2
              ref={headlineRef}
              className="display-lg max-w-[18ch] text-bone-50"
            >
              From the house of{' '}
              <em className="not-italic font-display italic text-azure-500">
                Creativefuel.
              </em>
            </h2>

            <div ref={bodyRef} className="flex max-w-xl flex-col gap-4">
              {/* <p className="text-[15px] leading-relaxed text-bone-200">
                Subtle Company is part of Creativefuel.
              </p> */}
              <p className="text-[14px] sm:text-[15px] leading-relaxed text-bone-200">
                Creativefuel is a group of brands, agencies, and media
                companies built for the internet. Our ecosystem spans
                marketing, media IPs, creator businesses, production, talent,
                technology, and distribution — helping brands build narrative,
                relevance, and scale.
              </p>
            </div>
            <a
              ref={ctaRef}
              href="https://creativefuel.io"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group inline-flex w-fit items-center gap-2 rounded-full border border-bone-100/15 bg-bone-50/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span>Visit creativefuel.io</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-sm">→</span>
            </a>
          </div>

          {/* ─── Logo panel (cols 8-12) ─── */}
          <aside
            ref={panelRef}
            className="col-span-12 md:col-span-5 md:col-start-8"
          >
            <div className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl border border-bone-100/10 bg-ink-900 p-8 transition-colors duration-500 hover:border-azure-500/40 sm:rounded-3xl sm:p-10 md:p-14">
              <img
                src="/logo/creativefuel-logo.png"
                alt="Creativefuel"
                className="w-32 sm:w-40 md:w-52 max-w-[60%]"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
