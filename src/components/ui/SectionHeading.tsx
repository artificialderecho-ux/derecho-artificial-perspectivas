import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  anchorId?: string; // The ID of the section to link to
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const SectionHeading = ({ 
  children, 
  className, 
  anchorId, 
  level = 'h2',
  ...props 
}: SectionHeadingProps) => {
  const Tag = level;
  
  const copyToClipboard = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!anchorId) return;
    
    // Construct URL with hash
    // Handle root path specifically to avoid double slashes if needed, though browsers handle it.
    // window.location.pathname usually starts with /
    const path = window.location.pathname === '/' ? '' : window.location.pathname;
    const url = `${window.location.origin}${path}#${anchorId}`;
    
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Enlace copiado', {
        description: 'El enlace directo a esta sección se ha copiado al portapapeles.'
      });
    }).catch(() => {
      toast.error('Error al copiar el enlace');
    });
  };

  return (
    <Tag 
      className={cn("group flex items-center gap-2 w-fit relative", className)} 
      {...props}
    >
      {children}
      {anchorId && (
        <button
          onClick={copyToClipboard}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground cursor-pointer inline-flex items-center justify-center"
          aria-label="Copiar enlace a esta sección"
          title="Copiar enlace a esta sección"
          type="button"
        >
          <LinkIcon className="h-4 w-4" />
        </button>
      )}
    </Tag>
  );
};
