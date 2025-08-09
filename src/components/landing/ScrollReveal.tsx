import React from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  animationClass?: string; // e.g., "animate-fade-in"
  threshold?: number;
}

export default function ScrollReveal({
  as = "section",
  className,
  animationClass = "animate-fade-in",
  threshold = 0.15,
  children,
  ...rest
}: ScrollRevealProps) {
  const [revealed, setRevealed] = React.useState(false);
  const ref = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Comp = as as any;

  return (
    <Comp
      ref={ref}
      className={cn(
        "will-change-transform", // hint for smoother anims
        revealed ? animationClass : "opacity-0",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}
