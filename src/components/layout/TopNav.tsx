import React from "react";
import { Link, NavLink } from "react-router-dom";
import BrandLogo from "@/components/BrandLogo";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/dashboard/operator", label: "Operator" },
  { to: "/dashboard/regulator", label: "Regulator" },
  { to: "/mrv", label: "MRV" },
  { to: "/credits", label: "Credits" },
  { to: "/marketplace", label: "Marketplace" },
  { to: "/governance", label: "Governance" },
  { to: "/funding", label: "Funding" },
  { to: "/learning", label: "Learning" },
];

const TopNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <BrandLogo />
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-smooth hover:opacity-80 ${isActive ? "text-primary" : "text-muted-foreground"}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="outline" size="sm">Sign in</Button>
          </Link>
          <Link to="/login">
            <Button variant="hero" size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
