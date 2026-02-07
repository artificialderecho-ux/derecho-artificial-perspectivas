import React from "react";
import Link from "next/link";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  if (!items || items.length === 0) {
    return null;
  }

  // Generate schema.org BreadcrumbList
  const breadcrumbSchema = createBreadcrumbJsonLd({
    items: items.map(item => ({
      name: item.label,
      url: item.href.startsWith('http') ? item.href : `https://derechoartificial.com${item.href}`,
    })),
  });

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <nav 
        aria-label="Breadcrumb" 
        className={`mb-6 ${className}`}
      >
        <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            
            return (
              <React.Fragment key={index}>
                <li className="inline-flex items-center">
                  {isLast ? (
                    <span 
                      className="font-normal text-foreground"
                      aria-current="page"
                    >
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-foreground hover:underline"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
                {!isLast && (
                  <li 
                    role="presentation" 
                    aria-hidden="true"
                    className="text-muted-foreground/60"
                  >
                    /
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
