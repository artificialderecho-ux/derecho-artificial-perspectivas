import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

export function SectionHeading({ title, subtitle, children }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="font-serif text-2xl md:text-3xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-body text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
