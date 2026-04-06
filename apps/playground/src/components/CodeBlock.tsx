import { useState, useEffect } from 'react';
import { codeToHtml } from 'shiki';

export function CodeBlock({ code, lang = 'tsx' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState('');

  useEffect(() => {
    let cancelled = false;

    codeToHtml(code.trim(), {
      lang,
      theme: 'tokyo-night',
    }).then((result) => {
      if (!cancelled) setHtml(result);
    });

    return () => { cancelled = true; };
  }, [code, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="shiki-block relative rounded-medium border border-neutral-stroke-2 overflow-hidden">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 px-s py-xxs text-100 rounded-medium bg-neutral-background-1 border border-neutral-stroke-2 text-neutral-foreground-2 hover:bg-neutral-background-1-hover transition-colors cursor-pointer"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {html ? (
        <div
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="p-m overflow-x-auto text-200 leading-[1.6] text-neutral-foreground-2 font-mono">
          <code>{code.trim()}</code>
        </pre>
      )}
    </div>
  );
}
