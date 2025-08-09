import React, { useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  intensity?: number; // 0.0 - 1.0
}

const TiltCard: React.FC<TiltCardProps> = ({
  className,
  children,
  intensity = 0.15,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (py - 0.5) * 2 * 10 * intensity; // rotateX
    const ry = (0.5 - px) * 2 * 10 * intensity; // rotateY
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "rounded-xl border bg-card shadow-sm transition-transform duration-200 will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default TiltCard;
