import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function MagneticButton({
  as: Tag = 'button',
  href,
  children,
  className = '',
  variant = 'primary',
  strength = 28,
  ...rest
}) {
  const ref = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const node = ref.current;
    const inner = innerRef.current;
    if (!node || !inner) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      const rect = node.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(node, { x: x * 0.25, y: y * 0.4, duration: 0.6, ease: 'power3.out' });
      gsap.to(inner, { x: x * 0.12, y: y * 0.2, duration: 0.6, ease: 'power3.out' });
    };
    const onLeave = () => {
      gsap.to(node, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      gsap.to(inner, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
    };

    node.addEventListener('mousemove', onMove);
    node.addEventListener('mouseleave', onLeave);
    return () => {
      node.removeEventListener('mousemove', onMove);
      node.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium tracking-wide transition-colors duration-300 will-change-transform sm:gap-3 sm:px-7 sm:py-4';
  const variants = {
    primary:
      'bg-bone-50 text-ink-950 hover:bg-azure-400 hover:text-ink-950',
    ghost:
      'border border-bone-100/20 text-bone-100 hover:border-bone-100/60 hover:bg-bone-100/5',
    ember:
      'bg-azure-500 text-ink-950 hover:bg-azure-400',
  };

  const Component = href ? 'a' : Tag;
  const props = href ? { href, ...rest } : rest;

  return (
    <Component
      ref={ref}
      data-cursor="hover"
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      <span ref={innerRef} className="relative inline-flex items-center gap-3">
        {children}
      </span>
    </Component>
  );
}
