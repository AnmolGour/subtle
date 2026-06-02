import { useEffect, useState } from 'react';

const links = [
  { href: '#why', label: 'Why' },
  { href: '#services', label: 'Services' },
  { href: '#workflow', label: 'How we work' },
  { href: '#engage', label: 'Engage' },
  { href: '#audience', label: 'Who it’s for' },
  { href: '#faq', label: 'FAQ' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2 md:py-3' : 'py-3 md:py-6'
      }`}
    >
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-3 py-2 md:px-5 md:py-3 transition-all duration-500 ${
            scrolled || open
              ? 'glass shadow-[0_8px_40px_-20px_#10172466]'
              : 'border border-transparent'
          }`}
        >
          <a
            href="#top"
            data-cursor="hover"
            className="group relative flex items-center gap-2.5"
            aria-label="Subtle Company — home"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo/subtle-logo.png"
              alt="Subtle Company"
              className="h-7 w-auto md:h-auto md:w-[90px] transition-transform duration-500"
            />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-cursor="hover"
                  className="rounded-full px-3.5 py-1.5 text-sm text-bone-200 transition-colors hover:text-bone-50"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#cta"
              data-cursor="hover"
              className="group hidden md:inline-flex items-center gap-2 rounded-full border border-bone-100/15 bg-bone-50/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span>Book a discovery call</span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 text-sm">→</span>
            </a>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-bone-100/15 bg-bone-50/[0.04] text-bone-100 transition-colors hover:bg-bone-50/[0.08]"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 block h-px w-4 bg-bone-100 transition-transform duration-300 ${
                    open ? 'translate-y-[6px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 block h-px w-4 -translate-y-1/2 bg-bone-100 transition-opacity duration-200 ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 block h-px w-4 bg-bone-100 transition-transform duration-300 ${
                    open ? '-translate-y-[6px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-[64px] z-40 transition-all duration-300 ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`relative mx-4 mt-4 overflow-hidden rounded-3xl border border-bone-100/10 bg-ink-950/95 p-6 transition-transform duration-300 ${
            open ? 'translate-y-0' : '-translate-y-4'
          }`}
        >
          <ul className="flex flex-col gap-1">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-lg text-bone-100 transition-colors hover:bg-bone-50/[0.04]"
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.20em] text-bone-300/55">
                    0{i + 1}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="ink-divider my-5" />
          <a
            href="#cta"
            onClick={() => setOpen(false)}
            className="group flex items-center justify-between rounded-2xl border border-bone-100/15 bg-bone-50/[0.04] px-4 py-4 text-bone-100 transition-all hover:border-bone-100/40 hover:bg-bone-50/[0.08]"
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-azure-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-azure-500" />
              </span>
              <span className="text-sm font-medium">Book a discovery call</span>
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
