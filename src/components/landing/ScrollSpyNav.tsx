import React from "react";
import { cn } from "@/lib/utils";

export type SpyItem = { id: string; label: string };

interface ScrollSpyNavProps {
  items: SpyItem[];
}

export default function ScrollSpyNav({ items }: ScrollSpyNavProps) {
  const [active, setActive] = React.useState<string | null>(items?.[0]?.id ?? null);

  React.useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav aria-label="In-page navigation" className="container mx-auto px-4">
        <ul className="flex flex-wrap gap-2 py-3">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "px-3 py-2 text-sm rounded-md transition-smooth hover-scale",
                  active === item.id
                    ? "bg-secondary text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-current={active === item.id ? "true" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
