import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Find the story',
    body:
      'We sit with founders, read the calendar, and dig out the angles only insiders know. Out comes a narrative spine.',
    pill: 'discovery',
  },
  {
    n: '02',
    title: 'Place the voice',
    body:
      'A stylebook, a cadence, a profile rebuilt to read like a person. We ghost-write until the voice feels native.',
    pill: 'positioning',
  },
  {
    n: '03',
    title: 'Build the flow',
    body:
      'Editorial calendar live, content shipping, engagement layered in. Quiet at first — then steady.',
    pill: 'always-on',
  },
  {
    n: '04',
    title: 'Tune monthly',
    body:
      'We read the signal, kill what dulls, double on what compounds. Every month, sharper than the last.',
    pill: 'compounding',
  },
];

export default function Workflow() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: node,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.6,
            },
          }
        );
      }

      stepsRef.current.forEach((step) => {
        if (!step) return;
        const fades = step.querySelectorAll('[data-step-fade]');
        if (fades.length) {
          gsap.fromTo(
            fades,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }

        const dot = step.querySelector('[data-step-dot]');
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: step,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-950 py-20 sm:py-24 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[30vh] w-[40vh] md:h-[40vh] md:w-[60vh] -translate-x-1/2 rounded-full bg-azure-500/8 blur-[90px] md:blur-[120px]" />
      </div>

      <div className="container-x relative z-10">
        <div className="mb-12 flex flex-col gap-6 sm:mb-14 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span className="h-px w-8 bg-bone-300/55" />
              <span className="eyebrow">how we work</span>
            </div>
            <h2 className="display-lg max-w-[14ch] text-bone-50">
              A four-step rhythm. <em className="not-italic font-display italic text-azure-500">Then we hold it.</em>
            </h2>
          </div>
          <p className="text-[14px] sm:text-[15px] text-bone-200 max-w-md">
            No big launch, no mascot, no ad spend. Find the story, place the voice, build the flow, tune. Every month it tightens.
          </p>
        </div>

        <ol className="relative grid grid-cols-12 gap-y-12 sm:gap-y-16 md:gap-y-24">
          {/* spine — visible on mobile (left) and desktop (center) */}
          <div className="absolute left-[11px] top-2 block h-[calc(100%-1rem)] w-px md:left-[calc(50%-0.5px)]">
            <div className="h-full w-full bg-bone-300/10" />
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top bg-gradient-to-b from-azure-400 via-azure-500 to-azure-600"
            />
          </div>

          {STEPS.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <li
                key={s.n}
                ref={(el) => (stepsRef.current[i] = el)}
                className="relative col-span-12 grid grid-cols-12 items-center gap-6"
                // className={`relative col-span-12 grid grid-cols-12 items-start gap-6 ${
                //   isLeft ? 'md:[&>*:first-child]:md:order-1' : ''
                // }`}
              >
                {/* card */}
                <div
                  className={`col-span-12 pl-10 md:col-span-6 md:pl-0 ${isLeft ? 'md:pr-16' : 'md:col-start-7 md:pl-16'}`}
                >
                  <div
                    data-cursor="hover"
                    className="group relative overflow-hidden rounded-2xl border border-bone-100/8 bg-gradient-to-b from-ink-800/80 to-ink-900/80 p-6 transition-transform duration-500 will-change-transform hover:-translate-y-1 sm:rounded-3xl sm:p-7 md:p-9"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-azure-500/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60"
                    />
                    <div className="relative flex flex-col gap-4 sm:gap-5">
                      <div data-step-fade className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
                          step {s.n}
                        </span>
                        <span className="rounded-full border border-bone-100/15 px-3 py-1 font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.20em] text-bone-300">
                          {s.pill}
                        </span>
                      </div>
                      <h3 data-step-fade className="display-md text-bone-50">
                        {s.title}
                      </h3>
                      <p data-step-fade className="text-[14px] sm:text-[15px] text-bone-200 max-w-md">
                        {s.body}
                      </p>
                    </div>
                  </div>
                </div>

                {/* dot on spine — vertically centered with card + index */}
                <div className="pointer-events-none absolute left-[3px] top-7 md:left-[calc(50%-12px)] md:top-1/2 md:-translate-y-1/2">
                  <div
                    data-step-dot
                    className="relative flex h-6 w-6 items-center justify-center rounded-full border border-azure-500/60 bg-ink-950"
                  >
                    <span className="absolute inset-0 rounded-full bg-azure-500/30 blur-md" />
                    <span className="relative h-2 w-2 rounded-full bg-azure-400" />
                  </div>
                </div>

                {/* Index on opposite side, desktop */}
                <div
                  className={`hidden md:col-span-6 md:block ${
                    isLeft
                      ? 'md:col-start-7 md:pl-16'
                      : 'md:col-start-1 md:row-start-1 md:pr-16 md:text-right'
                  }`}
                >
                  <span
                    data-step-fade
                    className="font-display italic leading-none text-azure-500 opacity-10"
                    style={{ fontSize: 'clamp(6rem, 10vw, 11rem)' }}
                  >
                    {s.n}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
