import React from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number; // degrees
}

export default function TiltCard({ className, children, maxTilt = 8, ...rest }: TiltCardProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (maxTilt / 2 - py * maxTilt).toFixed(2);
    const ry = (px * maxTilt - maxTilt / 2).toFixed(2);
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "transition-transform duration-200 will-change-transform",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
