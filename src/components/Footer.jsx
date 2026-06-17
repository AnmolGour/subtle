import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const wordRef = useRef(null);

  useEffect(() => {
    if (!wordRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wordRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative isolate overflow-hidden border-t border-bone-300/10 bg-ink-950 pt-16 pb-8 sm:pt-20 sm:pb-10">
      <div className="container-x flex flex-col gap-12 sm:gap-16">
        <div className="grid grid-cols-12 gap-y-10 sm:gap-y-12">
          <div className="col-span-12 flex flex-col gap-5 md:col-span-5">
            <a
              href="#top"
              data-cursor="hover"
              className="group flex items-center gap-2.5 text-bone-100"
              aria-label="Subtle Company — back to top"
            >
              <img
                src="/logo/subtle-logo.png"
                alt="Subtle Company"
                className="h-9 w-auto sm:h-auto sm:w-[160px] md:w-[190px] transition-transform duration-500"
              />
            </a>
            <p className="max-w-sm text-[14px] sm:text-[15px] text-bone-200">
              A LinkedIn-first studio for founders, brands and PE-backed teams. We make marketing that feels organic.
            </p>
            <p className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300/55">
              A Creativefuel studio
            </p>
          </div>

          <div className="col-span-6 md:col-span-2">
            <FooterCol
              title="Studio"
              links={[
                { href: '#story', label: 'Approach' },
                { href: '#services', label: 'Services' },
                { href: '#workflow', label: 'How we work' },
                { href: '#audience', label: 'Who it’s for' },
              ]}
            />
          </div>

          <div className="col-span-6 md:col-span-2">
            <FooterCol
              title="Connect"
              links={[
                { href: 'mailto:content@subtle.company', label: 'Email' },
                { href: 'https://www.linkedin.com/company/subtle-company/', label: 'LinkedIn' },
                { href: 'https://www.instagram.com/subtle.company', label: 'Instagram' },
              ]}
            />
          </div>

          <div className="col-span-12 flex flex-col gap-3 md:col-span-3">
            <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300/55 md:mb-2">
              Start the conversation
            </span>
            <a
              href="mailto:content@subtle.company"
              data-cursor="hover"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-bone-100/15 bg-bone-50/[0.03] px-4 py-3 text-left text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.06] sm:px-5 sm:py-4"
            >
              <span className="font-display text-base sm:text-lg break-all">content@subtle.company</span>
              <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Massive watermark */}
        {/* <div className="overflow-hidden">
          <div
            ref={wordRef}
            className="select-none font-display leading-none tracking-tightest text-bone-50"
            style={{ fontSize: 'clamp(5rem, 16vw, 22rem)' }}
          >
            <span className="bg-gradient-to-b from-bone-50 via-bone-100 to-bone-100/10 bg-clip-text text-transparent">
              subtle.
            </span>
          </div>
        </div> */}

        <div className="flex flex-col items-start justify-between gap-3 border-t border-bone-300/10 pt-6 text-[12px] text-bone-300/55 md:flex-row md:items-center">
          <span>© 2026 Subtle Company. All rights quietly reserved.</span>
          <span className="font-mono uppercase tracking-[0.20em]">
            Designed in India · Built with care
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[12px] uppercase tracking-[0.20em] text-bone-300/55">
        {title}
      </span>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              data-cursor="hover"
              className="group inline-flex items-center gap-2 text-sm text-bone-200 transition-colors hover:text-azure-500"
            >
              <span className="h-px w-0 bg-bone-50 transition-all duration-300 group-hover:w-3" />
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
