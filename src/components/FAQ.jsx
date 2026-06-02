import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitWords } from '../lib/splitText.js';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'How involved do I need to be?',
    a: 'As little as one hour a month. We handle the writing, the scheduling, and the engagement. We’ll do an onboarding session to capture your voice, your views, and your boundaries — after that, you review and approve. Most clients tell us the process takes less time than their weekly status calls.',
  },
  {
    q: 'Will it actually sound like me, or like a ghost-writer?',
    a: 'That’s our core skill. In the first two weeks, we build a voice and narrative document specific to you — based on how you actually speak, what you believe, and what you won’t say. We don’t stop iterating until the drafts come back with minimal changes. If it reads like a template, we’ve done the job wrong.',
  },
  {
    q: 'How soon will we see results?',
    a: 'Early signals — follower quality, comment depth, inbound messages — typically appear within 6–8 weeks. Meaningful business outcomes (inbound leads, partnership conversations, recruitment pull) build over a 3–6 month horizon. LinkedIn rewards consistency, not campaigns. We’re building a compounding asset, not running an ad.',
  },
  {
    q: 'We’ve had bad experiences with LinkedIn agencies before. What’s different here?',
    a: 'Most LinkedIn agencies are generalist content shops that learned the platform. We built Subtle specifically for LinkedIn from the start. No rotating junior writers. No templated hooks. No vanity metrics dressed up as results. You have a named strategist, a named writer, and a monthly performance review where we show our working.',
  },
  {
    q: 'Do you work with more than one person from the same company?',
    a: 'Yes — and it’s one of our strengths. We manage multiple executive voices under one account, ensuring they’re complementary rather than repetitive. The CEO and CMO don’t need to sound alike. They need to sound like they’re building the same company from different vantage points.',
  },
  {
    q: 'What does the first month look like?',
    a: 'Week 1–2: Discovery, voice capture, profile rebuild, stylebook creation. Week 3: First batch of content for your review. Week 4: Publishing begins. By end of month one, you have a live presence, a content system, and a team that knows how you think.',
  },
];

function FaqItem({ q, a, isOpen, onToggle }) {
  const bodyRef = useRef(null);

  return (
    <div className="border-b border-bone-100/10">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          data-cursor="hover"
          aria-expanded={isOpen}
          className="group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors md:py-7"
        >
          <span
            className={`text-[16px] sm:text-[18px] md:text-[20px] font-medium leading-snug transition-colors ${
              isOpen ? 'text-bone-50' : 'text-bone-100 group-hover:text-bone-50'
            }`}
          >
            {q}
          </span>
          <span
            aria-hidden="true"
            className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              isOpen
                ? 'border-azure-500/60 bg-azure-500/10 text-azure-400'
                : 'border-bone-100/15 text-bone-300 group-hover:border-bone-100/40'
            }`}
          >
            <span className="absolute h-[1.5px] w-3.5 rounded-full bg-current" />
            <span
              className={`absolute h-3.5 w-[1.5px] rounded-full bg-current transition-transform duration-300 ${
                isOpen ? 'scale-y-0' : 'scale-y-100'
              }`}
            />
          </span>
        </button>
      </h3>

      <div
        ref={bodyRef}
        className="grid transition-all duration-300 ease-out"
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 pr-10 text-[14px] sm:text-[15px] leading-relaxed text-bone-200 md:pb-7">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const listRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

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

      // Items stagger fade-up
      if (listRef.current) {
        const items = listRef.current.children;
        gsap.fromTo(
          items,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.07,
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 85%',
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
      id="faq"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-900"
    >
      <div className="container-x relative py-20 sm:py-24 md:py-28">
        <div className="grid grid-cols-1 gap-y-10 md:grid-cols-12 md:gap-x-12">
          {/* Left: heading column */}
          <div className="md:col-span-5 md:sticky md:top-28 md:self-start">
            <div className="mb-8 flex items-center gap-3 md:mb-10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span className="h-px w-8 bg-bone-300/55" />
              <span className="eyebrow">Frequently Asked Questions</span>
            </div>

            <h2 ref={headlineRef} className="display-lg max-w-[16ch] text-bone-50">
              The things people{' '}
              <em className="not-italic font-display italic text-azure-500">
                ask us first.
              </em>
            </h2>

            <p className="mt-6 max-w-sm text-[14px] sm:text-[15px] text-bone-200">
              Still unsure about something? A short call clears it up faster than any page.
            </p>

            <a
              href="#cta"
              data-cursor="hover"
              className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-bone-100/15 bg-bone-50/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span>Book a discovery call</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-sm">→</span>
            </a>
          </div>

          {/* Right: accordion column */}
          <div ref={listRef} className="md:col-span-7">
            {FAQS.map((item, i) => (
              <FaqItem
                key={item.q}
                q={item.q}
                a={item.a}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
