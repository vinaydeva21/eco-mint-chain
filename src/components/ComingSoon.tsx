import React from "react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description }) => {
  return (
    <section className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
      )}
      <div className="mt-8 inline-flex rounded-lg border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">This section is in progress.</p>
      </div>
    </section>
  );
};

export default ComingSoon;
