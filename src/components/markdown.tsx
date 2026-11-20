import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Render isi artikel/proker (Markdown). HTML mentah tidak dirender → aman dari XSS. */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose-tsa">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target={href?.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
