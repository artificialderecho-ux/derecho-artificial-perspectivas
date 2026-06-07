import { compileMDX } from "next-mdx-remote/rsc";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import {
  ScrollyCallout,
  ScrollyFigure,
  ScrollyMetric,
  Scrollytelling,
  ScrollyStep,
} from "@/components/mdx/Scrollytelling";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

function Callout({ children, title, type = "info", className }: any) {
  const tone = type === "warning" || type === "error" ? "warning" : type === "success" ? "success" : "default";
  return (
    <ScrollyCallout title={title} tone={tone} className={className}>
      {children}
    </ScrollyCallout>
  );
}

function Table({ children, className }: any) {
  return (
    <div className="my-8 overflow-x-auto rounded-xl border border-slate-200">
      <table className={cn("m-0 w-full", className)}>{children}</table>
    </div>
  );
}

const TableHeader = ({ children, className }: any) => <thead className={className}>{children}</thead>;
const TableBody = ({ children, className }: any) => <tbody className={className}>{children}</tbody>;
const TableRow = ({ children, className }: any) => <tr className={className}>{children}</tr>;
const TableHead = ({ children, className }: any) => <th className={cn("bg-slate-50 text-left", className)}>{children}</th>;
const TableCell = ({ children, className }: any) => <td className={className}>{children}</td>;

function ScrollNav() {
  return null;
}

function ChapterCard({ children, title, className }: any) {
  return (
    <ScrollyStep title={title} className={className}>
      {children}
    </ScrollyStep>
  );
}

function DespachoSeguroScrolly() {
  return (
    <ScrollyCallout title="Scrollytelling disponible" tone="success">
      Este bloque interactivo se puede reconstruir con Scrollytelling, ScrollyStep y ScrollyFigure en MDX.
    </ScrollyCallout>
  );
}

const components = {
  Scrollytelling,
  ScrollyStep,
  ScrollyFigure,
  ScrollyCallout,
  ScrollyMetric,
  Callout,
  Alert,
  AlertDescription,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  ScrollNav,
  ChapterCard,
  DespachoSeguroScrolly,
  img: (props: any) => <img {...props} loading="lazy" decoding="async" />,
  a: (props: any) => <a {...props} rel={props.href?.startsWith("http") ? "noopener noreferrer" : props.rel} />,
};

type MdxContentProps = {
  source: string;
  className?: string;
};

function escapeMdxBareLessThan(source: string) {
  return source.replace(/<(?=[0-9=])/g, "&lt;");
}

export async function MdxContent({ source, className }: MdxContentProps) {
  const mdxSource = escapeMdxBareLessThan(source);

  try {
    const { content } = await compileMDX({
      source: mdxSource,
      components,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    return <div className={cn("prose prose-lg max-w-none", className)}>{content}</div>;
  } catch (error) {
    console.warn("[MdxContent] Falling back to Markdown renderer:", error);

    return (
      <div className={cn("prose prose-lg max-w-none", className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
          components={{
            img: (props: any) => <img {...props} loading="lazy" decoding="async" />,
          }}
        >
          {source}
        </ReactMarkdown>
      </div>
    );
  }
}
