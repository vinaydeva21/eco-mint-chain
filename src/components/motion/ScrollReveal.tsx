import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  once?: boolean;
  delay?: number; // ms
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  className,
  children,
  once = true,
  delay = 0,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.transition = "var(--transition-smooth, all 0.3s cubic-bezier(0.4,0,0.2,1))";
            target.style.transitionDelay = `${delay}ms`;
            target.classList.add("opacity-100", "translate-y-0");
            target.classList.remove("opacity-0", "translate-y-2");
            if (once) observer.unobserve(target);
          } else if (!once) {
            const target = entry.target as HTMLElement;
            target.classList.remove("opacity-100", "translate-y-0");
            target.classList.add("opacity-0", "translate-y-2");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once, delay]);

  return (
    <div
      ref={ref}
      className={cn("opacity-0 translate-y-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
