export default function Marquee({
  items = [],
  speed = 40,
  reverse = false,
  className = '',
  style,
  separator = '·',
}) {
  const animClass = reverse ? 'animate-marquee-reverse' : 'animate-marquee';
  return (
    <div className={`mask-fade-x relative w-full overflow-hidden ${className}`} style={style}>
      <div
        className={`flex w-max gap-6 whitespace-nowrap sm:gap-12 ${animClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6 sm:gap-12 text-bone-200/70">
            <span>{item}</span>
            <span className="text-bone-300/40">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
