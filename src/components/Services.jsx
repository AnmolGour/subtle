import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    no: '01',
    title: 'Personal & Professional Branding',
    summary:
      'A founder voice that sounds like a person, not a press release. We script, shape and place posts that read considered.',
    bullets: [
      {
        label: 'Voice & narrative',
        desc: 'We define how you sound — the tone, the perspective, the phrases that feel unmistakably you.',
      },
      {
        label: 'Editorial calendar',
        desc: 'A planned publishing rhythm so your presence builds consistently, not in bursts.',
      },
      {
        label: 'Profile architecture',
        desc: 'Your LinkedIn profile rebuilt from the ground up to open doors, not just tick boxes.',
      },
      {
        label: 'Content stylebook',
        desc: 'A living reference that keeps every post, comment, and reply consistent — even as your team scales.',
      },
    ],
    accent: 'from-azure-400/40 via-azure-500/10 to-transparent',
  },
  {
    no: '02',
    title: 'LinkedIn Campaigns',
    summary:
      'Multi-week thought-leadership pushes timed to product launches, hiring, fundraising. Always-on cadence, never a billboard',
    bullets: [
      {
        label: 'Launch arcs',
        desc: 'A sequenced content push around your product launch, funding round, or major announcement — so the right people notice at the right time.',
      },
      {
        label: 'Recruiting plays',
        desc: 'Content that makes senior talent want to work for you — before they even see the job post.',
      },
      {
        label: 'Thought-leadership',
        desc: 'Posts that put your perspective into the industry conversation, not just your company news.',
      },
      {
        label: 'Founder POV',
        desc: 'The founder’s voice at the centre of the brand — opinionated, credible, and read by the people who matter.',
      },
    ],
    accent: 'from-moss-500/30 via-moss-500/10 to-transparent',
  },
  {
    no: '03',
    title: 'Reputation Management',
    summary:
      'What people see when they search you. We shape SERPs, surface signals and quietly clean the noise so the right things ring',
    bullets: [
      {
        label: 'SERP shaping',
        desc: 'We influence what appears in the first page of search results when someone looks up your name or your company — so what they find builds confidence, not doubt.',
      },
      {
        label: 'Crisis quieting',
        desc: 'When something negative surfaces online, we manage the narrative — methodically and without drawing more attention to it.',
      },
      {
        label: 'Narrative recovery',
        desc: 'If your public story has drifted from who you actually are, we rebuild it — systematically, over time, without spin.',
      },
      {
        label: 'Signal layering',
        desc: 'We build a consistent trail of credible content across platforms so your reputation becomes impossible to misread.',
      },
    ],
    accent: 'from-azure-400/40 via-azure-500/10 to-transparent',
  },
  {
    no: '04',
    title: 'LinkedIn Retainer',
    summary:
      'A dedicated team running your presence end-to-end — copy, design, posting, engagement, monthly tuning. You stay in your meetings.',
    bullets: [
      {
        label: 'Dedicated pod',
        desc: 'A fixed team — strategist, writer, designer — assigned exclusively to you. Not a rotating roster.',
      },
      {
        label: 'Weekly publishing',
        desc: 'Content goes live on a consistent schedule. No gaps, no scrambles, no missed windows.',
      },
      {
        label: 'Engagement layer',
        desc: 'We handle the comments, replies, and community interactions that turn posts into conversations — and conversations into relationships.',
      },
      {
        label: 'Monthly tuning',
        desc: 'Every month we review what’s working, cut what isn’t, and sharpen the approach. The output gets better over time.',
      },
    ],
    accent: 'from-moss-500/30 via-moss-500/10 to-transparent',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pinEl = pinRef.current;
    const track = trackRef.current;
    if (!section || !pinEl || !track) return;

    const mq = window.matchMedia('(min-width: 768px)');
    if (!mq.matches) {
      // Mobile: stacked layout, fade-up cards individually. No pin/scrub.
      const ctx = gsap.context(() => {
        const cards = track.querySelectorAll('[data-service-card]');
        cards.forEach((card) => {
          const inner = card.querySelectorAll('[data-service-fade]');
          if (!inner.length) return;
          gsap.fromTo(
            inner,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }, sectionRef);
      return () => ctx.revert();
    }

    const ctx = gsap.context(() => {
      let scrollTween;

      const setup = () => {
        const distance = track.scrollWidth - window.innerWidth;
        if (distance <= 0) return;

        scrollTween = gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: pinEl,
            start: 'top top',
            end: () => '+=' + distance,
            scrub: 0.6,
            pin: pinEl,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        const cards = track.querySelectorAll('[data-service-card]');
        cards.forEach((card) => {
          const inner = card.querySelectorAll('[data-service-fade]');
          if (!inner.length) return;
          gsap.fromTo(
            inner,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.06,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                containerAnimation: scrollTween,
                start: 'left 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      };

      const raf = requestAnimationFrame(setup);

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', onResize);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', onResize);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-ink-900"
    >
      <div className="container-x relative z-10 flex flex-col gap-6 py-20 sm:gap-8 sm:py-24 md:py-28">
        <div className="flex items-center gap-3 mb-6 md:mb-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
          </span>
          <span className="h-px w-8 bg-bone-300/55" />
          <span className="eyebrow">core services</span>
        </div>

        <div className="flex flex-col gap-5 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6">
          <h2 className="display-lg max-w-[14ch] text-bone-50">
            Four layers, <em className="not-italic font-display italic text-azure-500">one quiet system.</em>
          </h2>
          <p className="text-[14px] sm:text-[15px] text-bone-200 max-w-md">
            Each layer can stand alone. Stacked, they make a brand that compounds — without ever feeling like marketing.
          </p>
        </div>
      </div>

      {/* Mobile: vertical stack. Desktop: pinned horizontal scroll. */}
      <div
        ref={pinRef}
        className="relative w-full md:flex md:h-[100svh] md:items-center md:overflow-hidden"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-6 px-6 pb-20 sm:px-8 md:w-max md:flex-row md:items-stretch md:gap-12 md:pb-0 md:pl-16 md:pr-[20vw]"
          style={{ willChange: 'transform' }}
        >
          {SERVICES.map((s) => (
            <ServiceCard key={s.no} {...s} />
          ))}
          <EndCard />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ no, title, summary, bullets, accent }) {
  const cardRef = useRef(null);
  return (
    <article
      ref={cardRef}
      data-service-card
      data-cursor="hover"
      className="group relative flex w-full shrink-0 flex-col justify-between gap-8 overflow-hidden rounded-[24px] border border-bone-100/8 bg-gradient-to-b from-ink-800/60 to-ink-900/80 p-7 sm:p-8 md:max-h-[82vh] md:w-[44vw] md:max-w-[640px] md:gap-10 md:rounded-[28px] md:p-12"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-px rounded-[24px] md:rounded-[28px] bg-gradient-to-br ${accent} opacity-60 transition-opacity duration-700 group-hover:opacity-100`}
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[24px] md:rounded-[28px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(236,231,221,0.08), transparent 70%)',
        }}
      />

      <header className="relative flex items-start justify-between">
        <span data-service-fade className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
          {no} / 04
        </span>
      </header>

      <div className="relative flex flex-col gap-5 md:gap-6">
        <h3 data-service-fade className="display-md max-w-[18ch] text-bone-50">
          {title}
        </h3>
        <p data-service-fade className="text-[14px] sm:text-[15px] text-bone-200">
          {summary}
        </p>
      </div>

      <div className="relative">
        <div data-service-fade className="ink-divider mb-5" />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 sm:gap-x-6">
          {bullets.map((b) => {
            const label = typeof b === 'string' ? b : b.label;
            const desc = typeof b === 'string' ? null : b.desc;
            return (
              <li
                key={label}
                data-service-fade
                className={`text-[13px] sm:text-[14px] text-bone-300 ${
                  desc ? 'flex flex-col gap-1' : 'flex items-center gap-2.5'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-bone-300" />
                  <span className={desc ? 'text-bone-100 font-medium' : ''}>{label}</span>
                </span>
                {desc && (
                  <span className="pl-[14px] text-[12px] sm:text-[13px] leading-snug text-bone-300/80">
                    {desc}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

function EndCard() {
  return (
    <div className="flex w-full shrink-0 flex-col justify-center gap-5 px-1 sm:gap-6 sm:px-2 md:w-[34vw] md:max-w-[480px]">
      <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300">
        end of layers
      </span>
      <h3 className="display-md text-bone-50">
        Stack them. <em className="not-italic font-display italic text-azure-500">Quietly.</em>
      </h3>
      <p className="text-[14px] sm:text-[15px] text-bone-200 max-w-sm">
        Most clients begin with branding + retainer. We tune the mix as the work matures.
      </p>
      <a
        href="#cta"
        data-cursor="hover"
        className="group inline-flex w-fit items-center gap-2 rounded-full border border-bone-100/15 bg-bone-50/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
        </span>
        <span>Start the conversation</span>
        <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-sm">→</span>
      </a>
    </div>
  );
}
