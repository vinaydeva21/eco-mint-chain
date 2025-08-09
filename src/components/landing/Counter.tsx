import React from "react";

type CounterProps = {
  from?: number;
  to: number;
  duration?: number; // ms
  formatter?: (n: number) => string;
  className?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function Counter({ from = 0, to, duration = 1500, formatter, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(from);
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const startAnimation = () => {
      if (mediaQuery.matches) {
        setDisplay(to);
        setHasAnimated(true);
        return;
      }
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min(1, (ts - start) / duration);
        const eased = easeOutCubic(progress);
        const value = Math.round(from + (to - from) * eased);
        setDisplay(value);
        if (progress < 1) requestAnimationFrame(step);
        else setHasAnimated(true);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [from, to, duration, hasAnimated]);

  const formatted = formatter ? formatter(display) : display.toLocaleString();

  return (
    <span ref={ref} className={className} role="status" aria-live="polite">
      {formatted}
    </span>
  );
}
